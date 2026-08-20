import type { MetadataRoute } from "next";
import { mockProducts } from "@/lib/mock-data";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://aakshi.com";

  const staticPages = [
    "", "/shop", "/collections", "/about", "/contact",
    "/cart", "/auth/login", "/auth/register",
    "/policies/privacy", "/policies/shipping", "/policies/refund", "/policies/terms",
  ].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const productPages = mockProducts.map((product) => ({
    url: `${baseUrl}/products/${product.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...productPages];
}
