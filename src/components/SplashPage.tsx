'use client'

import React, { useState } from 'react';
import { Instagram, Facebook, Youtube, ExternalLink, Linkedin, MessageCircle, Phone, Home } from 'lucide-react';

const SOCIAL_MAP: Record<string, any> = {
  instagram: { icon: Instagram },
  facebook: { icon: Facebook },
  youtube: { icon: Youtube },
  linkedin: { icon: Linkedin },
  zillow: { icon: Home },
};

export default function SplashPage({ profile }: { profile: any }) {
  const [ratio, setRatio] = useState(1);
  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => setRatio(e.currentTarget.naturalHeight / e.currentTarget.naturalWidth);
  const isTall = ratio > 1.2;

  return (
    <div className="min-h-screen w-full bg-[#050505] flex justify-center items-center font-sans overflow-hidden">
      <div className="relative h-screen md:h-[850px] w-full max-w-[430px] flex flex-col text-white shadow-2xl md:rounded-[3.5rem] bg-black overflow-hidden border-0 md:border-[12px] border-zinc-900">
        
        {/* VIDEO BG */}
        <div className="absolute inset-0 z-0 bg-black">
          <video autoPlay muted loop playsInline key={profile.video_bg_url} className="h-full w-full object-cover opacity-40">
            <source src={profile.video_bg_url} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-[#050505]" />
        </div>

        {/* HEADER: LOGO & NAME */}
        <div className="relative z-30 w-full px-8 pt-10 flex flex-col items-center text-center">
            {profile.company_logo && (
              <img src={profile.company_logo} className="h-20 w-auto object-contain mb-4 drop-shadow-2xl" alt="Brokerage" />
            )}
            <h1 className="text-3xl font-light tracking-[0.2em] text-white uppercase mb-6 drop-shadow-md">
              {profile.agent_name}
            </h1>
            <div className="flex justify-center gap-6 text-white/80">
               {profile.social_links && Object.entries(profile.social_links).map(([platform, url]) => {
                 const Config = SOCIAL_MAP[platform];
                 if (!Config || !url) return null;
                 return (
                   <a key={platform} href={url as string} target="_blank" className="hover:text-[#00AEEF] transition-all transform hover:scale-110">
                     <Config.icon className="w-6 h-6" />
                   </a>
                 );
               })}
            </div>
        </div>

        {/* THE AGENT (Smart Frame Gravity Fix) */}
        <div className="absolute inset-0 z-10 pointer-events-none flex flex-col justify-end items-center">
          {profile.avatar_url && (
            <img 
              src={profile.avatar_url} 
              onLoad={handleImageLoad}
              className={`max-w-none transition-all duration-1000 origin-bottom w-full ${isTall ? "scale-[1.5] translate-y-[80px]" : "mb-[145px] scale-[1.1]"}`}
              style={{ maskImage: 'linear-gradient(to top, transparent 0%, black 10%)', WebkitMaskImage: 'linear-gradient(to top, transparent 0%, black 10%)' }}
              alt="" 
            />
          )}
        </div>

        {/* DOCK & FOOTER */}
        <div className="relative z-40 mt-auto w-full px-8 pb-4 pt-16 bg-gradient-to-t from-[#050505] via-[#050505]/95 to-transparent flex flex-col items-center">
            <a href={profile.cta_url} className="group flex items-center justify-between w-full px-6 py-5 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl hover:bg-white/10 hover:border-[#00AEEF]/50 transition-all mb-8">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white">{profile.cta_text || 'Book Consultation'}</span>
              <div className="bg-[#00AEEF] p-2 rounded-lg"><ExternalLink className="w-4 h-4 text-white" /></div>
            </a>

            {/* LEGAL HUD (Restored properly) */}
            <div className="w-full grid grid-cols-3 items-center pb-6 px-2">
               <div className="flex justify-start">
                 <img src="/equal-housing.png" className="h-8 w-auto brightness-200 opacity-60" alt="HUD" />
               </div>
               <div className="text-center">
                 <span className="text-[9px] font-black uppercase tracking-[0.2em] text-white/30 whitespace-nowrap">NV: {profile.license_number}</span>
               </div>
               <div className="flex justify-end">
                 <div className="flex flex-col items-end gap-1">
                   <div className="flex items-center gap-0.5 text-[10px] lowercase font-light text-white/50">agent<span className="uppercase font-bold text-[#00AEEF]">Lynxx</span></div>
                   <img src="/lynxx-footer.png" className="h-3 w-auto opacity-40" alt="" />
                 </div>
               </div>
            </div>
        </div>
      </div>
    </div>
  );
}