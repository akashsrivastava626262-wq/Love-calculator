'use client';

import { useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { SlidersHorizontal } from 'lucide-react';
import { ProductCard } from '@/components/product/ProductCard';
import { Button } from '@/components/ui/button';
import { DEMO_PRODUCTS } from '@/lib/types';

export default function ShopContent() {
  const searchParams = useSearchParams();
  const collection = searchParams.get('collection');
  const isBestSeller = searchParams.get('isBestSeller');
  const isNewArrival = searchParams.get('isNewArrival');
  const isFlashSale = searchParams.get('isFlashSale');
  const [sort, setSort] = useState('featured');

  const products = useMemo(() => {
    let filtered = [...DEMO_PRODUCTS];
    if (collection) filtered = filtered.filter((p) => p.collection === collection);
    if (isBestSeller) filtered = filtered.filter((p) => p.isBestSeller);
    if (isNewArrival) filtered = filtered.filter((p) => p.isNewArrival);
    if (isFlashSale) filtered = filtered.filter((p) => p.isFlashSale);

    switch (sort) {
      case 'price-low': filtered.sort((a, b) => a.price - b.price); break;
      case 'price-high': filtered.sort((a, b) => b.price - a.price); break;
      case 'rating': filtered.sort((a, b) => b.averageRating - a.averageRating); break;
      default: break;
    }
    return filtered;
  }, [collection, isBestSeller, isNewArrival, isFlashSale, sort]);

  const title = collection
    ? collection.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
    : isBestSeller ? 'Best Sellers' : isNewArrival ? 'New Arrivals' : 'Shop All';

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="font-display text-3xl md:text-4xl font-bold">{title}</h1>
          <p className="text-gray-500 mt-1">{products.length} products</p>
        </div>
        <div className="flex items-center gap-3">
          <SlidersHorizontal className="w-4 h-4 text-gray-400" />
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="border border-secondary rounded-xl px-4 py-2 text-sm bg-white"
          >
            <option value="featured">Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {products.map((product, i) => (
          <ProductCard key={product._id} product={product} index={i} />
        ))}
      </div>

      {products.length === 0 && (
        <div className="text-center py-20">
          <p className="text-gray-500 mb-4">No products found</p>
          <Button asChild><a href="/shop">View All Products</a></Button>
        </div>
      )}
    </div>
  );
}
