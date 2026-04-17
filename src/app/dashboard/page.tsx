import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import DashboardForm from '@/components/DashboardForm'
import { LayoutDashboard, MessageSquare, Globe, LogOut, BarChart3, TrendingUp, Compass } from 'lucide-react'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).single()
  if (!profile) redirect('/login')

  // 1. Fetch Comprehensive Analytics
  const { data: analytics } = await supabase.from('analytics').select('event_type, referrer').eq('profile_id', user.id)
  
  const views = analytics?.filter(a => a.event_type === 'view').length || 0
  const clicks = analytics?.filter(a => a.event_type === 'click').length || 0
  const ctr = views > 0 ? ((clicks / views) * 100).toFixed(1) : 0

  // 2. Identify Top Source
  const sources: any = {}
  analytics?.filter(a => a.event_type === 'view').forEach(a => {
    const domain = a.referrer?.includes('instagram') ? 'Instagram' : a.referrer?.includes('facebook') ? 'Facebook' : a.referrer?.includes('zillow') ? 'Zillow' : 'Direct';
    sources[domain] = (sources[domain] || 0) + 1
  })
  const topSource = Object.keys(sources).reduce((a, b) => sources[a] > sources[b] ? a : b, 'None')

  return (
    <div className="min-h-screen bg-[#050505] relative overflow-hidden font-sans">
      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: `url('/lynxx-dashboard-bg.svg')`, backgroundSize: '400px' }} />
      
      <div className="relative z-10 max-w-5xl mx-auto p-4 md:p-12">
        
        {/* HEADER */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
          <div>
            <h1 className="text-3xl font-black italic uppercase tracking-tighter text-white">Agent<span className="text-[#00AEEF]">Lynxx</span></h1>
            <p className="text-zinc-500 text-[9px] font-bold uppercase tracking-[0.4em] mt-2">Marketing Decoded</p>
          </div>
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <a href="https://community.agentlynxx.com" target="_blank" className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-[#00AEEF]/10 border border-[#00AEEF]/30 text-[#00AEEF] rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-[#00AEEF] hover:text-black transition-all shadow-xl"><MessageSquare size={14} /> Knowledge Hub</a>
            <a href={`/${profile.username}`} target="_blank" className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-white text-black rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-[#00AEEF] hover:text-white transition-all shadow-xl"><Globe size={14} /> Live Page</a>
            <form action="/auth/signout" method="post" className="w-full md:w-auto">
                <button className="w-full px-6 py-3 bg-zinc-900 text-zinc-500 rounded-full text-[10px] font-black uppercase border border-white/5 hover:text-white transition-all"><LogOut size={14}/></button>
            </form>
          </div>
        </header>

        {/* INTELLIGENCE METRICS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
            <div className="bg-white/5 border border-white/5 rounded-3xl p-6">
                <BarChart3 className="text-zinc-500 mb-3" size={16} />
                <p className="text-[10px] font-black uppercase text-zinc-500 tracking-widest">Total Views</p>
                <p className="text-4xl font-light tracking-tighter">{views}</p>
            </div>
            <div className="bg-white/5 border border-white/5 rounded-3xl p-6 border-b-[#00AEEF]/30">
                <TrendingUp className="text-[#00AEEF] mb-3" size={16} />
                <p className="text-[10px] font-black uppercase text-[#00AEEF] tracking-widest">Total Clicks</p>
                <p className="text-4xl font-light tracking-tighter">{clicks}</p>
            </div>
            <div className="bg-white/5 border border-white/5 rounded-3xl p-6">
                <div className="text-zinc-500 mb-3 text-[10px] font-black">%</div>
                <p className="text-[10px] font-black uppercase text-zinc-500 tracking-widest">Conversion Power</p>
                <p className="text-4xl font-light tracking-tighter">{ctr}%</p>
            </div>
            <div className="bg-white/5 border border-white/5 rounded-3xl p-6">
                <Compass className="text-zinc-500 mb-3" size={16} />
                <p className="text-[10px] font-black uppercase text-zinc-500 tracking-widest">Top Source</p>
                <p className="text-2xl font-bold tracking-tighter mt-2 truncate text-[#00AEEF]">{topSource}</p>
            </div>
        </div>

        <DashboardForm profile={profile} />
      </div>
    </div>
  )
}