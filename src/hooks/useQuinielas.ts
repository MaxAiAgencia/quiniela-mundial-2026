import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'
import { Quiniela } from '@/types'

/**
 * useQuinielas
 * Obtiene la lista de quinielas abiertas con conteo real de participantes.
 */
export function useQuinielas() {
  return useQuery({
    queryKey: ['quinielas'],
    queryFn: async () => {
      // 1. Obtener quinielas abiertas con datos del admin
      const { data: quinielas, error } = await supabase
        .from('quinielas')
        .select(`
          *,
          profiles!quinielas_admin_id_fkey (username, display_name, avatar_url)
        `)
        .eq('status', 'open')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching quinielas:', error)
        throw error
      }

      if (!quinielas || quinielas.length === 0) return []

      // 2. Obtener conteo real de participantes por quiniela (una sola query)
      const ids = quinielas.map((q: any) => q.id)
      const { data: participantRows } = await supabase
        .from('quiniela_participants')
        .select('quiniela_id')
        .in('quiniela_id', ids)

      const countMap: Record<string, number> = {}
      for (const row of participantRows || []) {
        countMap[(row as any).quiniela_id] = (countMap[(row as any).quiniela_id] || 0) + 1
      }

      // 3. Mapear datos para que coincidan con la interfaz Quiniela
      return quinielas.map((q: any) => ({
        ...q,
        admin: q.profiles,
        participants_count: countMap[q.id] || 0
      })) as Quiniela[]
    }
  })
}
