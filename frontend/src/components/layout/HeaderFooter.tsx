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
    <Link href="/" className={`flex flex-col items-center group ${className}`}>
      <div className="flex items-center gap-2">
        <span className="text-gold text-[10px] group-hover:animate-sparkle">✦</span>
        <span className="font-display text-2xl md:text-3xl text-rose-gold tracking-[0.12em] leading-none font-semibold">
          AAKSHI
        </span>
        <span className="text-gold text-[10px] group-hover:animate-sparkle">✦</span>
      </div>
      <span className="text-[8px] md:text-[9px] tracking-[0.38em] uppercase text-rose-gold/70 mt-1.5 font-medium">
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
    <header className="sticky top-0 z-50 bg-cream/80 backdrop-blur-md">
      {/* Announcement bar */}
      <div className="bg-gradient-to-r from-blush via-blush-deep to-blush text-rose-gold text-center py-2.5 text-[9px] md:text-[11px] font-semibold tracking-[0.12em] uppercase">
        ✨ Free Shipping on All Orders &nbsp;·&nbsp; COD Available &nbsp;·&nbsp; Premium Quality Jewellery ✨
      </div>

      <div className="border-b border-blush-deep/50 bg-warm-white/70 backdrop-blur-md">
        <div className="container mx-auto px-4">
          {/* Desktop layout */}
          <div className="hidden lg:grid grid-cols-[1fr_auto_1fr] items-center gap-4 h-[88px] relative">
            <nav className="flex items-center gap-6 relative">
              {leftNav.map((link) => (
                <div key={link.label} className="relative">
                  {link.hasDropdown ? (
                    <button
                      onClick={() => setShopOpen(!shopOpen)}
                      className="flex items-center gap-1 text-[10px] font-semibold tracking-[0.18em] uppercase text-rose-gold hover:text-rose-dark transition-colors"
                    >
                      {link.label}
                      <ChevronDown className="w-3 h-3" />
                    </button>
                  ) : (
                    <Link
                      href={link.href}
                      className={`text-[10px] font-semibold tracking-[0.18em] uppercase transition-colors ${
                        link.active ? 'text-rose-gold underline underline-offset-4 decoration-rose-gold/50' : 'text-rose-gold/80 hover:text-rose-gold'
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
                    className="text-[10px] font-semibold tracking-[0.18em] uppercase text-rose-gold/80 hover:text-rose-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
              <div className="flex items-center gap-1 border-l border-blush-deep/60 pl-4">
                <button onClick={() => setSearchOpen(!searchOpen)} className="p-2 text-rose-gold hover:text-rose-dark transition-colors" aria-label="Search">
                  <Search className="w-4 h-4" />
                </button>
                <Link href="/account" className="p-2 text-rose-gold hover:text-rose-dark transition-colors">
                  <User className="w-4 h-4" />
                </Link>
                <Link href="/cart" className="p-2 text-rose-gold hover:text-rose-dark transition-colors relative">
                  <ShoppingBag className="w-4 h-4" />
                  {totals.itemCount > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 bg-rose-gold text-warm-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center">
                      {totals.itemCount}
                    </span>
                  )}
                </Link>
              </div>
            </div>
          </div>

          {/* Mobile layout */}
          <div className="flex lg:hidden items-center justify-between h-16">
            <button onClick={() => setMobileOpen(true)} className="p-2 text-rose-gold" aria-label="Menu">
              <Menu className="w-5 h-5" />
            </button>
            <BrandLogo />
            <div className="flex items-center gap-1">
              <Link href="/cart" className="p-2 text-rose-gold relative">
                <ShoppingBag className="w-5 h-5" />
                {totals.itemCount > 0 && (
                  <span className="absolute top-0 right-0 bg-rose-gold text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center">
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
                className="hidden lg:block absolute left-4 top-full mt-0 bg-white rounded-xl shadow-xl border border-blush-deep/30 py-3 px-2 min-w-[180px] z-50"
              >
                {shopLinks.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    className="block px-4 py-2 text-sm text-rose-gold hover:bg-blush rounded-lg"
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
                  className="border-blush-deep/50 bg-white"
                />
                {searchResults.length > 0 && (
                  <div className="mt-2 bg-white rounded-xl border shadow-lg p-2">
                    {searchResults.map((p) => (
                      <Link
                        key={p._id}
                        href={`/product/${p.slug}`}
                        className="block px-3 py-2 hover:bg-blush rounded-lg text-sm text-rose-gold"
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
                <button onClick={() => setMobileOpen(false)} className="text-rose-gold"><X className="w-5 h-5" /></button>
              </div>
              <nav className="flex flex-col gap-4">
                {[...leftNav, ...rightNav].map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="text-sm font-semibold tracking-widest uppercase text-rose-gold"
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
                <hr className="border-blush-deep/40" />
                <Link href="/account" className="text-sm font-medium text-rose-gold" onClick={() => setMobileOpen(false)}>My Account</Link>
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
            <p className="font-display text-3xl tracking-[0.15em] mb-1">AAKSHI</p>
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
          <p>&copy; {new Date().getFullYear()} AAKSHI. All rights reserved. · Not just jewellery, it&apos;s your Aakshi.</p>
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
