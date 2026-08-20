import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  title: String,
  comment: String,
  images: [String],
  isApproved: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

const variantSchema = new mongoose.Schema({
  name: String,
  sku: String,
  price: Number,
  originalPrice: Number,
  stock: { type: Number, default: 0 },
  color: String,
  size: String,
  images: [String],
});

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    description: { type: String, required: true },
    shortDescription: String,
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    subcategory: String,
    collection: {
      type: String,
      enum: ['korean', 'ethnic', 'wedding', 'daily-wear', 'gift', 'celebrity', 'trending', 'general'],
      default: 'general',
    },
    tags: [String],
    images: [{ url: String, alt: String, isPrimary: Boolean }],
    videos: [String],
    price: { type: Number, required: true },
    originalPrice: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    stock: { type: Number, default: 100 },
    lowStockThreshold: { type: Number, default: 10 },
    sku: String,
    variants: [variantSchema],
    colors: [String],
    sizes: [String],
    materials: [String],
    weight: String,
    dimensions: String,
    isActive: { type: Boolean, default: true },
    isFeatured: { type: Boolean, default: false },
    isBestSeller: { type: Boolean, default: false },
    isNewArrival: { type: Boolean, default: false },
    isFlashSale: { type: Boolean, default: false },
    flashSaleEnd: Date,
    reviews: [reviewSchema],
    averageRating: { type: Number, default: 0 },
    reviewCount: { type: Number, default: 0 },
    faq: [{ question: String, answer: String }],
    frequentlyBoughtWith: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
    seoTitle: String,
    seoDescription: String,
    seoKeywords: [String],
    viewCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

productSchema.index({ name: 'text', description: 'text', tags: 'text' });

productSchema.methods.getStockStatus = function () {
  if (this.stock <= 0) return 'out_of_stock';
  if (this.stock <= this.lowStockThreshold) return 'low_stock';
  return 'in_stock';
};

export default mongoose.model('Product', productSchema);
