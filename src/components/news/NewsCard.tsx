import { motion } from 'framer-motion'
import { Calendar, User, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { NewsArticle } from '@/hooks/useNews'

interface NewsCardProps {
  article: NewsArticle
}

export function NewsCard({ article }: NewsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative bg-navy-light/50 border border-white/5 rounded-2xl overflow-hidden hover:bg-navy-light/80 transition-all duration-300"
    >
      <Link to={`/noticias/${article.slug}`} className="block">
        <div className="aspect-video w-full overflow-hidden relative">
          <img
            src={article.image_url || `https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=800&auto=format&fit=crop`}
            alt={article.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          {article.is_featured && (
            <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-fifa-gold text-navy-dark text-xs font-bold rounded-full uppercase">
              Destacado
            </div>
          )}
          <div className="absolute top-4 right-4 z-10 px-2 py-1 bg-navy-dark/80 backdrop-blur-md text-[10px] text-fifa-white font-medium rounded border border-white/10 uppercase">
            {article.category}
          </div>
        </div>

        <div className="p-5 space-y-3">
          <div className="flex items-center gap-4 text-xs text-muted-foreground font-medium uppercase tracking-wider">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-fifa-gold" />
              {format(new Date(article.published_at), 'dd MMM yyyy', { locale: es })}
            </span>
            <span className="flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-fifa-gold" />
              {article.author}
            </span>
          </div>

          <h3 className="text-xl font-display text-fifa-white leading-tight group-hover:text-fifa-gold transition-colors line-clamp-2">
            {article.title}
          </h3>

          <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
            {article.summary}
          </p>

          <div className="pt-2 flex items-center gap-2 text-fifa-gold font-medium text-sm">
            Leer más <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
