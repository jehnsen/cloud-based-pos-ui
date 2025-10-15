"use client";

import { useCustomer } from "@/contexts/customer-context";
import { useTenant } from "@/contexts/tenant-context";
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
import { Button } from "@/components/ui/button";
import { CreditCard, DollarSign, AlertCircle, CheckCircle } from "lucide-react";

export default function CreditPage() {
  const { creditAccounts, customers, getCreditAccountsByCustomer } = useCustomer();
  const { currentTenant } = useTenant();

  const tenantCreditAccounts = creditAccounts.filter(
    (a) => a.tenantId === currentTenant?.id
  );

  const totalOutstanding = tenantCreditAccounts.reduce(
    (sum, a) => sum + a.currentBalance,
    0
  );
  const activeAccounts = tenantCreditAccounts.filter(
    (a) => a.status === "active"
  ).length;
  const overdueAccounts = tenantCreditAccounts.filter(
    (a) => a.status === "overdue"
  ).length;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-800";
      case "active":
        return "bg-blue-100 text-blue-800";
      case "overdue":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getCustomerName = (customerId: string) => {
    const customer = customers.find((c) => c.id === customerId);
    return customer ? `${customer.firstName} ${customer.lastName}` : "Unknown";
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Credit & Loan Management</h1>
        <p className="text-muted-foreground">
          Track and manage customer credit accounts
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Outstanding
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ₱{totalOutstanding.toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground">
              Across all credit accounts
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Accounts
            </CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeAccounts}</div>
            <p className="text-xs text-muted-foreground">Currently active</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overdue</CardTitle>
            <AlertCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {overdueAccounts}
            </div>
            <p className="text-xs text-muted-foreground">Needs attention</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Credit Accounts</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Principal</TableHead>
                <TableHead>Current Balance</TableHead>
                <TableHead>Interest Rate</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Payment</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tenantCreditAccounts.map((account) => (
                <TableRow key={account.id}>
                  <TableCell className="font-medium">
                    {getCustomerName(account.customerId)}
                  </TableCell>
                  <TableCell>₱{account.principalAmount.toFixed(2)}</TableCell>
                  <TableCell>
                    <span className="font-semibold">
                      ₱{account.currentBalance.toFixed(2)}
                    </span>
                  </TableCell>
                  <TableCell>{account.interestRate}%</TableCell>
                  <TableCell>
                    {new Date(account.dueDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(account.status)}>
                      {account.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {account.lastPaymentDate
                      ? new Date(account.lastPaymentDate).toLocaleDateString()
                      : "No payments"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
