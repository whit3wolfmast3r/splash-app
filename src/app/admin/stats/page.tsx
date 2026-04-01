import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
// ... (imports)

export default async function AdminStatsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  // Middleware handles the 'no user' case, but we check admin status here
  const { data: profile } = await supabase.from('profiles').select('is_admin').eq('id', user?.id).single()

  if (!profile?.is_admin) {
    redirect('/dashboard')
  }
  
  // ... (rest of the page code)
}