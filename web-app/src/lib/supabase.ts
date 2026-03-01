import { createClient, SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

let supabase: SupabaseClient;

try {
    supabase = createClient(supabaseUrl, supabaseAnonKey);
} catch {
    // During build time, env vars may not be available
    supabase = null as unknown as SupabaseClient;
}

export { supabase };
