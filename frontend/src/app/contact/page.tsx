import { ContentPage } from '@/components/layout/ContentPage';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export const metadata = { title: 'Contact Us' };

export default function ContactPage() {
  return (
    <ContentPage title="Contact Us">
      <p>We&apos;d love to hear from you! Reach out for orders, styling advice, or partnership inquiries.</p>
      <div className="grid md:grid-cols-2 gap-8 mt-8 not-prose">
        <div className="space-y-4">
          <p><strong>Email:</strong> support@aakshi.com</p>
          <p><strong>Phone:</strong> +91 98765 43210</p>
          <p><strong>Hours:</strong> Mon-Sat, 9AM - 8PM IST</p>
          <p><strong>WhatsApp:</strong> +91 98765 43210</p>
        </div>
        <form className="space-y-4">
          <Input placeholder="Your Name" />
          <Input placeholder="Email" type="email" />
          <Input placeholder="Subject" />
          <textarea className="w-full border border-secondary rounded-xl px-4 py-3 text-sm min-h-[120px]" placeholder="Your message..." />
          <Button>Send Message</Button>
        </form>
      </div>
    </ContentPage>
  );
}
