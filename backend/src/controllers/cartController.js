import Cart from '../models/Cart.js';
import Product from '../models/Product.js';
import Coupon from '../models/Coupon.js';
import { calculateTax, calculateShipping } from '../utils/helpers.js';

const getOrCreateCart = async (userId, sessionId) => {
  let cart;
  if (userId) {
    cart = await Cart.findOne({ user: userId }).populate('items.product');
    if (!cart) cart = await Cart.create({ user: userId, items: [] });
  } else if (sessionId) {
    cart = await Cart.findOne({ sessionId }).populate('items.product');
    if (!cart) cart = await Cart.create({ sessionId, items: [] });
  }
  return cart;
};

const calculateCartTotals = async (cart, pincode) => {
  let subtotal = 0;
  const activeItems = cart.items.filter((i) => !i.savedForLater);

  for (const item of activeItems) {
    const price = item.variant?.price || item.product?.price || 0;
    subtotal += price * item.quantity;
  }

  let discount = cart.couponDiscount || 0;
  const afterDiscount = subtotal - discount;
  const tax = calculateTax(afterDiscount);
  const shipping = calculateShipping(afterDiscount, pincode);
  const total = afterDiscount + tax + shipping;

  return { subtotal, discount, tax, shipping, total, itemCount: activeItems.length };
};

export const getCart = async (req, res) => {
  try {
    const cart = await getOrCreateCart(req.user?._id, req.headers['x-session-id']);
    if (!cart) return res.json({ success: true, cart: { items: [] }, totals: { subtotal: 0, total: 0 } });

    const totals = await calculateCartTotals(cart, req.query.pincode);
    res.json({ success: true, cart, totals });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const addToCart = async (req, res) => {
  try {
    const { productId, quantity = 1, variant } = req.body;
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ success: false, message: 'Product not found' });

    const cart = await getOrCreateCart(req.user?._id, req.headers['x-session-id']);
    const existing = cart.items.find(
      (i) => i.product.toString() === productId &&
        JSON.stringify(i.variant) === JSON.stringify(variant)
    );

    if (existing) {
      existing.quantity += quantity;
    } else {
      cart.items.push({
        product: productId,
        quantity,
        variant: variant ? { ...variant, price: variant.price || product.price } : undefined,
      });
    }

    await cart.save();
    const populated = await Cart.findById(cart._id).populate('items.product');
    const totals = await calculateCartTotals(populated);

    res.json({ success: true, cart: populated, totals });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateCartItem = async (req, res) => {
  try {
    const cart = await getOrCreateCart(req.user?._id, req.headers['x-session-id']);
    const item = cart.items.id(req.params.itemId);
    if (!item) return res.status(404).json({ success: false, message: 'Item not found' });

    if (req.body.quantity !== undefined) item.quantity = req.body.quantity;
    if (req.body.savedForLater !== undefined) item.savedForLater = req.body.savedForLater;

    if (item.quantity <= 0) item.deleteOne();
    await cart.save();

    const populated = await Cart.findById(cart._id).populate('items.product');
    const totals = await calculateCartTotals(populated, req.query.pincode);
    res.json({ success: true, cart: populated, totals });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const removeFromCart = async (req, res) => {
  try {
    const cart = await getOrCreateCart(req.user?._id, req.headers['x-session-id']);
    cart.items = cart.items.filter((i) => i._id.toString() !== req.params.itemId);
    await cart.save();

    const populated = await Cart.findById(cart._id).populate('items.product');
    const totals = await calculateCartTotals(populated);
    res.json({ success: true, cart: populated, totals });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const applyCoupon = async (req, res) => {
  try {
    const { code } = req.body;
    const coupon = await Coupon.findOne({
      code: code.toUpperCase(),
      isActive: true,
      validFrom: { $lte: new Date() },
      validUntil: { $gte: new Date() },
    });

    if (!coupon) return res.status(400).json({ success: false, message: 'Invalid coupon' });
    if (coupon.usageLimit && coupon.usedCount >= coupon.usageLimit) {
      return res.status(400).json({ success: false, message: 'Coupon usage limit reached' });
    }

    const cart = await getOrCreateCart(req.user?._id, req.headers['x-session-id']);
    const totals = await calculateCartTotals(cart);

    if (totals.subtotal < coupon.minOrderAmount) {
      return res.status(400).json({
        success: false,
        message: `Minimum order amount ₹${coupon.minOrderAmount} required`,
      });
    }

    let discount = coupon.type === 'percentage'
      ? totals.subtotal * (coupon.value / 100)
      : coupon.value;
    if (coupon.maxDiscount) discount = Math.min(discount, coupon.maxDiscount);

    cart.coupon = coupon._id;
    cart.couponDiscount = discount;
    await cart.save();

    const updatedTotals = await calculateCartTotals(cart);
    res.json({ success: true, discount, totals: updatedTotals, coupon });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const removeCoupon = async (req, res) => {
  try {
    const cart = await getOrCreateCart(req.user?._id, req.headers['x-session-id']);
    cart.coupon = undefined;
    cart.couponDiscount = 0;
    await cart.save();
    const totals = await calculateCartTotals(cart);
    res.json({ success: true, totals });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const estimateDelivery = async (req, res) => {
  try {
    const { pincode } = req.query;
    const metro = ['110', '400', '560', '600', '500', '700'];
    const isMetro = metro.includes(pincode?.substring(0, 3));
    const days = isMetro ? 3 : 5;
    const estimated = new Date();
    estimated.setDate(estimated.getDate() + days);

    res.json({
      success: true,
      estimatedDelivery: estimated,
      shippingCost: calculateShipping(0, pincode),
      days,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
