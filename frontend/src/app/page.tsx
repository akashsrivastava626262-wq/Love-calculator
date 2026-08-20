import { ReferenceHero, ReferenceTrustBar, BrandIntroSection } from '@/components/home/ReferenceLanding';
import { CustomerReviews } from '@/components/home/CustomerReviews';
import { InstagramGallery, NewsletterSection } from '@/components/home/MoreSections';

export default function HomePage() {
  return (
    <>
      <ReferenceHero />
      <ReferenceTrustBar />
      <BrandIntroSection />
      <CustomerReviews />
      <InstagramGallery />
      <NewsletterSection />
    </>
  );
}
