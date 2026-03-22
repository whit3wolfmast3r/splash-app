import { createClient } from '../../utils/supabase/server'; // Updated this line
import SplashPage from '../../components/SplashPage';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function Page({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params;
  
  // Initialize the server-side client
  const supabase = await createClient(); 
  
  const { data: profile, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('username', username)
    .single();

  if (error || !profile) return notFound();

  return <SplashPage profile={profile} />;
}