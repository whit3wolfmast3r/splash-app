'use client'

import React from 'react'
import { ExternalLink, Instagram, Facebook, Youtube, Linkedin } from 'lucide-react'

// Brand Specific Icons
const ZillowIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M19.34 11.29l-6.83-6.84a.73.73 0 00-1.03 0l-6.84 6.84a.24.24 0 00.17.41h2.24v6.86c0 .13.11.24.24.24h3.7c.13 0 .24-.11.24-.24v-3.52c0-.13.11-.24.24-.24h1.4c.13 0 .24.11.24.24v3.52c0 .13.11.24.24.24h3.7c.13 0 .24-.11.24-.24V11.7h2.24a.24.24 0 00.17-.41z"/></svg>
)

export default function SplashPage({ profile }: { profile: any }) {
  const social = profile.social_links || {}
  
  const getIcon = (net: string) => {
    switch(net.toLowerCase()) {
      case 'instagram': return <Instagram size={20} />;
      case 'facebook': return <Facebook size={20} />;
      case 'youtube': return <Youtube size={20} />;
      case 'linkedin': return <Linkedin size={20} />;
      case 'zillow': return <ZillowIcon />;
      default: return <ExternalLink size={20} />;
    }
  }

  return (
    <main className="relative h-screen w-full bg-[#050505] overflow-hidden flex flex-col font-sans">
      
      {/* 🎥 VIDEO BG */}
      <div className="absolute inset-0 z-0 bg-black">
        <video autoPlay loop muted playsInline key={profile.video_bg_url} className="h-full w-full object-cover opacity-40">
          <source src={profile.video_bg_url} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-[#050505]" />
      </div>

      {/* 🏗 TOP UI: LOGO & IDENTITY */}
      <div className="relative z-30 flex flex-col items-center pt-12 px-6 text-center">
        <div className="h-16 w-full flex items-center justify-center mb-6">
          {profile.company_logo && (
            <img src={profile.company_logo} alt="Brokerage" className="max-h-full max-w-[200px] object-contain drop-shadow-2xl" />
          )}
        </div>

        <h1 className="text-3xl font-light tracking-[0.2em] text-white uppercase drop-shadow-md">
          {profile.agent_name}
        </h1>

        <div className="flex gap-6 mt-6 text-white/50">
          {Object.entries(social).map(([net, url]: any) => (
            <a key={net} href={url} target="_blank" className="hover:text-[#00AEEF] transition-all">{getIcon(net)}</a>
          ))}
        </div>
      </div>

      {/* 🧍 THE AGENT (Pinned Floor Layout) */}
      <div className="absolute inset-x-0 bottom-0 z-10 flex flex-col items-center pointer-events-none">
        <div className="relative transform translate-y-[20px] md:translate-y-[40px]">
          {profile.avatar_url && (
            <img src={profile.avatar_url} alt="Agent" className="max-h-[82vh] w-auto object-contain select-none drop-shadow-[0_0_80px_rgba(0,0,0,0.9)]" />
          )}
        </div>
      </div>

      {/* 🔘 CALL TO ACTION DOCK */}
      <div className="absolute bottom-28 inset-x-0 z-40 px-6 flex justify-center">
        <a href={profile.cta_url} className="group w-full max-w-[340px] rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl p-5 flex items-center justify-between hover:bg-white/10 transition-all pointer-events-auto">
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white pl-4">
            {profile.cta_text || 'Book Consultation'}
          </span>
          <div className="bg-[#00AEEF] p-2 rounded-lg">
             <ExternalLink size={16} className="text-white" />
          </div>
        </a>
      </div>

      {/* 🏁 THE "LEGAL GRID" FOOTER */}
      <footer className="absolute bottom-0 inset-x-0 z-50 px-8 py-8">
        <div className="max-w-md mx-auto grid grid-cols-3 items-center">
          <div className="flex justify-start">
            <svg className="w-6 h-6 fill-white opacity-40" viewBox="0 0 24 24"><path d="M12 3L2 12h3v8h14v-8h3L12 3zm0 14c-1.65 0-3-1.35-3-3s1.35-3 3-3 3 1.35 3 3-1.35 3-3 3z"/></svg>
          </div>
          <div className="text-center text-[8px] font-black uppercase tracking-widest text-white/30">
            NV: {profile.license_number}
          </div>
          <div className="flex flex-col items-end">
             <div className="flex items-center gap-0.5 text-[10px] lowercase font-light text-white/40">
                agent<span className="uppercase font-bold text-[#00AEEF]">Lynxx</span>
             </div>
          </div>
        </div>
      </footer>
    </main>
  )
}