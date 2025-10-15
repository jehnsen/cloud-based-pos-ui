"use client";

import { Product } from "@/lib/data";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Package } from "lucide-react";
import { useCart } from "@/contexts/cart-context";

interface ProductGridProps {
  products: Product[];
}

export function ProductGrid({ products }: ProductGridProps) {
  const { addToCart } = useCart();

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4">
      {products.map((product) => (
        <Card
          key={product.id}
          className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group"
          onClick={() => addToCart(product)}
        >
          <CardContent className="p-3 md:p-4">
            <div className="aspect-square bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg mb-3 flex items-center justify-center">
              <Package className="h-12 w-12 md:h-16 md:w-16 text-blue-500/50" />
            </div>
            <div className="space-y-2">
              <div>
                <h3 className="font-semibold text-sm md:text-base line-clamp-2 min-h-[2.5rem] md:min-h-[3rem]">
                  {product.name}
                </h3>
                <p className="text-xs text-muted-foreground">
                  {product.unit}
                </p>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-lg md:text-xl font-bold text-primary">
                    ₱{product.price.toFixed(2)}
                  </p>
                  <Badge
                    variant={product.stock < 20 ? "destructive" : "secondary"}
                    className="text-xs"
                  >
                    Stock: {product.stock}
                  </Badge>
                </div>
              </div>
              <Button
                size="sm"
                className="w-full group-hover:bg-primary/90"
                onClick={(e) => {
                  e.stopPropagation();
                  addToCart(product);
                }}
              >
                <Plus className="h-4 w-4 mr-1" />
                Add
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
