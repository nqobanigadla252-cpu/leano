# Leano — monorepo

- `apps/web` — customer storefront (Next.js, port 3030)
- `apps/portal` — store office / admin portal (Vite, port 3031)
- `supabase/schema.sql` — database schema (run once in the Supabase SQL editor)

## Supabase setup (one time)

1. Create a project at https://supabase.com
2. In the SQL editor, run everything in `supabase/schema.sql` — tables, security policies, the product-images storage bucket, realtime. **No data is seeded — the store starts empty.**
3. Add env keys (Project Settings → API):
   - `apps/web/.env` → see `apps/web/.env.example`
   - `apps/portal/.env` → see `apps/portal/.env.example`
4. Restart both dev servers.

## Admin account

1. Sign up once on the storefront `/account` page (or in Supabase → Authentication → Add user) with the admin email.
2. Promote the user to admin in the SQL editor:

   ```sql
   update public.profiles set role = 'admin' where id = 'THE-USER-UUID';
   ```

3. Sign in to the portal (`http://localhost:3031`) with those credentials. Only admins can open the portal.

## How it stays in sync

Everything the admin does in the portal — products, photos, categories, orders, shipping — writes to Supabase. The storefront reads the same tables live (realtime subscriptions), so changes appear in the shop without refreshing.

## Commands

```bash
pnpm install
pnpm dev:web      # storefront on :3030  (use -- --port 3030 to be explicit)
pnpm dev:portal   # portal on :3031
pnpm build        # build all apps
```
