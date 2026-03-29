'use client'

import { useState } from 'react'
import { updateProfile } from '@/app/dashboard/actions'
import { Upload, Link, Phone, Mail, MessageSquare, Camera, Building2, BarChart3 } from 'lucide-react'

const VIDEO_THEMES = [
  { name: 'Modern Estate (Video 4)', url: 'https://hprgwoywlihlqnniaktp.supabase.co/storage/v1/object/public/videos/video4.mp4' },
  { name: 'Luxury Glass (Video 6)', url: 'https://hprgwoywlihlqnniaktp.supabase.co/storage/v1/object/public/videos/video6.mp4' },
  { name: 'Minimalist Interior (Video 7)', url: 'https://hprgwoywlihlqnniaktp.supabase.co/storage/v1/object/public/videos/video7.mp4' },
  { name: 'Urban Night (Video 8)', url: 'https://hprgwoywlihlqnniaktp.supabase.co/storage/v1/object/public/videos/video8.mp4' },
]

const CTA_TYPES = [
  { label: 'Website Link', value: 'link', icon: <Link size={14}/>, placeholder: 'www.yourwebsite.com' },
  { label: 'Phone Call', value: 'tel', icon: <Phone size={14}/>, placeholder: '702-555-0123' },
  { label: 'Text Message', value: 'sms', icon: <MessageSquare size={14}/>, placeholder: '702-555-0123' },
  { label: 'Email Me', value: 'mailto', icon: <Mail size={14}/>, placeholder: 'name@agency.com' },
]

const SOCIAL_NETWORKS = ['Instagram', 'Facebook', 'TikTok', 'YouTube', 'LinkedIn', 'WhatsApp', 'Zillow', 'WeChat']

export default function DashboardForm({ profile, viewCount, clickCount }: { profile: any, viewCount: number, clickCount: number }) {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  
  const initialType = profile?.cta_url?.startsWith('tel:') ? 'tel' : 
                     profile?.cta_url?.startsWith('sms:') ? 'sms' : 
                     profile?.cta_url?.startsWith('mailto:') ? 'mailto' : 'link';
  
  const [ctaType, setCtaType] = useState(initialType)
  const [avatarPreview, setAvatarPreview] = useState(profile?.avatar_url)
  const [logoPreview, setLogoPreview] = useState(profile?.company_logo)

  // Strips prefixes like tel:, sms:, mailto: for user-friendly editing
  const cleanUrl = (url: string, type: string) => {
    if (!url) return '';
    return url.replace(`${type}:`, '');
  }

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
    
    // Auto-prefix logic before sending to server
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
    <form action={handleSubmit} encType="multipart/form-data" className="space-y-12 pb-20 text-white font-sans">
      
      <input type="hidden" name="current_avatar_url" value={profile?.avatar_url || ''} />
      <input type="hidden" name="current_company_logo" value={profile?.company_logo || ''} />

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white/5 border border-white/10 rounded-3xl p-6 text-center">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 mb-1">Views</p>
          <p className="text-4xl font-light tracking-tighter">{viewCount || 0}</p>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-3xl p-6 text-center">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#00AEEF] mb-1">Clicks</p>
          <p className="text-4xl font-light tracking-tighter text-[#00AEEF]">{clickCount || 0}</p>
        </div>
      </div>

      {message && (
        <div className="p-4 rounded-2xl text-center text-xs font-black uppercase tracking-widest bg-[#00AEEF] text-black">
          {message}
        </div>
      )}

      {/* ASSET UPLOADS */}
      <section className="space-y-4">
        <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#00AEEF]">Branding Assets</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 flex flex-col items-center">
            {/* UPDATED: Added 5:6 aspect ratio preview container */}
            <div className="w-32 aspect-[5/6] rounded-2xl overflow-hidden mb-4 border border-white/20 bg-black">
              {avatarPreview ? <img src={avatarPreview} className="w-full h-full object-cover" /> : <Camera className="w-full h-full p-10 text-zinc-700" />}
            </div>
            <label className="cursor-pointer bg-white text-black px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest">
              Headshot (5:6)
              <input type="file" name="headshot" accept="image/png" className="hidden" onChange={(e) => handleFileChange(e, 'avatar')} />
            </label>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 flex flex-col items-center">
            <div className="h-32 flex items-center justify-center mb-4">
              {logoPreview ? <img src={logoPreview} className="max-h-16 w-auto object-contain" /> : <Building2 className="w-12 h-12 text-zinc-700" />}
            </div>
            <label className="cursor-pointer border border-white/20 text-white px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest">
              Logo
              <input type="file" name="company_logo_file" accept="image/png" className="hidden" onChange={(e) => handleFileChange(e, 'logo')} />
            </label>
          </div>
        </div>
      </section>

      {/* SMART CTA */}
      <section className="bg-[#00AEEF]/5 border border-[#00AEEF]/20 rounded-3xl p-8 space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#00AEEF]">Action Button</h3>
          <span className="text-[8px] text-zinc-500 font-bold uppercase">Dynamic Links</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase text-zinc-500 ml-2">Type</label>
            <select value={ctaType} onChange={(e) => setCtaType(e.target.value)} className="w-full bg-black border border-white/10 rounded-2xl p-4 outline-none appearance-none">
              {CTA_TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase text-zinc-500 ml-2">Button Text</label>
            <input name="cta_text" defaultValue={profile?.cta_text} placeholder="e.g. Book Consultation" className="w-full bg-black border border-white/10 rounded-2xl p-4 outline-none" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase text-zinc-500 ml-2">Link/Number</label>
            <input name="cta_url" defaultValue={cleanUrl(profile?.cta_url, ctaType)} placeholder={CTA_TYPES.find(t => t.value === ctaType)?.placeholder} className="w-full bg-black border border-white/10 rounded-2xl p-4 outline-none text-[#00AEEF]" />
          </div>
        </div>
      </section>

      {/* IDENTITY */}
      <section className="bg-white/5 border border-white/10 rounded-3xl p-8 space-y-6">
        <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#00AEEF]">Agent Profile</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase text-zinc-500 ml-2">Username</label>
            <input name="username" defaultValue={profile?.username} required className="w-full bg-black border border-white/10 rounded-2xl p-4 outline-none focus:border-[#00AEEF]" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase text-zinc-500 ml-2">Name</label>
            <input name="agent_name" defaultValue={profile?.agent_name} className="w-full bg-black border border-white/10 rounded-2xl p-4 outline-none focus:border-[#00AEEF]" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase text-zinc-500 ml-2">License</label>
            <input name="license_number" defaultValue={profile?.license_number} className="w-full bg-black border border-white/10 rounded-2xl p-4 outline-none focus:border-[#00AEEF]" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase text-zinc-500 ml-2">Video Background</label>
            <select name="video_bg_url" defaultValue={profile?.video_bg_url} className="w-full bg-black border border-white/10 rounded-2xl p-4 outline-none focus:border-[#00AEEF] appearance-none">
              {VIDEO_THEMES.map(v => <option key={v.url} value={v.url}>{v.name}</option>)}
            </select>
          </div>
        </div>
      </section>

      {/* ADVANCED ANALYTICS */}
      <section className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-8 space-y-6">
        <div className="flex items-center gap-2">
            <BarChart3 size={14} className="text-[#00AEEF]" />
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#00AEEF]">Advanced Tracking</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase text-zinc-500 ml-2">Google Analytics Measurement ID</label>
            <input name="google_analytics_id" defaultValue={profile?.google_analytics_id} placeholder="G-XXXXXXXXXX" className="w-full bg-black border border-white/10 rounded-2xl p-4 outline-none text-sm" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase text-zinc-500 ml-2">Microsoft Clarity ID</label>
            <input name="clarity_id" defaultValue={profile?.clarity_id} placeholder="Project ID" className="w-full bg-black border border-white/10 rounded-2xl p-4 outline-none text-sm" />
          </div>
        </div>
      </section>

      {/* SOCIALS */}
      <section className="bg-white/5 border border-white/10 rounded-3xl p-8 space-y-6">
        <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#00AEEF]">Social Links</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {SOCIAL_NETWORKS.map(net => (
            <input key={net} name={`social_${net.toLowerCase()}`} defaultValue={profile?.social_links?.[net.toLowerCase()]} placeholder={net} className="bg-black border border-white/10 rounded-2xl p-4 outline-none text-sm" />
          ))}
        </div>
      </section>

      <button disabled={loading} type="submit" className="w-full bg-white text-black font-black py-8 rounded-[40px] hover:bg-[#00AEEF] hover:text-white transition-all uppercase tracking-[0.4em] text-xs shadow-2xl active:scale-95">
        {loading ? 'Publishing Changes...' : 'Save & Publish Profile'}
      </button>
    </form>
  )
}