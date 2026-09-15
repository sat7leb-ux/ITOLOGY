// lib/supabase/booking.ts
//
// Supabase client helpers for Meridian booking tables.
// Uses the same pattern as ITOLOGY's existing supabase clients.

import { createServerClient } from "@supabase/ssr";
import { createClient as createSupabaseJsClient, type SupabaseClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;

/**
 * Server-side booking client (uses service role key — full access to meridian_* tables).
 * Use in Server Components and Server Actions.
 */
export function getServiceClient(): SupabaseClient {
  const cookieStore = cookies();

  return createServerClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value;
      },
    },
  });
}

/**
 * Client-side booking client (uses anon key — RLS-protected access to meridian_* tables).
 * Use in Client Components for reads.
 */
export function getPublicClient(): SupabaseClient {
  return createSupabaseJsClient(SUPABASE_URL, SUPABASE_ANON_KEY);
}

// Re-export for convenience
export { SUPABASE_URL, SUPABASE_ANON_KEY };
