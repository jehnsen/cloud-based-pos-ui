"use client";

import { useState } from "react";
import { useInventory } from "@/contexts/inventory-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Plus, Minus, Package, AlertTriangle } from "lucide-react";
import { Product } from "@/lib/data";
import { Pagination } from "@/components/ui/pagination";

const ITEMS_PER_PAGE = 10;

export default function InventoryPage() {
  const { products, updateStock } = useInventory();
  const [isStockDialogOpen, setIsStockDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [adjustmentType, setAdjustmentType] = useState<"add" | "remove">("add");
  const [quantity, setQuantity] = useState("");
  const [reason, setReason] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const lowStockProducts = products.filter((p) => p.stock < 20);
  const outOfStockProducts = products.filter((p) => p.stock === 0);
  const totalValue = products.reduce((sum, p) => sum + p.price * p.stock, 0);

  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);
  const paginatedProducts = products.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const openStockDialog = (product: Product, type: "add" | "remove") => {
    setSelectedProduct(product);
    setAdjustmentType(type);
    setQuantity("");
    setReason("");
    setIsStockDialogOpen(true);
  };

  const handleStockAdjustment = () => {
    if (selectedProduct && quantity) {
      const adj = parseInt(quantity);
      const finalQty = adjustmentType === "add" ? adj : -adj;
      updateStock(selectedProduct.id, finalQty);
      setIsStockDialogOpen(false);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Inventory Management</h1>
        <p className="text-muted-foreground">
          Monitor and manage your stock levels
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Products</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{products.length}</div>
            <p className="text-xs text-muted-foreground">Active SKUs</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Low Stock Items</CardTitle>
            <AlertTriangle className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{lowStockProducts.length}</div>
            <p className="text-xs text-muted-foreground">
              Needs reordering
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Inventory Value</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₱{totalValue.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Total stock value</p>
          </CardContent>
        </Card>
      </div>

      {/* Low Stock Alerts */}
      {lowStockProducts.length > 0 && (
        <Card className="border-orange-200 bg-orange-50">
          <CardHeader>
            <CardTitle className="text-orange-700 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Low Stock Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {lowStockProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white p-3 rounded-md border border-orange-200"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <p className="font-medium text-sm">{product.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {product.category}
                      </p>
                    </div>
                    <Badge variant="destructive">{product.stock}</Badge>
                  </div>
                  <Button
                    size="sm"
                    className="w-full mt-2"
                    onClick={() => openStockDialog(product, "add")}
                  >
                    <Plus className="h-3 w-3 mr-1" />
                    Restock
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Inventory Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Products</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Current Stock</TableHead>
                <TableHead>Stock Value</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>₱{product.price.toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        product.stock === 0
                          ? "destructive"
                          : product.stock < 20
                          ? "outline"
                          : "secondary"
                      }
                    >
                      {product.stock} {product.unit}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    ₱{(product.price * product.stock).toFixed(2)}
                  </TableCell>
                  <TableCell>
                    {product.stock === 0 ? (
                      <Badge variant="destructive">Out of Stock</Badge>
                    ) : product.stock < 20 ? (
                      <Badge variant="outline" className="text-orange-600">
                        Low Stock
                      </Badge>
                    ) : (
                      <Badge variant="secondary">In Stock</Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => openStockDialog(product, "add")}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => openStockDialog(product, "remove")}
                        disabled={product.stock === 0}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {products.length > 0 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              itemsPerPage={ITEMS_PER_PAGE}
              totalItems={products.length}
            />
          )}
        </CardContent>
      </Card>

      {/* Stock Adjustment Dialog */}
      <Dialog open={isStockDialogOpen} onOpenChange={setIsStockDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {adjustmentType === "add" ? "Add Stock" : "Remove Stock"}
            </DialogTitle>
            <DialogDescription>
              {selectedProduct?.name} - Current stock: {selectedProduct?.stock}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="quantity">Quantity</Label>
              <Input
                id="quantity"
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="Enter quantity"
              />
            </div>
            <div>
              <Label htmlFor="reason">Reason (Optional)</Label>
              <Input
                id="reason"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="e.g., Delivery, Damaged, Sale"
              />
            </div>
            {quantity && selectedProduct && (
              <div className="p-3 bg-muted rounded-md">
                <p className="text-sm font-medium">
                  New stock level:{" "}
                  {adjustmentType === "add"
                    ? selectedProduct.stock + parseInt(quantity)
                    : selectedProduct.stock - parseInt(quantity)}
                </p>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsStockDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleStockAdjustment} disabled={!quantity}>
              {adjustmentType === "add" ? "Add Stock" : "Remove Stock"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
