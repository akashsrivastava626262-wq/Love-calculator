import Order from '../models/Order.js';
import Cart from '../models/Cart.js';
import Product from '../models/Product.js';
import Coupon from '../models/Coupon.js';
import User from '../models/User.js';
import { generateOrderNumber, calculateTax, calculateShipping } from '../utils/helpers.js';
import { createRazorpayOrder, verifyRazorpayPayment, createStripePaymentIntent } from '../services/paymentService.js';
import { sendEmail, orderConfirmationTemplate } from '../services/emailService.js';

export const createOrder = async (req, res) => {
  try {
    const {
      shippingAddress,
      paymentMethod,
      guestEmail,
      guestPhone,
      loyaltyPointsUsed = 0,
      notes,
    } = req.body;

    const cart = await Cart.findOne({ user: req.user?._id }).populate('items.product');
    const activeItems = cart?.items?.filter((i) => !i.savedForLater) || req.body.items;

    if (!activeItems?.length) {
      return res.status(400).json({ success: false, message: 'Cart is empty' });
    }

    let subtotal = 0;
    const orderItems = [];

    for (const item of activeItems) {
      const product = item.product?._id ? item.product : await Product.findById(item.product);
      const price = item.variant?.price || product.price;
      subtotal += price * item.quantity;
      orderItems.push({
        product: product._id,
        name: product.name,
        image: product.images?.[0]?.url,
        quantity: item.quantity,
        price,
        originalPrice: product.originalPrice,
        variant: item.variant,
      });
    }

    const discount = cart?.couponDiscount || 0;
    const afterDiscount = subtotal - discount;
    const tax = calculateTax(afterDiscount);
    const shipping = calculateShipping(afterDiscount, shippingAddress?.pincode);
    let total = afterDiscount + tax + shipping - loyaltyPointsUsed;

    const orderNumber = generateOrderNumber();
    const loyaltyEarned = Math.floor(total * 0.05);

    const order = await Order.create({
      orderNumber,
      user: req.user?._id,
      guestEmail,
      guestPhone,
      items: orderItems,
      shippingAddress,
      paymentMethod,
      subtotal,
      discount,
      couponCode: cart?.coupon ? (await Coupon.findById(cart.coupon))?.code : undefined,
      tax,
      shipping,
      total,
      loyaltyPointsEarned: loyaltyEarned,
      loyaltyPointsUsed,
      notes,
      statusHistory: [{ status: 'pending', note: 'Order placed' }],
    });

    // Update stock
    for (const item of orderItems) {
      await Product.findByIdAndUpdate(item.product, {
        $inc: { stock: -item.quantity },
      });
    }

    if (req.user && loyaltyPointsUsed > 0) {
      await User.findByIdAndUpdate(req.user._id, {
        $inc: { loyaltyPoints: -loyaltyPointsUsed + loyaltyEarned },
      });
    }

    if (cart) {
      cart.items = cart.items.filter((i) => i.savedForLater);
      cart.coupon = undefined;
      cart.couponDiscount = 0;
      await cart.save();
    }

    let paymentData = null;
    if (paymentMethod === 'razorpay') {
      paymentData = await createRazorpayOrder(total, orderNumber);
      order.razorpayOrderId = paymentData.id;
      await order.save();
    } else if (paymentMethod === 'stripe') {
      paymentData = await createStripePaymentIntent(total, { orderId: order._id.toString() });
      order.stripePaymentIntentId = paymentData.id;
      await order.save();
    } else if (paymentMethod === 'cod') {
      order.paymentStatus = 'pending';
      order.orderStatus = 'confirmed';
      await order.save();
    }

    const email = req.user?.email || guestEmail;
    if (email) {
      await sendEmail({
        to: email,
        subject: `Order Confirmed #${orderNumber}`,
        html: orderConfirmationTemplate(order),
      });
    }

    res.status(201).json({ success: true, order, paymentData });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const verifyPayment = async (req, res) => {
  try {
    const { orderId, razorpayOrderId, razorpayPaymentId, razorpaySignature } = req.body;
    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ success: false, message: 'Order not found' });

    const isValid = await verifyRazorpayPayment(razorpayOrderId, razorpayPaymentId, razorpaySignature);
    if (!isValid) return res.status(400).json({ success: false, message: 'Payment verification failed' });

    order.paymentStatus = 'paid';
    order.paymentId = razorpayPaymentId;
    order.orderStatus = 'confirmed';
    order.statusHistory.push({ status: 'confirmed', note: 'Payment received' });
    await order.save();

    res.json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort('-createdAt');
    res.json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getOrder = async (req, res) => {
  try {
    const order = await Order.findOne({
      $or: [{ _id: req.params.id }, { orderNumber: req.params.id }],
      user: req.user._id,
    }).populate('items.product');
    if (!order) return res.status(404).json({ success: false, message: 'Order not found' });
    res.json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const trackOrder = async (req, res) => {
  try {
    const { orderNumber, phone } = req.query;
    const order = await Order.findOne({
      orderNumber,
      $or: [{ guestPhone: phone }, { user: req.user?._id }],
    });
    if (!order) return res.status(404).json({ success: false, message: 'Order not found' });
    res.json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const requestReturn = async (req, res) => {
  try {
    const order = await Order.findOne({ _id: req.params.id, user: req.user._id });
    if (!order) return res.status(404).json({ success: false, message: 'Order not found' });

    order.returnRequest = {
      requested: true,
      reason: req.body.reason,
      status: 'pending',
      requestedAt: new Date(),
    };
    order.orderStatus = 'returned';
    await order.save();
    res.json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      {
        orderStatus: req.body.status,
        trackingNumber: req.body.trackingNumber,
        carrier: req.body.carrier,
        $push: { statusHistory: { status: req.body.status, note: req.body.note } },
      },
      { new: true }
    );
    res.json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const { page = 1, limit = 20, status } = req.query;
    const filter = status ? { orderStatus: status } : {};
    const orders = await Order.find(filter)
      .populate('user', 'name email phone')
      .sort('-createdAt')
      .skip((page - 1) * limit)
      .limit(Number(limit));
    const total = await Order.countDocuments(filter);
    res.json({ success: true, orders, total });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
