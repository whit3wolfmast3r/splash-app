'use client'

import React, { useState } from 'react';
import { 
  Instagram, Facebook, Youtube, Video, ExternalLink, 
  Linkedin, MessageCircle, Phone, Globe 
} from 'lucide-react';
import { trackEvent } from '@/app/actions/analytics';

// --- Surgical Polish: Brand Icons ---
const ZillowIcon = () => (
  <svg viewBox="0 0 24 24" className="w-7 h-7 fill-current"><path d="M19.34 11.29l-6.83-6.84a.73.73 0 00-1.03 0l-6.84 6.84a.24.24 0 00.17.41h2.24v6.86c0 .13.11.24.24.24h3.7c.13 0 .24-.11.24-.24v-3.52c0-.13.11-.24.24-.24h1.4c.13 0 .24.11.24.24v3.52c0 .13.11.24.24.24h3.7c.13 0 .24-.11.24-.24V11.7h2.24a.24.24 0 00.17-.41z"/></svg>
);

const EqualHousingIcon = () => (
  <svg className="h-8 w-auto fill-white opacity-80" viewBox="0 0 24 24"><path d="M12 3L2 12h3v8h14v-8h3L12 3zm0 14c-1.65 0-3-1.35-3-3s1.35-3 3-3 3 1.35 3 3-1.35 3-3 3z"/></svg>
);

const SOCIAL_MAP: Record<string, any> = {
  instagram: { icon: Instagram },
  facebook: { icon: Facebook },
  tiktok: { icon: Video },
  youtube: { icon: Youtube },
  linkedin: { icon: Linkedin },
  whatsapp: { icon: MessageCircle },
  zillow: { icon: ZillowIcon },
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

        {/* HEADER (Logo & Name) */}
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
                   <a key={platform} href={url as string} target="_blank" rel="noreferrer" className="transition-all duration-300 text-white hover:text-[#00AEEF] hover:scale-110">
                     <Config.icon className="w-7 h-7 stroke-[2px]" />
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

            {/* THE FOOTER (Fixed Polish) */}
            <div className="w-full grid grid-cols-3 items-center pb-4 px-2">
               <div className="flex justify-start">
                 <EqualHousingIcon />
               </div>

               <div className="text-center px-1">
                 <span className="text-[11px] font-black uppercase tracking-widest text-white/40 whitespace-nowrap drop-shadow-md">
                   NV: {profile.license_number}
                 </span>
               </div>

               <div className="flex justify-end">
                 <div className="flex flex-col items-end">
                   <div className="flex items-center gap-0.5 text-[10px] lowercase font-light text-white/50">
                      agent<span className="uppercase font-bold text-[#00AEEF] tracking-tighter">Lynxx</span>
                   </div>
                   <div className="w-6 h-1 bg-[#00AEEF] rounded-full mt-1 opacity-50" />
                 </div>
               </div>
            </div>
        </div>
      </div>
    </div>
  );
}