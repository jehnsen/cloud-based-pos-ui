"use client";

import { useCustomer } from "@/contexts/customer-context";
import { useTenant } from "@/contexts/tenant-context";
import { useInventory } from "@/contexts/inventory-context";
import { sampleTransactions } from "@/lib/data";
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
import {
  Users,
  TrendingUp,
  Award,
  CreditCard,
  ShoppingCart,
  DollarSign,
  BarChart3,
  AlertTriangle,
} from "lucide-react";

export default function IntelligencePage() {
  const { customers, creditAccounts, loyaltyTransactions } = useCustomer();
  const { currentTenant } = useTenant();
  const { products } = useInventory();

  // Filter data by current tenant
  const tenantCustomers = customers.filter((c) => c.tenantId === currentTenant?.id);
  const tenantCreditAccounts = creditAccounts.filter(
    (a) => a.tenantId === currentTenant?.id
  );

  // Customer Intelligence
  const totalCustomers = tenantCustomers.length;
  const activeCustomers = tenantCustomers.filter((c) => c.isActive).length;
  const avgCustomerValue =
    tenantCustomers.reduce((sum, c) => sum + c.totalSpent, 0) / totalCustomers || 0;
  const totalLoyaltyPoints = tenantCustomers.reduce(
    (sum, c) => sum + c.loyaltyPoints,
    0
  );

  // Credit Intelligence
  const totalCreditOutstanding = tenantCreditAccounts.reduce(
    (sum, a) => sum + a.currentBalance,
    0
  );
  const activeCreditAccounts = tenantCreditAccounts.filter(
    (a) => a.status === "active"
  ).length;
  const overdueCreditAccounts = tenantCreditAccounts.filter(
    (a) => a.status === "overdue"
  ).length;

  // Top Customers by Spending
  const topCustomers = [...tenantCustomers]
    .sort((a, b) => b.totalSpent - a.totalSpent)
    .slice(0, 10);

  // Customer Segmentation
  const segmentation = {
    bronze: tenantCustomers.filter((c) => c.tier === "bronze").length,
    silver: tenantCustomers.filter((c) => c.tier === "silver").length,
    gold: tenantCustomers.filter((c) => c.tier === "gold").length,
    platinum: tenantCustomers.filter((c) => c.tier === "platinum").length,
  };

  // Credit Risk Analysis
  const highRiskCustomers = tenantCustomers.filter(
    (c) => c.currentCredit > c.creditLimit * 0.8
  );

  // Loyalty Insights
  const pointsIssued = loyaltyTransactions
    .filter((t) => t.type === "earn" && t.tenantId === currentTenant?.id)
    .reduce((sum, t) => sum + t.points, 0);

  const pointsRedeemed = loyaltyTransactions
    .filter((t) => t.type === "redeem" && t.tenantId === currentTenant?.id)
    .reduce((sum, t) => sum + Math.abs(t.points), 0);

  const redemptionRate = pointsIssued > 0 ? (pointsRedeemed / pointsIssued) * 100 : 0;

  // Recent High-Value Transactions
  const recentHighValue = sampleTransactions
    .filter((t) => t.total > 1000)
    .slice(0, 5);

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Business Intelligence</h1>
        <p className="text-muted-foreground">
          Data-driven insights and analytics
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Customers
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCustomers}</div>
            <p className="text-xs text-muted-foreground">
              {activeCustomers} active
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Avg Customer Value
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₱{avgCustomerValue.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Per customer</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Credit Outstanding
            </CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ₱{totalCreditOutstanding.toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground">
              {activeCreditAccounts} active accounts
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Loyalty Points Pool
            </CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalLoyaltyPoints}</div>
            <p className="text-xs text-muted-foreground">Total points</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Customer Segmentation */}
        <Card>
          <CardHeader>
            <CardTitle>Customer Segmentation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-purple-500"></div>
                  <span className="text-sm">Platinum</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium">{segmentation.platinum}</span>
                  <span className="text-xs text-muted-foreground">
                    ({((segmentation.platinum / totalCustomers) * 100).toFixed(1)}
                    %)
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                  <span className="text-sm">Gold</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium">{segmentation.gold}</span>
                  <span className="text-xs text-muted-foreground">
                    ({((segmentation.gold / totalCustomers) * 100).toFixed(1)}%)
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-gray-400"></div>
                  <span className="text-sm">Silver</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium">{segmentation.silver}</span>
                  <span className="text-xs text-muted-foreground">
                    ({((segmentation.silver / totalCustomers) * 100).toFixed(1)}%)
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-orange-500"></div>
                  <span className="text-sm">Bronze</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium">{segmentation.bronze}</span>
                  <span className="text-xs text-muted-foreground">
                    ({((segmentation.bronze / totalCustomers) * 100).toFixed(1)}%)
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Loyalty Program Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Loyalty Program Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-muted-foreground">Points Issued</span>
                  <span className="font-medium">{pointsIssued}</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary" style={{ width: "100%" }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-muted-foreground">Points Redeemed</span>
                  <span className="font-medium">{pointsRedeemed}</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-green-500"
                    style={{ width: `${redemptionRate}%` }}
                  ></div>
                </div>
              </div>
              <div className="pt-2 border-t">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">
                    Redemption Rate
                  </span>
                  <span className="font-bold">{redemptionRate.toFixed(1)}%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Customers */}
      <Card>
        <CardHeader>
          <CardTitle>Top Customers by Lifetime Value</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Rank</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Tier</TableHead>
                <TableHead>Purchases</TableHead>
                <TableHead>Total Spent</TableHead>
                <TableHead>Points</TableHead>
                <TableHead>Credit</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {topCustomers.map((customer, index) => (
                <TableRow key={customer.id}>
                  <TableCell>
                    <Badge variant={index < 3 ? "default" : "secondary"}>
                      #{index + 1}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-medium">
                    {customer.firstName} {customer.lastName}
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={
                        customer.tier === "platinum"
                          ? "bg-purple-100 text-purple-800"
                          : customer.tier === "gold"
                          ? "bg-yellow-100 text-yellow-800"
                          : customer.tier === "silver"
                          ? "bg-gray-100 text-gray-800"
                          : "bg-orange-100 text-orange-800"
                      }
                    >
                      {customer.tier}
                    </Badge>
                  </TableCell>
                  <TableCell>{customer.totalPurchases}</TableCell>
                  <TableCell>₱{customer.totalSpent.toFixed(2)}</TableCell>
                  <TableCell>{customer.loyaltyPoints}</TableCell>
                  <TableCell>
                    {customer.currentCredit > 0 ? (
                      <Badge variant="destructive">
                        ₱{customer.currentCredit.toFixed(2)}
                      </Badge>
                    ) : (
                      <span className="text-muted-foreground">None</span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Risk Alerts */}
      {(highRiskCustomers.length > 0 || overdueCreditAccounts > 0) && (
        <Card className="border-orange-200 bg-orange-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-orange-700">
              <AlertTriangle className="h-5 w-5" />
              Risk Alerts
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {overdueCreditAccounts > 0 && (
              <div className="bg-white p-3 rounded-md border border-orange-200">
                <p className="font-medium text-sm">
                  {overdueCreditAccounts} Overdue Credit Account
                  {overdueCreditAccounts > 1 ? "s" : ""}
                </p>
                <p className="text-xs text-muted-foreground">
                  Requires immediate attention
                </p>
              </div>
            )}
            {highRiskCustomers.length > 0 && (
              <div className="bg-white p-3 rounded-md border border-orange-200">
                <p className="font-medium text-sm">
                  {highRiskCustomers.length} Customer
                  {highRiskCustomers.length > 1 ? "s" : ""} Near Credit Limit
                </p>
                <p className="text-xs text-muted-foreground">
                  Above 80% of credit limit
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
