import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import DashboardForm from '@/components/DashboardForm'

export default async function DashboardPage() {
  try {
    const supabase = await createClient()

    // 1. Get User
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) redirect('/login')

    // 2. Get Profile - Use maybeSingle() to prevent crashing if no row exists
    const { data: profile, error: dbError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .maybeSingle()

    if (dbError) throw new Error(dbError.message)

    // 3. Handle Missing Profile
    if (!profile) {
      return (
        <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-6 text-center">
          <div className="max-w-sm">
            <h1 className="text-white text-xl font-bold mb-4">Profile Not Found</h1>
            <p className="text-zinc-400 mb-6 text-sm">We couldn't find your agent profile in the database.</p>
            <a href="/login" className="text-white underline font-bold">Log out and try again</a>
          </div>
        </div>
      )
    }

    // 4. Clean the data before passing it to the Form
    const safeProfile = {
      ...profile,
      username: profile.username || '',
      agent_name: profile.agent_name || 'New Agent',
      avatar_url: (profile.avatar_url === 'EMPTY' || !profile.avatar_url) ? '' : profile.avatar_url,
      social_links: (profile.social_links && !Array.isArray(profile.social_links)) ? profile.social_links : {},
      cta_text: profile.cta_text || 'Book Consultation',
      cta_url: profile.cta_url || ''
    }

    return (
      <div className="min-h-screen bg-zinc-50 p-4 md:p-8 font-sans">
        <div className="max-w-2xl mx-auto">
          <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
            <div>
              <h1 className="text-3xl font-bold text-zinc-900 tracking-tight italic">Splash Admin</h1>
              <p className="text-zinc-500 text-sm">Editing: <span className="font-bold">@{safeProfile.username}</span></p>
            </div>
            <a 
              href={`/${safeProfile.username}`} 
              target="_blank" 
              className="px-6 py-2 bg-white border border-zinc-200 rounded-full text-sm font-bold shadow-sm hover:bg-zinc-50 transition"
            >
              View Live Page
            </a>
          </header>

          <div className="bg-white rounded-[2.5rem] shadow-sm border border-zinc-200 p-6 md:p-10">
             <DashboardForm profile={safeProfile} />
          </div>
        </div>
      </div>
    )
  } catch (error: any) {
    return (
      <div className="p-10 bg-black text-red-500 min-h-screen font-mono text-sm">
        <h1 className="text-xl font-bold mb-4">Critical Load Error</h1>
        <p>{error.message}</p>
      </div>
    )
  }
}