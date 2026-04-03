'use server'

import { createClient } from '@/utils/supabase/server'
import { headers } from 'next/headers'

export async function trackEvent(profileId: string, eventType: 'view' | 'click', manualReferrer?: string) {
  try {
    const supabase = await createClient()
    const headerList = await headers()
    
    // Auto-detect where they came from
    const referrer = manualReferrer || headerList.get('referer') || 'Direct'
    const userAgent = headerList.get('user-agent') || ''
    const isMobile = /Mobile|Android|iPhone/i.test(userAgent)

    await supabase.from('analytics').insert({
      profile_id: profileId,
      event_type: eventType,
      referrer: referrer.substring(0, 255), // Clean the URL
      device_type: isMobile ? 'Mobile' : 'Desktop'
    })
  } catch (e) {
    console.error('Analytics error:', e)
  }
}