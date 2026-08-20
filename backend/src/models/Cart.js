import mongoose from 'mongoose';

const cartItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, default: 1, min: 1 },
  variant: {
    color: String,
    size: String,
    sku: String,
    price: Number,
  },
  savedForLater: { type: Boolean, default: false },
});

const cartSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    sessionId: String,
    items: [cartItemSchema],
    coupon: { type: mongoose.Schema.Types.ObjectId, ref: 'Coupon' },
    couponDiscount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model('Cart', cartSchema);
