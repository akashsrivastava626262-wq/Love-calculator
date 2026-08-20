'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { DEMO_CATEGORIES } from '@/lib/types';

export function TrendingCategories() {
  return (
    <section className="py-20 container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <p className="text-primary font-medium tracking-widest text-sm uppercase mb-2">Shop By Style</p>
        <h2 className="font-display text-3xl md:text-5xl font-bold mb-3">Trending Categories</h2>
        <p className="text-gray-500 max-w-lg mx-auto">From Korean minimalists to ethnic statement pieces — find your perfect match</p>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {DEMO_CATEGORIES.map((cat, i) => (
          <motion.div
            key={cat.slug}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
          >
            <Link href={`/categories/${cat.slug}`} className="group">
              <div className="relative aspect-square rounded-3xl overflow-hidden shadow-md hover:shadow-xl hover:shadow-primary/20 transition-all duration-500 border border-secondary/30">
                <Image
                  src={cat.image || ''}
                  alt={cat.name}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                <div className="absolute bottom-5 left-5 right-5">
                  <h3 className="text-white font-semibold text-base md:text-lg">{cat.name}</h3>
                  <p className="text-white/80 text-xs mt-1 opacity-0 group-hover:opacity-100 transition-opacity">Shop now →</p>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
