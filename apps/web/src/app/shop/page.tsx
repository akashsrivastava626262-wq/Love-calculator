"use client";

import { useSearchParams } from "next/navigation";
import { useMemo, Suspense } from "react";
import { ProductCard } from "@/components/products/ProductCard";
import { filterProducts } from "@/lib/mock-data";
import { Input } from "@/components/ui/input";

const categories = [
  { slug: "", label: "All" },
  { slug: "earrings", label: "Earrings" },
  { slug: "necklaces", label: "Necklaces" },
  { slug: "rings", label: "Rings" },
  { slug: "bracelets", label: "Bracelets" },
  { slug: "anklets", label: "Anklets" },
  { slug: "layered-sets", label: "Layered Sets" },
];

const sortOptions = [
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "popular", label: "Most Popular" },
];

function ShopContent() {
  const searchParams = useSearchParams();
  const category = searchParams.get("category") || undefined;
  const collection = searchParams.get("collection") || undefined;
  const bestSeller = searchParams.get("bestSeller") === "true";
  const sort = searchParams.get("sort") || "newest";
  const search = searchParams.get("search") || undefined;

  const products = useMemo(
    () =>
      filterProducts({
        category,
        collection,
        bestSeller,
        sort,
        search,
      }),
    [category, collection, bestSeller, sort, search]
  );

  const updateParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value);
    else params.delete(key);
    window.history.replaceState(null, "", `/shop?${params.toString()}`);
    window.location.reload();
  };

  return (
    <div className="container mx-auto px-4 py-8 lg:py-12">
      <div className="mb-8">
        <h1 className="font-serif text-3xl lg:text-4xl font-medium">Shop All</h1>
        <p className="mt-2 text-muted-foreground">
          Discover our complete collection of premium jewelry
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <aside className="lg:w-64 flex-shrink-0">
          <div className="sticky top-24 space-y-6">
            <div>
              <h3 className="font-medium mb-3">Search</h3>
              <Input
                placeholder="Search products..."
                defaultValue={search}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    updateParam("search", (e.target as HTMLInputElement).value);
                  }
                }}
              />
            </div>

            <div>
              <h3 className="font-medium mb-3">Categories</h3>
              <div className="space-y-2">
                {categories.map((cat) => (
                  <button
                    key={cat.slug}
                    onClick={() => updateParam("category", cat.slug)}
                    className={`block w-full text-left text-sm py-1.5 px-2 rounded-lg transition-colors ${
                      (category || "") === cat.slug
                        ? "bg-primary text-white"
                        : "text-muted-foreground hover:text-primary hover:bg-accent"
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-3">Sort By</h3>
              <select
                value={sort}
                onChange={(e) => updateParam("sort", e.target.value)}
                className="w-full h-11 px-3 rounded-lg border border-border bg-white text-sm"
              >
                {sortOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <h3 className="font-medium mb-3">Filters</h3>
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input
                  type="checkbox"
                  checked={bestSeller}
                  onChange={(e) => updateParam("bestSeller", e.target.checked ? "true" : "")}
                  className="rounded border-border"
                />
                Best Sellers
              </label>
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="flex-1">
          <p className="text-sm text-muted-foreground mb-6">
            {products.length} products
          </p>
          {products.length > 0 ? (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
              {products.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-muted-foreground">No products found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="container mx-auto px-4 py-12">Loading...</div>}>
      <ShopContent />
    </Suspense>
  );
}
