"use client";

import { useState, useMemo } from "react";
import { Header } from "@/components/pos/header";
import { ProductGrid } from "@/components/pos/product-grid";
import { CartSidebar } from "@/components/pos/cart-sidebar";
import { CategoryFilter } from "@/components/pos/category-filter";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { CartProvider } from "@/contexts/cart-context";
import { products } from "@/lib/data";

function POSContent() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory =
        selectedCategory === "All" || product.category === selectedCategory;
      const matchesSearch = product.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const productCounts = useMemo(() => {
    const counts: Record<string, number> = { All: products.length };
    products.forEach((product) => {
      counts[product.category] = (counts[product.category] || 0) + 1;
    });
    return counts;
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-4 md:py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
          <div className="lg:col-span-2 space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-11"
              />
            </div>

            <CategoryFilter
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              productCounts={productCounts}
            />

            <div className="bg-white rounded-lg p-4 md:p-6">
              <div className="mb-4">
                <h2 className="text-xl md:text-2xl font-bold">
                  {selectedCategory === "All"
                    ? "All Products"
                    : selectedCategory}
                </h2>
                <p className="text-sm text-muted-foreground">
                  {filteredProducts.length} products found
                </p>
              </div>
              <ProductGrid products={filteredProducts} />
            </div>
          </div>

          <div className="hidden lg:block">
            <CartSidebar />
          </div>
        </div>
      </main>

      {/* Mobile Cart - Fixed Bottom */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 p-4 bg-white border-t shadow-lg">
        <CartSidebar />
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <CartProvider>
      <POSContent />
    </CartProvider>
  );
}
