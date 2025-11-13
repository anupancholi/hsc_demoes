-- Humanitarian Aid Platform - Initial Schema
-- Run this in Supabase SQL Editor

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Enums
create type role as enum ('admin','requester','supplier','logistics');
create type need_status as enum ('draft','open','matched','fulfilled','cancelled');
create type offer_status as enum ('draft','open','matched','fulfilled','cancelled');
create type match_status as enum ('proposed','accepted','rejected','cancelled');
create type shipment_status as enum ('created','in_transit','delivered','cancelled');
create type tracking_event_type as enum ('status','location','delay','note');

-- Organizations
create table orgs (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  type text check (type in ('ngo','corporate','gov','other')),
  country text,
  city text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- User Profiles (extends auth.users)
create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  org_id uuid references orgs(id),
  role role not null,
  full_name text,
  phone text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
create index profiles_org_id_idx on profiles(org_id);
create index profiles_role_idx on profiles(role);

-- Categories (shared taxonomy)
create table categories (
  id serial primary key,
  name text unique not null
);

-- Warehouses
create table warehouses (
  id uuid primary key default gen_random_uuid(),
  org_id uuid references orgs(id) on delete cascade,
  name text not null,
  address text,
  country text,
  city text,
  provider text default 'internal',
  provider_ref text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
create index warehouses_org_id_idx on warehouses(org_id);

-- Inventory Items
create table inventory_items (
  id uuid primary key default gen_random_uuid(),
  warehouse_id uuid references warehouses(id) on delete cascade,
  sku text,
  title text not null,
  category_id int references categories(id),
  quantity int not null check (quantity >= 0),
  unit text default 'unit',
  attributes jsonb default '{}',
  provider_ref text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
create index inventory_items_warehouse_id_idx on inventory_items(warehouse_id);
create index inventory_items_category_id_idx on inventory_items(category_id);

-- Needs
create table needs (
  id uuid primary key default gen_random_uuid(),
  requester_id uuid references profiles(id) on delete set null,
  org_id uuid references orgs(id) on delete set null,
  title text not null,
  description text,
  category_id int references categories(id),
  quantity int check (quantity > 0),
  unit text default 'unit',
  country text,
  city text,
  status need_status default 'open',
  needed_by date,
  tags text[] default '{}',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
create index needs_category_id_idx on needs(category_id);
create index needs_status_idx on needs(status);
create index needs_requester_id_idx on needs(requester_id);

-- Offers
create table offers (
  id uuid primary key default gen_random_uuid(),
  supplier_id uuid references profiles(id) on delete set null,
  org_id uuid references orgs(id) on delete set null,
  title text not null,
  description text,
  category_id int references categories(id),
  max_quantity int check (max_quantity > 0),
  unit text default 'unit',
  country text,
  city text,
  status offer_status default 'open',
  available_from date,
  tags text[] default '{}',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
create index offers_category_id_idx on offers(category_id);
create index offers_status_idx on offers(status);
create index offers_supplier_id_idx on offers(supplier_id);

-- Matches
create table matches (
  id uuid primary key default gen_random_uuid(),
  need_id uuid references needs(id) on delete cascade,
  offer_id uuid references offers(id) on delete cascade,
  score numeric not null,
  status match_status default 'proposed',
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  unique (need_id, offer_id)
);
create index matches_need_id_idx on matches(need_id);
create index matches_offer_id_idx on matches(offer_id);
create index matches_status_idx on matches(status);

-- Shipments
create table shipments (
  id uuid primary key default gen_random_uuid(),
  match_id uuid references matches(id) on delete set null,
  logistics_id uuid references profiles(id) on delete set null,
  origin text,
  destination text,
  eta date,
  status shipment_status default 'created',
  carrier text,
  tracking_code text,
  tracking jsonb default '{}',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
create index shipments_match_id_idx on shipments(match_id);
create index shipments_logistics_id_idx on shipments(logistics_id);
create index shipments_status_idx on shipments(status);

-- Tracking Providers
create table tracking_providers (
  id text primary key,
  name text not null
);

-- Tracking Subscriptions
create table tracking_subscriptions (
  id uuid primary key default gen_random_uuid(),
  shipment_id uuid references shipments(id) on delete cascade,
  provider_id text references tracking_providers(id),
  external_shipment_ref text,
  webhook_secret text,
  created_at timestamptz default now()
);
create index tracking_subscriptions_shipment_id_idx on tracking_subscriptions(shipment_id);

-- Shipment Events
create table shipment_events (
  id bigserial primary key,
  shipment_id uuid references shipments(id) on delete cascade,
  type tracking_event_type not null default 'status',
  status shipment_status,
  lat double precision,
  lon double precision,
  city text,
  country text,
  occurred_at timestamptz not null,
  raw jsonb default '{}',
  created_at timestamptz default now()
);
create index shipment_events_shipment_id_idx on shipment_events(shipment_id, occurred_at desc);

-- Audit Logs
create table audit_logs (
  id bigserial primary key,
  actor_id uuid references profiles(id),
  action text not null,
  entity text not null,
  entity_id uuid,
  meta jsonb default '{}',
  created_at timestamptz default now()
);
create index audit_logs_actor_id_idx on audit_logs(actor_id);
create index audit_logs_entity_idx on audit_logs(entity, entity_id);

-- Updated_at trigger function
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Apply updated_at triggers
create trigger update_orgs_updated_at before update on orgs
  for each row execute function update_updated_at_column();
create trigger update_profiles_updated_at before update on profiles
  for each row execute function update_updated_at_column();
create trigger update_warehouses_updated_at before update on warehouses
  for each row execute function update_updated_at_column();
create trigger update_inventory_items_updated_at before update on inventory_items
  for each row execute function update_updated_at_column();
create trigger update_needs_updated_at before update on needs
  for each row execute function update_updated_at_column();
create trigger update_offers_updated_at before update on offers
  for each row execute function update_updated_at_column();
create trigger update_matches_updated_at before update on matches
  for each row execute function update_updated_at_column();
create trigger update_shipments_updated_at before update on shipments
  for each row execute function update_updated_at_column();

-- Enable Row Level Security
alter table orgs enable row level security;
alter table profiles enable row level security;
alter table categories enable row level security;
alter table warehouses enable row level security;
alter table inventory_items enable row level security;
alter table needs enable row level security;
alter table offers enable row level security;
alter table matches enable row level security;
alter table shipments enable row level security;
alter table tracking_providers enable row level security;
alter table tracking_subscriptions enable row level security;
alter table shipment_events enable row level security;
alter table audit_logs enable row level security;

-- RLS Policies

-- Helper function to get user role
create or replace function get_user_role()
returns role as $$
  select role from profiles where id = auth.uid();
$$ language sql security definer;

-- Profiles: users can read their own, admins can read all
create policy "Users can view own profile"
  on profiles for select
  using (auth.uid() = id or get_user_role() = 'admin');

create policy "Users can update own profile"
  on profiles for update
  using (auth.uid() = id);

-- Orgs: users can view their org, admins can view all
create policy "Users can view own org"
  on orgs for select
  using (
    id in (select org_id from profiles where id = auth.uid())
    or get_user_role() = 'admin'
  );

-- Categories: public read
create policy "Anyone can view categories"
  on categories for select
  using (true);

-- Needs: requesters CRUD own, suppliers/logistics read open/matched, admins all
create policy "Requesters can manage own needs"
  on needs for all
  using (
    requester_id = auth.uid()
    or get_user_role() = 'admin'
  );

create policy "Suppliers can view open needs"
  on needs for select
  using (
    status = 'open'
    or get_user_role() = 'admin'
    or requester_id = auth.uid()
  );

-- Offers: suppliers CRUD own, requesters read open/matched, admins all
create policy "Suppliers can manage own offers"
  on offers for all
  using (
    supplier_id = auth.uid()
    or get_user_role() = 'admin'
  );

create policy "Requesters can view open offers"
  on offers for select
  using (
    status = 'open'
    or get_user_role() = 'admin'
    or supplier_id = auth.uid()
  );

-- Matches: visible to involved parties
create policy "Users can view relevant matches"
  on matches for select
  using (
    get_user_role() = 'admin'
    or need_id in (select id from needs where requester_id = auth.uid())
    or offer_id in (select id from offers where supplier_id = auth.uid())
  );

-- Warehouses: org members can view, suppliers can manage own
create policy "Org members can view warehouses"
  on warehouses for select
  using (
    org_id in (select org_id from profiles where id = auth.uid())
    or get_user_role() = 'admin'
  );

create policy "Suppliers can manage own warehouses"
  on warehouses for all
  using (
    org_id in (select org_id from profiles where id = auth.uid() and role = 'supplier')
    or get_user_role() = 'admin'
  );

-- Inventory: follows warehouse access
create policy "Users can view inventory"
  on inventory_items for select
  using (
    warehouse_id in (
      select id from warehouses
      where org_id in (select org_id from profiles where id = auth.uid())
    )
    or get_user_role() = 'admin'
  );

-- Shipments: logistics manage, involved parties read
create policy "Logistics can manage shipments"
  on shipments for all
  using (
    logistics_id = auth.uid()
    or get_user_role() = 'admin'
  );

create policy "Involved parties can view shipments"
  on shipments for select
  using (
    get_user_role() = 'admin'
    or logistics_id = auth.uid()
    or match_id in (
      select id from matches
      where need_id in (select id from needs where requester_id = auth.uid())
      or offer_id in (select id from offers where supplier_id = auth.uid())
    )
  );

-- Shipment events: read access follows shipments
create policy "Users can view shipment events"
  on shipment_events for select
  using (
    shipment_id in (
      select id from shipments
      where logistics_id = auth.uid()
      or get_user_role() = 'admin'
      or match_id in (
        select id from matches
        where need_id in (select id from needs where requester_id = auth.uid())
        or offer_id in (select id from offers where supplier_id = auth.uid())
      )
    )
  );

-- Tracking providers: public read
create policy "Anyone can view tracking providers"
  on tracking_providers for select
  using (true);

-- Audit logs: admins only
create policy "Admins can view audit logs"
  on audit_logs for select
  using (get_user_role() = 'admin');

-- Enable Realtime for shipments and events
alter publication supabase_realtime add table shipments;
alter publication supabase_realtime add table shipment_events;
