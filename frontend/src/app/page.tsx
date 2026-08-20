import { HeroBanner } from '@/components/home/HeroBanner';
import { TrendingCategories } from '@/components/home/TrendingCategories';
import { ProductGrid } from '@/components/home/ProductGrid';
import { FlashSaleCountdown } from '@/components/home/FlashSaleCountdown';
import { CustomerReviews } from '@/components/home/CustomerReviews';
import { WhyChooseAakshi, BrandStory } from '@/components/home/WhyChooseAakshi';
import {
  InstagramGallery,
  NewsletterSection,
  CelebrityCollection,
  UserGeneratedPhotos,
} from '@/components/home/MoreSections';
import { COLLECTIONS } from '@/lib/types';
import Image from 'next/image';
import Link from 'next/link';

export default function HomePage() {
  return (
    <>
      <HeroBanner />
      <TrendingCategories />

      <ProductGrid
        title="Best Selling Products"
        subtitle="Our most loved pieces"
        filterType="bestSeller"
      />

      <ProductGrid
        title="New Arrivals"
        subtitle="Fresh styles just dropped"
        filterType="newArrival"
        limit={4}
      />

      <FlashSaleCountdown />

      <section className="py-16 container mx-auto px-4">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-10">Shop Collections</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {COLLECTIONS.map((col) => (
            <Link key={col.slug} href={`/shop?collection=${col.slug}`} className="group relative aspect-[3/2] rounded-2xl overflow-hidden">
              <Image src={col.image} alt={col.name} fill sizes="33vw" className="object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <h3 className="absolute bottom-4 left-4 text-white font-semibold">{col.name}</h3>
            </Link>
          ))}
        </div>
      </section>

      <CelebrityCollection />
      <InstagramGallery />
      <CustomerReviews />
      <WhyChooseAakshi />
      <BrandStory />
      <UserGeneratedPhotos />
      <NewsletterSection />
    </>
  );
}
