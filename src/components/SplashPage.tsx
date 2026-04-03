'use client'

import React from 'react';
import { 
  Instagram, Facebook, Youtube, ExternalLink, 
  Linkedin, MessageCircle 
} from 'lucide-react';
import Script from 'next/script';
import { trackEvent } from '@/app/actions/analytics';

/** 
 * CUSTOM BRAND ICONS 
 * Re-drawn as SVGs for maximum performance and luxury look
 */
const ZillowIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" fill="currentColor" className={className}>
    <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="4" />
    <path d="M50 20 L25 45 H35 V75 L50 60 L65 75 V45 H75 L50 20Z" opacity="0.2" />
    <path d="M72 45.5L50 24L28 45.5L34 45.5V72L49 59L65 72V45.5H72ZM45.3 54.3L37.5 54.3L56.5 35.5L58.5 35.5L58.5 43.5L66 43.5L47 62.5L45.3 62.5L45.3 54.3Z" />
  </svg>
);

const TikTokIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.17-2.86-.6-4.12-1.31a6.34 6.34 0 01-1.87-1.55v6.52c-.03 2.14-.59 4.31-2.03 5.91-1.61 1.83-4.16 2.62-6.52 2.13-2.31-.44-4.38-2.14-5.18-4.35-.88-2.34-.35-5.14 1.42-6.93 1.55-1.59 3.94-2.22 6.1-1.67v4.03c-1.18-.34-2.52-.09-3.46.68-.89.72-1.29 1.95-1.03 3.05.25 1.11 1.25 2.02 2.37 2.19 1.14.16 2.38-.28 3-1.28.45-.71.58-1.57.57-2.39V0h.01z"/>
  </svg>
);

const WeChatIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M8.5 2C4.36 2 1 4.78 1 8.2c0 2.05 1.18 3.86 3 5.06l-.54 1.62c-.05.15 0 .31.13.4s.3.08.41-.01L6.2 13.7c.74.2 1.53.3 2.3.3 4.14 0 7.5-2.78 7.5-6.2S12.64 2 8.5 2zm7.15 7.14c-.11-.02-.21-.04-.32-.04-2.43 0-4.66 1.16-5.91 3.1-.3.46-.53.96-.68 1.48C8.59 13.62 8.55 13.56 8.5 13.56c-.4 0-.78-.04-1.16-.1l-1.6 1.26c-.1.08-.23.11-.35.08-.13-.03-.24-.12-.27-.25l-.33-1.34C3.21 12.18 2.2 10.45 2.2 8.5c0-3 2.82-5.44 6.3-5.44 3.48 0 6.3 2.44 6.3 5.44 0 .22-.02.43-.05.64zM17.7 9c-3.48 0-6.3 2.44-6.3 5.44 0 1.95 1.18 3.86 3 5.06l-.54 1.62c-.05.15 0 .31.13.4s.3.08.41-.01l2.2-1.57c.74.2 1.53.3 2.3.3 4.14 0 7.5-2.78 7.5-6.2S21.84 9 17.7 9zm-2.4 4.5c-.41 0-.75-.34-.75-.75s.34-.75.75-.75.75.34.75.75-.34.75-.75.75zm4.8 0c-.41 0-.75-.34-.75-.75s.34-.75.75-.75.75.34.75.75-.34.75-.75.75z"/>
  </svg>
);

const SOCIAL_MAP: Record<string, any> = {
  instagram: { icon: Instagram },
  facebook: { icon: Facebook },
  tiktok: { icon: TikTokIcon },
  youtube: { icon: Youtube },
  linkedin: { icon: Linkedin },
  whatsapp: { icon: MessageCircle },
  zillow: { icon: ZillowIcon },
  wechat: { icon: WeChatIcon },
};

export default function SplashPage({ profile }: { profile: any }) {
  const getCtaHref = (url: string) => {
    if (!url) return '#';
    if (url.startsWith('tel:') || url.startsWith('sms:') || url.startsWith('mailto:')) return url;
    return url.startsWith('http') ? url : `https://${url}`;
  };

  return (
    <div className="min-h-screen w-full bg-[#050505] flex justify-center items-center p-0 md:p-4 font-sans overflow-hidden select-none">
      
      {/* ANALYTICS INJECTION */}
      {profile.google_analytics_id && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${profile.google_analytics_id}`} strategy="afterInteractive" />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${profile.google_analytics_id}');
            `}
          </Script>
        </>
      )}
      {profile.clarity_id && (
        <Script id="ms-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "${profile.clarity_id}");
          `}
        </Script>
      )}

      {/* MOBILE CONTAINER */}
      <div className="relative h-screen md:h-[850px] w-full max-w-[430px] flex flex-col text-white shadow-[0_0_100px_rgba(0,0,0,1)] md:rounded-[3.5rem] border-0 md:border-[12px] border-zinc-900 bg-black overflow-hidden group">
        
        {/* VIDEO BACKGROUND LAYER */}
        <div className="absolute inset-0 z-0">
          {profile.video_bg_url && (
            <video autoPlay muted loop playsInline key={profile.video_bg_url} className="h-full w-full object-cover opacity-50 contrast-125 brightness-75">
              <source src={profile.video_bg_url} type="video/mp4" />
            </video>
          )}
          {/* Multi-layered gradient for text legibility */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
        </div>

        {/* HEADER SECTION */}
        <div className="relative z-30 w-full px-8 pt-12 flex flex-col items-center text-center">
            {profile.company_logo && (
              <img 
                src={profile.company_logo} 
                className="h-16 w-auto object-contain mb-4 filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]" 
                alt="Brokerage" 
              />
            )}
            
            <h1 className="text-4xl font-extralight tracking-tight text-white drop-shadow-[0_2px_10px_rgba(0,0,0,1)] mb-6">
              {profile.agent_name}
            </h1>
            
            {/* SOCIAL DOCK */}
            <div className="flex justify-center gap-5 p-4 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10">
               {profile.social_links && Object.entries(profile.social_links).map(([platform, url]) => {
                 const Config = SOCIAL_MAP[platform];
                 if (!Config || !url) return null;
                 return (
                   <a 
                     key={platform} 
                     href={url as string} 
                     target="_blank" 
                     className="transition-all duration-300 text-white/80 hover:text-[#00AEEF] hover:scale-125"
                   >
                     <Config.icon className="w-6 h-6" />
                   </a>
                 );
               })}
            </div>
        </div>

        {/* AGENT PHOTO LAYER: Anchored higher for visibility */}
        <div className="absolute inset-x-0 bottom-36 z-10 pointer-events-none flex justify-center items-end overflow-visible">
          {profile.avatar_url && (
            <img 
              src={profile.avatar_url} 
              className="w-full h-auto max-h-[70vh] object-contain object-bottom scale-[1.15] origin-bottom transition-transform duration-700 group-hover:scale-[1.2]"
              style={{ 
                maskImage: 'linear-gradient(to top, transparent 0%, black 15%, black 100%)', 
                WebkitMaskImage: 'linear-gradient(to top, transparent 0%, black 15%, black 100%)' 
              }}
              alt="" 
            />
          )}
        </div>

        {/* INTERACTION ZONE (The Dock) */}
        <div className="relative z-30 mt-auto w-full px-8 pb-8 pt-24 flex flex-col items-center">
            
            {/* LUXURY GLASS BUTTON */}
            <a 
              href={getCtaHref(profile.cta_url)} 
              onClick={() => trackEvent(profile.id, 'click')}
              className="group flex items-center justify-center gap-3 w-full py-5 bg-white/10 backdrop-blur-2xl border border-white/20 rounded-[2rem] text-lg font-black text-white hover:bg-white hover:text-black transition-all duration-500 uppercase tracking-[0.25em] mb-12 shadow-[0_20px_50px_rgba(0,0,0,0.5)] active:scale-95"
            >
              <span className="drop-shadow-sm">{profile.cta_text || 'Contact Me'}</span>
              <ExternalLink className="w-5 h-5 opacity-40 group-hover:opacity-100 transition-opacity" />
            </a>

            {/* LEGAL HUD: Full Visibility High Contrast */}
            <div className="w-full grid grid-cols-3 items-center px-2 border-t border-white/5 pt-6">
               <div className="flex justify-start">
                 <img src="/equal-housing.png" className="h-8 w-auto brightness-200 contrast-200" alt="HUD" />
               </div>

               <div className="text-center">
                 <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white drop-shadow-md">
                   {profile.license_number}
                 </span>
               </div>

               <div className="flex justify-end">
                 <div className="flex flex-col items-center">
                   <img src="/lynxx-footer.png" className="h-7 w-auto mb-1 brightness-150" alt="agent Lynxx" />
                   <div className="flex items-center gap-0.5 text-[7px] lowercase font-bold text-white/60 tracking-wider">
                      agent<span className="uppercase font-black text-[#00AEEF]">Lynxx</span>
                   </div>
                 </div>
               </div>
            </div>
        </div>
      </div>
    </div>
  );
}