'use server'

import { createClient } from '@/utils/supabase/server'

export async function trackEvent(profileId: string, eventType: 'view' | 'click') {
  try {
    const supabase = await createClient()
    await supabase.from('analytics').insert({
      profile_id: profileId,
      event_type: eventType
    })
  } catch (e) {
    console.error('Analytics error:', e)
  }
}