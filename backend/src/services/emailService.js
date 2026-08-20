import nodemailer from 'nodemailer';

let transporter = null;

const getTransporter = () => {
  if (!process.env.SMTP_USER) return null;
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    });
  }
  return transporter;
};

export const sendEmail = async ({ to, subject, html }) => {
  const transport = getTransporter();
  if (!transport) {
    console.log(`[Email stub] To: ${to}, Subject: ${subject}`);
    return { success: true, stub: true };
  }
  await transport.sendMail({
    from: `AAKSHI <${process.env.SMTP_USER}>`,
    to,
    subject,
    html,
  });
  return { success: true };
};

export const welcomeEmailTemplate = (name) => `
  <div style="font-family: Poppins, sans-serif; max-width: 600px; margin: 0 auto;">
    <div style="background: #FF5CA8; padding: 30px; text-align: center;">
      <h1 style="color: white; margin: 0;">AAKSHI</h1>
      <p style="color: #FFD6E8; margin: 5px 0;">Elegance That Adorns Every Girl</p>
    </div>
    <div style="padding: 30px; background: #FFF9FC;">
      <h2>Welcome, ${name}! 💕</h2>
      <p>Thank you for joining AAKSHI — your destination for premium fashion jewelry.</p>
      <p>Explore our Korean, Ethnic & Trending collections today!</p>
      <a href="${process.env.FRONTEND_URL}/shop" style="display: inline-block; background: #FF5CA8; color: white; padding: 12px 30px; text-decoration: none; border-radius: 25px; margin-top: 15px;">Shop Now</a>
    </div>
  </div>
`;

export const orderConfirmationTemplate = (order) => `
  <div style="font-family: Poppins, sans-serif; max-width: 600px; margin: 0 auto;">
    <div style="background: #FF5CA8; padding: 30px; text-align: center;">
      <h1 style="color: white;">Order Confirmed! ✨</h1>
    </div>
    <div style="padding: 30px; background: #FFF9FC;">
      <p>Your order <strong>#${order.orderNumber}</strong> has been confirmed.</p>
      <p>Total: ₹${order.total}</p>
      <p>We'll notify you when it ships!</p>
    </div>
  </div>
`;

export const otpEmailTemplate = (otp) => `
  <div style="font-family: Poppins, sans-serif; max-width: 600px; margin: 0 auto; padding: 30px; background: #FFF9FC;">
    <h2>Your AAKSHI OTP</h2>
    <p style="font-size: 32px; font-weight: bold; color: #FF5CA8;">${otp}</p>
    <p>Valid for 10 minutes. Do not share with anyone.</p>
  </div>
`;
