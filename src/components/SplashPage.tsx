'use client'

import React from 'react'
import { ExternalLink, Instagram, Facebook, Youtube } from 'lucide-react'

export default function SplashPage({ profile }: { profile: any }) {
  const social = profile.social_links || {}

  return (
    <main className="relative h-screen w-full bg-black overflow-hidden flex flex-col">
      
      {/* 1. BACKGROUND VIDEO */}
      <div className="absolute inset-0 z-0">
        <video autoPlay loop muted playsInline key={profile.video_bg_url} className="h-full w-full object-cover opacity-40">
          <source src={profile.video_bg_url} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black" />
      </div>

      {/* 2. TOP SECTION: LOGO & NAME */}
      <div className="relative z-30 flex flex-col items-center pt-12 px-6 text-center">
        <div className="h-16 mb-4">
          {profile.company_logo && (
            <img src={profile.company_logo} alt="Brokerage" className="h-full w-auto object-contain" />
          )}
        </div>
        <h1 className="text-3xl font-light tracking-[0.2em] text-white uppercase drop-shadow-md">
          {profile.agent_name}
        </h1>
        <div className="flex gap-6 mt-6 text-white/50">
          {social.instagram && <a href={social.instagram} target="_blank"><Instagram size={20}/></a>}
          {social.facebook && <a href={social.facebook} target="_blank"><Facebook size={20}/></a>}
          {social.youtube && <a href={social.youtube} target="_blank"><Youtube size={20}/></a>}
          {social.zillow && <a href={social.zillow} target="_blank"><ExternalLink size={20}/></a>}
        </div>
      </div>

      {/* 3. THE AGENT (Smart Frame - Pinned to bottom) */}
      <div className="absolute inset-x-0 bottom-0 z-10 flex flex-col items-center pointer-events-none">
        {profile.avatar_url && (
          <img 
            src={profile.avatar_url} 
            alt="Agent" 
            className="max-h-[80vh] w-auto object-contain transform translate-y-[20px]" 
          />
        )}
      </div>

      {/* 4. CALL TO ACTION BUTTON */}
      <div className="absolute bottom-28 inset-x-0 z-40 px-6 flex justify-center">
        <a href={profile.cta_url} className="w-full max-w-sm rounded-2xl bg-white/10 border border-white/20 backdrop-blur-xl p-5 flex items-center justify-between pointer-events-auto">
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white pl-4">
            {profile.cta_text || 'Book Consultation'}
          </span>
          <div className="bg-[#00AEEF] p-2 rounded-lg">
             <ExternalLink size={16} className="text-white" />
          </div>
        </a>
      </div>

      {/* 5. TRANSPARENT LEGAL FOOTER */}
      <footer className="absolute bottom-0 inset-x-0 z-50 px-8 py-8">
        <div className="max-w-md mx-auto grid grid-cols-3 items-center">
          {/* Equal Housing Logo */}
          <div className="flex justify-start">
            <svg className="w-6 h-6 fill-white opacity-40" viewBox="0 0 24 24">
              <path d="M12 3L2 12h3v8h14v-8h3L12 3zm0 14c-1.65 0-3-1.35-3-3s1.35-3 3-3 3 1.35 3 3-1.35 3-3 3z"/>
            </svg>
          </div>

          {/* NV License (Legally Required) */}
          <div className="text-center text-[8px] font-black uppercase tracking-widest text-white/30">
            NV: {profile.license_number}
          </div>

          {/* agent Lynxx Signature */}
          <div className="flex flex-col items-end">
             <div className="flex items-center gap-0.5 text-[10px] lowercase text-white/40">
                agent<span className="uppercase font-bold text-[#00AEEF]">Lynxx</span>
             </div>
          </div>
        </div>
      </footer>
    </main>
  )
}