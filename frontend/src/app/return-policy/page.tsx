import { ContentPage } from '@/components/layout/ContentPage';

export const metadata = { title: 'Return Policy' };

export default function ReturnPolicyPage() {
  return (
    <ContentPage title="Return Policy">
      <h2>7-Day Easy Returns</h2>
      <p>We offer hassle-free returns within 7 days of delivery for unused items in original packaging with tags attached.</p>
      <h2>How to Return</h2>
      <ol>
        <li>Contact support@aakshi.com or use My Account → Order History</li>
        <li>Receive return authorization and instructions</li>
        <li>Ship the item back in original packaging</li>
        <li>Refund processed within 5-7 business days after inspection</li>
      </ol>
      <h2>Non-Returnable Items</h2>
      <p>Personalized items, gift cards, and items marked as final sale cannot be returned.</p>
    </ContentPage>
  );
}
