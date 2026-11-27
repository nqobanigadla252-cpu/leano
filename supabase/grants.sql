-- Run this in the Supabase SQL editor to fix missing role privileges.
-- (Safe to run multiple times.)

grant usage on schema public to anon, authenticated, service_role;

-- read access for everyone (RLS still limits products to Active for anon)
grant select on public.products to anon, authenticated, service_role;
grant select on public.categories to anon, authenticated, service_role;
grant select on public.shipping_zones to anon, authenticated, service_role;

-- authenticated users: full table privileges (RLS enforces the real rules)
grant select, insert, update, delete on public.products to authenticated, service_role;
grant select, insert, update, delete on public.categories to authenticated, service_role;
grant select, insert, update, delete on public.orders to authenticated, service_role;
grant select, insert, update, delete on public.shipping_zones to authenticated, service_role;
grant select, insert, update, delete on public.profiles to authenticated, service_role;

-- make sure future tables get sane defaults too
alter default privileges in schema public grant select on tables to anon;
alter default privileges in schema public grant select, insert, update, delete on tables to authenticated, service_role;
