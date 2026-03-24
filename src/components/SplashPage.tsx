'use client'

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
      <div className="relative h-screen md:h-[850px] w-full max-w-[430px] flex flex-col text-white shadow-2xl md:rounded-[3.5rem] border-0 md:border-[12px] border-zinc-900 bg-black overflow-hidden">
        
        {/* --- LAYER 1: VIDEO BACKGROUND --- */}
        <div className="absolute inset-0 z-0">
          {profile.video_bg_url && (
            <video autoPlay muted loop playsInline className="w-full h-full object-cover opacity-30 grayscale-[0.5]">
              <source src={profile.video_bg_url} type="video/mp4" />
            </video>
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-transparent to-black" />
        </div>

        {/* --- LAYER 2: THE AGENT (ABSOLUTE BOTTOM) --- */}
        <div className="absolute inset-0 z-10 pointer-events-none flex items-end justify-center">
          {profile.avatar_url && (
            <img 
              src={profile.avatar_url} 
              className="w-[140%] h-auto max-h-[85vh] object-contain object-bottom mb-[-2px]" 
              style={{ 
                maskImage: 'linear-gradient(to top, transparent 0%, black 15%)', 
                WebkitMaskImage: 'linear-gradient(to top, transparent 0%, black 15%)' 
              }}
              alt="" 
            />
          )}
        </div>

        {/* --- LAYER 3: HEADER (TOP) --- */}
        <div className="relative z-30 w-full px-8 pt-12 flex flex-col items-center text-center">
            {profile.company_logo && (
              <img src={profile.company_logo} className="h-10 w-auto object-contain mb-6 filter drop-shadow-lg" alt="Brokerage" />
            )}
            
            <h1 className="text-4xl font-black italic uppercase tracking-tighter text-white drop-shadow-2xl leading-none">
              {profile.agent_name}
            </h1>
            
            <div className="flex justify-center gap-6 mt-6">
               {profile.social_links && Object.entries(profile.social_links).slice(0, 4).map(([platform, url]) => {
                 const Config = SOCIAL_MAP[platform];
                 const href = url as string;
                 if (!Config || !href) return null;
                 return (
                   <a key={platform} href={href} target="_blank" rel="noreferrer" className="transition-all duration-300 text-white/40 hover:text-[#00AEEF] hover:scale-110">
                     <Config.icon className="w-6 h-6 stroke-[1.5px]" />
                   </a>
                 );
               })}
            </div>
        </div>

        {/* --- LAYER 4: THE DOCK (OVER AGENT) --- */}
        <div className="relative z-30 mt-auto w-full px-8 pb-10 pt-24 bg-gradient-to-t from-black via-black/80 to-transparent flex flex-col items-center gap-8">
            
            <a 
              href={getCtaHref(profile.cta_url, profile.cta_text)} 
              className="group flex items-center justify-center gap-3 w-full py-5 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl text-lg font-bold hover:bg-white hover:text-black transition-all duration-500 shadow-[0_0_30px_rgba(0,174,239,0.1)] uppercase tracking-widest"
            >
              {profile.cta_text}
              <ExternalLink className="w-4 h-4 opacity-40 group-hover:opacity-100" />
            </a>

            {/* Legal Footer */}
            <div className="flex flex-col items-center gap-4">
               <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/20 whitespace-nowrap">
                  NV LIC: {profile.license_number || 'REQUIRED'}
               </span>
               <div className="flex items-center gap-6 opacity-30 grayscale brightness-200">
                  <img src="/equal-housing.png" alt="Equal Housing" className="h-8 w-auto" />
                  <img src="/lynxx-logo.png" alt="Agent Lynxx" className="h-8 w-auto" />
               </div>
            </div>
        </div>

      </div>
    </div>
  );
}