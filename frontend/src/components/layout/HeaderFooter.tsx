'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, ShoppingBag, User, Menu, X, Phone, ChevronDown,
  Share2, Globe, Video,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useAuthStore, useCartStore } from '@/lib/store';
import { productAPI } from '@/lib/api';
import type { Product } from '@/lib/types';

function BrandLogo({ className = '' }: { className?: string }) {
  return (
    <Link href="/" className={`flex flex-col items-center ${className}`}>
      <div className="flex items-center gap-2">
        <span className="text-mauve text-xs">✦</span>
        <span className="font-display text-3xl md:text-4xl text-mauve lowercase tracking-tight leading-none">
          aakshi
        </span>
        <span className="text-mauve text-xs">✦</span>
      </div>
      <span className="text-[9px] md:text-[10px] tracking-[0.35em] uppercase text-mauve/80 mt-1 font-medium">
        Jewellery &amp; Accessories
      </span>
    </Link>
  );
}

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
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

  const leftNav = [
    { href: '/', label: 'Home', active: true },
    { href: '/shop', label: 'Shop', hasDropdown: true },
    { href: '/shop?isNewArrival=true', label: 'New In' },
  ];

  const rightNav = [
    { href: '/shop?isBestSeller=true', label: 'Best Sellers' },
    { href: '/about', label: 'About Us' },
    { href: '/contact', label: 'Contact' },
  ];

  const shopLinks = [
    { href: '/shop', label: 'All Jewellery' },
    { href: '/shop?collection=korean', label: 'Korean' },
    { href: '/shop?collection=ethnic', label: 'Ethnic' },
    { href: '/shop?collection=wedding', label: 'Wedding' },
    { href: '/categories/earrings', label: 'Earrings' },
    { href: '/categories/necklaces', label: 'Necklaces' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-blush">
      {/* Announcement bar */}
      <div className="bg-announce text-mauve text-center py-2 text-[10px] md:text-xs font-medium tracking-wide">
        ✨ FREE SHIPPING ON ALL ORDERS &nbsp;|&nbsp; COD AVAILABLE &nbsp;|&nbsp; ✨ PREMIUM QUALITY JEWELLERY ✨
      </div>

      <div className="border-b border-blush-dark/30 bg-blush/95 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          {/* Desktop layout */}
          <div className="hidden lg:grid grid-cols-[1fr_auto_1fr] items-center gap-4 h-[88px] relative">
            <nav className="flex items-center gap-6 relative">
              {leftNav.map((link) => (
                <div key={link.label} className="relative">
                  {link.hasDropdown ? (
                    <button
                      onClick={() => setShopOpen(!shopOpen)}
                      className="flex items-center gap-1 text-[11px] font-semibold tracking-[0.2em] uppercase text-mauve hover:text-mauve-dark"
                    >
                      {link.label}
                      <ChevronDown className="w-3 h-3" />
                    </button>
                  ) : (
                    <Link
                      href={link.href}
                      className={`text-[11px] font-semibold tracking-[0.2em] uppercase ${
                        link.active ? 'text-mauve underline underline-offset-4' : 'text-mauve hover:text-mauve-dark'
                      }`}
                    >
                      {link.label}
                    </Link>
                  )}
                </div>
              ))}
            </nav>

            <BrandLogo />

            <div className="flex items-center justify-end gap-6">
              <nav className="flex items-center gap-5">
                {rightNav.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-[11px] font-semibold tracking-[0.2em] uppercase text-mauve hover:text-mauve-dark"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
              <div className="flex items-center gap-1 border-l border-blush-dark/40 pl-4">
                <button onClick={() => setSearchOpen(!searchOpen)} className="p-2 text-mauve hover:text-mauve-dark" aria-label="Search">
                  <Search className="w-4 h-4" />
                </button>
                <Link href="/account" className="p-2 text-mauve hover:text-mauve-dark">
                  <User className="w-4 h-4" />
                </Link>
                <Link href="/cart" className="p-2 text-mauve hover:text-mauve-dark relative">
                  <ShoppingBag className="w-4 h-4" />
                  {totals.itemCount > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 bg-mauve text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center">
                      {totals.itemCount}
                    </span>
                  )}
                </Link>
              </div>
            </div>
          </div>

          {/* Mobile layout */}
          <div className="flex lg:hidden items-center justify-between h-16">
            <button onClick={() => setMobileOpen(true)} className="p-2 text-mauve" aria-label="Menu">
              <Menu className="w-5 h-5" />
            </button>
            <BrandLogo />
            <div className="flex items-center gap-1">
              <Link href="/cart" className="p-2 text-mauve relative">
                <ShoppingBag className="w-5 h-5" />
                {totals.itemCount > 0 && (
                  <span className="absolute top-0 right-0 bg-mauve text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center">
                    {totals.itemCount}
                  </span>
                )}
              </Link>
            </div>
          </div>

          {/* Shop dropdown */}
          <AnimatePresence>
            {shopOpen && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="hidden lg:block absolute left-4 top-full mt-0 bg-white rounded-xl shadow-xl border border-blush-dark/30 py-3 px-2 min-w-[180px] z-50"
              >
                {shopLinks.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    className="block px-4 py-2 text-sm text-mauve hover:bg-blush rounded-lg"
                    onClick={() => setShopOpen(false)}
                  >
                    {l.label}
                  </Link>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {searchOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="pb-4"
              >
                <Input
                  placeholder="Search jewellery..."
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="border-blush-dark/50 bg-white"
                />
                {searchResults.length > 0 && (
                  <div className="mt-2 bg-white rounded-xl border shadow-lg p-2">
                    {searchResults.map((p) => (
                      <Link
                        key={p._id}
                        href={`/product/${p.slug}`}
                        className="block px-3 py-2 hover:bg-blush rounded-lg text-sm text-mauve"
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
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            className="fixed inset-0 z-50 lg:hidden"
          >
            <div className="absolute inset-0 bg-black/40" onClick={() => setMobileOpen(false)} />
            <div className="absolute left-0 top-0 bottom-0 w-80 bg-blush shadow-xl p-6">
              <div className="flex justify-between items-center mb-8">
                <BrandLogo />
                <button onClick={() => setMobileOpen(false)} className="text-mauve"><X className="w-5 h-5" /></button>
              </div>
              <nav className="flex flex-col gap-4">
                {[...leftNav, ...rightNav].map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="text-sm font-semibold tracking-widest uppercase text-mauve"
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
                <hr className="border-blush-dark/40" />
                <Link href="/account" className="text-sm font-medium text-mauve" onClick={() => setMobileOpen(false)}>My Account</Link>
                {user && (
                  <button onClick={() => { logout(); setMobileOpen(false); }} className="text-sm text-red-500">
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
    <footer className="bg-mauve-dark text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <p className="font-display text-3xl lowercase text-announce mb-1">aakshi</p>
            <p className="text-[10px] tracking-[0.3em] uppercase text-white/60 mb-4">Jewellery &amp; Accessories</p>
            <p className="text-white/70 text-sm mb-4">Elegance That Adorns Every Girl</p>
            <div className="flex gap-3">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/10 rounded-full hover:bg-announce hover:text-mauve transition-colors">
                <Share2 className="w-4 h-4" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/10 rounded-full hover:bg-announce hover:text-mauve transition-colors">
                <Globe className="w-4 h-4" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/10 rounded-full hover:bg-announce hover:text-mauve transition-colors">
                <Video className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-announce text-sm tracking-widest uppercase">Quick Links</h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li><Link href="/shop" className="hover:text-announce">Shop All</Link></li>
              <li><Link href="/shop?collection=korean" className="hover:text-announce">Korean Collection</Link></li>
              <li><Link href="/shop?collection=ethnic" className="hover:text-announce">Ethnic Collection</Link></li>
              <li><Link href="/about" className="hover:text-announce">About Us</Link></li>
              <li><Link href="/blog" className="hover:text-announce">Blog</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-announce text-sm tracking-widest uppercase">Customer Care</h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li><Link href="/contact" className="hover:text-announce">Contact Us</Link></li>
              <li><Link href="/faq" className="hover:text-announce">FAQ</Link></li>
              <li><Link href="/shipping-policy" className="hover:text-announce">Shipping Policy</Link></li>
              <li><Link href="/return-policy" className="hover:text-announce">Return Policy</Link></li>
              <li><Link href="/track-order" className="hover:text-announce">Track Order</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-announce text-sm tracking-widest uppercase">Contact</h4>
            <div className="space-y-2 text-sm text-white/70">
              <p className="flex items-center gap-2"><Phone className="w-4 h-4" /> +91 98765 43210</p>
              <p>support@aakshi.com</p>
              <p>Mon-Sat: 9AM - 8PM IST</p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/50">
          <p>&copy; {new Date().getFullYear()} aakshi. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/privacy-policy" className="hover:text-announce">Privacy</Link>
            <Link href="/terms" className="hover:text-announce">Terms</Link>
            <Link href="/careers" className="hover:text-announce">Careers</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
