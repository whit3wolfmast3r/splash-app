'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function updateProfile(formData: FormData) {
  const supabase = await createClient()

  // 1. Get the current user
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Not authenticated' }

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
  const { data, error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', user.id)
    .select()

  if (error) {
    console.error('Supabase Error:', error)
    return { error: error.message }
  }

  if (!data || data.length === 0) {
    return { error: 'No profile found to update. Please refresh.' }
  }

  // 4. Refresh the data so the UI updates instantly
  revalidatePath('/dashboard')
  
  return { success: true }
}