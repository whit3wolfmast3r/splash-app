import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#050505] flex flex-col items-center justify-center p-6 text-center font-sans relative overflow-hidden">
      
      {/* Ambient Background Decor */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#00AEEF] opacity-[0.03] blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-2xl space-y-6">
        {/* CORRECTED BRANDING: Lowercase and No 'AGENT' in caps */}
        <h1 className="text-6xl md:text-8xl font-black italic tracking-tighter text-white lowercase">
          agent <span className="text-[#00AEEF]">lynxx</span>
        </h1>
        
        {/* NEW SLOGAN: Real Estate Marketing, Decoded */}
        <div className="space-y-2">
            <h2 className="text-xl md:text-2xl font-bold text-white uppercase tracking-[0.3em]">
                Links That Work
            </h2>
            <p className="text-zinc-500 text-lg md:text-xl font-medium tracking-tight">
                Own your audience, not just your links.
            </p>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row gap-4 w-full max-w-sm mx-auto">
          <Link 
            href="/login" 
            className="flex-1 bg-white text-black font-black py-5 rounded-2xl hover:bg-[#00AEEF] hover:text-white transition-all uppercase tracking-widest shadow-2xl active:scale-95"
          >
            Claim Your Link
          </Link>
        </div>
        
        <p className="text-zinc-700 text-[10px] font-black uppercase tracking-[0.5em] pt-12">
            Real Estate Marketing, Decoded.
        </p>
      </div>
    </main>
  );
}