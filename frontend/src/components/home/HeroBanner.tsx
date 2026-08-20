'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const slides = [
  {
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=1920',
    title: 'Korean Collection 2026',
    subtitle: 'Trendy K-Style Jewelry That Defines You',
    cta: 'Shop Korean',
    link: '/shop?collection=korean',
  },
  {
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=1920',
    title: 'Ethnic Festive Sale',
    subtitle: 'Up to 60% Off on Traditional Jewelry',
    cta: 'Explore Ethnic',
    link: '/shop?collection=ethnic',
  },
  {
    image: 'https://images.unsplash.com/photo-1515562141203-758a88b404cf?w=1920',
    title: 'Wedding Collection',
    subtitle: 'Bridal Jewelry for Your Special Day',
    cta: 'Shop Wedding',
    link: '/shop?collection=wedding',
  },
];

export function HeroBanner() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrent((c) => (c + 1) % slides.length), 5000);
    return () => clearInterval(timer);
  }, []);

  const slide = slides[current];

  return (
    <section className="relative h-[70vh] md:h-[85vh] overflow-hidden">
      {slides.map((s, i) => (
        <motion.div
          key={i}
          className="absolute inset-0"
          initial={false}
          animate={{ opacity: i === current ? 1 : 0 }}
          transition={{ duration: 1 }}
        >
          <Image src={s.image} alt={s.title} fill className="object-cover" priority={i === 0} />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
        </motion.div>
      ))}

      <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
        <motion.div
          key={current}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-xl"
        >
          <p className="text-accent font-medium mb-2 tracking-widest text-sm uppercase">AAKSHI Premium</p>
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 leading-tight">
            {slide.title}
          </h1>
          <p className="text-white/80 text-lg mb-8">{slide.subtitle}</p>
          <div className="flex flex-wrap gap-4">
            <Link href={slide.link}>
              <Button size="lg">{slide.cta}</Button>
            </Link>
            <Link href="/shop?isBestSeller=true">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-foreground">
                Best Sellers
              </Button>
            </Link>
            <Link href="/shop?isNewArrival=true">
              <Button size="lg" variant="ghost" className="text-white hover:bg-white/20">
                New Arrivals
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-2 h-2 rounded-full transition-all ${i === current ? 'bg-primary w-8' : 'bg-white/50'}`}
          />
        ))}
      </div>

      <button
        onClick={() => setCurrent((c) => (c - 1 + slides.length) % slides.length)}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 bg-white/20 backdrop-blur rounded-full text-white hover:bg-white/40 transition-colors"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={() => setCurrent((c) => (c + 1) % slides.length)}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 bg-white/20 backdrop-blur rounded-full text-white hover:bg-white/40 transition-colors"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </section>
  );
}
