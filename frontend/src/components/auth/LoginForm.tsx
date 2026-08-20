'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { useAuthStore } from '@/lib/store';
import { loginUser, DEMO_CREDENTIALS } from '@/lib/authService';

export function LoginForm({
  redirectTo,
  title = 'Welcome Back',
  showDemoHints = true,
}: {
  redirectTo?: string;
  title?: string;
  showDemoHints?: boolean;
}) {
  const router = useRouter();
  const { setAuth } = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const { user, token } = await loginUser(email, password);
      setAuth(user, token);
      router.push(redirectTo || (user.role === 'admin' ? '/admin' : '/account'));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const fillDemo = (type: 'admin' | 'customer') => {
    const creds = DEMO_CREDENTIALS[type];
    setEmail(creds.email);
    setPassword(creds.password);
  };

  return (
    <Card className="border-secondary/50 shadow-xl shadow-primary/5">
      <CardContent className="pt-6">
        <h2 className="font-display text-2xl font-bold text-center mb-6">{title}</h2>
        {error && (
          <div className="bg-red-50 text-red-600 text-sm p-3 rounded-xl mb-4 border border-red-100">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button type="submit" className="w-full" size="lg" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </Button>
        </form>

        {showDemoHints && (
          <div className="mt-6 p-4 bg-secondary/40 rounded-xl space-y-2">
            <p className="text-xs font-semibold text-foreground/70 uppercase tracking-wide">Quick demo login</p>
            <div className="flex flex-wrap gap-2">
              <Button type="button" variant="outline" size="sm" onClick={() => fillDemo('customer')}>
                Customer
              </Button>
              <Button type="button" variant="gold" size="sm" onClick={() => fillDemo('admin')}>
                Admin
              </Button>
            </div>
            <p className="text-xs text-gray-500">
              Customer: test@aakshi.com / test123 · Admin: admin@aakshi.com / admin123
            </p>
          </div>
        )}

        <p className="text-center text-sm text-gray-500 mt-4">
          <Link href="/account" className="text-primary hover:underline">Full account options</Link>
        </p>
      </CardContent>
    </Card>
  );
}
