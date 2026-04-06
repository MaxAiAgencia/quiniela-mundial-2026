import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'
import { useAuthStore } from '@/stores/authStore'

export function useQuiniela(id: string) {
  const { user } = useAuthStore()

  return useQuery({
    queryKey: ['quiniela', id, user?.id],
    queryFn: async () => {
      // 1. Obtener la quiniela básica
      const { data: quiniela, error: qError } = await supabase
        .from('quinielas')
        .select('*')
        .eq('id', id)
        .single()

      if (qError) throw qError

      // 2. Obtener mi participación
      const { data: participation } = await (supabase
        .from('quiniela_participants') as any)
        .select('*')
        .eq('quiniela_id', id)
        .eq('user_id', user!.id)
        .single()

      // Si no existe participación, no es error crítico (no se ha unido)
      
      return {
        ...(quiniela as any),
        my_participation: (participation as any) || null
      }
    },
    enabled: !!id && !!user
  })
}
