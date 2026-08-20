import type { MetadataRoute } from 'next';
import { DEMO_PRODUCTS, DEMO_CATEGORIES } from '@/lib/types';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://aakshi.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    '', '/shop', '/about', '/contact', '/blog', '/faq',
    '/privacy-policy', '/terms', '/return-policy', '/shipping-policy', '/careers',
    '/cart', '/wishlist', '/account', '/track-order',
  ];

  return [
    ...staticPages.map((path) => ({
      url: `${BASE_URL}${path}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: path === '' ? 1 : 0.8,
    })),
    ...DEMO_PRODUCTS.map((p) => ({
      url: `${BASE_URL}/product/${p.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    })),
    ...DEMO_CATEGORIES.map((c) => ({
      url: `${BASE_URL}/categories/${c.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    })),
  ];
}
