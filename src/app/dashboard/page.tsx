import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import DashboardForm from '@/components/DashboardForm'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).single()
  if (!profile) redirect('/login')

  // Fetch individual analytics for this agent
  const [viewRes, clickRes] = await Promise.all([
    supabase.from('analytics').select('*', { count: 'exact', head: true }).eq('profile_id', user.id).eq('event_type', 'view'),
    supabase.from('analytics').select('*', { count: 'exact', head: true }).eq('profile_id', user.id).eq('event_type', 'click')
  ])

  return (
    <div className="min-h-screen bg-[#050505] relative overflow-hidden font-sans">
      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: `url('/lynxx-dashboard-bg.svg')`, backgroundSize: '400px' }} />
      <div className="relative z-10 max-w-5xl mx-auto p-4 md:p-12">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
          <div>
            <h1 className="text-3xl font-black lowercase tracking-tighter text-white">agent <span className="text-[#00AEEF]">lynxx</span></h1>
            <p className="text-zinc-500 text-[9px] font-bold uppercase tracking-[0.4em] mt-2">Control Center: @{profile.username}</p>
          </div>
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <a href="https://community.agentlynxx.com" target="_blank" className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-[#00AEEF]/10 border border-[#00AEEF]/30 text-[#00AEEF] rounded-full text-[10px] font-black uppercase hover:bg-[#00AEEF] hover:text-black transition-all">Agent Community</a>
            <a href={`/${profile.username}`} target="_blank" className="flex-1 md:flex-none px-6 py-3 bg-white text-black rounded-full text-[10px] font-black uppercase hover:bg-[#00AEEF] hover:text-white transition-all">View Live Link</a>
          </div>
        </header>

        <DashboardForm 
          profile={profile} 
          viewCount={viewRes.count || 0} 
          clickCount={clickRes.count || 0} 
        />
      </div>
    </div>
  )
}