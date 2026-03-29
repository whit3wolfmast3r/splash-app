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

  /** 
   * SMART FRAME LOGIC:
   * 5:6 Ratio Rule (1.2 ratio)
   * If Tall (Body Shot): Scale up and sink down to overlap the dock.
   * If Tight (Headshot): Lift up to sit flush ON the dock.
   */
  const isTall = ratio > 1.2;

  return (
    <div className="min-h-screen w-full bg-[#050505] flex justify-center items-center p-0 md:p-4 font-sans overflow-hidden">
      <div className="relative h-screen md:h-[850px] w-full max-w-[430px] flex flex-col text-white shadow-2xl md:rounded-[3.5rem] border-0 md:border-[12px] border-zinc-900 bg-black overflow-hidden">
        
        {/* --- LAYER 1: VIDEO BACKGROUND --- */}
        <div className="absolute inset-0 z-0 bg-black">
          {profile.video_bg_url && (
            <video autoPlay muted loop playsInline key={profile.video_bg_url} className="h-full w-full object-cover opacity-40">
              <source src={profile.video_bg_url} type="video/mp4" />
            </video>
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-[#050505]" />
        </div>

        {/* --- LAYER 2: THE HEADER (Z-30) --- */}
        <div className="relative z-30 w-full px-8 pt-10 flex flex-col items-center text-center">
            {profile.company_logo && (
              <img src={profile.company_logo} className="h-16 w-auto object-contain mb-4 filter drop-shadow-2xl" alt="Brokerage" />
            )}
            
            <h1 className="text-3xl font-light tracking-[0.2em] text-white uppercase drop-shadow-lg mb-6">
              {profile.agent_name}
            </h1>
            
            <div className="flex justify-center gap-6 text-white/60">
               {profile.social_links && Object.entries(profile.social_links).slice(0, 4).map(([platform, url]) => {
                 const Config = SOCIAL_MAP[platform];
                 if (!Config || !url) return null;
                 return (
                   <a key={platform} href={url as string} target="_blank" className="transition-all duration-300 hover:text-[#00AEEF] hover:scale-110">
                     <Config.icon className="w-6 h-6 stroke-[1.5px]" />
                   </a>
                 );
               })}
            </div>
        </div>

        {/* --- LAYER 3: THE SMART FRAME (Z-10) --- */}
        <div className="absolute inset-0 z-10 pointer-events-none flex flex-col justify-end items-center">
          {profile.avatar_url && (
            <img 
              src={profile.avatar_url} 
              onLoad={handleImageLoad}
              className={`
                max-w-none transition-all duration-1000 origin-bottom w-full
                ${isTall 
                  ? "scale-[1.4] translate-y-[80px]" // Tall shots sink deep for body immersion
                  : "mb-[145px] scale-[1.1]"        // Headshots lift to sit on the button dock
                }
              `}
              style={{ 
                maskImage: 'linear-gradient(to top, transparent 0%, black 10%)', 
                WebkitMaskImage: 'linear-gradient(to top, transparent 0%, black 10%)' 
              }}
              alt="" 
            />
          )}
        </div>

        {/* --- LAYER 4: THE INTERFACE DOCK (Z-40) --- */}
        <div className="relative z-40 mt-auto w-full px-8 pb-4 pt-16 bg-gradient-to-t from-[#050505] via-[#050505]/90 to-transparent flex flex-col items-center">
            
            <a 
              href={getCtaHref(profile.cta_url, profile.cta_text)} 
              onClick={() => trackEvent(profile.id, 'click')}
              className="group flex items-center justify-between w-full px-6 py-5 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl transition-all duration-500 hover:bg-white/10 hover:border-[#00AEEF]/50 mb-8"
            >
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white">
                {profile.cta_text || 'Book Consultation'}
              </span>
              <div className="bg-[#00AEEF] p-2 rounded-lg shadow-[0_0_15px_rgba(0,174,239,0.3)]">
                <ExternalLink className="w-4 h-4 text-white" />
              </div>
            </a>

            {/* LEGAL HUD */}
            <div className="w-full grid grid-cols-3 items-center pb-6 px-2">
               <div className="flex justify-start">
                 <img src="/equal-housing.png" className="h-7 w-auto brightness-200 opacity-40" alt="HUD" />
               </div>

               <div className="text-center">
                 <span className="text-[8px] font-black uppercase tracking-[0.2em] text-white/30 whitespace-nowrap">
                   NV: {profile.license_number}
                 </span>
               </div>

               <div className="flex justify-end">
                 <div className="flex flex-col items-end gap-1">
                   <div className="flex items-center gap-0.5 text-[9px] lowercase font-light text-white/40">
                      agent<span className="uppercase font-bold text-[#00AEEF]">Lynxx</span>
                   </div>
                   <img src="/lynxx-footer.png" className="h-3 w-auto opacity-30" alt="" />
                 </div>
               </div>
            </div>
        </div>
      </div>
    </div>
  );
}