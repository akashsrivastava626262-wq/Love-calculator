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

function BrandLogo({ className = '', large = false }: { className?: string; large?: boolean }) {
  return (
    <Link href="/" className={`flex flex-col items-center group ${className}`}>
      <span className={`font-display text-rose-700 leading-none lowercase font-semibold ${
        large ? 'text-5xl lg:text-7xl' : 'text-3xl md:text-4xl'
      }`}>
        aakshi
      </span>
      <span className="tracking-[0.25em] md:tracking-[4px] text-[10px] md:text-xs uppercase text-gray-700 mt-1">
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
    <header className="sticky top-0 z-50">
      {/* Top bar */}
      <div className="bg-rose-100 text-center text-xs md:text-sm py-3 tracking-wide text-gray-700">
        ✨ FREE SHIPPING ON ALL ORDERS &nbsp;&nbsp; | &nbsp;&nbsp;
        COD AVAILABLE &nbsp;&nbsp; | &nbsp;&nbsp;
        PREMIUM QUALITY JEWELLERY
      </div>

      <div className="bg-white shadow-sm border-b border-rose-100/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-4 lg:py-6">
          {/* Desktop layout */}
          <div className="hidden lg:flex items-center justify-between relative">
            <nav className="flex items-center gap-8 text-gray-700">
              {leftNav.map((link) => (
                <div key={link.label} className="relative">
                  {link.hasDropdown ? (
                    <button
                      onClick={() => setShopOpen(!shopOpen)}
                      className="flex items-center gap-1 hover:text-rose-700 transition-colors"
                    >
                      {link.label}
                      <ChevronDown className="w-4 h-4" />
                    </button>
                  ) : (
                    <Link
                      href={link.href}
                      className={`hover:text-rose-700 transition-colors ${
                        link.active ? 'text-rose-700 font-medium' : ''
                      }`}
                    >
                      {link.label}
                    </Link>
                  )}
                </div>
              ))}
            </nav>

            <BrandLogo large />

            <div className="flex items-center gap-8">
              <nav className="flex items-center gap-8 text-gray-700">
                {rightNav.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="hover:text-rose-700 transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
              <div className="flex items-center gap-1 border-l border-rose-200 pl-4 ml-2">
                <button onClick={() => setSearchOpen(!searchOpen)} className="p-2 text-gray-700 hover:text-rose-700 transition-colors" aria-label="Search">
                  <Search className="w-4 h-4" />
                </button>
                <Link href="/account" className="p-2 text-gray-700 hover:text-rose-700 transition-colors">
                  <User className="w-4 h-4" />
                </Link>
                <Link href="/cart" className="p-2 text-gray-700 hover:text-rose-700 transition-colors relative">
                  <ShoppingBag className="w-4 h-4" />
                  {totals.itemCount > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 bg-rose-600 text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center">
                      {totals.itemCount}
                    </span>
                  )}
                </Link>
              </div>
            </div>
          </div>

          {/* Mobile layout */}
          <div className="flex lg:hidden items-center justify-between h-16">
            <button onClick={() => setMobileOpen(true)} className="p-2 text-gray-700" aria-label="Menu">
              <Menu className="w-5 h-5" />
            </button>
            <BrandLogo />
            <div className="flex items-center gap-1">
              <Link href="/cart" className="p-2 text-gray-700 relative">
                <ShoppingBag className="w-5 h-5" />
                {totals.itemCount > 0 && (
                  <span className="absolute top-0 right-0 bg-rose-600 text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center">
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
                className="hidden lg:block absolute left-4 top-full mt-0 bg-white rounded-xl shadow-xl border border-rose-100 py-3 px-2 min-w-[180px] z-50"
              >
                {shopLinks.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-rose-50 rounded-lg"
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
                  className="border-rose-200 bg-white"
                />
                {searchResults.length > 0 && (
                  <div className="mt-2 bg-white rounded-xl border shadow-lg p-2">
                    {searchResults.map((p) => (
                      <Link
                        key={p._id}
                        href={`/product/${p.slug}`}
                        className="block px-3 py-2 hover:bg-rose-50 rounded-lg text-sm text-gray-700"
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
            <div className="absolute left-0 top-0 bottom-0 w-80 bg-white shadow-xl p-6">
              <div className="flex justify-between items-center mb-8">
                <BrandLogo />
                <button onClick={() => setMobileOpen(false)} className="text-gray-700"><X className="w-5 h-5" /></button>
              </div>
              <nav className="flex flex-col gap-4 text-gray-700">
                {[...leftNav, ...rightNav].map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="text-sm font-medium hover:text-rose-700"
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
                <hr className="border-rose-100" />
                <Link href="/account" className="text-sm font-medium text-gray-700 hover:text-rose-700" onClick={() => setMobileOpen(false)}>My Account</Link>
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
    <footer className="bg-gradient-to-b from-rose-gold to-rose-dark text-white mt-16">
      <div className="container mx-auto px-4 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <p className="font-display text-3xl tracking-[0.05em] mb-1 lowercase">aakshi</p>
            <p className="text-[10px] tracking-[0.3em] uppercase text-white/60 mb-3">Jewellery &amp; Accessories</p>
            <p className="font-script text-lg text-gold-light mb-4">Girlish. Timeless. Yours.</p>
            <p className="text-white/75 text-sm mb-5 leading-relaxed">
              Premium artificial, Korean &amp; anti-tarnish jewellery designed to shine through every moment.
            </p>
            <div className="flex gap-3">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/10 rounded-full hover:bg-gold-light hover:text-rose-gold transition-colors">
                <Share2 className="w-4 h-4" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/10 rounded-full hover:bg-gold-light hover:text-rose-gold transition-colors">
                <Globe className="w-4 h-4" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/10 rounded-full hover:bg-gold-light hover:text-rose-gold transition-colors">
                <Video className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-gold-light text-sm tracking-widest uppercase">Quick Links</h4>
            <ul className="space-y-2.5 text-sm text-white/75">
              <li><Link href="/shop" className="hover:text-gold-light transition-colors">Shop All</Link></li>
              <li><Link href="/shop?collection=korean" className="hover:text-gold-light transition-colors">Korean Collection</Link></li>
              <li><Link href="/shop?collection=ethnic" className="hover:text-gold-light transition-colors">Ethnic Collection</Link></li>
              <li><Link href="/about" className="hover:text-gold-light transition-colors">About Us</Link></li>
              <li><Link href="/blog" className="hover:text-gold-light transition-colors">Blog</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-gold-light text-sm tracking-widest uppercase">Customer Care</h4>
            <ul className="space-y-2.5 text-sm text-white/75">
              <li><Link href="/contact" className="hover:text-gold-light transition-colors">Contact Us</Link></li>
              <li><Link href="/faq" className="hover:text-gold-light transition-colors">FAQ</Link></li>
              <li><Link href="/shipping-policy" className="hover:text-gold-light transition-colors">Shipping Policy</Link></li>
              <li><Link href="/return-policy" className="hover:text-gold-light transition-colors">Return Policy</Link></li>
              <li><Link href="/track-order" className="hover:text-gold-light transition-colors">Track Order</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-gold-light text-sm tracking-widest uppercase">Contact</h4>
            <div className="space-y-2.5 text-sm text-white/75 mb-6">
              <p className="flex items-center gap-2"><Phone className="w-4 h-4 text-gold-light" /> +91 98765 43210</p>
              <p>support@aakshi.com</p>
              <p>Mon–Sat: 9AM – 8PM IST</p>
            </div>
            <p className="text-xs text-white/60 mb-3">Get 10% off your first order ✨</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-4 py-2.5 rounded-full text-gray-800 text-sm bg-white/95 border-0 focus:ring-2 focus:ring-gold-light"
              />
              <button className="bg-white text-rose-gold px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-cream transition-colors">
                Join
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-white/15 mt-10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/55">
          <p>&copy; {new Date().getFullYear()} aakshi. All rights reserved. · Not just jewellery, it&apos;s your aakshi.</p>
          <div className="flex gap-4">
            <Link href="/privacy-policy" className="hover:text-gold-light transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-gold-light transition-colors">Terms</Link>
            <Link href="/careers" className="hover:text-gold-light transition-colors">Careers</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
