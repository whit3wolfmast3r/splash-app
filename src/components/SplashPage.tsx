'use client'

import React, { useState } from 'react';
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
  const [ratio, setRatio] = useState(1);

  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const { naturalWidth, naturalHeight } = e.currentTarget;
    setRatio(naturalHeight / naturalWidth);
  };
  
  const getCtaHref = (url: string, text: string) => {
    if (!url) return '#';
    const clean = url.replace(/[-+() ]/g, '');
    if (text === 'Call Me') return `tel:${clean}`;
    if (text === 'Text Me') return `sms:${clean}`;
    if (text === 'Email Me') return `mailto:${url}`;
    return url.startsWith('http') ? url : `https://${url}`;
  };

  const isTall = ratio > 1.3;

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

        {/* --- LAYER 2: HEADER (HARD CEILING) --- */}
        {/* We use z-30 and a solid-ish background to ensure the photo stays behind or below */}
        <div className="relative z-30 flex-none w-full px-8 pt-12 pb-6 flex flex-col items-center text-center bg-gradient-to-b from-black via-black/40 to-transparent">
            {profile.company_logo && (
              <img src={profile.company_logo} className="h-10 w-auto object-contain mb-6 filter drop-shadow-lg" alt="Brokerage" />
            )}
            
            <h1 className="text-3xl font-light uppercase tracking-[0.2em] text-white drop-shadow-2xl mb-6">
              {profile.agent_name}
            </h1>
            
            <div className="flex justify-center gap-6">
               {profile.social_links && Object.entries(profile.social_links).slice(0, 4).map(([platform, url]) => {
                 const Config = SOCIAL_MAP[platform];
                 const href = url as string;
                 if (!Config || !href) return null;
                 return (
                   <a key={platform} href={href} target="_blank" rel="noreferrer" className="transition-all duration-300 text-white/40 hover:text-[#00AEEF]">
                     <Config.icon className="w-6 h-6 stroke-[1.2px]" />
                   </a>
                 );
               })}
            </div>
        </div>

        {/* --- LAYER 3: THE STAGE (DYNAMIC AVATAR) --- */}
        <div className="relative z-10 flex-1 w-full flex items-end justify-center overflow-hidden">
          {profile.avatar_url && (
            <img 
              src={profile.avatar_url} 
              onLoad={handleImageLoad}
              className={`
                max-w-none transition-all duration-1000 origin-bottom
                ${isTall ? "w-[140%] mb-[-20px]" : "w-[110%] h-[90%] object-contain object-bottom mb-[-10px]"}
              `}
              style={{ 
                maskImage: 'linear-gradient(to top, transparent 0%, black 10%)', 
                WebkitMaskImage: 'linear-gradient(to top, transparent 0%, black 10%)' 
              }}
              alt="" 
            />
          )}
        </div>

        {/* --- LAYER 4: THE DOCK (ACTION & BRANDING) --- */}
        <div className="relative z-30 flex-none w-full px-8 pb-8 pt-10 bg-gradient-to-t from-black via-black/90 to-transparent flex flex-col items-center gap-8">
            
            <a 
              href={getCtaHref(profile.cta_url, profile.cta_text)} 
              className="group flex items-center justify-center gap-3 w-full py-5 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl text-lg font-bold hover:bg-white hover:text-black transition-all duration-500 shadow-[0_0_30px_rgba(0,174,239,0.1)] uppercase tracking-widest"
            >
              {profile.cta_text}
              <ExternalLink className="w-4 h-4 opacity-40 group-hover:opacity-100" />
            </a>

            {/* Legal & Brand Footer */}
            <div className="flex flex-col items-center gap-6">
               <span className="text-[10px] font-medium uppercase tracking-[0.4em] text-white/20">
                  NV LIC: {profile.license_number || 'REQUIRED'}
               </span>
               
               <div className="flex items-center gap-8">
                  <img src="/equal-housing.png" alt="Equal Housing" className="h-6 w-auto opacity-20 grayscale brightness-200" />
                  
                  {/* agent Lynxx Branding - Matches Logo Style */}
                  <div className="flex items-center gap-2 select-none">
                    <img src="/lynxx-logo.png" className="h-5 w-auto opacity-40 grayscale" alt="" />
                    <span className="text-sm font-light tracking-tighter text-white opacity-40">
                      agent <span className="text-[#00AEEF] font-normal">Lynxx</span>
                    </span>
                  </div>
               </div>
            </div>
        </div>

      </div>
    </div>
  );
}