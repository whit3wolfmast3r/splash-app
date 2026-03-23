'use client'

import { useState } from 'react'
import { updateProfile } from '@/app/dashboard/actions'

const BUTTON_OPTIONS = ['Book Consultation', 'Call Me', 'Text Me', 'Email Me']
const SOCIAL_NETWORKS = ['Instagram', 'Facebook', 'TikTok', 'YouTube', 'LinkedIn', 'WhatsApp', 'Zillow', 'WeChat']

export default function DashboardForm({ profile }: { profile: any }) {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

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
    <form action={handleSubmit} encType="multipart/form-data" className="space-y-8">
      {message && (
        <div className="p-4 rounded-xl text-sm font-bold shadow-lg bg-green-500 text-white sticky top-0 z-50">
          {message}
        </div>
      )}

      {/* UPLOADS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-zinc-50 p-6 rounded-3xl border border-zinc-200 flex flex-col items-center">
          <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-4">Agent PNG</label>
          <div className="w-20 h-20 bg-zinc-200 rounded-full overflow-hidden mb-4">
            {profile?.avatar_url && <img src={profile.avatar_url} className="w-full h-full object-cover" />}
          </div>
          <input type="file" name="headshot" accept="image/png" className="text-[10px]" />
          <input type="hidden" name="current_avatar_url" defaultValue={profile?.avatar_url} />
        </div>

        <div className="bg-zinc-50 p-6 rounded-3xl border border-zinc-200 flex flex-col items-center">
          <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-4">Company Logo PNG</label>
          <div className="w-20 h-20 flex items-center justify-center mb-4">
            {profile?.company_logo && <img src={profile.company_logo} className="max-h-full object-contain" />}
          </div>
          <input type="file" name="company_logo_file" accept="image/png" className="text-[10px]" />
          <input type="hidden" name="current_company_logo" defaultValue={profile?.company_logo} />
        </div>
      </div>

      {/* USERNAME (THE FIX) */}
      <div className="pt-4 border-t border-zinc-200">
        <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-2 px-1">Unique Username (Your URL)</label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 font-bold">/</span>
          <input name="username" defaultValue={profile?.username} required className="w-full bg-zinc-100 rounded-2xl p-4 pl-8 outline-none focus:ring-2 focus:ring-black font-bold" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-2 px-1">Full Name</label>
            <input name="agent_name" defaultValue={profile?.agent_name} required className="w-full bg-zinc-100 rounded-2xl p-4 outline-none focus:ring-2 focus:ring-black" />
          </div>
          <div>
            <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-2 px-1">NV License #</label>
            <input name="license_number" defaultValue={profile?.license_number} placeholder="S.0179666" className="w-full bg-zinc-100 rounded-2xl p-4 outline-none" />
          </div>
      </div>

      {/* SMART BUTTON */}
      <div className="pt-4 border-t border-zinc-200 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="col-span-2 text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-2 px-1">Main Button Action</div>
          <select name="cta_text" defaultValue={profile?.cta_text} className="w-full bg-zinc-100 rounded-2xl p-4 outline-none font-bold">
            {BUTTON_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>
          <input name="cta_url" defaultValue={profile?.cta_url} placeholder="URL, Phone, or Email" className="w-full bg-zinc-100 rounded-2xl p-4 outline-none" />
      </div>

      {/* SOCIALS */}
      <div className="pt-4 border-t border-zinc-200">
        <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-4 px-1">Social Networks (Top 4 show)</label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {SOCIAL_NETWORKS.map(net => (
            <input 
              key={net}
              name={`social_${net.toLowerCase()}`} 
              defaultValue={profile?.social_links?.[net.toLowerCase()]} 
              placeholder={`${net} link/user`} 
              className="bg-zinc-100 rounded-xl p-3 text-sm outline-none" 
            />
          ))}
        </div>
      </div>

      {/* VIDEO URL */}
      <div className="pt-4 border-t border-zinc-200">
          <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-2 px-1">Background Video Public URL</label>
          <input name="video_bg_url" defaultValue={profile?.video_bg_url} className="w-full bg-zinc-100 rounded-2xl p-4 outline-none text-xs" />
      </div>

      <button disabled={loading} type="submit" className="w-full bg-black text-white font-bold py-5 rounded-2xl shadow-xl hover:bg-zinc-800 transition-all uppercase tracking-widest text-sm">
        {loading ? 'Saving...' : 'Save & Publish Changes'}
      </button>
    </form>
  )
}