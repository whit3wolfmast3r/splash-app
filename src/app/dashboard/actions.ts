'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function updateProfile(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Not authenticated' }

  const headshot = formData.get('headshot') as File
  const logoFile = formData.get('company_logo_file') as File
  
  let avatar_url = formData.get('current_avatar_url') as string
  let company_logo = formData.get('current_company_logo') as string || ''

  // 1. Generic Upload Helper
  const uploadAsset = async (file: File, bucket: string, prefix: string) => {
    if (!file || file.size === 0) return null
    const name = `${user.id}-${prefix}-${Date.now()}.png`
    const { error } = await supabase.storage.from(bucket).upload(name, file, { upsert: true, contentType: 'image/png' })
    if (error) throw error
    return supabase.storage.from(bucket).getPublicUrl(name).data.publicUrl
  }

  try {
    const newAvatar = await uploadAsset(headshot, 'avatars', 'headshot')
    if (newAvatar) avatar_url = newAvatar

    const newLogo = await uploadAsset(logoFile, 'avatars', 'logo') // Putting logos in avatars bucket for simplicity
    if (newLogo) company_logo = newLogo
  } catch (e: any) {
    return { error: e.message }
  }

  // 2. Map Socials (grabbing values for the new list)
  const social_links: Record<string, string> = {}
  const nets = ['instagram', 'facebook', 'tiktok', 'youtube', 'linkedin', 'whatsapp', 'zillow', 'wechat']
  nets.forEach(n => {
    const val = formData.get(`social_${n}`) as string
    if (val) social_links[n] = val
  })

  const updates = {
    agent_name: formData.get('agent_name') as string,
    license_number: formData.get('license_number') as string,
    cta_text: formData.get('cta_text') as string,
    cta_url: formData.get('cta_url') as string,
    video_bg_url: formData.get('video_bg_url') as string,
    username: (formData.get('username') as string || '').toLowerCase().trim(),
    avatar_url,
    company_logo,
    social_links,
    updated_at: new Date().toISOString(),
  }

  const { error } = await supabase.from('profiles').update(updates).eq('id', user.id)
  if (error) return { error: error.message }

  revalidatePath('/dashboard')
  return { success: true }
}