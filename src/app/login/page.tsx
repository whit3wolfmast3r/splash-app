export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-950 p-6 font-sans">
      <div className="w-full max-w-sm space-y-8 bg-zinc-900 p-8 rounded-3xl border border-zinc-800 shadow-2xl">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white tracking-tight">Splash Admin</h1>
          <p className="text-zinc-400 text-sm mt-2 font-medium">Manage your real estate splash page</p>
        </div>

        <form className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">Email Address</label>
            <input 
              name="email" 
              type="email" 
              required 
              className="w-full bg-black border border-zinc-800 rounded-xl p-3 text-white focus:outline-none focus:ring-2 focus:ring-white/20 transition"
              placeholder="agent@brokerage.com"
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">Password</label>
            <input 
              name="password" 
              type="password" 
              required 
              className="w-full bg-black border border-zinc-800 rounded-xl p-3 text-white focus:outline-none focus:ring-2 focus:ring-white/20 transition"
            />
          </div>
          
          <div className="flex gap-4 pt-4">
            {/* These buttons don't do anything yet, we are just checking the UI */}
            <button type="button" className="flex-1 bg-white text-black font-bold py-3 rounded-xl hover:bg-zinc-200 transition text-sm">Log In</button>
            <button type="button" className="flex-1 bg-zinc-800 text-white font-bold py-3 rounded-xl hover:bg-zinc-700 transition text-sm">Sign Up</button>
          </div>
        </form>
      </div>
    </div>
  )
}