import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'
import { Standing, GroupId } from '@/types'

export function useGroups() {
  return useQuery({
    queryKey: ['groups'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('standings')
        .select(`
          *,
          team:teams(*)
        `)
        .order('group_id', { ascending: true })
        .order('points', { ascending: false })
        .order('goal_diff', { ascending: false })

      if (error) throw error

      // Agrupar por ID de grupo
      const groups = (data as Standing[]).reduce((acc, curr) => {
        const id = curr.group_id as GroupId
        if (!acc[id]) acc[id] = []
        acc[id].push(curr)
        return acc
      }, {} as Record<GroupId, Standing[]>)

      return groups
    },
    staleTime: 60_000, // 1 minuto
  })
}
