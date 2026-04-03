import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { Users, MousePointer2, Eye, AlertCircle, ExternalLink, Mail, Trophy, TrendingUp, Zap } from 'lucide-react'

export default async function AdminStatsPage() {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: profile } = await supabase.from('profiles').select('is_admin').eq('id', user.id).single()
  if (!profile?.is_admin) redirect('/dashboard')

  // 1. Fetch Basic Totals
  const { data: profiles } = await supabase.from('profiles').select('*').order('created_at', { ascending: false })
  const { count: totalViews } = await supabase.from('analytics').select('*', { count: 'exact', head: true }).eq('event_type', 'view')
  const { count: totalClicks } = await supabase.from('analytics').select('*', { count: 'exact', head: true }).eq('event_type', 'click')

  // 2. Fetch Growth (Joined last 7 days)
  const sevenDaysAgo = new Date()
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
  const newSignups = profiles?.filter(p => new Date(p.created_at) > sevenDaysAgo).length || 0

  // 3. Fetch Top Performers (Leaderboard)
  // We query the analytics table, count views per profile, and join with profile names
  const { data: topData } = await supabase
    .rpc('get_top_performers') // We will create this small function in the next step

  const profilesMissingAnalytics = profiles?.filter(p => !p.google_analytics_id || !p.clarity_id) || []

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans p-6 md:p-12 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: `url('/lynxx-dashboard-bg.svg')`, backgroundSize: '400px' }} />

      <div className="relative z-10 max-w-6xl mx-auto space-y-10">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-white/5 pb-8">
          <div>
            <h1 className="text-4xl font-black italic uppercase tracking-tighter text-white">
                Platform <span className="text-[#00AEEF]">Intelligence</span>
            </h1>
            <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-[0.4em] mt-2">Authorized Access: {user.email}</p>
          </div>
          
          {/* DEEP LINK TO VERCEL */}
          <a 
            href="https://vercel.com/dashboard" 
            target="_blank" 
            className="flex items-center gap-2 bg-zinc-900 border border-white/10 px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all shadow-xl"
          >
            <Zap size={14} className="text-[#00AEEF]" />
            Full Vercel Console
          </a>
        </div>

        {/* TOP ROW: Vercel-style Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
            <Users className="text-[#00AEEF] mb-3" size={20} />
            <p className="text-zinc-500 text-[9px] font-black uppercase tracking-widest">Total Agents</p>
            <p className="text-4xl font-light tracking-tighter mt-1">{profiles?.length || 0}</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
            <TrendingUp className="text-green-500 mb-3" size={20} />
            <p className="text-zinc-500 text-[9px] font-black uppercase tracking-widest">7-Day Growth</p>
            <p className="text-4xl font-light tracking-tighter mt-1">+{newSignups}</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
            <Eye className="text-white/40 mb-3" size={20} />
            <p className="text-zinc-500 text-[9px] font-black uppercase tracking-widest">Total Views</p>
            <p className="text-4xl font-light tracking-tighter mt-1">{totalViews || 0}</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
            <MousePointer2 className="text-[#00AEEF] mb-3" size={20} />
            <p className="text-zinc-500 text-[9px] font-black uppercase tracking-widest">Total Clicks</p>
            <p className="text-4xl font-light tracking-tighter mt-1">{totalClicks || 0}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* LEADERBOARD (The "Vercel Top Pages" equivalent) */}
            <div className="lg:col-span-1 space-y-4">
                <div className="flex items-center gap-2 mb-2">
                    <Trophy size={16} className="text-[#00AEEF]" />
                    <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-white">Leaderboard</h2>
                </div>
                <div className="bg-zinc-900/40 border border-white/5 rounded-[2rem] p-6 space-y-4">
                    {topData?.map((item: any, idx: number) => (
                        <div key={item.username} className="flex items-center justify-between group">
                            <div className="flex items-center gap-3">
                                <span className="text-zinc-700 font-black italic text-sm w-4">0{idx + 1}</span>
                                <div>
                                    <p className="text-[11px] font-bold text-white group-hover:text-[#00AEEF] transition-colors">@{item.username}</p>
                                    <p className="text-[9px] text-zinc-500 uppercase tracking-tighter">{item.agent_name}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-xs font-black text-white">{item.view_count}</p>
                                <p className="text-[8px] text-zinc-600 uppercase font-bold tracking-widest">Views</p>
                            </div>
                        </div>
                    ))}
                    {!topData?.length && <p className="text-[10px] text-zinc-600 italic">No traffic recorded yet.</p>}
                </div>
            </div>

            {/* OUTBOUND & AGENT TABLE */}
            <div className="lg:col-span-2 space-y-8">
                <section className="bg-[#00AEEF]/5 border border-[#00AEEF]/20 rounded-[2rem] p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <AlertCircle className="text-[#00AEEF]" size={18} />
                        <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#00AEEF]">Outbound Opportunities</h2>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {profilesMissingAnalytics.map(p => (
                            <div key={p.id} className="bg-black/40 border border-white/10 px-3 py-2 rounded-full flex items-center gap-2 text-[9px] font-bold text-zinc-300">
                                <Mail size={10} className="opacity-40" />
                                {p.username}
                            </div>
                        ))}
                    </div>
                </section>

                <div className="bg-zinc-900/40 border border-white/5 rounded-[2rem] overflow-hidden">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-white/5 border-b border-white/5">
                            <tr>
                                <th className="p-5 text-[9px] font-black uppercase tracking-widest text-zinc-500">Agent Details</th>
                                <th className="p-5 text-[9px] font-black uppercase tracking-widest text-zinc-500">Analytics Setup</th>
                                <th className="p-5 text-[9px] font-black uppercase tracking-widest text-zinc-500 text-right">Preview</th>
                            </tr>
                        </thead>
                        <tbody>
                            {profiles?.map(p => (
                                <tr key={p.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                                    <td className="p-5">
                                        <p className="font-bold text-sm text-white">{p.agent_name || 'Unnamed'}</p>
                                        <p className="text-[10px] text-zinc-600">@{p.username}</p>
                                    </td>
                                    <td className="p-5">
                                        <div className="flex gap-2">
                                            <span className={`px-2 py-1 rounded text-[7px] font-black uppercase tracking-widest ${p.google_analytics_id ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>GA</span>
                                            <span className={`px-2 py-1 rounded text-[7px] font-black uppercase tracking-widest ${p.clarity_id ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>CLARITY</span>
                                        </div>
                                    </td>
                                    <td className="p-5 text-right">
                                        <a href={`/${p.username}`} target="_blank" className="text-[10px] font-black uppercase tracking-widest text-[#00AEEF] hover:text-white transition-all">Visit <ExternalLink size={10} className="inline ml-1" /></a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}