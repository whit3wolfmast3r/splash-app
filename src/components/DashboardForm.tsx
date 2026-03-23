'use client'

import { useState } from 'react'
import { updateProfile } from '@/app/dashboard/actions'

const BUTTON_ACTIONS = [
  { label: 'Book Consultation', type: 'link' },
  { label: 'Call Me', type: 'tel' },
  { label: 'Text Me', type: 'sms' },
  { label: 'Email Me', type: 'mailto' },
]

export default function DashboardForm({ profile }: { profile: any }) {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const socials = profile?.social_links || {}

  async function handleSubmit(formData: FormData) {
    setLoading(true)
    setMessage('')
    const result = await updateProfile(formData)
    if (result?.error) setMessage('❌ ' + result.error)
    else setMessage('✅ Page updated successfully!')
    setLoading(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <form action={handleSubmit} encType="multipart/form-data" className="space-y-8 pb-20">
      {message && (
        <div className="p-4 rounded-xl text-sm font-bold shadow-lg bg-green-500 text-white sticky top-4 z-50">
          {message}
        </div>
      )}

      {/* --- ASSET UPLOADS (PNG ONLY) --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-zinc-50 p-6 rounded-3xl border border-zinc-200">
          <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-4 text-center">Agent Headshot</label>
          <div className="flex flex-col items-center gap-4">
            <div className="w-24 h-24 bg-zinc-200 rounded-full overflow-hidden border-2 border-white shadow-sm">
              {profile?.avatar_url && <img src={profile.avatar_url} className="w-full h-full object-cover" alt="" />}
            </div>
            <input type="file" name="headshot" accept="image/png" className="text-[10px]" />
          </div>
        </div>

        <div className="bg-zinc-50 p-6 rounded-3xl border border-zinc-200">
          <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-4 text-center">Company Logo</label>
          <div className="flex flex-col items-center gap-4">
            <div className="w-24 h-24 flex items-center justify-center p-2">
              {profile?.company_logo && <img src={profile.company_logo} className="max-h-full object-contain" alt="" />}
            </div>
            <input type="file" name="company_logo_file" accept="image/png" className="text-[10px]" />
          </div>
        </div>
      </div>

      {/* --- MAIN BUTTON LOGIC --- */}
      <div className="pt-4 border-t border-zinc-200">
        <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-4">Primary Button Action</label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
           <select name="cta_text" defaultValue={profile?.cta_text} className="w-full bg-zinc-100 rounded-2xl p-4 outline-none font-bold">
              {BUTTON_ACTIONS.map(a => <option key={a.label} value={a.label}>{a.label}</option>)}
           </select>
           <input name="cta_url" defaultValue={profile?.cta_url} placeholder="Phone, Email, or URL" className="w-full bg-zinc-100 rounded-2xl p-4 outline-none" />
        </div>
      </div>

      {/* --- SOCIAL NETWORK SELECTION --- */}
      <div className="pt-4 border-t border-zinc-200">
        <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-4 px-1">Social Networks (Max 4 will show)</label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {['Instagram', 'Facebook', 'TikTok', 'YouTube', 'LinkedIn', 'WhatsApp', 'Zillow', 'WeChat'].map(net => (
            <div key={net} className="flex flex-col">
              <span className="text-[9px] font-bold text-zinc-400 ml-2 mb-1 uppercase tracking-tighter">{net}</span>
              <input 
                name={`social_${net.toLowerCase()}`} 
                defaultValue={socials[net.toLowerCase()]} 
                placeholder={`${net} URL or Number`} 
                className="bg-zinc-100 rounded-xl p-3 text-sm outline-none focus:ring-1 focus:ring-black" 
              />
            </div>
          ))}
        </div>
      </div>

      {/* --- BACKGROUND VIDEO --- */}
      <div className="pt-4 border-t border-zinc-200">
          <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-2 px-1">Custom Background Video URL</label>
          <input name="video_bg_url" defaultValue={profile?.video_bg_url} placeholder="Paste Supabase Public MP4 URL here" className="w-full bg-zinc-100 rounded-2xl p-4 outline-none text-sm" />
      </div>

      <button disabled={loading} type="submit" className="w-full bg-black text-white font-bold py-5 rounded-2xl hover:scale-[1.02] transition-all shadow-xl disabled:bg-zinc-400 uppercase tracking-widest text-sm">
        {loading ? 'Publishing Changes...' : 'Save & Publish Page'}
      </button>
    </form>
  )
}