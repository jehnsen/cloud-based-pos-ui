"use client";

import { useState, useMemo } from "react";
import { Header } from "@/components/pos/header";
import { ProductGrid } from "@/components/pos/product-grid";
import { CartSidebar } from "@/components/pos/cart-sidebar";
import { CategoryFilter } from "@/components/pos/category-filter";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import { CartProvider } from "@/contexts/cart-context";
import { products } from "@/lib/data";

const PRODUCTS_PER_PAGE = 20;

function POSContent() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

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

  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
    return filteredProducts.slice(startIndex, startIndex + PRODUCTS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const productCounts = useMemo(() => {
    const counts: Record<string, number> = { All: products.length };
    products.forEach((product) => {
      counts[product.category] = (counts[product.category] || 0) + 1;
    });
    return counts;
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-green-50">
      <Header />
      <main className="container mx-auto px-4 py-4 md:py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
          <div className="lg:col-span-2 space-y-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-orange-500" />
              <Input
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="pl-11 h-12 border-2 border-orange-200 focus:border-orange-400 bg-white shadow-sm text-base"
              />
            </div>

            {/* Category Filter */}
            <CategoryFilter
              selectedCategory={selectedCategory}
              onCategoryChange={handleCategoryChange}
              productCounts={productCounts}
            />

            {/* Products Section */}
            <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 border-2 border-orange-100">
              <div className="mb-4 flex items-center justify-between flex-wrap gap-2">
                <div>
                  <h2 className="text-xl md:text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                    {selectedCategory === "All"
                      ? "All Products"
                      : selectedCategory}
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Showing {paginatedProducts.length} of {filteredProducts.length} products
                  </p>
                </div>

                {/* Pagination Controls - Top */}
                {totalPages > 1 && (
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      className="h-9"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <span className="text-sm font-medium px-3">
                      Page {currentPage} of {totalPages}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                      className="h-9"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>

              <ProductGrid products={paginatedProducts} />

              {/* Pagination Controls - Bottom */}
              {totalPages > 1 && (
                <div className="mt-6 flex items-center justify-center gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="h-4 w-4 mr-2" />
                    Previous
                  </Button>
                  <span className="text-sm font-medium px-4 py-2 bg-gradient-to-r from-orange-100 to-yellow-100 rounded-lg">
                    Page {currentPage} of {totalPages}
                  </span>
                  <Button
                    variant="outline"
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                  >
                    Next
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              )}
            </div>
          </div>

          <div className="hidden lg:block">
            <CartSidebar />
          </div>
        </div>
      </main>

      {/* Mobile Cart - Fixed Bottom */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-r from-orange-500 to-pink-500 border-t shadow-2xl">
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
