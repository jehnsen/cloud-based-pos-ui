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

  const getGradientColor = (index: number) => {
    const gradients = [
      "from-orange-400 to-pink-400",
      "from-yellow-400 to-orange-400",
      "from-green-400 to-teal-400",
      "from-pink-400 to-red-400",
      "from-purple-400 to-pink-400",
      "from-blue-400 to-cyan-400",
    ];
    return gradients[index % gradients.length];
  };

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <Package className="h-16 w-16 mx-auto text-gray-300 mb-4" />
        <p className="text-gray-500 text-lg">No products found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4">
      {products.map((product, index) => (
        <Card
          key={product.id}
          className="overflow-hidden hover:shadow-2xl hover:scale-105 transition-all duration-200 cursor-pointer group border-2 border-orange-100 hover:border-orange-300"
          onClick={() => addToCart(product)}
        >
          <CardContent className="p-3 md:p-4">
            {/* <div className={`aspect-square bg-gradient-to-br ${getGradientColor(index)} rounded-xl mb-3 flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow`}>
              <Package className="h-12 w-12 md:h-16 md:w-16 text-white/90 drop-shadow-md" />
            </div> */}
            <div className="space-y-2">
              <div>
                <h3 className="font-bold text-sm md:text-base line-clamp-2 min-h-[2.5rem] md:min-h-[3rem] text-gray-800 group-hover:text-orange-600 transition-colors">
                  {product.name}
                </h3>
                <p className="text-xs text-gray-500 font-medium">
                  {product.unit}
                </p>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-lg md:text-xl font-black bg-gradient-primary bg-clip-text text-transparent">
                    ₱{product.price.toFixed(2)}
                  </p>
                  <Badge
                    variant={product.stock < 20 ? "destructive" : "secondary"}
                    className={`text-xs font-semibold ${
                      product.stock < 20
                        ? "bg-red-100 text-red-700 border-red-300"
                        : "bg-green-100 text-green-700 border-green-300"
                    }`}
                  >
                    Stock: {product.stock}
                  </Badge>
                </div>
              </div>
              <Button
                size="sm"
                className="w-full bg-gradient-primary hover:opacity-90 text-white font-bold shadow-md hover:shadow-lg transition-all"
                onClick={(e) => {
                  e.stopPropagation();
                  addToCart(product);
                }}
              >
                <Plus className="h-4 w-4 mr-1" />
                Add to Cart
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
