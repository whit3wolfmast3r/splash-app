'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function updateProfile(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Unauthorized' }

  let avatar_url = formData.get('current_avatar_url') as string
  let company_logo = formData.get('current_company_logo') as string

  const uploadAsset = async (file: File, bucket: string) => {
    if (!file || file.size === 0) return null
    const name = `${user.id}/${Date.now()}-${file.name.replace(/\s/g, '_')}`
    const { error } = await supabase.storage.from(bucket).upload(name, file, { upsert: true })
    if (error) throw error
    return supabase.storage.from(bucket).getPublicUrl(name).data.publicUrl
  }

  try {
    const newAvatar = await uploadAsset(formData.get('headshot') as File, 'avatars')
    if (newAvatar) avatar_url = newAvatar

    const newLogo = await uploadAsset(formData.get('company_logo_file') as File, 'logos')
    if (newLogo) company_logo = newLogo

    // SMART CTA LOGIC: Combine type + input secretly
    const ctaType = formData.get('cta_type_select') as string
    let ctaUrl = formData.get('cta_url') as string
    if (ctaType !== 'link' && ctaUrl && !ctaUrl.startsWith(ctaType)) {
      ctaUrl = `${ctaType}:${ctaUrl.replace(/[:\s-()]/g, '')}`
    }

    const { error: dbError } = await supabase
      .from('profiles')
      .update({
        agent_name: formData.get('agent_name'),
        username: (formData.get('username') as string || '').toLowerCase().trim(),
        license_number: formData.get('license_number'),
        cta_text: formData.get('cta_text'),
        cta_url: ctaUrl,
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