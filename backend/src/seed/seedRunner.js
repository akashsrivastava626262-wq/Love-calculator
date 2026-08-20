import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { connectDB, disconnectDB } from '../config/db.js';
import User from '../models/User.js';
import Category from '../models/Category.js';
import Product from '../models/Product.js';
import Banner from '../models/Banner.js';
import Coupon from '../models/Coupon.js';
import Blog from '../models/Blog.js';

dotenv.config();

const categories = [
  { name: 'Earrings', slug: 'earrings', description: 'Trendy earrings for every occasion', order: 1 },
  { name: 'Necklaces', slug: 'necklaces', description: 'Elegant necklaces and pendants', order: 2 },
  { name: 'Korean Jewelry', slug: 'korean-jewelry', description: 'K-style trendy jewelry', order: 3 },
  { name: 'Ethnic Collection', slug: 'ethnic-collection', description: 'Traditional ethnic jewelry', order: 4 },
  { name: 'Chains', slug: 'chains', description: 'Stylish chains and layered looks', order: 5 },
  { name: 'Bracelets', slug: 'bracelets', description: 'Chic bracelets and bangles', order: 6 },
  { name: 'Rings', slug: 'rings', description: 'Beautiful rings for every finger', order: 7 },
  { name: 'Accessories', slug: 'accessories', description: 'Hair accessories and fashion extras', order: 8 },
];

const productImages = [
  'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600',
  'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600',
  'https://images.unsplash.com/photo-1605100804763-247fc67fa2b3?w=600',
  'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600',
  'https://images.unsplash.com/photo-1617038260897-41a1a14a8cae?w=600',
  'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=600',
  'https://images.unsplash.com/photo-1515562141203-758a88b404cf?w=600',
  'https://images.unsplash.com/photo-1603561596112-0a132b757442?w=600',
];

const products = [
  { name: 'Rose Gold Pearl Drop Earrings', slug: 'rose-gold-pearl-drop-earrings', categorySlug: 'earrings', collection: 'korean', price: 299, originalPrice: 599, discount: 50, isBestSeller: true, isFeatured: true, tags: ['earrings', 'pearl', 'rose gold', 'korean'] },
  { name: 'Crystal Hoop Earrings Set', slug: 'crystal-hoop-earrings-set', categorySlug: 'earrings', collection: 'trending', price: 249, originalPrice: 499, discount: 50, isNewArrival: true, tags: ['earrings', 'crystal', 'hoop'] },
  { name: 'Ethnic Jhumka Earrings', slug: 'ethnic-jhumka-earrings', categorySlug: 'earrings', collection: 'ethnic', price: 399, originalPrice: 799, discount: 50, isBestSeller: true, tags: ['earrings', 'ethnic', 'jhumka', 'festive'] },
  { name: 'Layered Gold Chain Necklace', slug: 'layered-gold-chain-necklace', categorySlug: 'necklaces', collection: 'daily-wear', price: 449, originalPrice: 899, discount: 50, isFeatured: true, tags: ['necklace', 'chain', 'gold', 'layered'] },
  { name: 'Korean Heart Pendant Necklace', slug: 'korean-heart-pendant-necklace', categorySlug: 'necklaces', collection: 'korean', price: 349, originalPrice: 699, discount: 50, isNewArrival: true, isBestSeller: true, tags: ['necklace', 'korean', 'heart', 'pendant'] },
  { name: 'Ethnic Choker Set with Earrings', slug: 'ethnic-choker-set', categorySlug: 'necklaces', collection: 'ethnic', price: 599, originalPrice: 1299, discount: 54, isFeatured: true, tags: ['necklace', 'choker', 'ethnic', 'set'] },
  { name: 'K-Style Butterfly Earrings', slug: 'k-style-butterfly-earrings', categorySlug: 'korean-jewelry', collection: 'korean', price: 199, originalPrice: 399, discount: 50, isNewArrival: true, tags: ['korean', 'butterfly', 'cute'] },
  { name: 'Minimalist Star Stud Set', slug: 'minimalist-star-stud-set', categorySlug: 'korean-jewelry', collection: 'korean', price: 179, originalPrice: 349, discount: 49, tags: ['korean', 'stud', 'minimalist'] },
  { name: 'Traditional Temple Jewelry Set', slug: 'traditional-temple-jewelry-set', categorySlug: 'ethnic-collection', collection: 'ethnic', price: 1299, originalPrice: 2499, discount: 48, isFeatured: true, isBestSeller: true, tags: ['ethnic', 'temple', 'wedding', 'festive'] },
  { name: 'Oxidized Silver Statement Ring', slug: 'oxidized-silver-statement-ring', categorySlug: 'rings', collection: 'ethnic', price: 249, originalPrice: 499, discount: 50, tags: ['ring', 'oxidized', 'ethnic'] },
  { name: 'Gold Plated Cuban Chain', slug: 'gold-plated-cuban-chain', categorySlug: 'chains', collection: 'trending', price: 399, originalPrice: 799, discount: 50, isBestSeller: true, tags: ['chain', 'cuban', 'gold'] },
  { name: 'Pearl Charm Bracelet', slug: 'pearl-charm-bracelet', categorySlug: 'bracelets', collection: 'daily-wear', price: 299, originalPrice: 599, discount: 50, isNewArrival: true, tags: ['bracelet', 'pearl', 'charm'] },
  { name: 'Crystal Hair Claw Clip Set', slug: 'crystal-hair-claw-clip-set', categorySlug: 'accessories', collection: 'trending', price: 149, originalPrice: 299, discount: 50, tags: ['hair', 'accessories', 'crystal'] },
  { name: 'Wedding Bridal Jewelry Set', slug: 'wedding-bridal-jewelry-set', categorySlug: 'ethnic-collection', collection: 'wedding', price: 2499, originalPrice: 4999, discount: 50, isFeatured: true, tags: ['wedding', 'bridal', 'set', 'ethnic'] },
  { name: 'Celebrity Inspired Layered Set', slug: 'celebrity-inspired-layered-set', categorySlug: 'necklaces', collection: 'celebrity', price: 799, originalPrice: 1599, discount: 50, isFlashSale: true, tags: ['celebrity', 'layered', 'trending'] },
  { name: 'Gift Box Jewelry Combo', slug: 'gift-box-jewelry-combo', categorySlug: 'accessories', collection: 'gift', price: 999, originalPrice: 1999, discount: 50, isFeatured: true, tags: ['gift', 'combo', 'box'] },
];

export default async function seed() {
  if (mongoose.connection.readyState === 0) await connectDB();

  const existing = await User.findOne({ email: 'admin@aakshi.com' });
  if (existing) {
    console.log('Database already seeded');
    return;
  }

  console.log('Seeding AAKSHI database...');

  await User.deleteMany({});
  await Category.deleteMany({});
  await Product.deleteMany({});
  await Banner.deleteMany({});
  await Coupon.deleteMany({});
  await Blog.deleteMany({});

  const admin = await User.create({
    name: 'AAKSHI Admin',
    email: 'admin@aakshi.com',
    password: 'admin123',
    role: 'admin',
    isVerified: true,
    emailVerified: true,
    referralCode: 'AAKADMIN001',
  });

  await User.create({
    name: 'Test Customer',
    email: 'test@aakshi.com',
    phone: '9876543210',
    password: 'test123',
    role: 'user',
    isVerified: true,
    emailVerified: true,
    phoneVerified: true,
    referralCode: 'AAKTEST001',
    loyaltyPoints: 250,
    walletBalance: 100,
  });

  const createdCategories = {};
  for (const cat of categories) {
    const c = await Category.create({
      ...cat,
      image: productImages[categories.indexOf(cat) % productImages.length],
      seoTitle: `${cat.name} - AAKSHI Fashion Jewelry`,
      seoDescription: `Shop premium ${cat.name.toLowerCase()} at AAKSHI.`,
    });
    createdCategories[cat.slug] = c._id;
  }

  for (let i = 0; i < products.length; i++) {
    const p = products[i];
    const img = productImages[i % productImages.length];
    await Product.create({
      name: p.name,
      slug: p.slug,
      description: `Discover the stunning ${p.name} from AAKSHI's premium collection.`,
      shortDescription: `Premium ${p.name}`,
      category: createdCategories[p.categorySlug],
      collection: p.collection,
      tags: p.tags,
      images: [{ url: img, alt: p.name, isPrimary: true }],
      price: p.price,
      originalPrice: p.originalPrice,
      discount: p.discount,
      stock: 50 + Math.floor(Math.random() * 100),
      colors: ['Gold', 'Rose Gold', 'Silver'],
      sizes: ['One Size'],
      isBestSeller: p.isBestSeller || false,
      isNewArrival: p.isNewArrival || false,
      isFeatured: p.isFeatured || false,
      isFlashSale: p.isFlashSale || false,
      flashSaleEnd: p.isFlashSale ? new Date(Date.now() + 3 * 24 * 60 * 60 * 1000) : undefined,
      faq: [
        { question: 'Is this hypoallergenic?', answer: 'Yes, all AAKSHI jewelry is skin-friendly.' },
        { question: 'Return policy?', answer: '7-day easy returns on unused items.' },
      ],
      seoTitle: `${p.name} | AAKSHI`,
      seoKeywords: ['artificial jewelry', 'fashion jewelry india'],
      reviews: [{
        user: admin._id,
        rating: 5,
        title: 'Absolutely gorgeous!',
        comment: 'Love this piece!',
        isApproved: true,
      }],
      averageRating: 4.8,
      reviewCount: 1,
    });
  }

  await Banner.create([
    { title: 'New Korean Collection', subtitle: 'Trendy K-Style Jewelry', image: productImages[0], ctaText: 'Shop Now', link: '/shop?collection=korean', type: 'hero', order: 1 },
    { title: 'Ethnic Festive Sale', subtitle: 'Up to 60% Off', image: productImages[3], ctaText: 'Explore', link: '/shop?collection=ethnic', type: 'hero', order: 2 },
  ]);

  await Coupon.create([
    { code: 'AAKSHI10', description: '10% off', type: 'percentage', value: 10, minOrderAmount: 299, maxDiscount: 200 },
    { code: 'WELCOME20', description: '20% off new users', type: 'percentage', value: 20, minOrderAmount: 499, maxDiscount: 500 },
    { code: 'FLAT100', description: 'Flat ₹100 off', type: 'fixed', value: 100, minOrderAmount: 599 },
  ]);

  await Blog.create({
    title: 'Top 10 Korean Jewelry Trends 2026',
    slug: 'korean-jewelry-trends-2026',
    excerpt: 'Discover the hottest Korean jewelry trends.',
    content: '<p>Korean jewelry trends in 2026...</p>',
    coverImage: productImages[2],
    author: admin._id,
    tags: ['korean', 'trends'],
    isPublished: true,
    publishedAt: new Date(),
  });

  console.log('Seed completed!');
}
