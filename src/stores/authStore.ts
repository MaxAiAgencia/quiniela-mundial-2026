import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { User, Session } from '@supabase/supabase-js'
import type { Profile } from '@/types'
import { supabase } from '@/lib/supabase'

interface AuthStore {
  user: User | null
  session: Session | null
  profile: Profile | null
  isAdmin: boolean
  isLoading: boolean
  setUser: (user: User | null, session: Session | null) => void
  fetchProfile: (userId: string) => Promise<void>
  signIn: (email: string, password: string) => Promise<void>
  signInWithGoogle: () => Promise<void>
  signOut: () => Promise<void>
  updateProfile: (data: Partial<Profile>) => Promise<void>
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      session: null,
      profile: null,
      isAdmin: false,
      isLoading: false,

      setUser: (user, session) => {
        set({ user, session })
        if (user) get().fetchProfile(user.id)
        else set({ profile: null, isAdmin: false })
      },

      fetchProfile: async (userId: string) => {
        const { data } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', userId)
          .single()

        if (data) {
          set({ profile: data as Profile, isAdmin: (data as any).is_admin || false })
        }
      },

      signIn: async (email: string, password: string) => {
        set({ isLoading: true })
        const { error } = await supabase.auth.signInWithPassword({ email, password })
        set({ isLoading: false })
        if (error) throw error
      },

      signInWithGoogle: async () => {
        set({ isLoading: true })
        const { error } = await supabase.auth.signInWithOAuth({
          provider: 'google',
          options: { redirectTo: `${window.location.origin}/` },
        })
        set({ isLoading: false })
        if (error) throw error
      },

      signOut: async () => {
        await supabase.auth.signOut()
        set({ user: null, session: null, profile: null, isAdmin: false })
      },

      updateProfile: async (data: Partial<Profile>) => {
        const { user } = get()
        if (!user) return
        const { data: updated } = await (supabase
          .from('profiles') as any)
          .update(data)
          .eq('id', user.id)
          .select()
          .single()
        if (updated) set({ profile: updated as Profile })
      },
    }),
    {
      name: 'auth-store',
      partialize: (state) => ({ profile: state.profile }),
    }
  )
)
