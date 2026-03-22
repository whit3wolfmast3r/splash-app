import { Instagram, Facebook, Youtube, Home } from 'lucide-react';

/** 
 * THE SCHEMA (TypeScript Interface)
 * This defines exactly what data a "Profile" must have.
 * This matches your Supabase table structure perfectly.
 */
interface Profile {
  id: string;
  username: string;
  agent_name: string;
  avatar_url: string;
  company_logo_url?: string;
  video_bg_url: string;
  license_number?: string;
  cta_text: string;
  cta_url: string;
  social_links?: any[]; // We can refine this further as we build the social logic
}

export default function SplashPage({ profile }: { profile: Profile }) {
  return (
    <div className="min-h-screen w-full bg-zinc-950 flex justify-center items-center p-4">
      
      {/* Phone Frame: Relative container for all absolute layers */}
      <div className="relative h-[850px] w-full max-w-[390px] overflow-hidden flex flex-col items-center text-white shadow-2xl rounded-[3.5rem] border-[12px] border-zinc-900 bg-black">
        
        {/* LAYER 1: Background (Z-0) */}
        <div className="absolute inset-0 z-0">
          <img 
            src={profile.video_bg_url} 
            className="w-full h-full object-cover opacity-40" 
            alt="background" 
          />
          {/* Bottom-heavy gradient to ensure the legal footer is readable */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black" />
        </div>

        {/* LAYER 2: Avatar with Cut-off Protection (Z-10) */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          <img 
            src={profile.avatar_url} 
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[125%] max-w-none h-auto object-contain origin-bottom" 
            style={{ 
              /* This CSS mask creates the smooth 'fade out' at the bottom of short images */
              WebkitMaskImage: 'linear-gradient(to top, transparent 0%, black 25%)',
              maskImage: 'linear-gradient(to top, transparent 0%, black 25%)'
            }}
            alt="Agent Headshot" 
          />
        </div>

        {/* LAYER 3: Content (Z-20) */}
        <div className="relative z-20 w-full px-8 flex flex-col items-center h-full justify-between py-16">
          
          {/* Top Section: Name & Socials */}
          <div className="flex flex-col items-center gap-4">
            <h1 className="text-4xl font-medium tracking-tight text-center drop-shadow-xl">
              {profile.agent_name}
            </h1>
            
            <div className="flex gap-6">
               <Facebook className="w-7 h-7 cursor-pointer text-white/90 hover:text-blue-500 transition-all active:scale-90" />
               <Instagram className="w-7 h-7 cursor-pointer text-white/90 hover:text-pink-500 transition-all active:scale-90" />
               <Youtube className="w-7 h-7 cursor-pointer text-white/90 hover:text-red-500 transition-all active:scale-90" />
            </div>
          </div>

          {/* Bottom Section: CTA & Legal */}
          {/* We use pb-6 to lift the button slightly off the very bottom */}
          <div className="w-full space-y-6 pb-6">
            <a 
              href={profile.cta_url || '#'} 
              className="block w-full py-4 border border-white/20 rounded-2xl text-center text-xl font-semibold backdrop-blur-3xl bg-black/40 hover:bg-white hover:text-black transition-all duration-500 shadow-2xl"
            >
              {profile.cta_text}
            </a>

            <div className="flex justify-between items-center text-[10px] opacity-50 uppercase tracking-[0.2em] font-bold px-1">
              <span>LICENSE: {profile.license_number || 'REQUIRED'}</span>
              <div className="flex items-center gap-1.5 border border-white/30 px-2 py-1 rounded-md">
                <Home className="w-3 h-3" />
                <span>EQUAL HOUSING</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}