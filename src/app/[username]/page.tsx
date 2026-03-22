import { supabase } from '../../utils/supabase';
import SplashPage from '../../components/SplashPage';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function Page({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params;
  
  const { data: profile, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('username', username)
    .single();

  if (error || !profile) return notFound();

  return <SplashPage profile={profile} />;
}