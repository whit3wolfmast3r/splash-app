import { createClient } from '../../utils/supabase/server';
import SplashPage from '../../components/SplashPage';
import { notFound } from 'next/navigation';
import { trackEvent } from '@/app/actions/analytics';

export const dynamic = 'force-dynamic';

export default async function Page({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params;
  const supabase = await createClient(); 
  
  const { data: profile, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('username', username)
    .single();

  if (error || !profile) return notFound();

  // Track the view in the background
  // We don't 'await' it to keep the page load fast
  trackEvent(profile.id, 'view');

  return <SplashPage profile={profile} />;
}