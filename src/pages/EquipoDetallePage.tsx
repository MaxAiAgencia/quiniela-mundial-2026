import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Trophy, Users, Star, Calendar, ChevronLeft, MapPin } from 'lucide-react'
import { useTeamDetail } from '@/hooks/useTeamDetail'
import { getFlagUrl } from '@/lib/flags'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'

export default function EquipoDetallePage() {
  const { slug } = useParams<{ slug: string }>()
  const { data, isLoading, error } = useTeamDetail(slug || '')

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-10 h-10 border-2 border-fifa-gold border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <Trophy className="w-12 h-12 text-fifa-red" />
        <p className="text-muted-foreground font-display text-xl">Equipo no encontrado</p>
        <Link to="/equipos" className="text-fifa-gold hover:underline">Volver a equipos</Link>
      </div>
    )
  }

  const { team, players, matches } = data

  return (
    <div className="pb-24 lg:pb-12">
      {/* ── HEADER DE EQUIPO ── */}
      <section 
        className="relative pt-8 pb-16 px-4 md:px-8 border-b border-white/5"
        style={{ background: `linear-gradient(to bottom, ${team.primary_color}44, transparent)` }}
      >
        <div className="max-w-6xl mx-auto space-y-6">
          <Link to="/equipos" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-fifa-gold transition-colors">
            <ChevronLeft className="w-4 h-4" />
            VOLVER A EQUIPOS
          </Link>

          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            {/* Flag/Shield Large */}
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="relative w-48 h-32 md:w-64 md:h-40 rounded-3xl overflow-hidden shadow-2xl border-4 border-white/10"
            >
              <img 
                src={getFlagUrl(team.country_code)} 
                alt={team.name}
                className="w-full h-full object-cover"
              />
            </motion.div>

            <div className="text-center md:text-left space-y-4">
              <div className="space-y-1">
                <span className="text-fifa-gold font-display text-sm uppercase tracking-[0.2em]">
                  {team.confederation} — GRUPO {team.group_id}
                </span>
                <h1 className="font-display text-5xl md:text-7xl text-fifa-white uppercase italic tracking-tighter">
                  {team.name}
                </h1>
              </div>

              <div className="flex flex-wrap justify-center md:justify-start gap-6 pt-2">
                <div className="flex flex-col">
                  <span className="text-[10px] text-muted-foreground uppercase tracking-widest">Ranking FIFA</span>
                  <span className="text-xl font-display text-fifa-white">#{team.fifa_ranking || '—'}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-muted-foreground uppercase tracking-widest">Copas Mundialistas</span>
                  <span className="text-xl font-display text-fifa-gold italic">{team.world_cups} ⭐</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-muted-foreground uppercase tracking-widest">Director Técnico</span>
                  <span className="text-xl font-display text-fifa-white">{team.coach || 'Por confirmar'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTENIDO ── */}
      <div className="max-w-6xl mx-auto px-4 md:px-8 mt-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        {/* Lado Izquierdo: Plantilla */}
        <div className="lg:col-span-2 space-y-8">
          <div className="flex items-center justify-between border-b border-white/5 pb-4">
            <h2 className="font-display text-2xl text-fifa-white uppercase flex items-center gap-3">
              <Users className="w-6 h-6 text-fifa-gold" />
              Plantilla <span className="text-muted-foreground text-sm">({players.length})</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {players.length > 0 ? (
              players.map((player) => (
                <motion.div 
                  key={player.id}
                  whileHover={{ x: 5 }}
                  className="p-4 bg-navy-light/30 border border-white/5 rounded-xl flex items-center gap-4 group hover:bg-navy-light/50 transition-colors"
                >
                  <div className="w-10 h-10 flex items-center justify-center bg-navy-dark border border-white/10 rounded-lg text-fifa-gold font-display text-xl">
                    {player.jersey_number || '•'}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-display text-fifa-white">{player.name}</span>
                      {player.is_captain && <Star className="w-3 h-3 text-fifa-gold fill-fifa-gold" />}
                    </div>
                    <div className="text-[10px] text-muted-foreground uppercase tracking-wider">
                      {player.position} — {player.club || 'Libre'}
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <p className="text-muted-foreground italic lg:col-span-2 py-8 text-center bg-white/5 rounded-2xl border border-dashed border-white/10">
                La lista oficial de convocados aún no ha sido cargada por la federación.
              </p>
            )}
          </div>
        </div>

        {/* Lado Derecho: Calendario de Equipo */}
        <div className="space-y-8">
          <h2 className="font-display text-2xl text-fifa-white uppercase flex items-center gap-3 border-b border-white/5 pb-4">
            <Calendar className="w-6 h-6 text-fifa-gold" />
            Calendario
          </h2>

          <div className="space-y-4">
            {matches.length > 0 ? (
              matches.map((match) => (
                <div 
                  key={match.id}
                  className="p-4 bg-navy-dark/50 border border-white/5 rounded-2xl space-y-3"
                >
                  <div className="flex items-center justify-between text-[10px] text-muted-foreground font-bold uppercase tracking-widest">
                    <span>{match.phase === 'group' ? `Grupo ${match.group_id}` : match.phase}</span>
                    <span>{format(new Date(match.scheduled_at), 'dd MMM', { locale: es })}</span>
                  </div>
                  
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2 flex-1 justify-end">
                      <span className="text-xs font-medium text-fifa-white truncate">{match.home_team?.name}</span>
                      <img src={getFlagUrl(match.home_team?.country_code || '')} className="w-6 h-4 object-cover rounded-sm" />
                    </div>
                    <span className="p-1 px-2 bg-navy-light rounded text-[10px] text-fifa-gold font-bold">VS</span>
                    <div className="flex items-center gap-2 flex-1">
                      <img src={getFlagUrl(match.away_team?.country_code || '')} className="w-6 h-4 object-cover rounded-sm" />
                      <span className="text-xs font-medium text-fifa-white truncate">{match.away_team?.name}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-2 border-t border-white/5 text-[10px] text-muted-foreground">
                    <MapPin className="w-3 h-3 text-fifa-gold" />
                    <span className="truncate">{match.venue?.name}, {match.venue?.city}</span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-muted-foreground text-sm italic">No hay partidos programados para este equipo.</p>
            )}
          </div>
        </div>

      </div>
    </div>
  )
}
