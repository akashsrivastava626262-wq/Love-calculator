'use client';

import Link from 'next/link';

export default function OrdersPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="font-display text-3xl font-bold mb-8">Order History</h1>
      <div className="bg-white p-8 rounded-2xl border border-secondary/30 text-center">
        <p className="text-gray-500 mb-4">No orders yet</p>
        <Link href="/shop" className="text-primary hover:underline">Start Shopping</Link>
      </div>
      <Link href="/account" className="text-primary text-sm mt-4 inline-block">← Back to Account</Link>
    </div>
  );
}
