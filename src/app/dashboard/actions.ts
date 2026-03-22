'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function updateProfile(formData: FormData) {
  const supabase = await createClient()

  // 1. Get the current user
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Not authenticated')

  // 2. Prepare the data from the form
  const updates = {
    agent_name: formData.get('agent_name') as string,
    username: (formData.get('username') as string).toLowerCase().replace(/\s+/g, '-'),
    license_number: formData.get('license_number') as string,
    cta_text: formData.get('cta_text') as string,
    cta_url: formData.get('cta_url') as string,
    video_bg_url: formData.get('video_bg_url') as string,
    updated_at: new Date().toISOString(),
  }

  // 3. Update the database
  const { error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', user.id)

  if (error) {
    if (error.code === '23505') return { error: 'Username is already taken.' }
    return { error: error.message }
  }

  // 4. Refresh the data on the page
  revalidatePath('/dashboard')
  revalidatePath(`/${updates.username}`)
  
  return { success: true }
}