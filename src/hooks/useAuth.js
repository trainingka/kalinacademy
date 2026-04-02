import { create } from 'zustand'
import { supabase } from '../lib/supabase'

export const useAuth = create((set) => ({
  user: null,
  profile: null,
  loading: true,
  
  setUser: (user) => set({ user }),
  setProfile: (profile) => set({ profile }),
  setLoading: (loading) => set({ loading }),

  signIn: async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error
    return data
  },

  signUp: async (email, password, role = 'staff') => {
    const { data, error } = await supabase.auth.signUp({ 
      email, 
      password,
      options: {
        data: { role }
      }
    })
    if (error) throw error
    
    // Create profile entry
    if (data.user) {
      const { error: profileError } = await supabase
        .from('kpisync_profiles')
        .insert([{ id: data.user.id, email, role }])
      if (profileError) throw profileError
    }
    
    return data
  },

  signOut: async () => {
    await supabase.auth.signOut()
    set({ user: null, profile: null })
  },

  fetchProfile: async (userId) => {
    const { data, error } = await supabase
      .from('kpisync_profiles')
      .select('*')
      .eq('id', userId)
      .single()
    
    if (error) {
      console.error('Error fetching profile:', error)
      return null
    }
    set({ profile: data })
    return data
  }
}))
