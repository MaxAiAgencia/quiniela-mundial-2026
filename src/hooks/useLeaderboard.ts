import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'
import { LeaderboardEntry } from '@/types'

export function useLeaderboard(quinielaId: string) {
  return useQuery({
    queryKey: ['leaderboard', quinielaId],
    queryFn: async () => {
      // Usar la función RPC definida en el esquema SQL (on_001_initial_schema.sql:563)
      const { data, error } = await supabase.rpc('get_quiniela_leaderboard', {
        p_quiniela_id: quinielaId
      })

      if (error) throw error
      return (data as LeaderboardEntry[]) || []
    },
    enabled: !!quinielaId,
    refetchInterval: 60_000, // Refrescar cada minuto en vivo
  })
}
