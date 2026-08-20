"use client";

import Link from "next/link";
import { useWishlistStore } from "@/lib/store";
import { ProductCard } from "@/components/products/ProductCard";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function WishlistPage() {
  const items = useWishlistStore((s) => s.items);

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <Heart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
        <h1 className="font-serif text-2xl font-medium mb-2">Your wishlist is empty</h1>
        <p className="text-muted-foreground mb-8">Save items you love for later</p>
        <Button asChild><Link href="/shop">Browse Collection</Link></Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 lg:py-12">
      <h1 className="font-serif text-3xl font-medium mb-8">My Wishlist</h1>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {items.map((product, index) => (
          <ProductCard key={product.id} product={product} index={index} />
        ))}
      </div>
    </div>
  );
}
