'use client';

import { DEMO_PRODUCTS } from '@/lib/types';
import { ProductCard } from '@/components/product/ProductCard';
import { useWishlistStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Heart } from 'lucide-react';

export default function WishlistPage() {
  const { items } = useWishlistStore();
  const products = DEMO_PRODUCTS.filter((p) => items.includes(p._id));

  if (products.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <Heart className="w-16 h-16 mx-auto text-gray-300 mb-4" />
        <h1 className="font-display text-2xl font-bold mb-2">Your wishlist is empty</h1>
        <p className="text-gray-500 mb-6">Save items you love for later</p>
        <Button asChild><Link href="/shop">Explore Shop</Link></Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="font-display text-3xl font-bold mb-8">My Wishlist</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {products.map((product, i) => <ProductCard key={product._id} product={product} index={i} />)}
      </div>
    </div>
  );
}
