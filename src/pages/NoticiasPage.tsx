import { motion } from 'framer-motion'
import { Info, Newspaper } from 'lucide-react'
import { useNews } from '@/hooks/useNews'
import { NewsCard } from '@/components/news/NewsCard'

export default function NoticiasPage() {
  const { data: articles, isLoading, error } = useNews()

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-10 h-10 border-2 border-fifa-gold border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (error || !articles) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <Info className="w-12 h-12 text-fifa-red" />
        <p className="text-muted-foreground font-display text-xl">Error al cargar las noticias</p>
      </div>
    )
  }

  const featured = articles.filter(a => a.is_featured)
  const others = articles.filter(a => !a.is_featured)

  return (
    <div className="p-4 md:p-8 space-y-12 pb-24 lg:pb-8">
      {/* Header section */}
      <header className="space-y-4 max-w-3xl">
        <div className="flex items-center gap-3">
          <Newspaper className="w-8 h-8 text-fifa-gold" />
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="font-display text-4xl md:text-5xl text-fifa-white uppercase tracking-tight"
          >
            NOTICIAS Y <span className="text-transparent bg-clip-text bg-gradient-to-r from-fifa-gold to-gold-light">REPORTAJES</span>
          </motion.h1>
        </div>
        <motion.p 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="text-muted-foreground text-lg italic"
        >
          Sigue minuto a minuto toda la información relevante sobre el sorteo, preparación y desarrollo de la Copa Mundial 2026.
        </motion.p>
      </header>

      {/* Featured News Section */}
      {featured.length > 0 && (
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <h2 className="font-display text-2xl text-fifa-white uppercase tracking-wider">Destacados</h2>
            <div className="h-px flex-1 bg-gradient-to-r from-fifa-gold/30 to-transparent" />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {featured.map(article => (
              <NewsCard key={article.id} article={article} />
            ))}
          </div>
        </section>
      )}

      {/* Other News Section */}
      {others.length > 0 && (
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <h2 className="font-display text-2xl text-fifa-white uppercase tracking-wider">Últimas Noticias</h2>
            <div className="h-px flex-1 bg-gradient-to-r from-fifa-gold/30 to-transparent" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {others.map(article => (
              <NewsCard key={article.id} article={article} />
            ))}
          </div>
        </section>
      )}

      {articles.length === 0 && (
        <div className="text-center py-20 bg-navy-light/20 rounded-3xl border border-white/5 border-dashed">
          <Newspaper className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
          <p className="text-muted-foreground text-lg">No hay noticias publicadas por el momento.</p>
        </div>
      )}
    </div>
  )
}
