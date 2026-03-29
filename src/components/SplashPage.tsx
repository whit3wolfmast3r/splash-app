'use client'

import React from 'react'
import { ExternalLink, Instagram, Facebook, Youtube, Linkedin, MessageSquare, Phone } from 'lucide-react'

// Custom Brand Icons
const ZillowIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M19.34 11.29l-6.83-6.84a.73.73 0 00-1.03 0l-6.84 6.84a.24.24 0 00.17.41h2.24v6.86c0 .13.11.24.24.24h3.7c.13 0 .24-.11.24-.24v-3.52c0-.13.11-.24.24-.24h1.4c.13 0 .24.11.24.24v3.52c0 .13.11.24.24.24h3.7c.13 0 .24-.11.24-.24V11.7h2.24a.24.24 0 00.17-.41z"/></svg>
)

export default function SplashPage({ profile }: { profile: any }) {
  const socialLinks = profile.social_links || {}
  
  const socialIconsMap: any = {
    instagram: <Instagram size={20} />,
    facebook: <Facebook size={20} />,
    youtube: <Youtube size={20} />,
    linkedin: <Linkedin size={20} />,
    zillow: <ZillowIcon />,
    whatsapp: <Phone size={20} />, // Fallback to Phone icon for WhatsApp
  }

  return (
    <main className="relative h-screen w-full bg-[#050505] overflow-hidden flex flex-col font-sans">
      
      {/* 1. BACKGROUND VIDEO (Fixed to fill entire screen) */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-cover opacity-40"
        >
          <source src={profile.video_bg_url} type="video/mp4" />
        </video>
        {/* Dark Vignette to make content pop */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black" />
      </div>

      {/* 2. HEADER: BROKERAGE LOGO & AGENT NAME */}
      <div className="relative z-30 flex flex-col items-center pt-10 px-6 text-center">
        {/* FIXED COMPANY LOGO */}
        <div className="h-20 w-full flex items-center justify-center mb-4">
          {profile.company_logo ? (
            <img 
              src={profile.company_logo} 
              alt="Brokerage Logo" 
              className="max-h-full max-w-[220px] object-contain drop-shadow-xl"
            />
          ) : (
            <div className="h-1 bg-white/10 w-24 rounded-full" /> // Subtle spacer if no logo
          )}
        </div>

        <h1 className="text-3xl md:text-4xl font-light tracking