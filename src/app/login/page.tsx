import { login, signup } from './actions'

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#050505] p-6 font-sans">
      <div className="w-full max-w-sm space-y-10 bg-zinc-900/50 p-10 rounded-[3rem] border border-zinc-800 backdrop-blur-xl shadow-2xl relative overflow-hidden">
        
        <div className="flex flex-col items-center text-center relative z-10">
          <img src="/lynxx-logo.png" className="w-16 h-16 mb-6 drop-shadow-[0_0_15px_rgba(0,174,239,0.3)]" alt="Lynxx" />
          <h1 className="text-2xl font-black text-white italic tracking-tighter uppercase">
            agent <span className="text-[#00AEEF]">lynxx</span>
          </h1>
          <p className="text-zinc-500 text-[10px] mt-2 font-bold uppercase tracking-[0.3em]">Partner Portal</p>
        </div>

        <form className="space-y-4 relative z-10">
          <div className="space-y-2">
            <label className="block text-[10px] font-bold uppercase tracking-widest text-zinc-500 ml-2">Email Access</label>
            <input name="email" type="email" required className="w-full bg-black/50 border border-zinc-800 rounded-2xl p-4 text-white focus:outline-none focus:ring-2 focus:ring-[#00AEEF]/50 transition placeholder:text-zinc-700" placeholder="agent@lynxx.com" />
          </div>
          <div className="space-y-2">
            <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-2">Password</label>
            <input name="password" type="password" required className="w-full bg-black/50 border border-zinc-800 rounded-2xl p-4 text-white focus:outline-none focus:ring-2 focus:ring-[#00AEEF]/50 transition" />
          </div>
          
          <div className="flex flex-col gap-3 pt-6">
            <button formAction={login} className="w-full bg-white text-black font-black py-5 rounded-2xl hover:bg-[#00AEEF] hover:text-white transition-all uppercase tracking-widest text-sm shadow-xl active:scale-95">Log In</button>
            <button formAction={signup} className="w-full text-zinc-500 font-bold py-3 rounded-2xl hover:text-white transition text-[10px] uppercase tracking-widest">Create Partner Account</button>
          </div>
        </form>
      </div>
    </div>
  )
}