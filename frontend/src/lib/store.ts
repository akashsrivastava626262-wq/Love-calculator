import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import Cookies from 'js-cookie';
import { cartAPI } from './api';

interface User {
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

interface CartItem {
  _id: string;
  product: {
    _id: string;
    name: string;
    slug: string;
    price: number;
    originalPrice: number;
    images: { url: string; alt?: string }[];
  };
  quantity: number;
  variant?: { color?: string; size?: string; price?: number };
  savedForLater?: boolean;
}

interface CartTotals {
  subtotal: number;
  discount: number;
  tax: number;
  shipping: number;
  total: number;
  itemCount: number;
}

interface AuthState {
  user: User | null;
  token: string | null;
  setAuth: (user: User, token: string) => void;
  logout: () => void;
  isAuthenticated: () => boolean;
}

interface CartState {
  items: CartItem[];
  totals: CartTotals;
  isLoading: boolean;
  fetchCart: () => Promise<void>;
  addItem: (productId: string, quantity?: number, variant?: Record<string, string>) => Promise<void>;
  updateItem: (itemId: string, quantity: number) => Promise<void>;
  removeItem: (itemId: string) => Promise<void>;
  applyCoupon: (code: string) => Promise<{ success: boolean; message?: string }>;
}

interface WishlistState {
  items: string[];
  toggle: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
}

interface RecentlyViewedState {
  items: string[];
  add: (productId: string) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      setAuth: (user, token) => {
        Cookies.set('token', token, { expires: 7 });
        set({ user, token });
      },
      logout: () => {
        Cookies.remove('token');
        set({ user: null, token: null });
      },
      isAuthenticated: () => !!get().token,
    }),
    { name: 'aakshi-auth' }
  )
);

export const useCartStore = create<CartState>((set) => ({
  items: [],
  totals: { subtotal: 0, discount: 0, tax: 0, shipping: 0, total: 0, itemCount: 0 },
  isLoading: false,
  fetchCart: async () => {
    set({ isLoading: true });
    try {
      const { data } = await cartAPI.get();
      set({ items: data.cart?.items || [], totals: data.totals });
    } catch {
      /* guest cart may be empty */
    } finally {
      set({ isLoading: false });
    }
  },
  addItem: async (productId, quantity = 1, variant) => {
    const { data } = await cartAPI.add({ productId, quantity, variant });
    set({ items: data.cart.items, totals: data.totals });
  },
  updateItem: async (itemId, quantity) => {
    const { data } = await cartAPI.update(itemId, { quantity });
    set({ items: data.cart.items, totals: data.totals });
  },
  removeItem: async (itemId) => {
    const { data } = await cartAPI.remove(itemId);
    set({ items: data.cart.items, totals: data.totals });
  },
  applyCoupon: async (code) => {
    try {
      const { data } = await cartAPI.applyCoupon(code);
      set({ totals: data.totals });
      return { success: true };
    } catch (err: unknown) {
      const message = (err as { response?: { data?: { message?: string } } })?.response?.data?.message;
      return { success: false, message };
    }
  },
}));

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      toggle: (productId) => {
        const items = get().items;
        if (items.includes(productId)) {
          set({ items: items.filter((id) => id !== productId) });
        } else {
          set({ items: [...items, productId] });
        }
      },
      isInWishlist: (productId) => get().items.includes(productId),
    }),
    { name: 'aakshi-wishlist' }
  )
);

export const useRecentlyViewedStore = create<RecentlyViewedState>()(
  persist(
    (set, get) => ({
      items: [],
      add: (productId) => {
        const items = [productId, ...get().items.filter((id) => id !== productId)].slice(0, 20);
        set({ items });
      },
    }),
    { name: 'aakshi-recent' }
  )
);
