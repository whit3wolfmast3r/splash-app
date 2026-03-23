'use client'

import { useState } from 'react'
import { updateProfile } from '@/app/dashboard/actions'

const VIDEO_THEMES = [
  { name: 'Modern Architecture', url: 'https://assets.mixkit.co/videos/preview/mixkit-modern-apartment-building-exterior-4412-large.mp4' },
  { name: 'Luxury Poolside', url: 'https://assets.mixkit.co/videos/preview/mixkit-luxury-home-with-a-large-swimming-pool-4414-large.mp4' },
  { name: 'Minimalist Interior', url: 'https://assets.mixkit.co/videos/preview/mixkit-interior-of-a-modern-living-room-4418-large.mp4' },
  { name: 'City Skyline', url: 'https://assets.mixkit.co/videos/preview/mixkit-view-of-a-modern-city-at-night-4420-large.mp4' },
  { name: 'Mountain Estate', url: 'https://assets.mixkit.co/videos/preview/mixkit-modern-home-at-sunset-4422-large.mp4' },
]

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
        <div className={`p-4 rounded-xl text-sm font-bold shadow-lg ${message.includes('✅') ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
          {message}
        </div>
      )}

      {/* PHOTO SECTION */}
      <div className="bg-zinc-50 p-6 rounded-3xl border border-zinc-200 shadow-inner flex flex-col items-center">
        <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 mb-4">Transparent PNG Headshot</label>
        <div className="w-32 h-32 bg-zinc-200 rounded-full overflow-hidden border-4 border-white shadow-md mb-4">
          {profile?.avatar_url && (
              <img src={profile.avatar_url} className="w-full h-full object-cover" alt="" />
          )}
        </div>
        <input type="file" name="headshot" accept="image/png" className="text-xs font-bold" />
        <input type="hidden" name="current_avatar_url" defaultValue={profile?.avatar_url || ''} />
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 mb-2 px-1">Unique Username</label>
          <input name="username" defaultValue={profile?.username || ''} required className="w-full bg-zinc-100 rounded-2xl p-4 outline-none focus:ring-2 focus:ring-black font-bold" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 mb-2 px-1">Full Name</label>
              <input name="agent_name" defaultValue={profile?.agent_name || ''} required className="w-full bg-zinc-100 rounded-2xl p-4 outline-none focus:ring-2 focus:ring-black" />
            </div>
            <div>
              <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 mb-2 px-1">NV License #</label>
              <input name="license_number" defaultValue={profile?.license_number || ''} className="w-full bg-zinc-100 rounded-2xl p-4 outline-none" />
            </div>
        </div>

        <div className="pt-4 border-t border-zinc-200 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="col-span-2 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 mb-2 px-1">Main Button</div>
            <input name="cta_text" defaultValue={profile?.cta_text || ''} placeholder="Text" className="w-full bg-zinc-100 rounded-2xl p-4 outline-none" />
            <input name="cta_url" defaultValue={profile?.cta_url || ''} placeholder="Link" className="w-full bg-zinc-100 rounded-2xl p-4 outline-none" />
        </div>

        <div className="pt-4 border-t border-zinc-200 space-y-3">
           <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 mb-1 px-1">Socials</label>
           <input name="instagram" defaultValue={profile?.social_links?.instagram || ''} placeholder="Instagram URL" className="w-full bg-zinc-100 rounded-xl p-3 text-sm outline-none" />
           <input name="facebook" defaultValue={profile?.social_links?.facebook || ''} placeholder="Facebook URL" className="w-full bg-zinc-100 rounded-xl p-3 text-sm outline-none" />
           <input name="tiktok" defaultValue={profile?.social_links?.tiktok || ''} placeholder="TikTok URL" className="w-full bg-zinc-100 rounded-xl p-3 text-sm outline-none" />
        </div>

        <div className="pt-4 border-t border-zinc-200">
          <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 mb-2 px-1">Background Theme</label>
          <select name="video_bg_url" defaultValue={profile?.video_bg_url || ''} className="w-full bg-zinc-100 rounded-2xl p-4 outline-none">
            {VIDEO_THEMES.map((theme) => (
              <option key={theme.url} value={theme.url}>{theme.name}</option>
            ))}
          </select>
        </div>
      </div>

      <button disabled={loading} type="submit" className="w-full bg-black text-white font-bold py-5 rounded-2xl hover:bg-zinc-800 transition shadow-xl disabled:bg-zinc-400 uppercase tracking-widest text-sm">
        {loading ? 'Saving...' : 'Save & Publish Page'}
      </button>
    </form>
  )
}