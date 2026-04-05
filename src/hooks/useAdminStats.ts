import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'

export function useAdminStats() {
  return useQuery({
    queryKey: ['admin-stats'],
    queryFn: async () => {
      // 1. Obtener datos de todas las quinielas para calcular lucro SaaS
      const { data: qData, error: qError } = await (supabase
        .from('quinielas') as any)
        .select('id, name, total_collected, house_commission_pct, plan_name, is_activated, admin_id, created_at')

      if (qError) throw qError

      const totalCollected = qData.reduce((acc: number, q: any) => acc + Number(q.total_collected || 0), 0)
      
      // Cálculo de lucro SaaS: Basado en licencias Pro/Elite activadas
      const saasProfit = qData.reduce((acc: number, q: any) => {
        if (!q.is_activated) return acc
        if (q.plan_name === 'PRO') return acc + 199
        if (q.plan_name === 'ELITE') return acc + 499
        return acc
      }, 0)

      // Cálculo de lucro "Legacy" o del Organizador (20% del pot)
      const totalPotProfit = qData.reduce((acc: number, q: any) => {
        const commission = 20
        const collected = Number(q.total_collected || 0)
        return acc + (collected * (commission / 100))
      }, 0)

      // 2. Obtener conteo de participantes únicos y pagos pendientes
      const { count: participantsCount, error: pError } = await supabase
        .from('quiniela_participants')
        .select('*', { count: 'exact', head: true })

      const { count: pendingPayments, error: ppError } = await supabase
        .from('quiniela_participants')
        .select('*', { count: 'exact', head: true })
        .eq('paid', false)
        .not('payment_proof_url', 'is', null)

      if (pError || ppError) throw pError || ppError

      return {
        totalCollected,
        saasProfit,
        totalPotProfit, // Lo que los organizadores retienen en total
        participantsCount: participantsCount || 0,
        pendingPayments: pendingPayments || 0,
        quinielas: qData || [], // Toda la lista para gestión
        daysToWorldCup: 68
      }
    }
  })
}

export function useAdminLogs() {
  return useQuery({
    queryKey: ['admin-logs'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('audit_logs')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10)

      if (error) throw error
      return data
    }
  })
}
