'use client'

import { useState } from 'react'
import { updateProfile, removeBackground } from '@/app/dashboard/actions'
import { Sparkles, Loader2, Building2, Camera, Eye, MousePointer2, AlertCircle, HelpCircle, BarChart3, TrendingUp, Compass } from 'lucide-react'

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
  const [logo, setLogo] = useState(profile?.company_logo_url)
  const [message, setMessage] = useState('')
  const [isError, setIsError] = useState(false)
  const [socialLinks, setSocialLinks] = useState(profile?.social_links || {});

  const ctr = viewCount > 0 ? ((clickCount / viewCount) * 100).toFixed(1) : "0.0";

  const [ctaType, setCtaType] = useState(
    profile?.cta_url?.startsWith('tel:') ? 'tel' : 
    profile?.cta_url?.startsWith('sms:') ? 'sms' : 
    profile?.cta_url?.startsWith('mailto:') ? 'mailto' : 'link'
  )

  const handleMagic = async () => {
    if (profile.ai_uses_count >= 1) return alert("Studio Limit Reached! Join community for unlimited access.");
    if (!avatar) return alert("Upload a photo first!");
    setProcessing(true)
    try {
        const response = await fetch(avatar);
        const blob = await response.blob();
        const fd = new FormData();
        fd.append('image', blob);
        const res = await removeBackground(fd);
        if (res.data) setAvatar(res.data);
        if (res.error) { setMessage(res.error); setIsError(true); }
    } catch (e) { setMessage('AI Service Busy'); setIsError(true); }
    setProcessing(false)
  }

  const getStatus = (key: string) => {
    if (!socialLinks[key]) return null;
    const activeKeys = SOCIAL_KEYS.filter(k => !!socialLinks[k]);
    const index = activeKeys.indexOf(key);
    return index >= 0 && index < 4 ? 'LIVE' : 'HIDDEN';
  };

  return (
    <form action={async (fd) => {
      setLoading(true); setMessage(''); setIsError(false);
      if (avatar?.startsWith('data:image')) {
        const b = await fetch(avatar).then(r => r.blob());
        fd.set('headshot', new File([b], 'avatar.png', {type:'image/png'}));
      }
      const raw = fd.get('cta_url_raw') as string;
      fd.set('cta_url', ctaType === 'link' ? raw : `${ctaType}:${raw?.replace(/^(tel:|sms:|mailto:)/, '')}`);
      const res = await updateProfile(fd);
      if (res.error) { setMessage(res.error); setIsError(true); }
      else { setMessage('✅ Identity Published!'); setIsError(false); }
      setLoading(false); window.scrollTo({ top: 0, behavior: 'smooth' });
    }} className="space-y-12 pb-32 text-white">

      {/* PERSISTENT ASSET URLS */}
      <input type="hidden" name="current_avatar_url" value={profile?.avatar_url || ''} />
      <input type="hidden" name="current_company_logo_url" value={profile?.company_logo_url || ''} />

      {/* 1. HIGH-CONTRAST INTELLIGENCE DASHBOARD */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-zinc-900/80 border border-white/10 rounded-3xl p-6 text-center shadow-xl">
            <BarChart3 className="mx-auto mb-2 text-zinc-400" size={16} />
            <p className="text-[10px] font-black uppercase text-zinc-400 tracking-widest mb-1">Views</p>
            <p className="text-4xl text-white font-bold">{viewCount || 0}</p>
        </div>
        <div className="bg-zinc-900/80 border border-[#00AEEF]/30 rounded-3xl p-6 text-center shadow-xl">
            <TrendingUp className="mx-auto mb-2 text-[#00AEEF]" size={16} />
            <p className="text-[10px] font-black uppercase text-[#00AEEF] tracking-widest mb-1">Clicks</p>
            <p className="text-4xl text-[#00AEEF] font-bold">{clickCount || 0}</p>
        </div>
        <div className="bg-zinc-900/80 border border-white/10 rounded-3xl p-6 text-center shadow-xl">
            <div className="text-zinc-400 mb-2 text-xs font-black">%</div>
            <p className="text-[10px] font-black uppercase text-zinc-400 tracking-widest mb-1">CTR</p>
            <p className="text-4xl text-white font-bold">{ctr}%</p>
        </div>
        <div className="bg-zinc-900/80 border border-white/10 rounded-3xl p-6 text-center shadow-xl overflow-hidden">
            <Compass className="mx-auto mb-2 text-zinc-400" size={16} />
            <p className="text-[10px] font-black uppercase text-zinc-400 tracking-widest mb-1">Top Source</p>
            <p className="text-xl text-[#00AEEF] font-bold truncate mt-2 px-2">Direct</p>
        </div>
      </div>

      {message && (
        <div className={`p-4 rounded-xl text-center text-[10px] font-black uppercase fixed bottom-10 left-1/2 -translate-x-1/2 z-50 shadow-2xl flex items-center gap-2 ${isError ? 'bg-red-600' : 'bg-[#00AEEF] text-black'}`}>
          {isError && <AlertCircle size={14} />} {message}
        </div>
      )}

      {/* 2. IDENTITY SETUP */}
      <section className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 md:p-10 space-y-8">
        <div>
            <h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-[#00AEEF]">Identity Setup</h3>
            <p className="text-zinc-500 text-xs mt-1 italic">"The core data that defines your professional presence."</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-white uppercase ml-1 tracking-widest">Agent Name</label>
            <input name="agent_name" defaultValue={profile?.agent_name} placeholder="First Last" className="w-full bg-black border border-white/10 rounded-2xl p-4 text-white outline-none focus:border-[#00AEEF] transition-all" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-white uppercase ml-1 tracking-widest">Custom URL</label>
            <div className="flex items-center bg-black border border-white/10 rounded-2xl px-4 text-zinc-500 font-bold">
                <span className="opacity-30">agentlynxx.com/</span>
                <input name="username" defaultValue={profile?.username} className="w-full bg-transparent p-4 outline-none text-white lowercase" />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-white uppercase ml-1 tracking-widest">State License #</label>
            <input name="license_number" defaultValue={profile?.license_number} className="w-full bg-black border border-white/10 rounded-2xl p-4 text-white outline-none" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-white uppercase ml-1 tracking-widest">Ambient Theme</label>
            <select name="video_bg_url" defaultValue={profile?.video_bg_url} className="w-full bg-black border border-white/10 rounded-2xl p-4 text-white outline-none appearance-none">
                {THEMES.map(t => <option key={t.url} value={t.url} className="bg-black">{t.name}</option>)}
            </select>
          </div>
          {/* NEW BUSINESS INTELLIGENCE FIELD */}
          <div className="space-y-2 md:col-span-2">
            <label className="text-[10px] font-black text-[#00AEEF] uppercase ml-1 tracking-widest">Brokerage Name (For Intelligence Reports)</label>
            <input name="company_name" defaultValue={profile?.company_name} placeholder="e.g. Lawyers Real Estate Group" className="w-full bg-black border border-[#00AEEF]/20 rounded-2xl p-4 text-white outline-none focus:border-[#00AEEF]" />
          </div>
        </div>
      </section>

      {/* 3. LINKS THAT WORK */}
      <section className="bg-[#00AEEF]/5 border border-[#00AEEF]/20 rounded-[2.5rem] p-8 md:p-10 space-y-8">
        <h3 className="text-[10px] font-black uppercase text-[#00AEEF] tracking-[0.3em]">Links That Work</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
                <label className="text-[10px] font-black text-white uppercase ml-1 tracking-widest">Action Type</label>
                <select value={ctaType} onChange={(e) => setCtaType(e.target.value)} className="w-full bg-black border border-white/10 rounded-2xl p-4 text-white outline-none appearance-none">
                    {CTA_TYPES.map(t => <option key={t.value} value={t.value} className="bg-black">{t.label}</option>)}
                </select>
            </div>
            <div className="space-y-2">
                <label className="text-[10px] font-black text-white uppercase ml-1 tracking-widest">Button Text</label>
                <input name="cta_text" defaultValue={profile?.cta_text} placeholder="Book Consultation" className="w-full bg-black border border-white/10 rounded-2xl p-4 text-white outline-none" />
            </div>
            <div className="space-y-2">
                <label className="text-[10px] font-black text-white uppercase ml-1 tracking-widest">Destination</label>
                <input name="cta_url_raw" defaultValue={profile?.cta_url?.replace(/^(tel:|sms:|mailto:)/, '')} placeholder={CTA_TYPES.find(t=>t.value===ctaType)?.placeholder} className="w-full bg-black border border-white/10 rounded-2xl p-4 text-[#00AEEF] font-bold outline-none" />
            </div>
        </div>
      </section>

      {/* 4. ASSET STUDIO */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-zinc-900/50 border border-white/5 rounded-[2.5rem] p-10 flex flex-col items-center">
            <p className="text-[10px] font-black text-zinc-500 uppercase mb-6 tracking-widest">Avatar Studio</p>
            <div className="w-44 aspect-[5/6] rounded-[2rem] overflow-hidden mb-6 border-2 border-[#00AEEF]/20 relative shadow-2xl" style={{background:'repeating-conic-gradient(#111 0% 25%, #181818 0% 50%) 50% / 15px 15px'}}>
              {avatar ? <img src={avatar} className="w-full h-full object-cover" /> : <div className="flex items-center justify-center h-full text-zinc-800"><Camera size={32}/></div>}
              {processing && <div className="absolute inset-0 bg-black/80 flex items-center justify-center animate-pulse"><Loader2 className="animate-spin text-[#00AEEF]"/></div>}
            </div>
            <label className="cursor-pointer bg-white text-black px-8 py-4 rounded-2xl text-[10px] font-black uppercase mb-4 w-full text-center hover:bg-[#00AEEF] transition-all shadow-lg">Choose Photo<input type="file" name="headshot" accept="image/*" className="hidden" onChange={e => {const f=e.target.files?.[0]; if(f) setAvatar(URL.createObjectURL(f))}} /></label>
            <button type="button" onClick={handleMagic} className="text-[#00AEEF] text-[9px] font-black uppercase flex items-center gap-2 mt-2 hover:brightness-125 transition-all"><Sparkles size={12} /> AI Background Removal (1 Free)</button>
        </div>
        <div className="bg-zinc-900/50 border border-white/5 rounded-[2.5rem] p-10 flex flex-col items-center justify-center text-center">
            <p className="text-[10px] font-black text-zinc-500 uppercase mb-6 tracking-widest">Brokerage Logo</p>
            <div className="h-32 flex items-center mb-8">{logo ? <img src={logo} className="max-h-24 w-auto drop-shadow-2xl" /> : <Building2 className="text-zinc-800" size={32} />}</div>
            <label className="cursor-pointer border border-white/10 text-white px-8 py-4 rounded-2xl text-[10px] font-black uppercase w-full text-center hover:border-[#00AEEF] transition-all">Upload Office Logo<input type="file" name="company_logo_file" className="hidden" onChange={e => {const f=e.target.files?.[0]; if(f) setLogo(URL.createObjectURL(f))}} /></label>
        </div>
      </section>

      {/* 5. SOCIAL DISTRIBUTION */}
      <section className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 md:p-10 space-y-10">
        <h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-[#00AEEF]">Social Distribution</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
          {SOCIAL_KEYS.map(key => (
            <div key={key} className="space-y-2 group">
                <div className="flex justify-between items-center px-2">
                    <label className="text-[9px] font-black uppercase text-zinc-500 tracking-widest group-focus-within:text-[#00AEEF] transition-colors">{key}</label>
                    {getStatus(key) === 'LIVE' && <span className="text-[7px] font-black bg-green-500/10 text-green-500 px-2 py-0.5 rounded-full border border-green-500/20">LIVE ON PROFILE</span>}
                </div>
                <input name={`social_${key}`} defaultValue={profile?.social_links?.[key]} onChange={(e) => setSocialLinks({...socialLinks, [key]: e.target.value})} placeholder={`${key} Link`} className="w-full bg-black border border-white/5 rounded-2xl p-4 text-white outline-none focus:border-[#00AEEF] transition-all" />
            </div>
          ))}
        </div>
      </section>

      {/* 6. INTELLIGENCE TRACKING */}
      <section className="bg-zinc-900/50 border border-zinc-800 rounded-[2.5rem] p-8 md:p-10 space-y-8">
        <div className="flex items-center justify-between">
            <div><h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-[#00AEEF]">Marketing Intelligence</h3><p className="text-zinc-400 text-xs italic">"If these are blank, you are marketing blind."</p></div>
            <a href="https://community.agentlynxx.com" target="_blank" className="text-[9px] font-black uppercase text-white/40 hover:text-white flex items-center gap-1 underline transition-all">How to find these? <HelpCircle size={10}/></a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           <div className="space-y-2"><label className="text-[10px] font-black uppercase text-white ml-1 tracking-widest">Google G-Tag</label><input name="google_analytics_id" defaultValue={profile?.google_analytics_id} className="w-full bg-black border border-white/10 rounded-2xl p-4 outline-none text-white focus:border-[#00AEEF]" /></div>
           <div className="space-y-2"><label className="text-[10px] font-black uppercase text-white ml-1 tracking-widest">Clarity ID</label><input name="clarity_id" defaultValue={profile?.clarity_id} className="w-full bg-black border border-white/10 rounded-2xl p-4 outline-none text-white focus:border-[#00AEEF]" /></div>
        </div>
        <label className="flex items-center gap-4 cursor-pointer bg-black/60 p-6 rounded-3xl border border-white/5 hover:border-[#00AEEF]/20 transition-all">
          <input type="checkbox" name="needs_help_tracking" defaultChecked={profile?.needs_help_tracking} className="w-6 h-6 accent-[#00AEEF]" />
          <div><p className="text-[11px] font-black uppercase text-white">Help me set this up</p><p className="text-[9px] text-zinc-500 uppercase font-bold mt-1 tracking-tighter">Our concierges will reach out to finish your setup for free.</p></div>
        </label>
      </section>

      <button disabled={loading || processing} type="submit" className="w-full bg-[#00AEEF] text-black font-black py-8 rounded-[2.5rem] uppercase tracking-[0.4em] text-[11px] shadow-[0_20px_50px_rgba(0,174,239,0.3)] active:scale-95 transition-all">
        {loading ? 'Saving Identity...' : 'Sync & Launch Live Identity'}
      </button>
    </form>
  )
}