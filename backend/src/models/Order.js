import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  name: String,
  image: String,
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  originalPrice: Number,
  variant: {
    color: String,
    size: String,
    sku: String,
  },
});

const orderSchema = new mongoose.Schema(
  {
    orderNumber: { type: String, unique: true, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    guestEmail: String,
    guestPhone: String,
    items: [orderItemSchema],
    shippingAddress: {
      fullName: String,
      phone: String,
      addressLine1: String,
      addressLine2: String,
      city: String,
      state: String,
      pincode: String,
      country: String,
    },
    paymentMethod: {
      type: String,
      enum: ['razorpay', 'stripe', 'upi', 'google_pay', 'phonepe', 'paytm', 'cod'],
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'paid', 'failed', 'refunded'],
      default: 'pending',
    },
    paymentId: String,
    razorpayOrderId: String,
    stripePaymentIntentId: String,
    orderStatus: {
      type: String,
      enum: ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled', 'returned'],
      default: 'pending',
    },
    subtotal: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    couponCode: String,
    tax: { type: Number, default: 0 },
    shipping: { type: Number, default: 0 },
    total: { type: Number, required: true },
    loyaltyPointsEarned: { type: Number, default: 0 },
    loyaltyPointsUsed: { type: Number, default: 0 },
    trackingNumber: String,
    carrier: String,
    estimatedDelivery: Date,
    statusHistory: [{
      status: String,
      note: String,
      timestamp: { type: Date, default: Date.now },
    }],
    returnRequest: {
      requested: Boolean,
      reason: String,
      status: { type: String, enum: ['pending', 'approved', 'rejected', 'completed'] },
      requestedAt: Date,
    },
    refund: {
      amount: Number,
      status: { type: String, enum: ['pending', 'processed', 'failed'] },
      processedAt: Date,
    },
    notes: String,
  },
  { timestamps: true }
);

export default mongoose.model('Order', orderSchema);
