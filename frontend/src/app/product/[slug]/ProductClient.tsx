'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  Heart, ShoppingBag, Star, Truck, Shield, ZoomIn, Share2, Minus, Plus, Zap,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ProductCard } from '@/components/product/ProductCard';
import { formatPrice } from '@/lib/utils';
import { useCartStore, useWishlistStore, useRecentlyViewedStore } from '@/lib/store';
import { DEMO_PRODUCTS } from '@/lib/types';
import type { Product } from '@/lib/types';

export default function ProductClient() {
  const router = useRouter();
  const params = useParams();
  const slug = params.slug as string;
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [zoomed, setZoomed] = useState(false);
  const [activeTab, setActiveTab] = useState('description');

  const { addItem } = useCartStore();
  const { toggle, isInWishlist } = useWishlistStore();
  const { add: addRecent } = useRecentlyViewedStore();

  useEffect(() => {
    const p = DEMO_PRODUCTS.find((pr) => pr.slug === slug);
    if (p) {
      setProduct(p);
      addRecent(p._id);
      if (p.colors?.length) setSelectedColor(p.colors[0]);
      if (p.sizes?.length) setSelectedSize(p.sizes[0]);
    }
  }, [slug, addRecent]);

  if (!product) {
    return <div className="container mx-auto px-4 py-20 text-center">Product not found</div>;
  }

  const images = product.images?.length ? product.images : [{ url: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800' }];
  const savings = product.originalPrice - product.price;
  const stockStatus = product.stock > 10 ? 'in_stock' : product.stock > 0 ? 'low_stock' : 'out_of_stock';
  const similar = DEMO_PRODUCTS.filter((p) => p.category.slug === product.category.slug && p._id !== product._id).slice(0, 4);

  const handleAddToCart = () => {
    addItem(product._id, quantity, { color: selectedColor, size: selectedSize });
  };

  const handleBuyNow = () => {
    handleAddToCart();
    router.push('/checkout');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Images */}
        <div>
          <div
            className="relative aspect-square rounded-2xl overflow-hidden bg-white border border-secondary/30 cursor-zoom-in"
            onClick={() => setZoomed(!zoomed)}
          >
            <Image
              src={images[selectedImage]?.url || images[0].url}
              alt={product.name}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className={`object-cover transition-transform duration-300 ${zoomed ? 'scale-150' : ''}`}
            />
            <button className="absolute top-4 right-4 p-2 bg-white/80 rounded-full">
              <ZoomIn className="w-5 h-5" />
            </button>
          </div>
          <div className="flex gap-2 mt-4">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => setSelectedImage(i)}
                className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 ${selectedImage === i ? 'border-primary' : 'border-transparent'}`}
              >
                <Image src={img.url} alt="" fill sizes="80px" className="object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Details */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Badge>{product.category.name}</Badge>
            {product.isNewArrival && <Badge variant="new">New</Badge>}
            {product.discount > 0 && <Badge variant="sale">{product.discount}% OFF</Badge>}
          </div>

          <h1 className="font-display text-2xl md:text-3xl font-bold mb-2">{product.name}</h1>

          <div className="flex items-center gap-2 mb-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.averageRating) ? 'text-accent fill-accent' : 'text-gray-300'}`} />
            ))}
            <span className="text-sm text-gray-500">({product.reviewCount} reviews)</span>
          </div>

          <div className="flex items-baseline gap-3 mb-6">
            <span className="text-3xl font-bold">{formatPrice(product.price)}</span>
            {product.originalPrice > product.price && (
              <span className="text-lg text-gray-400 line-through">{formatPrice(product.originalPrice)}</span>
            )}
            {savings > 0 && <span className="text-sm text-emerald-600 font-medium">Save {formatPrice(savings)}</span>}
          </div>

          <div className="mb-4">
            {stockStatus === 'in_stock' && <p className="text-emerald-600 text-sm font-medium">✓ In Stock</p>}
            {stockStatus === 'low_stock' && <p className="text-amber-600 text-sm font-medium">⚠ Only {product.stock} left!</p>}
            {stockStatus === 'out_of_stock' && <p className="text-red-500 text-sm font-medium">Out of Stock</p>}
          </div>

          {product.colors && product.colors.length > 0 && (
            <div className="mb-4">
              <p className="text-sm font-medium mb-2">Color: {selectedColor}</p>
              <div className="flex gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-4 py-2 rounded-full text-sm border-2 transition-colors ${selectedColor === color ? 'border-primary bg-secondary' : 'border-gray-200'}`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
          )}

          {product.sizes && product.sizes.length > 0 && (
            <div className="mb-4">
              <p className="text-sm font-medium mb-2">Size: {selectedSize}</p>
              <div className="flex gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 rounded-full text-sm border-2 transition-colors ${selectedSize === size ? 'border-primary bg-secondary' : 'border-gray-200'}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center border border-secondary rounded-full">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-3 hover:bg-secondary rounded-l-full">
                <Minus className="w-4 h-4" />
              </button>
              <span className="px-4 font-medium">{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)} className="p-3 hover:bg-secondary rounded-r-full">
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 mb-6">
            <Button size="lg" onClick={handleAddToCart} disabled={stockStatus === 'out_of_stock'} className="flex-1 sm:flex-none">
              <ShoppingBag className="w-5 h-5" /> Add to Cart
            </Button>
            <Button size="lg" variant="gold" onClick={handleBuyNow} disabled={stockStatus === 'out_of_stock'} className="flex-1 sm:flex-none">
              <Zap className="w-5 h-5" /> Buy Now
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => toggle(product._id)}
              className={isInWishlist(product._id) ? 'text-primary' : ''}
            >
              <Heart className={`w-5 h-5 ${isInWishlist(product._id) ? 'fill-current' : ''}`} />
            </Button>
            <Button size="lg" variant="ghost">
              <Share2 className="w-5 h-5" />
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-3 p-4 bg-secondary/30 rounded-2xl">
            <div className="flex items-center gap-2 text-sm"><Truck className="w-4 h-4 text-primary" /> Free shipping above ₹999</div>
            <div className="flex items-center gap-2 text-sm"><Shield className="w-4 h-4 text-primary" /> Secure payment</div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-12">
        <div className="flex gap-4 border-b border-secondary mb-6">
          {['description', 'reviews', 'faq'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 text-sm font-medium capitalize transition-colors ${activeTab === tab ? 'text-primary border-b-2 border-primary' : 'text-gray-500'}`}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === 'description' && (
          <div className="prose max-w-none text-gray-600">
            <p>{product.description}</p>
            <p className="mt-4">All AAKSHI jewelry is crafted with premium materials, skin-friendly plating, and designed for everyday elegance.</p>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="space-y-4">
            <div className="bg-white p-6 rounded-2xl border border-secondary/30">
              <div className="flex items-center gap-2 mb-2">
                <Star className="w-4 h-4 text-accent fill-accent" />
                <span className="font-medium">Absolutely gorgeous!</span>
              </div>
              <p className="text-sm text-gray-600">Love this piece! Quality is amazing and looks so premium. Highly recommend AAKSHI!</p>
            </div>
          </div>
        )}

        {activeTab === 'faq' && (
          <div className="space-y-4">
            {[
              { q: 'Is this hypoallergenic?', a: 'Yes, all AAKSHI jewelry is skin-friendly and hypoallergenic.' },
              { q: 'What is the return policy?', a: '7-day easy returns on unused items with original packaging.' },
              { q: 'How long does delivery take?', a: '3-5 business days for metro cities, 5-7 days for others.' },
            ].map((faq) => (
              <div key={faq.q} className="bg-white p-4 rounded-xl border border-secondary/30">
                <p className="font-medium text-sm mb-1">{faq.q}</p>
                <p className="text-sm text-gray-600">{faq.a}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {similar.length > 0 && (
        <section className="mt-16">
          <h2 className="font-display text-2xl font-bold mb-6">Similar Products</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {similar.map((p, i) => <ProductCard key={p._id} product={p} index={i} />)}
          </div>
        </section>
      )}
    </div>
  );
}
