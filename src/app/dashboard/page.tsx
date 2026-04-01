import { createClient } from '@/utils/supabase/server'
import DashboardForm from '@/components/DashboardForm'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  // IMPORTANT: No redirect here. Middleware handles it.
  if (!user) return null;

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  if (!profile) return <div>Profile not found. Please contact support.</div>

  const [viewRes, clickRes] = await Promise.all([
    supabase.from('analytics').select('*', { count: 'exact', head: true }).eq('profile_id', user.id).eq('event_type', 'view'),
    supabase.from('analytics').select('*', { count: 'exact', head: true }).eq('profile_id', user.id).eq('event_type', 'click')
  ])

  return (
    <div className="min-h-screen bg-[#050505] relative overflow-hidden font-sans">
      <div className="absolute inset-0 opacity-50 pointer-events-none" style={{ backgroundImage: `url('/lynxx-dashboard-bg.svg')`, backgroundSize: '350px', backgroundRepeat: 'repeat', backgroundPosition: 'center' }} />
      <div className="relative z-10 max-w-4xl mx-auto p-4 md:p-12">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div className="drop-shadow-2xl">
            <h1 className="text-3xl font-light tracking-tighter text-white lowercase">
              agent <span className="font-black uppercase tracking-[0.2em] text-[#00AEEF] italic">Lynxx</span>
              <span className="ml-2 text-[10px] font-bold uppercase tracking-widest text-zinc-500 not-italic border border-zinc-800 px-2 py-1 rounded">Admin</span>
            </h1>
            <p className="text-[#00AEEF] text-[10px] font-bold uppercase tracking-[0.3em] mt-2">Editing: <span className="text-white">@{profile.username}</span></p>
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <a href={`/${profile.username}`} target="_blank" className="flex-1 md:flex-none text-center px-6 py-3 bg-white text-black rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-[#00AEEF] hover:text-white transition-all shadow-xl">View Live Page</a>
            <form action="/auth/signout" method="post" className="flex-1 md:flex-none"><button className="w-full px-6 py-3 bg-zinc-900 text-zinc-400 rounded-full text-[10px] font-black uppercase tracking-widest border border-zinc-800 hover:bg-red-950 hover:text-red-500 transition-all">Sign Out</button></form>
          </div>
        </header>
        <DashboardForm profile={profile} viewCount={viewRes.count || 0} clickCount={clickRes.count || 0} />
      </div>
    </div>
  )
}