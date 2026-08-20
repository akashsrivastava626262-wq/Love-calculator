import User from '../models/User.js';
import { sendTokenResponse } from '../utils/jwt.js';
import { generateOTP, validateEmail, validatePhone } from '../utils/helpers.js';
import { sendEmail, welcomeEmailTemplate, otpEmailTemplate } from '../services/emailService.js';

export const register = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;
    if (!name || !password) {
      return res.status(400).json({ success: false, message: 'Name and password required' });
    }
    if (email && !validateEmail(email)) {
      return res.status(400).json({ success: false, message: 'Invalid email' });
    }
    if (phone && !validatePhone(phone)) {
      return res.status(400).json({ success: false, message: 'Invalid phone number' });
    }

    const existing = await User.findOne({
      $or: [{ email }, { phone }].filter((q) => Object.values(q)[0]),
    });
    if (existing) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }

    const user = await User.create({ name, email, phone, password });
    user.referralCode = user.generateReferralCode();
    await user.save();

  if (email) {
      const token = generateOTP() + generateOTP();
      user.emailVerificationToken = token;
      await user.save();
    }

    if (email) {
      await sendEmail({
        to: email,
        subject: 'Welcome to AAKSHI! 💕',
        html: welcomeEmailTemplate(name),
      });
    }

    sendTokenResponse(user, 201, res);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, phone, password } = req.body;
    const query = email ? { email } : phone ? { phone } : null;
    if (!query || !password) {
      return res.status(400).json({ success: false, message: 'Credentials required' });
    }

    const user = await User.findOne(query).select('+password');
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    sendTokenResponse(user, 200, res);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const sendOTP = async (req, res) => {
  try {
    const { phone, email } = req.body;
    const otp = generateOTP();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

    let user;
    if (phone) {
      user = await User.findOne({ phone }) || new User({ name: 'User', phone });
      user.otp = otp;
      user.otpExpiry = otpExpiry;
      await user.save();
      // SMS stub
      console.log(`[SMS OTP] ${phone}: ${otp}`);
    } else if (email) {
      user = await User.findOne({ email }) || new User({ name: 'User', email });
      user.otp = otp;
      user.otpExpiry = otpExpiry;
      await user.save();
      await sendEmail({ to: email, subject: 'AAKSHI Login OTP', html: otpEmailTemplate(otp) });
    } else {
      return res.status(400).json({ success: false, message: 'Phone or email required' });
    }

    res.json({ success: true, message: 'OTP sent successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const verifyOTP = async (req, res) => {
  try {
    const { phone, email, otp } = req.body;
    const query = phone ? { phone } : { email };
    const user = await User.findOne(query);

    if (!user || user.otp !== otp || user.otpExpiry < new Date()) {
      return res.status(400).json({ success: false, message: 'Invalid or expired OTP' });
    }

    user.otp = undefined;
    user.otpExpiry = undefined;
    user.isVerified = true;
    if (phone) user.phoneVerified = true;
    if (email) user.emailVerified = true;
    if (!user.referralCode) user.referralCode = user.generateReferralCode();
    await user.save();

    sendTokenResponse(user, 200, res);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const resetToken = generateOTP() + generateOTP();
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpiry = new Date(Date.now() + 30 * 60 * 1000);
    await user.save();

    await sendEmail({
      to: email,
      subject: 'Reset Your AAKSHI Password',
      html: `<p>Reset link: ${process.env.FRONTEND_URL}/reset-password?token=${resetToken}</p>`,
    });

    res.json({ success: true, message: 'Reset link sent to email' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { token, password } = req.body;
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpiry: { $gt: new Date() },
    });

    if (!user) {
      return res.status(400).json({ success: false, message: 'Invalid or expired token' });
    }

    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpiry = undefined;
    await user.save();

    sendTokenResponse(user, 200, res);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('wishlist');
    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { name, avatar } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { name, avatar },
      { new: true, runValidators: true }
    );
    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = await User.findById(req.user._id).select('+password');
    if (!(await user.comparePassword(currentPassword))) {
      return res.status(400).json({ success: false, message: 'Current password incorrect' });
    }
    user.password = newPassword;
    await user.save();
    res.json({ success: true, message: 'Password updated' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const socialLogin = async (req, res) => {
  try {
    const { provider, providerId, email, name, avatar } = req.body;
    const field = provider === 'google' ? 'googleId' : 'facebookId';
    let user = await User.findOne({ [field]: providerId });

    if (!user && email) {
      user = await User.findOne({ email });
    }

    if (!user) {
      user = await User.create({
        name,
        email,
        avatar,
        [field]: providerId,
        isVerified: true,
        emailVerified: true,
      });
      user.referralCode = user.generateReferralCode();
      await user.save();
    } else {
      user[field] = providerId;
      if (avatar) user.avatar = avatar;
      await user.save();
    }

    sendTokenResponse(user, 200, res);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const addAddress = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (req.body.isDefault) {
      user.addresses.forEach((a) => (a.isDefault = false));
    }
    user.addresses.push(req.body);
    await user.save();
    res.json({ success: true, addresses: user.addresses });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteAddress = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    user.addresses = user.addresses.filter((a) => a._id.toString() !== req.params.id);
    await user.save();
    res.json({ success: true, addresses: user.addresses });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const toggleWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const productId = req.params.productId;
    const index = user.wishlist.indexOf(productId);
    if (index > -1) {
      user.wishlist.splice(index, 1);
    } else {
      user.wishlist.push(productId);
    }
    await user.save();
    res.json({ success: true, wishlist: user.wishlist });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('wishlist');
    res.json({ success: true, wishlist: user.wishlist });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const trackRecentlyViewed = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const productId = req.params.productId;
    user.recentlyViewed = [productId, ...user.recentlyViewed.filter((id) => id.toString() !== productId)].slice(0, 20);
    await user.save();
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
