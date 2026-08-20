'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { orderAPI } from '@/lib/api';
import type { Order } from '@/lib/types';

export default function TrackOrderPage() {
  const [orderNumber, setOrderNumber] = useState('');
  const [phone, setPhone] = useState('');
  const [order, setOrder] = useState<Order | null>(null);
  const [error, setError] = useState('');

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const { data } = await orderAPI.track(orderNumber, phone);
      setOrder(data.order);
    } catch {
      setError('Order not found. Please check your details.');
      setOrder(null);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-lg">
      <h1 className="font-display text-3xl font-bold mb-8 text-center">Track Your Order</h1>

      <form onSubmit={handleTrack} className="space-y-4 mb-8">
        <Input placeholder="Order Number (e.g. AAK...)" value={orderNumber} onChange={(e) => setOrderNumber(e.target.value)} required />
        <Input placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} required />
        <Button type="submit" className="w-full">Track Order</Button>
      </form>

      {error && <p className="text-red-500 text-sm text-center">{error}</p>}

      {order && (
        <Card>
          <CardContent className="pt-6 space-y-4">
            <div className="flex justify-between">
              <span className="font-medium">Order #{order.orderNumber}</span>
              <span className="text-primary font-medium capitalize">{order.orderStatus}</span>
            </div>
            {order.statusHistory?.map((s, i) => (
              <div key={i} className="flex items-center gap-3 text-sm">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <span className="capitalize">{s.status}</span>
                <span className="text-gray-400">{new Date(s.timestamp).toLocaleDateString()}</span>
              </div>
            ))}
            {order.trackingNumber && <p className="text-sm">Tracking: {order.trackingNumber}</p>}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
