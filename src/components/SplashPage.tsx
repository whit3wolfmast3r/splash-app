'use client'

import React, { useMemo } from 'react'
import Image from 'next/image'
import { ExternalLink, Instagram, Facebook, Youtube, Linkedin } from 'lucide-react'

// Custom Brand Icon Components
const ZillowIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M19.34 11.29l-6.83-6.84a.73.73 0 00-1.03 0l-6.84 6.84a.24.24 0 00.17.41h2.24v6.86c0 .13.11.24.24.24h3.7c.13 0 .24-.11.24-.24v-3.52c0-.13.11-.24.24-.24h1.4c.13 0 .24.11.24.24v3.52c0 .13.11.24.24.24h3.7c.13 0 .24-.11.24-.24V11.7h2.24a.24.24 0 00.17-.41z"/></svg>
)
const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.653a11.888 11.888 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
)

export default function SplashPage({ profile }: { profile: any }) {
  // Check image ratio for the "Smart Frame" logic
  const isTall = useMemo(() => {
    // In a real scenario, you'd detect this on load. 
    // For now, we use a safety check or assume 5:6
    return true 
  }, [])

  const socialLinks = profile.social_links || {}

  const socialIconsMap: any = {
    instagram: <Instagram size={20} />,
    facebook: <Facebook size={20} />,
    youtube: <Youtube size={20} />,
    linkedin: <Linkedin size={20} />,
    zillow: <ZillowIcon />,
    whatsapp: <WhatsAppIcon />,
    // Add TikTok, WeChat paths as needed
  }

  return (
    <main className="relative h-screen w-full bg-[#050505] overflow-hidden flex flex-col font-sans">
      
      {/* 🎥 BACKGROUND LAYER */}
      <div className="absolute inset-0 z-0 bg-black">
        <video
          autoPlay
          loop
          muted
          playsInline
          key={profile.video_bg_url} // Forces reload if theme changes
          className="h-full w-full object-cover opacity-50"
        >
          <source src={profile.video_bg_url} type="video/mp4" />
        </video>
        {/* Luxury Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
      </div>

      {/* 🏗 UI TOP: LOGO & IDENTITY */}
      <div className="relative z-20 flex flex-col items-center pt-12 px-6 text-center">
        {/* BROKERAGE LOGO */}
        <div className="h-16 w-full flex items-center justify-center mb-6">
          {profile.company_logo ? (
            <img 
              src={profile.company_logo} 
              alt="Brokerage" 
              className="max-h-full max-w-[200px] object-contain drop-shadow-2xl"
            />
          ) : (
            <div className="h-10 w-10 bg-white/10 rounded-full animate-pulse" />
          )}
        </div>

        {/* AGENT NAME */}
        <h1 className="text-3xl font-light tracking-[0.1em] text-white uppercase drop-shadow-lg">
          {profile.agent_name}
        </h1>

        {/* SOCIAL DOCK (TOP) */}
        <div className="flex gap-5 mt-6 text-white/70">
          {Object.entries(socialLinks).map(([network, url]: any) => (
            <a 
              key={network} 
              href={url} 
              target="_blank" 
              className="hover:text-[#00AEEF] transition-colors drop-shadow-md"
            >
              {socialIconsMap[network] || <ExternalLink size={20} />}
            </a>
          ))}
        </div>
      </div>

      {/* 🧍 THE "SMART FRAME" AGENT ASSET */}
      <div className="absolute inset-x-0 bottom-0 z-10 flex flex-col items-center pointer-events-none">
        <div className={`relative transition-all duration-1000 ${isTall ? 'scale-110 translate-y-12' : 'translate-y-[-145px]'}`}>
          {profile.avatar_url && (
            <img 
              src={profile.avatar_url} 
              alt={profile.agent_name} 
              className="max-h-[75vh] w-auto object-contain select-none drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
            />
          )}
        </div>
      </div>

      {/* 🔘 CALL TO ACTION DOCK */}
      <div className="absolute bottom-24 inset-x-0 z-30 px-6 flex justify-center">
        <a 
          href={profile.cta_url}
          className="group relative w-full max-w-sm overflow-hidden rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl p-5 flex items-center justify-between transition-all hover:border-[#00AEEF]/50 hover:bg-white/10 pointer-events-auto"
        >
          <span className="text-xs font-black uppercase tracking-[0.3em] text-white pl-4">
            {profile.cta_text || 'Book Consultation'}
          </span>
          <div className="bg-white/10 p-2 rounded-lg group-hover:bg-[#00AEEF] transition-colors">
             <ExternalLink size={16} className="text-white" />
          </div>
        </a>
      </div>

      {/* 🏁 FOOTER: THE "AGENT LYNXX" SIGNATURE */}
      <footer className="absolute bottom-0 inset-x-0 z-40 bg-black/40 backdrop-blur-md border-t border-white/5 px-6 py-6">
        <div className="max-w-md mx-auto grid grid-cols-3 items-center">
          {/* Equal Housing Icon */}
          <div className="flex justify-start">
            <svg className="w-6 h-6 fill-white opacity-40" viewBox="0 0 24 24"><path d="M12 3L2 12h3v8h14v-8h3L12 3zm0 14c-1.65 0-3-1.35-3-3s1.35-3 3-3 3 1.35 3 3-1.35 3-3 3z"/></svg>
          </div>

          {/* License Number */}
          <div className="text-center text-[8px] font-black uppercase tracking-widest text-white/30">
            NV: {profile.license_number || 'S.0179666.LLC'}
          </div>

          {/* agent Lynxx Branding */}
          <div className="flex flex-col items-end gap-1">
             <div className="flex items-center gap-1">
                <span className="text-[10px] lowercase font-light text-white/40">agent</span>
                <span className="text-[10px] uppercase font-bold text-[#00AEEF] tracking-tighter">Lynxx</span>
             </div>
             <img src="/lynxx-signature-icon.svg" className="h-4 opacity-50" />
          </div>
        </div>
      </footer>
    </main>
  )
}