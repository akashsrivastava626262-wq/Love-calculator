'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Share2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { adminAPI } from '@/lib/api';

const instagramImages = [
  'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400',
  'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400',
  'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400',
  'https://images.unsplash.com/photo-1605100804763-247fc67fa2b3?w=400',
  'https://images.unsplash.com/photo-1617038260897-41a1a14a8cae?w=400',
  'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=400',
  'https://images.unsplash.com/photo-1515562141203-758a88b404cf?w=400',
  'https://images.unsplash.com/photo-1603561596112-0a132b757442?w=400',
];

export function InstagramGallery() {
  return (
    <section className="py-16 container mx-auto px-4">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Share2 className="w-6 h-6 text-primary" />
          <h2 className="font-display text-3xl md:text-4xl font-bold">@aakshi.official</h2>
        </div>
        <p className="text-gray-500">Follow us for daily style inspiration</p>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
        {instagramImages.map((img, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="relative aspect-square rounded-xl overflow-hidden group cursor-pointer"
          >
            <Image src={img} alt={`Instagram ${i + 1}`} fill sizes="25vw" className="object-cover group-hover:scale-110 transition-transform duration-500" />
            <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/30 transition-colors flex items-center justify-center">
              <Share2 className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await adminAPI.subscribeNewsletter(email);
      setStatus('success');
      setEmail('');
    } catch {
      setStatus('error');
    }
  };

  return (
    <section className="py-16 bg-gradient-to-br from-primary/10 via-secondary/50 to-accent/10">
      <div className="container mx-auto px-4 max-w-2xl text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-2">Stay in the Loop</h2>
          <p className="text-gray-500 mb-8">Subscribe for exclusive offers, new arrivals & style tips</p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1"
            />
            <Button type="submit">Subscribe</Button>
          </form>

          {status === 'success' && <p className="text-emerald-600 mt-4 text-sm">Thank you for subscribing! 💕</p>}
          {status === 'error' && <p className="text-red-500 mt-4 text-sm">Something went wrong. Please try again.</p>}
        </motion.div>
      </div>
    </section>
  );
}

export function CelebrityCollection() {
  const collections = [
    { name: 'Korean Fashion', slug: 'korean', image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600' },
    { name: 'Ethnic Festive', slug: 'ethnic', image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600' },
    { name: 'Celebrity Inspired', slug: 'celebrity', image: 'https://images.unsplash.com/photo-1617038260897-41a1a14a8cae?w=600' },
  ];

  return (
    <section className="py-16 container mx-auto px-4">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
        <h2 className="font-display text-3xl md:text-4xl font-bold mb-2">Celebrity Inspired Collection</h2>
        <p className="text-gray-500">Get the look your favorite influencers are wearing</p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6">
        {collections.map((col, i) => (
          <motion.a
            key={col.slug}
            href={`/shop?collection=${col.slug}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="group relative aspect-[4/5] rounded-2xl overflow-hidden"
          >
            <Image src={col.image} alt={col.name} fill sizes="33vw" className="object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6">
              <h3 className="text-white text-xl font-bold">{col.name}</h3>
              <p className="text-white/70 text-sm mt-1">Shop Collection →</p>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
}

export function UserGeneratedPhotos() {
  const photos = instagramImages.slice(0, 6);
  return (
    <section className="py-16 bg-secondary/20">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-2">#AakshiGirls</h2>
          <p className="text-gray-500">Real customers, real style</p>
        </motion.div>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
          {photos.map((img, i) => (
            <motion.div key={i} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="relative aspect-square rounded-xl overflow-hidden">
              <Image src={img} alt={`UGC ${i}`} fill sizes="16vw" className="object-cover" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
