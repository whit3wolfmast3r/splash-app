import { createClient } from '@supabase/supabase-js'

// This pulls the keys we just saved in the .env.local file
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// This creates the "Client" that we will use in other parts of the app
export const supabase = createClient(supabaseUrl, supabaseAnonKey)