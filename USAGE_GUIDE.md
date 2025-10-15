# Cloud POS - Usage Guide

## Quick Start

1. **Start the application**
   ```bash
   npm run dev
   ```

2. **Access the POS**
   - Open your browser to `http://localhost:3000`
   - The main POS interface will load

## Main Features

### 1. Product Browsing

**Search Products**
- Use the search bar at the top to find products by name
- Search is case-insensitive and searches in real-time

**Filter by Category**
- Click category buttons to filter products
- Badge shows number of products in each category
- Categories include:
  - All Products
  - Beverages
  - Snacks
  - Instant Noodles
  - Condiments
  - Canned Goods
  - Personal Care
  - Household
  - Cigarettes & Tobacco
  - Frozen Foods

**Product Cards**
- Each card displays:
  - Product name
  - Price in Philippine Peso (₱)
  - Unit type (bottle, pack, piece, etc.)
  - Stock availability
  - Add to cart button

### 2. Shopping Cart

**Adding Items**
- Click on a product card or the "Add" button
- Item is added to cart with quantity 1
- If item already exists, quantity increases by 1

**Managing Cart**
- **Increase Quantity**: Click the "+" button
- **Decrease Quantity**: Click the "-" button
- **Remove Item**: Click the trash icon
- **Clear Cart**: Click "Clear Cart" button to remove all items

**Cart Display (Desktop)**
- Right sidebar shows cart
- Live updates as you add/remove items
- Shows individual item totals
- Displays cart subtotal and total

**Cart Display (Mobile)**
- Fixed bottom panel
- Swipe-friendly interface
- Compact view optimized for small screens

### 3. Checkout Process

**Starting Checkout**
1. Click the "Checkout" button in cart
2. Checkout dialog opens

**Customer Information**
- Enter customer name (optional)
- Helps track repeat customers

**Payment Methods**

**Cash Payment**
1. Select "Cash" tab
2. Enter amount received
3. System automatically calculates change
4. Change displayed in green if sufficient, red if insufficient
5. Checkout button disabled until sufficient cash entered

**GCash Payment**
1. Select "GCash" tab
2. Enter GCash number
3. In real implementation, would show QR code
4. Click "Complete Payment"

**Card Payment**
1. Select "Card" tab
2. Enter card details
3. In real implementation, would connect to card reader
4. Click "Complete Payment"

**Completing Transaction**
- Review order summary
- Verify payment details
- Click "Complete Payment"
- Success message appears
- Cart automatically clears
- Ready for next customer

### 4. Sales Dashboard

**Accessing Dashboard**
- Click "Sales" button in header
- Navigate to sales overview page

**Dashboard Features**

**Statistics Cards**
1. **Total Sales**: All-time revenue
2. **Today's Sales**: Current day revenue and transaction count
3. **Transactions**: Total count and average transaction value
4. **Items Sold**: Total number of items sold

**Transaction List**
- View all transactions with details
- Filter by:
  - All transactions
  - Today only
  - Cash payments
  - Digital payments (GCash, Card)

**Transaction Details**
- Transaction ID
- Date and time
- Customer name (if provided)
- Payment method
- Items purchased with quantities
- Total amount

## Mobile Usage Tips

1. **Portrait Mode**: Best for browsing products
2. **Landscape Mode**: Better for checkout process
3. **Touch Gestures**:
   - Tap product to add to cart
   - Swipe to scroll categories
   - Pinch to zoom (if needed)

## Keyboard Shortcuts (Desktop)

While the current version doesn't have keyboard shortcuts, future versions could include:
- `Ctrl + F` - Focus search
- `Esc` - Close dialogs
- `Enter` - Complete checkout (when ready)

## Common Workflows

### Walk-in Customer Purchase
1. Customer arrives
2. Search or browse for products
3. Add items to cart
4. Review cart
5. Click checkout
6. Enter customer name (optional)
7. Select payment method
8. Process payment
9. Complete transaction

### Quick Transaction
1. Know product name
2. Type in search
3. Click product
4. Adjust quantity if needed
5. Checkout
6. Select cash
7. Enter amount
8. Complete

### End of Day Review
1. Click "Sales" in header
2. View "Today's Sales" card
3. Filter transactions to "Today"
4. Review all transactions
5. Calculate cash on hand
6. Compare with digital payments

## Tips for Efficiency

1. **Memorize Common Products**: Faster searching
2. **Use Category Filters**: Quick access to product types
3. **Keep Cash Denominations Ready**: Faster change calculation
4. **Review Cart Before Checkout**: Prevent errors
5. **Enter Customer Names**: Build customer relationships

## Troubleshooting

**Cart Not Updating**
- Refresh the page
- Check browser console for errors

**Checkout Button Disabled**
- Verify cart has items
- Check cash amount is sufficient
- Ensure all required fields filled

**Search Not Working**
- Clear search and try again
- Check spelling
- Browse by category instead

**Mobile Display Issues**
- Rotate device
- Zoom out if needed
- Clear browser cache

## Data Information

### Sample Products
- 50 realistic Filipino store products
- Authentic pricing based on market rates
- Stock levels pre-configured
- Actual barcodes for common products

### Sample Transactions
- 5 pre-loaded sample transactions
- Mix of payment methods
- Different date/time stamps
- Various transaction sizes

## Customization

### Adding Your Products
1. Open `lib/data.ts`
2. Add products to `products` array
3. Follow existing format
4. Save file
5. App automatically updates

### Changing Currency
- Currently set to Philippine Peso (₱)
- To change, update symbol in components
- Modify pricing logic if needed

### Modifying Categories
1. Edit `categories` array in `lib/data.ts`
2. Update product categories to match
3. App automatically updates filters

## Best Practices

1. **Regular Backups**: Export transaction data regularly
2. **Test Payments**: Verify payment methods work correctly
3. **Update Stock**: Keep inventory accurate
4. **Monitor Sales**: Review dashboard daily
5. **Customer Service**: Use customer names for better service

## Security Notes

This is a frontend demonstration. For production use:
- Add authentication
- Implement backend API
- Secure payment processing
- Encrypt sensitive data
- Add user roles and permissions
- Implement audit logging

## Next Steps

After familiarizing yourself with the basic features:
1. Customize product catalog
2. Add your actual inventory
3. Set up backend (future enhancement)
4. Configure payment integrations
5. Train staff on usage
6. Go live!

---

For technical support or feature requests, please refer to the main README.md file.
