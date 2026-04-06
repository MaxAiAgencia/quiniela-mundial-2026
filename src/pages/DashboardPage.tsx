import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useUserDashboard, useAvailableQuinielas, UserParticipation } from '@/hooks/useUserDashboard'
import { useAuthStore } from '@/stores/authStore'
import { supabase } from '@/lib/supabase'
import { toast } from 'sonner'
import { 
  Trophy, 
  ChevronRight, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  PlusCircle,
  TrendingUp,
  Award,
  KeyRound,
  Eye,
  EyeOff,
  Loader2,
  Shield
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Card, CardHeader, CardTitle, CardContent, Badge } from '@/components/ui'
import { Quiniela } from '@/types'

export default function DashboardPage() {
  const { user, profile } = useAuthStore()
  const { data: myQuinielas, isLoading: loadingMy } = useUserDashboard()
  const { data: available, isLoading: loadingAvail } = useAvailableQuinielas()

  // Password change state
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [changingPass, setChangingPass] = useState(false)

  const userName = (profile as any)?.display_name || user?.user_metadata?.display_name || user?.email?.split('@')[0] || 'Jugador'
  const isAdmin = (profile as any)?.is_admin === true

  // Quinielas que el usuario creó (como organizador)
  const myCreatedQuinielas = myQuinielas?.filter(
    (p: UserParticipation) => p.quiniela.admin_id === user?.id
  ) || []

  // Quinielas donde participó pero no es organizador
  const myParticipations = myQuinielas?.filter(
    (p: UserParticipation) => p.quiniela.admin_id !== user?.id
  ) || []

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault()
    if (newPassword.length < 6) {
      toast.error('La contraseña debe tener al menos 6 caracteres.')
      return
    }
    if (newPassword !== confirmPassword) {
      toast.error('Las contraseñas no coinciden.')
      return
    }
    setChangingPass(true)
    try {
      const { error } = await supabase.auth.updateUser({ password: newPassword })
      if (error) throw error
      toast.success('¡Contraseña actualizada correctamente!')
      setNewPassword('')
      setConfirmPassword('')
    } catch (err: any) {
      toast.error(err.message || 'Error al cambiar la contraseña')
    } finally {
      setChangingPass(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 py-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h1 className="text-3xl font-black uppercase tracking-tighter text-slate-900">
                  ¡Hola, {userName}! 👋
                </h1>
                {isAdmin && (
                  <span className="flex items-center gap-1 px-2 py-0.5 bg-indigo-100 text-indigo-700 text-[10px] font-black uppercase tracking-widest rounded-full border border-indigo-200">
                    <Shield className="w-3 h-3" /> Admin
                  </span>
                )}
              </div>
              <p className="text-slate-500 font-medium italic text-sm">
                Bienvenido a tu panel de control — Quiniela Mundial 2026
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="p-4 bg-indigo-50 rounded-2xl border border-indigo-100 flex items-center gap-3">
                <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase text-indigo-400 tracking-widest leading-none mb-1">Puntos Totales</p>
                  <p className="text-xl font-black text-indigo-900 leading-none">
                    {myQuinielas?.reduce((acc: number, curr: UserParticipation) => acc + (curr.total_points || 0), 0) || 0}
                  </p>
                </div>
              </div>
              <Link
                to="/quiniela/nueva"
                className="flex items-center gap-2 px-5 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-black uppercase text-xs tracking-widest transition-colors shadow-lg shadow-indigo-200"
              >
                <PlusCircle className="w-4 h-4" /> Crear Quiniela
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10 space-y-14">

        {/* ── MIS QUINIELAS CREADAS ── */}
        {(myCreatedQuinielas.length > 0 || isAdmin) && (
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-black uppercase tracking-tight text-slate-900 flex items-center gap-2">
                <Trophy className="w-6 h-6 text-yellow-500" />
                Mis Quinielas Creadas
              </h2>
              <Link
                to="/quiniela/nueva"
                className="flex items-center gap-2 text-xs font-black text-indigo-600 hover:text-indigo-700 uppercase tracking-widest"
              >
                <PlusCircle className="w-4 h-4" /> Nueva
              </Link>
            </div>

            {loadingMy ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2].map(i => <div key={i} className="h-36 bg-slate-200 animate-pulse rounded-[32px]" />)}
              </div>
            ) : myCreatedQuinielas.length === 0 ? (
              <div className="p-10 text-center bg-white rounded-[40px] border-2 border-dashed border-yellow-200">
                <Trophy className="w-10 h-10 text-yellow-200 mx-auto mb-3" />
                <p className="text-sm text-slate-500 italic">Aún no has creado ninguna quiniela. ¡Empieza ya!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {myCreatedQuinielas.map((p: UserParticipation) => (
                  <Link key={p.quiniela.id} to={`/quiniela/${p.quiniela.id}`}>
                    <div className="h-full p-6 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-[32px] text-yellow-950 hover:scale-105 transition-transform cursor-pointer relative overflow-hidden shadow-lg shadow-yellow-200">
                      <div className="relative z-10 space-y-3">
                        <div className="text-[10px] font-black uppercase tracking-widest opacity-70">Organizador</div>
                        <h4 className="text-xl font-black uppercase tracking-tighter leading-tight">{p.quiniela.name}</h4>
                        <div className="flex items-center justify-between pt-3 border-t border-yellow-600/20">
                          <div className="text-sm font-black">${p.quiniela.cost_mxn} MXN</div>
                          <ChevronRight className="w-5 h-5" />
                        </div>
                      </div>
                      <Trophy className="absolute -bottom-4 -right-4 w-24 h-24 text-yellow-600/20 rotate-12" />
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </section>
        )}

        {/* ── MIS PARTICIPACIONES ── */}
        <section className="space-y-6">
          <h2 className="text-xl font-black uppercase tracking-tight text-slate-900 flex items-center gap-2">
            <Award className="w-6 h-6 text-indigo-600" />
            Mis Participaciones
          </h2>

          {loadingMy ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2].map(i => <div key={i} className="h-48 bg-slate-200 animate-pulse rounded-[32px]" />)}
            </div>
          ) : myParticipations.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-[40px] border-2 border-dashed border-slate-200">
              <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trophy className="w-8 h-8 text-slate-300" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 uppercase">Aún no participas en ninguna quiniela</h3>
              <p className="text-sm text-slate-500 mt-2 max-w-xs mx-auto italic">¡Únete a un torneo disponible abajo y empieza a ganar!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {myParticipations.map((p: UserParticipation) => (
                <Link key={p.quiniela.id} to={`/quiniela/${p.quiniela.id}`}>
                  <Card className="h-full hover:shadow-xl hover:border-indigo-200 transition-all cursor-pointer rounded-[32px] overflow-hidden group border-2 border-slate-100">
                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between mb-2">
                        <Badge variant={p.paid ? "default" : "secondary"} className={cn(
                          "uppercase text-[10px] font-black tracking-widest px-3",
                          p.paid ? "bg-green-100 text-green-700 hover:bg-green-100" : (p.payment_proof_url ? "bg-amber-100 text-amber-700 hover:bg-amber-100" : "bg-slate-100 text-slate-500 hover:bg-slate-100")
                        )}>
                          {p.paid ? (
                            <span className="flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> Activo</span>
                          ) : (
                            p.payment_proof_url ? (
                              <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> Validando</span>
                            ) : (
                              <span className="flex items-center gap-1"><AlertCircle className="w-3 h-3" /> Pago Pendiente</span>
                            )
                          )}
                        </Badge>
                        <div className="text-xs font-black text-slate-300 group-hover:text-indigo-400 transition-colors uppercase">
                          #{p.rank || '-'} Ranking
                        </div>
                      </div>
                      <CardTitle className="text-xl font-black uppercase tracking-tighter leading-tight group-hover:text-indigo-600 transition-colors">
                        {p.quiniela.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                        <div className="space-y-0.5">
                          <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest leading-none">Puntos Totales</p>
                          <p className="text-lg font-black text-slate-900 leading-none">{p.total_points || 0}</p>
                        </div>
                        <Award className={cn("w-8 h-8 opacity-20", p.rank === 1 ? "text-yellow-500" : "text-indigo-500")} />
                      </div>
                      <div className="flex items-center justify-end text-xs font-black uppercase tracking-widest text-indigo-600 group-hover:translate-x-2 transition-transform">
                        Ver detalles <ChevronRight className="w-4 h-4" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </section>

        {/* ── TORNEOS DISPONIBLES ── */}
        <section className="space-y-6 pt-8 border-t border-slate-200">
          <div className="space-y-1">
            <h2 className="text-xl font-black uppercase tracking-tight text-slate-900 flex items-center gap-2">
              <PlusCircle className="w-6 h-6 text-green-600" />
              Torneos Disponibles
            </h2>
            <p className="text-xs font-medium text-slate-500 italic">No te quedes fuera, ¡únete a nuevos desafíos!</p>
          </div>

          {loadingAvail ? (
            <div className="h-32 bg-slate-100 animate-pulse rounded-[32px]" />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {available?.filter((q: Quiniela) => !myQuinielas?.find((m: UserParticipation) => m.quiniela.id === q.id)).map((q: Quiniela) => (
                <Link key={q.id} to={`/quiniela/${q.id}`}>
                  <div className="h-full p-6 bg-indigo-600 rounded-[32px] text-white hover:bg-indigo-700 transition-colors group cursor-pointer relative overflow-hidden">
                    <div className="relative z-10 space-y-4">
                      <h4 className="text-lg font-black uppercase tracking-tighter leading-tight">{q.name}</h4>
                      <p className="text-indigo-100 text-xs font-medium line-clamp-2 italic opacity-80">{q.description || '¡Únete ahora!'}</p>
                      <div className="flex items-center justify-between pt-4">
                        <div className="text-xl font-black">${q.cost_mxn}</div>
                        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center group-hover:scale-125 transition-transform">
                          <ChevronRight className="w-5 h-5 text-white" />
                        </div>
                      </div>
                    </div>
                    <Trophy className="absolute -bottom-4 -right-4 w-24 h-24 text-white/10 rotate-12" />
                  </div>
                </Link>
              ))}
              {available?.filter((q: Quiniela) => !myQuinielas?.find((m: UserParticipation) => m.quiniela.id === q.id)).length === 0 && (
                <div className="col-span-full p-10 text-center text-slate-400 italic text-sm bg-white rounded-[32px] border-2 border-dashed border-slate-200">
                  No hay torneos disponibles en este momento.
                </div>
              )}
            </div>
          )}
        </section>

        {/* ── CAMBIO DE CONTRASEÑA ── */}
        <section className="space-y-6 pt-8 border-t border-slate-200">
          <div className="space-y-1">
            <h2 className="text-xl font-black uppercase tracking-tight text-slate-900 flex items-center gap-2">
              <KeyRound className="w-6 h-6 text-slate-600" />
              Seguridad de la Cuenta
            </h2>
            <p className="text-xs font-medium text-slate-500 italic">Cambia tu contraseña para mantener tu cuenta segura.</p>
          </div>

          <form onSubmit={handleChangePassword} className="bg-white rounded-[32px] border-2 border-slate-100 p-8 max-w-md space-y-5">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Nueva Contraseña</label>
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'}
                  value={newPassword}
                  onChange={e => setNewPassword(e.target.value)}
                  placeholder="Mínimo 6 caracteres"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-800 focus:outline-none focus:border-indigo-400 pr-12"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPass(v => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                >
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Confirmar Contraseña</label>
              <input
                type={showPass ? 'text' : 'password'}
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                placeholder="Repite la contraseña"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-800 focus:outline-none focus:border-indigo-400"
                required
              />
            </div>

            <button
              type="submit"
              disabled={changingPass}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-slate-900 hover:bg-slate-700 text-white rounded-xl font-black uppercase text-xs tracking-widest transition-colors disabled:opacity-50"
            >
              {changingPass ? <Loader2 className="w-4 h-4 animate-spin" /> : <KeyRound className="w-4 h-4" />}
              {changingPass ? 'Actualizando...' : 'Cambiar Contraseña'}
            </button>
          </form>
        </section>

      </div>
    </div>
  )
}
