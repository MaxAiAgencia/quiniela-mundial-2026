import { motion } from 'framer-motion'
import { Info } from 'lucide-react'
import { useVenues } from '@/hooks/useVenues'
import { VenueCard } from '@/components/venue/VenueCard'

export default function SedesPage() {
  const { data: venues, isLoading, error } = useVenues()

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-10 h-10 border-2 border-fifa-gold border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <Info className="w-12 h-12 text-fifa-red" />
        <p className="text-muted-foreground font-display text-xl">Error al cargar las sedes</p>
      </div>
    )
  }

  const countries = {
    MEX: venues?.filter(v => v.country === 'MEX') || [],
    USA: venues?.filter(v => v.country === 'USA') || [],
    CAN: venues?.filter(v => v.country === 'CAN') || [],
  }

  return (
    <div className="p-4 md:p-8 space-y-12 pb-24 lg:pb-8">
      {/* Header section */}
      <header className="space-y-4 max-w-3xl">
        <motion.h1 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="font-display text-4xl md:text-5xl text-fifa-white uppercase tracking-tight"
        >
          Sedes del <span className="text-transparent bg-clip-text bg-gradient-to-r from-fifa-gold to-gold-light">Mundial 2026</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="text-muted-foreground text-lg"
        >
          Conoce los 16 estadios legendarios que albergarán la Copa del Mundo más grande de la historia en México, Estados Unidos y Canadá.
        </motion.p>
      </header>

      {/* Mexico Section */}
      {countries.MEX.length > 0 && (
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🇲🇽</span>
            <h2 className="font-display text-2xl text-fifa-white uppercase tracking-wider">México</h2>
            <div className="h-px flex-1 bg-gradient-to-r from-fifa-gold/30 to-transparent" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {countries.MEX.map(venue => (
              <VenueCard key={venue.id} venue={venue} />
            ))}
          </div>
        </section>
      )}

      {/* USA Section */}
      {countries.USA.length > 0 && (
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🇺🇸</span>
            <h2 className="font-display text-2xl text-fifa-white uppercase tracking-wider">Estados Unidos</h2>
            <div className="h-px flex-1 bg-gradient-to-r from-fifa-gold/30 to-transparent" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {countries.USA.map(venue => (
              <VenueCard key={venue.id} venue={venue} />
            ))}
          </div>
        </section>
      )}

      {/* Canada Section */}
      {countries.CAN.length > 0 && (
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🇨🇦</span>
            <h2 className="font-display text-2xl text-fifa-white uppercase tracking-wider">Canadá</h2>
            <div className="h-px flex-1 bg-gradient-to-r from-fifa-gold/30 to-transparent" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {countries.CAN.map(venue => (
              <VenueCard key={venue.id} venue={venue} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
