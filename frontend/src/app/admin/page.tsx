'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/lib/store';
import { formatPrice } from '@/lib/utils';
import { LoginForm } from '@/components/auth/LoginForm';

export default function AdminDashboard() {
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuthStore();
  const [hydrated, setHydrated] = useState(false);
  const [stats, setStats] = useState({
    revenue: 125000, orders: 342, products: 16, customers: 1250, visitors: 18500, conversionRate: '1.85',
  });

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) return null;

  if (!isAuthenticated()) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 bg-gradient-to-br from-foreground via-foreground/95 to-primary/30">
        <div className="w-full max-w-md">
          <div className="text-center mb-6 text-white">
            <h1 className="font-display text-3xl font-bold">AAKSHI Admin</h1>
            <p className="text-white/70 text-sm mt-2">Sign in with admin credentials</p>
          </div>
          <LoginForm title="Admin Login" redirectTo="/admin" showDemoHints={true} />
        </div>
      </div>
    );
  }

  if (user?.role !== 'admin') {
    return (
      <div className="container mx-auto px-4 py-20 text-center max-w-md">
        <Card>
          <CardContent className="pt-6 space-y-4">
            <p className="text-lg font-semibold">Admin access required</p>
            <p className="text-sm text-gray-500">
              You are signed in as <strong>{user?.email}</strong> (customer account).
            </p>
            <div className="flex flex-col gap-2">
              <Button onClick={() => { logout(); router.refresh(); }}>Logout & use admin account</Button>
              <Button variant="outline" asChild><Link href="/account">Go to My Account</Link></Button>
            </div>
          </CardContent>
        </Card>
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
      <div className="flex flex-wrap justify-between items-center gap-4 mb-8">
        <div>
          <h1 className="font-display text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-gray-500 text-sm">Welcome, {user.name}</p>
        </div>
        <Button variant="outline" onClick={logout}>Logout</Button>
      </div>

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
