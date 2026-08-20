import type { Metadata } from 'next';
import { Poppins, Playfair_Display } from 'next/font/google';
import { Header, Footer } from '@/components/layout/HeaderFooter';
import { AIChatWidget } from '@/components/chat/AIChatWidget';
import { AuthHydration } from '@/components/providers/AuthHydration';
import './globals.css';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-playfair',
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://aakshi.com'),
  title: {
    default: 'AAKSHI | Premium Fashion Jewelry & Girls Accessories',
    template: '%s | AAKSHI',
  },
  description: 'Shop premium artificial jewelry, Korean jewelry, ethnic necklaces, trendy earrings & fashion accessories at AAKSHI. Elegance That Adorns Every Girl.',
  keywords: ['Artificial Jewelry', 'Korean Jewelry', 'Women Accessories', 'Trendy Earrings', 'Ethnic Necklace', 'Fashion Jewelry India'],
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    siteName: 'AAKSHI',
    title: 'AAKSHI | Premium Fashion Jewelry',
    description: 'Elegance That Adorns Every Girl — Shop Korean, Ethnic & Trending Jewelry',
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${poppins.variable} ${playfair.variable}`}>
      <body className="min-h-screen flex flex-col">
        <AuthHydration>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <AIChatWidget />
        </AuthHydration>
      </body>
    </html>
  );
}
