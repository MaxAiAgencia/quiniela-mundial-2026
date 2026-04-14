import { useState } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { Users, Search, ShieldCheck, ShieldOff, Trophy, Calendar } from 'lucide-react'

interface AdminUser {
  id: string
  username: string
  display_name: string | null
  avatar_url: string | null
  is_admin: boolean
  created_at: string
  participations_count: number
}

function useAdminUsers() {
  return useQuery({
    queryKey: ['admin-users'],
    queryFn: async () => {
      const { data: profiles, error } = await supabase
        .from('profiles')
        .select('id, username, display_name, avatar_url, is_admin, created_at')
        .order('created_at', { ascending: false })

      if (error) throw error
      if (!profiles || profiles.length === 0) return []

      // Obtener conteo de participaciones por usuario
      const ids = profiles.map((p: any) => p.id)
      const { data: participations } = await supabase
        .from('quiniela_participants')
        .select('user_id')
        .in('user_id', ids)

      const countMap: Record<string, number> = {}
      for (const row of participations || []) {
        countMap[(row as any).user_id] = (countMap[(row as any).user_id] || 0) + 1
      }

      return profiles.map((p: any) => ({
        ...p,
        participations_count: countMap[p.id] || 0
      })) as AdminUser[]
    }
  })
}

export default function AdminUsuariosPage() {
  const { data: users, isLoading } = useAdminUsers()
  const queryClient = useQueryClient()
  const [search, setSearch] = useState('')

  const filtered = (users || []).filter(u =>
    u.username?.toLowerCase().includes(search.toLowerCase()) ||
    u.display_name?.toLowerCase().includes(search.toLowerCase())
  )

  const toggleAdmin = async (user: AdminUser) => {
    if (!confirm(`¿${user.is_admin ? 'Quitar' : 'Dar'} permisos de admin a ${user.display_name || user.username}?`)) return
    try {
      const { error } = await (supabase.from('profiles') as any)
        .update({ is_admin: !user.is_admin })
        .eq('id', user.id)
      if (error) throw error
      toast.success(user.is_admin ? 'Permisos de admin removidos' : 'Admin habilitado')
      queryClient.invalidateQueries({ queryKey: ['admin-users'] })
    } catch (e: any) {
      toast.error('Error: ' + e.message)
    }
  }

  if (isLoading) return (
    <div className="space-y-4 animate-pulse">
      {[1,2,3,4,5].map(i => <div key={i} className="h-20 bg-slate-100 rounded-[24px]" />)}
    </div>
  )

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-black text-slate-900 tracking-tight uppercase">Usuarios</h1>
          <p className="text-slate-500 font-medium">
            {users?.length || 0} usuario{users?.length !== 1 ? 's' : ''} registrado{users?.length !== 1 ? 's' : ''}
          </p>
        </div>

        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar por nombre o usuario..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 transition-all"
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="py-20 bg-white border-2 border-dashed border-slate-100 rounded-[40px] text-center space-y-4">
          <div className="p-4 bg-slate-50 rounded-full w-16 h-16 flex items-center justify-center mx-auto">
            <Users className="w-8 h-8 text-slate-300" />
          </div>
          <p className="text-slate-400 font-bold uppercase tracking-widest italic">No se encontraron usuarios</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3">
          {filtered.map(user => (
            <Card key={user.id} className="border-0 shadow-sm bg-white rounded-[24px] hover:shadow-md transition-all">
              <CardContent className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  {user.avatar_url ? (
                    <img src={user.avatar_url} alt="" className="w-11 h-11 rounded-2xl object-cover border-2 border-slate-100" />
                  ) : (
                    <div className="w-11 h-11 rounded-2xl bg-indigo-100 flex items-center justify-center text-indigo-600 font-black text-base">
                      {(user.display_name || user.username || '?').charAt(0).toUpperCase()}
                    </div>
                  )}
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-black text-slate-900 leading-none text-sm">
                        {user.display_name || user.username}
                      </h4>
                      {user.is_admin && (
                        <Badge className="bg-indigo-100 text-indigo-700 border-none text-[8px] font-black uppercase tracking-widest px-2 py-0 h-4">
                          Admin
                        </Badge>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-400 font-medium mt-0.5">@{user.username}</p>
                  </div>
                </div>

                <div className="flex items-center gap-6 ml-15 sm:ml-0">
                  <div className="flex items-center gap-1.5 text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                    <Trophy className="w-3 h-3 text-slate-400" />
                    {user.participations_count} quiniela{user.participations_count !== 1 ? 's' : ''}
                  </div>

                  <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-medium">
                    <Calendar className="w-3 h-3" />
                    {new Date(user.created_at).toLocaleDateString('es-MX', { day: '2-digit', month: 'short', year: 'numeric' })}
                  </div>

                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => toggleAdmin(user)}
                    className={
                      user.is_admin
                        ? "border-red-100 text-red-500 hover:bg-red-50 rounded-xl h-8 text-[10px] font-black uppercase tracking-widest"
                        : "border-indigo-100 text-indigo-600 hover:bg-indigo-50 rounded-xl h-8 text-[10px] font-black uppercase tracking-widest"
                    }
                  >
                    {user.is_admin ? (
                      <><ShieldOff className="w-3 h-3 mr-1.5" />Quitar Admin</>
                    ) : (
                      <><ShieldCheck className="w-3 h-3 mr-1.5" />Hacer Admin</>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
