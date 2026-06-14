'use client'
import { useState } from 'react'
import { updateProfile, removeBackground } from '@/app/dashboard/actions'
import { Sparkles, Loader2, Building2, Camera, Eye, MousePointer2, BarChart3, TrendingUp, Compass, HelpCircle } from 'lucide-react'

const THEMES = [
  { name: 'Modern Estate', url: 'https://hprgwoywlihlqnniaktp.supabase.co/storage/v1/object/public/videos/video4.mp4' },
  { name: 'Luxury Glass', url: 'https://hprgwoywlihlqnniaktp.supabase.co/storage/v1/object/public/videos/video6.mp4' },
  { name: 'Minimalist Interior', url: 'https://hprgwoywlihlqnniaktp.supabase.co/storage/v1/object/public/videos/video7.mp4' },
  { name: 'Urban Night', url: 'https://hprgwoywlihlqnniaktp.supabase.co/storage/v1/object/public/videos/video8.mp4' },
]
const SOCIAL_KEYS = ['instagram', 'facebook', 'tiktok', 'youtube', 'linkedin', 'whatsapp', 'zillow'];

export default function DashboardForm({ profile, viewCount, clickCount }: any) {
  const [loading, setLoading] = useState(false); const [processing, setProcessing] = useState(false)
  const [avatar, setAvatar] = useState(profile?.avatar_url); const [logo, setLogo] = useState(profile?.company_logo_url)
  const [message, setMessage] = useState(''); const [socialLinks, setSocialLinks] = useState(profile?.social_links || {});
  const ctr = viewCount > 0 ? ((clickCount / viewCount) * 100).toFixed(1) : "0.0";

  return (
    <form action={async (fd) => {
      setLoading(true);
      if (avatar?.startsWith('data:image')) {
        const b = await fetch(avatar).then(r => r.blob()); fd.set('headshot', new File([b], 'a.png', {type:'image/png'}))
      }
      const raw = fd.get('cta_url_raw') as string;
      fd.set('cta_url', raw?.includes(':') ? raw : `https://${raw}`);
      await updateProfile(fd); setMessage('✅ Profile Updated!'); setLoading(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }} className="space-y-12 pb-32 text-white">

      <input type="hidden" name="current_avatar_url" value={profile?.avatar_url || ''} />
      <input type="hidden" name="current_company_logo_url" value={profile?.company_logo_url || ''} />

      {/* 1. MARKETING HUD */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-zinc-900/80 border border-white/10 rounded-3xl p-6 text-center">
            <BarChart3 className="mx-auto mb-1 text-zinc-400" size={16} />
            <p className="text-[10px] font-black uppercase text-zinc-400 mb-1">Views</p>
            <p className="text-4xl font-bold">{viewCount || 0}</p>
        </div>
        <div className="bg-zinc-900/80 border border-[#00AEEF]/30 rounded-3xl p-6 text-center">
            <TrendingUp className="mx-auto mb-1 text-[#00AEEF]" size={16} />
            <p className="text-[10px] font-black uppercase text-[#00AEEF] mb-1">Clicks</p>
            <p className="text-4xl text-[#00AEEF] font-bold">{clickCount || 0}</p>
        </div>
        <div className="bg-zinc-900/80 border border-white/10 rounded-3xl p-6 text-center">
            <p className="text-[10px] font-black uppercase text-zinc-400 mb-1">CTR</p>
            <p className="text-4xl font-bold">{ctr}%</p>
        </div>
        <div className="bg-zinc-900/80 border border-white/10 rounded-3xl p-6 text-center">
            <Compass className="mx-auto mb-1 text-zinc-400" size={16} />
            <p className="text-[10px] font-black uppercase text-[#00AEEF] mb-1 text-lg">Direct</p>
        </div>
      </div>

      {message && <div className="p-4 rounded-xl text-center text-[10px] font-black uppercase bg-[#00AEEF] text-black fixed bottom-10 left-1/2 -translate-x-1/2 z-50 shadow-2xl">{message}</div>}

      {/* 2. SETUP */}
      <section className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 md:p-10 space-y-8">
        <h3 className="text-[11px] font-black uppercase text-[#00AEEF] tracking-[0.3em]">Identity Setup</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-2"><label className="text-[10px] font-black text-white uppercase ml-1">Agent Name</label><input name="agent_name" defaultValue={profile?.agent_name} className="w-full bg-black border border-white/10 rounded-2xl p-4 text-white outline-none focus:border-[#00AEEF]" /></div>
          <div className="space-y-2"><label className="text-[10px] font-black text-white uppercase ml-1">Custom URL</label><input name="username" defaultValue={profile?.username} className="w-full bg-black border border-white/10 rounded-2xl p-4 text-white outline-none" /></div>
          <div className="space-y-2"><label className="text-[10px] font-black text-white uppercase ml-1">Brokerage Name</label><input name="company_name" defaultValue={profile?.company_name} className="w-full bg-black border border-white/10 rounded-2xl p-4 text-white outline-none" /></div>
          <div className="space-y-2"><label className="text-[10px] font-black text-white uppercase ml-1">Compliance #</label><input name="license_number" defaultValue={profile?.license_number} className="w-full bg-black border border-white/10 rounded-2xl p-4 text-white outline-none" /></div>
        </div>
      </section>

      {/* 3. STUDIO */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-zinc-900/50 border border-white/5 rounded-[2.5rem] p-10 flex flex-col items-center">
            <p className="text-[10px] font-black text-zinc-500 uppercase mb-6 tracking-widest text-center">Avatar Studio (5:6 PNG)</p>
            <div className="w-44 aspect-[5/6] rounded-[2rem] overflow-hidden mb-6 border-2 border-[#00AEEF]/20 relative shadow-2xl" style={{background:'repeating-conic-gradient(#111 0% 25%, #181818 0% 50%) 50% / 15px 15px'}}>
              {avatar ? <img src={avatar} className="w-full h-full object-cover" /> : <Camera className="text-zinc-800" size={32}/>}
              {processing && <div className="absolute inset-0 bg-black/80 flex items-center justify-center animate-spin text-[#00AEEF]"><Loader2 size={32}/></div>}
            </div>
            <label className="cursor-pointer bg-white text-black px-8 py-4 rounded-2xl text-[10px] font-black uppercase hover:bg-[#00AEE