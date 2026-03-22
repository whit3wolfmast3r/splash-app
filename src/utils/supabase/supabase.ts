import { createClient } from '@supabase/supabase-js'

// This prevents Vercel from crashing if the keys aren't loaded yet
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://tmp.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'tmp'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)