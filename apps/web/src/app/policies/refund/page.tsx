import type { Metadata } from "next";
import PolicyLayout from "@/components/layout/PolicyLayout";

export const metadata: Metadata = { title: "Refund Policy" };

export default function RefundPolicyPage() {
  return (
    <PolicyLayout title="Refund Policy" lastUpdated="August 20, 2026">
      <section>
        <h2>Return Window</h2>
        <p>
          We offer a 7-day return policy from the date of delivery. Items must be unused,
          in original packaging, and with all tags attached.
        </p>
      </section>
      <section>
        <h2>Refund Process</h2>
        <p>
          Once we receive and inspect your return, refunds are processed within 5-7 business
          days to your original payment method. COD orders receive store credit or bank transfer.
        </p>
      </section>
      <section>
        <h2>Non-Returnable Items</h2>
        <p>
          Earrings (for hygiene reasons), customized items, and sale items marked as final sale
          cannot be returned.
        </p>
      </section>
    </PolicyLayout>
  );
}
