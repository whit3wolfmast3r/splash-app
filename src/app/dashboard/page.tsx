import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import DashboardForm from '@/components/DashboardForm'

export default async function DashboardPage() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  return (
    <div className="min-h-screen bg-zinc-50 p-4 md:p-8 font-sans">
      <div className="max-w-2xl mx-auto">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-zinc-900 tracking-tight italic">Splash Admin</h1>
            <p className="text-zinc-500 text-sm">Editing page for <span className="font-bold">@{profile?.username}</span></p>
          </div>
          <a 
            href={`/${profile?.username}`} 
            target="_blank" 
            className="px-6 py-2 bg-white border border-zinc-200 rounded-full text-sm font-bold shadow-sm hover:bg-zinc-50 transition"
          >
            View Live Page
          </a>
        </header>

        <div className="bg-white rounded-[2.5rem] shadow-sm border border-zinc-200 p-6 md:p-10">
           <DashboardForm profile={profile} />
        </div>

        <p className="text-center text-zinc-400 text-xs mt-10">
          Logged in as {user.email}
        </p>
      </div>
    </div>
  )
}