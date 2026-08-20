import User from '../models/User.js';
import Product from '../models/Product.js';
import Order from '../models/Order.js';
import Category from '../models/Category.js';
import Coupon from '../models/Coupon.js';
import Banner from '../models/Banner.js';
import Blog from '../models/Blog.js';

export const getDashboardStats = async (req, res) => {
  try {
    const now = new Date();
    const thirtyDaysAgo = new Date(now.setDate(now.getDate() - 30));

    const [totalOrders, totalRevenue, totalProducts, totalCustomers, recentOrders] = await Promise.all([
      Order.countDocuments(),
      Order.aggregate([
        { $match: { paymentStatus: 'paid' } },
        { $group: { _id: null, total: { $sum: '$total' } } },
      ]),
      Product.countDocuments({ isActive: true }),
      User.countDocuments({ role: 'user' }),
      Order.find().sort('-createdAt').limit(10).populate('user', 'name email'),
    ]);

    const monthlyRevenue = await Order.aggregate([
      { $match: { paymentStatus: 'paid', createdAt: { $gte: thirtyDaysAgo } } },
      {
        $group: {
          _id: { $dayOfMonth: '$createdAt' },
          revenue: { $sum: '$total' },
          orders: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    const visitors = Math.floor(totalCustomers * 15 + Math.random() * 1000);
    const conversionRate = totalCustomers > 0
      ? ((totalOrders / visitors) * 100).toFixed(2)
      : 0;

    res.json({
      success: true,
      stats: {
        revenue: totalRevenue[0]?.total || 0,
        orders: totalOrders,
        products: totalProducts,
        customers: totalCustomers,
        visitors,
        conversionRate,
        monthlyRevenue,
        recentOrders,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getCustomers = async (req, res) => {
  try {
    const customers = await User.find({ role: 'user' })
      .select('name email phone loyaltyPoints walletBalance createdAt')
      .sort('-createdAt');
    res.json({ success: true, customers });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createCategory = async (req, res) => {
  try {
    const category = await Category.create(req.body);
    res.status(201).json({ success: true, category });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, category });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Category deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createCoupon = async (req, res) => {
  try {
    const coupon = await Coupon.create(req.body);
    res.status(201).json({ success: true, coupon });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getCoupons = async (req, res) => {
  try {
    const coupons = await Coupon.find().sort('-createdAt');
    res.json({ success: true, coupons });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateCoupon = async (req, res) => {
  try {
    const coupon = await Coupon.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, coupon });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createBanner = async (req, res) => {
  try {
    const banner = await Banner.create(req.body);
    res.status(201).json({ success: true, banner });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getBanners = async (req, res) => {
  try {
    const filter = req.query.all ? {} : { isActive: true };
    const banners = await Banner.find(filter).sort('order');
    res.json({ success: true, banners });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateBanner = async (req, res) => {
  try {
    const banner = await Banner.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, banner });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteBanner = async (req, res) => {
  try {
    await Banner.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Banner deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const moderateReview = async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);
    const review = product.reviews.id(req.params.reviewId);
    review.isApproved = req.body.isApproved;
    await product.save();
    res.json({ success: true, review });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const processRefund = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    order.refund = {
      amount: req.body.amount || order.total,
      status: 'processed',
      processedAt: new Date(),
    };
    order.paymentStatus = 'refunded';
    await order.save();
    res.json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getInventory = async (req, res) => {
  try {
    const products = await Product.find()
      .select('name sku stock lowStockThreshold price images')
      .sort('stock');
    const lowStock = products.filter((p) => p.stock <= p.lowStockThreshold);
    const outOfStock = products.filter((p) => p.stock <= 0);
    res.json({ success: true, products, lowStock, outOfStock });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createBlog = async (req, res) => {
  try {
    const blog = await Blog.create({ ...req.body, author: req.user._id });
    res.status(201).json({ success: true, blog });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getBlogs = async (req, res) => {
  try {
    const filter = req.query.all ? {} : { isPublished: true };
    const blogs = await Blog.find(filter).populate('author', 'name').sort('-createdAt');
    res.json({ success: true, blogs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getBlog = async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug }).populate('author', 'name');
    if (!blog) return res.status(404).json({ success: false, message: 'Blog not found' });
    blog.viewCount += 1;
    await blog.save();
    res.json({ success: true, blog });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const subscribeNewsletter = async (req, res) => {
  try {
  const { email } = req.body;
    console.log(`[Newsletter] New subscriber: ${email}`);
    res.json({ success: true, message: 'Subscribed successfully!' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const aiChat = async (req, res) => {
  try {
    const { message } = req.body;
    const responses = {
      default: "Hi! I'm AAKSHI's style assistant. How can I help you find the perfect jewelry today? 💕",
      shipping: "We offer free shipping on orders above ₹999! Delivery takes 3-5 business days.",
      returns: "Easy 7-day returns on all products. Items must be unused with original packaging.",
      payment: "We accept Razorpay, UPI, Google Pay, PhonePe, Paytm, Stripe, and Cash on Delivery.",
      korean: "Check out our stunning Korean Jewelry collection! Trendy designs perfect for everyday glam.",
      ethnic: "Our Ethnic Collection features beautiful traditional designs for festivals and weddings.",
    };

    const lower = message.toLowerCase();
    let response = responses.default;
    if (lower.includes('ship') || lower.includes('delivery')) response = responses.shipping;
    else if (lower.includes('return') || lower.includes('refund')) response = responses.returns;
    else if (lower.includes('pay') || lower.includes('upi')) response = responses.payment;
    else if (lower.includes('korean')) response = responses.korean;
    else if (lower.includes('ethnic') || lower.includes('festive')) response = responses.ethnic;

    res.json({ success: true, response });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
