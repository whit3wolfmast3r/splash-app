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
      {/* Mobile-First Container: Using h-screen on mobile, fixed height on desktop */}
      <div className="relative h-screen md:h-[850px] w-full max-w-[430px] flex flex-col items-center text-white shadow-2xl md:rounded-[3.5rem] border-0 md:border-[12px] border-zinc-900 bg-black overflow-hidden">
        
        {/* --- LAYER 1: VIDEO BACKGROUND --- */}
        <div className="absolute inset-0 z-0">
          {profile.video_bg_url && (
            <video autoPlay muted loop playsInline className="w-full h-full object-cover opacity-50">
              <source src={profile.video_bg_url} type="video/mp4" />
            </video>
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black" />
        </div>

        {/* --- LAYER 2: AGENT CUTOUT --- */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          {profile.avatar_url && (
            <img 
              src={profile.avatar_url} 
              className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[130%] max-w-none h-auto object-contain origin-bottom" 
              style={{ 
                maskImage: 'linear-gradient(to top, transparent 8%, black 40%)', 
                WebkitMaskImage: 'linear-gradient(to top, transparent 8%, black 40%)' 
              }}
              alt="" 
            />
          )}
        </div>

        {/* --- LAYER 3: CONTENT --- */}
        <div className="relative z-20 w-full px-8 flex flex-col items-center h-full text-center py-16">
          
          {/* Header Info */}
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tight drop-shadow-2xl text-white">
              {profile.agent_name}
            </h1>
            
            <div className="flex justify-center gap-6">
               {profile.social_links && Object.entries(profile.social_links).slice(0, 4).map(([platform, url]) => {
                 const Config = SOCIAL_MAP[platform];
                 const href = url as string;
                 if (!Config || !href) return null;
                 return (
                   <a key={platform} href={href} target="_blank" rel="noreferrer" className={`transition-all duration-300 text-white/70 hover:scale-110 ${Config.color}`}>
                     <Config.icon className="w-7 h-7" />
                   </a>
                 );
               })}
            </div>
          </div>

          {/* Bottom Branding & Action Area */}
          <div className="mt-auto w-full flex flex-col items-center gap-8 pb-10">
            
            {/* CTA Button: Spans Full Width */}
            <a 
              href={getCtaHref(profile.cta_url, profile.cta_text)} 
              className="group flex items-center justify-center gap-3 w-full py-5 bg-white/10 backdrop-blur-3xl border border-white/20 rounded-2xl text-xl font-bold hover:bg-white hover:text-black transition-all duration-500 shadow-2xl"
            >
              {profile.cta_text}
              <ExternalLink className="w-5 h-5 opacity-40 group-hover:opacity-100" />
            </a>

            {/* BRANDING FOOTER: Stacked & Centered */}
            <div className="w-full flex flex-col items-center gap-4">
              
              {/* Company Logo: Centered and sized properly */}
              {profile.company_logo && (
                <img 
                  src={profile.company_logo} 
                  className="h-12 w-auto object-contain opacity-90 drop-shadow-md" 
                  alt="Brokerage" 
                />
              )}

              {/* Legal Info Line: Centered with Divider */}
              <div className="flex items-center gap-4 text-white/40">
                <span className="text-[10px] font-black uppercase tracking-[0.2em]">
                  NV LIC: {profile.license_number || 'REQUIRED'}
                </span>
                
                {/* Vertical Divider */}
                <div className="h-3 w-px bg-white/20" />

                {/* Equal Housing Icon: SVG for zero-fail loading */}
                <div className="flex items-center" title="Equal Housing Opportunity">
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                    <path d="M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3zm0 10c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/>
                  </svg>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}