-- Update role enum to organization types
-- Run this after 001_initial_schema.sql

-- Step 1: Drop the helper function that depends on role type
drop function if exists get_user_role() cascade;

-- Step 2: Drop all RLS policies (they will be recreated later)
drop policy if exists "Users can view own profile" on profiles;
drop policy if exists "Users can update own profile" on profiles;
drop policy if exists "Users can view own org" on orgs;
drop policy if exists "Anyone can view categories" on categories;
drop policy if exists "Requesters can manage own needs" on needs;
drop policy if exists "Suppliers can view open needs" on needs;
drop policy if exists "Suppliers can manage own offers" on offers;
drop policy if exists "Requesters can view open offers" on offers;
drop policy if exists "Users can view relevant matches" on matches;
drop policy if exists "Org members can view warehouses" on warehouses;
drop policy if exists "Suppliers can manage own warehouses" on warehouses;
drop policy if exists "Users can view inventory" on inventory_items;
drop policy if exists "Logistics can manage shipments" on shipments;
drop policy if exists "Involved parties can view shipments" on shipments;
drop policy if exists "Users can view shipment events" on shipment_events;
drop policy if exists "Anyone can view tracking providers" on tracking_providers;
drop policy if exists "Admins can view audit logs" on audit_logs;

-- Step 3: Convert role column to TEXT
alter table profiles alter column role type text using role::text;

-- Step 4: Update existing data to map old roles to new organization types
update profiles set role = 'ngo' where role = 'requester';
update profiles set role = 'business' where role = 'supplier';
update profiles set role = 'business' where role = 'logistics';
-- Keep admin as admin

-- Step 5: Drop the old enum type
drop type if exists role cascade;

-- Step 6: Create new enum with organization types
create type organization_type as enum (
  'admin',
  'business',
  'donor',
  'ngo',
  'npo',
  'volunteer',
  'government',
  'school',
  'hospital',
  'association',
  'academia'
);

-- Step 7: Convert column to use new enum
alter table profiles alter column role type organization_type using role::organization_type;

-- Step 8: Recreate the helper function with new type
create or replace function get_user_role()
returns organization_type as $$
  select role from profiles where id = auth.uid();
$$ language sql security definer;

-- Step 9: Recreate all RLS policies with updated logic

-- Profiles policies
create policy "Users can view own profile"
  on profiles for select
  using (auth.uid() = id or get_user_role() = 'admin');

create policy "Users can update own profile"
  on profiles for update
  using (auth.uid() = id);

-- Orgs policies
create policy "Users can view own org"
  on orgs for select
  using (
    id in (select org_id from profiles where id = auth.uid())
    or get_user_role() = 'admin'
  );

-- Categories policies
create policy "Anyone can view categories"
  on categories for select
  using (true);

-- Needs policies - ALL authenticated users can create needs
create policy "Users can manage own needs"
  on needs for all
  using (
    requester_id = auth.uid()
    or get_user_role() = 'admin'
  );

create policy "Users can view open needs"
  on needs for select
  using (
    status = 'open'
    or get_user_role() = 'admin'
    or requester_id = auth.uid()
  );

-- Offers policies - ALL authenticated users can create offers
create policy "Users can manage own offers"
  on offers for all
  using (
    supplier_id = auth.uid()
    or get_user_role() = 'admin'
  );

create policy "Users can view open offers"
  on offers for select
  using (
    status = 'open'
    or get_user_role() = 'admin'
    or supplier_id = auth.uid()
  );

-- Matches policies
create policy "Users can view relevant matches"
  on matches for select
  using (
    get_user_role() = 'admin'
    or need_id in (select id from needs where requester_id = auth.uid())
    or offer_id in (select id from offers where supplier_id = auth.uid())
  );

-- Warehouses policies - ALL authenticated users can manage warehouses
create policy "Org members can view warehouses"
  on warehouses for select
  using (
    org_id in (select org_id from profiles where id = auth.uid())
    or get_user_role() = 'admin'
  );

create policy "Users can manage own warehouses"
  on warehouses for all
  using (
    org_id in (select org_id from profiles where id = auth.uid())
    or get_user_role() = 'admin'
  );

-- Inventory policies
create policy "Users can view inventory"
  on inventory_items for select
  using (
    warehouse_id in (
      select id from warehouses
      where org_id in (select org_id from profiles where id = auth.uid())
    )
    or get_user_role() = 'admin'
  );

-- Shipments policies - ALL authenticated users can manage shipments
create policy "Users can manage shipments"
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

-- Shipment events policies
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

-- Tracking providers policies
create policy "Anyone can view tracking providers"
  on tracking_providers for select
  using (true);

-- Audit logs policies
create policy "Admins can view audit logs"
  on audit_logs for select
  using (get_user_role() = 'admin');

-- Step 10: Add form_type column to needs and offers
alter table needs add column if not exists form_type text check (
  form_type in (
    'registration',
    'general',
    'volunteer',
    'transportation',
    'warehousing',
    'equipment',
    'expertise',
    'case_management'
  )
);

alter table offers add column if not exists form_type text check (
  form_type in (
    'registration',
    'general',
    'volunteer',
    'transportation',
    'warehousing',
    'equipment',
    'expertise',
    'case_management'
  )
);

-- Add indexes for form_type
create index if not exists needs_form_type_idx on needs(form_type);
create index if not exists offers_form_type_idx on offers(form_type);
