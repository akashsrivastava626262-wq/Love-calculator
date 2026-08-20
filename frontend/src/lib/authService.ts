import { authAPI } from './api';

export interface AuthUser {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  role: string;
  avatar?: string;
  loyaltyPoints?: number;
  walletBalance?: number;
  referralCode?: string;
}

const DEMO_ACCOUNTS: Record<string, { password: string; user: AuthUser }> = {
  'admin@aakshi.com': {
    password: 'admin123',
    user: {
      id: 'demo-admin',
      name: 'AAKSHI Admin',
      email: 'admin@aakshi.com',
      role: 'admin',
      loyaltyPoints: 0,
      walletBalance: 0,
      referralCode: 'AAKADMIN001',
    },
  },
  'test@aakshi.com': {
    password: 'test123',
    user: {
      id: 'demo-test',
      name: 'Test Customer',
      email: 'test@aakshi.com',
      phone: '9876543210',
      role: 'user',
      loyaltyPoints: 250,
      walletBalance: 100,
      referralCode: 'AAKTEST001',
    },
  },
};

function demoLogin(email: string, password: string): { user: AuthUser; token: string } | null {
  const account = DEMO_ACCOUNTS[email.toLowerCase().trim()];
  if (!account || account.password !== password) return null;
  return {
    user: account.user,
    token: `demo_${account.user.id}_${Date.now()}`,
  };
}

function isNetworkError(error: unknown): boolean {
  if (!error || typeof error !== 'object') return false;
  const err = error as { code?: string; message?: string; response?: unknown };
  return !err.response || err.code === 'ERR_NETWORK' || err.message === 'Network Error';
}

export async function loginUser(email: string, password: string) {
  try {
    const { data } = await authAPI.login({ email, password });
    if (data.success) return { user: data.user as AuthUser, token: data.token as string };
  } catch (error) {
    if (!isNetworkError(error)) {
      const message = (error as { response?: { data?: { message?: string } } })?.response?.data?.message;
      throw new Error(message || 'Invalid credentials');
    }
  }

  const demo = demoLogin(email, password);
  if (!demo) throw new Error('Invalid credentials');
  return demo;
}

export async function registerUser(data: Record<string, string>) {
  try {
    const { data: res } = await authAPI.register(data);
    if (res.success) return { user: res.user as AuthUser, token: res.token as string };
  } catch (error) {
    if (!isNetworkError(error)) {
      const message = (error as { response?: { data?: { message?: string } } })?.response?.data?.message;
      throw new Error(message || 'Registration failed');
    }
  }

  if (!data.email || !data.password || !data.name) throw new Error('Registration failed');
  const demo = demoLogin(data.email, data.password);
  if (demo) return demo;

  return {
    user: {
      id: `demo-${Date.now()}`,
      name: data.name,
      email: data.email,
      phone: data.phone,
      role: 'user',
      loyaltyPoints: 0,
      walletBalance: 0,
    } as AuthUser,
    token: `demo_new_${Date.now()}`,
  };
}

export async function socialLoginDemo(provider: string, email?: string, name?: string) {
  try {
    const { data } = await authAPI.socialLogin({
      provider,
      providerId: `demo-${provider}`,
      email: email || `${provider}@demo.com`,
      name: name || `${provider} User`,
    });
    if (data.success) return { user: data.user as AuthUser, token: data.token as string };
  } catch (error) {
    if (!isNetworkError(error)) throw new Error('Social login failed');
  }

  return {
    user: {
      id: `demo-social-${provider}`,
      name: name || `${provider} User`,
      email: email || `${provider}@demo.com`,
      role: 'user',
    } as AuthUser,
    token: `demo_social_${Date.now()}`,
  };
}

export const DEMO_CREDENTIALS = {
  admin: { email: 'admin@aakshi.com', password: 'admin123' },
  customer: { email: 'test@aakshi.com', password: 'test123' },
};
