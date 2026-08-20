import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import type { Collection } from "@/lib/api";

const defaultCollections = [
  {
    id: "1",
    name: "New Arrivals",
    slug: "new-arrivals",
    description: "Latest additions",
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&q=80",
  },
  {
    id: "2",
    name: "Best Sellers",
    slug: "best-sellers",
    description: "Most loved pieces",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&q=80",
  },
  {
    id: "3",
    name: "Korean Trend",
    slug: "korean-trend",
    description: "Trendy Korean designs",
    image: "https://images.unsplash.com/photo-1588444837495-c6c1e887a071?w=600&q=80",
  },
  {
    id: "4",
    name: "Wedding Collection",
    slug: "wedding-collection",
    description: "Bridal elegance",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&q=80",
  },
  {
    id: "5",
    name: "Office Wear",
    slug: "office-wear",
    description: "Professional chic",
    image: "https://images.unsplash.com/photo-1573408301185-914fe6340337?w=600&q=80",
  },
  {
    id: "6",
    name: "Everyday Essentials",
    slug: "everyday-essentials",
    description: "Daily luxury",
    image: "https://images.unsplash.com/photo-1611591432578-014a0b017a0b?w=600&q=80",
  },
];

interface CollectionGridProps {
  collections?: Collection[];
}

export function CollectionGrid({ collections = defaultCollections as Collection[] }: CollectionGridProps) {
  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl lg:text-4xl font-medium">Featured Collections</h2>
          <p className="mt-3 text-muted-foreground max-w-lg mx-auto">
            Curated collections for every occasion and style
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {collections.map((collection) => (
            <Link
              key={collection.slug}
              href={`/shop?collection=${collection.slug}`}
              className="group relative aspect-[4/5] rounded-2xl overflow-hidden"
            >
              <Image
                src={collection.image || defaultCollections[0].image}
                alt={collection.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4 lg:p-6 text-white">
                <h3 className="font-serif text-lg lg:text-xl font-medium">{collection.name}</h3>
                <p className="text-sm text-white/80 mt-1 hidden sm:block">{collection.description}</p>
                <span className="inline-flex items-center gap-1 text-sm mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  Shop Now <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
