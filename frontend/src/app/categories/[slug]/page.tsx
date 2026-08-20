import Image from 'next/image';
import Link from 'next/link';
import { DEMO_CATEGORIES } from '@/lib/types';

export function generateStaticParams() {
  return DEMO_CATEGORIES.map((c) => ({ slug: c.slug }));
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = DEMO_CATEGORIES.find((c) => c.slug === slug);

  if (!category) {
    return <div className="container mx-auto px-4 py-20 text-center">Category not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="relative h-48 md:h-64 rounded-2xl overflow-hidden mb-8">
        <Image src={category.image || ''} alt={category.name} fill className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <h1 className="font-display text-4xl font-bold text-white">{category.name}</h1>
        </div>
      </div>
      <Link href={`/shop?category=${category.slug}`} className="text-primary hover:underline">
        View all {category.name} →
      </Link>
    </div>
  );
}
