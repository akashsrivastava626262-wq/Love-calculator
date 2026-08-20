'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ProductCard } from '@/components/product/ProductCard';
import { DEMO_PRODUCTS } from '@/lib/types';
import type { Product } from '@/lib/types';

interface ProductGridProps {
  title: string;
  subtitle?: string;
  filterType?: 'bestSeller' | 'newArrival' | 'flashSale' | 'featured';
  limit?: number;
}

export function ProductGrid({ title, subtitle, filterType, limit = 8 }: ProductGridProps) {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    let filtered = [...DEMO_PRODUCTS];
    if (filterType === 'bestSeller') filtered = filtered.filter((p) => p.isBestSeller);
    if (filterType === 'newArrival') filtered = filtered.filter((p) => p.isNewArrival);
    if (filterType === 'flashSale') filtered = filtered.filter((p) => p.isFlashSale);
    if (filterType === 'featured') filtered = filtered.filter((p) => p.isFeatured);
    setProducts(filtered.slice(0, limit));
  }, [filterType, limit]);

  return (
    <section className="py-16 container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-10"
      >
        <h2 className="font-display text-3xl md:text-4xl font-bold mb-2">{title}</h2>
        {subtitle && <p className="text-gray-500">{subtitle}</p>}
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {products.map((product, i) => (
          <ProductCard key={product._id} product={product} index={i} />
        ))}
      </div>
    </section>
  );
}
