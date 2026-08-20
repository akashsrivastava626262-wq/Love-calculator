'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useAuthStore } from '@/lib/store';
import { formatPrice } from '@/lib/utils';

export default function AdminDashboard() {
  const { user, isAuthenticated } = useAuthStore();
  const [stats, setStats] = useState({
    revenue: 125000, orders: 342, products: 16, customers: 1250, visitors: 18500, conversionRate: '1.85',
  });

  useEffect(() => {
    if (!isAuthenticated() || user?.role !== 'admin') return;
  }, [isAuthenticated, user]);

  if (!isAuthenticated()) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <p className="mb-4">Admin access required</p>
        <Button asChild><Link href="/account">Login</Link></Button>
      </div>
    );
  }

  const menuItems = [
    { href: '/admin/products', label: 'Products', icon: '📦' },
    { href: '/admin/orders', label: 'Orders', icon: '🛒' },
    { href: '/admin/customers', label: 'Customers', icon: '👥' },
    { href: '/admin/coupons', label: 'Coupons', icon: '🏷️' },
    { href: '/admin/banners', label: 'Banners', icon: '🖼️' },
    { href: '/admin/inventory', label: 'Inventory', icon: '📊' },
    { href: '/admin/reviews', label: 'Reviews', icon: '⭐' },
    { href: '/admin/marketing', label: 'Marketing', icon: '📣' },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="font-display text-3xl font-bold mb-8">Admin Dashboard</h1>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        {[
          { label: 'Revenue', value: formatPrice(stats.revenue) },
          { label: 'Orders', value: stats.orders },
          { label: 'Products', value: stats.products },
          { label: 'Customers', value: stats.customers },
          { label: 'Visitors', value: stats.visitors.toLocaleString() },
          { label: 'Conversion', value: `${stats.conversionRate}%` },
        ].map((s) => (
          <Card key={s.label}>
            <CardContent className="pt-6">
              <p className="text-xs text-gray-500">{s.label}</p>
              <p className="text-2xl font-bold text-primary">{s.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid md:grid-cols-4 gap-4">
        {menuItems.map((item) => (
          <Link key={item.href} href={item.href} className="p-6 bg-white rounded-2xl border border-secondary/30 hover:shadow-lg hover:shadow-primary/10 transition-all text-center">
            <span className="text-2xl">{item.icon}</span>
            <p className="font-medium mt-2">{item.label}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
