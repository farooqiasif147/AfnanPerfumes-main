# Afnan Perfumes - E-commerce Platform

## Overview

This is a premium perfume e-commerce website for Afnan Perfumes, targeting the Pakistani market. The platform features a luxury fragrance catalog with Cash on Delivery (COD) checkout functionality. Built as a **fully static React application** with orders submitted directly to Google Sheets from the browser.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture (Static Site)
- **Framework**: React 19 with TypeScript
- **Routing**: Wouter (lightweight React router)
- **State Management**: TanStack React Query for server state
- **Styling**: Tailwind CSS v4 with custom theme variables for luxury branding (gold accents, serif fonts)
- **UI Components**: Shadcn/ui component library with Radix UI primitives
- **Animations**: Framer Motion for page transitions and micro-interactions
- **Build Tool**: Vite

### Order System
- **No backend required** - Orders submit directly to Google Sheets via Apps Script
- **Reliability**: 3 auto-retries with progressive delays, localStorage backup
- **WhatsApp Integration**: Fallback to WhatsApp order if Google Sheets fails

### Project Structure
```
├── client/           # React frontend application
│   ├── src/
│   │   ├── components/  # UI components (layout, home sections, shadcn/ui)
│   │   ├── pages/       # Route page components
│   │   ├── data/        # Static product data
│   │   ├── hooks/       # Custom React hooks
│   │   └── lib/         # Utility functions and query client
│   └── public/       # Static assets (_redirects for SPA routing)
├── server/           # Minimal Vite dev server runner
│   └── index.ts      # Starts Vite in development
├── script/           # Build scripts
│   └── build.ts      # Static site build
└── dist/public/      # Built static site output
```

### Key Features
- **Static Deployment**: Can deploy to Cloudflare Pages, Netlify, or any static host
- **COD Checkout**: Cash on Delivery with WhatsApp confirmation
- **Add-ons**: Upsell products during checkout
- **Post-purchase Upsell**: Additional offers after order completion
- **Mobile Responsive**: Optimized for Pakistani market (low bandwidth)

## Build & Deploy

### Development
```bash
npm run dev
```

### Build Static Site
```bash
npm run build
# Output: dist/public/
```

### Deploy to Cloudflare Pages
1. Run `npm run build`
2. Upload contents of `dist/public/` to Cloudflare Pages
3. SPA routing handled by `_redirects` file

## External Dependencies

### Third-Party Services
- **Google Sheets**: Order storage via Apps Script webhook
- **Google Fonts**: Cormorant Garamond (serif) and Montserrat (sans-serif)
- **WhatsApp**: Customer support and order fallback

### Key NPM Packages
- **Frontend**: react, wouter, @tanstack/react-query, framer-motion, tailwindcss
- **UI**: Radix UI primitives, lucide-react icons, embla-carousel-react
- **Forms**: react-hook-form, zod
- **Build**: vite, tsx

### Environment Variables
- `VITE_GOOGLE_SHEETS_URL`: Apps Script webhook URL for order submission (exposed to the browser by Vite)
