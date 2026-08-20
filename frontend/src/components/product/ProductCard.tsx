'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Heart, Star, ShoppingBag } from 'lucide-react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatPrice } from '@/lib/utils';
import { useWishlistStore, useCartStore } from '@/lib/store';
import type { Product } from '@/lib/types';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
  index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { toggle, isInWishlist } = useWishlistStore();
  const { addItem } = useCartStore();
  const image = product.images?.[0]?.url || '/placeholder.jpg';
  const inWishlist = isInWishlist(product._id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: index * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
      className="group"
    >
      <div className="relative overflow-hidden rounded-2xl bg-white shadow-sm border border-secondary/30 hover:shadow-xl hover:shadow-primary/10 transition-shadow duration-500 card-lift">
        <div className="relative aspect-square overflow-hidden">
          <Link href={`/product/${product.slug}`}>
            <Image
              src={image}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
          </Link>

          <div className="absolute top-3 left-3 flex flex-col gap-1">
            {product.discount > 0 && (
              <Badge variant="sale">{product.discount}% OFF</Badge>
            )}
            {product.isNewArrival && <Badge variant="new">New</Badge>}
            {product.isBestSeller && <Badge variant="gold">Best Seller</Badge>}
          </div>

          <button
            onClick={() => toggle(product._id)}
            className={cn(
              'absolute top-3 right-3 p-2 rounded-full bg-white/90 backdrop-blur-sm shadow-md transition-all duration-300 hover:scale-110',
              inWishlist && 'text-primary'
            )}
            aria-label="Add to wishlist"
          >
            <Heart className={cn('w-4 h-4', inWishlist && 'fill-current')} />
          </button>

          <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <Button
              size="sm"
              className="w-full"
              onClick={() => addItem(product._id)}
            >
              <ShoppingBag className="w-4 h-4" />
              Add to Cart
            </Button>
          </div>
        </div>

        <div className="p-4">
          <p className="text-xs text-primary font-medium mb-1">{product.category?.name}</p>
          <Link href={`/product/${product.slug}`}>
            <h3 className="font-medium text-sm text-foreground line-clamp-2 hover:text-primary transition-colors">
              {product.name}
            </h3>
          </Link>

          <div className="flex items-center gap-1 mt-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={cn(
                  'w-3 h-3',
                  i < Math.floor(product.averageRating) ? 'text-accent fill-accent' : 'text-gray-300'
                )}
              />
            ))}
            <span className="text-xs text-gray-500 ml-1">({product.reviewCount})</span>
          </div>

          <div className="flex items-center gap-2 mt-2">
            <span className="text-lg font-bold text-foreground">{formatPrice(product.price)}</span>
            {product.originalPrice > product.price && (
              <span className="text-sm text-gray-400 line-through">{formatPrice(product.originalPrice)}</span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
