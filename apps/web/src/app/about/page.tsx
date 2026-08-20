import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about AAKSHI - premium affordable luxury jewelry brand focused on confidence, elegance and everyday fashion.",
};

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className="hero-gradient py-16 lg:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-serif text-4xl lg:text-5xl font-medium">Our Story</h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Making premium-looking luxury jewelry accessible to every woman
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=80"
                alt="AAKSHI Jewelry"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h2 className="font-serif text-3xl font-medium mb-6">The AAKSHI Mission</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                AAKSHI was born from a simple belief: every woman deserves to feel beautiful
                without breaking the bank. We saw a gap in the market — jewelry that looked
                premium but was either overpriced or quickly tarnished.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Our mission is to make premium-looking luxury jewelry accessible to every woman.
                We combine Korean-inspired designs with cutting-edge anti-tarnish technology
                to create pieces that shine as brightly as you do — day after day.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                From college students to working professionals, AAKSHI is designed for women
                who love elegance, value quality, and refuse to compromise on style.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 lg:py-24 bg-secondary/30">
        <div className="container mx-auto px-4">
          <h2 className="font-serif text-3xl font-medium text-center mb-12">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Quality First",
                description: "Every piece undergoes rigorous quality checks. We use premium materials and advanced plating technology.",
              },
              {
                title: "Transparency",
                description: "Honest pricing, clear product details, and genuine customer reviews. What you see is what you get.",
              },
              {
                title: "Customer Love",
                description: "Your satisfaction is our success. From easy returns to responsive support, we're here for you.",
              },
            ].map((value) => (
              <div key={value.title} className="text-center p-6">
                <h3 className="font-serif text-xl font-medium mb-3">{value.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 text-center">
        <div className="container mx-auto px-4">
          <h2 className="font-serif text-3xl font-medium mb-4">Ready to Shine?</h2>
          <p className="text-muted-foreground mb-8">Explore our collection and find your perfect piece</p>
          <Link
            href="/shop"
            className="inline-flex items-center justify-center h-11 px-8 rounded-full bg-primary text-white font-medium hover:bg-primary/90 transition-colors"
          >
            Shop Now
          </Link>
        </div>
      </section>
    </div>
  );
}
