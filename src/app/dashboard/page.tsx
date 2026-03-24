import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#050505] flex flex-col items-center justify-center p-6 text-center font-sans">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#00AEEF] opacity-5 blur-[120px]" />
      </div>

      <h1 className="text-6xl md:text-8xl font-black italic uppercase tracking-tighter text-white mb-4">
        Agent <span className="text-[#00AEEF]">Lynxx</span>
      </h1>
      <p className="text-zinc-400 text-lg md:text-xl max-w-md mb-12 font-medium">
        The ultimate luxury digital business card for modern real estate professionals.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-sm">
        <Link 
          href="/login" 
          className="flex-1 bg-white text-black font-black py-5 rounded-2xl hover:bg-[#00AEEF] hover:text-white transition-all uppercase tracking-widest shadow-2xl"
        >
          Get Started
        </Link>
        <Link 
          href="/test" 
          className="flex-1 bg-zinc-900 text-white border border-zinc-800 font-bold py-5 rounded-2xl hover:bg-zinc-800 transition-all uppercase tracking-widest text-sm"
        >
          View Demo
        </Link>
      </div>

      <footer className="absolute bottom-8 text-zinc-600 text-[10px] uppercase tracking-[0.3em] font-bold">
        © 2024 Agent Lynxx Media Group
      </footer>
    </main>
  );
}