import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Check, X, ExternalLink, User, Clock, ShieldCheck } from 'lucide-react'
import { toast } from 'sonner'

export default function AdminPagosPage() {
  const { data: pendingPayments, isLoading, refetch } = useQuery({
    queryKey: ['admin-pending-payments'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('quiniela_participants')
        .select(`
          id,
          quiniela_id,
          user_id,
          payment_proof_url,
          paid,
          created_at,
          profiles:user_id (display_name, email),
          quinielas:quiniela_id (name)
        `)
        .eq('paid', false)
        .not('payment_proof_url', 'is', null)
        .order('created_at', { ascending: true })

      if (error) throw error
      return data
    }
  })

  const handleApprove = async (id: string) => {
    try {
      const { error } = await (supabase
        .from('quiniela_participants') as any)
        .update({ paid: true })
        .eq('id', id)

      if (error) throw error
      toast.success('Pago aprobado con éxito')
      refetch()
    } catch (error: any) {
      toast.error('Error al aprobar: ' + error.message)
    }
  }

  const handleReject = async (id: string) => {
    if (!confirm('¿Seguro que deseas rechazar este pago? El usuario deberá subirlo de nuevo.')) return
    try {
      const { error } = await (supabase
        .from('quiniela_participants') as any)
        .update({ payment_proof_url: null })
        .eq('id', id)

      if (error) throw error
      toast.info('Pago rechazado')
      refetch()
    } catch (error: any) {
      toast.error('Error al rechazar: ' + error.message)
    }
  }

  if (isLoading) return <div className="p-8 text-center animate-pulse text-muted-foreground uppercase tracking-widest font-black">Cargando pagos pendientes...</div>

  return (
    <div className="space-y-8">
      <div className="space-y-1">
        <h1 className="text-3xl font-black text-slate-900 tracking-tight uppercase">Validación de Pagos</h1>
        <p className="text-slate-500 font-medium">Revisa y aprueba los comprobantes de transferencia de los participantes.</p>
      </div>

      {!pendingPayments || pendingPayments.length === 0 ? (
        <div className="py-20 bg-white border-2 border-dashed border-slate-100 rounded-[40px] text-center space-y-4">
           <div className="p-4 bg-green-50 rounded-full w-16 h-16 flex items-center justify-center mx-auto">
              <ShieldCheck className="w-8 h-8 text-green-500" />
           </div>
           <p className="text-slate-500 font-bold uppercase tracking-widest italic">No hay pagos pendientes por validar</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {pendingPayments.map((payment: any) => (
            <Card key={payment.id} className="border-0 shadow-sm bg-white rounded-[32px] overflow-hidden hover:shadow-md transition-all group">
              <CardContent className="p-6 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-4 w-full md:w-auto">
                   <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-400">
                      <User className="w-6 h-6" />
                   </div>
                   <div>
                      <h4 className="font-black text-slate-900 uppercase leading-none mb-1">
                        {payment.profiles?.display_name || 'Usuario Anónimo'}
                      </h4>
                      <p className="text-xs text-slate-400 font-medium">{payment.profiles?.email}</p>
                   </div>
                </div>

                <div className="flex-1 px-6 border-l border-r border-slate-50 hidden md:block">
                   <p className="text-[10px] font-black uppercase text-indigo-500 tracking-widest leading-none mb-1">Torneo</p>
                   <p className="text-sm font-bold text-slate-700">{payment.quinielas?.name}</p>
                   <div className="flex items-center gap-2 mt-2 text-[10px] text-slate-400 font-medium">
                      <Clock className="w-3 h-3" />
                      Subido: {new Date(payment.created_at).toLocaleString()}
                   </div>
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto overflow-x-auto">
                   <a 
                     href={`${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/payment-proofs/${payment.payment_proof_url}`} 
                     target="_blank" 
                     rel="noreferrer"
                     className="bg-slate-100 hover:bg-slate-200 p-3 rounded-2xl text-slate-600 transition-colors flex items-center gap-2 text-[10px] font-black uppercase tracking-widest"
                   >
                     <ExternalLink className="w-4 h-4" />
                     Ver Ticket
                   </a>
                   <Button 
                     onClick={() => handleReject(payment.id)}
                     variant="outline" 
                     className="border-red-100 text-red-500 hover:bg-red-50 rounded-2xl p-3 h-auto"
                   >
                     <X className="w-5 h-5" />
                   </Button>
                   <Button 
                     onClick={() => handleApprove(payment.id)}
                     className="bg-green-500 hover:bg-green-600 text-white rounded-2xl px-6 py-3 h-auto font-black uppercase tracking-widest text-[10px] shadow-lg shadow-green-500/20"
                   >
                     <Check className="w-5 h-5 mr-2" />
                     Aprobar
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
