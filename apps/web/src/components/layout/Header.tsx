"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  ShoppingBag,
  Heart,
  User,
  Menu,
  X,
  ChevronDown,
} from "lucide-react";
import { useCartStore, useAuthStore } from "@/lib/store";

const navLinks = [
  {
    label: "Shop",
    href: "/shop",
    children: [
      { label: "All Products", href: "/shop" },
      { label: "Earrings", href: "/shop?category=earrings" },
      { label: "Necklaces", href: "/shop?category=necklaces" },
      { label: "Rings", href: "/shop?category=rings" },
      { label: "Bracelets", href: "/shop?category=bracelets" },
      { label: "Anklets", href: "/shop?category=anklets" },
    ],
  },
  {
    label: "Collections",
    href: "/collections",
    children: [
      { label: "New Arrivals", href: "/shop?collection=new-arrivals" },
      { label: "Best Sellers", href: "/shop?collection=best-sellers" },
      { label: "Korean Trend", href: "/shop?collection=korean-trend" },
      { label: "Wedding Collection", href: "/shop?collection=wedding-collection" },
      { label: "Office Wear", href: "/shop?collection=office-wear" },
    ],
  },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const itemCount = useCartStore((s) => s.getItemCount());
  const user = useAuthStore((s) => s.user);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <button
            className="lg:hidden p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

          <Link href="/" className="flex-shrink-0">
            <span className="font-serif text-2xl lg:text-3xl font-semibold tracking-[0.2em] text-gradient">
              AAKSHI
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() => link.children && setActiveDropdown(link.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={link.href}
                  className="flex items-center gap-1 text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
                >
                  {link.label}
                  {link.children && <ChevronDown className="h-3 w-3" />}
                </Link>
                <AnimatePresence>
                  {link.children && activeDropdown === link.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      className="absolute top-full left-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-border py-2 z-50"
                    >
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block px-4 py-2 text-sm text-foreground/70 hover:text-primary hover:bg-accent/50 transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>

          <div className="flex items-center gap-2 lg:gap-4">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 hover:text-primary transition-colors"
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </button>
            <Link href={user ? "/account" : "/auth/login"} className="p-2 hover:text-primary transition-colors hidden sm:block">
              <User className="h-5 w-5" />
            </Link>
            <Link href="/wishlist" className="p-2 hover:text-primary transition-colors hidden sm:block">
              <Heart className="h-5 w-5" />
            </Link>
            <Link href="/cart" className="relative p-2 hover:text-primary transition-colors">
              <ShoppingBag className="h-5 w-5" />
              {itemCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-primary text-[10px] text-white flex items-center justify-center font-medium">
                  {itemCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden border-t border-border"
            >
              <div className="py-4">
                <input
                  type="search"
                  placeholder="Search for jewelry..."
                  className="w-full h-11 px-4 rounded-lg border border-border bg-secondary/50 focus:outline-none focus:ring-2 focus:ring-primary/30"
                  autoFocus
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden border-t border-border bg-white overflow-hidden"
          >
            <nav className="container mx-auto px-4 py-4 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="block py-2 text-sm font-medium"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
