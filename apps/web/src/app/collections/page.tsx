import { CollectionGrid } from "@/components/home/CollectionGrid";

export default function CollectionsPage() {
  return (
    <div>
      <section className="hero-gradient py-12 lg:py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-serif text-4xl font-medium">Collections</h1>
          <p className="mt-3 text-muted-foreground">Curated jewelry for every moment</p>
        </div>
      </section>
      <CollectionGrid />
    </div>
  );
}
