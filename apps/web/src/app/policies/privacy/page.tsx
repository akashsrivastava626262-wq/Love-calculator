import type { Metadata } from "next";
import PolicyLayout from "@/components/layout/PolicyLayout";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function PrivacyPolicyPage() {
  return (
    <PolicyLayout title="Privacy Policy" lastUpdated="August 20, 2026">
      <section>
        <h2>1. Information We Collect</h2>
        <p>
          We collect information you provide directly, including name, email, phone number,
          shipping address, and payment information when you create an account or place an order.
        </p>
      </section>
      <section>
        <h2>2. How We Use Your Information</h2>
        <p>
          We use your information to process orders, provide customer support, send marketing
          communications (with your consent), improve our services, and comply with legal obligations.
        </p>
      </section>
      <section>
        <h2>3. Data Security</h2>
        <p>
          We implement industry-standard security measures including SSL encryption, secure payment
          processing, and regular security audits to protect your personal information.
        </p>
      </section>
      <section>
        <h2>4. Your Rights</h2>
        <p>
          You have the right to access, update, or delete your personal data. Contact us at
          support@aakshi.com for any privacy-related requests.
        </p>
      </section>
    </PolicyLayout>
  );
}
