import { createBrowserClient } from './supabase'
import type { Profile } from './supabase-types'

function sb() {
  return createBrowserClient()
}

export async function signUpWithEmail(email: string, password: string, name: string) {
  const { data, error } = await sb().auth.signUp({
    email,
    password,
    options: { data: { name } },
  })
  if (error) throw error
  if (data.user) {
    await sb().from('profiles').upsert({
      id: data.user.id,
      email,
      name,
      role: 'student',
    })
  }
  return data
}

export async function signInWithEmail(email: string, password: string) {
  const { data, error } = await sb().auth.signInWithPassword({ email, password })
  if (error) throw error
  return data
}

export async function signInWithOtp(email: string) {
  const { error } = await sb().auth.signInWithOtp({
    email,
    options: { shouldCreateUser: true },
  })
  if (error) throw error
}

export async function signInWithGoogle() {
  const { error } = await sb().auth.signInWithOAuth({
    provider: 'google',
    options: { redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback` },
  })
  if (error) throw error
}

export async function signOut() {
  const { error } = await sb().auth.signOut()
  if (error) throw error
}

export async function getCurrentUser() {
  const { data: { user }, error } = await sb().auth.getUser()
  if (error || !user) return null
  return user
}

export async function getCurrentProfile(): Promise<Profile | null> {
  const user = await getCurrentUser()
  if (!user) return null
  const { data } = await sb()
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()
  return data
}

export async function resetPassword(email: string) {
  const { error } = await sb().auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard`,
  })
  if (error) throw error
}

export async function updateProfile(updates: Omit<Partial<Profile>, 'id' | 'created_at'>) {
  const user = await getCurrentUser()
  if (!user) throw new Error('Not authenticated')
  const { error } = await sb()
    .from('profiles')
    .update(updates)
    .eq('id', user.id)
  if (error) throw error
}
