import { createClient } from '@supabase/supabase-js'

// If the keys are missing (like during a Vercel build), we use a placeholder 
// so the app doesn't crash.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://tmp.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'tmp'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)