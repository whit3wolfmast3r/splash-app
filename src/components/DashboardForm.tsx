'use client'

import { useState } from 'react'
import { updateProfile } from '@/app/dashboard/actions'
import { Link, Phone, Mail, MessageSquare, Camera, Building2 } from 'lucide-react'

const VIDEO_THEMES = [
  { name: 'Modern Estate (Video 4)', url: 'https://hprgwoywlihlqnniaktp.supabase.co/storage/v1/object/public/videos/video4.mp4' },
  { name: 'Luxury Glass (Video 6)', url: 'https://hprgwoywlihlqnniaktp.supabase.co/storage/v1/object/public/videos/video6.mp4' },
  { name: 'Minimalist Interior (Video 7)', url: 'https://hprgwoywlihlqnniaktp.supabase.co/storage/v1/object/public/videos/video7.mp4' },
  { name: 'Urban Night (Video 8)', url: 'https://hprgwoywlihlqnniaktp.supabase.co/storage/v1/object/public/videos/video8.mp4' },
]

export default function DashboardForm({ profile, viewCount, clickCount }: { profile: any, viewCount: number, clickCount: number }) {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  
  // Strip prefix for the user's view
  const initialUrl = profile?.cta_url?.split(':').pop() || ''
  const initialType = profile?.cta_url?.startsWith('tel:') ? 'tel' : 
                     profile?.cta_url?.startsWith('sms:') ? 'sms' : 
                     profile?.cta_url?.startsWith('mailto:') ? 'mailto' : 'link';

  const [ctaType, setCtaType] = useState(initialType)

  async function handleSubmit(formData: FormData) {
    setLoading(true)
    const result = await updateProfile(formData)
    if (result?.error) setMessage('❌ ' + result.error)
    else setMessage('✅ Updated Successfully')
    setLoading(false)
  }

  return (
    <form action={handleSubmit} className="space-y-12 pb-20 text-white font-sans">
      <input type="hidden" name="current_avatar_url" value={profile?.avatar_url || ''} />
      <input type="hidden" name="current_company_logo" value={profile?.company_logo || ''} />

      {/* ACTION BUTTON SECTION */}
      <section className="bg-white/5 border border-white/10 rounded-[2rem] p-8 space-y-6">
        <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#00AEEF]">Action Button Configuration</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-zinc-500 uppercase ml-2">Action Type</label>
            <select 
              name="cta_type_select" 
              value={ctaType} 
              onChange={(e) => setCtaType(e.target.value)}
              className="w-full bg-black border border-white/10 rounded-2xl p-4 outline-none focus:border-[#00AEEF] appearance-none"
            >
              <option value="link">Website Link</option>
              <option value="tel">Phone Call</option>
              <option value="sms">Text Message</option>
              <option value="mailto">Email Address</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold text-zinc-500 uppercase ml-2">Button Text</label>
            <input name="cta_text" defaultValue={profile?.cta_text} placeholder="e.g. Book Consultation" className="w-full bg-black border border-white/10 rounded-2xl p-4 outline-none focus:border-[#00AEEF]" />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold text-zinc-500 uppercase ml-2">Destination (No Prefix)</label>
            <input name="cta_url" defaultValue={initialUrl} placeholder={ctaType === 'link' ? 'https://...' : '7025550123'} className="w-full bg-black border border-white/10 rounded-2xl p-4 outline-none focus:border-[#00AEEF] text-[#00AEEF]" />
          </div>
        </div>
      </section>

      {/* PUBLISH */}
      <button type="submit" disabled={loading} className="w-full bg-white text-black font-black py-8 rounded-[3rem] hover:bg-[#00AEEF] hover:text-white transition-all uppercase tracking-[0.4em] text-xs shadow-2xl">
        {loading ? 'Saving...' : 'Save & Publish Page'}
      </button>
    </form>
  )
}