# PriceLocker — Next.js starter

A low-budget starter architecture for a multi-category comparison website:
- Groceries and household essentials
- Restaurant dishes
- Electronics and home appliances

## Important data honesty rules
- Seed data is explicitly labelled DEMO.
- `unknown` stock is never treated as `in_stock`.
- Stock is scoped to a PIN code / service area.
- Each offer carries a source and `checked_at` timestamp.
- Do not ingest retailer data unless you have permission, an authorized feed/API, or other legally permitted access.
- Do not claim live availability until a verified integration is connected.

## Requirements
- Node.js 20.9+
- npm
- Optional: Supabase project for persistence

## Run locally (Windows PowerShell)
1. Install Node.js LTS from https://nodejs.org/
2. Open PowerShell in this folder.
3. Run:
   ```powershell
   npm install
   npm run dev
   ```
4. Visit http://localhost:3000

## Create from official Next.js scaffold
This starter is a minimal code deliverable. For a production-grade Next.js app, the recommended path is:
```powershell
npx create-next-app@latest pricelocker --yes
```
Then copy `app/page.tsx`, `app/globals.css`, `lib/catalog.ts`, and `supabase/schema.sql` into the scaffold (keep the scaffold's generated config files), install dependencies, and run `npm run dev`.

## Supabase setup
1. Create a project at https://supabase.com/
2. Open SQL Editor.
3. Paste and run `supabase/schema.sql`.
4. Add server-only environment variables in `.env.local` (never commit this file):
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   SUPABASE_SERVICE_ROLE_KEY=server_only_secret
   ```
5. Do not expose the service-role key in browser code. This starter does not connect to Supabase yet; schema is the next integration step.

## Data integration roadmap
1. Admin-only manual CSV import to verify product matching and demand.
2. Add approved affiliate feeds / retailer APIs one connector at a time.
3. Normalize listings by category:
   - Grocery: brand + exact pack size + variant / barcode where available.
   - Electronics: manufacturer model number / GTIN, storage, RAM, colour, warranty and seller.
   - Restaurant dishes: restaurant branch + menu item + portion/variant + add-ons.
4. Store each inventory observation with service PIN code, source and checked time.
5. Build a scheduled worker only when a permitted data source and refresh cadence are agreed.
6. Back-in-stock alerts require authenticated/consented subscriptions and a real email/push provider; the current demo only shows the planned data model.

## Current limitations
This is a UI and data-model starter, not a live aggregator. It uses clearly labelled sample data. Prices, stock and timestamps are fictional demonstration data.
