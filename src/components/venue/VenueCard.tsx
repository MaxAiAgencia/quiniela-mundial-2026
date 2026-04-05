import { motion } from 'framer-motion'
import { MapPin, Users, Info } from 'lucide-react'
import { Venue } from '@/hooks/useVenues'

interface VenueCardProps {
  venue: Venue
}

export function VenueCard({ venue }: VenueCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative bg-navy-light/50 border border-white/5 rounded-2xl overflow-hidden hover:bg-navy-light/80 hover:border-fifa-gold/30 transition-all duration-300"
    >
      {/* Stadium Image */}
      <div className="aspect-video w-full overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-t from-navy-dark via-transparent to-transparent z-10" />
        <img
          src={venue.image_url || `https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?q=80&w=800&auto=format&fit=crop`}
          alt={venue.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Badges */}
        <div className="absolute top-4 left-4 z-20 flex gap-2">
          {venue.is_final && (
            <span className="px-2 py-1 bg-fifa-gold text-navy-dark text-[10px] font-bold rounded uppercase tracking-wider">
              Sede de la Final
            </span>
          )}
          {venue.is_inaugural && (
            <span className="px-2 py-1 bg-fifa-red text-white text-[10px] font-bold rounded uppercase tracking-wider">
              Sede Inaugural
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-xl font-display text-fifa-white mb-1 group-hover:text-fifa-gold transition-colors">
          {venue.name}
        </h3>
        
        <div className="flex flex-col gap-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="w-4 h-4 text-fifa-gold" />
            <span>{venue.city}, {venue.country}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Users className="w-4 h-4 text-fifa-gold" />
            <span>Capacidad: {venue.capacity.toLocaleString()}</span>
          </div>
        </div>

        {venue.description && (
          <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
            {venue.description}
          </p>
        )}
      </div>

      {/* Hover visual effect */}
      <div className="absolute inset-0 border-2 border-fifa-gold/0 rounded-2xl group-hover:border-fifa-gold/20 transition-all pointer-events-none" />
    </motion.div>
  )
}
