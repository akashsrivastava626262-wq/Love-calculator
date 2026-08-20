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
import { AnimatedCollections } from '@/components/home/AnimatedCollections';

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

      <AnimatedCollections />

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
