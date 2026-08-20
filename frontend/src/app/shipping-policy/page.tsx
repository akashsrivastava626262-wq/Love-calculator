import { ContentPage } from '@/components/layout/ContentPage';

export const metadata = { title: 'Shipping Policy' };

export default function ShippingPolicyPage() {
  return (
    <ContentPage title="Shipping Policy">
      <h2>Delivery Timeline</h2>
      <ul>
        <li>Metro cities: 3-5 business days</li>
        <li>Other locations: 5-7 business days</li>
        <li>Remote areas: 7-10 business days</li>
      </ul>
      <h2>Shipping Charges</h2>
      <ul>
        <li>Free shipping on orders above ₹999</li>
        <li>Metro cities: ₹49 for orders below ₹999</li>
        <li>Other locations: ₹79 for orders below ₹999</li>
      </ul>
      <h2>Order Tracking</h2>
      <p>Track your order using the Track Order page with your order number and phone number.</p>
    </ContentPage>
  );
}
