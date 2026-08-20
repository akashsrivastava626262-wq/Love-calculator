import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { HeroImage } from "@/components/home/HeroImage";
import { Button } from "@/components/ui/button";
import { TrustBadges, WhyChooseAakshi } from "@/components/home/TrustBadges";
import { CollectionGrid } from "@/components/home/CollectionGrid";
import { CustomerReviews } from "@/components/home/CustomerReviews";
import { NewsletterSignup } from "@/components/home/NewsletterSignup";
import { ProductCard } from "@/components/products/ProductCard";
import { mockProducts } from "@/lib/mock-data";

async function getBestSellers() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000"}/api/products/best-sellers`,
      { next: { revalidate: 3600 } }
    );
    if (res.ok) {
      const data = await res.json();
      return data.data;
    }
  } catch {
    // Fallback to mock data
  }
  return mockProducts.filter((p) => p.isBestSeller);
}

export default async function HomePage() {
  const bestSellers = await getBestSellers();

  return (
    <>
      {/* Hero Section */}
      <section className="relative hero-gradient overflow-hidden">
        <div className="container mx-auto px-4 py-12 sm:py-16 lg:py-24 xl:py-28">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 xl:gap-16 items-center">
            <div className="text-center lg:text-left">
              <p className="text-sm uppercase tracking-[0.3em] text-primary font-medium mb-4">
                Premium Fashion Jewelry
              </p>
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-medium leading-tight">
                Timeless Elegance.
                <br />
                <span className="text-gradient">Everyday Shine.</span>
              </h1>
              <p className="mt-6 text-lg text-muted-foreground max-w-lg mx-auto lg:mx-0">
                Premium Korean & Anti-Tarnish Jewelry Designed For Modern Women.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center lg:justify-start">
                <Button size="lg" asChild>
                  <Link href="/shop?collection=new-arrivals">
                    Shop New Arrivals
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/collections">Explore Collections</Link>
                </Button>
              </div>
            </div>

            <HeroImage />
          </div>
        </div>
      </section>

      <TrustBadges />

      <CollectionGrid />

      {/* Best Sellers */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="font-serif text-3xl lg:text-4xl font-medium">Best Sellers</h2>
              <p className="mt-2 text-muted-foreground">Our most loved pieces</p>
            </div>
            <Link
              href="/shop?bestSeller=true"
              className="hidden sm:flex items-center gap-1 text-sm text-primary hover:underline"
            >
              View All <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {bestSellers.slice(0, 8).map((product: typeof mockProducts[0], index: number) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        </div>
      </section>

      <WhyChooseAakshi />

      {/* Limited Time Offer */}
      <section className="py-12 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm uppercase tracking-widest opacity-80">Limited Time Offer</p>
          <h2 className="font-serif text-2xl lg:text-3xl font-medium mt-2">
            Get 10% Off Your First Order
          </h2>
          <p className="mt-2 opacity-80">Use code WELCOME10 at checkout</p>
          <Button variant="secondary" size="lg" className="mt-6" asChild>
            <Link href="/shop">Shop Now</Link>
          </Button>
        </div>
      </section>

      <CustomerReviews />

      {/* Instagram Gallery */}
      <section className="py-16 lg:py-24 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="font-serif text-3xl lg:text-4xl font-medium">#AAKSHIStyle</h2>
            <p className="mt-2 text-muted-foreground">Tag us on Instagram @aakshi</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
            {[
              "photo-1535632066927-ab7c9ab60908",
              "photo-1599643478518-a784e5dc4c8f",
              "photo-1588444837495-c6c1e887a071",
              "photo-1611591432578-014a0b017a0b",
              "photo-1573408301185-914fe6340337",
              "photo-1605100804763-247f67b3557e",
            ].map((id) => (
              <div key={id} className="relative aspect-square rounded-lg overflow-hidden group">
                <Image
                  src={`https://images.unsplash.com/${id}?w=400&q=80`}
                  alt="AAKSHI Instagram"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <NewsletterSignup />
    </>
  );
}
