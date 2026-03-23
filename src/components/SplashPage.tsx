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
    <div className="min-h-screen w-full bg-zinc-950 flex justify-center items-center p-0 md:p-4 font-sans overflow-hidden">
      <div className="relative h-screen md:h-[850px] w-full max-w-[430px] flex flex-col items-center text-white shadow-2xl md:rounded-[3.5rem] border-0 md:border-[12px] border-zinc-900 bg-black overflow-hidden">
        
        {/* --- VIDEO BACKGROUND --- */}
        <div className="absolute inset-0 z-0">
          {profile.video_bg_url && (
            <video autoPlay muted loop playsInline className="w-full h-full object-cover opacity-50">
              <source src={profile.video_bg_url} type="video/mp4" />
            </video>
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black" />
        </div>

        {/* --- LAYER 2: AGENT CUTOUT (Pushed Down) --- */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          {profile.avatar_url && (
            <img 
              src={profile.avatar_url} 
              className="absolute bottom-[-5%] left-1/2 -translate-x-1/2 w-[120%] max-w-none h-auto object-contain origin-bottom" 
              style={{ 
                maskImage: 'linear-gradient(to top, transparent 0%, black 20%, black 80%, transparent 100%)', 
                WebkitMaskImage: 'linear-gradient(to top, transparent 0%, black 20%, black 80%, transparent 100%)' 
              }}
              alt="" 
            />
          )}
        </div>

        {/* --- LAYER 3: CONTENT --- */}
        <div className="relative z-20 w-full px-8 flex flex-col items-center h-full text-center py-12">
          
          {/* TOP SECTION: Branding, Name, Socials */}
          <div className="space-y-6 w-full flex flex-col items-center">
            {/* 1. Brokerage Logo (Top Priority) */}
            {profile.company_logo && (
              <img src={profile.company_logo} className="h-12 w-auto object-contain drop-shadow-md mb-2" alt="Brokerage" />
            )}

            <div className="space-y-2">
              <h1 className="text-4xl font-bold tracking-tight text-white drop-shadow-2xl italic uppercase">
                {profile.agent_name}
              </h1>
              
              {/* Socials - Clean Icons */}
              <div className="flex justify-center gap-5 pt-2">
                 {profile.social_links && Object.entries(profile.social_links).slice(0, 4).map(([platform, url]) => {
                   const Config = SOCIAL_MAP[platform];
                   const href = url as string;
                   if (!Config || !href) return null;
                   return (
                     <a key={platform} href={href} target="_blank" rel="noreferrer" className={`transition-all duration-300 text-white/60 ${Config.color}`}>
                       <Config.icon className="w-6 h-6 stroke-[1.5px]" />
                     </a>
                   );
                 })}
              </div>
            </div>
          </div>

          {/* BOTTOM SECTION: CTA & Legal */}
          <div className="mt-auto w-full flex flex-col items-center gap-6 pb-12">
            
            {/* Main Action Button */}
            <a 
              href={getCtaHref(profile.cta_url, profile.cta_text)} 
              className="group flex items-center justify-center gap-3 w-full py-5 bg-white/10 backdrop-blur-3xl border border-white/20 rounded-2xl text-xl font-bold hover:bg-white hover:text-black transition-all duration-500 shadow-2xl uppercase tracking-widest"
            >
              {profile.cta_text}
              <ExternalLink className="w-5 h-5 opacity-40 group-hover:opacity-100" />
            </a>

            {/* LEGAL FOOTER: Clean and Professional */}
            <div className="flex flex-col items-center gap-4">
               <span className="text-[11px] font-black uppercase tracking-[0.3em] text-white/50">
                  NV LIC: {profile.license_number || 'REQUIRED'}
               </span>
               <img 
                 src="/equal-housing.png" 
                 alt="Equal Housing Opportunity" 
                 className="h-10 w-auto opacity-70 brightness-150"
               />
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}