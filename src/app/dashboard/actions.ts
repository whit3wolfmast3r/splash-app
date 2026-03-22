export async function updateProfile(formData: FormData) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Not authenticated' }

  const updates = {
    agent_name: formData.get('agent_name') as string,
    username: (formData.get('username') as string).toLowerCase().replace(/\s+/g, '-'),
    license_number: formData.get('license_number') as string,
    cta_text: formData.get('cta_text') as string,
    cta_url: formData.get('cta_url') as string,
    video_bg_url: formData.get('video_bg_url') as string,
  }

  // --- DEBUGGING LOG ---
  console.log('Attempting update for user:', user.id)
  console.log('Update payload:', updates)

  const { data, error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', user.id)
    .select() // This asks Supabase to return the row it just updated

  if (error) {
    console.error('Supabase Error:', error)
    return { error: error.message }
  }

  if (!data || data.length === 0) {
    console.error('No rows updated. Check if the ID matches.')
    return { error: 'No profile found to update. Try signing up again.' }
  }

  revalidatePath('/dashboard')
  return { success: true }
}