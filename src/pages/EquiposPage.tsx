import React, { useState, useMemo } from 'react'
import { useTeams } from '@/hooks/useTeams'
import { TeamCard } from '@/components/team/TeamCard'
import { Confederation } from '@/types'
import { cn } from '@/lib/utils'

const confederations: Confederation[] = ['UEFA', 'CONMEBOL', 'CONCACAF', 'CAF', 'AFC', 'OFC']

export default function EquiposPage() {
  const [selectedConf, setSelectedConf] = useState<Confederation | 'ALL'>('ALL')
  const { data: teams, isLoading, error } = useTeams()

  const filteredTeams = useMemo(() => {
    if (!teams) return []
    if (selectedConf === 'ALL') return teams
    return teams.filter(t => t.confederation === selectedConf)
  }, [teams, selectedConf])

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        <p className="text-muted-foreground font-bold uppercase tracking-widest text-xs">Cargando Selecciones...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-8 text-center bg-destructive/10 rounded-xl border border-destructive/20 mt-8 mx-4">
        <h2 className="text-destructive font-black uppercase mb-2">Error al cargar datos</h2>
        <p className="text-xs text-muted-foreground">Hubo un problema al conectar con el servidor.</p>
      </div>
    )
  }

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="h-8 w-1.5 bg-primary rounded-full" />
              <h1 className="text-4xl font-black uppercase tracking-tighter">
                Las 48 Selecciones
              </h1>
            </div>
            <p className="text-muted-foreground text-sm max-w-xl leading-relaxed">
              Explora las selecciones nacionales clasificadas para la Copa del Mundo 2026. 
              Selecciona una confederación para filtrar.
            </p>
          </div>
          
          <div className="bg-muted/50 p-1 rounded-xl flex flex-wrap gap-1 shadow-inner max-w-fit">
            <FilterButton 
              active={selectedConf === 'ALL'} 
              onClick={() => setSelectedConf('ALL')}
              label="Todas"
            />
            {confederations.map(conf => (
              <FilterButton 
                key={conf}
                active={selectedConf === conf} 
                onClick={() => setSelectedConf(conf)}
                label={conf}
              />
            ))}
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
        {filteredTeams.map((team) => (
          <TeamCard key={team.id} team={team} className="animate-in zoom-in-95 duration-500" />
        ))}
        {filteredTeams.length === 0 && (
          <div className="col-span-full py-20 text-center border-2 border-dashed rounded-3xl bg-muted/20">
             <p className="text-sm text-muted-foreground font-black uppercase italic tracking-widest">
               No se encontraron equipos en esta categoría.
             </p>
          </div>
        )}
      </div>

      <footer className="pt-12 border-t text-center space-y-4">
         <div className="flex flex-wrap justify-center gap-8 opacity-40 hover:opacity-100 transition-opacity">
            <ConfederationStat label="UEFA" count={teams?.filter(t => t.confederation === 'UEFA').length || 0} />
            <ConfederationStat label="CONMEBOL" count={teams?.filter(t => t.confederation === 'CONMEBOL').length || 0} />
            <ConfederationStat label="CONCACAF" count={teams?.filter(t => t.confederation === 'CONCACAF').length || 0} />
            <ConfederationStat label="CAF" count={teams?.filter(t => t.confederation === 'CAF').length || 0} />
            <ConfederationStat label="AFC" count={teams?.filter(t => t.confederation === 'AFC').length || 0} />
            <ConfederationStat label="OFC" count={teams?.filter(t => t.confederation === 'OFC').length || 0} />
         </div>
      </footer>
    </div>
  )
}

function FilterButton({ active, onClick, label }: { active: boolean; onClick: () => void; label: string }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "px-4 py-2 rounded-lg text-xs font-black uppercase tracking-widest transition-all",
        active 
          ? "bg-primary text-primary-foreground shadow-lg scale-105" 
          : "text-muted-foreground hover:bg-background hover:text-foreground"
      )}
    >
      {label}
    </button>
  )
}

function ConfederationStat({ label, count }: { label: string; count: number }) {
  return (
    <div className="flex flex-col items-center">
       <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{label}</span>
       <span className="text-lg font-black text-foreground">{count}</span>
    </div>
  )
}
