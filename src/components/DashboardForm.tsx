'use client'

import { useState } from 'react'
import { updateProfile, removeBackground } from '@/app/dashboard/actions'
import { Sparkles, Loader2, Info, Building2, User, Share2, HelpCircle } from 'lucide-react'

const THEMES = [
  { name: 'Modern Estate', url: 'https://hprgwoywlihlqnniaktp.supabase.co/storage/v1/object/public/videos/video4.mp4' },
  { name: 'Luxury Glass', url: 'https://hprgwoywlihlqnniaktp.supabase.co/storage/v1/object/public/videos/video6.mp4' },
  { name: 'Minimalist Interior', url: 'https://hprgwoywlihlqnniaktp.supabase.co/storage/v1/object/public/videos/video7.mp4' },
  { name: 'Urban Night', url: 'https://hprgwoywlihlqnniaktp.supabase.co/storage/v1/object/public/videos/video8.mp4' },
]

export default function DashboardForm({ profile }: any) {
  const [loading, setLoading] = useState(false)
  const [processing, setProcessing] = useState(false)
  const [avatar, setAvatar] = useState(profile?.avatar_url)
  const [message, setMessage] = useState('')

  const handleMagic = async () => {
    if (profile.ai_uses_count >= 1) {
        alert("Studio Limit Reached! Join the community for unlimited background removal.");
        return;
    }
    if (!avatar?.startsWith('data:image')) return;
    setProcessing(true)
    const blob = await fetch(avatar).then(r => r.blob())
    const fd = new FormData(); fd.append('image', blob)
    const res = await removeBackground(fd)
    if (res.data) setAvatar(res.data)
    setProcessing(false)
  }

  return (
    <form action={async (fd) => {
      setLoading(true)
      if (avatar?.startsWith('data:image')) {
        const b = await fetch(avatar).then(r => r.blob())
        fd.set('headshot', new File([b], 'a.png', {type:'image/png'}))
      }
      const res = await updateProfile(fd)
      setMessage(res.error ? '❌ Error Saving' : '✅ Profile Updated!')
      setLoading(false)
    }} className="space-y-12 pb-32">

      {message && <div className="p-4 rounded-2xl text-center text-xs font-black uppercase bg-[#00AEEF] text-black fixed bottom-8 left-1/2 -translate-x-1/2 z-50 shadow-2xl">{message}</div>}

      {/* 1. IDENTITY SECTION */}
      <section className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 space-y-8">
        <div className="space-y-2">
            <h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-[#00AEEF]">Personal Identity</h3>
            <p className="text-zinc-500 text-xs italic">"This is how your clients see you. High-resolution visuals build trust."</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input name="agent_name" defaultValue={profile?.agent_name} placeholder="Your Professional Name" className="bg-black border border-white/10 rounded-2xl p-4 outline-none focus:border-[#00AEEF]" />
          <div className="flex items-center bg-black border border-white/10 rounded-2xl px-4">
             <span className="text-zinc-700 text-xs font-bold mr-2">/</span>
             <input name="username" defaultValue={profile?.username} placeholder="custom-link-url" className="w-full bg-transparent py-4 outline-none lowercase" />
          </div>
          <input name="license_number" defaultValue={profile?.license_number} placeholder="State Compliance #" className="bg-black border border-white/10 rounded-2xl p-4 outline-none" />
          <select name="video_bg_url" defaultValue={profile?.video_bg_url} className="bg-black border border-white/10 rounded-2xl p-4 outline-none appearance-none">
            {THEMES.map(t => <option key={t.url} value={t.url}>{t.name}</option>)}
          </select>
        </div>
      </section>

      {/* 2. BRAND ASSETS */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-zinc-900/50 border border-white/5 rounded-[2.5rem] p-10 flex flex-col items-center">
            <div className="flex items-center gap-2 mb-6">
                <User size={14} className="text-zinc-500" />
                <span className="text-[10px] font-black uppercase text-zinc-500 tracking-widest">Avatar Studio</span>
            </div>
            <div className="w-40 aspect-[5/6] rounded-[2rem] overflow-hidden mb-6 border-2 border-[#00AEEF]/20 relative shadow-2xl" style={{background:'repeating-conic-gradient(#111 0% 25%, #181818 0% 50%) 50% / 20px 20px'}}>
              {avatar ? <img src={avatar} className="w-full h-full object-cover" /> : <div className="flex items-center justify-center h-full italic text-zinc-800 text-[10px]">No Image</div>}
              {processing && <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center animate-pulse"><Loader2 className="animate-spin text-[#00AEEF]"/></div>}
            </div>
            <div className="flex flex-col gap-3 w-full">
                <label className="cursor-pointer bg-white text-black px-6 py-4 rounded-2xl text-[10px] font-black uppercase text-center hover:bg-[#00AEEF] transition-all">Upload Photo<input type="file" accept="image/*" className="hidden" onChange={e => {const f=e.target.files?.[0]; if(f) setAvatar(URL.createObjectURL(f))}} /></label>
                <button type="button" onClick={handleMagic} className="group flex items-center justify-center gap-2 text-[#00AEEF] text-[9px] font-black uppercase hover:brightness-125 transition-all">
                    <Sparkles size={12} /> {profile.ai_uses_count >= 1 ? 'Join Community for Unlimited AI' : 'AI Clear Background (1 Left)'}
                </button>
            </div>
        </div>
        
        <div className="bg-zinc-900/50 border border-white/5 rounded-[2.5rem] p-10 flex flex-col items-center justify-center">
             <div className="flex items-center gap-2 mb-6">
                <Building2 size={14} className="text-zinc-500" />
                <span className="text-[10px] font-black uppercase text-zinc-500 tracking-widest">Office Identity</span>
            </div>
            <div className="h-32 flex items-center mb-10">
                {profile?.company_logo ? <img src={profile.company_logo} className="max-h-20 w-auto opacity-80" /> : <div className="text-zinc-800 italic text-[10px]">No Logo</div>}
            </div>
            <label className="cursor-pointer border border-white/10 text-white px-8 py-4 rounded-2xl text-[10px] font-black uppercase hover:border-[#00AEEF] transition-all">Upload Logo<input type="file" name="company_logo_file" className="hidden" /></label>
        </div>
      </section>

      {/* 3. THE HOOK: INTELLIGENCE */}
      <section className="bg-[#00AEEF]/5 border border-[#00AEEF]/20 rounded-[2.5rem] p-10 space-y-8">
        <div className="flex items-center justify-between">
            <div className="space-y-1">
                <h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-[#00AEEF]">Marketing Intelligence</h3>
                <p className="text-zinc-400 text-xs font-medium">"If these are blank, you are marketing blind."</p>
            </div>
            <a href="https://community.agentlynxx.com" target="_blank" className="text-[9px] font-black uppercase text-white/40 hover:text-white flex items-center gap-1 underline underline-offset-4 transition-all">How to find these? <HelpCircle size={10}/></a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           <input name="google_analytics_id" defaultValue={profile?.google_analytics_id} placeholder="G-XXXXXXXXXX" className="bg-black border border-white/10 rounded-2xl p-4 outline-none text-sm focus:border-[#00AEEF]" />
           <input name="clarity_id" defaultValue={profile?.clarity_id} placeholder="Microsoft Project ID" className="bg-black border border-white/10 rounded-2xl p-4 outline-none text-sm focus:border-[#00AEEF]" />
        </div>
        <label className="flex items-center gap-4 cursor-pointer bg-black/60 p-6 rounded-3xl border border-white/5 hover:border-[#00AEEF]/30 transition-all">
          <input type="checkbox" name="needs_help_tracking" defaultChecked={profile?.needs_help_tracking} className="w-6 h-6 accent-[#00AEEF]" />
          <div>
            <p className="text-[11px] font-black uppercase text-white">Help me set this up</p>
            <p className="text-[9px] text-zinc-500 uppercase font-bold mt-1">Our marketing team will reach out to decode your audience for free.</p>
          </div>
        </label>
      </section>

      <button disabled={loading} type="submit" className="w-full bg-[#00AEEF] text-black font-black py-8 rounded-[2.5rem] uppercase tracking-[0.4em] text-xs shadow-[0_20px_50px_rgba(0,174,239,0.3)] active:scale-95 transition-all">
        {loading ? 'Processing...' : 'Sync & Launch Live Identity'}
      </button>

    </form>
  )
}