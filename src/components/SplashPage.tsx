'use client'

import React from 'react'
import { ExternalLink, Instagram, Facebook, Youtube, Linkedin, Phone } from 'lucide-react'

export default function SplashPage({ profile }: { profile: any }) {
  const socialLinks = profile.social_links || {}
  
  return (
    <main className="relative h-screen w-full bg-[#050505] overflow-hidden flex flex-col font-sans">
      
      {/* 🎥 BACKGROUND VIDEO */}
      <div className="absolute inset-0 z-0">
        <video autoPlay loop muted playsInline className="h-full w-full object-cover opacity-40">
          <source src={profile.video_bg_url} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black" />
      </div>

      {/* 🏗 TOP UI: LOGO & NAME */}
      <div className="relative z-30 flex flex-col items-center pt-10 px-6 text-center">
        <div className="h-20 w-full flex items-center justify-center mb-4">
          {profile.company_logo && (
            <img src={profile.company_logo} alt="Brokerage" className="max-h-full max-w-[200px] object-contain" />
          )}
        </div>

        <h1 className="text-3xl font-light tracking-[0.15em] text-white uppercase">
          {profile.agent_name}
        </h1>

        <div className="flex gap-6 mt-6 text-white/70">
          {Object.entries(socialLinks).map(([net, url]: any) => (
            <a key={net} href={url} target="_blank" className="hover:text-[#00AEEF] transition-all"><ExternalLink size={20}/></a>
          ))}
        </div>
      </div>

      {/* 🧍 THE AGENT (Smart Frame) */}
      <div className="absolute inset-x-0 bottom-0 z-10 flex flex-col items-center pointer-events-none">
        <div className="relative transform translate-y-[30px]">
          {profile.avatar_url && (
            <img src={profile.avatar_url} alt="Agent" className="max-h-[78vh] w-auto object-contain drop-shadow-[0_0_50px_rgba(0,0,0,0.8)]" />
          )}
        </div>
      </div>

      {/* 🔘 CTA BUTTON */}
      <div className="absolute bottom-28 inset-x-0 z-40 px-6 flex justify-center">
        <a href={profile.cta_url} className="w-full max-w-sm rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl p-5 flex items-center justify-between">
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white pl-4">{profile.cta_text}</span>
          <div className="bg-white/10 p-2 rounded-lg"><ExternalLink size={16} className="text-white" /></div>
        </a>
      </div>

      {/* 🏁 LEGAL FOOTER (Restored) */}
      <footer className="absolute bottom-0 inset-x-0 z-50 bg-black/40 backdrop-blur-md border-t border-white/5 px-8 py-6">
        <div className="max-w-md mx-auto grid grid-cols-3 items-center">
          {/* EQUAL HOUSING (SVG) */}
          <div className="flex justify-start">
            <svg className="w-6 h-6 fill-white opacity-40" viewBox="0 0 24 24">
              <path d="M12 3L2 12h3v8h14v-8h3L12 3zm0 14c-1.65 0-3-1.35-3-3s1.35-3 3-3 3 1.35 3 3-1.35 3-3 3z"/>
            </svg>
          </div>

          {/* LICENSE */}
          <div className="text-center text-[8px] font-black uppercase tracking-widest text-white/30 whitespace-nowrap">
            NV: {profile.license_number}
          </div>

          {/* AGENT LYNXX LOGO */}
          <div className="flex flex-col items-end gap-1">
            <div className="flex items-center gap-0.5">
               <span className="text-[9px] lowercase font-light text-white/40">agent</span>
               <span className="text-[9px] uppercase font-bold text-[#00AEEF]">Lynxx</span>
            </div>
            {/* Blue Icon Placeholder */}
            <div className="w-4 h-4 bg-[#00AEEF] rounded-sm opacity-50" />
          </div>
        </div>
      </footer>
    </main>
  )
}