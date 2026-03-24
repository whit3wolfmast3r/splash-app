import React from 'react';
import { 
  Instagram, Facebook, Youtube, Video, Home, ExternalLink, 
  Linkedin, MessageCircle, Phone, Mail, Globe 
} from 'lucide-react';

const SOCIAL_MAP: Record<string, any> = {
  instagram: { icon: Instagram, color: 'hover:text-[#00AEEF]' },
  facebook: { icon: Facebook, color: 'hover:text-[#00AEEF]' },
  tiktok: { icon: Video, color: 'hover:text-[#00AEEF]' },
  youtube: { icon: Youtube, color: 'hover:text-[#00AEEF]' },
  linkedin: { icon: Linkedin, color: 'hover:text-[#00AEEF]' },
  whatsapp: { icon: MessageCircle, color: 'hover:text-[#00AEEF]' },
  zillow: { icon: Home, color: 'hover:text-[#00AEEF]' },
  wechat: { icon: Globe, color: 'hover:text-[#00AEEF]' },
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
    <div className="min-h-screen w-full bg-[#050505] flex justify-center items-center p-0 md:p-4 font-sans overflow-hidden">
      {/* Container Frame - Agent Lynxx Brand */}
      <div className="relative h-screen md:h-[850px] w-full max-w-[430px] flex flex-col items-center text-white shadow-2xl md:rounded-[3.5rem] border-0 md:border-[12px] border-zinc-900 bg-black overflow-hidden">
        
        {/* --- LAYER 1: VIDEO BACKGROUND --- */}
        <div className="absolute inset-0 z-0">
          {profile.video_bg_url && (
            <video autoPlay muted loop playsInline className="w-full h-full object-cover opacity-40">
              <source src={profile.video_bg_url} type="video/mp4" />
            </video>
          )}
          {/* Deep vignette to protect the head area and the footer */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black" />
        </div>

        {/* --- LAYER 2: AGENT CUTOUT (The Fix) --- */}
        <div className="absolute inset-0 z-10 pointer-events-none flex items-end justify-center">
          {profile.avatar_url && (
            <img 
              src={profile.avatar_url} 
              className="w-[130%] max-w-none h-auto object-contain origin-bottom mb-[-5%]" 
              style={{ 
                /* 
                   THE FIX: We only mask the BOTTOM. 
                   This prevents the "Transparent Head" on shorter photos.
                */
                maskImage: 'linear-gradient(to top, transparent 0%, black 25%)', 
                WebkitMaskImage: 'linear-gradient(to top, transparent 0%, black 25%)' 
              }}
              alt="" 
            />
          )}
        </div>

        {/* --- LAYER 3: TOP BRANDING --- */}
        <div className="relative z-30 w-full px-8 pt-12 flex flex-col items-center text-center">
            {profile.company_logo && (
              <img src={profile.company_logo} className="h-10 w-auto object-contain mb-4 filter drop-shadow-md" alt="Brokerage" />
            )}
            <h1 className="text-3xl font-black italic uppercase tracking-tighter text-white drop-shadow-2xl">
              {profile.agent_name}
            </h1>
            
            <div className="flex justify-center gap-5 mt-4">
               {profile.social_links && Object.entries(profile.social_links).slice(0, 4).map(([platform, url]) => {
                 const Config = SOCIAL_MAP[platform];
                 const href = url as string;
                 if (!Config || !href) return null;
                 return (
                   <a key={platform} href={href} target="_blank" rel="noreferrer" className={`transition-all duration-300 text-white/50 ${Config.color}`}>
                     <Config.icon className="w-5 h-5 stroke-[1.5px]" />
                   </a>
                 );
               })}
            </div>
        </div>

        {/* --- LAYER 4: BOTTOM ACTION AREA (The Height Fix) --- */}
        <div className="relative z-30 mt-auto w-full px-8 pb-10 flex flex-col items-center gap-6 bg-gradient-to-t from-black via-black/90 to-transparent pt-20">
            
            {/* CTA Button: Integrated Agent Lynxx Blue as a border/glow */}
            <a 
              href={getCtaHref(profile.cta_url, profile.cta_text)} 
              className="group flex items-center justify-center gap-3 w-full py-5 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl text-lg font-bold hover:bg-white hover:text-black transition-all duration-500 shadow-[0_0_20px_rgba(0,174,239,0.1)] uppercase tracking-widest"
            >
              {profile.cta_text}
              <ExternalLink className="w-4 h-4 opacity-40 group-hover:opacity-100" />
            </a>

            {/* Legal Footer */}
            <div className="flex flex-col items-center gap-4">
               <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/30">
                  NV LIC: {profile.license_number || 'REQUIRED'}
               </span>
               <img 
                 src="/equal-housing.png" 
                 alt="Equal Housing" 
                 className="h-8 w-auto opacity-40 brightness-200"
               />
            </div>
        </div>

      </div>
    </div>
  );
}