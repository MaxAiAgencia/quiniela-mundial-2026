import React from 'react'
import { Match } from '@/types'
import { cn, formatMatchDateShort, formatMatchTime } from '@/lib/utils'
import { getFlagUrl } from '@/lib/flags'
import { Badge } from '@/components/ui'

interface MatchCardProps {
  match: Match
  variant?: 'default' | 'compact' | 'featured'
  showVenue?: boolean
  className?: string
}

export const MatchCard: React.FC<MatchCardProps> = ({
  match,
  variant = 'default',
  showVenue = true,
  className,
}) => {
  const isLive = match.status === 'live'
  const isFinished = match.status === 'finished'

  const homeFlag = match.home_team?.flag_url || getFlagUrl(match.home_team?.country_code || '')
  const awayFlag = match.away_team?.flag_url || getFlagUrl(match.away_team?.country_code || '')

  if (variant === 'compact') {
    return (
      <div className={cn(
        "flex items-center justify-between p-3 rounded-lg border bg-card transition-all hover:shadow-md",
        isLive && "border-red-500 shadow-red-500/10",
        className
      )}>
        <div className="flex items-center gap-3 flex-1">
          <div className="flex flex-col items-center flex-1">
            <img src={homeFlag} alt={match.home_team?.name} className="w-6 h-4 object-cover rounded-sm shadow-sm" />
            <span className="text-xs font-bold mt-1 uppercase text-foreground">{match.home_team?.country_code}</span>
          </div>
          
          <div className="flex flex-col items-center px-2">
            <div className="text-lg font-black tracking-tighter flex items-center gap-1">
              <span>{match.home_goals ?? '-'}</span>
              <span className="text-muted-foreground/30 text-sm">:</span>
              <span>{match.away_goals ?? '-'}</span>
            </div>
            {isLive && <span className="text-[10px] font-bold text-red-500 animate-pulse">LIVE</span>}
          </div>

          <div className="flex flex-col items-center flex-1">
            <img src={awayFlag} alt={match.away_team?.name} className="w-6 h-4 object-cover rounded-sm shadow-sm" />
            <span className="text-xs font-bold mt-1 uppercase text-foreground">{match.away_team?.country_code}</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={cn(
      "group relative overflow-hidden rounded-xl border bg-card shadow-sm transition-all hover:shadow-lg",
      isLive && "border-red-500 ring-1 ring-red-500",
      isFinished && "border-green-500/50",
      className
    )}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-muted/30 border-b">
        <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
          {match.group_id ? `Grupo ${match.group_id}` : match.phase.replace('_', ' ')} · Jornada {match.match_number}
        </span>
        {isLive && (
          <Badge variant="destructive" className="h-5 px-1.5 text-[10px] font-bold animate-pulse">
            <span className="mr-1 h-1.5 w-1.5 rounded-full bg-white" />
            EN VIVO
          </Badge>
        )}
        {isFinished && (
          <Badge variant="secondary" className="h-5 px-1.5 text-[10px] font-bold bg-green-100 text-green-700 hover:bg-green-100 italic">
            Finalizado
          </Badge>
        )}
        {!isLive && !isFinished && (
          <span className="text-[10px] font-medium text-muted-foreground">
            {formatMatchDateShort(match.scheduled_at)}
          </span>
        )}
      </div>

      {/* Main content */}
      <div className="p-4 flex items-center justify-between gap-4">
        {/* Home Team */}
        <div className="flex flex-col items-center text-center gap-2 flex-1">
          <div className="relative">
            {match.home_team ? (
              <img 
                src={homeFlag} 
                alt={match.home_team.name} 
                className="w-12 h-8 object-cover rounded shadow-md border border-muted transition-transform group-hover:scale-110" 
              />
            ) : (
              <div className="w-12 h-8 rounded border-2 border-dashed border-muted-foreground/20 flex items-center justify-center bg-muted/10">
                <span className="text-[10px] font-black text-muted-foreground/30">TBD</span>
              </div>
            )}
            {match.home_team?.is_host && <span className="absolute -top-1 -right-1 flex h-3 w-3 bg-blue-500 rounded-full border-2 border-white ring-1 ring-blue-500" title="Anfitrión" />}
          </div>
          <span className={cn(
            "text-sm font-bold truncate max-w-[80px] uppercase tracking-tight",
            !match.home_team && "text-muted-foreground/40 italic text-[10px]"
          )}>
            {match.home_team?.name || match.notes?.split(' vs ')[0] || 'Por definir'}
          </span>
        </div>

        {/* Score / VS */}
        <div className="flex flex-col items-center justify-center min-w-[80px]">
          <div className={cn(
            "text-3xl font-black tracking-tighter flex items-center gap-3",
            (isLive || isFinished) ? "text-foreground" : "text-muted-foreground/10"
          )}>
            <span>{match.home_goals ?? (isFinished ? 0 : '')}</span>
            <span className="text-muted-foreground/20 text-xl font-normal self-center">-</span>
            <span>{match.away_goals ?? (isFinished ? 0 : '')}</span>
          </div>
          {!isFinished && !isLive && (
            <span className="text-xs font-black text-blue-600 bg-blue-50 px-2 py-0.5 rounded mt-1 shadow-sm border border-blue-100">
              {formatMatchTime(match.scheduled_at).split(' ')[0]}
            </span>
          )}
        </div>

        {/* Away Team */}
        <div className="flex flex-col items-center text-center gap-2 flex-1">
          <div className="relative">
            {match.away_team ? (
              <img 
                src={awayFlag} 
                alt={match.away_team.name} 
                className="w-12 h-8 object-cover rounded shadow-md border border-muted transition-transform group-hover:scale-110" 
              />
            ) : (
              <div className="w-12 h-8 rounded border-2 border-dashed border-muted-foreground/20 flex items-center justify-center bg-muted/10">
                <span className="text-[10px] font-black text-muted-foreground/30">TBD</span>
              </div>
            )}
          </div>
          <span className={cn(
            "text-sm font-bold truncate max-w-[80px] uppercase tracking-tight",
            !match.away_team && "text-muted-foreground/40 italic text-[10px]"
          )}>
            {match.away_team?.name || match.notes?.split(' vs ')[1] || 'Por definir'}
          </span>
        </div>
      </div>

      {/* Footer */}
      {showVenue && match.venue && (
        <div className="px-4 py-2 bg-muted/10 border-t flex items-center gap-1.5 overflow-hidden">
          <span className="text-muted-foreground">🏟</span>
          <span className="text-[10px] text-muted-foreground truncate italic">
            {match.venue.name}, {match.venue.city}
          </span>
        </div>
      )}
    </div>
  )
}
