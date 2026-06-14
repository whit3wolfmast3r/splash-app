'use client'
import React from 'react';
import Script from 'next/script';
import { trackEvent } from '@/app/actions/analytics';

const BRAND_BLUE = '#00AEEF'; 
const SOCIAL_ORDER = ['instagram', 'facebook', 'tiktok', 'youtube', 'linkedin', 'whatsapp', 'zillow'];
const CONFIG: any = { instagram:'#E4405F', facebook:'#1877F2', tiktok:'#FFF', youtube:'#FF0000', linkedin:'#0077B5', whatsapp:'#25D366', zillow:'#006AFF' };

export default function SplashPage({ profile }: any) {
  const getCtaHref = (u: string) => (!u ? '#' : u.includes(':') ? u : `https://${u}`);

  return (
    <div className="min-h-screen w-full bg-black flex justify-center items-center p-0 md:p-4 font-sans overflow-hidden select-none">
      {/* 1. TRACKING STACK */}
      {profile.google_analytics_id && <><Script src={`https://www.googletagmanager.com/gtag/js?id=${profile.google_analytics_id}`} strategy="afterInteractive" /><Script id="ga">{`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${profile.google_analytics_id}');`}</Script></>}
      {profile.facebook_pixel_id && <Script id="fb">{`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${profile.facebook_pixel_id}');fbq('track','PageView');`}</Script>}
      {profile.clarity_id && <Script id="mc">{`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)}; t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i; y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y); })(window, document, "clarity", "script", "${profile.clarity_id}");`}</Script>}

      {/* 2. DEVICE CONTAINER */}
      <div className="relative h-screen md:h-[850px] w-full max-w-[430px] flex flex-col text-white shadow-[0_0_120px_rgba(0,0,0,1)] md:rounded-[4.5rem] border-0 md:border-[12px] border-zinc-900 bg-black overflow-hidden group">
        <div className="absolute inset-0 z-0">
          {profile.video_bg_url && <video autoPlay muted loop playsInline className="h-full w-full object-cover opacity-60 contrast-125 brightness-[0.5]"><source src={profile.video_bg_url} type="video/mp4" /></video>}
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-95" />
        </div>

        <header className="relative z-30 w-full px-8 pt-10 flex flex-col items-center text-center shrink-0">
            <div className="mb-4 min-h-[60px] flex items-center justify-center">
                {profile.company_logo_url ? (
                    <img src={profile.company_logo_url} className="h-16 w-auto object-contain drop-shadow-2xl" />
                ) : (
                    <span className="text-[11px] font-black uppercase tracking-[0.3em] text-white/50">{profile.company_name}</span>
                )}
            </div>
            <h1 className="text-4xl font-extralight tracking-tight text-white drop-shadow-2xl mb-8">{profile.agent_name}</h1>
            <div className="flex justify-center items-center gap-10 py-2">
               {SOCIAL_ORDER.filter(k => !!profile.social_links?.[k]).slice(0, 4).map((k) => (
                  <a key={k} href={profile.social_links[k]} target="_blank" className="group/icon transition-all duration-300 hover:scale-125">
                    <div style={{ maskImage:`url('/icons/${k}.svg')`, WebkitMaskImage:`url('/icons/${k}.svg')`, maskSize:'contain', maskRepeat:'no-repeat', maskPosition:'center', backgroundColor:'rgba(255,255,255,0.9)', '--h':CONFIG[k]||BRAND_BLUE } as any} className="w-7 h-7 transition-colors group-hover/icon:!bg-[var(--h)]" />
                  </a>
               ))}
            </div>
        </header>

        {/* RE-POSITIONED HEADSHOT (Higher and Clean Fade) */}
        <main className="absolute inset-x-0 bottom-0 top-[22%] z-10 pointer-events-none flex justify-center overflow-hidden">
            {profile.avatar_url && (
                <img src={profile.avatar_url} className="w-full h-auto aspect-[5/6] object-cover object-top origin-top group-hover:scale-[1.03] transition-transform duration-1000" style={{ maskImage:'linear-gradient(to top, transparent 5%, black 45%, black 100%)', WebkitMaskImage:'linear-gradient(to top, transparent 5%, black 45%, black 100%)' }} />
            )}
        </main>

        <footer className="relative z-30 mt-auto w-full px-8 pb-4 flex flex-col items-center bg-gradient-to-t from-black via-black/90 to-transparent pt-24">
            <a href={getCtaHref(profile.cta_url)} onClick={() => trackEvent(profile.id, 'click')} className="group inline-flex items-center justify-center w-auto min-w-[76%] px-10 py-4.5 bg-white/10 backdrop-blur-3xl border border-white/20 rounded-[2.5rem] text-[15px] font-black text-white hover:bg-[#00AEEF] hover:border-[#00AEEF] transition-all duration-300 uppercase tracking-[0.2em] mb-8 shadow-2xl active:scale-95 whitespace-nowrap overflow-hidden">
              <span className="drop-shadow-lg text-center">{profile.cta_text || 'Contact Me'}</span>
            </a>
            <div className="w-full grid grid-cols-3 items-center px-2 pb-2">
               <div className="flex justify-start"><img src="/equal-housing.png" className="h-10 w-auto brightness-200 opacity-90" /></div>
               <div className="text-center"><span className="text-[11px] font-medium uppercase tracking-[0.25em] text-white/90 whitespace-nowrap drop-shadow-md">{profile.license_number}</span></div>
               <div className="flex justify-end flex-col items-center">
                   <div style={{ maskImage: "url('/lynxx-footer.png')", WebkitMaskImage: "url('/lynxx-footer.png')", maskSize:'contain', maskRepeat:'no-repeat', backgroundColor:BRAND_BLUE } as any} className="h-10 w-10 mb-1" />
                   <div className="flex text-[9px] lowercase font-black"><span className="opacity-50">agent</span><span style={{color:BRAND_BLUE}}>lynxx</span></div>
               </div>
            </div>
        </footer>
      </div>
    </div>
  );
}