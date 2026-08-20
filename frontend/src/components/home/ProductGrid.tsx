'use client';

import { useState, useEffect } from 'react';
import { ProductCard } from '@/components/product/ProductCard';
import { SectionHeading } from '@/components/motion/SectionHeading';
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
      <SectionHeading title={title} subtitle={subtitle} />

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {products.map((product, i) => (
          <ProductCard key={product._id} product={product} index={i} />
        ))}
      </div>
    </section>
  );
}
