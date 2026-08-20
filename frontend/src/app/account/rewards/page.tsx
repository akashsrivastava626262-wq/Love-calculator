'use client';

import { useRecentlyViewedStore } from '@/lib/store';
import { DEMO_PRODUCTS } from '@/lib/types';
import { ProductCard } from '@/components/product/ProductCard';

export default function RewardsPage() {
  const { items } = useRecentlyViewedStore();
  const recentProducts = DEMO_PRODUCTS.filter((p) => items.includes(p._id));

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="font-display text-3xl font-bold mb-8">Rewards & Referrals</h1>
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white p-6 rounded-2xl border border-secondary/30 text-center">
          <p className="text-3xl font-bold text-primary">0</p>
          <p className="text-sm text-gray-500 mt-1">Loyalty Points</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-secondary/30 text-center">
          <p className="text-3xl font-bold text-primary">₹0</p>
          <p className="text-sm text-gray-500 mt-1">Wallet Balance</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-secondary/30 text-center">
          <p className="text-3xl font-bold text-primary">₹0</p>
          <p className="text-sm text-gray-500 mt-1">Referral Earnings</p>
        </div>
      </div>

      {recentProducts.length > 0 && (
        <section>
          <h2 className="font-display text-2xl font-bold mb-6">Recently Viewed</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {recentProducts.map((p, i) => <ProductCard key={p._id} product={p} index={i} />)}
          </div>
        </section>
      )}
    </div>
  );
}
