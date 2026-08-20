function PolicyLayout({
  title,
  lastUpdated,
  children,
}: {
  title: string;
  lastUpdated: string;
  children: React.ReactNode;
}) {
  return (
    <div className="container mx-auto px-4 py-12 lg:py-16 max-w-3xl">
      <h1 className="font-serif text-3xl lg:text-4xl font-medium mb-2">{title}</h1>
      <p className="text-sm text-muted-foreground mb-8">Last updated: {lastUpdated}</p>
      <div className="prose prose-sm max-w-none space-y-6 [&_h2]:font-serif [&_h2]:text-xl [&_h2]:font-medium [&_h2]:mb-3 [&_p]:text-muted-foreground [&_p]:leading-relaxed">
        {children}
      </div>
    </div>
  );
}

export default PolicyLayout;
