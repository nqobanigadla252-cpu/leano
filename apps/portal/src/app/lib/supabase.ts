import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

export const supabaseConfigured = Boolean(url && anonKey);

// Placeholder values keep the client constructible so the app can render
// a setup screen instead of crashing when env vars are missing.
export const supabase = createClient(
  url || "https://not-configured.supabase.co",
  anonKey || "not-configured",
);
