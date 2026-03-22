import React from 'react';
import { 
  Instagram, 
  Facebook, 
  Youtube, 
  Video, 
  Home,
  ExternalLink 
} from 'lucide-react';

interface Profile {
  agent_name: string;
  avatar_url: string;
  video_bg_url: string;
  license_number?: string;
  cta_text: string;
  cta_url: string;
  social_links?: Record<string, string>;
  company_logo?: string;
}

const SOCIAL_MAP: Record<string, any> = {
  instagram: { icon: Instagram, color: 'hover:text-pink-500' },
  facebook: { icon: Facebook, color: 'hover:text-blue-500' },
  youtube: { icon: Youtube, color: 'hover:text-red-500' },
  tiktok: { icon: Video, color: 'hover:text-zinc-400' },
};

export default function SplashPage({ profile }: { profile: Profile }) {
  const getCtaHref = (url: string) => {
    if (!url) return '#';
    if (url.includes('@')) return `mailto:${url}`;
    if (/^\d+$/.test(url.replace(/[-+() ]/g, ''))) return `tel:${url}`;
    return url.startsWith('http') ? url : `https://${url}`;
  };

  return (
    <div className="min-h-screen w-full bg-zinc-950 flex justify-center items-center p-4 font-sans selection:bg-white/20">
      <div className="relative h-[850px] w-full max-w-[390px] overflow-hidden flex flex-col items-center text-white shadow-2xl rounded-[3.5rem] border-[12px] border-zinc-900 bg-black">
        
        {/* VIDEO BACKGROUND */}
        <div className="absolute inset-0 z-0">
          <video autoPlay muted loop playsInline className="w-full h-full object-cover opacity-50">
            <source src={profile.video_bg_url} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black" />
        </div>

        {/* AGENT CUTOUT */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          {profile.avatar_url && (
            <img 
              src={profile.avatar_url} 
              className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[125%] max-w-none h-auto object-contain origin-bottom" 
              style={{ 
                WebkitMaskImage: 'linear-gradient(to top, transparent 5%, black 35%)',
                maskImage: 'linear-gradient(to top, transparent 5%, black 35%)'
              }}
              alt="" // Empty alt prevents the "text at bottom" bug if image fails
            />
          )}
        </div>

        {/* CONTENT LAYER */}
        <div className="relative z-20 w-full px-8 flex flex-col items-center h-full text-center py-16">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tight drop-shadow-2xl">{profile.agent_name}</h1>
            <div className="flex justify-center gap-6">
               {profile.social_links && Object.entries(profile.social_links).map(([platform, url]) => {
                 if (!url) return null;
                 const Config = SOCIAL_MAP[platform.toLowerCase()];
                 if (!Config) return null;
                 return (
                   <a key={platform} href={url} target="_blank" rel="noreferrer" className={`transition-colors text-white/80 ${Config.color}`}>
                     <Config.icon className="w-7 h-7" />
                   </a>
                 );
               })}
            </div>
          </div>

          <div className="mt-auto w-full space-y-6 pb-4">
            <a href={getCtaHref(profile.cta_url)} target="_blank" rel="noreferrer" className="group flex items-center justify-center gap-2 w-full py-4 border border-white/20 rounded-2xl text-xl font-semibold backdrop-blur-2xl bg-black/40 hover:bg-white hover:text-black transition-all duration-500">
              {profile.cta_text}
              <ExternalLink className="w-5 h-5 opacity-50" />
            </a>

            <div className="flex justify-between items-center text-[10px] opacity-60 uppercase tracking-[0.2em] font-bold px-1">
              <div className="flex items-center gap-2">
                {profile.company_logo && <img src={profile.company_logo} alt="" className="h-4" />}
                <span>NV LIC: {profile.license_number || 'REQUIRED'}</span>
              </div>
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