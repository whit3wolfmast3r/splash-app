'use client'

import { useState } from 'react'
import { updateProfile, removeBackground } from '@/app/dashboard/actions'
import { Building2, BarChart3, ExternalLink, Sparkles, Loader2, Camera, CheckCircle2 } from 'lucide-react'

const VIDEO_THEMES = [
  { name: 'Modern Estate (Video 4)', url: 'https://hprgwoywlihlqnniaktp.supabase.co/storage/v1/object/public/videos/video4.mp4' },
  { name: 'Luxury Glass (Video 6)', url: 'https://hprgwoywlihlqnniaktp.supabase.co/storage/v1/object/public/videos/video6.mp4' },
  { name: 'Minimalist Interior (Video 7)', url: 'https://hprgwoywlihlqnniaktp.supabase.co/storage/v1/object/public/videos/video7.mp4' },
  { name: 'Urban Night (Video 8)', url: 'https://hprgwoywlihlqnniaktp.supabase.co/storage/v1/object/public/videos/video8.mp4' },
]

const CTA_TYPES = [
  { label: 'Website Link', value: 'link', placeholder: 'www.yourwebsite.com' },
  { label: 'Phone Call', value: 'tel', placeholder: '702-555-0123' },
  { label: 'Text Message', value: 'sms', placeholder: '702-555-0123' },
  { label: 'Email Me', value: 'mailto', placeholder: 'name@agency.com' },
]

const SOCIAL_NETWORKS = ['Instagram', 'Facebook', 'TikTok', 'YouTube', 'LinkedIn', 'WhatsApp', 'Zillow', 'WeChat']

export default function DashboardForm({ profile, viewCount, clickCount }: { profile: any, viewCount: number, clickCount: number }) {
  const [loading, setLoading] = useState(false)
  const [processingImage, setProcessingImage] = useState(false)
  const [message, setMessage] = useState('')
  const [avatarPreview, setAvatarPreview] = useState(profile?.avatar_url)
  const [logoPreview, setLogoPreview] = useState(profile?.company_logo)
  
  const [ctaType, setCtaType] = useState(profile?.cta_url?.startsWith('tel:') ? 'tel' : profile?.cta_url?.startsWith('sms:') ? 'sms' : profile?.cta_url?.startsWith('mailto:') ? 'mailto' : 'link')

  const handleHeadshotChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
        const reader = new FileReader()
        reader.onload = (event) => {
            const img = new Image()
            img.onload = () => {
                const canvas = document.createElement('canvas')
                const ctx = canvas.getContext('2d')
                const targetRatio = 5 / 6
                let sw = img.width, sh = img.height, sx = 0, sy = 0
                if (sw / sh > targetRatio) { sw = sh * targetRatio; sx = (img.width - sw) / 2 } 
                else { sh = sw / targetRatio; sy = (img.height - sh) / 2 }
                canvas.width = 1000; canvas.height = 1200
                ctx?.drawImage(img, sx, sy, sw, sh, 0, 0, 1000, 1200)
                setAvatarPreview(canvas.toDataURL('image/png'))
            }
            img.src = event.target?.result as string
        }
        reader.readAsDataURL(file)
    }
  }

  // MAGIC REMOVE BACKGROUND LOGIC
  const handleMagicRemove = async () => {
    if (!avatarPreview || !avatarPreview.startsWith('data:image/png')) return
    setProcessingImage(true)
    setMessage('')

    try {
        const resBlob = await fetch(avatarPreview).then(r => r.blob())
        const formData = new FormData()
        formData.append('image', resBlob)

        const result = await removeBackground(formData)
        if (result.error) throw new Error(result.error)
        if (result.data) setAvatarPreview(result.data)
    } catch (err: any) {
        setMessage('❌ Magic failed: ' + err.message)
    } finally {
        setProcessingImage(false)
    }
  }

  async function handleSubmit(formData: FormData) {
    setLoading(true)
    if (avatarPreview?.startsWith('data:image/png')) {
        const blob = await fetch(avatarPreview).then(r => r.blob())
        formData.set('headshot', new File([blob], "avatar.png", { type: "image/png" }))
    }
    const rawUrl = formData.get('cta_url') as string
    const cleanUrl = rawUrl.replace(/^(tel:|sms:|mailto:)/, '').trim()
    formData.set('cta_url', ctaType === 'link' ? cleanUrl : `${ctaType}:${cleanUrl}`)

    const result = await updateProfile(formData)
    setMessage(result?.error ? '❌ ' + result.error : '✅ Profile Live & Updated!')
    setLoading(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <form action={handleSubmit} encType="multipart/form-data" className="space-y-12 pb-20 text-white font-sans">
      <input type="hidden" name="current_avatar_url" value={profile?.avatar_url || ''} />
      <input type="hidden" name="current_company_logo" value={profile?.company_logo || ''} />

      <div className="flex items-center justify-between bg-[#00AEEF]/10 border border-[#00AEEF]/30 rounded-2xl p-4">
          <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-[#00AEEF] rounded-full animate-pulse" />
              <span className="text-[10px] font-black uppercase text-white">Live URL:</span>
              <span className="text-[10px] font-bold text-[#00AEEF]">agentlynxx.com/{profile?.username}</span>
          </div>
          <a href={`/${profile?.username}`} target="_blank" className="text-[10px] font-black uppercase flex items-center gap-1 hover:text-[#00AEEF]">Visit <ExternalLink size={10} /></a>
      </div>

      {message && <div className="p-4 rounded-2xl text-center text-xs font-black uppercase tracking-widest bg-[#00AEEF] text-black">{message}</div>}

      <section className="space-y-6">
        <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#00AEEF]">Branding Assets</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <div className="bg-zinc-900/50 border border-white/5 rounded-3xl p-8 flex flex-col items-center">
            <p className="text-[9px] font-bold uppercase text-zinc-500 mb-4">Avatar Studio (5:6 PNG)</p>
            <div className="w-40 aspect-[5/6] rounded-2xl overflow-hidden mb-6 border-2 border-[#00AEEF]/30 shadow-2xl relative" style={{ background: 'repeating-conic-gradient(#111 0% 25%, #181818 0% 50%) 50% / 20px 20px' }}>
              {avatarPreview ? <img src={avatarPreview} className="w-full h-full object-cover" /> : <Camera className="w-full h-full p-12 text-zinc-800" />}
              {processingImage && (
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center text-center p-4">
                    <Loader2 className="animate-spin text-[#00AEEF] mb-2" />
                    <p className="text-[8px] font-black uppercase tracking-widest text-[#00AEEF]">Removing Background...</p>
                </div>
              )}
            </div>

            <div className="flex flex-col gap-3 w-full">
                <label className="cursor-pointer bg-white text-black px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest text-center hover:bg-[#00AEEF] hover:text-white transition-all">
                  Choose Photo
                  <input type="file" accept="image/*" className="hidden" onChange={handleHeadshotChange} />
                </label>
                
                {avatarPreview && !avatarPreview.includes('supabase') && (
                    <button 
                        type="button" 
                        onClick={handleMagicRemove}
                        disabled={processingImage}
                        className="flex items-center justify-center gap-2 bg-[#00AEEF] text-black px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest hover:brightness-110 transition-all disabled:opacity-50"
                    >
                        <Sparkles size={14} /> Magic Remove Background
                    </button>
                )}
            </div>
          </div>

          <div className="bg-zinc-900/50 border border-white/5 rounded-3xl p-8 flex flex-col items-center justify-center">
            <p className="text-[9px] font-bold uppercase text-zinc-500 mb-4">Brokerage Logo</p>
            <div className="h-40 flex items-center justify-center mb-6">
              {logoPreview ? <img src={logoPreview} className="max-h-20 w-auto object-contain" /> : <Building2 className="w-12 h-12 text-zinc-800" />}
            </div>
            <label className="cursor-pointer border border-white/20 text-white px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest hover:border-[#00AEEF] transition-all">
              Upload Logo
              <input type="file" accept="image/png,image/svg+xml" className="hidden" onChange={(e) => e.target.files?.[0] && setLogoPreview(URL.createObjectURL(e.target.files[0]))} />
            </label>
          </div>
        </div>
      </section>

      {/* REST OF FORM (AGENT IDENTITY, CTA, SOCIALS) */}
      <section className="bg-white/5 border border-white/10 rounded-3xl p-8 space-y-6">
        <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#00AEEF]">Agent Identity</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase text-zinc-500 ml-2">Display Name</label>
            <input name="agent_name" defaultValue={profile?.agent_name} className="w-full bg-black border border-white/10 rounded-2xl p-4 outline-none focus:border-[#00AEEF]" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase text-zinc-500 ml-2">Username (URL)</label>
            <input name="username" defaultValue={profile?.username} required className="w-full bg-black border border-white/10 rounded-2xl p-4 outline-none focus:border-[#00AEEF]" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase text-zinc-500 ml-2">License Number</label>
            <input name="license_number" defaultValue={profile?.license_number} className="w-full bg-black border border-white/10 rounded-2xl p-4 outline-none focus:border-[#00AEEF]" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase text-zinc-500 ml-2">Theme</label>
            <select name="video_bg_url" defaultValue={profile?.video_bg_url} className="w-full bg-black border border-white/10 rounded-2xl p-4 outline-none focus:border-[#00AEEF] appearance-none">
              {VIDEO_THEMES.map(v => <option key={v.url} value={v.url}>{v.name}</option>)}
            </select>
          </div>
        </div>
      </section>

      <section className="bg-[#00AEEF]/5 border border-[#00AEEF]/20 rounded-3xl p-8 space-y-6">
        <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#00AEEF]">Main Call To Action</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <select value={ctaType} onChange={(e) => setCtaType(e.target.value)} className="w-full bg-black border border-white/10 rounded-2xl p-4 outline-none">
            {CTA_TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
          </select>
          <input name="cta_text" defaultValue={profile?.cta_text} placeholder="Button Text" className="w-full bg-black border border-white/10 rounded-2xl p-4 outline-none" />
          <input name="cta_url" defaultValue={profile?.cta_url?.replace(/^(tel:|sms:|mailto:)/, '')} className="w-full bg-black border border-white/10 rounded-2xl p-4 outline-none text-[#00AEEF]" />
        </div>
      </section>

      <section className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-8 space-y-6">
        <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#00AEEF]">Advanced Tracking</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input name="google_analytics_id" defaultValue={profile?.google_analytics_id} placeholder="Google Analytics G-Tag" className="w-full bg-black border border-white/10 rounded-2xl p-4 outline-none text-sm" />
          <input name="clarity_id" defaultValue={profile?.clarity_id} placeholder="Microsoft Clarity ID" className="w-full bg-black border border-white/10 rounded-2xl p-4 outline-none text-sm" />
        </div>
      </section>

      <section className="bg-white/5 border border-white/10 rounded-3xl p-8 space-y-6">
        <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#00AEEF]">Social Channels</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {SOCIAL_NETWORKS.map(net => (
            <input key={net} name={`social_${net.toLowerCase()}`} defaultValue={profile?.social_links?.[net.toLowerCase()]} placeholder={net} className="bg-black border border-white/10 rounded-2xl p-4 outline-none text-sm" />
          ))}
        </div>
      </section>

      <button disabled={loading || processingImage} type="submit" className="w-full bg-white text-black font-black py-8 rounded-[40px] hover:bg-[#00AEEF] hover:text-white transition-all uppercase tracking-[0.4em] text-xs shadow-2xl active:scale-95">
        {loading ? 'Finalizing Profile...' : 'Launch Live Profile'}
      </button>
    </form>
  )
}