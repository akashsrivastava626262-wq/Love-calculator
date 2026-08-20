"use client";

import Image from "next/image";
import { Star } from "lucide-react";
import { motion } from "framer-motion";

const reviews = [
  {
    id: "1",
    name: "Priya Sharma",
    rating: 5,
    comment: "Absolutely love my new earrings! The quality is amazing and they haven't tarnished even after months of daily wear.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80",
    productImage: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=200&q=80",
  },
  {
    id: "2",
    name: "Ananya Patel",
    rating: 5,
    comment: "Best Korean jewelry I've found in India! Fast delivery and beautiful packaging. Will definitely order again.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80",
    productImage: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=200&q=80",
  },
  {
    id: "3",
    name: "Sneha Reddy",
    rating: 5,
    comment: "The layered necklace set is stunning! Got so many compliments at my office party. Premium quality at great price.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&q=80",
    productImage: "https://images.unsplash.com/photo-1588444837495-c6c1e887a071?w=200&q=80",
  },
  {
    id: "4",
    name: "Kavya Menon",
    rating: 5,
    comment: "My go-to brand for everyday jewelry. Anti-tarnish promise is real - wearing the bracelet in shower daily!",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80",
    productImage: "https://images.unsplash.com/photo-1611591432578-014a0b017a0b?w=200&q=80",
  },
];

export function CustomerReviews() {
  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl lg:text-4xl font-medium">What Our Customers Say</h2>
          <p className="mt-3 text-muted-foreground">Real reviews from real AAKSHI lovers</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 border border-border card-hover"
            >
              <div className="flex items-center gap-3 mb-4">
                <Image
                  src={review.image}
                  alt={review.name}
                  width={40}
                  height={40}
                  className="rounded-full object-cover"
                />
                <div>
                  <p className="font-medium text-sm">{review.name}</p>
                  <div className="flex gap-0.5">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <Star key={i} className="h-3 w-3 fill-champagne text-champagne" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                &ldquo;{review.comment}&rdquo;
              </p>
              <div className="relative h-20 rounded-lg overflow-hidden">
                <Image
                  src={review.productImage}
                  alt="Product"
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
