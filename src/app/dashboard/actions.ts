'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function updateProfile(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Unauthorized' }

  // 1. Get existing URLs from the hidden inputs in the form
  let avatar_url = formData.get('current_avatar_url') as string
  let company_logo = formData.get('current_company_logo') as string

  // 2. Helper to handle uploads
  const upload = async (file: File, bucket: string) => {
    if (!file || file.size === 0) return null
    const name = `${user.id}/${Date.now()}-${file.name}`
    const { error } = await supabase.storage.from(bucket).upload(name, file)
    if (error) throw error
    return supabase.storage.from(bucket).getPublicUrl(name).data.publicUrl
  }

  try {
    // 3. Process new files only if they were selected
    const newAvatar = await upload(formData.get('headshot') as File, 'avatars')
    if (newAvatar) avatar_url = newAvatar

    const newLogo = await upload(formData.get('company_logo_file') as File, 'logos')
    if (newLogo) company_logo = newLogo

    // 4. Update the database
    const { error: dbError } = await supabase
      .from('profiles')
      .update({
        agent_name: formData.get('agent_name'),
        username: (formData.get('username') as string || '').toLowerCase().trim(),
        license_number: formData.get('license_number'),
        cta_text: formData.get('cta_text'),
        cta_url: formData.get('cta_url'),
        video_bg_url: formData.get('video_bg_url'),
        avatar_url,
        company_logo,
        social_links: {
          instagram: formData.get('social_instagram'),
          facebook: formData.get('social_facebook'),
          tiktok: formData.get('social_tiktok'),
          youtube: formData.get('social_youtube'),
          zillow: formData.get('social_zillow'),
        },
        updated_at: new Date().toISOString()
      })
      .eq('id', user.id)

    if (dbError) throw dbError

    revalidatePath('/dashboard')
    revalidatePath(`/${formData.get('username')}`)
    return { success: true }

  } catch (err: any) {
    return { error: err.message }
  }
}