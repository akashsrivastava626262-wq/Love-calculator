export function ContentPage({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="font-display text-3xl md:text-4xl font-bold mb-8">{title}</h1>
      <div className="prose prose-gray max-w-none space-y-4 text-gray-600 leading-relaxed">
        {children}
      </div>
    </div>
  );
}
