import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'
import { Team, Confederation } from '@/types'

export function useTeams(confederation?: Confederation) {
  return useQuery({
    queryKey: ['teams', confederation],
    queryFn: async () => {
      let query = supabase.from('teams').select('*').order('name', { ascending: true })
      
      if (confederation) {
        query = query.eq('confederation', confederation)
      }

      const { data, error } = await query

      if (error) throw error
      return data as Team[]
    },
    staleTime: Infinity, // Los equipos no cambian
  })
}
