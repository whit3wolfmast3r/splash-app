'use client'

import { useState } from 'react'
import { updateProfile } from '@/app/dashboard/actions'

// Your AI-generated video URLs from Supabase
const VIDEO_THEMES = [
  { name: 'Modern Estate (Video 4)', url: 'https://hprgwoywlihlqnniaktp.supabase.co/storage/v1/object/public/videos/video4.mp4' },
  { name: 'Luxury Glass (Video 6)', url: 'https://hprgwoywlihlqnniaktp.supabase.co/storage/v1/object/public/videos/video6.mp4' },
  { name: 'Minimalist Interior (Video 7)', url: 'https://hprgwoywlihlqnniaktp.supabase.co/storage/v1/object/public/videos/video7.mp4' },
  { name: 'Urban Night (Video 8)', url: 'https://hprgwoywlihlqnniaktp.supabase.co/storage/v1/object/public/videos/video8.mp4' },
]

const BUTTON_OPTIONS = ['Book Consultation', 'Call Me', 'Text Me', 'Email Me']

const SOCIAL_NETWORKS = [
  'Instagram', 'Facebook', 'TikTok', 'YouTube', 
  'LinkedIn', 'WhatsApp', 'Zillow', 'WeChat'
]

export default function DashboardForm({ profile }: { profile: any }) {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  async function handleSubmit(formData: FormData) {
    setLoading(true)
    setMessage('')
    
    const result = await updateProfile(formData)
    
    if (result?.error) {
      setMessage('❌ ' + result.error)
    } else {
      setMessage('✅ Page updated successfully!')
    }
    
    setLoading(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <form action={handleSubmit} encType="multipart/form-data" className="space-y-8 pb-10 font-sans">
      
      {/* SUCCESS/ERROR TOAST */}
      {message && (
        <div className={`p-4 rounded-2xl text-sm font-bold shadow-lg transition-all animate-in fade-in slide-in-from-top-4 ${
          message.includes('✅') ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
        }`}>
          {message}
        </div>
      )}

      {/* --- SECTION 1: BRANDING ASSETS --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Agent Headshot */}
        <div className="bg-zinc-50 p-6 rounded-3xl border border-zinc-200 flex flex-col items-center justify-center text-center">
          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 mb-4">Agent Headshot (PNG)</label>
          <div className="w-24 h-24 bg-zinc-200 rounded-full overflow-hidden mb-4 border-2 border-white shadow-sm">
            {profile?.avatar_url && <img src={profile.avatar_url} className="w-full h-full object-cover" alt="Preview" />}
          </div>
          <input type="file" name="headshot" accept="image/png" className="text-[10px] w-full" />
          <input type="hidden" name="current_avatar_url" defaultValue={profile?.avatar_url} />
        </div>

        {/* Brokerage Logo */}
        <div className="bg-zinc-50 p-6 rounded-3xl border border-zinc-200 flex flex-col items-center justify-center text-center">
          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 mb-4">Company Logo (PNG)</label>
          <div className="w-24 h-24 flex items-center justify-center mb-4">
            {profile?.company_logo ? (
              <img src={profile.company_logo} className="max-h-full w-auto object-contain" alt="Logo Preview" />
            ) : (
              <div className="w-12 h-12 border-2 border-dashed border-zinc-300 rounded-lg flex items-center justify-center text-zinc-300 text-[10px]">No Logo</div>
            )}
          </div>
          <input type="file" name="company_logo_file" accept="image/png" className="text-[10px] w-full" />
          <input type="hidden" name="current_company_logo" defaultValue={profile?.company_logo} />
        </div>
      </div>

      {/* --- SECTION 2: IDENTITY --- */}
      <div className="space-y-6">
        <div>
          <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 mb-2 px-1">Unique Username (Your URL)</label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 font-bold">/</span>
            <input 
              name="username" 
              defaultValue={profile?.username} 
              required 
              className="w-full bg-zinc-100 rounded-2xl p-4 pl-8 outline-none focus:ring-2 focus:ring-black font-bold text-zinc-900" 
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 mb-2 px-1">Full Display Name</label>
            <input 
              name="agent_name" 
              defaultValue={profile?.agent_name} 
              required 
              className="w-full bg-zinc-100 rounded-2xl p-4 outline-none focus:ring-2 focus:ring-black" 
            />
          </div>
          <div>
            <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 mb-2 px-1">NV License #</label>
            <input 
              name="license_number" 
              defaultValue={profile?.license_number} 
              placeholder="S.0179666.LLC" 
              className="w-full bg-zinc-100 rounded-2xl p-4 outline-none focus:ring-2 focus:ring-black" 
            />
          </div>
        </div>
      </div>

      {/* --- SECTION 3: SMART BUTTON --- */}
      <div className="pt-6 border-t border-zinc-200">
        <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 mb-4 px-1">Primary Action Button</label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <select 
            name="cta_text" 
            defaultValue={profile?.cta_text} 
            className="w-full bg-zinc-100 rounded-2xl p-4 outline-none font-bold text-zinc-900 appearance-none cursor-pointer"
          >
            {BUTTON_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>
          <input 
            name="cta_url" 
            defaultValue={profile?.cta_url} 
            placeholder="URL, Phone, or Email" 
            className="w-full bg-zinc-100 rounded-2xl p-4 outline-none focus:ring-2 focus:ring-black" 
          />
        </div>
      </div>

      {/* --- SECTION 4: SOCIAL NETWORKS --- */}
      <div className="pt-6 border-t border-zinc-200">
        <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 mb-4 px-1">Social Media (Top 4 Show Live)</label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {SOCIAL_NETWORKS.map(net => (
            <div key={net} className="space-y-1">
              <span className="text-[9px] font-bold text-zinc-400 uppercase ml-1">{net}</span>
              <input 
                name={`social_${net.toLowerCase()}`} 
                defaultValue={profile?.social_links?.[net.toLowerCase()]} 
                placeholder={`${net} link/user`} 
                className="w-full bg-zinc-100 rounded-xl p-3 text-sm outline-none focus:ring-1 focus:ring-zinc-400" 
              />
            </div>
          ))}
        </div>
      </div>

      {/* --- SECTION 5: BACKGROUND THEME --- */}
      <div className="pt-6 border-t border-zinc-200 pb-4">
        <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 mb-4 px-1">Visual Theme (Background Video)</label>
        <select 
          name="video_bg_url" 
          defaultValue={profile?.video_bg_url} 
          className="w-full bg-zinc-100 rounded-2xl p-4 outline-none font-medium appearance-none cursor-pointer"
        >
          {VIDEO_THEMES.map(theme => (
            <option key={theme.url} value={theme.url}>{theme.name}</option>
          ))}
        </select>
        <p className="text-[10px] text-zinc-400 mt-3 px-1 italic">
          Videos are hosted on Supabase Storage for maximum performance.
        </p>
      </div>

      {/* SAVE BUTTON */}
      <button 
        disabled={loading} 
        type="submit" 
        className="w-full bg-black text-white font-bold py-6 rounded-3xl shadow-2xl hover:bg-zinc-800 transition-all active:scale-[0.98] disabled:bg-zinc-300 uppercase tracking-[0.2em] text-sm"
      >
        {loading ? 'Publishing Changes...' : 'Save & Publish Page'}
      </button>
    </form>
  )
}