import { ReferenceHero, ReferenceTrustBar, BrandIntroSection } from '@/components/home/ReferenceLanding';
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
      <ReferenceHero />
      <ReferenceTrustBar />
      <BrandIntroSection />

      <TrendingCategories />

      <ProductGrid
        title="Best Selling Products"
        subtitle="Our most loved pieces — trending across India"
        filterType="bestSeller"
      />

      <FlashSaleCountdown />

      <ProductGrid
        title="New Arrivals"
        subtitle="Fresh styles just dropped"
        filterType="newArrival"
        limit={4}
      />

      <section className="py-20 container mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-mauve font-medium tracking-widest text-sm uppercase mb-2">Curated For You</p>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-mauve">Shop Collections</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {COLLECTIONS.map((col) => (
            <Link
              key={col.slug}
              href={`/shop?collection=${col.slug}`}
              className="group relative aspect-[3/2] rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-mauve/20 transition-all duration-500"
            >
              <Image src={col.image} alt={col.name} fill sizes="33vw" className="object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-mauve-dark/70 via-mauve/20 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5">
                <h3 className="text-white font-semibold text-lg">{col.name}</h3>
                <p className="text-white/70 text-sm mt-1 group-hover:text-announce transition-colors">Explore →</p>
              </div>
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
