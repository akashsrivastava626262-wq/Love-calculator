"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, Minus, Plus, ShoppingBag, Heart, Truck, RotateCcw, Shield, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ProductCard } from "@/components/products/ProductCard";
import { formatPrice, calculateDiscount } from "@/lib/utils";
import { useCartStore, useWishlistStore } from "@/lib/store";
import type { Product } from "@/lib/api";

interface ProductDetailProps {
  product: Product;
  similar: Product[];
}

export function ProductDetail({ product, similar }: ProductDetailProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const addToCart = useCartStore((s) => s.addItem);
  const { addItem: addToWishlist, isInWishlist, removeItem: removeFromWishlist } = useWishlistStore();
  const inWishlist = isInWishlist(product.id);
  const discount = product.compareAtPrice
    ? calculateDiscount(Number(product.price), Number(product.compareAtPrice))
    : 0;

  return (
    <div className="container mx-auto px-4 py-8 lg:py-12">
      <nav className="text-sm text-muted-foreground mb-8">
        <Link href="/" className="hover:text-primary">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/shop" className="hover:text-primary">Shop</Link>
        {product.category && (
          <>
            <span className="mx-2">/</span>
            <Link href={`/shop?category=${product.category.slug}`} className="hover:text-primary">
              {product.category.name}
            </Link>
          </>
        )}
        <span className="mx-2">/</span>
        <span className="text-foreground">{product.name}</span>
      </nav>

      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Images */}
        <div>
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-secondary/30 mb-4 group">
            <Image
              src={product.images[selectedImage] || product.images[0]}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            {discount > 0 && (
              <Badge variant="sale" className="absolute top-4 left-4">-{discount}%</Badge>
            )}
          </div>
          {product.images.length > 1 && (
            <div className="flex gap-2">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                    selectedImage === i ? "border-primary" : "border-transparent"
                  }`}
                >
                  <Image src={img} alt="" fill className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Details */}
        <div>
          {product.category && (
            <p className="text-sm text-primary uppercase tracking-wider mb-2">
              {product.category.name}
            </p>
          )}
          <h1 className="font-serif text-3xl lg:text-4xl font-medium">{product.name}</h1>

          {product.averageRating > 0 && (
            <div className="flex items-center gap-2 mt-3">
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.round(product.averageRating)
                        ? "fill-champagne text-champagne"
                        : "text-border"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                {product.averageRating.toFixed(1)} ({product.reviewCount} reviews)
              </span>
            </div>
          )}

          <div className="flex items-center gap-3 mt-4">
            <span className="text-2xl font-semibold text-primary">
              {formatPrice(product.price)}
            </span>
            {product.compareAtPrice && (
              <span className="text-lg text-muted-foreground line-through">
                {formatPrice(product.compareAtPrice)}
              </span>
            )}
          </div>

          <p className="mt-6 text-muted-foreground leading-relaxed">
            {product.description}
          </p>

          {/* Quantity */}
          <div className="mt-8">
            <label className="text-sm font-medium mb-2 block">Quantity</label>
            <div className="flex items-center gap-3">
              <div className="flex items-center border border-border rounded-full">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-3 hover:text-primary"
                  aria-label="Decrease quantity"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-3 hover:text-primary"
                  aria-label="Increase quantity"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              <span className="text-sm text-muted-foreground">
                {product.stock} in stock
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 mt-6">
            <Button
              size="lg"
              className="flex-1"
              onClick={() => addToCart(product, quantity)}
            >
              <ShoppingBag className="h-4 w-4" />
              Add to Cart
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() =>
                inWishlist ? removeFromWishlist(product.id) : addToWishlist(product)
              }
            >
              <Heart className={`h-4 w-4 ${inWishlist ? "fill-current text-primary" : ""}`} />
            </Button>
            <Button size="lg" variant="outline">
              <Share2 className="h-4 w-4" />
            </Button>
          </div>

          {/* Trust Elements */}
          <div className="grid grid-cols-2 gap-4 mt-8 p-4 bg-secondary/50 rounded-xl">
            <div className="flex items-center gap-2 text-sm">
              <Truck className="h-4 w-4 text-primary" />
              <span>Free shipping above ₹999</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <RotateCcw className="h-4 w-4 text-primary" />
              <span>7-day easy returns</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Shield className="h-4 w-4 text-primary" />
              <span>Secure checkout</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <ShoppingBag className="h-4 w-4 text-primary" />
              <span>COD available</span>
            </div>
          </div>

          {/* Material & Care */}
          {product.material && (
            <div className="mt-8 border-t border-border pt-6">
              <h3 className="font-medium mb-2">Material</h3>
              <p className="text-sm text-muted-foreground">{product.material}</p>
            </div>
          )}
          {product.careInstructions && (
            <div className="mt-4">
              <h3 className="font-medium mb-2">Care Instructions</h3>
              <p className="text-sm text-muted-foreground">{product.careInstructions}</p>
            </div>
          )}
        </div>
      </div>

      {/* Similar Products */}
      {similar.length > 0 && (
        <section className="mt-16 lg:mt-24">
          <h2 className="font-serif text-2xl lg:text-3xl font-medium mb-8">You May Also Like</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {similar.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
