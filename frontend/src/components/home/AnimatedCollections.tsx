'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { COLLECTIONS } from '@/lib/types';
import { SectionHeading } from '@/components/motion/SectionHeading';
import { StaggerItem, StaggerReveal } from '@/components/motion/Reveal';
import { motionTransition } from '@/lib/motion';

export function AnimatedCollections() {
  return (
    <section className="py-20 container mx-auto px-4">
      <SectionHeading
        eyebrow="Curated For You"
        title="Shop Collections"
        subtitle="Korean minimal, ethnic elegance, and everyday girlish accessories"
      />

      <StaggerReveal className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
        {COLLECTIONS.map((col) => (
          <StaggerItem key={col.slug}>
            <motion.div whileHover={{ y: -8 }} transition={motionTransition(0, 0.35)}>
              <Link
                href={`/shop?collection=${col.slug}`}
                className="group block relative aspect-[3/2] rounded-3xl overflow-hidden shadow-lg card-lift"
              >
                <Image
                  src={col.image}
                  alt={col.name}
                  fill
                  sizes="33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-rose-900/70 via-rose-500/20 to-transparent transition-opacity duration-500 group-hover:opacity-90" />
                <div className="absolute bottom-5 left-5 right-5 translate-y-1 group-hover:translate-y-0 transition-transform duration-400">
                  <h3 className="text-white font-semibold text-lg">{col.name}</h3>
                  <p className="text-white/70 text-sm mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Explore →
                  </p>
                </div>
              </Link>
            </motion.div>
          </StaggerItem>
        ))}
      </StaggerReveal>
    </section>
  );
}
