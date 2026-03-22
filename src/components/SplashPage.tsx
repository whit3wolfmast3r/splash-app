import { Instagram, Facebook, Youtube, Home } from 'lucide-react';

/** 
 * THE SCHEMA (TypeScript Interface)
 * This defines exactly what data a "Profile" must have.
 * This matches your Supabase table structure.
 */
interface Profile {
  agent_name: string;
  avatar_url: string;
  video_bg_url: string;
  license_number?: string;
  cta_text: string;
  cta_url: string;
}

export default function SplashPage({ profile }: { profile: Profile }) {
  return (
    // The main container: bg-zinc-950 gives a deep professional dark background
    <div className="min-h-screen w-full bg-zinc-950 flex justify-center items-center p-4">
      
      {/* Phone Frame: This 'max-w-md' makes it look like a phone on a desktop screen */}
      <div className="relative h-[850px] w-full max-w-[390px] overflow-hidden flex flex-col items-center text-white shadow-2xl rounded-[3.5rem] border-[12px] border-zinc-900 bg-black">
        
        {/* LAYER 1: Background Layer (Z-0) */}
        <div className="absolute inset-0 z-0">
          <img 
            src={profile.video_bg_url} 
            className="w-full h-full object-cover opacity-40" 
            alt="background" 
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black" />
        </div>

        {/* LAYER 2: Avatar Layer with Cut-off Protection (Z-10) */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          <img 
            src={profile.avatar_url} 
            /* 
               We use 'bottom-0' to pin them to the floor, 
               and 'w-[120%]' to make them large and immersive.
            */
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[120%] max-w-none h-auto object-contain origin-bottom" 
            style={{ 
              /* This fades the bottom of the image so 'short' photos look intentional */
              WebkitMaskImage: 'linear-gradient(to top, transparent 0%, black 25%)',
              maskImage: 'linear-gradient(to top, transparent 0%, black 25%)'
            }}
            alt="Agent Headshot" 
          />
        </div>

        {/* LAYER 3: Content Layer (Z-20) */}
        <div className="relative z-20 w-full px-8 flex flex-col items-center h-full text-center py-16">
          
          {/* Top Section: Name & Socials */}
          <div className="space-y-4">
            <h1 className="text-4xl font-medium tracking-tight drop-shadow-2xl">
              {profile.agent_name}
            </h1>
            
            <div className="flex justify-center gap-6">
               <Facebook className="w-7 h-7 text-white/90 hover:text-blue-500 transition-colors cursor-pointer" />
               <Instagram className="w-7 h-7 text-white/90 hover:text-pink-500 transition-colors cursor-pointer" />
               <Youtube className="w-7 h-7 text-white/90 hover:text-red-500 transition-colors cursor-pointer" />
            </div>
          </div>

          {/* Bottom Section: CTA & Legal Footer */}
          {/* 'mt-auto' pushes this section to the very bottom */}
          <div className="mt-auto w-full space-y-6 pb-4">
            <a 
              href={profile.cta_url || '#'} 
              className="block w-full py-4 border border-white/20 rounded-2xl text-xl font-semibold backdrop-blur-2xl bg-black/60 hover:bg-white hover:text-black transition-all duration-500 shadow-2xl"
            >
              {profile.cta_text}
            </a>

            <div className="flex justify-between items-center text-[10px] opacity-40 uppercase tracking-[0.2em] font-bold px-1">
              <span>LICENSE: {profile.license_number || 'REQUIRED'}</span>
              <div className="flex items-center gap-1.5 border border-white/30 px-2 py-0.5 rounded">
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