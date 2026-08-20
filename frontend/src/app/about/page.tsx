import { ContentPage } from '@/components/layout/ContentPage';

export const metadata = { title: 'About Us' };

export default function AboutPage() {
  return (
    <ContentPage title="About AAKSHI">
      <p>AAKSHI is a premium fashion jewelry and girls accessories brand dedicated to making every girl feel elegant and confident.</p>
      <p>Founded with a passion for beautiful design, we curate the finest artificial jewelry, Korean fashion pieces, ethnic collections, and trendy accessories that compete with the best brands in India.</p>
      <h2>Our Mission</h2>
      <p>To provide Instagram-worthy, premium-quality jewelry at accessible prices, empowering every girl to express her unique style.</p>
      <h2>What We Offer</h2>
      <ul>
        <li>Artificial & Fashion Jewelry</li>
        <li>Korean Jewelry Collection</li>
        <li>Ethnic & Festive Jewelry</li>
        <li>Wedding & Bridal Sets</li>
        <li>Hair Accessories & Fashion Extras</li>
      </ul>
    </ContentPage>
  );
}
