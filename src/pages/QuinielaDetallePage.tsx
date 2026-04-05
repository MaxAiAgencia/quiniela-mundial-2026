import { useParams } from 'react-router-dom'
import { useQuiniela } from '@/hooks/useQuiniela'
import { PaymentUpload } from '@/components/quiniela/PaymentUpload'
import { PredictionGrid } from '@/components/quiniela/PredictionGrid'
import { LeaderboardTable } from '@/components/quiniela/LeaderboardTable'
import { 
  Trophy, 
  Users, 
  DollarSign, 
  ChevronRight, 
  Lock,
  Award,
  ShieldCheck,
  CreditCard,
  RefreshCw,
  Coins,
  AlertTriangle,
  Zap
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { useAuthStore } from '@/stores/authStore'
import { supabase } from '@/lib/supabase'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'

export default function QuinielaDetallePage() {
  const { id } = useParams()
  const { user } = useAuthStore()
  const { data: q, isLoading, refetch } = useQuiniela(id!)

  if (isLoading) return (
    <div className="p-8 max-w-5xl mx-auto space-y-8 animate-pulse text-center py-20">
       <div className="w-16 h-16 bg-muted rounded-full mx-auto mb-4" />
       <div className="h-8 bg-muted w-64 mx-auto rounded-lg mb-2" />
       <div className="h-4 bg-muted w-48 mx-auto rounded-lg" />
    </div>
  )

  if (!q) return <div className="p-8 text-center text-slate-500 font-bold uppercase tracking-widest py-20">Quiniela no encontrada</div>

  const isPaid = q.my_participation?.paid === true
  const hasProof = !!q.my_participation?.payment_proof_url
  const isOrganiser = user?.id === q.admin_id
  const isActivated = q.is_activated === true

  const totalCollected = Number(q.total_collected || 0)
  const commissionPct = 20
  const houseProfit = totalCollected * (commissionPct / 100)
  const netPrizePool = totalCollected - houseProfit
  
  const handleJoin = async () => {
    if (!user) {
      toast.error('Debes iniciar sesión para unirte.')
      return
    }
    // Validar límite de participantes según el plan
    const currentCount = q.participants_count || 0
    const limit = q.max_participants || 5
    if (currentCount >= limit) {
      toast.error(`Este grupo ha alcanzado el límite máximo de ${limit} participantes.`)
      return
    }

    try {
      const { error } = await (supabase
        .from('quiniela_participants') as any)
        .insert({
          quiniela_id: id,
          user_id: user.id,
          paid: false
        })
      if (error) throw error
      toast.success('¡Te has unido a la quiniela! Ahora sube tu comprobante para participar.')
      refetch()
    } catch (error: any) {
      toast.error('Error al unirse: ' + error.message)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Banner de Activación SaaS */}
      {!isActivated && (
        <div className="bg-amber-500 text-amber-950 py-3 px-4 relative z-50 shadow-lg border-b border-amber-600/20">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
            <div className="flex items-center gap-3">
               <div className="p-2 bg-amber-900/10 rounded-lg">
                  <AlertTriangle className="w-5 h-5" />
               </div>
               <div>
                  <p className="text-sm font-black uppercase tracking-tight">Grupo Pendiente de Activación</p>
                  <p className="text-[10px] font-bold opacity-80 uppercase tracking-widest">
                    {isOrganiser 
                      ? "Debes pagar tu licencia de plataforma para habilitar este torneo." 
                      : "El organizador aún no ha activado este grupo. Las predicciones están bloqueadas."}
                  </p>
               </div>
            </div>
            {isOrganiser && (
              <Button 
                variant="outline" 
                className="bg-amber-950 text-white border-none hover:bg-black text-[10px] font-black uppercase h-8 px-4 rounded-full"
                onClick={() => toast.info("Contacta a Efraín para enviar el comprobante de tu licencia Pro/Elite.")}
              >
                ACTIVAR AHORA <Zap className="w-3 h-3 ml-2 fill-current" />
              </Button>
            )}
          </div>
        </div>
      )}

      {/* Header Premium de Quiniela */}
      <div className="bg-indigo-900 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 py-16 relative z-10">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-indigo-300 text-xs font-black uppercase tracking-[0.2em] italic">
                <Trophy className="w-4 h-4" />
                Mundial 2026 • PLan {q.plan_name || 'BRONCE'}
              </div>
              <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-tight drop-shadow-md">
                {q.name}
              </h1>
              <p className="text-indigo-200/90 text-sm font-medium max-w-xl leading-relaxed italic border-l-2 border-indigo-500/30 pl-4">
                {q.description || 'Únete al torneo de pronósticos más grande de México.'}
              </p>
            </div>
            
            <div className="flex items-center gap-6 text-[10px] font-black uppercase tracking-widest text-indigo-300/60">
               <div className="flex flex-col items-center gap-1.5 p-4 bg-indigo-950/40 rounded-2xl border border-indigo-800/30">
                  <DollarSign className="w-5 h-5 text-indigo-400" />
                  Coste: <span className="text-white text-base">${q.cost_mxn}</span>
               </div>
               <div className="flex flex-col items-center gap-1.5 p-4 bg-indigo-950/40 rounded-2xl border border-indigo-800/30 text-center">
                  <Users className="w-5 h-5 text-indigo-400" />
                  Cupos: <span className="text-white text-base">{q.max_participants || '∞'}</span>
               </div>
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-indigo-500/10 to-transparent skew-x-[-20deg] transform translate-x-32" />
      </div>

      <div className="max-w-7xl mx-auto px-4 -mt-8 relative z-20">
        {/* Money Pool Card - Nueva visualización de Gran Premio */}
        <div className="mb-12 grid grid-cols-1 md:grid-cols-3 gap-6">
           <div className="md:col-span-2 p-8 bg-white border-2 border-indigo-100 rounded-[40px] shadow-sm flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
              <div className="space-y-4 relative z-10 text-center md:text-left w-full md:w-auto">
                 <div className="flex items-center justify-center md:justify-start gap-2 text-[10px] font-black uppercase text-indigo-600 tracking-widest">
                    <Coins className="w-4 h-4" />
                    Bolsa en Crecimiento
                 </div>
                 <div className="space-y-1">
                    <h4 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter">
                      ${netPrizePool.toLocaleString('es-MX')} <span className="text-base text-slate-400 ml-1">MXN</span>
                    </h4>
                    <p className="text-sm font-bold text-slate-500 uppercase tracking-tight italic">Gran Premio Acumulado (80%)</p>
                 </div>
              </div>
              
              <div className="w-full md:w-auto flex flex-col items-center md:items-end gap-2 relative z-10 px-6 py-4 bg-indigo-50 rounded-3xl border border-indigo-100">
                  <p className="text-[10px] font-black uppercase text-indigo-400 tracking-widest">Recaudación Total</p>
                  <p className="text-xl font-black text-indigo-900 leading-none">${totalCollected.toLocaleString('es-MX')}</p>
                  <div className="mt-2 h-1.5 w-full bg-indigo-200 rounded-full overflow-hidden">
                     <div className="h-full bg-indigo-600 rounded-full" style={{ width: '80%' }} />
                  </div>
                  <p className="text-[9px] font-medium text-indigo-400 italic">20% Gestión de Plataforma</p>
               </div>

               <Trophy className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 text-indigo-50/50 -rotate-12 pointer-events-none" />
            </div>

            {q.my_participation ? (
              <div className={cn(
                "p-8 rounded-[40px] border-2 shadow-sm transition-all flex flex-col items-center justify-center gap-4 text-center",
                isPaid ? "bg-white border-green-100" : "bg-indigo-50 border-indigo-200"
              )}>
                 <div className={cn(
                   "w-12 h-12 rounded-2xl flex items-center justify-center border-2",
                   isPaid ? "bg-green-50 border-green-200 text-green-600" : "bg-indigo-100 border-indigo-200 text-indigo-600"
                 )}>
                   {isPaid ? <ShieldCheck className="w-6 h-6" /> : <CreditCard className="w-6 h-6" />}
                 </div>
                 <div>
                   <h4 className="text-sm font-black uppercase tracking-tight text-slate-900 leading-none mb-1">
                     {isPaid ? 'Mi Inscripción: Activa' : 'Sin Validar'}
                   </h4>
                   <p className="text-[10px] font-medium text-slate-500">
                     {isPaid ? 'Estás compitiendo por la bolsa.' : 'Sube tu comprobante de pago.'}
                   </p>
                 </div>
              </div>
            ) : (
              <div className="p-8 rounded-[40px] border-2 border-dashed border-indigo-200 bg-white shadow-sm flex flex-col items-center justify-center gap-4 text-center group hover:border-indigo-400 transition-all">
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 group-hover:scale-110 transition-transform">
                  <Trophy className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-black uppercase tracking-tight text-slate-900 leading-none mb-1">¿Quieres entrar?</h4>
                  <p className="text-[10px] font-medium text-slate-500 mb-4">Costo: ${q.cost_mxn} MXN</p>
                  <Button 
                    onClick={handleJoin}
                    disabled={!isActivated}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl py-2 px-6 h-auto font-black uppercase tracking-widest text-[9px] shadow-lg shadow-indigo-600/20 disabled:opacity-50"
                  >
                    {isActivated ? "UNIRME AHORA" : "BLOQUEADO"}
                  </Button>
                </div>
              </div>
            )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content (Tabs: Juego vs Ranking) */}
          <div className="lg:col-span-2 space-y-12">
            <Tabs defaultValue={isPaid ? "juego" : "ranking"} className="w-full">
              <div className="flex items-center justify-between border-b border-slate-200 pb-px mb-8 text-xs font-black uppercase tracking-[0.2em] text-slate-400">
                <TabsList className="bg-transparent h-auto p-0 gap-8">
                  <TabsTrigger 
                    value="juego" 
                    className="pb-4 rounded-none border-b-2 border-transparent data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-900 transition-all font-black outline-none"
                  >
                    Pronósticos
                  </TabsTrigger>
                  <TabsTrigger 
                    value="ranking" 
                    className="pb-4 rounded-none border-b-2 border-transparent data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-900 transition-all font-black outline-none"
                  >
                    Tabla de Posiciones
                  </TabsTrigger>
                </TabsList>
                
                <div className="pb-4 hidden md:flex items-center gap-2">
                   <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                   Resultados en Vivo
                </div>
              </div>

              <TabsContent value="juego" className="mt-0 outline-none">
                {isPaid && isActivated ? (
                  <PredictionGrid quinielaId={id!} />
                ) : (
                  <div className="py-20 text-center space-y-6 bg-white rounded-[40px] border-2 border-dashed border-slate-100 shadow-sm px-8">
                    <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center mx-auto border-4 border-white shadow-sm">
                       {isActivated ? <Lock className="w-8 h-8 text-indigo-400" /> : <AlertTriangle className="w-8 h-8 text-amber-500" />}
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-2xl font-black uppercase tracking-tighter text-slate-900 leading-none">
                        {!isActivated ? "Grupo Inactivo" : "Contenido Bloqueado"}
                      </h3>
                      <p className="text-sm font-medium text-slate-500 max-w-sm mx-auto">
                        {!isActivated 
                          ? "Este torneo aún no ha sido activado por el administrador de la plataforma." 
                          : "Para poder registrar tus pronósticos y ganar premios, debes validar tu inscripción primero."}
                      </p>
                    </div>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="ranking" className="mt-0 outline-none">
                 <div className="space-y-6">
                    <div className="flex items-center justify-between">
                       <h3 className="text-2xl font-black uppercase tracking-tight text-slate-900">Ranking Global</h3>
                       <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic flex items-center gap-2">
                          <Trophy className="w-3 h-3" />
                          Actualizado hace 1m
                       </p>
                    </div>
                    <LeaderboardTable quinielaId={id!} />
                 </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {!isPaid && !hasProof && q.my_participation && (
               <PaymentUpload 
                 quinielaId={id!} 
                 organiserPaymentInfo={q.organiser_payment_info}
                 costMxn={q.cost_mxn}
                 onSuccess={refetch} 
               />
            )}

            {!isPaid && hasProof && (
               <div className="p-8 bg-amber-50 rounded-3xl border-2 border-amber-200/50 space-y-4">
                  <div className="flex items-center gap-3">
                     <RefreshCw className="w-5 h-5 text-amber-600 animate-spin" />
                     <h4 className="text-sm font-black text-amber-900 uppercase tracking-tighter leading-none">Validación Pendiente</h4>
                  </div>
                  <p className="text-xs text-amber-800 leading-relaxed font-medium">
                    Ya recibimos tu comprobante de pago. El administrador de la plataforma está verificando la transacción.
                  </p>
                  <div className="pt-4 border-t border-amber-200/30">
                     <p className="text-[10px] font-black text-amber-600/60 uppercase italic tracking-widest">¿Problemas con tu pago?</p>
                     <p className="text-xs font-bold text-amber-900 mt-2 cursor-pointer hover:underline flex items-center gap-2">
                        Contactar soporte <ChevronRight className="w-3 h-3" />
                     </p>
                  </div>
               </div>
            )}

            <div className="p-8 bg-slate-900 text-white rounded-[40px] shadow-2xl space-y-6 relative overflow-hidden group">
               <div className="relative z-10 space-y-6">
                  <h3 className="text-xs font-black uppercase tracking-[0.2em] text-indigo-400 flex items-center gap-2">
                     <Award className="w-4 h-4" />
                     Sistema de Puntos
                  </h3>
                  <div className="space-y-4">
                    {[
                      { label: 'Marcador Exacto', pts: q.points_exact, desc: 'Acertaste el resultado real de goles.' },
                      { label: 'Resultado (W/D/L)', pts: q.points_winner, desc: 'Acertaste quién ganó o si hubo empate.' },
                    ].map((rule, i) => (
                      <div key={i} className="flex items-start gap-4 p-4 bg-white/5 rounded-3xl group transition-all hover:bg-white/10 border border-white/5">
                         <div className="text-2xl font-black text-indigo-400">+{rule.pts}</div>
                         <div>
                            <p className="text-xs font-black uppercase tracking-tight leading-none mb-1 text-white">{rule.label}</p>
                            <p className="text-[10px] text-indigo-200/30 font-medium italic leading-relaxed">{rule.desc}</p>
                         </div>
                      </div>
                    ))}
                  </div>
               </div>
               <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/10 blur-[40px] rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
