export type UserRole = "admin" | "manager" | "cashier";

export interface Permission {
  id: string;
  name: string;
  description: string;
}

export interface User {
  id: string;
  username: string;
  password: string; // In production, this should be hashed
  fullName: string;
  email: string;
  role: UserRole;
  isActive: boolean;
  createdAt: Date;
  lastLogin?: Date;
}

export const permissions: Record<UserRole, Permission[]> = {
  admin: [
    { id: "view_dashboard", name: "View Dashboard", description: "Access admin dashboard" },
    { id: "manage_products", name: "Manage Products", description: "Create, edit, delete products" },
    { id: "manage_inventory", name: "Manage Inventory", description: "Update stock levels" },
    { id: "view_reports", name: "View Reports", description: "Access all reports" },
    { id: "generate_reports", name: "Generate Reports", description: "Generate X and Z readings" },
    { id: "manage_users", name: "Manage Users", description: "Create, edit, delete users" },
    { id: "process_sales", name: "Process Sales", description: "Use POS system" },
    { id: "void_transactions", name: "Void Transactions", description: "Cancel transactions" },
    { id: "apply_discounts", name: "Apply Discounts", description: "Give discounts" },
  ],
  manager: [
    { id: "view_dashboard", name: "View Dashboard", description: "Access admin dashboard" },
    { id: "manage_products", name: "Manage Products", description: "Create, edit products" },
    { id: "manage_inventory", name: "Manage Inventory", description: "Update stock levels" },
    { id: "view_reports", name: "View Reports", description: "Access all reports" },
    { id: "generate_reports", name: "Generate Reports", description: "Generate X and Z readings" },
    { id: "process_sales", name: "Process Sales", description: "Use POS system" },
    { id: "apply_discounts", name: "Apply Discounts", description: "Give discounts" },
  ],
  cashier: [
    { id: "process_sales", name: "Process Sales", description: "Use POS system" },
    { id: "view_reports", name: "View Reports", description: "View basic reports" },
  ],
};

export const sampleUsers: User[] = [
  {
    id: "1",
    username: "admin",
    password: "admin123", // In production, use proper hashing
    fullName: "Admin User",
    email: "admin@cloudpos.com",
    role: "admin",
    isActive: true,
    createdAt: new Date("2025-01-01"),
    lastLogin: new Date(),
  },
  {
    id: "2",
    username: "manager",
    password: "manager123",
    fullName: "Store Manager",
    email: "manager@cloudpos.com",
    role: "manager",
    isActive: true,
    createdAt: new Date("2025-01-01"),
    lastLogin: new Date(),
  },
  {
    id: "3",
    username: "cashier1",
    password: "cashier123",
    fullName: "Maria Santos",
    email: "maria@cloudpos.com",
    role: "cashier",
    isActive: true,
    createdAt: new Date("2025-01-01"),
    lastLogin: new Date(),
  },
  {
    id: "4",
    username: "cashier2",
    password: "cashier123",
    fullName: "Juan Dela Cruz",
    email: "juan@cloudpos.com",
    role: "cashier",
    isActive: true,
    createdAt: new Date("2025-01-01"),
  },
];

export function hasPermission(role: UserRole, permissionId: string): boolean {
  return permissions[role].some((p) => p.id === permissionId);
}

export function getRoleDisplayName(role: UserRole): string {
  const names: Record<UserRole, string> = {
    admin: "Administrator",
    manager: "Manager",
    cashier: "Cashier",
  };
  return names[role];
}
