import { create } from 'zustand'
import type { Quiniela, PredictionInput } from '@/types'
import { supabase } from '@/lib/supabase'

interface QuinielaStore {
  currentQuiniela: Quiniela | null
  unsavedPredictions: Map<string, { home: number; away: number }>
  isSaving: boolean
  setCurrentQuiniela: (q: Quiniela | null) => void
  setPrediction: (matchId: string, home: number, away: number) => void
  saveAllPredictions: (quinielaId: string, userId: string) => Promise<void>
  clearUnsaved: () => void
}

export const useQuinielaStore = create<QuinielaStore>()((set, get) => ({
  currentQuiniela: null,
  unsavedPredictions: new Map(),
  isSaving: false,

  setCurrentQuiniela: (q) => set({ currentQuiniela: q }),

  setPrediction: (matchId, home, away) => {
    const map = new Map(get().unsavedPredictions)
    map.set(matchId, { home, away })
    set({ unsavedPredictions: map })
  },

  saveAllPredictions: async (quinielaId: string, userId: string) => {
    const { unsavedPredictions } = get()
    if (unsavedPredictions.size === 0) return

    set({ isSaving: true })

    const inputs: PredictionInput[] = Array.from(unsavedPredictions.entries()).map(
      ([match_id, { home, away }]) => ({
        match_id,
        home_goals: home,
        away_goals: away,
      })
    )

    const upserts = inputs.map((p) => ({
      quiniela_id: quinielaId,
      user_id: userId,
      match_id: p.match_id,
      home_goals: p.home_goals,
      away_goals: p.away_goals,
    }))

    const { error } = await supabase
      .from('quiniela_predictions')
      .upsert(upserts, { onConflict: 'quiniela_id,user_id,match_id' })

    set({ isSaving: false })
    if (error) throw error
    get().clearUnsaved()
  },

  clearUnsaved: () => set({ unsavedPredictions: new Map() }),
}))
