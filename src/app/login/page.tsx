import { login, signup } from './actions'

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#050505] p-6 font-sans">
      <div className="w-full max-w-sm space-y-8 bg-zinc-900 p-10 rounded-[2.5rem] border border-zinc-800 shadow-2xl relative overflow-hidden">
        {/* Decorative Blue Glow */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#00AEEF] opacity-10 blur-[80px]" />
        
        <div className="text-center relative z-10">
          <h1 className="text-3xl font-black text-white italic tracking-tighter uppercase">Agent <span className="text-[#00AEEF]">Lynxx</span></h1>
          <p className="text-zinc-500 text-xs mt-2 font-bold uppercase tracking-widest">Partner Portal</p>
        </div>

        <form className="space-y-4 relative z-10">
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-2 ml-1">Email Access</label>
            <input name="email" type="email" required className="w-full bg-black border border-zinc-800 rounded-2xl p-4 text-white focus:outline-none focus:ring-2 focus:ring-[#00AEEF]/50 transition" placeholder="agent@lynxx.com" />
          </div>
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-2 ml-1">Secure Password</label>
            <input name="password" type="password" required className="w-full bg-black border border-zinc-800 rounded-2xl p-4 text-white focus:outline-none focus:ring-2 focus:ring-[#00AEEF]/50 transition" />
          </div>
          
          <div className="flex flex-col gap-3 pt-4">
            <button formAction={login} className="w-full bg-white text-black font-black py-4 rounded-2xl hover:bg-[#00AEEF] hover:text-white transition-all uppercase tracking-widest text-sm">Log In</button>
            <button formAction={signup} className="w-full bg-zinc-800 text-zinc-400 font-bold py-3 rounded-2xl hover:bg-zinc-700 transition text-xs uppercase tracking-widest">Create Account</button>
          </div>
        </form>
      </div>
    </div>
  )
}