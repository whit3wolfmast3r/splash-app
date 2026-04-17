'use server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export async function login(formData: FormData) {
  const supabase = await createClient()
  const { error } = await supabase.auth.signInWithPassword({ 
    email: formData.get('email') as string, 
    password: formData.get('password') as string 
  })
  if (error) redirect(`/login?error=${encodeURIComponent(error.message)}`)
  revalidatePath('/', 'layout'); redirect('/dashboard')
}

export async function signup(formData: FormData) {
  const supabase = await createClient()
  const email = formData.get('email') as string
  const username = (formData.get('username') as string || '').toLowerCase().trim()

  const { error } = await supabase.auth.signUp({
    email,
    password: formData.get('password') as string,
    options: {
      emailRedirectTo: `https://agentlynxx.com/auth/callback`,
      data: { username: username } // Pass username to the trigger
    },
  })

  if (error) redirect(`/login?error=${encodeURIComponent(error.message)}`)
  redirect('/login?status=verify-sent')
}