'use client'
import React from 'react';
import Script from 'next/script';
import { trackEvent } from '@/app/actions/analytics';

const BRAND_BLUE = '#00AEEF'; 
const SOCIAL_ORDER = ['instagram', 'facebook', 'tiktok', 'youtube', 'linkedin', 'whatsapp', 'zillow'];
const SOCIAL_CONFIG: any = { instagram:'#E4405F', facebook:'#1877F2', tiktok:'#FFF', youtube:'#FF0000', linkedin:'#0077B5', whatsapp:'#25D366', zillow:'#006AFF' };

export default function SplashPage({ profile }: any) {
  return (
    <div className="min-h-screen w-full bg-black flex justify-center items-center p-0 md:p-4 font-sans overflow-hidden select-none">
      {profile.google_analytics_id && <><Script src={`https://www.googletagmanager.com/gtag/js?id=${profile.google_analytics_id}`} strategy="afterInteractive" /><Script id="ga" strategy="afterInteractive">{`window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', '${profile.google_analytics_id}');`}</Script></>}
      {profile.clarity_id && <Script id="mc" strategy="afterInteractive">{`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)}; t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i; y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y); })(window, document, "clarity", "script", "${profile.clarity_id}");`}</Script>}

      <div className="relative h-screen md:h-[850px] w-full max-w-[430px] flex flex-col text-white shadow-[0_0_120px_rgba(0,0,0,1)] md:rounded-[4.5rem] border-0 md:border-[12px] border-zinc-900 bg-black overflow-hidden group">
        <div className="absolute inset-0 z-0">
          {profile.video_bg_url && <video autoPlay muted loop playsInline className="h-full w-full object-cover opacity-60 contrast-125 brightness-[0.5]"><source src={profile.video_bg_url} type="video/mp4" /></video>}
          <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-transparent to-black" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-95" />
        </div>

        <header className="relative z-30 w-full px-8 pt-8 flex flex-col items-center text-center shrink-0">
            {profile.company_logo && <img src={profile.company_logo} className="h-16 w-auto object-contain mb-4 drop-shadow-2xl" />}
            <h1 className="text-4xl font-extralight tracking-tight text-white drop-shadow-2xl mb-8">{profile.agent_name}</h1>
            <div className="flex justify-center items-center gap-10 py-2">
               {SOCIAL_ORDER.filter(k => !!profile.social_links?.[k]).slice(0, 4).map((k) => (
                  <a key={k} href={profile.social_links[k]} target="_blank" className="group/icon transition-all duration-300 hover:scale-125">
                    <div style={{ maskImage: `url('/icons/${k}.svg')`, WebkitMaskImage: `url('/icons/${k}.svg')`, maskRepeat: 'no-repeat', WebkitMaskRepeat: 'no-repeat', maskPosition: 'center', WebkitMaskPosition: 'center', maskSize: 'contain', WebkitMaskSize: 'contain', backgroundColor: 'rgba(255,255,255,0.9)', '--hover-color': SOCIAL_CONFIG[k] || BRAND_BLUE } as any} className="w-7 h-7 transition-colors duration-300 group-hover/icon:!bg-[var(--hover-color)]" />
                  </a>
               ))}
            </div>
        </header>

        <main className="absolute inset-x-0 top-[30%] bottom-0 z-10 pointer-events-none flex justify-center overflow-hidden">
            {profile.avatar_url && <img src={profile.avatar_url} className="w-full h-auto aspect-[5/6] object-cover object-top origin-top transition-transform duration-1000 group-hover:scale-[1.05]" style={{ maskImage: 'linear-gradient(to top, transparent 0%, black 35%, black 100%)', WebkitMaskImage: 'linear-gradient(to top, transparent 0%, black 35%, black 100%)' }} />}
        </main>

        <footer className="relative z-30 mt-auto w-full px-8 pb-4 flex flex-col items-center">
            <a href={profile.cta_url || '#'} onClick={() => trackEvent(profile.id, 'click')} className="group inline-flex items-center justify-center w-auto min-w-[76%] px-10 py-4 bg-white/10 backdrop-blur-3xl border border-white/20 rounded-[2.5rem] text-[15px] font-black text-white hover:bg-[#00AEEF] hover:border-[#00AEEF] transition-all duration-300 tracking-[0.3em] mb-8 shadow-2xl active:scale-95 whitespace-nowrap overflow-hidden">
              <span className="drop-shadow-lg text-center">{profile.cta_text || 'Contact Me'}</span>
            </a>
            <div className="w-full grid grid-cols-3 items-center px-2 pb-2">
               <div className="flex justify-start"><img src="/equal-housing.png" className="h-10 w-auto brightness-200 opacity-90" /></div>
               <div className="text-center"><span className="text-[11px] font-medium uppercase tracking-[0.25em] text-white/90 whitespace-nowrap drop-shadow-md">{profile.license_number}</span></div>
               <div className="flex justify-end flex-col items-center">
                   <div style={{ maskImage: "url('/lynxx-footer.png')", WebkitMaskImage: "url('/lynxx-footer.png')", maskRepeat: 'no-repeat', WebkitMaskRepeat: 'no-repeat', maskSize: 'contain', WebkitMaskSize: 'contain', backgroundColor: BRAND_BLUE } as any} className="h-10 w-10 mb-1" />
                   <div className="flex items-center gap-0.5 text-[9px] lowercase font-black tracking-tight"><span className="text-white opacity-60">agent</span><span style={{ color: BRAND_BLUE }}>lynxx</span></div>
               </div>
            </div>
        </footer>
      </div>
    </div>
  );
}