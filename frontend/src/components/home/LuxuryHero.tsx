'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Sparkles, Star, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BRAND } from '@/lib/types';

const floatingImages = [
  'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400',
  'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400',
  'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400',
];

export function LuxuryHero() {
  const [current, setCurrent] = useState(0);
  const backgrounds = [
    'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=1920',
    'https://images.unsplash.com/photo-1515562141203-758a88b404cf?w=1920',
    'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=1920',
  ];

  useEffect(() => {
    const t = setInterval(() => setCurrent((c) => (c + 1) % backgrounds.length), 6000);
    return () => clearInterval(t);
  }, [backgrounds.length]);

  return (
    <section className="relative min-h-[92vh] overflow-hidden">
      {/* Animated background slides */}
      {backgrounds.map((bg, i) => (
        <motion.div
          key={bg}
          className="absolute inset-0"
          initial={false}
          animate={{ opacity: i === current ? 1 : 0, scale: i === current ? 1 : 1.05 }}
          transition={{ duration: 1.2 }}
        >
          <Image src={bg} alt="" fill className="object-cover" priority={i === 0} sizes="100vw" />
        </motion.div>
      ))}

      {/* Luxury gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#FF5CA8]/40 via-transparent to-[#D4AF37]/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#1F2937]/80 via-[#1F2937]/30 to-transparent" />

      {/* Decorative sparkles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-accent/60"
            style={{ left: `${10 + (i * 8)}%`, top: `${15 + (i % 4) * 20}%` }}
            animate={{ opacity: [0.2, 1, 0.2], y: [0, -12, 0] }}
            transition={{ duration: 3 + i * 0.3, repeat: Infinity }}
          >
            <Sparkles className="w-4 h-4" />
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 pt-16 pb-24 min-h-[92vh] flex items-center">
        <div className="grid lg:grid-cols-2 gap-12 items-center w-full">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md border border-white/20 rounded-full px-4 py-2 mb-6"
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Star className="w-4 h-4 text-accent fill-accent" />
              <span className="text-white text-sm font-medium">India&apos;s Premium Girls Jewelry Brand</span>
            </motion.div>

            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.05] mb-4">
              <span className="block">{BRAND.name}</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFD6E8] via-white to-[#D4AF37]">
                {BRAND.tagline}
              </span>
            </h1>

            <p className="text-white/85 text-lg md:text-xl max-w-lg mb-8 leading-relaxed">
              Discover Korean trends, ethnic elegance & Instagram-worthy accessories crafted for every girl who loves to shine.
            </p>

            <div className="flex flex-wrap gap-4 mb-10">
              <Link href="/shop">
                <Button size="lg" className="shadow-2xl shadow-primary/40 text-base px-8">
                  Shop Now <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link href="/shop?collection=korean">
                <Button size="lg" variant="gold" className="text-base px-8">
                  Korean Collection
                </Button>
              </Link>
              <Link href="/shop?isNewArrival=true">
                <Button size="lg" variant="outline" className="border-white/60 text-white hover:bg-white hover:text-foreground text-base">
                  New Arrivals
                </Button>
              </Link>
            </div>

            <div className="flex flex-wrap gap-6 text-white/90 text-sm">
              <span>✓ Free Shipping ₹999+</span>
              <span>✓ 7-Day Returns</span>
              <span>✓ 50K+ Happy Girls</span>
            </div>
          </motion.div>

          {/* Floating product showcase */}
          <motion.div
            className="hidden lg:grid grid-cols-2 gap-4"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {floatingImages.map((img, i) => (
              <motion.div
                key={img}
                className={`relative rounded-3xl overflow-hidden shadow-2xl border-2 border-white/20 ${i === 0 ? 'aspect-[4/5]' : 'aspect-square'}`}
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4 + i, repeat: Infinity, ease: 'easeInOut' }}
              >
                <Image src={img} alt="AAKSHI jewelry" fill className="object-cover" sizes="25vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent" />
              </motion.div>
            ))}
            <motion.div
              className="col-span-2 bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 flex items-center justify-between"
              animate={{ opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <div>
                <p className="text-accent font-bold text-lg">Flash Sale Live</p>
                <p className="text-white/80 text-sm">Up to 60% off trending jewelry</p>
              </div>
              <Link href="/shop?isFlashSale=true">
                <Button variant="secondary" size="sm">Grab Deals</Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex gap-2">
        {backgrounds.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-1.5 rounded-full transition-all duration-500 ${i === current ? 'w-10 bg-primary' : 'w-3 bg-white/40'}`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}

export function PromoMarquee() {
  const items = ['Korean Jewelry', 'Ethnic Collection', 'Free Shipping ₹999+', 'New Arrivals', 'Wedding Sets', 'Use WELCOME20'];
  return (
    <div className="bg-gradient-to-r from-primary via-[#ff7eb8] to-accent py-3 overflow-hidden">
      <motion.div
        className="flex gap-12 whitespace-nowrap"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
      >
        {[...items, ...items].map((item, i) => (
          <span key={i} className="text-white font-medium text-sm flex items-center gap-2">
            <Sparkles className="w-3 h-3" /> {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export function TrustStrip() {
  const badges = [
    { label: 'Secure Payments', emoji: '🔒' },
    { label: 'Easy Returns', emoji: '↩️' },
    { label: 'Free Shipping', emoji: '🚚' },
    { label: 'Premium Quality', emoji: '✨' },
    { label: '24x7 Support', emoji: '💬' },
  ];
  return (
    <section className="py-6 bg-white border-y border-secondary/40">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center gap-6 md:gap-12">
          {badges.map((b, i) => (
            <motion.div
              key={b.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="flex items-center gap-2 text-sm font-medium text-foreground/80"
            >
              <span className="text-lg">{b.emoji}</span>
              {b.label}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
