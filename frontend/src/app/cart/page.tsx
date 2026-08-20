'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Reveal } from '@/components/motion/Reveal';
import { formatPrice } from '@/lib/utils';
import { useCartStore } from '@/lib/store';

export default function CartPage() {
  const { items, totals, fetchCart, updateItem, removeItem, applyCoupon } = useCartStore();
  const [couponCode, setCouponCode] = useState('');
  const [couponMsg, setCouponMsg] = useState('');

  useEffect(() => { fetchCart(); }, [fetchCart]);

  const activeItems = items.filter((i) => !i.savedForLater);

  const handleCoupon = async () => {
    const result = await applyCoupon(couponCode);
    setCouponMsg(result.success ? 'Coupon applied!' : result.message || 'Invalid coupon');
  };

  if (activeItems.length === 0) {
    return (
      <Reveal className="container mx-auto px-4 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <ShoppingBag className="w-16 h-16 mx-auto text-gray-300 mb-4" />
          <h1 className="font-display text-2xl font-bold mb-2">Your cart is empty</h1>
          <p className="text-gray-500 mb-6">Discover our beautiful jewelry collections</p>
          <Button asChild size="lg"><Link href="/shop">Shop Now</Link></Button>
        </motion.div>
      </Reveal>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Reveal>
        <h1 className="font-display text-3xl font-bold mb-8">Shopping Cart</h1>
      </Reveal>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {activeItems.map((item) => {
            const product = item.product;
            const image = product?.images?.[0]?.url || 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=200';
            const price = item.variant?.price || product?.price || 0;

            return (
              <div key={item._id} className="flex gap-4 bg-white p-4 rounded-2xl border border-secondary/30">
                <div className="relative w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
                  <Image src={image} alt={product?.name || ''} fill sizes="96px" className="object-cover" />
                </div>
                <div className="flex-1">
                  <Link href={`/product/${product?.slug}`} className="font-medium hover:text-primary">{product?.name}</Link>
                  {item.variant?.color && <p className="text-xs text-gray-500 mt-1">Color: {item.variant.color}</p>}
                  <p className="font-bold mt-2">{formatPrice(price)}</p>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center border border-secondary rounded-full">
                      <button onClick={() => updateItem(item._id, Math.max(1, item.quantity - 1))} className="p-2"><Minus className="w-3 h-3" /></button>
                      <span className="px-3 text-sm">{item.quantity}</span>
                      <button onClick={() => updateItem(item._id, item.quantity + 1)} className="p-2"><Plus className="w-3 h-3" /></button>
                    </div>
                    <button onClick={() => removeItem(item._id)} className="text-red-400 hover:text-red-600 p-2">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="bg-white p-6 rounded-2xl border border-secondary/30 space-y-4">
          <h2 className="font-semibold text-lg">Order Summary</h2>

          <div className="flex gap-2">
            <Input placeholder="Coupon code" value={couponCode} onChange={(e) => setCouponCode(e.target.value)} />
            <Button variant="outline" onClick={handleCoupon}>Apply</Button>
          </div>
          {couponMsg && <p className="text-xs text-primary">{couponMsg}</p>}

          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span>Subtotal</span><span>{formatPrice(totals.subtotal)}</span></div>
            {totals.discount > 0 && <div className="flex justify-between text-emerald-600"><span>Discount</span><span>-{formatPrice(totals.discount)}</span></div>}
            <div className="flex justify-between"><span>Tax (3%)</span><span>{formatPrice(totals.tax)}</span></div>
            <div className="flex justify-between"><span>Shipping</span><span>{totals.shipping === 0 ? 'FREE' : formatPrice(totals.shipping)}</span></div>
            <div className="flex justify-between font-bold text-lg pt-2 border-t"><span>Total</span><span>{formatPrice(totals.total)}</span></div>
          </div>

          <Button asChild size="lg" className="w-full">
            <Link href="/checkout">Proceed to Checkout</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
