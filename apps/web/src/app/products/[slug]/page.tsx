import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductDetail } from "@/components/products/ProductDetail";
import { getProductBySlug, mockProducts } from "@/lib/mock-data";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Product Not Found" };

  return {
    title: product.name,
    description: product.shortDescription || product.description,
    openGraph: {
      title: product.name,
      description: product.shortDescription || product.description,
      images: product.images,
    },
  };
}

export async function generateStaticParams() {
  return mockProducts.map((p) => ({ slug: p.slug }));
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) notFound();

  const similar = mockProducts
    .filter((p) => p.id !== product.id && p.category?.slug === product.category?.slug)
    .slice(0, 4);

  return <ProductDetail product={product} similar={similar} />;
}
