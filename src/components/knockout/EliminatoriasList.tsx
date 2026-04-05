import React, { useState } from 'react'
import { useMatches } from '@/hooks/useMatches'
import { MatchCard } from '@/components/match/MatchCard'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { MatchPhase } from '@/types'
import { cn } from '@/lib/utils'

const fases: { id: MatchPhase; label: string }[] = [
  { id: 'round_of_32', label: '16vos' },
  { id: 'round_of_16', label: '8vos' },
  { id: 'quarterfinal', label: '4tos' },
  { id: 'semifinal', label: 'Semis' },
  { id: 'final', label: 'Final' },
]

export const EliminatoriasList: React.FC = () => {
  const [activePhase, setActivePhase] = useState<MatchPhase>('round_of_32')
  
  // Obtenemos todos los partidos de la fase seleccionada
  const { data: matches, isLoading } = useMatches({ phase: activePhase })

  return (
    <div className="w-full space-y-8 pb-20">
      <Tabs 
        defaultValue="round_of_32" 
        onValueChange={(v) => setActivePhase(v as MatchPhase)}
        className="w-full"
      >
        <div className="sticky top-[72px] z-10 bg-background/80 backdrop-blur-md py-4 -mx-4 px-4 border-b">
          <TabsList className="w-full justify-start overflow-x-auto no-scrollbar bg-transparent h-auto p-0 gap-2">
            {fases.map((f) => (
              <TabsTrigger
                key={f.id}
                value={f.id}
                className={cn(
                  "px-6 py-2.5 rounded-full border-2 transition-all font-black uppercase text-xs tracking-widest",
                  "data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:border-primary",
                  "data-[state=inactive]:bg-muted/10 data-[state=inactive]:text-muted-foreground/60 data-[state=inactive]:border-transparent"
                )}
              >
                {f.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {fases.map((f) => (
          <TabsContent key={f.id} value={f.id} className="mt-8">
            {isLoading ? (
              <div className="grid gap-4 md:grid-cols-2">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="h-32 bg-muted rounded-xl animate-pulse" />
                ))}
              </div>
            ) : matches && matches.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2 animate-in fade-in slide-in-from-bottom-4 duration-500">
                {matches.map((match) => (
                  <MatchCard key={match.id} match={match} />
                ))}
              </div>
            ) : (
              <div className="py-20 text-center space-y-4">
                <div className="text-4xl grayscale opacity-20">🏆</div>
                <p className="text-muted-foreground font-black uppercase tracking-tighter italic">
                  Partidos no disponibles aún
                </p>
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
