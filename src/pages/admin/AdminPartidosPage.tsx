import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Trophy, Save, RefreshCw, Filter, Search, Calendar as CalendarIcon } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'

export default function AdminPartidosPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [updatingId, setUpdatingId] = useState<string | null>(null)
  
  const { data: matches, isLoading, refetch } = useQuery({
    queryKey: ['admin-matches'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('matches')
        .select(`
          *,
          home_team:home_team_id (name, country_code, image_url),
          away_team:away_team_id (name, country_code, image_url),
          venue:venue_id (name, city)
        `)
        .order('date', { ascending: true })

      if (error) throw error
      return data
    }
  })

  const handleUpdateScore = async (matchId: string, homeScore: number, awayScore: number, status: string) => {
    setUpdatingId(matchId)
    try {
      const { error } = await (supabase
        .from('matches') as any)
        .update({ 
          home_score: homeScore, 
          away_score: awayScore, 
          status: status 
        })
        .eq('id', matchId)

      if (error) throw error
      toast.success('Marcador actualizado')
      refetch()
    } catch (error: any) {
      toast.error('Error al actualizar: ' + error.message)
    } finally {
      setUpdatingId(null)
    }
  }

  if (isLoading) return <div className="p-20 text-center animate-pulse font-black uppercase text-slate-300">Cargando partidos...</div>

  const filteredMatches = matches?.filter(m => 
    m.home_team?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.away_team?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.venue?.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-black text-slate-900 tracking-tight uppercase">Gestión de Partidos</h1>
          <p className="text-slate-500 font-medium">Actualiza marcadores y estados en tiempo real.</p>
        </div>

        <div className="relative w-full md:w-80">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text"
            placeholder="Buscar por equipo o sede..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white border border-slate-200 rounded-2xl py-3 pl-11 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all shadow-sm"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {filteredMatches?.map((match) => (
          <MatchAdminCard 
            key={match.id} 
            match={match} 
            onUpdate={handleUpdateScore} 
            isUpdating={updatingId === match.id}
          />
        ))}
      </div>
    </div>
  )
}

function MatchAdminCard({ match, onUpdate, isUpdating }: any) {
  const [homeScore, setHomeScore] = useState(match.home_score || 0)
  const [awayScore, setAwayScore] = useState(match.away_score || 0)
  const [status, setStatus] = useState(match.status || 'scheduled')

  return (
    <Card className="border-0 shadow-sm bg-white rounded-[32px] overflow-hidden group hover:shadow-md transition-all">
      <CardContent className="p-8">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Info del Partido */}
          <div className="w-full lg:w-48 space-y-4 text-center lg:text-left border-b lg:border-b-0 lg:border-r border-slate-50 pb-6 lg:pb-0 lg:pr-8">
             <div className="flex items-center justify-center lg:justify-start gap-2 text-[10px] font-black text-indigo-500 uppercase tracking-widest">
                <CalendarIcon className="w-3 h-3" />
                {format(new Date(match.date), 'dd MMM, HH:mm', { locale: es })}
             </div>
             <div>
                <p className="text-xs font-bold text-slate-800 uppercase tracking-tight truncate">{match.venue?.name}</p>
                <p className="text-[10px] font-medium text-slate-400 italic">{match.venue?.city}</p>
             </div>
             <div className="pt-2">
                <span className={cn(
                  "px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border",
                  status === 'live' ? "bg-red-50 text-red-600 border-red-100 animate-pulse" :
                  status === 'finished' ? "bg-slate-100 text-slate-600 border-slate-200" :
                  "bg-green-50 text-green-600 border-green-100"
                )}>
                  {status === 'scheduled' ? 'Programado' : status === 'live' ? 'En Vivo' : 'Finalizado'}
                </span>
             </div>
          </div>

          {/* Marcador Interactive */}
          <div className="flex-1 flex items-center justify-center gap-4 md:gap-12 w-full">
            {/* Home */}
            <div className="flex flex-col items-center gap-3 w-32">
               <img src={match.home_team?.image_url} alt="" className="w-16 h-12 object-cover rounded-xl shadow-sm border border-slate-100" />
               <p className="text-xs font-black uppercase tracking-tighter text-slate-900 text-center">{match.home_team?.name}</p>
               <input 
                 type="number"
                 value={homeScore}
                 onChange={(e) => setHomeScore(parseInt(e.target.value))}
                 className="w-16 h-16 bg-slate-50 border-2 border-slate-100 rounded-2xl text-center text-2xl font-black text-slate-900 focus:border-indigo-500 focus:bg-white transition-all outline-none"
               />
            </div>

            <div className="text-2xl font-black text-slate-300">VS</div>

            {/* Away */}
            <div className="flex flex-col items-center gap-3 w-32">
               <img src={match.away_team?.image_url} alt="" className="w-16 h-12 object-cover rounded-xl shadow-sm border border-slate-100" />
               <p className="text-xs font-black uppercase tracking-tighter text-slate-900 text-center">{match.away_team?.name}</p>
               <input 
                 type="number"
                 value={awayScore}
                 onChange={(e) => setAwayScore(parseInt(e.target.value))}
                 className="w-16 h-16 bg-slate-50 border-2 border-slate-100 rounded-2xl text-center text-2xl font-black text-slate-900 focus:border-indigo-500 focus:bg-white transition-all outline-none"
               />
            </div>
          </div>

          {/* Acciones */}
          <div className="w-full lg:w-48 flex flex-col gap-3">
             <select 
               value={status}
               onChange={(e) => setStatus(e.target.value)}
               className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-xs font-bold uppercase tracking-widest text-slate-600 focus:outline-none"
             >
               <option value="scheduled">Programado</option>
               <option value="live">En Vivo</option>
               <option value="finished">Finalizado</option>
             </select>
             <Button 
               onClick={() => onUpdate(match.id, homeScore, awayScore, status)}
               disabled={isUpdating}
               className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-black uppercase tracking-widest text-[10px] rounded-xl shadow-lg shadow-indigo-600/20"
             >
               {isUpdating ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
               {isUpdating ? 'Guardando...' : 'Guardar'}
             </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(' ')
}
