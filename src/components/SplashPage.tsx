import React from 'react';
import { 
  Instagram, Facebook, Youtube, Video, Home, ExternalLink, 
  Linkedin, MessageCircle, Phone, Mail, Globe 
} from 'lucide-react';

const SOCIAL_MAP: Record<string, any> = {
  instagram: { icon: Instagram, color: 'hover:text-pink-500' },
  facebook: { icon: Facebook, color: 'hover:text-blue-500' },
  tiktok: { icon: Video, color: 'hover:text-zinc-400' },
  youtube: { icon: Youtube, color: 'hover:text-red-500' },
  linkedin: { icon: Linkedin, color: 'hover:text-blue-700' },
  whatsapp: { icon: MessageCircle, color: 'hover:text-green-500' },
  zillow: { icon: Home, color: 'hover:text-blue-400' },
  wechat: { icon: Globe, color: 'hover:text-green-400' },
};

export default function SplashPage({ profile }: { profile: any }) {
  
  const getCtaHref = (url: string, text: string) => {
    if (!url) return '#';
    const clean = url.replace(/[-+() ]/g, '');
    if (text === 'Call Me') return `tel:${clean}`;
    if (text === 'Text Me') return `sms:${clean}`;
    if (text === 'Email Me') return `mailto:${url}`;
    return url.startsWith('http') ? url : `https://${url}`;
  };

  return (
    <div className="min-h-screen w-full bg-zinc-950 flex justify-center items-center p-4 font-sans overflow-hidden">
      <div className="relative h-[850px] w-full max-w-[390px] flex flex-col items-center text-white shadow-2xl rounded-[3.5rem] border-[12px] border-zinc-900 bg-black overflow-hidden">
        
        {/* VIDEO ENGINE */}
        <div className="absolute inset-0 z-0">
          {profile.video_bg_url && (
            <video autoPlay muted loop playsInline className="w-full h-full object-cover opacity-40">
              <source src={profile.video_bg_url} type="video/mp4" />
            </video>
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black" />
        </div>

        {/* AGENT CUTOUT */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          {profile.avatar_url && (
            <img 
              src={profile.avatar_url} 
              className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[125%] max-w-none h-auto object-contain origin-bottom" 
              style={{ maskImage: 'linear-gradient(to top, transparent 5%, black 35%)', WebkitMaskImage: 'linear-gradient(to top, transparent 5%, black 35%)' }}
              alt="" 
            />
          )}
        </div>

        <div className="relative z-20 w-full px-8 flex flex-col items-center h-full text-center py-16">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tight drop-shadow-2xl">{profile.agent_name}</h1>
            
            <div className="flex justify-center gap-5">
               {profile.social_links && Object.entries(profile.social_links).slice(0, 4).map(([platform, url]) => {
                 const Config = SOCIAL_MAP[platform];
                 // Fix: Explicitly cast 'url' as string to satisfy TypeScript
                 const href = url as string;
                 if (!Config || !href) return null;
                 return (
                   <a key={platform} href={href} target="_blank" rel="noreferrer" className={`transition-colors text-white/80 ${Config.color}`}>
                     <Config.icon className="w-7 h-7" />
                   </a>
                 );
               })}
            </div>
          </div>

          <div className="mt-auto w-full space-y-6 pb-6">
            <a href={getCtaHref(profile.cta_url, profile.cta_text)} className="flex items-center justify-center gap-2 w-full py-4 border border-white/20 rounded-2xl text-xl font-semibold backdrop-blur-3xl bg-black/40 hover:bg-white hover:text-black transition-all duration-500">
              {profile.cta_text}
              <ExternalLink className="w-5 h-5 opacity-40" />
            </a>

            <div className="flex justify-between items-center px-2">
              <div className="flex items-center gap-3">
                {/* BROKERAGE LOGO */}
                {profile.company_logo && (
                  <img src={profile.company_logo} className="h-6 w-auto object-contain opacity-80" alt="Brokerage" />
                )}
                <span className="text-[9px] opacity-40 uppercase tracking-[0.2em] font-bold">
                  NV LIC: {profile.license_number || 'REQUIRED'}
                </span>
              </div>
              
              {/* EQUAL HOUSING LOGO (JUST THE ICON) */}
              <div className="opacity-40 border border-white/30 p-1 rounded">
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3z"/></svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}