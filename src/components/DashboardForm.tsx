'use client'

import { useState } from 'react'
import { updateProfile, removeBackground } from '@/app/dashboard/actions'
import { Sparkles, Loader2, Building2, User, HelpCircle, Globe, LogOut, Eye, MousePointer2, AlertCircle, Camera } from 'lucide-react'

const THEMES = [
  { name: 'Modern Estate', url: 'https://hprgwoywlihlqnniaktp.supabase.co/storage/v1/object/public/videos/video4.mp4' },
  { name: 'Luxury Glass', url: 'https://hprgwoywlihlqnniaktp.supabase.co/storage/v1/object/public/videos/video6.mp4' },
  { name: 'Minimalist Interior', url: 'https://hprgwoywlihlqnniaktp.supabase.co/storage/v1/object/public/videos/video7.mp4' },
  { name: 'Urban Night', url: 'https://hprgwoywlihlqnniaktp.supabase.co/storage/v1/object/public/videos/video8.mp4' },
]

const CTA_TYPES = [
  { label: 'Website Link', value: 'link', placeholder: 'www.yourwebsite.com' },
  { label: 'Phone Call', value: 'tel', placeholder: '702-555-0123' },
  { label: 'Text Message', value: 'sms', placeholder: '702-555-0123' },
  { label: 'Email Me', value: 'mailto', placeholder: 'name@agency.com' },
]

const SOCIAL_KEYS = ['instagram', 'facebook', 'tiktok', 'youtube', 'linkedin', 'whatsapp', 'zillow'];

export default function DashboardForm({ profile, viewCount, clickCount }: any) {
  const [loading, setLoading] = useState(false)
  const [processing, setProcessing] = useState(false)
  const [avatar, setAvatar] = useState(profile?.avatar_url)
  const [logo, setLogo] = useState(profile?.company_logo)
  const [message, setMessage] = useState('')
  const [isError, setIsError] = useState(false)
  const [socialLinks, setSocialLinks] = useState(profile?.social_links || {});

  const [ctaType, setCtaType] = useState(
    profile?.cta_url?.startsWith('tel:') ? 'tel' : 
    profile?.cta_url?.startsWith('sms:') ? 'sms' : 
    profile?.cta_url?.startsWith('mailto:') ? 'mailto' : 'link'
  )

  const handleMagic = async () => {
    if (!avatar || !avatar.startsWith('data:image')) return alert("Upload a photo first!");
    setProcessing(true)
    try {
        const blob = await fetch(avatar).then(r => r.blob())
        const fd = new FormData(); fd.append('image', blob)
        const res = await removeBackground(fd)
        if (res.data) setAvatar(res.data)
        if (res.error) { setMessage(res.error); setIsError(true); }
    } catch (e) { setMessage('Magic Failed'); setIsError(true); }
    setProcessing(false)
  }

  return (
    <form action={async (fd) => {
      setLoading(true); setMessage(''); setIsError(false);
      
      if (avatar?.startsWith('data:image')) {
        const b = await fetch(avatar).then(r => r.blob())
        fd.set('headshot', new File([b], 'a.png', {type:'image/png'}))
      }
      
      const rawUrl = fd.get('cta_url_raw') as string
      const cleanUrl = rawUrl?.replace(/^(tel:|sms:|mailto:)/, '').trim()
      fd.set('cta_url', ctaType === 'link' ? cleanUrl : `${ctaType}:${cleanUrl}`)
      
      const res = await updateProfile(fd); 
      if (res.error) { setMessage(`Error: ${res.error}`); setIsError(true); } 
      else { setMessage('✅ Profile Updated!'); setIsError(false); }
      setLoading(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }} className="space-y-12 pb-32 text-white">

      <input type="hidden" name="current_avatar_url" value={profile?.avatar_url || ''} />
      <input type="hidden" name="current_company_logo" value={profile?.company_logo || ''} />

      {message && (
        <div className={`p-4 rounded-xl text-center text-xs font-black uppercase fixed bottom-8 left-1/2 -translate-x-1/2 z-50 shadow-2xl ${isError ? 'bg-red-600 text-white' : 'bg-[#00AEEF] text-black'}`}>
          {message}
        </div>
      )}

      {/* 1. IDENTITY SETUP */}
      <section className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 space-y-8">
        <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#00AEEF]">Identity Setup</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-[9px] font-black uppercase text-[#00AEEF] ml-1">Full Display Name</label>
            <input name="agent_name" defaultValue={profile?.agent_name} className="w-full bg-black border border-white/10 rounded-2xl p-4 text-white outline-none focus:border-[#00AEEF]" />
          </div>
          <div className="space-y-2">
            <label className="text-[9px] font-black uppercase text-[#00AEEF] ml-1">Custom Link URL</label>
            <div className="flex items-center bg-black border border-white/10 rounded-2xl px-4">
                <span className="text-zinc-600 text-[10px]">agentlynxx.com/</span>
                <input name="username" defaultValue={profile?.username} className="w-full bg-transparent p-4 outline-none text-white lowercase" />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-[9px] font-black uppercase text-[#00AEEF] ml-1">Compliance #</label>
            <input name="license_number" defaultValue={profile?.license_number} className="w-full bg-black border border-white/10 rounded-2xl p-4 text-white outline-none" />
          </div>
          <div className="space-y-2">
            <label className="text-[9px] font-black uppercase text-[#00AEEF] ml-1">Background Theme</label>
            <select name="video_bg_url" defaultValue={profile?.video_bg_url} className="w-full bg-black border border-white/10 rounded-2xl p-4 text-white outline-none appearance-none">
                {THEMES.map(t => <option key={t.url} value={t.url} className="bg-black">{t.name}</option>)}
            </select>
          </div>
        </div>
      </section>

      {/* 2. THE LINK THAT WORKS */}
      <section className="bg-[#00AEEF]/5 border border-[#00AEEF]/20 rounded-[2.5rem] p-8 space-y-8">
        <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#00AEEF]">The Link That Works</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <label className="text-[9px] font-black uppercase text-[#00AEEF] ml-1">Type</label>
            <select value={ctaType} onChange={(e) => setCtaType(e.target.value)} className="w-full bg-black border border-white/10 rounded-2xl p-4 text-white outline-none">
              {CTA_TYPES.map(t => <option key={t.value} value={t.value} className="bg-black">{t.label}</option>)}
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-[9px] font-black uppercase text-[#00AEEF] ml-1">Button Text</label>
            <input name="cta_text" defaultValue={profile?.cta_text} className="w-full bg-black border border-white/10 rounded-2xl p-4 text-white outline-none" />
          </div>
          <div className="space-y-2">
            <label className="text-[9px] font-black uppercase text-[#00AEEF] ml-1">Destination</label>
            <input name="cta_url_raw" defaultValue={profile?.cta_url?.replace(/^(tel:|sms:|mailto:)/, '')} placeholder={CTA_TYPES.find(t=>t.value===ctaType)?.placeholder} className="w-full bg-black border border-white/10 rounded-2xl p-4 text-[#00AEEF] font-bold outline-none" />
          </div>
        </div>
      </section>

      {/* 3. ASSETS (The Mobile Fix) */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-zinc-900/50 border border-white/5 rounded-[2.5rem] p-10 flex flex-col items-center">
            <p className="text-[9px] font-black uppercase text-zinc-500 mb-6">Avatar Studio</p>
            <div className="w-44 aspect-[5/6] rounded-[2rem] overflow-hidden mb-6 border-2 border-[#00AEEF]/20 relative shadow-2xl" style={{background:'repeating-conic-gradient(#111 0% 25%, #181818 0% 50%) 50% / 15px 15px'}}>
              {avatar ? <img src={avatar} className="w-full h-full object-cover" /> : <div className="flex items-center justify-center h-full text-zinc-800"><Camera size={32}/></div>}
              {processing && <div className="absolute inset-0 bg-black/80 flex items-center justify-center"><Loader2 className="animate-spin text-[#00AEEF]"/></div>}
            </div>
            <label className="cursor-pointer bg-white text-black px-8 py-4 rounded-2xl text-[10px] font-black uppercase mb-4 w-full text-center">Choose Photo<input type="file" accept="image/*" className="hidden" onChange={e => {const f=e.target.files?.[0]; if(f) setAvatar(URL.createObjectURL(f))}} /></label>
            <button type="button" onClick={handleMagic} className="text-[#00AEEF] text-[9px] font-black uppercase flex items-center gap-2 hover:brightness-125 transition-all"><Sparkles size={12} /> AI Remove Background</button>
        </div>
        <div className="bg-zinc-900/50 border border-white/5 rounded-[2.5rem] p-10 flex flex-col items-center justify-center text-center">
            <p className="text-[9px] font-black uppercase text-zinc-500 mb-6">Brokerage Identity</p>
            <div className="h-32 flex items-center mb-8">{logo ? <img src={logo} className="max-h-24 w-auto drop-shadow-2xl" /> : <Building2 className="text-zinc-800" size={32} />}</div>
            <label className="cursor-pointer border border-white/10 text-white px-8 py-4 rounded-2xl text-[10px] font-black uppercase w-full text-center">Upload Office Logo<input type="file" name="company_logo_file" className="hidden" onChange={e => {const f=e.target.files?.[0]; if(f) setLogo(URL.createObjectURL(f))}} /></label>
        </div>
      </section>

      {/* 4. SOCIAL */}
      <section className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 space-y-10">
        <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#00AEEF]">Social Distribution</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SOCIAL_KEYS.map(key => (
            <div key={key} className="space-y-2">
                <label className="text-[9px] font-black uppercase text-zinc-600 ml-1">{key}</label>
                <input name={`social_${key}`} defaultValue={profile?.social_links?.[key]} placeholder={`${key} Link`} className="w-full bg-black border border-white/10 rounded-2xl p-4 text-white outline-none" />
            </div>
          ))}
        </div>
      </section>

      {/* 5. MARKETING INTELLIGENCE */}
      <section className="bg-zinc-900/50 border border-zinc-800 rounded-[2.5rem] p-8 space-y-8">
        <h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-[#00AEEF]">Marketing Intelligence</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           <input name="google_analytics_id" defaultValue={profile?.google_analytics_id} placeholder="Google G-Tag" className="w-full bg-black border border-white/10 rounded-2xl p-4 text-white outline-none" />
           <input name="clarity_id" defaultValue={profile?.clarity_id} placeholder="Clarity ID" className="w-full bg-black border border-white/10 rounded-2xl p-4 text-white outline-none" />
        </div>
        <label className="flex items-center gap-4 cursor-pointer bg-black/60 p-6 rounded-3xl border border-white/5">
          <input type="checkbox" name="needs_help_tracking" defaultChecked={profile?.needs_help_tracking} className="w-6 h-6 accent-[#00AEEF]" />
          <div className="text-left"><p className="text-[11px] font-black uppercase text-white">Help me set this up</p></div>
        </label>
      </section>

      <button disabled={loading || processing} type="submit" className="w-full bg-[#00AEEF] text-black font-black py-8 rounded-[2.5rem] uppercase tracking-[0.4em] text-[11px] shadow-2xl active:scale-95 transition-all">
        {loading ? 'Finalizing...' : 'Sync & Launch Live Link'}
      </button>
    </form>
  )
}