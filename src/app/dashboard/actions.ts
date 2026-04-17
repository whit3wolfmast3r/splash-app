'use server'
import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function removeBackground(formData: FormData) {
  const file = formData.get('image') as File
  const apiKey = process.env.REMOVE_BG_API_KEY
  if (!apiKey) return { error: 'API Key Missing on Server' }
  try {
    const rbFormData = new FormData(); 
    rbFormData.append('image_file', file); 
    rbFormData.append('size', 'auto');
    const res = await fetch('https://api.remove.bg/v1.0/removebg', { 
      method: 'POST', 
      headers: { 'X-Api-Key': apiKey }, 
      body: rbFormData 
    })
    if (!res.ok) throw new Error('AI Service Busy');
    const buffer = await res.arrayBuffer();
    return { data: `data:image/png;base64,${Buffer.from(buffer).toString('base64')}` }
  } catch (err: any) { return { error: err.message } }
}

export async function updateProfile(formData: FormData) {
  const supabase = await createClient(); 
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: 'Unauthorized' }

  const currentAvatar = formData.get('current_avatar_url') as string
  const currentLogo = formData.get('current_company_logo') as string

  const upload = async (file: File | null, bucket: string) => {
    if (!file || file.size === 0 || typeof file === 'string' || file.name === 'undefined') return null
    const name = `${user.id}/${Date.now()}-${file.name.replace(/\s/g, '_')}`
    const { error } = await supabase.storage.from(bucket).upload(name, file)
    return error ? null : supabase.storage.from(bucket).getPublicUrl(name).data.publicUrl
  }

  const newAvatar = await upload(formData.get('headshot') as File, 'avatars')
  const newLogo = await upload(formData.get('company_logo_file') as File, 'logos')

  const social_links: any = {}
  const networks = ['instagram', 'facebook', 'tiktok', 'youtube', 'linkedin', 'whatsapp', 'zillow']
  networks.forEach(n => { const val = formData.get(`social_${n}`); if (val) social_links[n] = val })

  const { error } = await supabase.from('profiles').update({
    agent_name: formData.get('agent_name'),
    username: (formData.get('username') as string || '').toLowerCase().trim(),
    license_number: formData.get('license_number'),
    cta_text: formData.get('cta_text'),
    cta_url: formData.get('cta_url'),
    video_bg_url: formData.get('video_bg_url'),
    google_analytics_id: formData.get('google_analytics_id'),
    clarity_id: formData.get('clarity_id'),
    needs_help_tracking: formData.get('needs_help_tracking') === 'on',
    avatar_url: newAvatar || currentAvatar,
    company_logo: newLogo || currentLogo,
    social_links,
    updated_at: new Date().toISOString()
  }).eq('id', user.id)

  revalidatePath('/dashboard'); 
  return error ? { error: error.message } : { success: true }
}