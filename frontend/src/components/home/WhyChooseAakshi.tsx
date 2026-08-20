'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Shield, RefreshCw, Truck, Award, Headphones } from 'lucide-react';

const features = [
  { icon: Shield, title: 'Secure Payments', desc: '100% secure transactions with Razorpay & Stripe' },
  { icon: RefreshCw, title: 'Easy Returns', desc: '7-day hassle-free return policy' },
  { icon: Truck, title: 'Free Shipping', desc: 'Free delivery on orders above ₹999' },
  { icon: Award, title: 'Premium Quality', desc: 'Handpicked designs with quality assurance' },
  { icon: Headphones, title: '24x7 Support', desc: 'Always here to help you shine' },
];

export function WhyChooseAakshi() {
  return (
    <section className="py-16 container mx-auto px-4">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
        <h2 className="font-display text-3xl md:text-4xl font-bold mb-2">Why Choose AAKSHI</h2>
        <p className="text-gray-500">The premium jewelry experience you deserve</p>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, type: 'spring', stiffness: 300, damping: 22 }}
            className="text-center p-6 rounded-2xl bg-white border border-secondary/30 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 card-lift"
            whileHover={{ y: -5, scale: 1.02 }}
          >
            <div className="w-14 h-14 mx-auto mb-4 bg-secondary rounded-full flex items-center justify-center">
              <f.icon className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold text-sm mb-1">{f.title}</h3>
            <p className="text-xs text-gray-500">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export function BrandStory() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <Image
              src="https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800"
              alt="AAKSHI Brand Story"
              width={600}
              height={500}
              className="rounded-2xl shadow-xl"
            />
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <p className="text-primary font-medium mb-2 tracking-widest text-sm uppercase">Our Story</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">Crafting Elegance for Every Girl</h2>
            <p className="text-gray-600 mb-4 leading-relaxed">
              AAKSHI was born from a passion for making every girl feel beautiful. We curate the finest artificial jewelry,
              Korean fashion accessories, and ethnic pieces that blend tradition with modern trends.
            </p>
            <p className="text-gray-600 mb-6 leading-relaxed">
              From everyday minimalists to festive statement pieces, our collections are designed to be Instagram-worthy,
              affordable, and absolutely stunning. Because every girl deserves to shine.
            </p>
            <div className="flex gap-8">
              <div><p className="text-3xl font-bold text-primary">50K+</p><p className="text-sm text-gray-500">Happy Customers</p></div>
              <div><p className="text-3xl font-bold text-primary">500+</p><p className="text-sm text-gray-500">Unique Designs</p></div>
              <div><p className="text-3xl font-bold text-primary">4.8★</p><p className="text-sm text-gray-500">Average Rating</p></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
