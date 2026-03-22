export const dynamic = 'force-dynamic';
// Use ../../ to go up two levels to find utils and components
import { supabase } from '../../utils/supabase';
import SplashPage from '../../components/SplashPage';
import { notFound } from 'next/navigation';

export default async function Page({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params;
  
  const { data: profile, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('username', username)
    .single();

  if (!profile || error) return notFound();

  return <SplashPage profile={profile} />;
}