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
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-green-50">
      <Header />
      <main className="container mx-auto px-4 py-6">
        <div className="space-y-6">
          <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-orange-100">
            <h1 className="text-4xl font-black bg-gradient-primary bg-clip-text text-transparent">
              Sales Dashboard
            </h1>
            <p className="text-gray-600 font-medium mt-1">
              Monitor your sales and transactions
            </p>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="border-2 border-orange-100 shadow-lg hover:shadow-xl transition-shadow bg-gradient-to-br from-white to-orange-50">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-bold text-gray-700">
                  Total Sales
                </CardTitle>
                <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-green-400 to-teal-400 flex items-center justify-center shadow-md">
                  <DollarSign className="h-5 w-5 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-black bg-gradient-primary bg-clip-text text-transparent">
                  ₱{totalSales.toFixed(2)}
                </div>
                <p className="text-xs text-gray-600 font-medium mt-1">
                  All time revenue
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-orange-100 shadow-lg hover:shadow-xl transition-shadow bg-gradient-to-br from-white to-yellow-50">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-bold text-gray-700">
                  Today's Sales
                </CardTitle>
                <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-orange-400 to-pink-400 flex items-center justify-center shadow-md">
                  <TrendingUp className="h-5 w-5 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-black text-orange-600">
                  ₱{todaySales.toFixed(2)}
                </div>
                <p className="text-xs text-gray-600 font-medium mt-1">
                  {todayTransactions.length} transactions today
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-orange-100 shadow-lg hover:shadow-xl transition-shadow bg-gradient-to-br from-white to-pink-50">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-bold text-gray-700">
                  Transactions
                </CardTitle>
                <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-blue-400 to-cyan-400 flex items-center justify-center shadow-md">
                  <ShoppingCart className="h-5 w-5 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-black text-blue-600">
                  {totalTransactions}
                </div>
                <p className="text-xs text-gray-600 font-medium mt-1">
                  Avg: ₱{averageTransaction.toFixed(2)}
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-orange-100 shadow-lg hover:shadow-xl transition-shadow bg-gradient-to-br from-white to-green-50">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-bold text-gray-700">
                  Items Sold
                </CardTitle>
                <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center shadow-md">
                  <Package className="h-5 w-5 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-black text-purple-600">
                  {totalItems}
                </div>
                <p className="text-xs text-gray-600 font-medium mt-1">
                  Total items sold
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Transactions Table */}
          <Card className="border-2 border-orange-100 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-orange-50 to-yellow-50 border-b-2 border-orange-100">
              <CardTitle className="text-2xl font-black bg-gradient-primary bg-clip-text text-transparent">
                Recent Transactions
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <Tabs defaultValue="all" className="w-full">
                <TabsList className="grid w-full grid-cols-4 bg-gradient-to-r from-orange-100 to-yellow-100 p-1">
                  <TabsTrigger
                    value="all"
                    className="data-[state=active]:bg-gradient-primary data-[state=active]:text-white font-semibold"
                  >
                    All
                  </TabsTrigger>
                  <TabsTrigger
                    value="today"
                    className="data-[state=active]:bg-gradient-primary data-[state=active]:text-white font-semibold"
                  >
                    Today
                  </TabsTrigger>
                  <TabsTrigger
                    value="cash"
                    className="data-[state=active]:bg-gradient-primary data-[state=active]:text-white font-semibold"
                  >
                    Cash
                  </TabsTrigger>
                  <TabsTrigger
                    value="digital"
                    className="data-[state=active]:bg-gradient-primary data-[state=active]:text-white font-semibold"
                  >
                    Digital
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="space-y-4 mt-4">
                  <div className="space-y-3">
                    {sampleTransactions.map((transaction) => (
                      <div
                        key={transaction.id}
                        className="border-2 border-orange-100 rounded-xl p-4 hover:shadow-lg hover:border-orange-300 transition-all bg-gradient-to-r from-white to-orange-50/30"
                      >
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                          <div className="space-y-2 flex-1">
                            <div className="flex items-center gap-2 flex-wrap">
                              <Badge className="bg-gradient-primary text-white font-bold shadow-sm">
                                {transaction.id}
                              </Badge>
                              <div className="flex items-center gap-1 text-sm text-gray-600 font-medium">
                                <Calendar className="h-4 w-4 text-orange-500" />
                                {transaction.date.toLocaleString()}
                              </div>
                            </div>

                            {transaction.customerName && (
                              <div className="flex items-center gap-1 text-sm font-semibold text-gray-700">
                                <User className="h-4 w-4 text-orange-500" />
                                {transaction.customerName}
                              </div>
                            )}

                            <div className="flex items-center gap-1 text-sm font-medium text-gray-600">
                              <CreditCard className="h-4 w-4 text-orange-500" />
                              {transaction.paymentMethod}
                            </div>

                            <div className="text-sm text-gray-600 font-medium">
                              {transaction.items.length} items:{" "}
                              {transaction.items
                                .map((item) => `${item.name} (${item.quantity})`)
                                .join(", ")}
                            </div>
                          </div>

                          <div className="text-right">
                            <div className="text-3xl font-black bg-gradient-primary bg-clip-text text-transparent">
                              ₱{transaction.total.toFixed(2)}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="today" className="space-y-4 mt-4">
                  {todayTransactions.length > 0 ? (
                    <div className="space-y-3">
                      {todayTransactions.map((transaction) => (
                        <div
                          key={transaction.id}
                          className="border-2 border-orange-100 rounded-xl p-4 hover:shadow-lg hover:border-orange-300 transition-all bg-gradient-to-r from-white to-orange-50/30"
                        >
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                            <div className="space-y-2 flex-1">
                              <div className="flex items-center gap-2 flex-wrap">
                                <Badge className="bg-gradient-primary text-white font-bold shadow-sm">
                                  {transaction.id}
                                </Badge>
                                <div className="flex items-center gap-1 text-sm text-gray-600 font-medium">
                                  <Calendar className="h-4 w-4 text-orange-500" />
                                  {transaction.date.toLocaleString()}
                                </div>
                              </div>

                              <div className="text-sm text-gray-600 font-medium">
                                {transaction.items.length} items:{" "}
                                {transaction.items
                                  .map((item) => `${item.name} (${item.quantity})`)
                                  .join(", ")}
                              </div>
                            </div>

                            <div className="text-right">
                              <div className="text-3xl font-black bg-gradient-primary bg-clip-text text-transparent">
                                ₱{transaction.total.toFixed(2)}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <div className="h-20 w-20 mx-auto mb-4 bg-gradient-to-br from-orange-200 to-pink-200 rounded-full flex items-center justify-center">
                        <ShoppingCart className="h-10 w-10 text-white" />
                      </div>
                      <p className="text-gray-500 font-medium">No transactions today</p>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="cash" className="mt-4">
                  <div className="space-y-3">
                    {sampleTransactions
                      .filter((t) => t.paymentMethod === "Cash")
                      .map((transaction) => (
                        <div
                          key={transaction.id}
                          className="border-2 border-green-100 rounded-xl p-4 hover:shadow-lg hover:border-green-300 transition-all bg-gradient-to-r from-white to-green-50/30"
                        >
                          <div className="flex items-center justify-between">
                            <div className="space-y-2">
                              <Badge className="bg-green-500 text-white font-bold shadow-sm">
                                {transaction.id}
                              </Badge>
                              <p className="text-sm text-gray-600 font-medium">
                                {transaction.date.toLocaleString()}
                              </p>
                            </div>
                            <div className="text-3xl font-black text-green-600">
                              ₱{transaction.total.toFixed(2)}
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </TabsContent>

                <TabsContent value="digital" className="mt-4">
                  <div className="space-y-3">
                    {sampleTransactions
                      .filter((t) => t.paymentMethod !== "Cash")
                      .map((transaction) => (
                        <div
                          key={transaction.id}
                          className="border-2 border-blue-100 rounded-xl p-4 hover:shadow-lg hover:border-blue-300 transition-all bg-gradient-to-r from-white to-blue-50/30"
                        >
                          <div className="flex items-center justify-between">
                            <div className="space-y-2">
                              <Badge className="bg-blue-500 text-white font-bold shadow-sm">
                                {transaction.id}
                              </Badge>
                              <p className="text-sm text-gray-600 font-medium">
                                {transaction.date.toLocaleString()} •{" "}
                                <span className="text-blue-600 font-bold">{transaction.paymentMethod}</span>
                              </p>
                            </div>
                            <div className="text-3xl font-black text-blue-600">
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
