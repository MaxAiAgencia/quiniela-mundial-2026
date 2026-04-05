import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'
import { useAuthStore } from '@/stores/authStore'
import { toast } from 'sonner'
import { QuinielaPrediction } from '@/types'

export function usePredictions(quinielaId: string) {
  const { user } = useAuthStore()
  const queryClient = useQueryClient()

  const { data: predictions, isLoading } = useQuery({
    queryKey: ['predictions', quinielaId, user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('quiniela_predictions')
        .select('*')
        .eq('quiniela_id', quinielaId)
        .eq('user_id', user?.id)

      if (error) throw error
      return (data as QuinielaPrediction[]) || []
    },
    enabled: !!quinielaId && !!user
  })

  const savePrediction = useMutation({
    mutationFn: async ({ matchId, homeGoals, awayGoals }: { matchId: string, homeGoals: number, awayGoals: number }) => {
      if (!user) throw new Error('Usuario no autenticado')

      // Usar cast an 'any' para evitar problemas de tipado estricto con upsert
      // que a veces fallan cuando los campos generados (id, created_at) son Omitidos en el tipo base
      const { data, error } = await (supabase
        .from('quiniela_predictions') as any)
        .upsert({
          quiniela_id: quinielaId,
          user_id: user.id,
          match_id: matchId,
          home_goals: homeGoals,
          away_goals: awayGoals
        }, { 
          onConflict: 'quiniela_id,user_id,match_id'
        })

      if (error) throw error
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['predictions', quinielaId] })
    },
    onError: (error: any) => {
      toast.error('Error al guardar pronóstico: ' + error.message)
    }
  })

  return {
    predictions,
    isLoading,
    savePrediction
  }
}
