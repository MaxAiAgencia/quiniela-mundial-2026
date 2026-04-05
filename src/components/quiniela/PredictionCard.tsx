import React, { useState, useCallback, useRef } from 'react'
import { Match, MatchPrediction } from '@/types'
import { cn, formatMatchTime } from '@/lib/utils'
import { getFlagUrl } from '@/lib/flags'
import { Loader2, Lock, Award } from 'lucide-react'

interface PredictionCardProps {
  match: Match
  prediction?: MatchPrediction
  onSave: (home: number, away: number) => void
  isSaving?: boolean
}

export const PredictionCard: React.FC<PredictionCardProps> = ({ 
  match, 
  prediction, 
  onSave, 
  isSaving: isExternalSaving 
}) => {
  const [hGoals, setHGoals] = useState<string>(prediction?.home_goals?.toString() || '')
  const [aGoals, setAGoals] = useState<string>(prediction?.away_goals?.toString() || '')
  const [localSaving, setLocalSaving] = useState(false)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const isFinished = match.status === 'finished'
  const isLocked = match.status === 'live' || isFinished || prediction?.locked
  
  // Local debounce implementation to avoid missing dependency
  const handleSave = useCallback((h: number, a: number) => {
    if (timerRef.current) clearTimeout(timerRef.current)
    
    setLocalSaving(true)
    timerRef.current = setTimeout(() => {
      onSave(h, a)
      setLocalSaving(false)
    }, 1000)
  }, [onSave])

  const handleGoalChange = (value: string, type: 'home' | 'away') => {
    if (isLocked) return
    
    const cleanValue = value.replace(/[^0-9]/g, '')
    if (type === 'home') {
      setHGoals(cleanValue)
      if (cleanValue !== '') handleSave(parseInt(cleanValue), parseInt(aGoals || '0'))
    } else {
      setAGoals(cleanValue)
      if (cleanValue !== '') handleSave(parseInt(hGoals || '0'), parseInt(cleanValue))
    }
  }

  const pointsWon = prediction?.points_earned || 0
  const isExact = prediction?.is_exact

  return (
    <div className={cn(
      "relative bg-white rounded-3xl border-2 transition-all p-5",
      isLocked ? "border-slate-100 bg-slate-50/30" : "border-slate-50 shadow-sm hover:shadow-md hover:border-indigo-100",
      isFinished && pointsWon > 0 ? " ring-2 ring-green-500/20" : ""
    )}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
           <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 bg-slate-50 px-2 py-0.5 rounded border border-slate-100/50">
             #{match.match_number}
           </span>
           <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 italic">
             {formatMatchTime(match.scheduled_at).split(' ')[0]}
           </span>
        </div>
        
        <div className="flex items-center gap-2">
           {(localSaving || isExternalSaving) && (
             <div className="flex items-center gap-1.5 text-[8px] font-black uppercase text-indigo-500 tracking-widest">
               <Loader2 className="w-2.5 h-2.5 animate-spin" />
               Salvando
             </div>
           )}
           {isLocked && !isFinished && (
             <div className="p-1.5 bg-amber-50 text-amber-600 rounded-lg flex items-center gap-1">
                <Lock className="w-3 h-3" />
                <span className="text-[8px] font-black uppercase">Bloqueado</span>
             </div>
           )}
           {isFinished && (
             <div className={cn(
               "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5",
               pointsWon > 0 ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-400"
             )}>
                {pointsWon > 0 ? (
                  <>
                    <Award className="w-3 h-3" />
                    +{pointsWon} {isExact ? 'EXACTO' : 'ACIERTOS'}
                  </>
                ) : 'SIN PUNTOS'}
             </div>
           )}
        </div>
      </div>

      <div className="flex items-center justify-between gap-4">
        <div className="flex-1 flex flex-col items-center gap-3">
           <img src={getFlagUrl(match.home_team?.country_code || '')} className="w-10 h-7 object-cover rounded shadow-sm opacity-90" />
           <span className="text-xs font-black uppercase tracking-tighter text-slate-900 truncate w-full text-center">{match.home_team?.name}</span>
        </div>

        <div className="flex items-center gap-3">
           <input 
             type="text" 
             value={hGoals}
             onChange={(e) => handleGoalChange(e.target.value, 'home')}
             disabled={isLocked}
             placeholder="?"
             className={cn(
               "w-12 h-14 bg-slate-50 border-2 border-transparent text-center text-2xl font-black rounded-2xl transition-all outline-none",
               isLocked ? "bg-white text-slate-400" : "focus:border-indigo-600 focus:bg-white text-slate-900",
               isFinished && match.home_goals === prediction?.home_goals && "text-green-600"
             )}
           />
           <div className="text-xl font-normal text-slate-200">-</div>
           <input 
             type="text" 
             value={aGoals}
             onChange={(e) => handleGoalChange(e.target.value, 'away')}
             disabled={isLocked}
             placeholder="?"
             className={cn(
               "w-12 h-14 bg-slate-50 border-2 border-transparent text-center text-2xl font-black rounded-2xl transition-all outline-none",
               isLocked ? "bg-white text-slate-400" : "focus:border-indigo-600 focus:bg-white text-slate-900",
               isFinished && match.away_goals === prediction?.away_goals && "text-green-600"
             )}
           />
        </div>

        <div className="flex-1 flex flex-col items-center gap-3">
           <img src={getFlagUrl(match.away_team?.country_code || '')} className="w-10 h-7 object-cover rounded shadow-sm opacity-90" />
           <span className="text-xs font-black uppercase tracking-tighter text-slate-900 truncate w-full text-center">{match.away_team?.name}</span>
        </div>
      </div>

      {isFinished && (
        <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-center gap-6">
           <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Resultado Final</div>
           <div className="flex items-center gap-2 text-sm font-black text-slate-900">
              <span className="p-1 px-2 bg-slate-900 text-white rounded">{match.home_goals}</span>
              <span className="text-slate-200">:</span>
              <span className="p-1 px-2 bg-slate-900 text-white rounded">{match.away_goals}</span>
           </div>
        </div>
      )}
    </div>
  )
}
