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
    if (result?.error) setMessage(result.error)
    else setMessage('✅ Page updated successfully!')
    setLoading(false)
  }

  return (
    <form action={handleSubmit} className="space-y-6">
      {message && (
        <div className={`p-4 rounded-xl text-sm font-bold ${message.includes('✅') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {message}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Username field - Critical for the URL */}
        <div className="col-span-2">
          <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">Unique Username (Your URL Slug)</label>
          <input name="username" defaultValue={profile?.username} required className="w-full bg-zinc-100 border-none rounded-xl p-3 text-zinc-900 focus:ring-2 focus:ring-black outline-none transition" />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">Agent Name</label>
          <input name="agent_name" defaultValue={profile?.agent_name} required className="w-full bg-zinc-100 border-none rounded-xl p-3 text-zinc-900 focus:ring-2 focus:ring-black outline-none transition" />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">NV License Number</label>
          <input name="license_number" defaultValue={profile?.license_number} placeholder="S.0123456" className="w-full bg-zinc-100 border-none rounded-xl p-3 text-zinc-900 focus:ring-2 focus:ring-black outline-none transition" />
        </div>

        <div className="col-span-2">
          <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">Background Theme</label>
          <select name="video_bg_url" defaultValue={profile?.video_bg_url} className="w-full bg-zinc-100 border-none rounded-xl p-3 text-zinc-900 focus:ring-2 focus:ring-black outline-none transition">
            {VIDEO_THEMES.map((theme) => (
              <option key={theme.url} value={theme.url}>{theme.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">Button Text</label>
          <input name="cta_text" defaultValue={profile?.cta_text} required className="w-full bg-zinc-100 border-none rounded-xl p-3 text-zinc-900 focus:ring-2 focus:ring-black outline-none transition" />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">Button Link (URL, Phone, or Email)</label>
          <input name="cta_url" defaultValue={profile?.cta_url} placeholder="calendly.com/user" className="w-full bg-zinc-100 border-none rounded-xl p-3 text-zinc-900 focus:ring-2 focus:ring-black outline-none transition" />
        </div>
      </div>

      <button 
        disabled={loading}
        type="submit" 
        className="w-full bg-black text-white font-bold py-4 rounded-2xl hover:bg-zinc-800 transition disabled:bg-zinc-400 mt-4 shadow-xl"
      >
        {loading ? 'Saving Changes...' : 'Save & Publish Changes'}
      </button>
    </form>
  )
}