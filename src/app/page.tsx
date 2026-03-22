export const dynamic = 'force-dynamic';
import { supabase } from '@/utils/supabase';
import SplashPage from '@/components/SplashPage';
import { notFound } from 'next/navigation';

export default async function Page({ params }: { params: Promise<{ username: string }> }) {
  
  const { username } = await params;

  const { data: profile, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('username', username)
    .single();

  // If there's no profile OR a database error, show 404
  if (!profile || error) {
    return notFound();
  }

  return <SplashPage profile={profile} />;
}