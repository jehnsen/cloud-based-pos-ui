# Getting Started with Cloud POS

## Prerequisites Checklist

Before you begin, make sure you have:

- [ ] Node.js version 18 or higher installed
- [ ] npm or yarn package manager
- [ ] A code editor (VS Code recommended)
- [ ] A modern web browser (Chrome, Firefox, Safari, or Edge)
- [ ] Terminal/Command Prompt access

## Installation Steps

### Step 1: Install Dependencies

```bash
npm install
```

**Expected outcome**: All dependencies will be installed (should take 2-3 minutes)

### Step 2: Start Development Server

```bash
npm run dev
```

**Expected outcome**:
- Development server starts on http://localhost:3000
- You should see "Ready in X seconds" message

### Step 3: Open in Browser

Open your web browser and navigate to:
```
http://localhost:3000
```

**Expected outcome**: You should see the Cloud POS main interface with products displayed

## First-Time Setup Checklist

- [ ] Application loads without errors
- [ ] Products are displayed in a grid
- [ ] Search bar is visible at the top
- [ ] Category filters are displayed
- [ ] Cart sidebar is visible (desktop) or bottom panel (mobile)
- [ ] Header shows "Cloud POS" branding

## Testing the Application

### Test 1: Add Product to Cart
1. [ ] Click on any product card
2. [ ] Verify product appears in cart
3. [ ] Check quantity shows as "1"
4. [ ] Verify price is displayed correctly

### Test 2: Modify Cart Quantity
1. [ ] Click the "+" button on a cart item
2. [ ] Verify quantity increases
3. [ ] Check total updates correctly
4. [ ] Click the "-" button
5. [ ] Verify quantity decreases

### Test 3: Search Functionality
1. [ ] Click in the search bar
2. [ ] Type "Coke"
3. [ ] Verify only Coke products are displayed
4. [ ] Clear search
5. [ ] Verify all products return

### Test 4: Category Filtering
1. [ ] Click "Beverages" category
2. [ ] Verify only beverage products shown
3. [ ] Check product count matches badge number
4. [ ] Click "All" to reset

### Test 5: Checkout Process
1. [ ] Add at least one product to cart
2. [ ] Click "Checkout" button
3. [ ] Verify checkout dialog opens
4. [ ] Select "Cash" payment method
5. [ ] Enter amount greater than total
6. [ ] Verify change is calculated
7. [ ] Click "Complete Payment"
8. [ ] Verify success message appears
9. [ ] Check cart is cleared

### Test 6: Sales Dashboard
1. [ ] Click "Sales" button in header
2. [ ] Verify dashboard page loads
3. [ ] Check statistics cards display
4. [ ] Verify sample transactions are listed
5. [ ] Try different tab filters
6. [ ] Navigate back to main POS

### Test 7: Mobile Responsiveness
1. [ ] Open browser DevTools (F12)
2. [ ] Toggle device toolbar (mobile view)
3. [ ] Verify layout adapts to mobile
4. [ ] Test cart on mobile (bottom panel)
5. [ ] Verify all buttons are touch-friendly

## Common Issues & Solutions

### Issue: npm install fails
**Solution**:
- Delete `node_modules` folder and `package-lock.json`
- Run `npm install` again
- Ensure you have Node.js 18+

### Issue: Port 3000 already in use
**Solution**:
- Kill process using port 3000
- Or run on different port: `npm run dev -- -p 3001`

### Issue: TypeScript errors
**Solution**:
- Delete `.next` folder
- Run `npm run dev` again
- Check TypeScript version is 5.9+

### Issue: Styles not loading
**Solution**:
- Clear browser cache
- Delete `.next` folder
- Restart development server

### Issue: Components not rendering
**Solution**:
- Check browser console for errors
- Verify all dependencies installed
- Check Node.js version

## Customization Guide

### Change Product Data
1. Open `lib/data.ts`
2. Modify the `products` array
3. Save file
4. App automatically reloads

### Change Colors/Theme
1. Open `app/globals.css`
2. Modify CSS variables under `:root`
3. Save file
4. See changes immediately

### Add New Category
1. Open `lib/data.ts`
2. Add category to `categories` array
3. Create products with that category
4. Save file

### Modify Payment Methods
1. Open `components/pos/checkout-dialog.tsx`
2. Modify the Tabs section
3. Add/remove payment method tabs
4. Update logic accordingly

## Development Workflow

### Daily Development
```bash
# Start development server
npm run dev

# Make changes to files
# Server automatically reloads

# When done, stop server with Ctrl+C
```

### Before Committing Code
```bash
# Run linter
npm run lint

# Fix any errors reported

# Test the application thoroughly
```

### Building for Production
```bash
# Create production build
npm run build

# Test production build locally
npm run start

# Deploy to hosting platform
```

## Project Structure Overview

```
cloud-pos/
├── app/                      # Next.js pages
│   ├── page.tsx             # Main POS
│   ├── sales/page.tsx       # Sales dashboard
│   ├── layout.tsx           # Root layout
│   └── globals.css          # Global styles
│
├── components/
│   ├── pos/                 # POS components
│   │   ├── product-grid.tsx
│   │   ├── cart-sidebar.tsx
│   │   ├── checkout-dialog.tsx
│   │   ├── header.tsx
│   │   └── category-filter.tsx
│   └── ui/                  # UI components
│       └── ...
│
├── contexts/
│   └── cart-context.tsx     # Cart state
│
├── lib/
│   ├── data.ts              # Product data
│   └── utils.ts             # Utilities
│
├── public/                  # Static files
├── README.md               # Main documentation
├── USAGE_GUIDE.md          # Usage instructions
├── PROJECT_SUMMARY.md      # Project overview
└── package.json            # Dependencies
```

## Next Steps

After completing the getting started guide:

1. [ ] Read the full [README.md](README.md)
2. [ ] Review [USAGE_GUIDE.md](USAGE_GUIDE.md) for detailed features
3. [ ] Check [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md) for technical details
4. [ ] Customize products for your store
5. [ ] Modify branding and colors
6. [ ] Test thoroughly
7. [ ] Deploy to production
8. [ ] Train staff on usage

## Support Resources

### Documentation
- **README.md** - Complete project documentation
- **USAGE_GUIDE.md** - How to use the application
- **PROJECT_SUMMARY.md** - Technical specifications
- **GETTING_STARTED.md** - This file

### Code Comments
- All components have inline comments
- Complex logic is explained
- Type definitions are documented

### External Resources
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [shadcn/ui](https://ui.shadcn.com)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)

## Quick Commands Reference

```bash
# Development
npm run dev              # Start dev server
npm run build           # Build for production
npm run start           # Start production server
npm run lint            # Run ESLint

# Package Management
npm install             # Install dependencies
npm install [package]   # Add new package
npm update              # Update dependencies
npm outdated            # Check for updates

# Troubleshooting
rm -rf node_modules     # Remove dependencies
rm -rf .next            # Clear Next.js cache
npm install             # Reinstall everything
```

## Success Criteria

You're ready to use Cloud POS when:

✅ Application loads without errors
✅ All products display correctly
✅ Cart functions properly
✅ Search and filter work
✅ Checkout process completes
✅ Sales dashboard shows data
✅ Mobile view works correctly
✅ No console errors

## Need Help?

If you encounter issues:

1. Check this guide first
2. Review console errors
3. Check browser DevTools
4. Clear cache and restart
5. Review documentation
6. Check dependencies are installed
7. Verify Node.js version

---

**Welcome to Cloud POS! Ready to modernize your sari-sari store.** 🎉

For detailed feature usage, see [USAGE_GUIDE.md](USAGE_GUIDE.md)
