import Link from "next/link";
import { Instagram, Facebook, MessageCircle } from "lucide-react";

const footerLinks = {
  shop: [
    { label: "All Products", href: "/shop" },
    { label: "New Arrivals", href: "/shop?collection=new-arrivals" },
    { label: "Best Sellers", href: "/shop?collection=best-sellers" },
    { label: "Earrings", href: "/shop?category=earrings" },
    { label: "Necklaces", href: "/shop?category=necklaces" },
  ],
  collections: [
    { label: "Korean Trend", href: "/shop?collection=korean-trend" },
    { label: "Wedding Collection", href: "/shop?collection=wedding-collection" },
    { label: "Office Wear", href: "/shop?collection=office-wear" },
    { label: "Everyday Essentials", href: "/shop?collection=everyday-essentials" },
  ],
  company: [
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Shipping Policy", href: "/policies/shipping" },
    { label: "Refund Policy", href: "/policies/refund" },
    { label: "Privacy Policy", href: "/policies/privacy" },
    { label: "Terms & Conditions", href: "/policies/terms" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-secondary/50 border-t border-border">
      <div className="container mx-auto px-4 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          <div className="lg:col-span-2">
            <Link href="/">
              <span className="font-serif text-2xl font-semibold tracking-[0.2em] text-gradient">
                AAKSHI
              </span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed max-w-sm">
              Premium Korean & anti-tarnish jewelry designed for modern women.
              Timeless elegance that never loses its shine.
            </p>
            <div className="flex gap-4 mt-6">
              <a href="https://instagram.com/aakshi" className="p-2 rounded-full bg-white hover:bg-primary hover:text-white transition-colors" aria-label="Instagram">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="https://facebook.com/aakshi" className="p-2 rounded-full bg-white hover:bg-primary hover:text-white transition-colors" aria-label="Facebook">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="https://wa.me/919876543210" className="p-2 rounded-full bg-white hover:bg-primary hover:text-white transition-colors" aria-label="WhatsApp">
                <MessageCircle className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-serif text-lg font-medium mb-4">Shop</h4>
            <ul className="space-y-2">
              {footerLinks.shop.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-lg font-medium mb-4">Collections</h4>
            <ul className="space-y-2">
              {footerLinks.collections.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-lg font-medium mb-4">Company</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-muted-foreground">
              <span>✓ Anti-Tarnish Quality</span>
              <span>✓ Secure Payments</span>
              <span>✓ Easy Returns</span>
              <span>✓ Fast Delivery</span>
            </div>
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} AAKSHI. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
