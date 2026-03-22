'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function updateProfile(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Not authenticated' }

  let avatar_url = formData.get('current_avatar_url') as string
  const headshotFile = formData.get('headshot') as File

  // 1. Handle Image Upload
  if (headshotFile && headshotFile.size > 0 && headshotFile.name !== 'undefined') {
    const fileExt = headshotFile.name.split('.').pop()?.toLowerCase()
    if (fileExt !== 'png') {
      return { error: 'Please upload a PNG file only.' }
    }

    // Use a fixed name so we don't fill up storage with 100 copies of the same agent
    const fileName = `${user.id}-headshot.png`
    
    const { error: uploadError } = await supabase.storage
      .from('avatars')
      .upload(fileName, headshotFile, { 
        upsert: true, 
        contentType: 'image/png',
        cacheControl: '3600' 
      })

    if (uploadError) return { error: 'Upload failed: ' + uploadError.message }

    const { data: { publicUrl } } = supabase.storage
      .from('avatars')
      .getPublicUrl(fileName)
    
    // Add a timestamp to the URL to force the browser to refresh the image
    avatar_url = `${publicUrl}?t=${Date.now()}`
  }

  // 2. Build Social Links Object safely
  const social_links = {
    instagram: (formData.get('instagram') as string) || '',
    facebook: (formData.get('facebook') as string) || '',
    tiktok: (formData.get('tiktok') as string) || '',
    youtube: (formData.get('youtube') as string) || '',
  }

  // 3. Prepare Updates
  const updates = {
    agent_name: formData.get('agent_name') as string,
    username: (formData.get('username') as string || '').toLowerCase().trim(),
    license_number: formData.get('license_number') as string,
    cta_text: formData.get('cta_text') as string,
    cta_url: formData.get('cta_url') as string,
    video_bg_url: formData.get('video_bg_url') as string,
    avatar_url: avatar_url,
    social_links: social_links,
    updated_at: new Date().toISOString(),
  }

  const { error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', user.id)

  if (error) return { error: error.message }

  revalidatePath('/dashboard')
  revalidatePath(`/${updates.username}`)
  return { success: true }
}