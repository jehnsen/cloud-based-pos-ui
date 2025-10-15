"use client";

import { useInventory } from "@/contexts/inventory-context";
import { sampleTransactions, CartItem } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TrendingUp, Package, DollarSign, BarChart3 } from "lucide-react";

export default function AnalyticsPage() {
  const { products } = useInventory();

  // Calculate product sales from transactions
  const productSales = new Map<string, { quantity: number; revenue: number }>();

  sampleTransactions.forEach((transaction) => {
    transaction.items.forEach((item) => {
      const current = productSales.get(item.id) || { quantity: 0, revenue: 0 };
      productSales.set(item.id, {
        quantity: current.quantity + item.quantity,
        revenue: current.revenue + item.price * item.quantity,
      });
    });
  });

  // Get top selling products by quantity
  const topSellingByQuantity = products
    .map((product) => ({
      ...product,
      soldQuantity: productSales.get(product.id)?.quantity || 0,
      revenue: productSales.get(product.id)?.revenue || 0,
    }))
    .filter((p) => p.soldQuantity > 0)
    .sort((a, b) => b.soldQuantity - a.soldQuantity)
    .slice(0, 10);

  // Get top selling products by revenue
  const topSellingByRevenue = products
    .map((product) => ({
      ...product,
      soldQuantity: productSales.get(product.id)?.quantity || 0,
      revenue: productSales.get(product.id)?.revenue || 0,
    }))
    .filter((p) => p.revenue > 0)
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 10);

  // Category performance
  const categoryPerformance = new Map<string, { quantity: number; revenue: number }>();

  sampleTransactions.forEach((transaction) => {
    transaction.items.forEach((item) => {
      const current = categoryPerformance.get(item.category) || {
        quantity: 0,
        revenue: 0,
      };
      categoryPerformance.set(item.category, {
        quantity: current.quantity + item.quantity,
        revenue: current.revenue + item.price * item.quantity,
      });
    });
  });

  const topCategories = Array.from(categoryPerformance.entries())
    .map(([category, data]) => ({ category, ...data }))
    .sort((a, b) => b.revenue - a.revenue);

  const totalRevenue = sampleTransactions.reduce((sum, t) => sum + t.total, 0);
  const totalItemsSold = Array.from(productSales.values()).reduce(
    (sum, p) => sum + p.quantity,
    0
  );

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Analytics</h1>
        <p className="text-muted-foreground">
          Product performance and sales insights
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₱{totalRevenue.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">All transactions</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Items Sold</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalItemsSold}</div>
            <p className="text-xs text-muted-foreground">Total units</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Products Selling
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{productSales.size}</div>
            <p className="text-xs text-muted-foreground">Out of {products.length}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Avg. Item Value
            </CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ₱{(totalRevenue / totalItemsSold).toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground">Per item sold</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Selling by Quantity */}
        <Card>
          <CardHeader>
            <CardTitle>Top Selling Products (By Quantity)</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Rank</TableHead>
                  <TableHead>Product</TableHead>
                  <TableHead>Sold</TableHead>
                  <TableHead>Revenue</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topSellingByQuantity.map((product, index) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <Badge variant={index < 3 ? "default" : "secondary"}>
                        #{index + 1}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium">{product.name}</TableCell>
                    <TableCell>{product.soldQuantity} units</TableCell>
                    <TableCell>₱{product.revenue.toFixed(2)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Top Selling by Revenue */}
        <Card>
          <CardHeader>
            <CardTitle>Top Selling Products (By Revenue)</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Rank</TableHead>
                  <TableHead>Product</TableHead>
                  <TableHead>Sold</TableHead>
                  <TableHead>Revenue</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topSellingByRevenue.map((product, index) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <Badge variant={index < 3 ? "default" : "secondary"}>
                        #{index + 1}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium">{product.name}</TableCell>
                    <TableCell>{product.soldQuantity} units</TableCell>
                    <TableCell>₱{product.revenue.toFixed(2)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Category Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Category Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {topCategories.map((category) => (
              <div
                key={category.category}
                className="flex items-center justify-between p-4 border rounded-md"
              >
                <div className="flex-1">
                  <p className="font-medium">{category.category}</p>
                  <p className="text-sm text-muted-foreground">
                    {category.quantity} items sold
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold">
                    ₱{category.revenue.toFixed(2)}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {((category.revenue / totalRevenue) * 100).toFixed(1)}% of sales
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
