"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { sampleTransactions, products } from "@/lib/data";
import {
  DollarSign,
  ShoppingCart,
  Package,
  TrendingUp,
  Users,
  AlertTriangle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function AdminDashboard() {
  const totalSales = sampleTransactions.reduce((sum, t) => sum + t.total, 0);
  const totalTransactions = sampleTransactions.length;
  const lowStockProducts = products.filter((p) => p.stock < 20);
  const outOfStockProducts = products.filter((p) => p.stock === 0);

  const todayTransactions = sampleTransactions.filter(
    (t) => t.date.toDateString() === new Date().toDateString()
  );
  const todaySales = todayTransactions.reduce((sum, t) => sum + t.total, 0);

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Welcome to Cloud POS Admin Panel</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Today's Sales
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
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
              Total Revenue
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
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
            <CardTitle className="text-sm font-medium">Products</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{products.length}</div>
            <p className="text-xs text-muted-foreground">
              Active products
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
              Total transactions
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-orange-500" />
              Low Stock Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            {lowStockProducts.length > 0 ? (
              <div className="space-y-2">
                {lowStockProducts.slice(0, 5).map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center justify-between p-2 bg-orange-50 rounded-md"
                  >
                    <div>
                      <p className="font-medium text-sm">{product.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {product.category}
                      </p>
                    </div>
                    <Badge variant="destructive">{product.stock} left</Badge>
                  </div>
                ))}
                {lowStockProducts.length > 5 && (
                  <p className="text-sm text-muted-foreground text-center pt-2">
                    +{lowStockProducts.length - 5} more items
                  </p>
                )}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                All products have sufficient stock
              </p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {sampleTransactions.slice(0, 5).map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-2 border rounded-md"
                >
                  <div>
                    <p className="font-medium text-sm">{transaction.id}</p>
                    <p className="text-xs text-muted-foreground">
                      {transaction.date.toLocaleString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-sm">
                      ₱{transaction.total.toFixed(2)}
                    </p>
                    <Badge variant="outline" className="text-xs">
                      {transaction.paymentMethod}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
