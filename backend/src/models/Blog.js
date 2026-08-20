import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    excerpt: String,
    content: { type: String, required: true },
    coverImage: String,
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    tags: [String],
    isPublished: { type: Boolean, default: false },
    publishedAt: Date,
    seoTitle: String,
    seoDescription: String,
    viewCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model('Blog', blogSchema);
