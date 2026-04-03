'use client'

import React from 'react';
import { ExternalLink } from 'lucide-react';
import Script from 'next/script';
import { trackEvent } from '@/app/actions/analytics';

/**
 * BRANDFETCH INTEGRATION
 * Using Logo Link CDN for pixel-perfect official assets.
 * We use the brand domain to pull the exact icon.
 */
const BRAND_DOMAINS: Record<string, string> = {
  instagram: 'instagram.com',
  facebook: 'facebook.com',
  tiktok: 'tiktok.com',
  youtube: 'youtube.com',
  linkedin: 'linkedin.com',
  whatsapp: 'whatsapp.com',
  zillow: 'zillow.com',
  wechat: 'wechat.com'
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

      {/* VIEWPORT CONTAINER */}
      <div className="relative h-screen md:h-[850px] w-full max-w-[430px] flex flex-col text-white shadow-[0_0_120px_rgba(0,0,0,1)] md:rounded-[4.5rem] border-0 md:border-[12px] border-zinc-900 bg-black overflow-hidden group">
        
        {/* BACKGROUND VIDEO */}
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
            
            <h1 className="text-4xl font-extralight tracking-tighter text-white drop-shadow-[0_2px_15px_rgba(0,0,0,1)] mb-10 uppercase">
              {profile.agent_name}
            </h1>
            
            {/* OFFICIAL SOCIAL ICONS (Brandfetch CDN) */}
            <div className="flex justify-center items-center gap-8 py-2">
               {profile.social_links && Object.entries(profile.social_links).map(([platform, url]) => {
                 const domain = BRAND_DOMAINS[platform];
                 if (!domain || !url) return null;
                 
                 return (
                   <a 
                     key={platform} 
                     href={url as string} 
                     target="_blank" 
                     className="transition-all duration-300 hover:scale-125 hover:drop-shadow-[0_0_12px_rgba(0,174,239,0.6)]"
                   >
                     <img 
                        src={`https://cdn.brandfetch.io/${domain}/icon`} 
                        className="w-7 h-7 object-contain brightness-0 invert opacity-80 hover:opacity-100 hover:brightness-100 hover:invert-0 transition-all duration-300"
                        alt={platform}
                        onError={(e) => (e.currentTarget.style.display = 'none')}
                     />
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

        {/* INTERACTION ZONE */}
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