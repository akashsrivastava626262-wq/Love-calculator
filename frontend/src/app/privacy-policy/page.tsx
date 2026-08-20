import { ContentPage } from '@/components/layout/ContentPage';

export const metadata = { title: 'Privacy Policy' };

export default function PrivacyPage() {
  return (
    <ContentPage title="Privacy Policy">
      <p>Last updated: August 2026</p>
      <h2>Information We Collect</h2>
      <p>We collect information you provide directly, including name, email, phone number, shipping address, and payment details when you make a purchase.</p>
      <h2>How We Use Your Information</h2>
      <p>We use your information to process orders, send updates, improve our services, and send marketing communications (with your consent).</p>
      <h2>Data Security</h2>
      <p>We implement industry-standard security measures including HTTPS, encrypted payment processing, and secure data storage.</p>
      <h2>Contact</h2>
      <p>For privacy concerns, email us at privacy@aakshi.com</p>
    </ContentPage>
  );
}
