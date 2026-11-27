-- Run once in the Supabase SQL editor: adds image support to categories.
alter table public.categories add column if not exists image text;
