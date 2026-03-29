'use client'

import React, { useState } from 'react';
import { 
  Instagram, Facebook, Youtube, Video, ExternalLink, 
  Linkedin, MessageCircle, Phone, Globe 
} from 'lucide-react';
import { trackEvent } from '@/app/actions/analytics';

const SOCIAL_MAP: Record<string, any> = {
  instagram: { icon: Instagram },
  facebook: { icon: Facebook },
  tiktok: { icon: Video },
  youtube: { icon: Youtube },
  linkedin: { icon: Linkedin },
  whatsapp: { icon: MessageCircle },
  zillow: { icon: Globe },
  wechat: { icon: Globe },
};

export default function SplashPage({ profile }: { profile: any }) {
  const [ratio, setRatio] = useState(1);

  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const { naturalWidth, naturalHeight } = e.currentTarget;
    setRatio(naturalHeight / naturalWidth);
  };
  
  const getCtaHref = (url: string, text: string) => {
    if (!url) return '#';
    if (url.startsWith('tel:') || url.startsWith('sms:') || url.startsWith('mailto:')) return url;
    return url.startsWith('http') ? url : `https://${url}`;
  };

  const isTall = ratio > 1.2;

  return (
    <div className="min-h-screen w-full bg-[#050505] flex justify-center items-center p-0 md:p-4 font-sans overflow-hidden">
      <div className="relative h-screen md:h-[850px] w-full max-w-[430px] flex flex-col text-white shadow-2xl md:rounded-[3.5rem] border-0 md:border-[12px] border-zinc-900 bg-black overflow-hidden">
        
        {/* VIDEO BACKGROUND */}
        <div className="absolute inset-0 z-0">
          {profile.video_bg_url && (
            <video autoPlay muted loop playsInline key={profile.video_bg_url} className="h-full w-full object-cover opacity-40">
              <source src={profile.video_bg_url} type="video/mp4" />
            </video>
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black" />
        </div>

        {/* HEADER */}
        <div className="relative z-30 w-full px-8 pt-6 flex flex-col items-center text-center">
            {profile.company_logo && (
              <img src={profile.company_logo} className="h-20 w-auto object-contain mb-2 filter drop-shadow-2xl" alt="Brokerage" />
            )}
            
            <h1 className="text-4xl font-extralight tracking-tight text-white drop-shadow-lg mb-4">
              {profile.agent_name}
            </h1>
            
            <div className="flex justify-center gap-6">
               {profile.social_links && Object.entries(profile.social_links).slice(0, 4).map(([platform, url]) => {
                 const Config = SOCIAL_MAP[platform];
                 if (!Config || !url) return null;
                 return (
                   <a key={platform} href={url as string} target="_blank" className="transition-all duration-300 text-white hover:text-[#00AEEF] hover:scale-110">
                     <Config.icon className="w-7 h-7" />
                   </a>
                 );
               })}
            </div>
        </div>

        {/* THE AGENT */}
        <div className="absolute inset-0 z-10 pointer-events-none flex flex-col justify-end items-center">
          {profile.avatar_url && (
            <img 
              src={profile.avatar_url} 
              onLoad={handleImageLoad}
              className={`
                max-w-none transition-all duration-1000 origin-bottom w-full
                ${isTall ? "scale-[1.5] mb-[-10px]" : "mb-[145px] scale-[1.1]"}
              `}
              style={{ 
                maskImage: 'linear-gradient(to top, transparent 0%, black 15%)', 
                WebkitMaskImage: 'linear-gradient(to top, transparent 0%, black 15%)' 
              }}
              alt="" 
            />
          )}
        </div>

        {/* DOCK & FOOTER */}
        <div className="relative z-30 mt-auto w-full px-8 pb-4 pt-16 bg-gradient-to-t from-black via-black/80 to-transparent flex flex-col items-center">
            
            <a 
              href={getCtaHref(profile.cta_url, profile.cta_text)} 
              onClick={() => trackEvent(profile.id, 'click')}
              className="group flex items-center justify-center gap-3 w-full py-5 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl text-xl font-bold hover:bg-white hover:text-black transition-all duration-500 uppercase tracking-widest mb-8"
            >
              {profile.cta_text}
              <ExternalLink className="w-5 h-5 opacity-60" />
            </a>

            {/* LEGAL HUD (Using your local PNGs) */}
            <div className="w-full grid grid-cols-3 items-center pb-4 px-2">
               <div className="flex justify-start">
                 <img src="/equal-housing.png" className="h-10 w-auto brightness-200" alt="HUD" />
               </div>

               <div className="text-center px-1">
                 <span className="text-[11px] font-black uppercase tracking-widest text-white/40 whitespace-nowrap drop-shadow-md">
                   NV: {profile.license_number}
                 </span>
               </div>

               <div className="flex justify-end">
                 <div className="flex flex-col items-center">
                   <img src="/lynxx-footer.png" className="h-10 w-auto mb-1" alt="agent Lynxx" />
                   <div className="flex items-center gap-0.5 text-[9px] lowercase font-light text-white/50">
                      agent<span className="uppercase font-bold text-[#00AEEF]">Lynxx</span>
                   </div>
                 </div>
               </div>
            </div>
        </div>
      </div>
    </div>
  );
}