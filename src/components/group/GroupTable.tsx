import React from 'react'
import { Standing } from '@/types'
import { cn } from '@/lib/utils'
import { getFlagUrl } from '@/lib/flags'

interface GroupTableProps {
  group_id: string
  standings: Standing[]
  compact?: boolean
  className?: string
}

export const GroupTable: React.FC<GroupTableProps> = ({
  group_id,
  standings,
  compact = false,
  className,
}) => {
  // Ordenar por puntos (desc), luego por diferencia de goles (desc)
  const sortedStandings = [...standings].sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points
    return b.goal_diff - a.goal_diff
  })

  return (
    <div className={cn("overflow-hidden rounded-xl border bg-card shadow-sm", className)}>
      <div className="bg-primary px-4 py-2 flex items-center justify-between">
        <h3 className="text-sm font-black uppercase tracking-widest text-primary-foreground">
          Grupo {group_id}
        </h3>
        {compact && <span className="text-[10px] text-primary-foreground/70 font-bold uppercase">Standings</span>}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-muted/50 border-b text-[10px] uppercase font-black text-muted-foreground whitespace-nowrap">
              <th className="px-2 py-2 w-8 text-center text-[9px]">Pos</th>
              <th className="px-2 py-2 min-w-[100px] text-[9px]">Equipo</th>
              <th className="px-1 py-2 text-center w-6 text-[9px]">PJ</th>
              <th className="px-1 py-2 text-center w-6 text-[9px]">G</th>
              {!compact && <th className="px-1 py-2 text-center w-6 text-[9px]">E</th>}
              {!compact && <th className="px-1 py-2 text-center w-6 text-[9px]">P</th>}
              <th className="px-1 py-2 text-center w-8 text-[9px]">DIF</th>
              <th className="px-2 py-2 text-center w-8 text-foreground text-[9px]">PTS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-muted/50">
            {sortedStandings.map((standing, index) => {
              const isQualified = index < 2
              const isPossibleBestThird = index === 2
              
              return (
                <tr 
                  key={standing.team_id} 
                  className={cn(
                    "hover:bg-muted/30 transition-colors group",
                    isQualified && "bg-green-50/30",
                    isPossibleBestThird && "bg-yellow-50/30"
                  )}
                >
                  <td className="px-3 py-2.5 text-center font-bold relative">
                    {isQualified && <div className="absolute left-0 top-0 bottom-0 w-1 bg-green-500" />}
                    {isPossibleBestThird && <div className="absolute left-0 top-0 bottom-0 w-1 bg-yellow-500" />}
                    {index + 1}
                  </td>
                  <td className="px-3 py-2.5 font-bold">
                    <div className="flex items-center gap-2">
                      <img 
                        src={getFlagUrl(standing.team?.country_code || 'MEX')} 
                        alt={standing.team?.name}
                        className="w-5 h-3.5 object-cover rounded shadow-sm border border-muted/50"
                      />
                      <span className="truncate group-hover:text-primary transition-colors">
                        {standing.team?.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-2 py-2.5 text-center text-muted-foreground">{standing.played}</td>
                  <td className="px-2 py-2.5 text-center">{standing.wins}</td>
                  {!compact && <td className="px-2 py-2.5 text-center">{standing.draws}</td>}
                  {!compact && <td className="px-2 py-2.5 text-center">{standing.losses}</td>}
                  <td className={cn(
                    "px-2 py-2.5 text-center font-medium",
                    standing.goal_diff > 0 ? "text-green-600" : standing.goal_diff < 0 ? "text-red-500" : "text-muted-foreground"
                  )}>
                    {standing.goal_diff > 0 ? `+${standing.goal_diff}` : standing.goal_diff}
                  </td>
                  <td className="px-3 py-2.5 text-center font-black text-sm text-foreground bg-muted/20">
                    {standing.points}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <div className="px-4 py-2 bg-muted/5 border-t flex gap-3 text-[9px] font-bold text-muted-foreground/60 uppercase tracking-tighter">
        <div className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500" /> Clasificado
        </div>
        <div className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-yellow-400" /> Posible 3ro
        </div>
      </div>
    </div>
  )
}
