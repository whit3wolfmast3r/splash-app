import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import DashboardForm from '@/components/DashboardForm'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  // 1. Fetch Profile
  const { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).single()
  
  // 2. Fetch Analytics Counts
  const { count: viewCount } = await supabase.from('analytics').select('*', { count: 'exact', head: true }).eq('profile_id', user.id).eq('event_type', 'view')
  const { count: clickCount } = await supabase.from('analytics').select('*', { count: 'exact', head: true }).eq('profile_id', user.id).eq('event_type', 'click')

  if (!profile) redirect('/login')

  return (
    <div className="min-h-screen bg-zinc-50 p-4 md:p-12 font-sans">
      <div className="max-w-2xl mx-auto">
        
        {/* HEADER */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <h1 className="text-3xl font-black text-zinc-900 tracking-tighter italic uppercase">
              agent <span className="text-[#00AEEF] normal-case">Lynxx</span> <span className="text-zinc-300 ml-2 not-italic">Admin</span>
            </h1>
            <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest mt-1">Editing @{profile.username}</p>
          </div>
          <div className="flex gap-3">
            <a href={`/${profile.username}`} target="_blank" className="px-6 py-3 bg-white border border-zinc-200 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-sm">View Page</a>
            <form action="/auth/signout" method="post">
               <button className="px-6 py-3 bg-zinc-100 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">Sign Out</button>
            </form>
          </div>
        </header>

        {/* ANALYTICS CARDS */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-white p-6 rounded-[2rem] border border-zinc-100 shadow-sm text-center">
            <span className="block text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-1">Total Views</span>
            <span className="text-3xl font-black text-zinc-900">{viewCount || 0}</span>
          </div>
          <div className="bg-white p-6 rounded-[2rem] border border-zinc-100 shadow-sm text-center">
            <span className="block text-[10px] font-black uppercase tracking-widest text-[#00AEEF] mb-1">Button Clicks</span>
            <span className="text-3xl font-black text-zinc-900">{clickCount || 0}</span>
          </div>
        </div>

        {/* THE FORM */}
        <div className="bg-white rounded-[3rem] shadow-2xl shadow-zinc-200/50 border border-zinc-100 p-6 md:p-12">
           <DashboardForm profile={profile} />
        </div>

      </div>
    </div>
  )
}