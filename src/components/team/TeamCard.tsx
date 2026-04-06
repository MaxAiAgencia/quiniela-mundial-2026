import React from 'react'
import { Link } from 'react-router-dom'
import { Team } from '@/types'
import { cn } from '@/lib/utils'
import { getFlagUrl } from '@/lib/flags'

interface TeamCardProps {
  team: Team
  className?: string
}

export const TeamCard: React.FC<TeamCardProps> = ({ team, className }) => {
  const flagUrl = team.flag_url || getFlagUrl(team.country_code)
  
  return (
    <Link 
      to={`/equipos/${team.slug}`}
      className={cn(
        "group relative overflow-hidden rounded-xl border bg-card p-4 transition-all hover:shadow-lg hover:border-primary/50",
        className
      )}
    >
      <div className="flex flex-col items-center gap-3">
        {/* Banner/Flag Overlay */}
        <div className="relative w-full aspect-[3/2] overflow-hidden rounded-lg shadow-sm border border-muted/50">
          <img 
            src={flagUrl} 
            alt={team.name} 
            className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-500"
          />
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/60 to-transparent flex items-end justify-between p-2">
            <span className="text-[10px] font-black text-white/90 tracking-widest uppercase">
              {team.confederation}
            </span>
            {team.is_host && <span className="text-[10px] font-bold text-white bg-blue-600 px-1.5 rounded uppercase">Host</span>}
          </div>
        </div>

        {/* Info */}
        <div className="w-full flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-sm font-black uppercase text-foreground leading-tight tracking-tight">
              {team.name}
            </span>
            <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-widest">
              Grupo {team.group_id}
            </span>
          </div>
          
          <div className="flex flex-col items-end">
            <span className="text-xs font-black text-primary">#{team.fifa_ranking || '--'}</span>
            <span className="text-[10px] text-muted-foreground">FIFA</span>
          </div>
        </div>

        {/* History / Extra */}
        <div className="w-full flex items-center gap-2 pt-2 border-t border-muted/50 mt-1">
          <div className="flex -space-x-1">
             {Array.from({ length: Math.min(team.world_cups || 0, 5) }).map((_, i) => (
               <span key={i} className="text-[10px]">🏆</span>
             ))}
             {(team.world_cups || 0) > 5 && <span className="text-[10px] font-bold self-end pl-1">+{team.world_cups! - 5}</span>}
          </div>
          <span className="text-[9px] text-muted-foreground uppercase font-bold tracking-tighter truncate">
             {team.best_result}
          </span>
        </div>
      </div>
      
      {/* Decorative gradient border on active */}
      <div className="absolute inset-0 border-2 border-primary opacity-0 group-hover:opacity-10 pointer-events-none transition-opacity duration-300 rounded-xl" />
    </Link>
  )
}
