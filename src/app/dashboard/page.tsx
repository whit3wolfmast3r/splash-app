import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import DashboardForm from '@/components/DashboardForm'

export default async function DashboardPage() {
  const supabase = await createClient()

  const { data: { user }, error: authError } = await supabase.auth.getUser()

  if (authError || !user) {
    redirect('/login')
  }

  // Explicitly fetching, and handling the potential error
  const { data: profile, error: dbError } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  // If there is a DB error, we show it on screen so we can fix it
  if (dbError) {
    return (
      <div className="p-10 font-mono text-red-500 bg-black min-h-screen">
        <h1 className="text-2xl font-bold mb-4">Database Error</h1>
        <p>{dbError.message}</p>
        <p className="mt-4 text-white">Make sure you ran the SQL script to add the social_links column!</p>
      </div>
    )
  }

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
           {/* Passing a default object for socials if it's null in the DB */}
           <DashboardForm profile={{
             ...profile,
             social_links: profile.social_links || {}
           }} />
        </div>
      </div>
    </div>
  )
}