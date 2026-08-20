'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { SectionHeading } from '@/components/motion/SectionHeading';
import { StaggerItem, StaggerReveal } from '@/components/motion/Reveal';
import { DEMO_CATEGORIES } from '@/lib/types';

export function TrendingCategories() {
  return (
    <section className="py-20 container mx-auto px-4">
      <SectionHeading
        eyebrow="Shop By Style"
        title="Trending Categories"
        subtitle="From Korean minimalists to ethnic statement pieces — find your perfect match"
      />

      <StaggerReveal className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {DEMO_CATEGORIES.map((cat) => (
          <StaggerItem key={cat.slug}>
            <Link href={`/categories/${cat.slug}`} className="group block">
              <motion.div
                className="relative aspect-square rounded-3xl overflow-hidden shadow-md border border-secondary/30 card-lift"
                whileHover={{ scale: 1.02, y: -6 }}
                transition={{ type: 'spring', stiffness: 260, damping: 20 }}
              >
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
              </motion.div>
            </Link>
          </StaggerItem>
        ))}
      </StaggerReveal>
    </section>
  );
}
