-- PriceLocker database schema (PostgreSQL / Supabase)
-- Apply in Supabase SQL Editor. Demo frontend is not yet connected to this schema.

create extension if not exists pgcrypto;

create type public.product_category as enum ('groceries', 'restaurant_food', 'electronics', 'home_appliances');
create type public.stock_status as enum ('in_stock', 'out_of_stock', 'unknown');

create table public.stores (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  category_support public.product_category[] not null default '{}',
  website_url text,
  integration_type text not null default 'manual' check (integration_type in ('manual','authorized_api','affiliate_feed','partner_feed')),
  access_approved boolean not null default false,
  created_at timestamptz not null default now()
);

create table public.products (
  id uuid primary key default gen_random_uuid(),
  category public.product_category not null,
  canonical_name text not null,
  brand text,
  barcode_gtin text,
  manufacturer_model text,
  variant_attributes jsonb not null default '{}',
  unit_quantity numeric,
  unit text,
  restaurant_branch text,
  restaurant_menu_item text,
  created_at timestamptz not null default now()
);

create table public.offers (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  store_id uuid not null references public.stores(id) on delete cascade,
  seller_name text,
  product_url text not null,
  price_paise bigint not null check (price_paise >= 0),
  delivery_fee_paise bigint,
  discount_note text,
  currency char(3) not null default 'INR',
  source_type text not null check (source_type in ('manual','authorized_api','affiliate_feed','partner_feed')),
  created_at timestamptz not null default now()
);

create table public.inventory_snapshots (
  id uuid primary key default gen_random_uuid(),
  offer_id uuid not null references public.offers(id) on delete cascade,
  pin_code char(6) not null check (pin_code ~ '^[0-9]{6}$'),
  stock_status public.stock_status not null default 'unknown',
  checked_at timestamptz,
  source_reference text,
  source_payload_hash text,
  created_at timestamptz not null default now()
);

create index inventory_pin_freshness_idx on public.inventory_snapshots (pin_code, checked_at desc);
create index offers_product_idx on public.offers (product_id, price_paise);
create index products_category_idx on public.products (category);

create table public.price_history (
  id uuid primary key default gen_random_uuid(),
  offer_id uuid not null references public.offers(id) on delete cascade,
  pin_code char(6) not null check (pin_code ~ '^[0-9]{6}$'),
  price_paise bigint not null check (price_paise >= 0),
  stock_status public.stock_status not null default 'unknown',
  observed_at timestamptz not null default now(),
  source_type text not null
);

create table public.notification_subscriptions (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  offer_id uuid not null references public.offers(id) on delete cascade,
  pin_code char(6) not null check (pin_code ~ '^[0-9]{6}$'),
  notify_back_in_stock boolean not null default true,
  notify_price_below_paise bigint,
  consented_at timestamptz not null default now(),
  verified_at timestamptz,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  unique (email, offer_id, pin_code)
);

-- Security note:
-- Enable RLS and add explicit policies before exposing any table to clients.
-- Keep service-role keys server-side. Do not allow public writes to offers or inventory.
alter table public.stores enable row level security;
alter table public.products enable row level security;
alter table public.offers enable row level security;
alter table public.inventory_snapshots enable row level security;
alter table public.price_history enable row level security;
alter table public.notification_subscriptions enable row level security;
