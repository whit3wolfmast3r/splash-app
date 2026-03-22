import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export default async function DashboardPage() {
  const supabase = await createClient()

  // 1. Check if the user is actually logged in
  const { data: { user } } = await supabase.auth.getUser()

  // 2. If not, send them back to login
  if (!user) {
    redirect('/login')
  }

  // 3. Fetch the profile for this specific user
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  return (
    <div className="min-h-screen bg-zinc-50 p-8 font-sans">
      <div className="max-w-2xl mx-auto">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-bold text-zinc-900 tracking-tight">Dashboard</h1>
            <p className="text-zinc-500 text-sm">Welcome back, {profile?.agent_name}</p>
          </div>
          {/* We will add a Logout button here later */}
        </header>

        <div className="bg-white rounded-3xl shadow-sm border border-zinc-200 p-8">
           <p className="text-zinc-400 italic text-center py-10">Form coming in the next step...</p>
        </div>
      </div>
    </div>
  )
}