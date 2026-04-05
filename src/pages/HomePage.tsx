import { motion } from 'framer-motion'
import { Trophy, Calendar, Users, TrendingUp, ArrowRight, ShieldCheck } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useMatches } from '@/hooks/useMatches'
import { useNews } from '@/hooks/useNews'
import { MatchCard } from '@/components/match/MatchCard'
import { NewsCard } from '@/components/news/NewsCard'

export default function HomePage() {
  const { data: matches } = useMatches()
  const { data: news } = useNews()

  // Get next 3 upcoming matches
  const nextMatches = matches?.filter(m => m.status === 'scheduled')
    .slice(0, 3) || []

  // Get 3 featured news
  const featuredNews = news?.slice(0, 3) || []

  return (
    <div className="pb-24 lg:pb-12">
      {/* ── HERO SECTION ── */}
      <section className="relative overflow-hidden bg-navy-dark pt-12 pb-20 px-4 md:px-8">
        {/* Background Accents */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-fifa-gold/10 to-transparent pointer-events-none" />
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-fifa-gold/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }} 
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-fifa-gold/10 border border-fifa-gold/20 rounded-full text-fifa-gold text-xs font-bold uppercase tracking-widest">
              <Trophy className="w-3.5 h-3.5" />
              Official 2026 Companion
            </div>
            <h1 className="font-display text-5xl md:text-7xl text-fifa-white leading-[1.1] uppercase italic tracking-tighter">
              Tu Pasión, <br />
              Nuestra <span className="text-transparent bg-clip-text bg-gradient-to-r from-fifa-gold to-gold-light">Quiniela</span>
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl max-w-lg leading-relaxed">
              Vive el Mundial 2026 como nunca antes. Pronostica, compite con amigos y demuestra quién sabe más de fútbol en la plataforma más completa.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Link
                to="/quiniela"
                className="px-8 py-4 bg-fifa-gold hover:bg-gold-light text-navy-dark font-display font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:scale-105"
              >
                UNIRSE AHORA
              </Link>
              <Link
                to="/calendario"
                className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-fifa-white font-display font-bold rounded-xl transition-all"
              >
                CALENDARIO
              </Link>
            </div>
          </motion.div>

          {/* Hero Stats/Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="hidden lg:grid grid-cols-2 gap-4"
          >
            <div className="space-y-4 pt-12">
              <div className="p-6 bg-navy-light/40 backdrop-blur-xl border border-white/5 rounded-3xl group hover:border-fifa-gold/30 transition-colors">
                <Users className="w-8 h-8 text-fifa-gold mb-4" />
                <div className="text-3xl font-display text-fifa-white">104</div>
                <div className="text-xs text-muted-foreground uppercase tracking-widest">Partidos Totales</div>
              </div>
              <div className="p-6 bg-navy-light/40 backdrop-blur-xl border border-white/5 rounded-3xl group hover:border-fifa-gold/30 transition-colors">
                <TrendingUp className="w-8 h-8 text-fifa-gold mb-4" />
                <div className="text-3xl font-display text-fifa-white">48</div>
                <div className="text-xs text-muted-foreground uppercase tracking-widest">Selecciones</div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="p-6 bg-navy-light/40 backdrop-blur-xl border border-white/5 rounded-3xl group hover:border-fifa-gold/30 transition-colors">
                <Trophy className="w-8 h-8 text-fifa-gold mb-4" />
                <div className="text-3xl font-display text-fifa-white">Top 1%</div>
                <div className="text-xs text-muted-foreground uppercase tracking-widest">Premios Mayores</div>
              </div>
              <div className="p-6 bg-navy-light/40 backdrop-blur-xl border border-white/5 rounded-3xl group hover:border-fifa-gold/30 transition-colors">
                <ShieldCheck className="w-8 h-8 text-fifa-gold mb-4" />
                <div className="text-3xl font-display text-fifa-white">100%</div>
                <div className="text-xs text-muted-foreground uppercase tracking-widest">Seguro y Real</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── CONTENT SECTION ── */}
      <div className="max-w-6xl mx-auto px-4 md:px-8 -mt-10 space-y-16">
        
        {/* Next Matches */}
        <section className="space-y-6">
          <div className="flex items-end justify-between">
            <div className="space-y-1">
              <h2 className="font-display text-2xl text-fifa-white uppercase tracking-wider">Próximos Partidos</h2>
              <p className="text-sm text-muted-foreground">La acción no se detiene</p>
            </div>
            <Link to="/calendario" className="text-fifa-gold text-sm font-bold flex items-center gap-2 group">
              VER CALENDARIO COMPLETO <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {nextMatches.map(match => (
              <MatchCard key={match.id} match={match} />
            ))}
          </div>
        </section>

        {/* Featured News */}
        <section className="space-y-6">
          <div className="flex items-end justify-between">
            <div className="space-y-1">
              <h2 className="font-display text-2xl text-fifa-white uppercase tracking-wider">Últimas Noticias</h2>
              <p className="text-sm text-muted-foreground">Lo que pasa en el mundo FIFA</p>
            </div>
            <Link to="/noticias" className="text-fifa-gold text-sm font-bold flex items-center gap-2 group">
              VER TODAS <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredNews.map(article => (
              <NewsCard key={article.id} article={article} />
            ))}
          </div>
        </section>

        {/* Call to Action Banner */}
        <motion.section 
          whileHover={{ scale: 1.01 }}
          className="relative rounded-3xl p-8 overflow-hidden bg-gradient-to-r from-fifa-navy to-navy-dark border border-fifa-gold/20 shadow-2xl"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-fifa-gold/10 rounded-full blur-[80px] -mr-32 -mt-32" />
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-2">
              <h3 className="font-display text-3xl text-fifa-white uppercase italic">¿Listo para hacer tus pronósticos?</h3>
              <p className="text-muted-foreground">Crea tu propia quiniela y compite con amigos por el premio mayor.</p>
            </div>
            <Link 
              to="/quiniela/nueva"
              className="px-10 py-4 bg-fifa-gold hover:bg-gold-light text-navy-dark font-display font-bold rounded-xl transition-all whitespace-nowrap active:scale-95"
            >
              CREAR QUINIELA
            </Link>
          </div>
        </motion.section>

      </div>
    </div>
  )
}
