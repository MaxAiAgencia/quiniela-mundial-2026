import { useState } from 'react'
import { Trophy, Target, DollarSign, Calendar, Info, ArrowRight, ShieldCheck, ChevronLeft, Users } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '@/lib/supabase'
import { useAuthStore } from '@/stores/authStore'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { toast } from 'sonner'
import { QuinielaPrizeType, MatchPhase } from '@/types'

export default function QuinielaNuevaPage() {
  const navigate = useNavigate()
  const { user } = useAuthStore()
  const [isLoading, setIsLoading] = useState(false)
  
  // Form state
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [costMxn, setCostMxn] = useState(100)
  const [prizeType, setPrizeType] = useState<QuinielaPrizeType>('top3')
  const [planName, setPlanName] = useState<'BRONCE' | 'PRO' | 'ELITE'>('BRONCE')
  const [organiserPaymentInfo, setOrganiserPaymentInfo] = useState('')

  const { isAdmin } = useAuthStore()

  const plans = [
    {
      id: 'BRONCE',
      name: 'Bronce (Gratis)',
      desc: 'Para amigos cercanos',
      limit: 5,
      price: 0,
      icon: <Users className="w-5 h-5" />,
      color: 'from-slate-400 to-slate-600'
    },
    {
      id: 'PRO',
      name: 'Pro',
      desc: 'Grupos de oficina',
      limit: 50,
      price: 199,
      icon: <Target className="w-5 h-5" />,
      color: 'from-fifa-gold to-yellow-600'
    },
    {
      id: 'ELITE',
      name: 'Elite',
      desc: 'Comunidades grandes',
      limit: 9999,
      price: 499,
      icon: <Trophy className="w-5 h-5" />,
      color: 'from-purple-500 to-indigo-600'
    }
  ]

  const selectedPlanLimit = plans.find(p => p.id === planName)?.limit || 5

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) {
      toast.error('Debes iniciar sesión para crear una quiniela')
      navigate('/login')
      return
    }

    setIsLoading(true)
    try {
      const slug = name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '') + '-' + Math.random().toString(36).slice(2, 6)
      
      const { data, error } = await (supabase
        .from('quinielas') as any)
        .insert({
          slug,
          name,
          description,
          admin_id: user.id,
          cost_mxn: costMxn,
          prize_type: prizeType,
          status: 'open',
          phase_included: ['group', 'round_of_32', 'round_of_16', 'quarterfinal', 'semifinal', 'final'] as MatchPhase[],
          points_exact: 3,
          points_winner: 1,
          total_collected: 0,
          house_commission_pct: 20,
          plan_name: planName,
          max_participants: selectedPlanLimit,
          organiser_payment_info: organiserPaymentInfo,
          is_activated: isAdmin || planName === 'BRONCE' // Los de admin o gratuitos (bronce) se activan solos
        })
        .select()
        .single()

      if (error) throw error

      toast.success('¡Quiniela creada con éxito!')
      navigate(`/quiniela/${(data as any).id}`)
    } catch (error: any) {
      toast.error(error.message || 'Error al crear la quiniela')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="pb-24 lg:pb-12 max-w-4xl mx-auto px-4 md:px-8 py-8">
      {/* Header */}
      <div className="space-y-6 mb-10">
        <Link to="/quiniela" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-fifa-gold transition-colors">
          <ChevronLeft className="w-4 h-4" />
          VOLVER A QUINIELAS
        </Link>
        <div className="space-y-2">
          <h1 className="font-display text-4xl md:text-5xl text-fifa-white uppercase tracking-tight">
            ORGANIZA TU <span className="text-fifa-gold">TORNEO</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Configura las reglas, invita a tus amigos y compite por la bolsa acumulada más grande del Mundial.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Lado Izquierdo: Configuración Principal */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-white/10 bg-navy-light/20 backdrop-blur-md rounded-3xl overflow-hidden">
            <CardContent className="p-8 space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-fifa-gold uppercase tracking-[0.2em] ml-1">Nombre del Torneo</label>
                <div className="relative">
                  <Target className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-navy-dark/50 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-fifa-gold/50 transition-all font-sans"
                    placeholder="Ej: La Quiniela de la Oficina, Copa Amigos 2026..."
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] ml-1">Descripción (Opcional)</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-navy-dark/50 border border-white/5 rounded-2xl py-4 px-4 text-white min-h-[120px] focus:outline-none focus:ring-2 focus:ring-fifa-gold/50 transition-all font-sans resize-none"
                  placeholder="Detalla las reglas especiales o el lugar de la premiación..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] ml-1">Costo de Inscripción (MXN)</label>
                  <div className="relative">
                    <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-fifa-gold" />
                    <input
                      type="number"
                      required
                      min="50"
                      step="50"
                      value={costMxn}
                      onChange={(e) => setCostMxn(Number(e.target.value))}
                      className="w-full bg-navy-dark/50 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-white font-display text-xl"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] ml-1">Tipo de Premiación</label>
                  <select
                    value={prizeType}
                    onChange={(e) => setPrizeType(e.target.value as QuinielaPrizeType)}
                    className="w-full h-full bg-navy-dark/50 border border-white/5 rounded-2xl py-4 px-4 text-white font-sans focus:outline-none"
                  >
                    <option value="top3">Top 3 Ganadores</option>
                    <option value="winner_takes_all">Ganador Único (100%)</option>
                    <option value="custom">Personalizado</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-white/10 bg-navy-light/20 backdrop-blur-md rounded-3xl overflow-hidden mt-6">
            <CardContent className="p-8 space-y-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-fifa-gold/20 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5 text-fifa-gold" />
                </div>
                <h3 className="font-display text-xl text-white uppercase tracking-tight">Selecciona tu Plan</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {plans.map((plan) => (
                  <label 
                    key={plan.id}
                    className={`
                      relative group cursor-pointer p-5 rounded-3xl border-2 transition-all duration-300
                      ${planName === plan.id 
                        ? 'border-fifa-gold bg-fifa-gold/10' 
                        : 'border-white/5 bg-navy-dark/40 hover:border-white/20'}
                    `}
                  >
                    <input 
                      type="radio" 
                      name="plan" 
                      className="sr-only" 
                      onChange={() => setPlanName(plan.id as any)}
                      checked={planName === plan.id}
                    />
                    <div className="space-y-4">
                      <div className={`w-10 h-10 rounded-2xl bg-gradient-to-br ${plan.color} flex items-center justify-center text-white shadow-lg`}>
                        {plan.icon}
                      </div>
                      <div>
                        <h4 className="font-display text-lg text-white group-hover:text-fifa-gold transition-colors">{plan.name}</h4>
                        <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest">{plan.desc}</p>
                      </div>
                      <div className="pt-2 border-t border-white/5 space-y-1">
                        <p className="text-xs text-fifa-white/70">Límite: <span className="text-fifa-gold font-bold">{plan.limit === 9999 ? '∞' : plan.limit}</span> Jugadores</p>
                        <p className="text-lg font-display text-white">${plan.price} <span className="text-[10px] text-muted-foreground uppercase">MXN</span></p>
                      </div>
                    </div>
                  </label>
                ))}
              </div>

              <div className="space-y-4 pt-6 border-t border-white/5">
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-fifa-gold" />
                  <h4 className="text-sm font-black text-white uppercase tracking-widest">Tus Datos de Cobro</h4>
                </div>
                <p className="text-xs text-muted-foreground">Escribe los datos (CLABE, Banco, Binance ID) donde tus amigos te transferirán el costo de entrada.</p>
                <div className="relative">
                  <Info className="absolute left-4 top-4 w-5 h-5 text-muted-foreground" />
                  <textarea
                    required
                    value={organiserPaymentInfo}
                    onChange={(e) => setOrganiserPaymentInfo(e.target.value)}
                    className="w-full bg-navy-dark/50 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-white min-h-[80px] focus:outline-none focus:ring-2 focus:ring-fifa-gold/50 transition-all font-sans text-sm"
                    placeholder="Ej: BBVA CLABE 0123... a nombre de Juan Pérez."
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="p-6 bg-indigo-500/10 border border-indigo-500/20 rounded-3xl flex items-start gap-4 shadow-inner mt-6">
            <Info className="w-6 h-6 text-indigo-400 shrink-0 mt-1" />
            <div className="space-y-1">
              <h4 className="text-sm font-black text-white uppercase tracking-tight">Modelo SaaS Mundialista</h4>
              <p className="text-xs text-indigo-200/70 leading-relaxed font-medium">
                Tú gestionas los cobros directamente con tus amigos. La plataforma te cobra una licencia fija por la tecnología de marcadores automáticos y tablas en vivo. 
                {planName === 'BRONCE' ? ' Estás usando el Plan Gratuito (Limitado a 5 personas).' : ` Tu grupo se activará tras validar el pago de tu licencia de $${plans.find(p => p.id === planName)?.price} MXN.`}
              </p>
            </div>
          </div>
        </div>

        {/* Lado Derecho: Resumen y Submit */}
        <div className="space-y-6">
          <Card className="border-fifa-gold/20 bg-gradient-to-br from-navy-light/40 to-navy-dark/60 backdrop-blur-xl rounded-[40px] sticky top-24 overflow-hidden border">
            <div className="p-8 space-y-8">
              <div className="text-center space-y-2">
                <div className="flex justify-center mb-4">
                   <div className="p-4 bg-fifa-gold/10 rounded-full">
                      <ShieldCheck className="w-10 h-10 text-fifa-gold" />
                   </div>
                </div>
                <h3 className="font-display text-2xl text-fifa-white uppercase">Resumen de Creación</h3>
              </div>

              <div className="space-y-4 border-t border-b border-white/5 py-6">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Admin:</span>
                  <span className="text-fifa-white font-bold">{user?.user_metadata?.username || 'Tú'}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Estatus:</span>
                  <span className="text-green-500 font-bold uppercase tracking-widest text-[10px]">Protegido por RLS</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Inscripción:</span>
                  <span className="text-fifa-gold font-display font-bold">${costMxn} MXN</span>
                </div>
                <div className="flex items-center justify-between text-sm pt-2 border-t border-white/5">
                  <span className="text-muted-foreground font-bold">Licencia Platform:</span>
                  <span className="text-fifa-white font-display font-bold">${plans.find(p => p.id === planName)?.price} MXN</span>
                </div>
              </div>

              <div className="bg-white/5 rounded-2xl p-4 flex items-center gap-3">
                 <Calendar className="w-5 h-5 text-muted-foreground" />
                 <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-widest leading-tight">
                    Cierre de registros: 1 día antes del partido inaugural.
                 </span>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full py-8 bg-fifa-gold hover:bg-gold-light text-navy-dark font-display font-black text-lg uppercase tracking-[0.1em] rounded-2xl shadow-[0_10px_30px_rgba(212,175,55,0.15)] group relative overflow-hidden"
              >
                {isLoading ? (
                  <div className="w-6 h-6 border-2 border-navy-dark border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    CREAR TORNEO
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" />
                  </>
                )}
              </Button>
              
              <p className="text-[10px] text-center text-muted-foreground italic">
                Al crear este torneo, te conviertes en el administrador y responsable de promoverlo.
              </p>
            </div>
          </Card>
        </div>

      </form>
    </div>
  )
}
