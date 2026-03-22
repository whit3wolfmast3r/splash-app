export const dynamic = 'force-dynamic';
import { supabase } from '../../utils/supabase';
import SplashPage from '../../components/SplashPage';
import { notFound } from 'next/navigation';

// We added 'Promise' here to satisfy the new Next.js 15 rules
export default async function Page({ params }: { params: Promise<{ username: string }> }) {
  
  // We MUST 'await' the params now
  const { username } = await params;

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('username', username)
    .single();

  if (!profile) {
    notFound();
  }

  return <SplashPage profile={profile} />;
}