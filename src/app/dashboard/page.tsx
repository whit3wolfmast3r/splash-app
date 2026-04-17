import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import DashboardForm from '@/components/DashboardForm'
import { MessageSquare, Globe, LogOut, BarChart3, TrendingUp, Compass } from 'lucide-react'

export default async function DashboardPage() {
  const supabase = await createClient(); const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')
  const { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).single()
  if (!profile) redirect('/login')

  const { data: analytics } = await supabase.from('analytics').select('event_type, referrer').eq('profile_id', user.id)
  const views = analytics?.filter(a => a.event_type === 'view').length || 0
  const clicks = analytics?.filter(a => a.event_type === 'click').length || 0
  const ctr = views > 0 ? ((clicks / views) * 100).toFixed(1) : 0

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
            <a href="https://community.agentlynxx.com" target="_blank" className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-[#00AEEF]/10 border border-[#00AEEF]/30 text-[#00AEEF] rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-[#00AEEF] hover:text-black transition-all shadow-xl"><MessageSquare size={14} /> Knowledge Hub</a>
            <a href={`/${profile.username}`} target="_blank" className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-white text-black rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-[#00AEEF] hover:text-white transition-all shadow-xl"><Globe size={14} /> Live Page</a>
            <form action="/auth/signout" method="post"><button className="w-12 h-12 flex items-center justify-center bg-zinc-900 text-zinc-500 rounded-full border border-white/5 hover:text-red-500 transition-all"><LogOut size={16}/></button></form>
          </div>
        </header>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            <div className="bg-white/5 border border-white/5 rounded-3xl p-6"><BarChart3 className="text-zinc-500 mb-3" size={16} /><p className="text-[10px] font-black uppercase text-zinc-500 tracking-widest">Views</p><p className="text-4xl font-light tracking-tighter">{views}</p></div>
            <div className="bg-white/5 border border-white/5 rounded-3xl p-6 border-b-[#00AEEF]/30"><TrendingUp className="text-[#00AEEF] mb-3" size={16} /><p className="text-[10px] font-black uppercase text-[#00AEEF] tracking-widest">Clicks</p><p className="text-4xl font-light tracking-tighter">{clicks}</p></div>
            <div className="bg-white/5 border border-white/5 rounded-3xl p-6 text-zinc-500"><div className="mb-3 text-xs font-black">%</div><p className="text-[10px] font-black uppercase tracking-widest">CTR</p><p className="text-4xl font-light tracking-tighter">{ctr}%</p></div>
            <div className="bg-white/5 border border-white/5 rounded-3xl p-6"><Compass className="text-zinc-500 mb-3" size={16} /><p className="text-[10px] font-black uppercase text-zinc-500 tracking-widest">Source</p><p className="text-xl font-bold tracking-tighter mt-2 truncate text-[#00AEEF]">Direct</p></div>
        </div>

        <DashboardForm profile={profile} />
      </div>
    </div>
  )
}