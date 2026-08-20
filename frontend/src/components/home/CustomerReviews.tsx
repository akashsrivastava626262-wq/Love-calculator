'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const reviews = [
  { name: 'Priya S.', rating: 5, text: 'Absolutely love my Korean earrings! Quality is amazing and they look so premium. AAKSHI is my go-to for jewelry now!', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100' },
  { name: 'Ananya R.', rating: 5, text: 'The ethnic choker set I ordered for my cousin\'s wedding was stunning. Fast delivery and beautiful packaging!', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100' },
  { name: 'Sneha K.', rating: 5, text: 'Best artificial jewelry brand in India! The prices are great and the designs are always on trend.', image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100' },
  { name: 'Meera P.', rating: 4, text: 'Love the daily wear collection. Lightweight and comfortable. Already ordered 5 more pieces!', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100' },
];

export function CustomerReviews() {
  return (
    <section className="py-16 bg-secondary/30">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-2">What Our Girls Say</h2>
          <p className="text-gray-500">Trusted by thousands of happy customers</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((review, i) => (
            <motion.div
              key={review.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-sm border border-secondary/30"
            >
              <div className="flex items-center gap-3 mb-4">
                <Image src={review.image} alt={review.name} width={48} height={48} className="rounded-full object-cover" />
                <div>
                  <p className="font-semibold text-sm">{review.name}</p>
                  <div className="flex gap-0.5">
                    {Array.from({ length: review.rating }).map((_, j) => (
                      <Star key={j} className="w-3 h-3 text-accent fill-accent" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">{review.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
