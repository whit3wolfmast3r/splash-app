import { login, signup } from './actions'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; message?: string }>
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  // If already logged in, don't show the login page
  if (user) redirect('/dashboard')

  const params = await searchParams;

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#050505] p-6 font-sans relative overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#00AEEF] opacity-[0.03] blur-[120px] pointer-events-none" />

      <div className="w-full max-w-sm space-y-8 bg-zinc-900/40 p-10 rounded-[2.5rem] border border-white/5 backdrop-blur-2xl shadow-2xl relative z-10">
        
        {/* BRANDING */}
        <div className="flex flex-col items-center text-center">
          <img 
            src="/lynxx-logo.png" 
            className="w-14 h-14 mb-4 drop-shadow-[0_0_15px_rgba(0,174,239,0.4)]" 
            alt="Lynxx" 
          />
          <h1 className="text-2xl font-light tracking-tighter text-white lowercase">
              agent <span className="font-black uppercase tracking-[0.2em] text-[#00AEEF] italic">Lynxx</span>
          </h1>
          <p className="text-zinc-500 text-[9px] mt-2 font-bold uppercase tracking-[0.4em]">Professional Portal</p>
        </div>

        {/* FEEDBACK MESSAGES */}
        <div className="space-y-3">
            {params.error && (
                <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] font-bold uppercase tracking-widest text-center">
                    {params.error}
                </div>
            )}
            {params.message && (
                <div className="p-3 rounded-xl bg-[#00AEEF]/10 border border-[#00AEEF]/20 text-[#00AEEF] text-[10px] font-bold uppercase tracking-widest text-center">
                    {params.message}
                </div>
            )}
        </div>

        <form className="space-y-4">
          <div className="space-y-1.5">
            <label className="block text-[9px] font-black uppercase tracking-[0.2em] text-zinc-500 ml-3">Email Access</label>
            <input 
                name="email" 
                type="email" 
                required 
                className="w-full bg-black/40 border border-white/5 rounded-2xl p-4 text-white focus:outline-none focus:ring-1 focus:ring-[#00AEEF]/50 transition placeholder:text-zinc-800" 
                placeholder="agent@lynxx.com" 
            />
          </div>
          <div className="space-y-1.5">
            <label className="block text-[9px] font-black uppercase tracking-[0.2em] text-zinc-500 ml-3">Password</label>
            <input 
                name="password" 
                type="password" 
                required 
                className="w-full bg-black/40 border border-white/5 rounded-2xl p-4 text-white focus:outline-none focus:ring-1 focus:ring-[#00AEEF]/50 transition" 
            />
          </div>
          
          <div className="flex flex-col gap-3 pt-4">
            <button 
                formAction={login} 
                className="w-full bg-white text-black font-black py-4 rounded-2xl hover:bg-[#00AEEF] hover:text-white transition-all uppercase tracking-widest text-xs shadow-xl active:scale-95"
            >
                Log In
            </button>
            
            <div className="relative py-2">
                <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-white/5"></span></div>
                <div className="relative flex justify-center text-[8px] uppercase tracking-widest font-bold text-zinc-600 bg-transparent px-2">
                    <span className="bg-[#121214] px-2">New Professional?</span>
                </div>
            </div>

            <button 
                formAction={signup} 
                className="w-full bg-transparent border border-white/10 text-white font-black py-4 rounded-2xl hover:border-[#00AEEF] hover:text-[#00AEEF] transition-all uppercase tracking-widest text-xs active:scale-95"
            >
                Join Agent Lynxx
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}