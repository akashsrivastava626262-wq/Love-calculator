import { Suspense } from 'react';
import ShopContent from './ShopContent';

export const metadata = { title: 'Shop All Jewelry' };

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="container mx-auto px-4 py-20 text-center">Loading...</div>}>
      <ShopContent />
    </Suspense>
  );
}
