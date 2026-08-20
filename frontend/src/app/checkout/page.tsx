'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatPrice } from '@/lib/utils';
import { useCartStore, useAuthStore } from '@/lib/store';
import { orderAPI } from '@/lib/api';

const PAYMENT_METHODS = [
  { id: 'razorpay', label: 'Razorpay (Cards, UPI, Netbanking)' },
  { id: 'upi', label: 'UPI' },
  { id: 'google_pay', label: 'Google Pay' },
  { id: 'phonepe', label: 'PhonePe' },
  { id: 'paytm', label: 'Paytm' },
  { id: 'stripe', label: 'Stripe (International Cards)' },
  { id: 'cod', label: 'Cash on Delivery' },
];

export default function CheckoutPage() {
  const { totals } = useCartStore();
  const { user } = useAuthStore();
  const [paymentMethod, setPaymentMethod] = useState('razorpay');
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    fullName: user?.name || '',
    phone: user?.phone || '',
    email: user?.email || '',
    addressLine1: '',
    city: '',
    state: '',
    pincode: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await orderAPI.create({
        shippingAddress: form,
        paymentMethod,
        guestEmail: form.email,
        guestPhone: form.phone,
      });
      if (data.paymentData?.stub || paymentMethod === 'cod') {
        window.location.href = `/track-order?orderNumber=${data.order.orderNumber}`;
      } else {
        alert(`Order ${data.order.orderNumber} created! Complete payment to confirm.`);
      }
    } catch {
      alert('Order placement failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="font-display text-3xl font-bold mb-8">Checkout</h1>

      <form onSubmit={handleSubmit}>
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader><CardTitle>Delivery Address</CardTitle></CardHeader>
              <CardContent className="grid md:grid-cols-2 gap-4">
                <Input placeholder="Full Name" value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} required />
                <Input placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} required />
                <Input placeholder="Email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="md:col-span-2" />
                <Input placeholder="Address" value={form.addressLine1} onChange={(e) => setForm({ ...form, addressLine1: e.target.value })} className="md:col-span-2" required />
                <Input placeholder="City" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} required />
                <Input placeholder="State" value={form.state} onChange={(e) => setForm({ ...form, state: e.target.value })} required />
                <Input placeholder="Pincode" value={form.pincode} onChange={(e) => setForm({ ...form, pincode: e.target.value })} required />
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle>Payment Method</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                {PAYMENT_METHODS.map((pm) => (
                  <label key={pm.id} className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-colors ${paymentMethod === pm.id ? 'border-primary bg-secondary/30' : 'border-gray-200'}`}>
                    <input type="radio" name="payment" value={pm.id} checked={paymentMethod === pm.id} onChange={() => setPaymentMethod(pm.id)} />
                    <span className="text-sm">{pm.label}</span>
                  </label>
                ))}
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader><CardTitle>Order Summary</CardTitle></CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex justify-between"><span>Subtotal</span><span>{formatPrice(totals.subtotal)}</span></div>
                {totals.discount > 0 && <div className="flex justify-between text-emerald-600"><span>Discount</span><span>-{formatPrice(totals.discount)}</span></div>}
                <div className="flex justify-between"><span>Tax</span><span>{formatPrice(totals.tax)}</span></div>
                <div className="flex justify-between"><span>Shipping</span><span>{totals.shipping === 0 ? 'FREE' : formatPrice(totals.shipping)}</span></div>
                <div className="flex justify-between font-bold text-lg pt-2 border-t"><span>Total</span><span>{formatPrice(totals.total)}</span></div>
                <Button type="submit" size="lg" className="w-full mt-4" disabled={loading}>
                  {loading ? 'Processing...' : 'Place Order'}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  );
}
