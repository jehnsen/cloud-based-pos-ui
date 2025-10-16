"use client";

import { Store, BarChart3, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useCart } from "@/contexts/cart-context";
import { Badge } from "@/components/ui/badge";

export function Header() {
  const { getCartItemCount } = useCart();
  const itemCount = getCartItemCount();

  return (
    <header className="border-b-2 border-orange-200 bg-gradient-to-r from-orange-500 via-pink-500 to-red-500 sticky top-0 z-40 shadow-lg">
      <div className="container mx-auto px-4 py-3 md:py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 md:gap-3 group">
            <div className="h-10 w-10 md:h-12 md:w-12 bg-white rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
              <Store className="h-6 w-6 md:h-7 md:w-7 text-orange-500" />
            </div>
            <div>
              <h1 className="text-lg md:text-2xl font-bold text-white drop-shadow-md">Cloud POS</h1>
              <p className="text-xs text-white/90 hidden sm:block font-medium">
                Sari-Sari Store System
              </p>
            </div>
          </Link>

          <div className="flex items-center gap-2 md:gap-4">
            <Link href="/sales">
              <Button
                variant="secondary"
                size="sm"
                className="gap-2 bg-white hover:bg-orange-50 text-orange-600 font-semibold shadow-md"
              >
                <BarChart3 className="h-4 w-4" />
                <span className="hidden sm:inline">Sales</span>
              </Button>
            </Link>
            <div className="relative lg:hidden">
              <Button
                variant="secondary"
                size="sm"
                className="gap-2 bg-white hover:bg-orange-50 text-orange-600 shadow-md"
              >
                <ShoppingBag className="h-4 w-4" />
                {itemCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-6 w-6 flex items-center justify-center p-0 text-xs bg-green-500 hover:bg-green-500 shadow-lg">
                    {itemCount}
                  </Badge>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
