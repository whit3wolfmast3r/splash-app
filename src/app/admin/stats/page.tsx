import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { Users, MousePointer2, Eye, BarChart, AlertCircle, ExternalLink, Mail } from 'lucide-react'

export default async function AdminStatsPage() {
  const supabase = await createClient()
  
  // 1. Get the current logged-in user
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  // 2. Security Check: Fetch their profile and check 'is_admin' flag
  const { data: profile } = await supabase
    .from('profiles')
    .select('is_admin')
    .eq('id', user.id)
    .single()

  // 3. The "Bouncer": If they aren't a database-verified admin, kick them to their own dashboard
  if (!profile?.is_admin) {
    redirect('/dashboard')
  }

  // --- EVERYTHING BELOW IS SECURE ---
  
  const { data: profiles } = await supabase.from('profiles').select('*').order('created_at', { ascending: false })
  const { count: totalViews } = await supabase.from('analytics').select('*', { count: 'exact', head: true }).eq('event_type', 'view')
  const { count: totalClicks } = await supabase.from('analytics').select('*', { count: 'exact', head: true }).eq('event_type', 'click')

  const profilesMissingAnalytics = profiles?.filter(p => !p.google_analytics_id || !p.clarity_id) || []

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans p-6 md:p-12 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: `url('/lynxx-dashboard-bg.svg')`, backgroundSize: '400px' }} />

      <div className="relative z-10 max-w-6xl mx-auto space-y-10">
        
        <div className="flex flex-col md:flex-row justify-between items-end gap-4 border-b border-white/5 pb-8">
          <div>
            <h1 className="text-4xl font-black italic uppercase tracking-tighter">
                Platform <span className="text-[#00AEEF]">Intelligence</span>
            </h1>
            <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-[0.4em] mt-2">Authorized Developer Access Only</p>
          </div>
          <div className="bg-zinc-900 border border-white/5 px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                Admin: <span className="text-[#00AEEF]">{user.email}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
            <Users className="text-[#00AEEF] mb-4" size={24} />
            <p className="text-zinc-500 text-[10px] font-black uppercase tracking-widest">Total Professionals</p>
            <p className="text-5xl font-light tracking-tighter mt-1">{profiles?.length || 0}</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
            <Eye className="text-white/40 mb-4" size={24} />
            <p className="text-zinc-500 text-[10px] font-black uppercase tracking-widest">Global Views</p>
            <p className="text-5xl font-light tracking-tighter mt-1">{totalViews || 0}</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
            <MousePointer2 className="text-[#00AEEF] mb-4" size={24} />
            <p className="text-zinc-500 text-[10px] font-black uppercase tracking-widest">Global Clicks</p>
            <p className="text-5xl font-light tracking-tighter mt-1">{totalClicks || 0}</p>
          </div>
        </div>

        <section className="bg-[#00AEEF]/5 border border-[#00AEEF]/20 rounded-[2.5rem] p-8">
            <div className="flex items-center gap-3 mb-6">
                <AlertCircle className="text-[#00AEEF]" size={20} />
                <h2 className="text-[12px] font-black uppercase tracking-[0.3em] text-[#00AEEF]">Outbound Opportunities</h2>
            </div>
            <div className="flex flex-wrap gap-2">
                {profilesMissingAnalytics.map(p => (
                    <div key={p.id} className="bg-black/40 border border-white/10 px-4 py-2 rounded-full flex items-center gap-2 text-[10px] font-bold text-zinc-300">
                        <Mail size={12} className="opacity-40" />
                        {p.username}
                    </div>
                ))}
            </div>
        </section>

        <div className="bg-zinc-900/40 border border-white/5 rounded-[2.5rem] overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5 bg-white/5">
                <th className="p-6 text-[10px] font-black uppercase tracking-widest text-zinc-500">Agent</th>
                <th className="p-6 text-[10px] font-black uppercase tracking-widest text-zinc-500">Status</th>
                <th className="p-6 text-[10px] font-black uppercase tracking-widest text-zinc-500 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {profiles?.map(p => (
                <tr key={p.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                  <td className="p-6">
                    <p className="font-bold text-sm">{p.agent_name || 'Unnamed'}</p>
                    <p className="text-[10px] text-zinc-500">@{p.username}</p>
                  </td>
                  <td className="p-6">
                    <div className="flex gap-2">
                        <span className={`px-2 py-1 rounded text-[8px] font-black uppercase tracking-widest ${p.google_analytics_id ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>GA</span>
                        <span className={`px-2 py-1 rounded text-[8px] font-black uppercase tracking-widest ${p.clarity_id ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>CLARITY</span>
                    </div>
                  </td>
                  <td className="p-6 text-right">
                    <a href={`/${p.username}`} target="_blank" className="text-[10px] font-black uppercase tracking-widest text-[#00AEEF]">Visit</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}