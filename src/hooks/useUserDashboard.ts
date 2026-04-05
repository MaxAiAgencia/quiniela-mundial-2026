import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'
import { useAuthStore } from '@/stores/authStore'
import { Quiniela } from '@/types'

export interface UserParticipation {
  quiniela: Quiniela
  paid: boolean
  payment_proof_url: string | null
  total_points: number
  rank: number
}

export function useUserDashboard() {
  const { user } = useAuthStore()

  return useQuery({
    queryKey: ['user-dashboard', user?.id],
    queryFn: async () => {
      if (!user?.id) return []

      const { data, error } = await supabase
        .from('quiniela_participants')
        .select(`
          paid,
          payment_proof_url,
          total_points,
          rank,
          quiniela:quinielas(*)
        `)
        .eq('user_id', user.id)

      if (error) throw error
      return (data as any[]).map(item => ({
        ...item,
        quiniela: item.quiniela as Quiniela
      })) as UserParticipation[]
    },
    enabled: !!user?.id,
  })
}

export function useAvailableQuinielas() {
  return useQuery({
    queryKey: ['available-quinielas'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('quinielas')
        .select('*')
        .eq('status', 'active')
        .order('created_at', { ascending: false })

      if (error) throw error
      return (data as Quiniela[]) || []
    }
  })
}
