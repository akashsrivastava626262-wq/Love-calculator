const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

interface FetchOptions extends RequestInit {
  token?: string;
}

export async function api<T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<T> {
  const { token, ...fetchOptions } = options;

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  if (token) {
    (headers as Record<string, string>)["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(`${API_URL}${endpoint}`, {
    ...fetchOptions,
    headers,
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Something went wrong");
  }

  return data;
}

export const productsApi = {
  getAll: (params?: Record<string, string>) => {
    const query = params ? "?" + new URLSearchParams(params).toString() : "";
    return api<{ data: Product[]; pagination: Pagination }>(`/api/products${query}`);
  },
  getFeatured: () => api<{ data: Product[] }>("/api/products/featured"),
  getBestSellers: () => api<{ data: Product[] }>("/api/products/best-sellers"),
  getBySlug: (slug: string) =>
    api<{ data: { product: Product; similar: Product[] } }>(`/api/products/${slug}`),
};

export const collectionsApi = {
  getFeatured: () => api<{ data: Collection[] }>("/api/collections/featured"),
  getAll: () => api<{ data: Collection[] }>("/api/collections"),
};

export const authApi = {
  login: (email: string, password: string) =>
    api<{ data: { user: User; token: string } }>("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),
  register: (data: { email: string; password: string; name: string; phone?: string }) =>
    api<{ data: { user: User; token: string } }>("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
    }),
};

export const newsletterApi = {
  subscribe: (email: string) =>
    api("/api/newsletter/subscribe", {
      method: "POST",
      body: JSON.stringify({ email }),
    }),
};

export const contactApi = {
  send: (data: ContactForm) =>
    api("/api/contact", { method: "POST", body: JSON.stringify(data) }),
};

export const searchApi = {
  search: (q: string) => api<{ data: Product[] }>(`/api/search?q=${encodeURIComponent(q)}`),
};

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription?: string;
  price: number | string;
  compareAtPrice?: number | string;
  sku: string;
  stock: number;
  images: string[];
  videos?: string[];
  material?: string;
  careInstructions?: string;
  isFeatured?: boolean;
  isBestSeller?: boolean;
  isTrending?: boolean;
  isNewArrival?: boolean;
  averageRating: number;
  reviewCount: number;
  category?: { name: string; slug: string };
  collection?: { name: string; slug: string };
  variants?: ProductVariant[];
  reviews?: Review[];
}

export interface ProductVariant {
  id: string;
  name: string;
  sku: string;
  price: number;
  stock: number;
  options: Record<string, string>;
}

export interface Collection {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  featured?: boolean;
  products?: Product[];
  _count?: { products: number };
}

export interface User {
  id: string;
  email: string;
  name?: string;
  role: string;
  image?: string;
  rewardPoints?: number;
  referralCode?: string;
}

export interface Review {
  id: string;
  rating: number;
  title?: string;
  comment: string;
  images: string[];
  user: { name?: string; image?: string };
  createdAt: string;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface ContactForm {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

export interface CartItem {
  id: string;
  quantity: number;
  product: Product;
}

export interface Order {
  id: string;
  orderNumber: string;
  status: string;
  paymentStatus: string;
  total: number;
  items: OrderItem[];
  createdAt: string;
}

export interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}
