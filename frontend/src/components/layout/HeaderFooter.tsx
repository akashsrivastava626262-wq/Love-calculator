'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, Heart, ShoppingBag, User, Menu, X, Phone,
  Share2, Globe, Video,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuthStore, useCartStore } from '@/lib/store';
import { BRAND } from '@/lib/types';
import { productAPI } from '@/lib/api';
import type { Product } from '@/lib/types';

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const { user, logout } = useAuthStore();
  const { totals, fetchCart } = useCartStore();

  useEffect(() => { fetchCart(); }, [fetchCart]);

  const handleSearch = async (q: string) => {
    setSearchQuery(q);
    if (q.length < 2) { setSearchResults([]); return; }
    try {
      const { data } = await productAPI.search(q);
      setSearchResults(data.products || []);
    } catch {
      setSearchResults([]);
    }
  };

  const navLinks = [
    { href: '/shop', label: 'Shop' },
    { href: '/shop?collection=korean', label: 'Korean' },
    { href: '/shop?collection=ethnic', label: 'Ethnic' },
    { href: '/shop?collection=wedding', label: 'Wedding' },
    { href: '/shop?isNewArrival=true', label: 'New Arrivals' },
    { href: '/blog', label: 'Blog' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-secondary/50">
      <div className="bg-primary text-white text-center py-1.5 text-xs font-medium">
        ✨ Free Shipping on orders above ₹999 | Use code WELCOME20 for 20% off
      </div>

      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <button className="lg:hidden p-2" onClick={() => setMobileOpen(true)} aria-label="Menu">
            <Menu className="w-5 h-5" />
          </button>

          <Link href="/" className="flex items-center gap-2">
            <span className="font-display text-2xl font-bold text-primary tracking-wider">{BRAND.name}</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 hover:text-primary transition-colors"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>
            <Link href="/wishlist" className="p-2 hover:text-primary transition-colors hidden sm:block">
              <Heart className="w-5 h-5" />
            </Link>
            <Link href="/cart" className="p-2 hover:text-primary transition-colors relative">
              <ShoppingBag className="w-5 h-5" />
              {totals.itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {totals.itemCount}
                </span>
              )}
            </Link>
            <Link href="/account" className="p-2 hover:text-primary transition-colors hidden sm:block">
              <User className="w-5 h-5" />
            </Link>
          </div>
        </div>

        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="pb-4"
            >
              <Input
                placeholder="Search jewelry, accessories..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full"
              />
              {searchResults.length > 0 && (
                <div className="mt-2 bg-white rounded-xl border shadow-lg p-2">
                  {searchResults.map((p) => (
                    <Link
                      key={p._id}
                      href={`/product/${p.slug}`}
                      className="block px-3 py-2 hover:bg-secondary rounded-lg text-sm"
                      onClick={() => setSearchOpen(false)}
                    >
                      {p.name}
                    </Link>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            className="fixed inset-0 z-50 lg:hidden"
          >
            <div className="absolute inset-0 bg-black/50" onClick={() => setMobileOpen(false)} />
            <div className="absolute left-0 top-0 bottom-0 w-80 bg-white shadow-xl p-6">
              <div className="flex justify-between items-center mb-8">
                <span className="font-display text-xl font-bold text-primary">{BRAND.name}</span>
                <button onClick={() => setMobileOpen(false)}><X className="w-5 h-5" /></button>
              </div>
              <nav className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <Link key={link.href} href={link.href} className="text-lg font-medium" onClick={() => setMobileOpen(false)}>
                    {link.label}
                  </Link>
                ))}
                <hr />
                <Link href="/account" className="text-lg font-medium" onClick={() => setMobileOpen(false)}>My Account</Link>
                <Link href="/wishlist" className="text-lg font-medium" onClick={() => setMobileOpen(false)}>Wishlist</Link>
                {user && (
                  <button onClick={() => { logout(); setMobileOpen(false); }} className="text-lg font-medium text-red-500">
                    Logout
                  </button>
                )}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="bg-foreground text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="font-display text-2xl font-bold text-primary mb-4">{BRAND.name}</h3>
            <p className="text-gray-400 text-sm mb-4">{BRAND.tagline}</p>
            <div className="flex gap-3">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/10 rounded-full hover:bg-primary transition-colors">
                <Share2 className="w-4 h-4" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/10 rounded-full hover:bg-primary transition-colors">
                <Globe className="w-4 h-4" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/10 rounded-full hover:bg-primary transition-colors">
                <Video className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/shop" className="hover:text-primary">Shop All</Link></li>
              <li><Link href="/shop?collection=korean" className="hover:text-primary">Korean Collection</Link></li>
              <li><Link href="/shop?collection=ethnic" className="hover:text-primary">Ethnic Collection</Link></li>
              <li><Link href="/about" className="hover:text-primary">About Us</Link></li>
              <li><Link href="/blog" className="hover:text-primary">Blog</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Customer Care</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/contact" className="hover:text-primary">Contact Us</Link></li>
              <li><Link href="/faq" className="hover:text-primary">FAQ</Link></li>
              <li><Link href="/shipping-policy" className="hover:text-primary">Shipping Policy</Link></li>
              <li><Link href="/return-policy" className="hover:text-primary">Return Policy</Link></li>
              <li><Link href="/track-order" className="hover:text-primary">Track Order</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <div className="space-y-2 text-sm text-gray-400">
              <p className="flex items-center gap-2"><Phone className="w-4 h-4" /> +91 98765 43210</p>
              <p>support@aakshi.com</p>
              <p>Mon-Sat: 9AM - 8PM IST</p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} AAKSHI. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/privacy-policy" className="hover:text-primary">Privacy</Link>
            <Link href="/terms" className="hover:text-primary">Terms</Link>
            <Link href="/careers" className="hover:text-primary">Careers</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
