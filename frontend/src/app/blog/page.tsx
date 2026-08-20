import Link from 'next/link';
import Image from 'next/image';

export const metadata = { title: 'Blog' };

const posts = [
  {
    slug: 'korean-jewelry-trends-2026',
    title: 'Top 10 Korean Jewelry Trends 2026',
    excerpt: 'Discover the hottest Korean jewelry trends every fashion girl is loving.',
    image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600',
    date: 'Aug 15, 2026',
  },
  {
    slug: 'ethnic-jewelry-guide',
    title: 'How to Style Ethnic Jewelry for Festivals',
    excerpt: 'Complete guide to pairing ethnic jewelry with your festive outfits.',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600',
    date: 'Aug 10, 2026',
  },
  {
    slug: 'daily-wear-jewelry-tips',
    title: '5 Daily Wear Jewelry Tips',
    excerpt: 'Elevate your everyday look with these simple jewelry styling tips.',
    image: 'https://images.unsplash.com/photo-1605100804763-247fc67fa2b3?w=600',
    date: 'Aug 5, 2026',
  },
];

export default function BlogPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="font-display text-3xl md:text-4xl font-bold mb-8">AAKSHI Blog</h1>
      <div className="grid md:grid-cols-3 gap-6">
        {posts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
            <div className="relative aspect-[16/10] rounded-2xl overflow-hidden mb-4">
              <Image src={post.image} alt={post.title} fill sizes="33vw" className="object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <p className="text-xs text-gray-400 mb-1">{post.date}</p>
            <h2 className="font-semibold group-hover:text-primary transition-colors">{post.title}</h2>
            <p className="text-sm text-gray-500 mt-1">{post.excerpt}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
