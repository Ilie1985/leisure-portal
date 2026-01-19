import { createClient } from "@supabase/supabase-js";


// Supabase configuration these values are stored in environment variables to keep sensitive information out of the source code.

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;


// check to ensure required environment variables exist.

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase env vars. Check your .env file.");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
