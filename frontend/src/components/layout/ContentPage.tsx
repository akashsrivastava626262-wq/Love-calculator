'use client';

import { motion } from 'framer-motion';
import { Reveal } from '@/components/motion/Reveal';
import { fadeUp, motionTransition } from '@/lib/motion';

export function ContentPage({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <Reveal variants={fadeUp}>
        <motion.h1
          className="font-display text-3xl md:text-4xl font-bold mb-8 text-gray-800"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={motionTransition(0, 0.5)}
        >
          {title}
        </motion.h1>
      </Reveal>
      <Reveal delay={0.1} className="prose prose-gray max-w-none space-y-4 text-gray-600 leading-relaxed">
        {children}
      </Reveal>
    </div>
  );
}
