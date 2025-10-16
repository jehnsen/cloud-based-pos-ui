"use client";

import { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { categories } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CategoryFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  productCounts: Record<string, number>;
}

export function CategoryFilter({
  selectedCategory,
  onCategoryChange,
  productCounts,
}: CategoryFilterProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative flex items-center gap-2">
      {/* Left Arrow */}
      {showLeftArrow && (
        <Button
          variant="outline"
          size="icon"
          onClick={() => scroll("left")}
          className="absolute left-0 z-10 h-9 w-9 rounded-full bg-white shadow-lg border-2 border-orange-300 hover:bg-orange-50"
        >
          <ChevronLeft className="h-5 w-5 text-orange-600" />
        </Button>
      )}

      {/* Scrollable Container */}
      <div
        ref={scrollContainerRef}
        onScroll={checkScroll}
        className="flex gap-2 overflow-x-auto scrollbar-hide pb-2 scroll-smooth"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            size="sm"
            onClick={() => onCategoryChange(category)}
            className={`whitespace-nowrap flex-shrink-0 gap-2 font-semibold transition-all ${
              selectedCategory === category
                ? "bg-gradient-primary text-white shadow-lg scale-105 border-2 border-orange-300"
                : "bg-white hover:bg-orange-50 text-gray-700 border-2 border-orange-200 hover:border-orange-300"
            }`}
          >
            {category}
            <Badge
              className={`ml-1 font-bold ${
                selectedCategory === category
                  ? "bg-white text-orange-600"
                  : "bg-orange-100 text-orange-700 border-orange-300"
              }`}
            >
              {productCounts[category] || 0}
            </Badge>
          </Button>
        ))}
      </div>

      {/* Right Arrow */}
      {showRightArrow && (
        <Button
          variant="outline"
          size="icon"
          onClick={() => scroll("right")}
          className="absolute right-0 z-10 h-9 w-9 rounded-full bg-white shadow-lg border-2 border-orange-300 hover:bg-orange-50"
        >
          <ChevronRight className="h-5 w-5 text-orange-600" />
        </Button>
      )}
    </div>
  );
}
