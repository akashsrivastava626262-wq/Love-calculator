import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(price);
}

export function calculateDiscount(original: number, current: number) {
  return Math.round(((original - current) / original) * 100);
}

export function getSessionId() {
  if (typeof window === 'undefined') return '';
  let id = localStorage.getItem('aakshi_session');
  if (!id) {
    id = 'sess_' + Math.random().toString(36).substring(2, 15);
    localStorage.setItem('aakshi_session', id);
  }
  return id;
}
