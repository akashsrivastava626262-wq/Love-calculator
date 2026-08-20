import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Providers } from "@/components/providers/Providers";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://aakshi.com"),
  title: {
    default: "AAKSHI | Premium Korean & Anti-Tarnish Jewelry",
    template: "%s | AAKSHI",
  },
  description:
    "Discover premium Korean & anti-tarnish jewelry designed for modern women. Shop earrings, necklaces, rings, bracelets & more. Affordable luxury that never loses its shine.",
  keywords: [
    "Korean Jewelry India",
    "Anti Tarnish Jewelry",
    "Premium Fashion Jewelry",
    "Women's Accessories",
    "Luxury Jewelry Online",
    "AAKSHI",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "AAKSHI",
    title: "AAKSHI | Timeless Elegance. Everyday Shine.",
    description: "Premium Korean & Anti-Tarnish Jewelry Designed For Modern Women.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <body className="min-h-screen flex flex-col">
        <Providers>
          <AnnouncementBar />
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
