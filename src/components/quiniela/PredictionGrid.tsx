import React, { useState } from 'react'
import { useMatches } from '@/hooks/useMatches'
import { usePredictions } from '@/hooks/usePredictions'
import { PredictionCard } from './PredictionCard'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui'
import { GroupId } from '@/types'


interface PredictionGridProps {
  quinielaId: string
}

const groups: GroupId[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L']

export const PredictionGrid: React.FC<PredictionGridProps> = ({ quinielaId }) => {
  const [activeGroup, setActiveGroup] = useState<GroupId>('A')
  const { data: matches, isLoading: isLoadingMatches } = useMatches({ group_id: activeGroup })
  const { predictions, savePrediction, isLoading: isLoadingPreds } = usePredictions(quinielaId)

  const isLoading = isLoadingMatches || isLoadingPreds

  return (
    <div className="space-y-8">
      {/* Filtros de Grupo */}
      <Tabs defaultValue="A" onValueChange={(v) => setActiveGroup(v as GroupId)} className="w-full">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-100">
           <div className="space-y-1">
              <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">Fase de Grupos</h3>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Selecciona un grupo para pronosticar</p>
           </div>
           
           <TabsList className="bg-slate-100/50 p-1 rounded-2xl h-auto gap-1 border border-slate-200/50 overflow-x-auto no-scrollbar justify-start">
             {groups.map((g) => (
               <TabsTrigger 
                 key={g} 
                 value={g}
                 className="px-4 py-2 rounded-xl text-xs font-black uppercase transition-all data-[state=active]:bg-white data-[state=active]:text-indigo-600 data-[state=active]:shadow-sm"
               >
                 {g}
               </TabsTrigger>
             ))}
           </TabsList>
        </div>

        {groups.map((group) => (
          <TabsContent key={group} value={group} className="mt-8 transition-all animate-in fade-in slide-in-from-bottom-4 duration-500">
            {isLoading ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {[1, 2, 3].map(i => <div key={i} className="h-48 bg-slate-100 animate-pulse rounded-3xl" />)}
              </div>
            ) : matches && matches.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {matches.map((match) => {
                  const prediction = predictions?.find(p => p.match_id === match.id)
                  return (
                    <PredictionCard 
                      key={match.id} 
                      match={match} 
                      prediction={prediction}
                      onSave={(h, a) => savePrediction.mutate({ 
                        matchId: match.id, 
                        homeGoals: h, 
                        awayGoals: a 
                      })}
                      isSaving={savePrediction.isPending}
                    />
                  )
                })}
              </div>
            ) : (
              <div className="py-20 text-center text-slate-300 font-black uppercase text-xs tracking-[0.2em] italic">
                No hay partidos programados para este grupo
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>

      {/* Info de Bloqueo */}
      <footer className="pt-8 border-t border-slate-100 flex items-center justify-center gap-2">
         <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
         <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">
           Los pronósticos se bloquean automáticamente 1 minuto antes del inicio del partido.
         </p>
      </footer>
    </div>
  )
}
