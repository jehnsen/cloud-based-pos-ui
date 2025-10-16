"use client";

import { useCart } from "@/contexts/cart-context";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Minus, Plus, Trash2, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { CheckoutDialog } from "./checkout-dialog";

export function CartSidebar() {
  const { cart, updateQuantity, removeFromCart, getCartTotal, clearCart } = useCart();
  const [showCheckout, setShowCheckout] = useState(false);

  return (
    <>
      <Card className="h-full flex flex-col sticky top-4 border-2 border-orange-100 shadow-lg">
        <CardHeader className="pb-4 bg-gradient-to-r from-orange-50 to-yellow-50 border-b-2 border-orange-100">
          <CardTitle className="flex items-center gap-2 text-xl">
            <div className="h-8 w-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <ShoppingCart className="h-5 w-5 text-white" />
            </div>
            <span className="bg-gradient-primary bg-clip-text text-transparent font-bold">
              Cart ({cart.length})
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-1 overflow-auto space-y-3">
          {cart.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <div className="h-20 w-20 mx-auto mb-4 bg-gradient-to-br from-orange-200 to-pink-200 rounded-full flex items-center justify-center">
                <ShoppingCart className="h-10 w-10 text-white" />
              </div>
              <p className="font-medium">Cart is empty</p>
              <p className="text-xs mt-1">Add products to get started</p>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="flex gap-3 pb-3 border-b-2 border-orange-100 hover:bg-orange-50/50 p-2 rounded-lg transition-colors">
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-sm line-clamp-2 text-gray-800">{item.name}</h4>
                  <p className="text-xs text-gray-500 font-medium">{item.unit}</p>
                  <p className="text-sm font-bold bg-gradient-primary bg-clip-text text-transparent mt-1">
                    ₱{item.price.toFixed(2)}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 text-red-500 hover:text-red-600 hover:bg-red-50"
                    onClick={() => removeFromCart(item.id)}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-7 w-7 border-orange-300 hover:bg-orange-50"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="w-8 text-center text-sm font-bold text-orange-600">
                      {item.quantity}
                    </span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-7 w-7 border-orange-300 hover:bg-orange-50"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                  <p className="text-sm font-black text-orange-600">
                    ₱{(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            ))
          )}
        </CardContent>
        <Separator className="bg-orange-200" />
        <CardFooter className="flex-col gap-3 pt-4 bg-gradient-to-r from-orange-50 to-yellow-50">
          <div className="w-full space-y-2">
            <div className="flex justify-between text-sm">
              <span className="font-medium text-gray-600">Subtotal:</span>
              <span className="font-bold text-gray-800">₱{getCartTotal().toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-xl font-black p-3 bg-gradient-to-r from-orange-100 to-yellow-100 rounded-lg border-2 border-orange-200">
              <span className="text-gray-800">Total:</span>
              <span className="bg-gradient-primary bg-clip-text text-transparent">₱{getCartTotal().toFixed(2)}</span>
            </div>
          </div>
          <div className="w-full space-y-2">
            <Button
              className="w-full bg-gradient-primary hover:opacity-90 text-white font-bold shadow-lg hover:shadow-xl transition-all"
              size="lg"
              disabled={cart.length === 0}
              onClick={() => setShowCheckout(true)}
            >
              Checkout Now
            </Button>
            <Button
              variant="outline"
              className="w-full border-2 border-orange-300 hover:bg-orange-50 text-orange-600 font-semibold"
              disabled={cart.length === 0}
              onClick={clearCart}
            >
              Clear Cart
            </Button>
          </div>
        </CardFooter>
      </Card>
      <CheckoutDialog
        open={showCheckout}
        onOpenChange={setShowCheckout}
        onComplete={() => {
          clearCart();
          setShowCheckout(false);
        }}
      />
    </>
  );
}
