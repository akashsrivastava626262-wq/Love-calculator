'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuthStore } from '@/lib/store';
import { authAPI } from '@/lib/api';

export default function AccountPage() {
  const { user, setAuth, logout, isAuthenticated } = useAuthStore();
  const [mode, setMode] = useState<'login' | 'register' | 'otp'>('login');
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', otp: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [otpSent, setOtpSent] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const { data } = await authAPI.login({ email: form.email, password: form.password });
      setAuth(data.user, data.token);
    } catch {
      setError('Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const { data } = await authAPI.register(form);
      setAuth(data.user, data.token);
    } catch {
      setError('Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const handleSendOTP = async () => {
    setLoading(true);
    try {
      await authAPI.sendOTP({ phone: form.phone });
      setOtpSent(true);
    } catch {
      setError('Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await authAPI.verifyOTP({ phone: form.phone, otp: form.otp });
      setAuth(data.user, data.token);
    } catch {
      setError('Invalid OTP');
    } finally {
      setLoading(false);
    }
  };

  if (isAuthenticated() && user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="font-display text-3xl font-bold mb-8">My Account</h1>
        <div className="grid md:grid-cols-3 gap-8">
          <Card>
            <CardHeader><CardTitle>Profile</CardTitle></CardHeader>
            <CardContent>
              <p className="font-medium">{user.name}</p>
              <p className="text-sm text-gray-500">{user.email || user.phone}</p>
              <p className="text-sm text-primary mt-2">Loyalty Points: {user.loyaltyPoints || 0}</p>
              <p className="text-sm text-primary">Wallet: ₹{user.walletBalance || 0}</p>
              <Button variant="outline" className="mt-4" onClick={logout}>Logout</Button>
            </CardContent>
          </Card>

          <div className="md:col-span-2 grid sm:grid-cols-2 gap-4">
            {[
              { href: '/account/orders', label: 'Order History', desc: 'View past orders' },
              { href: '/wishlist', label: 'Wishlist', desc: 'Your saved items' },
              { href: '/track-order', label: 'Track Order', desc: 'Track your delivery' },
              { href: '/account/rewards', label: 'Rewards', desc: 'Loyalty & referrals' },
            ].map((item) => (
              <Link key={item.href} href={item.href} className="p-6 bg-white rounded-2xl border border-secondary/30 hover:shadow-lg hover:shadow-primary/10 transition-all">
                <p className="font-semibold">{item.label}</p>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-md">
      <h1 className="font-display text-3xl font-bold mb-8 text-center">
        {mode === 'login' ? 'Welcome Back' : mode === 'register' ? 'Create Account' : 'OTP Login'}
      </h1>

      <Card>
        <CardContent className="pt-6">
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          {mode === 'login' && (
            <form onSubmit={handleLogin} className="space-y-4">
              <Input type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
              <Input type="password" placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
              <Button type="submit" className="w-full" disabled={loading}>{loading ? 'Signing in...' : 'Sign In'}</Button>
            </form>
          )}

          {mode === 'register' && (
            <form onSubmit={handleRegister} className="space-y-4">
              <Input placeholder="Full Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
              <Input type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
              <Input placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
              <Input type="password" placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
              <Button type="submit" className="w-full" disabled={loading}>{loading ? 'Creating...' : 'Create Account'}</Button>
            </form>
          )}

          {mode === 'otp' && (
            <form onSubmit={handleVerifyOTP} className="space-y-4">
              <Input placeholder="Phone Number" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} required />
              {!otpSent ? (
                <Button onClick={handleSendOTP} className="w-full" disabled={loading}>Send OTP</Button>
              ) : (
                <>
                  <Input placeholder="Enter OTP" value={form.otp} onChange={(e) => setForm({ ...form, otp: e.target.value })} required />
                  <Button type="submit" className="w-full" disabled={loading}>Verify OTP</Button>
                </>
              )}
            </form>
          )}

          <div className="mt-6 space-y-2 text-center text-sm">
            {mode !== 'login' && <button onClick={() => setMode('login')} className="text-primary hover:underline">Sign In</button>}
            {mode !== 'register' && <button onClick={() => setMode('register')} className="text-primary hover:underline block">Create Account</button>}
            {mode !== 'otp' && <button onClick={() => setMode('otp')} className="text-primary hover:underline block">Login with OTP</button>}
          </div>

          <div className="mt-6 pt-6 border-t">
            <p className="text-xs text-gray-500 text-center mb-3">Or continue with</p>
            <div className="flex gap-3">
              <Button variant="outline" className="flex-1" onClick={() => authAPI.socialLogin({ provider: 'google', providerId: 'demo', email: form.email, name: 'Google User' }).then(({ data }) => setAuth(data.user, data.token))}>
                Google
              </Button>
              <Button variant="outline" className="flex-1" onClick={() => authAPI.socialLogin({ provider: 'facebook', providerId: 'demo', email: form.email, name: 'Facebook User' }).then(({ data }) => setAuth(data.user, data.token))}>
                Facebook
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
