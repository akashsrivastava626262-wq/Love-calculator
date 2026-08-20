import mongoose from 'mongoose';

const giftCardSchema = new mongoose.Schema(
  {
    code: { type: String, unique: true, required: true },
    amount: { type: Number, required: true },
    balance: { type: Number, required: true },
    purchasedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    recipientEmail: String,
    recipientName: String,
    message: String,
    isActive: { type: Boolean, default: true },
    expiresAt: Date,
    usedAt: Date,
  },
  { timestamps: true }
);

export default mongoose.model('GiftCard', giftCardSchema);
