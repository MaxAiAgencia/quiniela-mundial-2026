import { useState } from 'react'
import { DateStrip } from '@/components/calendar/DateStrip'
import { MatchCard } from '@/components/match/MatchCard'
import { useMatches } from '@/hooks/useMatches'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'

export default function CalendarioPage() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date(2026, 5, 11))

  // Calculamos el rango del día en CDMX pero expresado en UTC para la base de datos
  // CDMX es UTC-6. Entonces el día empieza a las 06:00 UTC.
  const dateStr = format(selectedDate, 'yyyy-MM-dd')
  
  // Usamos el hook useMatches con el filtro de fecha simple por ahora
  // (En producción, ajustaríamos el hook para manejar offsets de zona horaria)
  const { data: matches, isLoading, error } = useMatches({ date: dateStr })

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Sticky Header with DateStrip */}
      <div className="sticky top-0 z-20 bg-background/95 backdrop-blur-md border-b">
        <div className="p-4 md:p-8 pb-2 max-w-7xl mx-auto space-y-4">
          <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
             <div className="space-y-1">
                <div className="flex items-center gap-2">
                   <div className="h-6 w-1 bg-fifa-gold rounded-full" />
                   <h1 className="text-3xl font-black uppercase tracking-tighter">Calendario</h1>
                </div>
                <p className="text-muted-foreground text-xs font-bold uppercase tracking-widest pl-3">
                   {format(selectedDate, "EEEE d 'de' MMMM", { locale: es })}
                </p>
             </div>
             
             <div className="flex items-center gap-4 text-[10px] font-black uppercase text-muted-foreground/60">
                <div className="flex items-center gap-1.5">
                   <span className="w-2 h-2 rounded-full bg-primary" /> Hoy
                </div>
                <div className="flex items-center gap-1.5">
                   <span className="w-2 h-2 rounded-full bg-muted" /> Pasado
                </div>
             </div>
          </header>
        </div>
        
        <DateStrip 
          selectedDate={selectedDate} 
          onDateChange={setSelectedDate}
        />
      </div>

      <main className="flex-1 p-4 md:p-8 max-w-4xl mx-auto w-full">
         {isLoading ? (
           <div className="space-y-6 pt-8">
              {[1, 2, 3].map(i => (
                <div key={i} className="space-y-3">
                  <div className="h-4 w-24 bg-muted rounded animate-pulse" />
                  <div className="h-32 w-full bg-muted rounded-2xl animate-pulse" />
                </div>
              ))}
           </div>
         ) : error ? (
           <div className="py-20 text-center text-destructive">
              <p className="font-black uppercase italic">Error al cargar el calendario</p>
           </div>
         ) : matches && matches.length > 0 ? (
           <div className="space-y-12 py-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="space-y-4">
                 {matches.map((match) => (
                   <MatchCard 
                     key={match.id} 
                     match={match} 
                     variant="default"
                     className="shadow-md hover:shadow-xl transition-shadow"
                   />
                 ))}
              </div>
           </div>
         ) : (
           <div className="py-24 flex flex-col items-center text-center space-y-6">
              <div className="w-24 h-24 rounded-full bg-muted/30 flex items-center justify-center grayscale opacity-50">
                 <span className="text-4xl text-primary transform -rotate-12">⚽</span>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-black uppercase text-muted-foreground/40 italic">Día de Descanso</h3>
                <p className="text-xs text-muted-foreground max-w-xs mx-auto font-medium">
                  No hay partidos programados para el {format(selectedDate, "d 'de' MMMM", { locale: es })}.
                  ¡Aprovecha para revisar tu Quiniela!
                </p>
              </div>
           </div>
         )}
      </main>
      
      {/* Footer Info */}
      <footer className="p-8 text-center text-[10px] text-muted-foreground/40 uppercase tracking-[0.2em] font-black border-t">
        FIFA WORLD CUP 2026 — UNITED 2026
      </footer>
    </div>
  )
}
