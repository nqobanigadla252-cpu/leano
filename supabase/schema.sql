-- Leano store schema — run this in the Supabase SQL editor.
-- No seed data: all content is created through the portal.

-- ============ TABLES ============

-- Profiles mirror auth.users; role decides portal access ('admin') vs customer.
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text not null default '',
  role text not null default 'customer' check (role in ('admin', 'customer')),
  created_at timestamptz not null default now()
);

create table if not exists public.categories (
  id text primary key,
  name text not null unique,
  description text not null default '',
  image text,
  created_at timestamptz not null default now()
);

create table if not exists public.products (
  id text primary key,
  slug text not null unique,
  name text not null,
  category text not null default '',
  subcategory text not null default '',
  price numeric(10,2) not null default 0,
  compare_at_price numeric(10,2),
  stock integer not null default 0,
  status text not null default 'Draft' check (status in ('Active', 'Draft')),
  description text not null default '',
  images text[] not null default '{}',
  features text[] not null default '{}',
  rating numeric(2,1) not null default 4.8,
  review_count integer not null default 0,
  tags text[] not null default '{}',
  created_at timestamptz not null default now()
);

create table if not exists public.orders (
  id text primary key,
  user_id uuid references public.profiles (id) on delete set null,
  customer text not null,
  items integer not null default 1,
  total numeric(10,2) not null default 0,
  status text not null default 'Pending' check (status in ('Pending', 'Paid', 'Shipped', 'Delivered', 'Cancelled')),
  channel text not null default 'Online store',
  created_at timestamptz not null default now()
);

create table if not exists public.shipping_zones (
  id text primary key,
  name text not null,
  regions text not null default '',
  rate numeric(10,2) not null default 0,
  free_over numeric(10,2),
  eta text not null default '',
  enabled boolean not null default true,
  created_at timestamptz not null default now()
);

-- ============ PROFILE AUTO-CREATE ============

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, role)
  values (new.id, coalesce(new.raw_user_meta_data ->> 'full_name', ''), 'customer')
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ============ ROW LEVEL SECURITY ============

alter table public.profiles enable row level security;
alter table public.categories enable row level security;
alter table public.products enable row level security;
alter table public.orders enable row level security;
alter table public.shipping_zones enable row level security;

-- Helper: is the current user an admin?
create or replace function public.is_admin()
returns boolean
language sql
security definer set search_path = public
stable
as $$
  select exists (select 1 from public.profiles where id = auth.uid() and role = 'admin');
$$;

-- Profiles: users read their own; admins read all.
create policy "profiles read own" on public.profiles for select using (auth.uid() = id or public.is_admin());
create policy "profiles update own" on public.profiles for update using (auth.uid() = id) with check (auth.uid() = id and role = 'customer');

-- Categories & shipping zones: everyone can read; only admins write.
create policy "categories read" on public.categories for select using (true);
create policy "categories admin write" on public.categories for all using (public.is_admin()) with check (public.is_admin());

create policy "zones read" on public.shipping_zones for select using (true);
create policy "zones admin write" on public.shipping_zones for all using (public.is_admin()) with check (public.is_admin());

-- Products: public can read Active products; admins see and change everything.
create policy "products public read" on public.products for select using (status = 'Active' or public.is_admin());
create policy "products admin write" on public.products for all using (public.is_admin()) with check (public.is_admin());

-- Orders: customers see/create their own; admins see and update all.
create policy "orders read" on public.orders for select using (auth.uid() = user_id or public.is_admin());
create policy "orders customer insert" on public.orders for insert with check (auth.uid() = user_id);
create policy "orders admin update" on public.orders for update using (public.is_admin()) with check (public.is_admin());

-- ============ STORAGE (product images) ============

insert into storage.buckets (id, name, public)
values ('product-images', 'product-images', true)
on conflict (id) do nothing;

create policy "product images public read" on storage.objects for select using (bucket_id = 'product-images');
create policy "product images admin write" on storage.objects for insert with check (bucket_id = 'product-images' and public.is_admin());
create policy "product images admin update" on storage.objects for update using (bucket_id = 'product-images' and public.is_admin());
create policy "product images admin delete" on storage.objects for delete using (bucket_id = 'product-images' and public.is_admin());

-- ============ REALTIME ============

alter publication supabase_realtime add table public.products;
alter publication supabase_realtime add table public.categories;
alter publication supabase_realtime add table public.orders;
alter publication supabase_realtime add table public.shipping_zones;

-- ============ GRANTS ============
-- (in case the project's default privileges were altered)

grant usage on schema public to anon, authenticated, service_role;
grant select on public.products to anon, authenticated, service_role;
grant select on public.categories to anon, authenticated, service_role;
grant select on public.shipping_zones to anon, authenticated, service_role;
grant select, insert, update, delete on public.products to authenticated, service_role;
grant select, insert, update, delete on public.categories to authenticated, service_role;
grant select, insert, update, delete on public.orders to authenticated, service_role;
grant select, insert, update, delete on public.shipping_zones to authenticated, service_role;
grant select, insert, update, delete on public.profiles to authenticated, service_role;
