import { ContentPage } from '@/components/layout/ContentPage';

export const metadata = { title: 'Terms & Conditions' };

export default function TermsPage() {
  return (
    <ContentPage title="Terms & Conditions">
      <p>Last updated: August 2026</p>
      <h2>Acceptance of Terms</h2>
      <p>By accessing and using AAKSHI&apos;s website, you agree to these terms and conditions.</p>
      <h2>Products</h2>
      <p>All jewelry is fashion/artificial jewelry unless otherwise stated. Colors may vary slightly due to screen settings.</p>
      <h2>Pricing</h2>
      <p>Prices are in INR and include applicable taxes. We reserve the right to change prices without notice.</p>
      <h2>Orders</h2>
      <p>Order confirmation does not guarantee acceptance. We may cancel orders due to stock issues or payment failures.</p>
    </ContentPage>
  );
}
