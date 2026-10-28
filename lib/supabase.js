import { createClient } from '@supabase/supabase-js';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(url && anonKey);

// Server / anon reads (public data via RLS)
export function getSupabase() {
  if (!isSupabaseConfigured) return null;
  return createClient(url, anonKey, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: { fetch: (input, init) => fetch(input, { ...init, next: { revalidate: 60 } }) }
  });
}

// Browser client singleton — holds the admin's auth session (localStorage)
let browserClient = null;
export function getBrowserSupabase() {
  if (!isSupabaseConfigured) return null;
  if (!browserClient) browserClient = createClient(url, anonKey);
  return browserClient;
}
