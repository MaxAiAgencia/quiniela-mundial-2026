import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'
import { Quiniela } from '@/types'

/**
 * useQuinielas
 * Obtiene la lista de quinielas abiertas.
 * Nota: Simplificamos el conteo de participantes para evitar errores 500
 * si el join complex no está soportado por la configuración actual.
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

      // 2. Mapear datos para que coincidan con la interfaz Quiniela
      return (quinielas || []).map((q: any) => ({
        ...q,
        admin: q.profiles, // Cambiamos el nombre de la propiedad de profiles a admin
        participants_count: 0 // Simplificado a 0 por ahora hasta que el usuario se una
      })) as Quiniela[]
    }
  })
}
