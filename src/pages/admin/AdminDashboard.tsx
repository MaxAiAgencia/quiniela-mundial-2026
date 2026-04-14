import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { useAdminStats } from '@/hooks/useAdminStats'
import {
  DollarSign,
  Users,
  AlertCircle,
  TrendingUp,
  Clock,
  Download,
  CheckCircle2,
  Zap,
  Globe
} from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { toast } from 'sonner'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useQueryClient } from '@tanstack/react-query'

export default function AdminDashboard() {
  const { data: stats, isLoading } = useAdminStats()
  const queryClient = useQueryClient()

  const dashboardStats = [
    { 
      label: 'Recaudación Bruta', 
      value: stats ? `$${stats.totalCollected.toLocaleString('es-MX')}` : '$0', 
      icon: DollarSign, 
      color: 'text-green-600', 
      bg: 'bg-green-50',
      footer: 'Total de inscripciones'
    },
    { 
      label: 'Ingresos SaaS', 
      value: stats ? `$${stats.saasProfit.toLocaleString('es-MX')}` : '$0', 
      icon: Zap, 
      color: 'text-indigo-600', 
      bg: 'bg-indigo-50',
      footer: 'Cobro por licencias Pro/Elite'
    },
    { 
      label: 'Participantes', 
      value: stats?.participantsCount || '0', 
      icon: Users, 
      color: 'text-blue-600', 
      bg: 'bg-blue-50',
      footer: 'Usuarios registrados'
    },
    { 
      label: 'Pagos Pendientes', 
      value: stats?.pendingPayments || '0', 
      icon: AlertCircle, 
      color: 'text-amber-600', 
      bg: 'bg-amber-50',
      footer: 'Por validar'
    },
  ]

  if (isLoading) return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-pulse">
       {[1,2,3,4].map(i => <div key={i} className="h-32 bg-slate-100 rounded-3xl" />)}
    </div>
  )

  return (
    <div className="space-y-12">
      {/* Header */}
      <section className="space-y-1">
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Panel Administrativo</h1>
        <p className="text-slate-500 font-medium">Control financiero y operativo de la Quiniela Mundial 2026.</p>
      </section>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {dashboardStats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.label} className="border-0 shadow-sm overflow-hidden bg-white hover:shadow-md transition-all rounded-[32px]">
              <CardContent className="p-6">
                <div className="flex items-center justify-between gap-4">
                  <div className="space-y-1.5">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">{stat.label}</p>
                    <div className="text-3xl font-black text-slate-900 tracking-tighter">{stat.value}</div>
                  </div>
                  <div className={`p-3 rounded-2xl ${stat.bg}`}>
                    <Icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-1.5 text-[9px] font-bold text-slate-300 uppercase tracking-widest">
                   {stat.footer}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Gestión de Quinielas / Activaciones */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
           <div>
              <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">Gestión de Grupos</h2>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Activa licencias Pro y Elite manualmente</p>
           </div>
           <Button variant="outline" size="sm" className="rounded-full h-8 text-[10px] font-black uppercase">
              Ver Todos <Globe className="w-3 h-3 ml-2" />
           </Button>
        </div>

        <div className="grid grid-cols-1 gap-4">
           {stats?.quinielas?.map((q: any) => (
             <div key={q.id} className="p-6 bg-white border border-slate-100 rounded-[32px] shadow-sm flex flex-col md:flex-row items-center justify-between gap-6 hover:shadow-md transition-all">
                <div className="flex items-center gap-4">
                   <div className={cn(
                     "w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg",
                     q.plan_name === 'ELITE' ? "bg-purple-600" : q.plan_name === 'PRO' ? "bg-indigo-600" : "bg-slate-400"
                   )}>
                      <Trophy className="w-6 h-6" />
                   </div>
                   <div>
                      <h3 className="text-sm font-black text-slate-900 uppercase leading-none mb-1">{q.name}</h3>
                      <div className="flex items-center gap-2">
                         <Badge className={cn(
                           "text-[8px] font-black uppercase tracking-widest px-2 py-0 h-4 border-none",
                           q.plan_name === 'ELITE' ? "bg-purple-100 text-purple-600" : q.plan_name === 'PRO' ? "bg-indigo-100 text-indigo-600" : "bg-slate-100 text-slate-500"
                         )}>
                            Plan {q.plan_name}
                         </Badge>
                         <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                            {new Date(q.created_at).toLocaleDateString()}
                         </p>
                      </div>
                   </div>
                </div>

                <div className="flex items-center gap-8">
                   <div className="text-center md:text-right">
                      <p className="text-xs font-black text-slate-900 leading-none">${q.total_collected.toLocaleString('es-MX')}</p>
                      <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">Recaudado</p>
                   </div>

                   <div className="flex items-center gap-3 border-l border-slate-100 pl-8">
                      <div className="flex flex-col items-end">
                         <span className={cn(
                           "text-[9px] font-black uppercase tracking-widest mb-1",
                           q.is_activated ? "text-green-600" : "text-amber-600"
                         )}>
                            {q.is_activated ? 'Activado' : 'Pendiente'}
                         </span>
                         {q.is_activated ? <CheckCircle2 className="w-4 h-4 text-green-500" /> : <Clock className="w-4 h-4 text-amber-500" />}
                      </div>
                      
                      <Button
                        size="sm"
                        variant={q.is_activated ? "outline" : "default"}
                        className={cn(
                          "rounded-xl h-9 px-4 text-[10px] font-black uppercase tracking-widest",
                          q.is_activated ? "border-red-100 text-red-600 hover:bg-red-50" : "bg-indigo-600 hover:bg-indigo-700"
                        )}
                        onClick={async () => {
                           try {
                              const { error } = await (supabase.from('quinielas') as any)
                                .update({ is_activated: !q.is_activated })
                                .eq('id', q.id)
                              if (error) throw error
                              toast.success(q.is_activated ? 'Quiniela desactivada' : '¡Quiniela activada!')
                              queryClient.invalidateQueries({ queryKey: ['admin-stats'] })
                           } catch (e: any) {
                              toast.error('Error: ' + e.message)
                           }
                        }}
                      >
                        {q.is_activated ? 'Desactivar' : 'Activar'}
                      </Button>
                   </div>
                </div>
             </div>
           ))}
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Desglose por Torneo */}
        <Card className="lg:col-span-2 border-0 shadow-sm bg-white rounded-[40px] overflow-hidden">
          <CardHeader className="p-8 border-b border-slate-50">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl font-black text-slate-900 uppercase tracking-tight">Potencial Económico</CardTitle>
                <CardDescription className="text-slate-400 text-[10px] font-black uppercase tracking-widest mt-1 italic">Proyección basada en volumen total de todos los grupos</CardDescription>
              </div>
              <TrendingUp className="w-5 h-5 text-indigo-500" />
            </div>
          </CardHeader>
          <CardContent className="p-8">
             <div className="space-y-6">
                <div className="p-6 bg-indigo-900 rounded-[32px] text-white space-y-4">
                   <div className="flex justify-between items-end">
                      <div>
                         <p className="text-[10px] font-black uppercase tracking-widest opacity-60">Dinero en Movimiento (Total Pots)</p>
                         <p className="text-3xl font-black tracking-tighter">${(stats?.totalCollected || 0).toLocaleString('es-MX')}</p>
                      </div>
                      <div className="text-right">
                         <p className="text-[10px] font-black uppercase tracking-widest opacity-60">Fondo para Premios (80%)</p>
                         <p className="text-xl font-black tracking-tighter text-indigo-300">
                            ${((stats?.totalCollected || 0) * 0.8).toLocaleString('es-MX')}
                         </p>
                      </div>
                   </div>
                   <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-indigo-400 w-[80%]" />
                   </div>
                </div>
             </div>
          </CardContent>
        </Card>

        {/* Acciones Rápidas */}
        <Card className="border-0 shadow-sm bg-indigo-900 text-white rounded-[40px] relative overflow-hidden">
          <CardHeader className="p-8 pb-4 relative z-10">
            <CardTitle className="text-xl font-black uppercase tracking-tight">Acciones Críticas</CardTitle>
            <CardDescription className="text-indigo-300 text-xs font-medium italic">Gestión de la Quiniela</CardDescription>
          </CardHeader>
          <CardContent className="p-8 pt-4 space-y-4 relative z-10">
            <button className="w-full py-4 px-6 bg-indigo-800 hover:bg-indigo-700 rounded-2xl text-xs font-black uppercase tracking-widest transition-all border border-indigo-700 shadow-xl text-left flex items-center justify-between group">
               <span>Pausar Torneo</span>
               <AlertCircle className="w-4 h-4 group-hover:scale-125 transition-transform" />
            </button>
            <button className="w-full py-4 px-6 bg-white text-indigo-900 hover:bg-indigo-50 rounded-2xl text-xs font-black uppercase tracking-widest transition-all shadow-xl text-left flex items-center justify-between group">
               <span>Balance de Pagos</span>
               <Download className="w-4 h-4" />
            </button>
            <div className="pt-6 mt-6 border-t border-indigo-800/50 space-y-3">
               <div className="flex items-center gap-2 text-[10px] font-black text-indigo-400 uppercase tracking-widest">
                  <Clock className="w-3 h-3" />
                  Próximo Inicio
               </div>
               <p className="text-2xl font-black text-white tracking-tighter">{stats?.daysToWorldCup ?? '—'} Días</p>
            </div>
          </CardContent>
          <TrendingUp className="absolute -bottom-8 -right-8 w-40 h-40 text-indigo-800/30 rotate-12 pointer-events-none" />
        </Card>
      </div>
    </div>
  )
}

function Trophy(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>
  )
}
