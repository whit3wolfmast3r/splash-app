'use client'

import React from 'react';
import { ExternalLink } from 'lucide-react';
import Script from 'next/script';
import { trackEvent } from '@/app/actions/analytics';

/** 
 * BRANDFETCH OFFICIAL GEOMETRIES
 * Precise SVG paths for a world-class professional look.
 */
const InstagramIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c.796 0 1.441.645 1.441 1.44s-.645 1.44-1.441 1.44-1.44-.645-1.44-1.44.645-1.44 1.44-1.44z" />
  </svg>
);

const FacebookIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const LinkedInIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);

const TikTokIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.17-2.86-.6-4.12-1.31a6.34 6.34 0 01-1.87-1.55v6.52c-.03 2.14-.59 4.31-2.03 5.91-1.61 1.83-4.16 2.62-6.52 2.13-2.31-.44-4.38-2.14-5.18-4.35-.88-2.34-.35-5.14 1.42-6.93 1.55-1.59 3.94-2.22 6.1-1.67v4.03c-1.18-.34-2.52-.09-3.46.68-.89.72-1.29 1.95-1.03 3.05.25 1.11 1.25 2.02 2.37 2.19 1.14.16 2.38-.28 3-1.28.45-.71.58-1.57.57-2.39V0h.01z" />
  </svg>
);

const YouTubeIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

const ZillowIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M18.5 11.2c0-.1-.1-.1-.1-.2l-5.8-5.3c-.3-.3-.8-.3-1.1 0l-5.8 5.3c-.1.1-.1.1-.1.2V19c0 .3.2.5.5.5h3.6c.1 0 .2-.1.3-.2l1.6-2.5c.1-.1.2-.2.4-.2.2 0 .3.1.4.2l1.6 2.5c0 .1.1.2.3.2h3.6c.3 0 .5-.2.5-.5v-7.8zM12 14.5l-1.3-2h2.6L12 14.5zM15 10l-6.1 6.1v-2.2L12.8 10H15z" />
  </svg>
);

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const SOCIAL_MAP: Record<string, any> = {
  instagram: { icon: InstagramIcon },
  facebook: { icon: FacebookIcon },
  tiktok: { icon: TikTokIcon },
  youtube: { icon: YouTubeIcon },
  linkedin: { icon: LinkedInIcon },
  whatsapp: { icon: WhatsAppIcon },
  zillow: { icon: ZillowIcon },
};

export default function SplashPage({ profile }: { profile: any }) {
  const getCtaHref = (url: string) => {
    if (!url) return '#';
    if (url.startsWith('tel:') || url.startsWith('sms:') || url.startsWith('mailto:')) return url;
    return url.startsWith('http') ? url : `https://${url}`;
  };

  return (
    <div className="min-h-screen w-full bg-[#050505] flex justify-center items-center p-0 md:p-4 font-sans overflow-hidden select-none">
      
      {/* ANALYTICS */}
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
      <div className="relative h-screen md:h-[850px] w-full max-w-[430px] flex flex-col text-white shadow-[0_0_120px_rgba(0,0,0,1)] md:rounded-[4.5rem] border-0 md:border-[12px] border-zinc-900 bg-black overflow-hidden group">
        
        {/* VIDEO BACKGROUND */}
        <div className="absolute inset-0 z-0">
          {profile.video_bg_url && (
            <video autoPlay muted loop playsInline key={profile.video_bg_url} className="h-full w-full object-cover opacity-60 contrast-125 brightness-[0.55]">
              <source src={profile.video_bg_url} type="video/mp4" />
            </video>
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-transparent to-black" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-95" />
        </div>

        {/* IDENTITY HEADER */}
        <div className="relative z-30 w-full px-8 pt-16 flex flex-col items-center text-center">
            {profile.company_logo && (
              <img 
                src={profile.company_logo} 
                className="h-12 w-auto object-contain mb-6 drop-shadow-[0_15px_25px_rgba(0,0,0,1)]" 
                alt="Brokerage" 
              />
            )}
            
            <h1 className="text-4xl font-extralight tracking-tighter text-white drop-shadow-[0_2px_15px_rgba(0,0,0,1)] mb-8">
              {profile.agent_name}
            </h1>
            
            {/* CLEAN SOCIAL DOCK: No box, just floating icons */}
            <div className="flex justify-center gap-8 py-2">
               {profile.social_links && Object.entries(profile.social_links).map(([platform, url]) => {
                 const Config = SOCIAL_MAP[platform];
                 if (!Config || !url) return null;
                 return (
                   <a 
                     key={platform} 
                     href={url as string} 
                     target="_blank" 
                     className="transition-all duration-300 text-white/80 hover:text-[#00AEEF] hover:scale-125 hover:drop-shadow-[0_0_10px_rgba(0,174,239,0.4)]"
                   >
                     <Config.icon className="w-6 h-6" />
                   </a>
                 );
               })}
            </div>
        </div>

        {/* AGENT PHOTO */}
        <div className="absolute inset-x-0 bottom-44 z-10 pointer-events-none flex justify-center items-end">
          {profile.avatar_url && (
            <img 
              src={profile.avatar_url} 
              className="w-full h-auto max-h-[72vh] object-contain object-bottom scale-[1.15] origin-bottom transition-all duration-1000 group-hover:scale-[1.22] group-hover:brightness-110"
              style={{ 
                maskImage: 'linear-gradient(to top, transparent 0%, black 20%, black 100%)', 
                WebkitMaskImage: 'linear-gradient(to top, transparent 0%, black 20%, black 100%)' 
              }}
              alt="" 
            />
          )}
        </div>

        {/* DOCK & FOOTER */}
        <div className="relative z-30 mt-auto w-full px-8 pb-12 pt-32 flex flex-col items-center">
            
            <a 
              href={getCtaHref(profile.cta_url)} 
              onClick={() => trackEvent(profile.id, 'click')}
              className="group flex items-center justify-center gap-3 w-full py-5 bg-white/10 backdrop-blur-3xl border border-white/20 rounded-[2.5rem] text-[16px] font-black text-white hover:bg-white hover:text-black transition-all duration-500 uppercase tracking-[0.35em] mb-14 shadow-[0_25px_60px_rgba(0,0,0,0.6)] active:scale-95"
            >
              <span className="drop-shadow-lg">{profile.cta_text || 'Contact Me'}</span>
              <ExternalLink className="w-4 h-4 opacity-25 group-hover:opacity-100 transition-opacity" />
            </a>

            {/* LEGAL HUD */}
            <div className="w-full grid grid-cols-3 items-center px-2 pt-8 border-t border-white/[0.05]">
               <div className="flex justify-start">
                 <img src="/equal-housing.png" className="h-7 w-auto brightness-200 opacity-80" alt="HUD" />
               </div>

               <div className="text-center">
                 <span className="text-[10px] font-black uppercase tracking-[0.25em] text-white/90 drop-shadow-md">
                   {profile.license_number}
                 </span>
               </div>

               <div className="flex justify-end">
                 <div className="flex flex-col items-center">
                   <img src="/lynxx-footer.png" className="h-7 w-auto mb-1 brightness-[1.8] contrast-150" alt="agent Lynxx" />
                   <div className="flex items-center gap-0.5 text-[7px] lowercase font-black text-[#00AEEF] tracking-tight">
                      agent<span className="uppercase text-white opacity-40">Lynxx</span>
                   </div>
                 </div>
               </div>
            </div>
        </div>
      </div>
    </div>
  );
}