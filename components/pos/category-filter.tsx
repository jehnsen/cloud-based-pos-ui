"use client";

import { Button } from "@/components/ui/button";
import { categories } from "@/lib/data";
import { Badge } from "@/components/ui/badge";

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
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
      {categories.map((category) => (
        <Button
          key={category}
          variant={selectedCategory === category ? "default" : "outline"}
          size="sm"
          onClick={() => onCategoryChange(category)}
          className="whitespace-nowrap flex-shrink-0 gap-2"
        >
          {category}
          <Badge
            variant={selectedCategory === category ? "secondary" : "outline"}
            className="ml-1"
          >
            {productCounts[category] || 0}
          </Badge>
        </Button>
      ))}
    </div>
  );
}
