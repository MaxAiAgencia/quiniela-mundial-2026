import { EliminatoriasList } from '@/components/knockout/EliminatoriasList'

export default function EliminatoriasPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-12">
        {/* Header de Fase Final */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
           <div className="space-y-2">
              <div className="flex items-center gap-2">
                 <div className="h-2 w-10 bg-fifa-gold rounded-full" />
                 <h1 className="text-4xl font-black uppercase tracking-tighter">Eliminatorias</h1>
              </div>
              <p className="text-muted-foreground text-xs font-bold uppercase tracking-widest pl-12 flex items-center gap-2">
                 <span className="w-2 h-2 rounded-full bg-primary" /> El camino a la Gran Final
              </p>
           </div>
           
           <div className="hidden md:flex items-center gap-12 text-[10px] font-black uppercase tracking-widest text-muted-foreground/40 italic">
              <div className="flex flex-col items-center">
                 <span className="text-xl text-primary/30 not-italic">32</span>
                 Equipos
              </div>
              <div className="flex flex-col items-center">
                 <span className="text-xl text-primary/30 not-italic">5</span>
                 Rondas
              </div>
              <div className="flex flex-col items-center">
                 <span className="text-xl text-primary/30 not-italic">1</span>
                 Trofeo
              </div>
           </div>
        </header>

        {/* Componente principal de lista por rondas */}
        <EliminatoriasList />
      </div>
      
      {/* Background decoration elements */}
      <div className="fixed top-0 right-0 w-96 h-96 bg-primary/5 blur-[120px] rounded-full -z-10" />
      <div className="fixed bottom-0 left-0 w-[500px] h-[500px] bg-fifa-gold/5 blur-[150px] rounded-full -z-10" />
    </div>
  )
}
