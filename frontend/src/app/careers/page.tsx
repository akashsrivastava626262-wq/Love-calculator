import { ContentPage } from '@/components/layout/ContentPage';
import { Button } from '@/components/ui/button';

export const metadata = { title: 'Careers' };

export default function CareersPage() {
  const openings = [
    { title: 'Social Media Manager', type: 'Full-time', location: 'Remote' },
    { title: 'Content Creator', type: 'Part-time', location: 'Mumbai' },
    { title: 'Customer Support Executive', type: 'Full-time', location: 'Delhi' },
    { title: 'Jewelry Designer', type: 'Full-time', location: 'Jaipur' },
  ];

  return (
    <ContentPage title="Careers at AAKSHI">
      <p>Join our team and help us adorn every girl with elegance! We&apos;re building India&apos;s most loved fashion jewelry brand.</p>
      <div className="space-y-4 mt-8 not-prose">
        {openings.map((job) => (
          <div key={job.title} className="flex justify-between items-center bg-white p-6 rounded-2xl border border-secondary/30">
            <div>
              <h3 className="font-semibold">{job.title}</h3>
              <p className="text-sm text-gray-500">{job.type} · {job.location}</p>
            </div>
            <Button variant="outline" size="sm">Apply</Button>
          </div>
        ))}
      </div>
    </ContentPage>
  );
}
