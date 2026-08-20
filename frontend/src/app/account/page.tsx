'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { useAuthStore } from '@/lib/store';
import { authAPI } from '@/lib/api';
import { loginUser, registerUser, socialLoginDemo, DEMO_CREDENTIALS } from '@/lib/authService';

export default function AccountPage() {
  const router = useRouter();
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
      const { user: loggedIn, token } = await loginUser(form.email, form.password);
      setAuth(loggedIn, token);
      router.push(loggedIn.role === 'admin' ? '/admin' : '/account');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const { user: registered, token } = await registerUser(form);
      setAuth(registered, token);
      router.push('/account');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const handleSendOTP = async () => {
    setLoading(true);
    setError('');
    try {
      await authAPI.sendOTP({ phone: form.phone });
      setOtpSent(true);
    } catch {
      setOtpSent(true);
      setError('');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const { data } = await authAPI.verifyOTP({ phone: form.phone, otp: form.otp });
      setAuth(data.user, data.token);
      router.push('/account');
    } catch {
      if (form.otp === '123456' || form.otp.length === 6) {
        setAuth({
          id: 'demo-otp',
          name: 'OTP User',
          phone: form.phone,
          role: 'user',
        }, `demo_otp_${Date.now()}`);
        router.push('/account');
      } else {
        setError('Invalid OTP. Use any 6-digit code in demo mode.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSocial = async (provider: 'google' | 'facebook') => {
    setLoading(true);
    setError('');
    try {
      const { user: socialUser, token } = await socialLoginDemo(provider, form.email);
      setAuth(socialUser, token);
      router.push('/account');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Social login failed');
    } finally {
      setLoading(false);
    }
  };

  const fillDemo = (type: 'admin' | 'customer') => {
    const creds = DEMO_CREDENTIALS[type];
    setForm((f) => ({ ...f, email: creds.email, password: creds.password }));
    setMode('login');
  };

  if (isAuthenticated() && user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="font-display text-3xl font-bold mb-8">My Account</h1>
        <div className="grid md:grid-cols-3 gap-8">
          <Card>
            <CardContent className="pt-6">
              <p className="font-medium text-lg">{user.name}</p>
              <p className="text-sm text-gray-500">{user.email || user.phone}</p>
              <p className="text-xs text-primary mt-1 capitalize">{user.role} account</p>
              <p className="text-sm text-primary mt-2">Loyalty Points: {user.loyaltyPoints || 0}</p>
              <p className="text-sm text-primary">Wallet: ₹{user.walletBalance || 0}</p>
              {user.role === 'admin' && (
                <Button asChild className="mt-4 w-full">
                  <Link href="/admin">Go to Admin Panel</Link>
                </Button>
              )}
              <Button variant="outline" className="mt-3 w-full" onClick={logout}>Logout</Button>
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
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 bg-gradient-to-br from-secondary/30 via-background to-accent/10">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">
            {mode === 'login' ? 'Welcome Back' : mode === 'register' ? 'Join AAKSHI' : 'OTP Login'}
          </h1>
          <p className="text-gray-500 text-sm">Elegance That Adorns Every Girl</p>
        </div>

        <Card className="border-secondary/50 shadow-xl shadow-primary/10">
          <CardContent className="pt-6">
            {error && (
              <div className="bg-red-50 text-red-600 text-sm p-3 rounded-xl mb-4 border border-red-100">
                {error}
              </div>
            )}

            {mode === 'login' && (
              <form onSubmit={handleLogin} className="space-y-4">
                <Input type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
                <Input type="password" placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
                <Button type="submit" className="w-full" size="lg" disabled={loading}>
                  {loading ? 'Signing in...' : 'Sign In'}
                </Button>
              </form>
            )}

            {mode === 'register' && (
              <form onSubmit={handleRegister} className="space-y-4">
                <Input placeholder="Full Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
                <Input type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                <Input placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                <Input type="password" placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
                <Button type="submit" className="w-full" size="lg" disabled={loading}>
                  {loading ? 'Creating...' : 'Create Account'}
                </Button>
              </form>
            )}

            {mode === 'otp' && (
              <form onSubmit={handleVerifyOTP} className="space-y-4">
                <Input placeholder="Phone Number" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} required />
                {!otpSent ? (
                  <Button onClick={handleSendOTP} className="w-full" disabled={loading}>Send OTP</Button>
                ) : (
                  <>
                    <Input placeholder="Enter OTP (demo: any 6 digits)" value={form.otp} onChange={(e) => setForm({ ...form, otp: e.target.value })} required />
                    <Button type="submit" className="w-full" disabled={loading}>Verify OTP</Button>
                  </>
                )}
              </form>
            )}

            <div className="mt-6 p-4 bg-secondary/40 rounded-xl">
              <p className="text-xs font-semibold text-foreground/70 uppercase tracking-wide mb-2">Demo credentials</p>
              <div className="flex gap-2 mb-2">
                <Button type="button" variant="outline" size="sm" onClick={() => fillDemo('customer')}>Customer</Button>
                <Button type="button" variant="gold" size="sm" onClick={() => fillDemo('admin')}>Admin</Button>
              </div>
              <p className="text-xs text-gray-500">test@aakshi.com / test123 · admin@aakshi.com / admin123</p>
            </div>

            <div className="mt-4 flex justify-center gap-4 text-sm">
              {mode !== 'login' && <button onClick={() => setMode('login')} className="text-primary hover:underline">Sign In</button>}
              {mode !== 'register' && <button onClick={() => setMode('register')} className="text-primary hover:underline">Register</button>}
              {mode !== 'otp' && <button onClick={() => setMode('otp')} className="text-primary hover:underline">OTP</button>}
            </div>

            <div className="mt-6 pt-6 border-t">
              <p className="text-xs text-gray-500 text-center mb-3">Or continue with</p>
              <div className="flex gap-3">
                <Button variant="outline" className="flex-1" disabled={loading} onClick={() => handleSocial('google')}>Google</Button>
                <Button variant="outline" className="flex-1" disabled={loading} onClick={() => handleSocial('facebook')}>Facebook</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
