import { motion } from 'framer-motion'
import { Trophy, Users, Star, ArrowRight, Plus, Info } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useQuinielas } from '@/hooks/useQuinielas'
import { useAuthStore } from '@/stores/authStore'

export default function QuinielaPage() {
  const { data: quinielas, isLoading, error } = useQuinielas()
  const { user } = useAuthStore()

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-10 h-10 border-2 border-fifa-gold border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 text-center p-8">
        <Info className="w-12 h-12 text-fifa-red" />
        <p className="text-muted-foreground font-display text-xl max-w-sm">No pudimos conectar con las quinielas activas.</p>
      </div>
    )
  }

  return (
    <div className="p-4 md:p-8 space-y-12 pb-24 lg:pb-8">
      {/* Header section */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 overflow-hidden">
        <div className="space-y-4 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-fifa-gold/10 border border-fifa-gold/20 rounded-full text-fifa-gold text-[10px] font-bold uppercase tracking-widest">
            🏆 Compite y Gana
          </div>
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="font-display text-4xl md:text-5xl text-fifa-white uppercase tracking-tight"
          >
            QUINIELAS <span className="text-transparent bg-clip-text bg-gradient-to-r from-fifa-gold to-gold-light">ACTIVAS</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground text-lg"
          >
            Únete a una quiniela existente o crea una nueva para jugar con tus amigos y otros aficionados del Mundial.
          </motion.p>
        </div>

        <Link
          to="/quiniela/nueva"
          className="inline-flex items-center gap-2 px-6 py-4 bg-fifa-gold hover:bg-gold-light text-navy-dark font-display font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(212,175,55,0.2)] whitespace-nowrap active:scale-95"
        >
          <Plus className="w-5 h-5" />
          CREAR MI QUINIELA
        </Link>
      </header>

      {/* Grid of Quinielas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {quinielas && quinielas.length > 0 ? (
          quinielas.map((q) => (
            <motion.div
              key={q.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="group relative bg-navy-light/40 border border-white/5 rounded-3xl overflow-hidden hover:bg-navy-light/60 transition-all duration-300 flex flex-col"
            >
              <div className="p-6 flex-1 space-y-6">
                {/* Header Card */}
                <div className="flex justify-between items-start">
                  <div className="p-3 bg-fifa-gold/10 rounded-2xl">
                    <Trophy className="w-6 h-6 text-fifa-gold" />
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">Inscripción</div>
                    <div className="text-xl font-display text-fifa-white">${q.cost_mxn} MXN</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl font-display text-fifa-white group-hover:text-fifa-gold transition-colors truncate">
                    {q.name}
                  </h3>
                  <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                    {q.description || 'Sin descripción detallada por el momento.'}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-navy-dark/40 rounded-xl space-y-1">
                    <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground uppercase tracking-widest">
                      <Users className="w-3 h-3 text-fifa-gold" />
                      Jugadores
                    </div>
                    <div className="text-sm font-display text-fifa-white">
                      {q.participants_count} {q.max_participants ? `/ ${q.max_participants}` : ''}
                    </div>
                  </div>
                  <div className="p-3 bg-navy-dark/40 rounded-xl space-y-1">
                    <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground uppercase tracking-widest">
                      <Star className="w-3 h-3 text-fifa-gold" />
                      Premios
                    </div>
                    <div className="text-sm font-display text-fifa-white uppercase truncate">
                      {q.prize_type.replace(/_/g, ' ')}
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Card */}
              <div className="px-6 py-4 bg-navy-dark/40 border-t border-white/5 flex items-center justify-between">
                <Link
                  to={`/quiniela/${q.id}`}
                  className="flex items-center gap-2 text-xs font-bold text-fifa-white hover:text-fifa-gold transition-colors tracking-widest"
                >
                  VER DETALLES <ArrowRight className="w-4 h-4" />
                </Link>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-fifa-navy border border-white/10 flex items-center justify-center text-[10px]">
                    👤
                  </div>
                  <span className="text-[10px] text-muted-foreground uppercase">{q.admin?.username || 'Admin'}</span>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="col-span-full py-20 text-center space-y-6 bg-navy-light/20 rounded-3xl border border-white/5 border-dashed">
            <Trophy className="w-16 h-16 text-muted-foreground/30 mx-auto" />
            <div className="space-y-2">
              <p className="text-muted-foreground text-xl font-display">No hay quinielas disponibles</p>
              <p className="text-muted-foreground text-sm max-w-sm mx-auto">
                Sé el primero en organizar una competencia oficial para el Mundial 2026.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
