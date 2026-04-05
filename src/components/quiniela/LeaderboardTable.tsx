import React from 'react'
import { useLeaderboard } from '@/hooks/useLeaderboard'
import { useAuthStore } from '@/stores/authStore'
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow,
  Badge 
} from '@/components/ui'
import { cn } from '@/lib/utils'
import { Trophy, Target, CheckCircle2, Star } from 'lucide-react'

interface LeaderboardTableProps {
  quinielaId: string
}

export const LeaderboardTable: React.FC<LeaderboardTableProps> = ({ quinielaId }) => {
  const { user: currentUser } = useAuthStore()
  const { data: participants, isLoading } = useLeaderboard(quinielaId)

  if (isLoading) return (
    <div className="space-y-4 py-10">
      {[1, 2, 3, 4, 5].map(i => <div key={i} className="h-16 bg-slate-100 animate-pulse rounded-2xl" />)}
    </div>
  )

  return (
    <div className="overflow-hidden rounded-3xl border-2 border-slate-50 bg-white shadow-sm">
      <Table>
        <TableHeader className="bg-slate-50/50">
          <TableRow className="border-slate-100 hover:bg-transparent">
            <TableHead className="w-20 text-center text-[10px] font-black uppercase tracking-widest text-slate-400">Pos</TableHead>
            <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-400">Participante</TableHead>
            <TableHead className="text-center text-[10px] font-black uppercase tracking-widest text-slate-400">Exactos</TableHead>
            <TableHead className="text-center text-[10px] font-black uppercase tracking-widest text-slate-400">G/E</TableHead>
            <TableHead className="text-right text-[10px] font-black uppercase tracking-widest text-slate-400 pr-8">Puntos</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {participants?.map((p: any, i: number) => {
            const isMe = p.user_id === currentUser?.id
            const isTop3 = i < 3

            return (
              <TableRow 
                key={p.user_id}
                className={cn(
                  "border-slate-50 transition-colors group",
                  isMe ? "bg-indigo-50/40 hover:bg-indigo-50/60" : "hover:bg-slate-50/30"
                )}
              >
                <TableCell className="text-center">
                  <div className="flex items-center justify-center">
                    {i === 0 ? (
                      <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center border-2 border-amber-200">
                        <Trophy className="w-4 h-4 text-amber-600" />
                      </div>
                    ) : i === 1 ? (
                      <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center border-2 border-slate-200">
                        <Trophy className="w-4 h-4 text-slate-400" />
                      </div>
                    ) : i === 2 ? (
                      <div className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center border-2 border-orange-100">
                        <Trophy className="w-4 h-4 text-orange-400" />
                      </div>
                    ) : (
                      <span className="text-sm font-black text-slate-400 tracking-tighter">#{i + 1}</span>
                    )}
                  </div>
                </TableCell>
                
                <TableCell>
                  <div className="flex items-center gap-3 py-2">
                    <div className={cn(
                      "w-10 h-10 rounded-2xl bg-slate-100 border-2 flex items-center justify-center overflow-hidden transition-transform group-hover:scale-105",
                      isMe ? "border-indigo-200" : "border-white"
                    )}>
                       {p.avatar_url ? (
                         <img src={p.avatar_url} alt={p.username} className="w-full h-full object-cover" />
                       ) : (
                         <span className="text-xs font-black text-slate-400">{p.username?.[0]?.toUpperCase()}</span>
                       )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className={cn(
                          "text-sm font-black uppercase tracking-tight",
                          isMe ? "text-indigo-900" : "text-slate-900"
                        )}>
                          {p.display_name || p.username}
                        </p>
                        {isMe && <Badge variant="secondary" className="bg-indigo-100 text-indigo-700 h-4 text-[8px] font-black uppercase tracking-widest px-1.5 border-transparent">Tú</Badge>}
                        {!p.paid && <Badge variant="outline" className="h-4 text-[8px] font-black uppercase tracking-widest px-1.5 border-slate-200 text-slate-400 italic">No Pagado</Badge>}
                      </div>
                      <p className="text-[10px] font-medium text-slate-400 leading-none">Miembro desde 2026</p>
                    </div>
                  </div>
                </TableCell>

                <TableCell className="text-center font-bold text-slate-600">
                  <div className="flex flex-col items-center gap-0.5">
                     <Target className="w-3 h-3 text-red-400 opacity-40" />
                     {p.exact_scores}
                  </div>
                </TableCell>

                <TableCell className="text-center font-bold text-slate-600">
                   <div className="flex flex-col items-center gap-0.5">
                     <CheckCircle2 className="w-3 h-3 text-green-400 opacity-40" />
                     {p.correct_outcomes}
                  </div>
                </TableCell>

                <TableCell className="text-right pr-8">
                  <div className="flex items-center justify-end gap-3">
                     {isTop3 && <Star className="w-3 h-3 text-amber-500 fill-amber-500 animate-pulse hidden md:block" />}
                     <span className={cn(
                       "text-2xl font-black tracking-tighter",
                       isTop3 ? "text-indigo-600" : "text-slate-900"
                     )}>
                       {p.total_points}
                     </span>
                  </div>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
      
      {!participants?.length && (
        <div className="py-20 text-center text-slate-300 font-black uppercase text-xs tracking-widest italic bg-slate-50/50">
          Aún no hay puntuaciones registradas
        </div>
      )}
    </div>
  )
}
