'use server'

import { createClient } from '@/utils/supabase/server'

export async function trackEvent(profileId: string, eventType: 'view' | 'click') {
  const supabase = await createClient()
  
  await supabase.from('analytics').insert({
    profile_id: profileId,
    event_type: eventType
  })
}