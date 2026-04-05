import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'
import { Match, MatchFilters } from '@/types'

/**
 * useMatches: Hook para obtener el listado de partidos con filtros.
 * @param filters Filtros de fase, grupo, estado, sede, equipo y fecha.
 */
export function useMatches(filters: MatchFilters = {}) {
  const { phase, group_id, status, venue_id, team_id, date } = filters

  return useQuery({
    queryKey: ['matches', filters],
    queryFn: async () => {
      let query = supabase
        .from('matches')
        .select(`
          *,
          home_team:teams!matches_home_team_id_fkey(*),
          away_team:teams!matches_away_team_id_fkey(*),
          venue:venues(*)
        `)
        .order('scheduled_at', { ascending: true })

      if (phase) query = query.eq('phase', phase)
      if (group_id) query = query.eq('group_id', group_id)
      if (status) query = query.eq('status', status)
      if (venue_id) query = query.eq('venue_id', venue_id)
      
      if (team_id) {
        query = query.or(`home_team_id.eq.${team_id},away_team_id.eq.${team_id}`)
      }

      // Si hay fecha, buscamos el rango del día completo (considerando UTC para robustez inicial)
      if (date) {
        // Formato esperado: YYYY-MM-DD
        const start = `${date}T00:00:00Z`
        const end = `${date}T23:59:59Z`
        query = query.gte('scheduled_at', start).lte('scheduled_at', end)
      }

      const { data, error } = await query

      if (error) throw error
      return data as Match[]
    },
    staleTime: 30_000,
  })
}
