'use client'

import { useState, useRef, useEffect } from 'react'
import { updateProfile } from '@/app/dashboard/actions'
import { Upload, Link, Phone, Mail, MessageSquare, Camera, Building2 } from 'lucide-react'

const VIDEO_THEMES = [
  { name: 'Modern Estate (Video 4)', url: 'https://hprgwoywlihlqnniaktp.supabase.co/storage/v1/object/public/videos/video4.mp4' },
  { name: 'Luxury Glass (Video 6)', url: 'https://hprgwoywlihlqnniaktp.supabase.co/storage/v1/object/public/videos/video6.mp4' },
  { name: 'Minimalist Interior (Video 7)', url: 'https://hprgwoywlihlqnniaktp.supabase.co/storage/v1/object/public/videos/video7.mp4' },
  { name: 'Urban Night (Video 8)', url: 'https://hprgwoywlihlqnniaktp.supabase.co/storage/v1/object/public/videos/video8.mp4' },
]

const CTA_TYPES = [
  { label: 'Website Link', value: 'link', icon: <Link size={14}/>, placeholder: 'https://calendly.com/user' },
  { label: 'Phone Call', value: 'tel', icon: <Phone size={14}/>, placeholder: '702-555-0123' },
  { label: 'Text Message', value: 'sms', icon: <MessageSquare size={14}/>, placeholder: '702-555-0123' },
  { label: 'Email Me', value: 'mailto', icon: <Mail size={14}/>, placeholder: 'name@agency.com' },
]

const SOCIAL_NETWORKS = [
  'Instagram', 'Facebook', 'TikTok', 'YouTube', 
  'LinkedIn', 'WhatsApp', 'Zillow', 'WeChat'
]

export default function DashboardForm({ profile, viewCount, clickCount }: { profile: any, viewCount: number, clickCount: number }) {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  
  // Detection for initial CTA type
  const initialType = profile?.cta_url?.startsWith('tel:') ? 'tel' : 
                     profile?.cta_url?.startsWith('sms:') ? 'sms' : 
                     profile?.cta_url?.startsWith('mailto:') ? 'mailto' : 'link';
  
  const [ctaType, setCtaType] = useState(initialType)

  // Local previews for better UX
  const [avatarPreview, setAvatarPreview] = useState(profile?.avatar_url)
  const [logoPreview, setLogoPreview] = useState(profile?.company_logo)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'avatar' | 'logo') => {
    const file = e.target.files?.[0]
    if (file) {
      const url = URL.createObjectURL(file)
      if (type === 'avatar') setAvatarPreview(url)
      else setLogoPreview(url)
    }
  }

  async function handleSubmit(formData: FormData) {
    setLoading(true)
    setMessage('')
    
    // Auto-prefix logic for CTA
    const rawCtaUrl = formData.get('cta_url') as string
    if (ctaType !== 'link' && rawCtaUrl && !rawCtaUrl.startsWith(ctaType)) {
       formData.set('cta_url', `${ctaType}:${rawCtaUrl.replace(`${ctaType}:`, '')}`)
    }

    const result = await updateProfile(formData)
    if (result?.error) setMessage('❌ ' + result.error)
    else setMessage('✅ Profile Live & Updated!')
    
    setLoading(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <form action={handleSubmit} encType="multipart/form-data" className="space-y-12 pb-20 text-white">
      
      {/* 1. HIDDEN PERSISTENCE FIELDS (Crucial Fix) */}
      <input type="hidden" name="current_avatar_url" value={profile?.avatar_url || ''} />
      <input type="hidden" name="current_company_logo" value={profile?.company_logo || ''} />

      {/* 📊 ANALYTICS HUD */}
      <div className="grid grid-cols-2 gap-4">
        {[
          { label: 'Total Views', val: viewCount, color: 'text-white' },
          { label: 'Button Clicks', val: clickCount, color: 'text-[#00AEEF]' }
        ].map((stat, i) => (
          <div key={i} className="bg-white/5 border border-white/10 backdrop-blur-md rounded-3xl p-6 text-center">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 mb-1">{stat.label}</p>
            <p className={`text-4xl font-light tracking-tighter ${stat.color}`}>{stat.val}</p>
          </div>
        ))}
      </div>

      {message && (
        <div className="p-4 rounded-2xl text-center text-xs font-black uppercase tracking-widest bg-[#00AEEF] text-black animate-pulse">
          {message}
        </div>
      )}

      {/* 📸 ASSET UPLOADS */}
      <section className="space-y-4">
        <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#00AEEF] px-1">Visual Branding</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Headshot Card */}
          <div className="relative group bg-white/5 border border-white/10 rounded-3xl p-8 flex flex-col items-center justify-center transition-all hover:border-[#00AEEF]/50">
            <div className="w-24 h-24 rounded-2xl overflow-hidden mb-4 border border-white/20 bg-black">
              {avatarPreview ? (
                <img src={avatarPreview} className="w-full h-full object-cover" />
              ) : (
                <Camera className="w-full h-full p-6 text-zinc-700" />
              )}
            </div>
            <label className="cursor-pointer bg-white text-black px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-[#00AEEF] hover:text-white transition-colors">
              {profile?.avatar_url ? 'Change Headshot' : 'Upload Headshot'}
              <input type="file" name="headshot" accept="image/png" className="hidden" onChange={(e) => handleFileChange(e, 'avatar')} />
            </label>
            <p className="text-[9px] text-zinc-500 mt-3 uppercase tracking-tighter font-bold">Transparent PNG (5:6 Ratio)</p>
          </div>

          {/* Logo Card */}
          <div className="relative group bg-white/5 border border-white/10 rounded-3xl p-8 flex flex-col items-center justify-center transition-all hover:border-[#00AEEF]/50">
            <div className="h-24 flex items-center justify-center mb-4">
              {logoPreview ? (
                <img src={logoPreview} className="max-h-16 w-auto object-contain" />
              ) : (
                <Building2 className="w-12 h-12 text-zinc-700" />
              )}
            </div>
            <label className="cursor-pointer border border-white/20 text-white px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-colors">
              {profile?.company_logo ? 'Change Logo' : 'Upload Logo'}
              <input type="file" name="company_logo_file" accept="image/png" className="hidden" onChange={(e) => handleFileChange(e, 'logo')} />
            </label>
            <p className="text-[9px] text-zinc-500 mt-3 uppercase tracking-tighter font-bold">White Logo Recommended</p>
          </div>
        </div>
      </section>

      {/* 🆔 PROFILE IDENTITY */}
      <section className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8 space-y-6">
        <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#00AEEF]">Identity & Credentials</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 ml-1">Username / URL</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#00AEEF] font-bold">/</span>
              <input name="username" defaultValue={profile?.username} required className="w-full bg-black border border-white/10 rounded-2xl p-4 pl-8 outline-none focus:border-[#00AEEF] font-bold text-white" />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 ml-1">Display Name</label>
            <input name="agent_name" defaultValue={profile?.agent_name} className="w-full bg-black border border-white/10 rounded-2xl p-4 outline-none focus:border-[#00AEEF] font-bold text-white" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 ml-1">License Number</label>
            <input name="license_number" defaultValue={profile?.license_number} className="w-full bg-black border border-white/10 rounded-2xl p-4 outline-none focus:border-[#00AEEF] font-mono text-white" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 ml-1">Theme Background</label>
            <select name="video_bg_url" defaultValue={profile?.video_bg_url} className="w-full bg-black border border-white/10 rounded-2xl p-4 outline-none focus:border-[#00AEEF] appearance-none cursor-pointer">
              {VIDEO_THEMES.map(v => <option key={v.url} value={v.url}>{v.name}</option>)}
            </select>
          </div>
        </div>
      </section>

      {/* ⚡ SMART CTA ACTION */}
      <section className="bg-[#00AEEF]/5 border border-[#00AEEF]/20 rounded-3xl p-6 md:p-8 space-y-6">
        <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#00AEEF]">Primary Action Button</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <select 
            value={ctaType}
            onChange={(e) => setCtaType(e.target.value)}
            name="cta_type_select"
            className="w-full bg-black border border-white/10 rounded-2xl p-4 outline-none font-bold text-white appearance-none cursor-pointer"
          >
            {CTA_TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
          </select>
          <input 
            name="cta_text" 
            defaultValue={profile?.cta_text} 
            placeholder="Button Text (e.g. Book Now)" 
            className="w-full bg-black border border-white/10 rounded-2xl p-4 outline-none focus:border-[#00AEEF]" 
          />
          <input 
            name="cta_url" 
            defaultValue={profile?.cta_url?.replace(`${ctaType}:`, '')} 
            placeholder={CTA_TYPES.find(t => t.value === ctaType)?.placeholder}
            className="w-full bg-black border border-white/10 rounded-2xl p-4 outline-none focus:border-[#00AEEF] text-[#00AEEF]" 
          />
        </div>
      </section>

      {/* 🌐 SOCIAL MEDIA */}
      <section className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8 space-y-6">
        <div className="flex justify-between items-end">
           <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#00AEEF]">Social Channels</h3>
           <span className="text-[9px] text-zinc-500 uppercase font-bold tracking-widest">Top 4 show on mobile</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {SOCIAL_NETWORKS.map(net => (
            <div key={net} className="flex items-center gap-3 bg-black/40 p-2 pr-4 rounded-2xl border border-white/5">
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-[#00AEEF] font-bold text-[10px]">
                {net[0]}
              </div>
              <input 
                name={`social_${net.toLowerCase()}`} 
                defaultValue={profile?.social_links?.[net.toLowerCase()]} 
                placeholder={`${net} username/link`} 
                className="flex-1 bg-transparent border-none outline-none text-sm placeholder:text-zinc-700" 
              />
            </div>
          ))}
        </div>
      </section>

      {/* PUBLISH BUTTON */}
      <button 
        disabled={loading} 
        type="submit" 
        className="group relative w-full bg-white text-black font-black py-8 rounded-[40px] shadow-2xl overflow-hidden hover:bg-[#00AEEF] hover:text-white transition-all active:scale-[0.98] disabled:bg-zinc-800 uppercase tracking-[0.4em] text-xs"
      >
        <div className="relative z-10 flex items-center justify-center gap-3">
          {loading ? 'Transmitting Data...' : 'Save & Publish Live'}
          <Upload size={16} className="group-hover:translate-y-[-2px] transition-transform" />
        </div>
      </button>

    </form>
  )
}