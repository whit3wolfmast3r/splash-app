'use client'

import React, { useState } from 'react';
import { 
  Instagram, Facebook, Youtube, Video, ExternalLink, 
  Linkedin, MessageCircle, Phone, Globe 
} from 'lucide-react';
import Script from 'next/script';
import { trackEvent } from '@/app/actions/analytics';

// Custom Zillow Icon SVG
const ZillowIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 2.09L2 12h3v9h6v-6h2v6h6v-9h3L12 2.09zm3.5 13.41l-1.41 1.41-2.09-2.08-2.09 2.08-1.41-1.41 2.08-2.09-2.08-2.09 1.41-1.41 2.09 2.08 2.09-2.08 1.41 1.41-2.08 2.09 2.08 2.09z"/>
  </svg>
);

const SOCIAL_MAP: Record<string, any> = {
  instagram: { icon: Instagram },
  facebook: { icon: Facebook },
  tiktok: { icon: Video },
  youtube: { icon: Youtube },
  linkedin: { icon: Linkedin },
  whatsapp: { icon: MessageCircle },
  zillow: { icon: ZillowIcon },
  wechat: { icon: MessageCircle },
};

export default function SplashPage({ profile }: { profile: any }) {
  const getCtaHref = (url: string) => {
    if (!url) return '#';
    // If it already has a prefix, use it. Otherwise, assume it's a web link.
    if (url.startsWith('tel:') || url.startsWith('sms:') || url.startsWith('mailto:')) return url;
    return url.startsWith('http') ? url : `https://${url}`;
  };

  return (
    <div className="min-h-screen w-full bg-[#050505] flex justify-center items-center p-0 md:p-4 font-sans overflow-hidden">
      
      {/* 3rd Party Analytics Scripts */}
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

        {/* HEADER / IDENTITY */}
        <div className="relative z-30 w-full px-8 pt-8 flex flex-col items-center text-center">
            {profile.company_logo && (
              <img src={profile.company_logo} className="h-20 w-auto object-contain mb-2 filter drop-shadow-2xl" alt="Brokerage" />
            )}
            
            <h1 className="text-4xl font-extralight tracking-tight text-white drop-shadow-lg mb-4">
              {profile.agent_name}
            </h1>
            
            <div className="flex justify-center gap-6">
               {profile.social_links && Object.entries(profile.social_links).map(([platform, url]) => {
                 const Config = SOCIAL_MAP[platform];
                 if (!Config || !url) return null;
                 return (
                   <a key={platform} href={url as string} target="_blank" className="transition-all duration-300 text-white/80 hover:text-[#00AEEF] hover:scale-110">
                     <Config.icon className="w-6 h-6" />
                   </a>
                 );
               })}
            </div>
        </div>

        {/* THE AGENT (Positioned at bottom) */}
        <div className="absolute inset-x-0 bottom-0 z-10 pointer-events-none flex justify-center items-end">
          {profile.avatar_url && (
            <img 
              src={profile.avatar_url} 
              className="w-full h-auto max-h-[75vh] object-contain object-bottom translate-y-[5%]"
              style={{ 
                maskImage: 'linear-gradient(to top, transparent 0%, black 15%)', 
                WebkitMaskImage: 'linear-gradient(to top, transparent 0%, black 15%)' 
              }}
              alt="" 
            />
          )}
        </div>

        {/* DOCK & FOOTER */}
        <div className="relative z-30 mt-auto w-full px-8 pb-6 pt-20 bg-gradient-to-t from-black via-black/90 to-transparent flex flex-col items-center">
            
            <a 
              href={getCtaHref(profile.cta_url)} 
              onClick={() => trackEvent(profile.id, 'click')}
              className="group flex items-center justify-center gap-3 w-full py-5 bg-white text-black rounded-2xl text-lg font-black hover:bg-[#00AEEF] hover:text-white transition-all duration-300 uppercase tracking-widest mb-8 shadow-[0_20px_50px_rgba(0,174,239,0.3)]"
            >
              {profile.cta_text || 'Contact Me'}
              <ExternalLink className="w-5 h-5 opacity-60" />
            </a>

            {/* LEGAL HUD */}
            <div className="w-full grid grid-cols-3 items-center px-2">
               <div className="flex justify-start">
                 <img src="/equal-housing.png" className="h-8 w-auto brightness-200 opacity-50" alt="HUD" />
               </div>

               <div className="text-center">
                 <span className="text-[10px] font-bold uppercase tracking-widest text-white/30 whitespace-nowrap">
                   {profile.license_number}
                 </span>
               </div>

               <div className="flex justify-end">
                 <div className="flex flex-col items-center opacity-50">
                   <img src="/lynxx-footer.png" className="h-8 w-auto mb-0.5" alt="agent Lynxx" />
                   <div className="flex items-center gap-0.5 text-[8px] lowercase font-light text-white">
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