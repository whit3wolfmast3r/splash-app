'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function updateProfile(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Not authenticated' }

  // 1. Get existing values from hidden inputs
  let avatar_url = formData.get('current_avatar_url') as string
  let company_logo = formData.get('current_company_logo') as string

  // 2. Optimized Upload Helper
  const uploadAsset = async (file: File, bucket: string, prefix: string) => {
    // Check if a file was actually provided
    if (!file || !(file instanceof File) || file.size === 0) return null
    
    const fileExt = file.name.split('.').pop() || 'png'
    const name = `${user.id}/${prefix}-${Date.now()}.${fileExt}`
    
    const { error } = await supabase.storage
      .from(bucket)
      .upload(name, file, { upsert: true, contentType: file.type })
    
    if (error) throw error
    
    return supabase.storage.from(bucket).getPublicUrl(name).data.publicUrl
  }

  try {
    const headshotFile = formData.get('headshot') as File
    const logoFile = formData.get('company_logo_file') as File

    // Only update the URL if a NEW file was uploaded
    const newAvatar = await uploadAsset(headshotFile, 'avatars', 'headshot')
    if (newAvatar) avatar_url = newAvatar

    // USE THE 'logos' BUCKET (Matches your Supabase screenshot)
    const newLogo = await uploadAsset(logoFile, 'logos', 'brokerage-logo')
    if (newLogo) company_logo = newLogo

  } catch (e: any) {
    console.error("Upload Error:", e)
    return { error: `Upload failed: ${e.message}` }
  }

  // 3. Map Socials
  const social_links: Record<string, string> = {}
  const nets = ['instagram', 'facebook', 'tiktok', 'youtube', 'linkedin', 'whatsapp', 'zillow', 'wechat']
  nets.forEach(n => {
    const val = formData.get(`social_${n}`) as string
    if (val) social_links[n] = val
  })

  // 4. Final Database Update
  const updates = {
    agent_name: formData.get('agent_name') as string,
    license_number: formData.get('license_number') as string,
    cta_text: formData.get('cta_text') as string,
    cta_url: formData.get('cta_url') as string,
    video_bg_url: formData.get('video_bg_url') as string,
    username: (formData.get('username') as string || '').toLowerCase().trim(),
    avatar_url: avatar_url || null, // Preserve old or set new
    company_logo: company_logo || null, // Preserve old or set new
    social_links,
    updated_at: new Date().toISOString(),
  }

  const { error } = await supabase.from('profiles').update(updates).eq('id', user.id)
  
  if (error) {
    if (error.code === '23505') return { error: 'That username is already taken.' }
    return { error: error.message }
  }

  revalidatePath('/dashboard')
  revalidatePath(`/${updates.username}`)
  return { success: true }
}