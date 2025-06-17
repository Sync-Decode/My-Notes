import { create } from 'zustand'
import { supabase } from '@/supabase/supabase-client'

export const useAuthStore = create((set) => ({
  signUpEmail: '',
  setSignUpEmail: (value) => {
    set(() => ({
      signUpEmail: value,
    }))
  },
}))

export const useFilter = create((set) => ({
  isTodaySelected: false,

  setIsTodaySelected: () =>
    set((state) => ({ isTodaySelected: !state.isTodaySelected })),

  filterToday: async (isTodaySelected) => {
    const today = new Date().toISOString().split('T')[0]

    if (isTodaySelected) {
      const { data, error } = await supabase
        .from('notes')
        .select('*')
        .gte('created_at', `${today}T00:00:00`)
        .lt('created_at', `${today}T:23:59:59`)

      set({ notes: data })
      if (error) console.error('Could not fetch filtered notes', error.message)
    }
  },
}))

export const useNotes = create((set) => ({
  notes: [],
  email: '',

  fetchNotes: async () => {
    const { data, error } = await supabase
      .from('notes')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Could not fetch notes', error.message)
    } else {
      set({ notes: data })
    }
  },

  fetchEmail: async () => {
    const { data, error } = await supabase.auth.getSession()
    const e_mail = data.session.user.email
    set({ email: e_mail })
    if (error) console.error('Error', error.message)
  },

  addNote: async ({ title, note, email }) => {
    const { error } = await supabase
      .from('notes')
      .insert({ title: title, note: note, email: email })

    if (error) console.error('Could not add the note', error.message)
  },

  deleteNote: async (id) => {
    const { error } = await supabase.from('notes').delete().eq('id', id)

    if (error) console.error('Could not delete the note', error.message)
  },
}))
