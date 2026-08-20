import Razorpay from 'razorpay';
import Stripe from 'stripe';

let razorpay = null;
let stripe = null;

export const getRazorpay = () => {
  if (!process.env.RAZORPAY_KEY_ID) return null;
  if (!razorpay) {
    razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });
  }
  return razorpay;
};

export const getStripe = () => {
  if (!process.env.STRIPE_SECRET_KEY) return null;
  if (!stripe) {
    stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  }
  return stripe;
};

export const createRazorpayOrder = async (amount, orderId) => {
  const rp = getRazorpay();
  if (!rp) {
    return { id: 'order_stub_' + Date.now(), amount, currency: 'INR', stub: true };
  }
  return await rp.orders.create({
    amount: Math.round(amount * 100),
    currency: 'INR',
    receipt: orderId,
  });
};

export const verifyRazorpayPayment = async (orderId, paymentId, signature) => {
  const rp = getRazorpay();
  if (!rp) return true;
  const crypto = await import('crypto');
  const body = orderId + '|' + paymentId;
  const expected = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
    .update(body).digest('hex');
  return expected === signature;
};

export const createStripePaymentIntent = async (amount, metadata) => {
  const st = getStripe();
  if (!st) {
    return { id: 'pi_stub_' + Date.now(), client_secret: 'stub_secret', stub: true };
  }
  return await st.paymentIntents.create({
    amount: Math.round(amount * 100),
    currency: 'inr',
    metadata,
  });
};
