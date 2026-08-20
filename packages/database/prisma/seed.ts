import { PrismaClient, UserRole, CouponType } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌸 Seeding AAKSHI database...');

  const adminPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD || 'Aakshi@Admin2024!', 12);

  const admin = await prisma.user.upsert({
    where: { email: 'admin@aakshi.com' },
    update: {},
    create: {
      email: 'admin@aakshi.com',
      name: 'AAKSHI Admin',
      password: adminPassword,
      role: UserRole.ADMIN,
      emailVerified: new Date(),
    },
  });

  console.log('✅ Admin user created:', admin.email);

  const categories = await Promise.all([
    prisma.category.upsert({
      where: { slug: 'earrings' },
      update: {},
      create: { name: 'Earrings', slug: 'earrings', description: 'Elegant earrings for every occasion' },
    }),
    prisma.category.upsert({
      where: { slug: 'necklaces' },
      update: {},
      create: { name: 'Necklaces', slug: 'necklaces', description: 'Stunning necklaces and pendants' },
    }),
    prisma.category.upsert({
      where: { slug: 'rings' },
      update: {},
      create: { name: 'Rings', slug: 'rings', description: 'Beautiful rings for daily wear' },
    }),
    prisma.category.upsert({
      where: { slug: 'bracelets' },
      update: {},
      create: { name: 'Bracelets', slug: 'bracelets', description: 'Delicate bracelets and bangles' },
    }),
    prisma.category.upsert({
      where: { slug: 'anklets' },
      update: {},
      create: { name: 'Anklets', slug: 'anklets', description: 'Chic anklets for summer vibes' },
    }),
    prisma.category.upsert({
      where: { slug: 'layered-sets' },
      update: {},
      create: { name: 'Layered Sets', slug: 'layered-sets', description: 'Curated layered jewelry sets' },
    }),
  ]);

  const collections = await Promise.all([
    prisma.collection.upsert({
      where: { slug: 'new-arrivals' },
      update: {},
      create: { name: 'New Arrivals', slug: 'new-arrivals', description: 'Latest additions to our collection', featured: true },
    }),
    prisma.collection.upsert({
      where: { slug: 'best-sellers' },
      update: {},
      create: { name: 'Best Sellers', slug: 'best-sellers', description: 'Our most loved pieces', featured: true },
    }),
    prisma.collection.upsert({
      where: { slug: 'everyday-essentials' },
      update: {},
      create: { name: 'Everyday Essentials', slug: 'everyday-essentials', description: 'Perfect for daily wear', featured: true },
    }),
    prisma.collection.upsert({
      where: { slug: 'wedding-collection' },
      update: {},
      create: { name: 'Wedding Collection', slug: 'wedding-collection', description: 'Bridal and wedding jewelry', featured: true },
    }),
    prisma.collection.upsert({
      where: { slug: 'korean-trend' },
      update: {},
      create: { name: 'Korean Trend Collection', slug: 'korean-trend', description: 'Trendy Korean-inspired designs', featured: true },
    }),
    prisma.collection.upsert({
      where: { slug: 'office-wear' },
      update: {},
      create: { name: 'Office Wear Collection', slug: 'office-wear', description: 'Professional yet elegant pieces', featured: true },
    }),
  ]);

  const products = [
    {
      name: 'Rose Gold Pearl Drop Earrings',
      slug: 'rose-gold-pearl-drop-earrings',
      description: 'Exquisite rose gold plated pearl drop earrings featuring premium anti-tarnish coating. Perfect for both casual and formal occasions. Hypoallergenic and skin-friendly.',
      shortDescription: 'Premium anti-tarnish pearl drop earrings',
      price: 899,
      compareAtPrice: 1499,
      sku: 'AAK-EAR-001',
      stock: 50,
      images: ['https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&q=80'],
      material: '18K Rose Gold Plated, Freshwater Pearl',
      careInstructions: 'Store in provided pouch. Avoid contact with perfumes and water.',
      isFeatured: true,
      isBestSeller: true,
      isNewArrival: true,
      categoryId: categories[0].id,
      collectionId: collections[0].id,
    },
    {
      name: 'Korean Minimalist Hoop Set',
      slug: 'korean-minimalist-hoop-set',
      description: 'Trendy Korean-inspired minimalist hoop earrings set. Anti-tarnish technology ensures lasting shine. Set of 3 sizes for versatile styling.',
      shortDescription: 'Korean trend minimalist hoop set',
      price: 699,
      compareAtPrice: 999,
      sku: 'AAK-EAR-002',
      stock: 75,
      images: ['https://images.unsplash.com/photo-1588444837495-c6c1e887a071?w=800&q=80'],
      material: 'Stainless Steel, 18K Gold Plated',
      isFeatured: true,
      isTrending: true,
      categoryId: categories[0].id,
      collectionId: collections[4].id,
    },
    {
      name: 'Layered Gold Chain Necklace',
      slug: 'layered-gold-chain-necklace',
      description: 'Elegant triple-layered gold chain necklace with delicate pendants. Waterproof and anti-tarnish for everyday luxury.',
      shortDescription: 'Triple layered anti-tarnish necklace',
      price: 1299,
      compareAtPrice: 1999,
      sku: 'AAK-NEK-001',
      stock: 40,
      images: ['https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&q=80'],
      material: '18K Gold Plated Stainless Steel',
      isBestSeller: true,
      isFeatured: true,
      categoryId: categories[1].id,
      collectionId: collections[2].id,
    },
    {
      name: 'Crystal Solitaire Ring',
      slug: 'crystal-solitaire-ring',
      description: 'Stunning crystal solitaire ring with adjustable band. Premium plating that never fades. Perfect gift for any occasion.',
      shortDescription: 'Adjustable crystal solitaire ring',
      price: 599,
      compareAtPrice: 899,
      sku: 'AAK-RNG-001',
      stock: 60,
      images: ['https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&q=80'],
      material: 'Cubic Zirconia, 18K Rose Gold Plated',
      isNewArrival: true,
      categoryId: categories[2].id,
      collectionId: collections[0].id,
    },
    {
      name: 'Charm Bracelet Stack',
      slug: 'charm-bracelet-stack',
      description: 'Delicate charm bracelet stack with heart, star, and moon charms. Anti-tarnish and waterproof for worry-free wear.',
      shortDescription: 'Anti-tarnish charm bracelet stack',
      price: 799,
      compareAtPrice: 1199,
      sku: 'AAK-BRC-001',
      stock: 45,
      images: ['https://images.unsplash.com/photo-1611591432578-014a0b017a0b?w=800&q=80'],
      material: '18K Gold Plated Stainless Steel',
      isBestSeller: true,
      categoryId: categories[3].id,
      collectionId: collections[1].id,
    },
    {
      name: 'Delicate Anklet Duo',
      slug: 'delicate-anklet-duo',
      description: 'Set of two delicate anklets with tiny charms. Perfect for beach days and summer outfits. Skin-friendly and lightweight.',
      shortDescription: 'Summer essential anklet duo',
      price: 499,
      compareAtPrice: 799,
      sku: 'AAK-ANK-001',
      stock: 55,
      images: ['https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=80'],
      material: '18K Gold Plated',
      isTrending: true,
      categoryId: categories[4].id,
      collectionId: collections[4].id,
    },
    {
      name: 'Bridal Pearl Set',
      slug: 'bridal-pearl-set',
      description: 'Complete bridal jewelry set including necklace, earrings, and maang tikka. Premium quality with anti-tarnish guarantee.',
      shortDescription: 'Complete bridal pearl jewelry set',
      price: 2999,
      compareAtPrice: 4999,
      sku: 'AAK-SET-001',
      stock: 20,
      images: ['https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=80'],
      material: 'Freshwater Pearls, 18K Gold Plated',
      isFeatured: true,
      categoryId: categories[5].id,
      collectionId: collections[3].id,
    },
    {
      name: 'Office Chic Stud Earrings',
      slug: 'office-chic-stud-earrings',
      description: 'Understated stud earrings perfect for professional settings. Small, elegant, and comfortable for all-day wear.',
      shortDescription: 'Professional stud earrings',
      price: 449,
      compareAtPrice: 699,
      sku: 'AAK-EAR-003',
      stock: 80,
      images: ['https://images.unsplash.com/photo-1573408301185-914fe6340337?w=800&q=80'],
      material: 'Cubic Zirconia, Sterling Silver Plated',
      categoryId: categories[0].id,
      collectionId: collections[5].id,
    },
  ];

  for (const product of products) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: product,
      create: product,
    });
  }

  console.log('✅ Products seeded:', products.length);

  await prisma.coupon.upsert({
    where: { code: 'WELCOME10' },
    update: {},
    create: {
      code: 'WELCOME10',
      type: CouponType.PERCENTAGE,
      value: 10,
      minOrderAmount: 499,
      maxDiscount: 500,
      usageLimit: 1000,
      isActive: true,
    },
  });

  await prisma.coupon.upsert({
    where: { code: 'AAKSHI50' },
    update: {},
    create: {
      code: 'AAKSHI50',
      type: CouponType.FIXED,
      value: 50,
      minOrderAmount: 999,
      isActive: true,
    },
  });

  await prisma.taxRate.upsert({
    where: { id: 'default-gst' },
    update: {},
    create: {
      id: 'default-gst',
      name: 'GST',
      rate: 18,
      isActive: true,
    },
  });

  const settings = [
    { key: 'site_name', value: 'AAKSHI' },
    { key: 'site_tagline', value: 'Timeless Elegance. Everyday Shine.' },
    { key: 'free_shipping_threshold', value: '999' },
    { key: 'standard_shipping_cost', value: '99' },
    { key: 'express_shipping_cost', value: '199' },
    { key: 'whatsapp_number', value: '+919876543210' },
    { key: 'support_email', value: 'support@aakshi.com' },
  ];

  for (const setting of settings) {
    await prisma.siteSetting.upsert({
      where: { key: setting.key },
      update: { value: setting.value },
      create: setting,
    });
  }

  console.log('🌸 AAKSHI database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
