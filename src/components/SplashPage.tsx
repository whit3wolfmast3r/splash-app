'use client'

import React from 'react';
import { ExternalLink } from 'lucide-react';
import Script from 'next/script';
import { trackEvent } from '@/app/actions/analytics';

const SOCIAL_CONFIG: Record<string, { color: string }> = {
  instagram: { color: '#E4405F' },
  facebook: { color: '#1877F2' },
  tiktok: { color: '#FFFFFF' },
  youtube: { color: '#FF0000' },
  linkedin: { color: '#0077B5' },
  whatsapp: { color: '#25D366' },
  zillow: { color: '#006AFF' },
  wechat: { color: '#07C160' }
};

export default function SplashPage({ profile }: { profile: any }) {
  const getCtaHref = (url: string) => {
    if (!url) return '#';
    if (url.startsWith('tel:') || url.startsWith('sms:') || url.startsWith('mailto:')) return url;
    return url.startsWith('http') ? url : `https://${url}`;
  };

  return (
    <div className="min-h-screen w-full bg-[#050505] flex justify-center items-center p-0 md:p-4 font-sans overflow-hidden select-none">
      
      {/* ANALYTICS SECTION */}
      {profile.google_analytics_id && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${profile.google_analytics_id}`} strategy="afterInteractive" />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer ||[];
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

      {/* MAIN VIEWPORT WRAPPER */}
      <div className="relative h-screen md:h-[850px] w-full max-w-[430px] flex flex-col text-white shadow-[0_0_120px_rgba(0,0,0,1)] md:rounded-[4.5rem] border-0 md:border-[12px] border-zinc-900 bg-black overflow-hidden group">
        
        {/* VIDEO BACKGROUND LAYER */}
        <div className="absolute inset-0 z-0">
          {profile.video_bg_url && (
            <video autoPlay muted loop playsInline key={profile.video_bg_url} className="h-full w-full object-cover opacity-60 contrast-125 brightness-[0.5]">
              <source src={profile.video_bg_url} type="video/mp4" />
            </video>
          )}
          {/* Gradients to ensure text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-transparent to-black" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-95" />
        </div>

        {/* 1. TOP ZONE: IDENTITY (Fixed at top) */}
        <header className="relative z-30 w-full px-8 pt-16 flex flex-col items-center text-center shrink-0">
            {profile.company_logo && (
              <img 
                src={profile.company_logo} 
                className="h-16 w-auto object-contain mb-5 drop-shadow-[0_15px_30px_rgba(0,0,0,1)]" 
                alt="Brokerage" 
              />
            )}
            
            <h1 className="text-4xl font-extralight tracking-tight text-white drop-shadow-2xl mb-8">
              {profile.agent_name}
            </h1>
            
            {/* SOCIAL ICONS: CSS MASKED (Pure White, No Boxes) */}
            <div className="flex justify-center items-center gap-10 py-2">
               {profile.social_links && Object.entries(profile.social_links).map(([platform, url]) => {
                 const Config = SOCIAL_CONFIG[platform];
                 if (!url) return null;
                 
                 return (
                   <a 
                     key={platform} 
                     href={url as string} 
                     target="_blank" 
                     className="group/icon transition-all duration-300 hover:scale-125 hover:drop-shadow-[0_0_12px_rgba(0,174,239,0.5)]"
                   >
                     <div 
                        style={{ 
                            maskImage: `url('/icons/${platform}.svg')`, 
                            WebkitMaskImage: `url('/icons/${platform}.svg')`,
                            maskRepeat: 'no-repeat',
                            WebkitMaskRepeat: 'no-repeat',
                            maskPosition: 'center',
                            WebkitMaskPosition: 'center',
                            maskSize: 'contain',
                            WebkitMaskSize: 'contain',
                            backgroundColor: '#FFFFFF', // Forces pure white base, prevents generic squares
                            '--hover-color': Config?.color || '#00AEEF'
                        } as any}
                        className="w-7 h-7 transition-colors duration-300 group-hover/icon:!bg-[var(--hover-color)]"
                     />
                   </a>
                 );
               })}
            </div>
        </header>

        {/* 2. MIDDLE ZONE: AVATAR (HARD CEILING AT 38% DOWN THE SCREEN) */}
        <main className="absolute inset-x-0 top-[38%] bottom-0 z-10 pointer-events-none flex justify-center overflow-hidden">
            {profile.avatar_url && (
              <img 
                src={profile.avatar_url} 
                className="w-full h-auto aspect-[5/6] object-cover object-top origin-top transition-transform duration-1000 group-hover:scale-[1.05]"
                style={{ 
                  maskImage: 'linear-gradient(to top, transparent 0%, black 20%, black 100%)', 
                  WebkitMaskImage: 'linear-gradient(to top, transparent 0%, black 20%, black 100%)' 
                }}
                alt="" 
              />
            )}
        </main>

        {/* 3. BOTTOM ZONE: ACTION & HUD (Fixed at bottom over avatar) */}
        <footer className="relative z-30 mt-auto w-full px-8 pb-12 pt-32 flex flex-col items-center">
            
            {/* CTA BUTTON: Guatemalan Blue Hover, White Text */}
            <a 
              href={getCtaHref(profile.cta_url)} 
              onClick={() => trackEvent(profile.id, 'click')}
              className="group flex items-center justify-center gap-3 w-full py-5 bg-white/10 backdrop-blur-3xl border border-white/20 rounded-[2.5rem] text-[16px] font-black text-white hover:bg-[#00AEEF] hover:border-[#00AEEF] transition-all duration-500 uppercase tracking-[0.35em] mb-14 shadow-[0_25px_60px_rgba(0,0,0,0.6)] active:scale-95"
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
        </footer>
      </div>
    </div>
  );
}