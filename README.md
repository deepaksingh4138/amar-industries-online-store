# Amar Industries React Storefront (Starter)

A responsive React + Vite storefront prototype for Amar Industries with:
- Product catalogue, search, category filters and price sorting
- Add-to-cart, persistent browser cart, MOQ quantity controls and sample bulk pricing
- Retail vs business checkout form
- Local demo-order saving (browser only)
- WhatsApp enquiry form
- Responsive desktop and mobile layouts

## Run locally

Requirements: Node.js 18+.

```bash
npm install
npm run dev
```

Open the local URL shown by Vite.

To test a production build:

```bash
npm run build
npm run preview
```

## Important before launch

This is a **front-end prototype**, not a production-ready store. It does NOT collect real payments, create server-side orders, reserve stock, email order confirmations, calculate GST/freight, or securely manage customer accounts.

Before accepting real orders:
1. Replace sample product prices and illustrative product artwork with approved product data and actual product photos.
2. Add a secure backend/database for products, customer records, inventory and orders.
3. Integrate a payment provider such as Razorpay or another provider after merchant onboarding.
4. Configure shipping, GST, invoices, refunds, privacy policy, terms and returns.
5. Configure real lead/conversion tracking and test it.
6. Deploy the app to a supported static hosting provider or build pipeline. GitHub Pages can host the static frontend, but it cannot run the backend or process payments itself.

## Product data

The starter catalogue is in `src/App.jsx`, in the `products` array. The listed prices are placeholders and must not be used for live sales.

## Current demo behavior

- Cart persists in browser `localStorage`.
- Checkout stores a demo order in browser `localStorage` only.
- Contact form opens WhatsApp with the enquiry text.
- No customer or order information is sent to Amar Industries servers.
