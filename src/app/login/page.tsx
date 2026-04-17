import { login, signup } from './actions'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { Zap, LogIn, Mail } from 'lucide-react'

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ error?: string; status?: string }> }) {
  const supabase = await createClient(); const { data: { user } } = await supabase.auth.getUser()
  if (user) redirect('/dashboard')

  const params = await searchParams;

  if (params.status === 'verify-sent') {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#050505] p-6 text-center">
        <div className="w-full max-w-sm space-y-8 bg-zinc-900/40 p-12 rounded-[3rem] border border-[#00AEEF]/20 backdrop-blur-2xl shadow-2xl">
          <div className="flex justify-center"><div className="bg-[#00AEEF]/10 p-4 rounded-full"><Mail className="text-[#00AEEF]" size={40} /></div></div>
          <h2 className="text-2xl font-black italic uppercase text-white tracking-tighter">Check Your Email</h2>
          <p className="text-zinc-400 text-sm">We sent a verification link. Click it to activate your **AgentLynxx Link** and start tracking your audience.</p>
          <a href="/login" className="block text-[#00AEEF] text-[10px] font-black uppercase tracking-widest border-t border-white/5 pt-8">Back to Sign In</a>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#050505] p-6 font-sans relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#00AEEF] opacity-[0.05] blur-[120px] pointer-events-none" />
      
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8 items-center relative z-10">
        
        {/* LEFT SIDE: SIGN UP (The "Hook") */}
        <div className="bg-zinc-900/40 p-10 rounded-[3rem] border border-white/5 backdrop-blur-2xl shadow-2xl space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
                <Zap size={16} className="text-[#00AEEF]" />
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#00AEEF]">New Professionls</span>
            </div>
            <h2 className="text-3xl font-black text-white italic uppercase tracking-tighter">Claim Your Link</h2>
            <p className="text-zinc-500 text-sm mt-2">Own your audience, not just your links.</p>
          </div>
          <form className="space-y-4">
            <input name="email" type="email" required className="w-full bg-black border border-white/10 rounded-2xl p-4 text-white outline-none focus:ring-1 focus:ring-[#00AEEF]" placeholder="agent@realty.com" />
            <input name="password" type="password" required className="w-full bg-black border border-white/10 rounded-2xl p-4 text-white outline-none focus:ring-1 focus:ring-[#00AEEF]" placeholder="Create Password" />
            <button formAction={signup} className="w-full bg-[#00AEEF] text-black font-black py-4.5 rounded-2xl hover:brightness-110 transition-all uppercase tracking-widest text-[11px]">Start Free Trial</button>
          </form>
        </div>

        {/* RIGHT SIDE: SIGN IN (The "Control Center") */}
        <div className="p-10 space-y-6">
          <div className="text-center md:text-left">
            <img src="/lynxx-logo.png" className="w-12 h-12 mb-4 mx-auto md:mx-0 drop-shadow-xl" alt="Lynxx" />
            <h2 className="text-xl font-bold text-white uppercase tracking-widest">Control Center</h2>
            <p className="text-zinc-500 text-xs">Welcome back, login to manage your identity.</p>
          </div>
          <form className="space-y-4">
            <input name="email" type="email" required className="w-full bg-white/5 border border-white/5 rounded-2xl p-4 text-white outline-none" placeholder="Email" />
            <input name="password" type="password" required className="w-full bg-white/5 border border-white/5 rounded-2xl p-4 text-white outline-none" placeholder="Password" />
            <button formAction={login} className="w-full bg-white text-black font-black py-4.5 rounded-2xl hover:bg-[#00AEEF] hover:text-white transition-all uppercase tracking-widest text-[10px]">Sign In</button>
          </form>
        </div>

      </div>
    </div>
  )
}