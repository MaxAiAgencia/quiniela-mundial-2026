import { useGroups } from '@/hooks/useGroups'
import { useMatches } from '@/hooks/useMatches'
import { GroupTable } from '@/components/group/GroupTable'
import { MatchCard } from '@/components/match/MatchCard'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { GroupId } from '@/types'

const groupIds: GroupId[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L']

export default function GruposPage() {
  const { data: groups, isLoading: groupsLoading, error: groupsError } = useGroups()

  if (groupsLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        <p className="text-muted-foreground font-bold uppercase tracking-widest text-xs animate-pulse">Cargando Grupos...</p>
      </div>
    )
  }

  if (groupsError) {
    return (
      <div className="p-8 text-center bg-destructive/10 rounded-xl border border-destructive/20 mt-8 mx-4">
        <h2 className="text-destructive font-black uppercase mb-2">Error al cargar datos</h2>
        <p className="text-xs text-muted-foreground">Hubo un problema al conectar con el servidor. Por favor, intenta de nuevo.</p>
      </div>
    )
  }

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="space-y-2">
        <div className="flex items-center gap-3">
           <div className="h-8 w-1.5 bg-primary rounded-full" />
           <h1 className="text-4xl font-black uppercase tracking-tighter text-foreground">
             Fase de Grupos
           </h1>
        </div>
        <p className="text-muted-foreground text-sm max-w-2xl leading-relaxed">
          Sigue el progreso de las 48 selecciones divididas en 12 grupos. Los dos mejores de cada grupo y los 8 mejores terceros avanzan a Dieciseisavos.
        </p>
      </header>

      <Tabs defaultValue="A" className="space-y-6">
        <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-md py-4 border-b overflow-x-auto no-scrollbar">
          <TabsList className="bg-muted/50 p-1 rounded-lg flex w-max min-w-full">
            {groupIds.map((id) => (
              <TabsTrigger 
                key={id} 
                value={id}
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-md px-4 py-2 transition-transform active:scale-95"
              >
                Grupo {id}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {groupIds.map((id) => (
          <TabsContent key={id} value={id} className="space-y-8 focus:outline-none">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Standings Table */}
              <div className="lg:col-span-12 xl:col-span-7 space-y-4">
                 <div className="flex items-center justify-between px-1">
                    <h2 className="text-lg font-black uppercase tracking-tight flex items-center gap-2">
                       <span className="text-primary">#</span> Clasificación
                    </h2>
                 </div>
                 <GroupTable 
                   group_id={id} 
                   standings={groups?.[id] || []} 
                   className="shadow-xl"
                 />
              </div>

              {/* Matches list for this group */}
              <div className="lg:col-span-12 xl:col-span-5 space-y-4">
                 <div className="flex items-center justify-between px-1">
                    <h2 className="text-lg font-black uppercase tracking-tight flex items-center gap-2">
                       <span className="text-primary">⚽</span> Partidos
                    </h2>
                 </div>
                 <GroupMatches group_id={id} />
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}

function GroupMatches({ group_id }: { group_id: GroupId }) {
  const { data: matches, isLoading } = useMatches({ group_id })

  if (isLoading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map(i => (
          <div key={i} className="h-24 bg-muted animate-pulse rounded-xl" />
        ))}
      </div>
    )
  }

  if (!matches || matches.length === 0) {
    return (
      <div className="p-12 text-center border-2 border-dashed rounded-xl bg-muted/20">
         <p className="text-xs text-muted-foreground font-bold uppercase italic tracking-widest">
           No hay partidos programados para este grupo aún.
         </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-3">
      {matches.map((match) => (
        <MatchCard key={match.id} match={match} variant="default" showVenue={false} />
      ))}
    </div>
  )
}
