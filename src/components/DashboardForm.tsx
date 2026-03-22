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

  // Safety check for socials
  const socials = profile?.social_links || {}

  async function handleSubmit(formData: FormData) {
    setLoading(true)
    setMessage('')
    const result = await updateProfile(formData)
    if (result?.error) setMessage(result.error)
    else setMessage('✅ Page updated successfully!')
    setLoading(false)
  }

  return (
    <form action={handleSubmit} className="space-y-8">
      {message && (
        <div className={`p-4 rounded-xl text-sm font-bold ${message.includes('✅') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {message}
        </div>
      )}

      <div className="bg-zinc-50 p-6 rounded-2xl border border-zinc-100">
        <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-4">Agent Headshot (PNG Only)</label>
        <div className="flex items-center gap-6">
          <img src={profile?.avatar_url} className="w-20 h-20 rounded-full object-cover bg-zinc-200" alt="" />
          <input type="file" name="headshot" accept="image/png" className="text-sm" />
          <input type="hidden" name="current_avatar_url" defaultValue={profile?.avatar_url} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="col-span-2">
          <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">Unique Username</label>
          <input name="username" defaultValue={profile?.username} required className="w-full bg-zinc-100 rounded-xl p-3 outline-none focus:ring-2 focus:ring-black" />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">Agent Name</label>
          <input name="agent_name" defaultValue={profile?.agent_name} required className="w-full bg-zinc-100 rounded-xl p-3 outline-none" />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">NV License</label>
          <input name="license_number" defaultValue={profile?.license_number} className="w-full bg-zinc-100 rounded-xl p-3 outline-none" />
        </div>

        <div className="col-span-2 grid grid-cols-2 gap-4 border-t border-zinc-100 pt-6">
           <div className="col-span-2 text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">Social Media Links</div>
           <input name="instagram" defaultValue={socials?.instagram || ''} placeholder="Instagram URL" className="bg-zinc-100 rounded-xl p-3 text-sm outline-none" />
           <input name="facebook" defaultValue={socials?.facebook || ''} placeholder="Facebook URL" className="bg-zinc-100 rounded-xl p-3 text-sm outline-none" />
           <input name="tiktok" defaultValue={socials?.tiktok || ''} placeholder="TikTok URL" className="bg-zinc-100 rounded-xl p-3 text-sm outline-none" />
           <input name="youtube" defaultValue={socials?.youtube || ''} placeholder="YouTube URL" className="bg-zinc-100 rounded-xl p-3 text-sm outline-none" />
        </div>

        <div className="col-span-2 border-t border-zinc-100 pt-6">
          <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">Background Theme</label>
          <select name="video_bg_url" defaultValue={profile?.video_bg_url} className="w-full bg-zinc-100 rounded-xl p-3 outline-none">
            {VIDEO_THEMES.map((theme) => (
              <option key={theme.url} value={theme.url}>{theme.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">Button Text</label>
          <input name="cta_text" defaultValue={profile?.cta_text} className="w-full bg-zinc-100 rounded-xl p-3 outline-none" />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">Button Link</label>
          <input name="cta_url" defaultValue={profile?.cta_url} className="w-full bg-zinc-100 rounded-xl p-3 outline-none" />
        </div>
      </div>

      <button disabled={loading} type="submit" className="w-full bg-black text-white font-bold py-4 rounded-2xl hover:bg-zinc-800 transition disabled:bg-zinc-400 shadow-xl">
        {loading ? 'Saving...' : 'Save & Publish Changes'}
      </button>
    </form>
  )
}