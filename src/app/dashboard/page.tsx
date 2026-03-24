import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import DashboardForm from '@/components/DashboardForm'

export default async function DashboardPage() {
  try {
    const supabase = await createClient()

    // 1. Get User
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) redirect('/login')

    // 2. Get Profile
    const { data: profile, error: dbError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .maybeSingle()

    if (dbError) throw new Error(dbError.message)

    // 3. If profile is missing (SQL trigger didn't run)
    if (!profile) {
      return (
        <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6 text-center">
          <div className="max-w-sm text-white">
            <h1 className="text-xl font-black italic uppercase tracking-tighter">Profile Not Found</h1>
            <p className="text-zinc-400 mb-6 text-sm mt-2">We couldn't locate your agent record.</p>
            <a href="/login" className="text-[#00AEEF] underline font-bold uppercase tracking-widest text-xs">Log out and try again</a>
          </div>
        </div>
      )
    }

    // 4. Prepare Safe Data
    const safeProfile = {
      ...profile,
      username: profile.username || '',
      agent_name: profile.agent_name || 'New Agent',
      avatar_url: (profile.avatar_url === 'EMPTY' || !profile.avatar_url) ? '' : profile.avatar_url,
      social_links: (profile.social_links && !Array.isArray(profile.social_links)) ? profile.social_links : {},
    }

    return (
      <div className="min-h-screen bg-zinc-50 p-4 md:p-12 font-sans">
        <div className="max-w-2xl mx-auto">
          <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
            <div>
              <h1 className="text-3xl font-black text-zinc-900 tracking-tighter italic uppercase">
                agent <span className="text-[#00AEEF] normal-case">Lynxx</span> <span className="text-zinc-300 ml-2 not-italic">Admin</span>
              </h1>
              <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest mt-1">
                Editing page for @{safeProfile.username}
              </p>
            </div>
            <a 
              href={`/${safeProfile.username}`} 
              target="_blank" 
              className="px-8 py-3 bg-white border border-zinc-200 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-sm hover:bg-zinc-50 transition active:scale-95"
            >
              View Live Page
            </a>
          </header>

          <div className="bg-white rounded-[3rem] shadow-2xl shadow-zinc-200/50 border border-zinc-100 p-6 md:p-12">
             <DashboardForm profile={safeProfile} />
          </div>
          
          <footer className="mt-12 text-center">
            <p className="text-zinc-300 text-[9px] font-bold uppercase tracking-[0.3em]">
              Connected as {user.email}
            </p>
          </footer>
        </div>
      </div>
    )
  } catch (error: any) {
    return (
      <div className="p-10 bg-black text-red-500 min-h-screen font-mono text-xs">
        <h1 className="text-lg font-bold mb-2 uppercase">System Load Error</h1>
        <p>{error.message}</p>
      </div>
    )
  }
}