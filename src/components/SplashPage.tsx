'use client'

import React from 'react';
import { 
  Instagram, Facebook, Youtube, Video, ExternalLink, 
  Linkedin, MessageCircle 
} from 'lucide-react';
import Script from 'next/script';
import { trackEvent } from '@/app/actions/analytics';

// Accurate Zillow House Icon
const ZillowIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 2.1L2 12h3v9h6v-6h2v6h6v-9h3L12 2.1zm5.5 13.4l-1.4 1.4-2.1-2.1-2.1 2.1-1.4-1.4 2.1-2.1-2.1-2.1 1.4-1.4 2.1 2.1 2.1-2.1 1.4 1.4-2.1 2.1 2.1 2.1z"/>
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
    if (url.startsWith('tel:') || url.startsWith('sms:') || url.startsWith('mailto:')) return url;
    return url.startsWith('http') ? url : `https://${url}`;
  };

  return (
    <div className="min-h-screen w-full bg-[#050505] flex justify-center items-center p-0 md:p-4 font-sans overflow-hidden">
      
      {/* 3rd Party Tracking */}
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
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black" />
        </div>

        {/* IDENTITY HEADER */}
        <div className="relative z-30 w-full px-8 pt-10 flex flex-col items-center text-center">
            {profile.company_logo && (
              <img src={profile.company_logo} className="h-16 w-auto object-contain mb-2 filter drop-shadow-2xl" alt="Brokerage" />
            )}
            
            <h1 className="text-4xl font-extralight tracking-tight text-white drop-shadow-lg mb-4">
              {profile.agent_name}
            </h1>
            
            <div className="flex justify-center gap-5">
               {profile.social_links && Object.entries(profile.social_links).map(([platform, url]) => {
                 const Config = SOCIAL_MAP[platform];
                 if (!Config || !url) return null;
                 return (
                   <a key={platform} href={url as string} target="_blank" className="transition-all duration-300 text-white/70 hover:text-[#00AEEF] hover:scale-110">
                     <Config.icon className="w-6 h-6" />
                   </a>
                 );
               })}
            </div>
        </div>

        {/* AGENT PHOTO: Moved up to anchor near the button top */}
        <div className="absolute inset-x-0 bottom-36 z-10 pointer-events-none flex justify-center items-end">
          {profile.avatar_url && (
            <img 
              src={profile.avatar_url} 
              className="w-full h-auto max-h-[65vh] object-contain object-bottom scale-110"
              style={{ 
                maskImage: 'linear-gradient(to top, transparent 0%, black 20%)', 
                WebkitMaskImage: 'linear-gradient(to top, transparent 0%, black 20%)' 
              }}
              alt="" 
            />
          )}
        </div>

        {/* DOCK & FOOTER */}
        <div className="relative z-30 mt-auto w-full px-8 pb-6 pt-24 bg-gradient-to-t from-black via-black/90 to-transparent flex flex-col items-center">
            
            {/* CTA BUTTON: Shrunk width and added high-transparency glass look */}
            <a 
              href={getCtaHref(profile.cta_url)} 
              onClick={() => trackEvent(profile.id, 'click')}
              className="group flex items-center justify-center gap-3 w-[85%] py-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl text-[15px] font-black text-white hover:bg-white hover:text-black transition-all duration-500 uppercase tracking-[0.2em] mb-10 shadow-xl"
            >
              {profile.cta_text || 'Contact Me'}
              <ExternalLink className="w-4 h-4 opacity-40" />
            </a>

            {/* LEGAL HUD */}
            <div className="w-full grid grid-cols-3 items-center px-2">
               <div className="flex justify-start">
                 <img src="/equal-housing.png" className="h-7 w-auto brightness-200 opacity-30" alt="HUD" />
               </div>

               <div className="text-center">
                 <span className="text-[9px] font-bold uppercase tracking-widest text-white/20 whitespace-nowrap">
                   {profile.license_number}
                 </span>
               </div>

               <div className="flex justify-end">
                 <div className="flex flex-col items-center opacity-30">
                   <img src="/lynxx-footer.png" className="h-7 w-auto mb-0.5" alt="agent Lynxx" />
                   <div className="flex items-center gap-0.5 text-[7px] lowercase font-light text-white">
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