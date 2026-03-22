'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function updateProfile(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Not authenticated' }

  const headshotFile = formData.get('headshot') as File
  let avatar_url = formData.get('current_avatar_url') as string

  // 1. Handle PNG Upload
  if (headshotFile && headshotFile.size > 0) {
    if (headshotFile.type !== 'image/png') {
      return { error: 'Only PNG images are allowed for this template.' }
    }

    const fileExt = 'png'
    const fileName = `${user.id}-${Math.random()}.${fileExt}`
    
    const { error: uploadError } = await supabase.storage
      .from('avatars')
      .upload(fileName, headshotFile, { upsert: true })

    if (uploadError) return { error: 'Upload failed: ' + uploadError.message }

    const { data: { publicUrl } } = supabase.storage
      .from('avatars')
      .getPublicUrl(fileName)
    
    avatar_url = publicUrl
  }

  // 2. Package Social Links
  const social_links = {
    instagram: formData.get('instagram') as string,
    facebook: formData.get('facebook') as string,
    tiktok: formData.get('tiktok') as string,
    youtube: formData.get('youtube') as string,
  }

  // 3. Update Profile
  const updates = {
    agent_name: formData.get('agent_name') as string,
    username: (formData.get('username') as string).toLowerCase().replace(/\s+/g, '-'),
    license_number: formData.get('license_number') as string,
    cta_text: formData.get('cta_text') as string,
    cta_url: formData.get('cta_url') as string,
    video_bg_url: formData.get('video_bg_url') as string,
    avatar_url: avatar_url,
    social_links: social_links,
    updated_at: new Date().toISOString(),
  }

  const { error } = await supabase.from('profiles').update(updates).eq('id', user.id)

  if (error) return { error: error.message }

  revalidatePath('/dashboard')
  return { success: true }
}