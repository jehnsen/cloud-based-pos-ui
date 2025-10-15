"use client";

import { useState } from "react";
import { useCart } from "@/contexts/cart-context";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Wallet, Smartphone, CreditCard, CheckCircle2 } from "lucide-react";

interface CheckoutDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onComplete: () => void;
}

export function CheckoutDialog({
  open,
  onOpenChange,
  onComplete,
}: CheckoutDialogProps) {
  const { cart, getCartTotal } = useCart();
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [cashReceived, setCashReceived] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const total = getCartTotal();
  const change = parseFloat(cashReceived || "0") - total;

  const handleCheckout = () => {
    // In a real app, this would process the payment
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      setCashReceived("");
      setCustomerName("");
      onComplete();
    }, 2000);
  };

  if (showSuccess) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md">
          <div className="flex flex-col items-center justify-center py-8 space-y-4">
            <CheckCircle2 className="h-16 w-16 text-green-500" />
            <h2 className="text-2xl font-bold">Payment Successful!</h2>
            <p className="text-muted-foreground">Thank you for your purchase</p>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Checkout</DialogTitle>
          <DialogDescription>
            Complete your transaction
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label htmlFor="customerName">Customer Name (Optional)</Label>
            <Input
              id="customerName"
              placeholder="Enter customer name"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
            />
          </div>

          <Separator />

          <div className="space-y-2">
            <h3 className="font-semibold">Order Summary</h3>
            <div className="max-h-40 overflow-y-auto space-y-2 rounded-md border p-3">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span>
                    {item.name} x{item.quantity}
                  </span>
                  <span className="font-medium">
                    ₱{(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          <div className="space-y-2">
            <div className="flex justify-between text-lg font-bold">
              <span>Total Amount:</span>
              <span className="text-primary">₱{total.toFixed(2)}</span>
            </div>
          </div>

          <Separator />

          <div>
            <Label className="mb-2 block">Payment Method</Label>
            <Tabs value={paymentMethod} onValueChange={setPaymentMethod}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="cash">
                  <Wallet className="h-4 w-4 mr-1" />
                  Cash
                </TabsTrigger>
                <TabsTrigger value="gcash">
                  <Smartphone className="h-4 w-4 mr-1" />
                  GCash
                </TabsTrigger>
                <TabsTrigger value="card">
                  <CreditCard className="h-4 w-4 mr-1" />
                  Card
                </TabsTrigger>
              </TabsList>

              <TabsContent value="cash" className="space-y-3">
                <div>
                  <Label htmlFor="cashReceived">Cash Received</Label>
                  <Input
                    id="cashReceived"
                    type="number"
                    placeholder="0.00"
                    value={cashReceived}
                    onChange={(e) => setCashReceived(e.target.value)}
                  />
                </div>
                {cashReceived && (
                  <div className="p-3 bg-muted rounded-md">
                    <div className="flex justify-between">
                      <span className="font-medium">Change:</span>
                      <span
                        className={`text-lg font-bold ${
                          change >= 0 ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        ₱{Math.max(0, change).toFixed(2)}
                      </span>
                    </div>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="gcash" className="space-y-3">
                <div className="p-4 border rounded-md text-center space-y-2">
                  <Smartphone className="h-12 w-12 mx-auto text-blue-500" />
                  <p className="text-sm text-muted-foreground">
                    Scan QR code or enter GCash number
                  </p>
                  <Input placeholder="09XX XXX XXXX" />
                </div>
              </TabsContent>

              <TabsContent value="card" className="space-y-3">
                <div className="p-4 border rounded-md text-center space-y-2">
                  <CreditCard className="h-12 w-12 mx-auto text-purple-500" />
                  <p className="text-sm text-muted-foreground">
                    Insert or tap card
                  </p>
                  <Input placeholder="Card Number" />
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleCheckout}
            disabled={
              paymentMethod === "cash" && parseFloat(cashReceived || "0") < total
            }
          >
            Complete Payment
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
