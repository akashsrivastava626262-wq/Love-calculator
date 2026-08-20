import axios from 'axios';
import Cookies from 'js-cookie';
import { getSessionId } from './utils';

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
const API_URL = process.env.NEXT_PUBLIC_API_URL || (basePath ? `${basePath}/api` : '/api');

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = Cookies.get('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  config.headers['x-session-id'] = getSessionId();
  return config;
});

export const authAPI = {
  register: (data: Record<string, string>) => api.post('/auth/register', data),
  login: (data: Record<string, string>) => api.post('/auth/login', data),
  sendOTP: (data: Record<string, string>) => api.post('/auth/otp/send', data),
  verifyOTP: (data: Record<string, string>) => api.post('/auth/otp/verify', data),
  forgotPassword: (email: string) => api.post('/auth/forgot-password', { email }),
  resetPassword: (data: Record<string, string>) => api.post('/auth/reset-password', data),
  socialLogin: (data: Record<string, string>) => api.post('/auth/social', data),
  getProfile: () => api.get('/auth/profile'),
  updateProfile: (data: Record<string, string>) => api.put('/auth/profile', data),
  changePassword: (data: Record<string, string>) => api.put('/auth/change-password', data),
  getWishlist: () => api.get('/auth/wishlist'),
  toggleWishlist: (productId: string) => api.post(`/auth/wishlist/${productId}`),
  addAddress: (data: Record<string, string>) => api.post('/auth/addresses', data),
  deleteAddress: (id: string) => api.delete(`/auth/addresses/${id}`),
};

export const productAPI = {
  getAll: (params?: Record<string, string | number | boolean>) => api.get('/products', { params }),
  getOne: (slug: string) => api.get(`/products/${slug}`),
  search: (q: string) => api.get('/products/search', { params: { q } }),
  getCategories: () => api.get('/products/categories'),
  getCategory: (slug: string) => api.get(`/products/categories/${slug}`),
  getRecommendations: (params?: Record<string, string>) => api.get('/products/recommendations', { params }),
  addReview: (id: string, data: Record<string, unknown>) => api.post(`/products/${id}/reviews`, data),
};

export const cartAPI = {
  get: (pincode?: string) => api.get('/cart', { params: { pincode } }),
  add: (data: Record<string, unknown>) => api.post('/cart/add', data),
  update: (itemId: string, data: Record<string, unknown>) => api.put(`/cart/item/${itemId}`, data),
  remove: (itemId: string) => api.delete(`/cart/item/${itemId}`),
  applyCoupon: (code: string) => api.post('/cart/coupon', { code }),
  removeCoupon: () => api.delete('/cart/coupon'),
  estimateDelivery: (pincode: string) => api.get('/cart/estimate-delivery', { params: { pincode } }),
};

export const orderAPI = {
  create: (data: Record<string, unknown>) => api.post('/orders', data),
  verifyPayment: (data: Record<string, string>) => api.post('/orders/verify-payment', data),
  getAll: () => api.get('/orders'),
  getOne: (id: string) => api.get(`/orders/${id}`),
  track: (orderNumber: string, phone: string) => api.get('/orders/track', { params: { orderNumber, phone } }),
  requestReturn: (id: string, reason: string) => api.post(`/orders/${id}/return`, { reason }),
};

export const adminAPI = {
  getDashboard: () => api.get('/dashboard'),
  getBanners: () => api.get('/banners'),
  getBlogs: () => api.get('/blogs'),
  getBlog: (slug: string) => api.get(`/blogs/${slug}`),
  subscribeNewsletter: (email: string) => api.post('/newsletter', { email }),
  aiChat: (message: string) => api.post('/ai-chat', { message }),
};

export default api;
