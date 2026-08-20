import { ContentPage } from '@/components/layout/ContentPage';

export const metadata = { title: 'FAQ' };

export default function FAQPage() {
  const faqs = [
    { q: 'What materials are used in AAKSHI jewelry?', a: 'We use premium alloy with gold/rose gold/silver plating, crystals, pearls, and hypoallergenic materials.' },
    { q: 'Is AAKSHI jewelry hypoallergenic?', a: 'Yes, all our jewelry is skin-friendly and suitable for sensitive skin.' },
    { q: 'How long does delivery take?', a: 'Metro cities: 3-5 business days. Other locations: 5-7 business days.' },
    { q: 'What is the return policy?', a: '7-day easy returns on unused items with original packaging and tags.' },
    { q: 'Do you offer free shipping?', a: 'Yes, free shipping on all orders above ₹999.' },
    { q: 'What payment methods do you accept?', a: 'Razorpay, UPI, Google Pay, PhonePe, Paytm, Stripe, and Cash on Delivery.' },
    { q: 'How do I track my order?', a: 'Use the Track Order page with your order number and phone number.' },
    { q: 'Can I cancel my order?', a: 'Orders can be cancelled before shipping. Contact support for assistance.' },
  ];

  return (
    <ContentPage title="Frequently Asked Questions">
      <div className="space-y-4 not-prose">
        {faqs.map((faq) => (
          <div key={faq.q} className="bg-white p-6 rounded-2xl border border-secondary/30">
            <h3 className="font-semibold mb-2">{faq.q}</h3>
            <p className="text-sm text-gray-600">{faq.a}</p>
          </div>
        ))}
      </div>
    </ContentPage>
  );
}
