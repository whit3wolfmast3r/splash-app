export async function login(formData: FormData) {
  const supabase = await createClient()

  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    console.error(error)
    redirect('/login?error=Invalid credentials')
  }

  // Forces the browser to refresh and see the new cookie
  revalidatePath('/', 'layout')
  redirect('/dashboard')
}