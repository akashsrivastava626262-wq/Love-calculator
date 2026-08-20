"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag, Star } from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatPrice, calculateDiscount, cn } from "@/lib/utils";
import { useCartStore, useWishlistStore } from "@/lib/store";
import type { Product } from "@/lib/api";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const addToCart = useCartStore((s) => s.addItem);
  const { addItem: addToWishlist, isInWishlist, removeItem: removeFromWishlist } = useWishlistStore();
  const inWishlist = isInWishlist(product.id);
  const discount = product.compareAtPrice
    ? calculateDiscount(Number(product.price), Number(product.compareAtPrice))
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group"
    >
      <div className="relative bg-white rounded-2xl overflow-hidden border border-border card-hover">
        <Link href={`/products/${product.slug}`}>
          <div className="relative aspect-square overflow-hidden bg-secondary/30">
            <Image
              src={product.images[0] || "/placeholder.jpg"}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 50vw, 25vw"
            />
            <div className="absolute top-3 left-3 flex flex-col gap-1.5">
              {discount > 0 && <Badge variant="sale">-{discount}%</Badge>}
              {product.isNewArrival && <Badge>New</Badge>}
              {product.isBestSeller && <Badge variant="secondary">Best Seller</Badge>}
            </div>
          </div>
        </Link>

        <button
          onClick={() => inWishlist ? removeFromWishlist(product.id) : addToWishlist(product)}
          className={cn(
            "absolute top-3 right-3 p-2 rounded-full bg-white/90 backdrop-blur-sm shadow-sm transition-all hover:scale-110",
            inWishlist && "text-primary"
          )}
          aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart className={cn("h-4 w-4", inWishlist && "fill-current")} />
        </button>

        <div className="p-4">
          {product.category && (
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
              {product.category.name}
            </p>
          )}
          <Link href={`/products/${product.slug}`}>
            <h3 className="font-medium text-sm leading-snug hover:text-primary transition-colors line-clamp-2">
              {product.name}
            </h3>
          </Link>

          {product.averageRating > 0 && (
            <div className="flex items-center gap-1 mt-1.5">
              <Star className="h-3 w-3 fill-champagne text-champagne" />
              <span className="text-xs text-muted-foreground">
                {product.averageRating.toFixed(1)} ({product.reviewCount})
              </span>
            </div>
          )}

          <div className="flex items-center gap-2 mt-2">
            <span className="font-semibold text-primary">{formatPrice(product.price)}</span>
            {product.compareAtPrice && (
              <span className="text-xs text-muted-foreground line-through">
                {formatPrice(product.compareAtPrice)}
              </span>
            )}
          </div>

          <Button
            size="sm"
            className="w-full mt-3 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={() => addToCart(product)}
          >
            <ShoppingBag className="h-3.5 w-3.5" />
            Add to Cart
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
