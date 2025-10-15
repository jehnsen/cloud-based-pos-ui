"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/auth-context";
import { sampleTransactions } from "@/lib/data";
import { generateXReading, generateZReading, printXReading, printZReading, XReading, ZReading } from "@/lib/reports-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FileText, Printer, Download } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ReportsPage() {
  const { user } = useAuth();
  const [isXDialogOpen, setIsXDialogOpen] = useState(false);
  const [isZDialogOpen, setIsZDialogOpen] = useState(false);
  const [closingCash, setClosingCash] = useState("");
  const [generatedReports, setGeneratedReports] = useState<(XReading | ZReading)[]>([]);

  const todayTransactions = sampleTransactions.filter(
    (t) => t.date.toDateString() === new Date().toDateString()
  );

  const handleGenerateX = () => {
    const reading = generateXReading(todayTransactions, user?.fullName || "Unknown");
    setGeneratedReports([reading, ...generatedReports]);
    printXReading(reading);
    setIsXDialogOpen(false);
  };

  const handleGenerateZ = () => {
    if (!closingCash) return;
    const reading = generateZReading(
      todayTransactions,
      parseFloat(closingCash),
      user?.fullName || "Unknown"
    );
    setGeneratedReports([reading, ...generatedReports]);
    printZReading(reading);
    setIsZDialogOpen(false);
    setClosingCash("");
  };

  const todaySales = todayTransactions.reduce((sum, t) => sum + t.total, 0);
  const cashSales = todayTransactions
    .filter((t) => t.paymentMethod === "Cash")
    .reduce((sum, t) => sum + t.total, 0);
  const digitalSales = todayTransactions
    .filter((t) => t.paymentMethod !== "Cash")
    .reduce((sum, t) => sum + t.total, 0);

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Reports</h1>
        <p className="text-muted-foreground">
          Generate and view sales reports
        </p>
      </div>

      <Tabs defaultValue="summary" className="space-y-4">
        <TabsList>
          <TabsTrigger value="summary">Summary</TabsTrigger>
          <TabsTrigger value="history">Report History</TabsTrigger>
        </TabsList>

        <TabsContent value="summary" className="space-y-4">
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">
                  Today's Sales
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  ₱{todaySales.toFixed(2)}
                </div>
                <p className="text-xs text-muted-foreground">
                  {todayTransactions.length} transactions
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">
                  Cash Sales
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  ₱{cashSales.toFixed(2)}
                </div>
                <p className="text-xs text-muted-foreground">
                  Expected in drawer
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">
                  Digital Sales
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  ₱{digitalSales.toFixed(2)}
                </div>
                <p className="text-xs text-muted-foreground">
                  GCash & Card
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Report Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>X-Reading (Mid-Day Report)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  Generate a sales report without resetting counters. Use this
                  for mid-shift or interim reports.
                </p>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>✓ Sales summary</li>
                  <li>✓ Transaction breakdown</li>
                  <li>✓ Payment method totals</li>
                </ul>
                <Button
                  onClick={() => setIsXDialogOpen(true)}
                  className="w-full"
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Generate X-Reading
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Z-Reading (End of Day)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  Generate end-of-day report with cash reconciliation. This
                  closes the day's transactions.
                </p>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>✓ All X-Reading features</li>
                  <li>✓ Cash reconciliation</li>
                  <li>✓ Variance calculation</li>
                </ul>
                <Button
                  onClick={() => setIsZDialogOpen(true)}
                  className="w-full"
                  variant="default"
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Generate Z-Reading
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Today's Transactions */}
          <Card>
            <CardHeader>
              <CardTitle>Today's Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {todayTransactions.length > 0 ? (
                  todayTransactions.map((transaction) => (
                    <div
                      key={transaction.id}
                      className="flex items-center justify-between p-3 border rounded-md"
                    >
                      <div>
                        <p className="font-medium text-sm">
                          {transaction.id}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {transaction.date.toLocaleTimeString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">
                          ₱{transaction.total.toFixed(2)}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {transaction.paymentMethod}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-muted-foreground py-8">
                    No transactions today
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>Generated Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {generatedReports.length > 0 ? (
                  generatedReports.map((report) => (
                    <div
                      key={report.id}
                      className="flex items-center justify-between p-4 border rounded-md"
                    >
                      <div>
                        <p className="font-medium">{report.id}</p>
                        <p className="text-sm text-muted-foreground">
                          {report.date.toLocaleString()}
                        </p>
                        <p className="text-sm">
                          {report.totalTransactions} transactions • ₱
                          {report.totalSales.toFixed(2)}
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          if (report.id.startsWith("X-")) {
                            printXReading(report as XReading);
                          } else {
                            printZReading(report as ZReading);
                          }
                        }}
                      >
                        <Printer className="h-4 w-4 mr-2" />
                        Reprint
                      </Button>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-muted-foreground py-8">
                    No reports generated yet
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* X-Reading Dialog */}
      <Dialog open={isXDialogOpen} onOpenChange={setIsXDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Generate X-Reading</DialogTitle>
            <DialogDescription>
              This will generate a mid-day sales report
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="p-4 bg-muted rounded-md space-y-2">
              <div className="flex justify-between">
                <span className="text-sm">Transactions:</span>
                <span className="font-medium">{todayTransactions.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Total Sales:</span>
                <span className="font-medium">₱{todaySales.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Cash:</span>
                <span className="font-medium">₱{cashSales.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Digital:</span>
                <span className="font-medium">₱{digitalSales.toFixed(2)}</span>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsXDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleGenerateX}>
              <Printer className="h-4 w-4 mr-2" />
              Generate & Print
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Z-Reading Dialog */}
      <Dialog open={isZDialogOpen} onOpenChange={setIsZDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Generate Z-Reading</DialogTitle>
            <DialogDescription>
              End-of-day report with cash reconciliation
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="p-4 bg-muted rounded-md space-y-2">
              <div className="flex justify-between">
                <span className="text-sm">Transactions:</span>
                <span className="font-medium">{todayTransactions.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Total Sales:</span>
                <span className="font-medium">₱{todaySales.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Expected Cash:</span>
                <span className="font-medium">₱{cashSales.toFixed(2)}</span>
              </div>
            </div>
            <div>
              <Label htmlFor="closingCash">Actual Cash in Drawer</Label>
              <Input
                id="closingCash"
                type="number"
                step="0.01"
                value={closingCash}
                onChange={(e) => setClosingCash(e.target.value)}
                placeholder="Enter actual cash amount"
              />
            </div>
            {closingCash && (
              <div className="p-4 bg-muted rounded-md">
                <div className="flex justify-between">
                  <span className="font-medium">Variance:</span>
                  <span
                    className={`font-bold ${
                      parseFloat(closingCash) - cashSales >= 0
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    ₱{(parseFloat(closingCash) - cashSales).toFixed(2)}
                    {parseFloat(closingCash) - cashSales >= 0
                      ? " (Over)"
                      : " (Short)"}
                  </span>
                </div>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsZDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleGenerateZ} disabled={!closingCash}>
              <Printer className="h-4 w-4 mr-2" />
              Generate & Print
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
