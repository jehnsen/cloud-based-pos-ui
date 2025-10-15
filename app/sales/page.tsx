"use client";

import { Header } from "@/components/pos/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CartProvider } from "@/contexts/cart-context";
import { sampleTransactions } from "@/lib/data";
import {
  DollarSign,
  ShoppingCart,
  TrendingUp,
  Package,
  Calendar,
  User,
  CreditCard,
} from "lucide-react";

function SalesContent() {
  const totalSales = sampleTransactions.reduce((sum, t) => sum + t.total, 0);
  const totalTransactions = sampleTransactions.length;
  const averageTransaction = totalSales / totalTransactions;
  const totalItems = sampleTransactions.reduce(
    (sum, t) => sum + t.items.reduce((itemSum, item) => itemSum + item.quantity, 0),
    0
  );

  const todayTransactions = sampleTransactions.filter(
    (t) => t.date.toDateString() === new Date().toDateString()
  );
  const todaySales = todayTransactions.reduce((sum, t) => sum + t.total, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-6">
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">Sales Dashboard</h1>
            <p className="text-muted-foreground">
              Monitor your sales and transactions
            </p>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Sales
                </CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₱{totalSales.toFixed(2)}</div>
                <p className="text-xs text-muted-foreground">
                  All time revenue
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Today's Sales
                </CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₱{todaySales.toFixed(2)}</div>
                <p className="text-xs text-muted-foreground">
                  {todayTransactions.length} transactions today
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Transactions
                </CardTitle>
                <ShoppingCart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalTransactions}</div>
                <p className="text-xs text-muted-foreground">
                  Avg: ₱{averageTransaction.toFixed(2)}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Items Sold
                </CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalItems}</div>
                <p className="text-xs text-muted-foreground">
                  Total items sold
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Transactions Table */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="all" className="w-full">
                <TabsList>
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="today">Today</TabsTrigger>
                  <TabsTrigger value="cash">Cash</TabsTrigger>
                  <TabsTrigger value="digital">Digital</TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="space-y-4">
                  <div className="space-y-3">
                    {sampleTransactions.map((transaction) => (
                      <div
                        key={transaction.id}
                        className="border rounded-lg p-4 hover:bg-accent transition-colors"
                      >
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                          <div className="space-y-2 flex-1">
                            <div className="flex items-center gap-2 flex-wrap">
                              <Badge variant="outline">{transaction.id}</Badge>
                              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                <Calendar className="h-3 w-3" />
                                {transaction.date.toLocaleString()}
                              </div>
                            </div>

                            {transaction.customerName && (
                              <div className="flex items-center gap-1 text-sm">
                                <User className="h-3 w-3" />
                                {transaction.customerName}
                              </div>
                            )}

                            <div className="flex items-center gap-1 text-sm">
                              <CreditCard className="h-3 w-3" />
                              {transaction.paymentMethod}
                            </div>

                            <div className="text-sm text-muted-foreground">
                              {transaction.items.length} items:{" "}
                              {transaction.items
                                .map((item) => `${item.name} (${item.quantity})`)
                                .join(", ")}
                            </div>
                          </div>

                          <div className="text-right">
                            <div className="text-2xl font-bold text-primary">
                              ₱{transaction.total.toFixed(2)}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="today" className="space-y-4">
                  {todayTransactions.length > 0 ? (
                    <div className="space-y-3">
                      {todayTransactions.map((transaction) => (
                        <div
                          key={transaction.id}
                          className="border rounded-lg p-4 hover:bg-accent transition-colors"
                        >
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                            <div className="space-y-2 flex-1">
                              <div className="flex items-center gap-2 flex-wrap">
                                <Badge variant="outline">{transaction.id}</Badge>
                                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                  <Calendar className="h-3 w-3" />
                                  {transaction.date.toLocaleString()}
                                </div>
                              </div>

                              <div className="text-sm text-muted-foreground">
                                {transaction.items.length} items:{" "}
                                {transaction.items
                                  .map((item) => `${item.name} (${item.quantity})`)
                                  .join(", ")}
                              </div>
                            </div>

                            <div className="text-right">
                              <div className="text-2xl font-bold text-primary">
                                ₱{transaction.total.toFixed(2)}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      No transactions today
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="cash">
                  <div className="space-y-3">
                    {sampleTransactions
                      .filter((t) => t.paymentMethod === "Cash")
                      .map((transaction) => (
                        <div
                          key={transaction.id}
                          className="border rounded-lg p-4 hover:bg-accent transition-colors"
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <Badge variant="outline">{transaction.id}</Badge>
                              <p className="text-sm text-muted-foreground mt-1">
                                {transaction.date.toLocaleString()}
                              </p>
                            </div>
                            <div className="text-2xl font-bold text-primary">
                              ₱{transaction.total.toFixed(2)}
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </TabsContent>

                <TabsContent value="digital">
                  <div className="space-y-3">
                    {sampleTransactions
                      .filter((t) => t.paymentMethod !== "Cash")
                      .map((transaction) => (
                        <div
                          key={transaction.id}
                          className="border rounded-lg p-4 hover:bg-accent transition-colors"
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <Badge variant="outline">{transaction.id}</Badge>
                              <p className="text-sm text-muted-foreground mt-1">
                                {transaction.date.toLocaleString()} •{" "}
                                {transaction.paymentMethod}
                              </p>
                            </div>
                            <div className="text-2xl font-bold text-primary">
                              ₱{transaction.total.toFixed(2)}
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}

export default function SalesPage() {
  return (
    <CartProvider>
      <SalesContent />
    </CartProvider>
  );
}
