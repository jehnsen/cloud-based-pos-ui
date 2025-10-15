# Cloud POS - Admin Panel Guide

## Overview

The Cloud POS Admin Panel is a comprehensive back-office management system with role-based access control (RBAC), inventory management, reporting, and analytics capabilities.

## Table of Contents

1. [Getting Started](#getting-started)
2. [Authentication & Users](#authentication--users)
3. [Dashboard](#dashboard)
4. [Product Management](#product-management)
5. [Inventory Management](#inventory-management)
6. [Reports & Reading](#reports--reading)
7. [Analytics](#analytics)
8. [User Management](#user-management)

---

## Getting Started

### Accessing the Admin Panel

1. Navigate to `/login` in your browser
2. Enter your credentials
3. You'll be redirected to the admin dashboard

### Demo Credentials

**Administrator**
- Username: `admin`
- Password: `admin123`
- Full Access to all features

**Manager**
- Username: `manager`
- Password: `manager123`
- Access to products, inventory, reports, and POS

**Cashier**
- Username: `cashier1`
- Password: `cashier123`
- Access to POS and basic reports only

---

## Authentication & Users

### Role-Based Access Control (RBAC)

The system implements three user roles with distinct permissions:

#### Administrator
**Permissions:**
- ✅ View Dashboard
- ✅ Manage Products (Create, Edit, Delete)
- ✅ Manage Inventory
- ✅ View & Generate Reports
- ✅ Manage Users (Create, Edit, Delete)
- ✅ Process Sales
- ✅ Void Transactions
- ✅ Apply Discounts

#### Manager
**Permissions:**
- ✅ View Dashboard
- ✅ Manage Products (Create, Edit)
- ✅ Manage Inventory
- ✅ View & Generate Reports
- ✅ Process Sales
- ✅ Apply Discounts

#### Cashier
**Permissions:**
- ✅ Process Sales
- ✅ View Basic Reports

### Login Process

1. **Enter Credentials**: Username and password
2. **Authentication**: System validates credentials
3. **Session Creation**: User session is created
4. **Redirect**: Redirected to appropriate dashboard
5. **Permission Check**: Pages verify user permissions

---

## Dashboard

### Overview Statistics

The dashboard displays key metrics:

**Today's Sales**
- Total revenue for current day
- Number of transactions

**Total Revenue**
- All-time sales
- Cumulative revenue

**Products**
- Active product count
- Total SKUs in system

**Transactions**
- Total transaction count

### Low Stock Alerts

- Displays products with stock < 20 units
- Color-coded warnings (orange/red)
- Quick restock buttons
- Sortable by urgency

### Recent Transactions

- Last 5 transactions
- Transaction ID, date/time
- Total amount and payment method
- Quick transaction details

---

## Product Management

### Features

**CRUD Operations**
- ✅ Create new products
- ✅ Edit existing products
- ✅ Delete products
- ✅ Search products
- ✅ Filter by category

### Adding a Product

1. Click "Add Product" button
2. Fill in product details:
   - Product Name
   - Price (₱)
   - Stock quantity
   - Category
   - Unit type (piece, pack, bottle, etc.)
   - Barcode number
3. Click "Add Product"

### Editing a Product

1. Find product in table
2. Click edit icon (pencil)
3. Modify desired fields
4. Click "Save Changes"

### Deleting a Product

1. Find product in table
2. Click delete icon (trash)
3. Confirm deletion
4. Product is removed

### Product Search & Filter

**Search**: Type product name in search box
**Category Filter**: Select category from dropdown
**Results**: Real-time filtering

### Product Information

Each product displays:
- Product Name
- Category
- Price (₱)
- Current Stock
- Unit type
- Barcode

---

## Inventory Management

### Features

**Stock Monitoring**
- ✅ View all product stock levels
- ✅ Low stock alerts
- ✅ Inventory value calculation
- ✅ Stock adjustments
- ✅ Audit trail ready

### Dashboard Stats

**Total Products**
- Number of active SKUs

**Low Stock Items**
- Products needing reorder
- Automatic alerts

**Inventory Value**
- Total value of all stock
- Calculated from price × quantity

### Stock Adjustments

**Adding Stock**
1. Click "+" icon on product
2. Enter quantity to add
3. Enter reason (optional):
   - Delivery
   - Purchase
   - Transfer
4. Confirm addition

**Removing Stock**
1. Click "-" icon on product
2. Enter quantity to remove
3. Enter reason (optional):
   - Damaged
   - Expired
   - Transfer
   - Adjustment
4. Confirm removal

### Stock Status Indicators

**In Stock** (Green)
- Stock ≥ 20 units

**Low Stock** (Orange)
- Stock < 20 units
- Needs reordering

**Out of Stock** (Red)
- Stock = 0 units
- Immediate action required

### Low Stock Management

**Alert System**
- Automatic detection
- Visual indicators
- Quick restock buttons
- Priority sorting

---

## Reports & Reading

### X-Reading (Mid-Day Report)

**Purpose**: Sales summary without closing the day

**Contents:**
- Report ID
- Date & Time
- Cashier name
- Total transactions
- Cash sales
- Digital sales (GCash, Card)
- Total sales
- Transaction list

**When to Use:**
- Shift changes
- Interim checks
- Manager reviews
- Cashier accountability

**How to Generate:**
1. Go to Reports page
2. Click "Generate X-Reading"
3. Review summary
4. Click "Generate & Print"
5. Prints to new window
6. Can be saved as PDF

### Z-Reading (End of Day Report)

**Purpose**: End-of-day closing with cash reconciliation

**Contents:**
- All X-Reading information
- Expected cash amount
- Actual cash counted
- Variance (over/short)
- Closed by (user name)

**When to Use:**
- End of business day
- Closing shift
- Daily reconciliation

**How to Generate:**
1. Count physical cash in drawer
2. Go to Reports page
3. Click "Generate Z-Reading"
4. Enter actual cash amount
5. System calculates variance
6. Review discrepancy (if any)
7. Click "Generate & Print"
8. File printed report

**Cash Reconciliation**

Expected Cash = Cash sales from transactions
Actual Cash = Physical cash counted
Variance = Actual - Expected

**Positive Variance** (Over)
- More cash than expected
- Investigate source

**Negative Variance** (Short)
- Less cash than expected
- Investigate shortage

### Printable Reports

Both X and Z readings generate printer-friendly HTML:

**Features:**
- Receipt-style format
- Monospace font
- Clear sections
- Dotted dividers
- Print button
- Save as PDF option

**Print Workflow:**
1. Report opens in new window
2. Review on screen
3. Click "Print Report" button
4. Select printer or "Save as PDF"
5. Save/Print
6. Close window

### Report History

- View all generated reports
- Search by date
- Filter by type (X or Z)
- Reprint any report
- Archive for auditing

---

## Analytics

### Performance Metrics

**Total Revenue**
- All-time sales
- Revenue trends

**Items Sold**
- Total units sold
- Sales velocity

**Products Selling**
- Number of active products
- Sell-through rate

**Average Item Value**
- Revenue per item
- Pricing insights

### Top Selling Products

**By Quantity**
- Ranks products by units sold
- Shows quantity sold
- Displays revenue generated
- Top 10 ranking

**By Revenue**
- Ranks products by revenue
- Shows units sold
- Displays total revenue
- Top 10 ranking

**Use Cases:**
- Inventory planning
- Promotion planning
- Stock optimization
- Purchasing decisions

### Category Performance

**Metrics per Category:**
- Total items sold
- Revenue generated
- Percentage of total sales
- Performance ranking

**Insights:**
- Best performing categories
- Revenue distribution
- Purchasing patterns
- Stock allocation

### Data Visualization

- Ranked lists
- Percentage calculations
- Badge indicators (Top 3)
- Color-coded performance
- Sortable tables

---

## User Management

### Features

**User Administration**
- ✅ Create new users
- ✅ Edit user details
- ✅ Delete users
- ✅ Assign roles
- ✅ Activate/Deactivate accounts
- ✅ View permissions
- ✅ Track last login

### Adding a User

1. Click "Add User"
2. Fill in details:
   - Username (unique)
   - Password
   - Full Name
   - Email address
   - Role (Admin/Manager/Cashier)
3. Click "Add User"
4. User can now login

### Editing a User

1. Find user in table
2. Click edit icon
3. Update desired fields:
   - Full Name
   - Email
   - Role
   - Active status
4. Click "Save Changes"

**Note**: You cannot edit your own account

### Deleting a User

1. Find user in table
2. Click delete icon
3. Confirm deletion
4. User is removed

**Note**: You cannot delete your own account

### Viewing Permissions

1. Click shield icon on user
2. View all permissions for that role
3. See permission descriptions
4. Understand access levels

### Role Assignment

**Selecting a Role:**
- Choose from dropdown
- Admin (full access)
- Manager (moderate access)
- Cashier (limited access)

**Permission Updates:**
- Automatic on role change
- Immediate effect
- Next login reflects changes

### Account Status

**Active Account**
- Can login
- Full permissions
- Green badge

**Inactive Account**
- Cannot login
- Locked out
- Red badge

**Use Cases:**
- Employee termination
- Temporary suspension
- Access control

### User Information Display

**Table Columns:**
- Username
- Full Name
- Email
- Role (with badge)
- Status (Active/Inactive)
- Last Login date/time
- Action buttons

### Security Features

**Password Protection**
- Passwords required
- Should be complex
- Change regularly

**Session Management**
- Automatic login
- Local storage
- Logout option

**Permission Checks**
- On every page load
- Protected routes
- Unauthorized redirect

---

## Best Practices

### Daily Workflow

**Opening**
1. Login as admin/manager
2. Check dashboard
3. Review low stock alerts
4. Verify system status

**During Day**
1. Process sales (cashiers)
2. Generate X-readings (shift changes)
3. Monitor stock levels
4. Address alerts

**Closing**
1. Count physical cash
2. Generate Z-reading
3. File reports
4. Plan restock
5. Logout

### Inventory Management

**Daily Tasks**
- Check low stock
- Plan reorders
- Update stock

**Weekly Tasks**
- Review sales data
- Analyze trends
- Adjust inventory

**Monthly Tasks**
- Full inventory count
- Performance review
- Category analysis

### Report Management

**When to Generate X-Reading**
- Shift changes
- Manager spot checks
- Cashier verification
- Midday reviews

**When to Generate Z-Reading**
- End of day (always)
- Before deposit
- Daily closing
- Reconciliation

### Security Best Practices

**Passwords**
- Use strong passwords
- Change regularly
- Don't share accounts
- Logout when done

**User Access**
- Assign minimal permissions
- Review regularly
- Deactivate ex-employees
- Monitor logins

**Data Protection**
- Regular backups
- Secure storage
- Access logs
- Audit trails

---

## Troubleshooting

### Cannot Login

**Check:**
- Username spelling
- Password correct
- Account active
- Network connection

**Solution:**
- Verify credentials
- Contact administrator
- Check account status

### Permission Denied

**Check:**
- Your role
- Page requirements
- Active status

**Solution:**
- Contact administrator
- Request role change
- Verify permissions

### Report Not Printing

**Check:**
- Printer connected
- Browser pop-ups allowed
- PDF viewer available

**Solution:**
- Allow pop-ups
- Install PDF reader
- Try different browser
- Save as PDF first

### Stock Not Updating

**Check:**
- Permission to edit
- Positive quantity
- Valid input

**Solution:**
- Verify permission
- Check numbers
- Refresh page

---

## Keyboard Shortcuts (Planned)

Future enhancements may include:
- `Ctrl + N` - New item (context-aware)
- `Ctrl + S` - Save changes
- `Ctrl + F` - Search
- `Esc` - Close dialogs
- `Alt + D` - Dashboard
- `Alt + P` - Products
- `Alt + R` - Reports

---

## Support

For technical support:
- Check this guide first
- Review error messages
- Contact system administrator
- Check main README.md

---

## Summary

The Cloud POS Admin Panel provides comprehensive back-office management with:

✅ Role-based access control
✅ Product & inventory management
✅ X & Z reading reports
✅ Printable HTML reports
✅ Analytics & insights
✅ User management
✅ Real-time dashboards
✅ Mobile responsive design

Perfect for managing sari-sari stores and small grocery businesses!
