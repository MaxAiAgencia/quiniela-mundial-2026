import React, { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useAuthStore } from '@/stores/authStore'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui'
import { 
  Upload, 
  CheckCircle, 
  Loader2, 
  AlertCircle 
} from 'lucide-react'
import { toast } from 'sonner'

interface PaymentUploadProps {
  quinielaId: string
  organiserPaymentInfo?: string
  costMxn?: number
  onSuccess?: () => void
}

export const PaymentUpload: React.FC<PaymentUploadProps> = ({ 
  quinielaId, 
  organiserPaymentInfo, 
  costMxn = 100, 
  onSuccess 
}) => {
  const { user } = useAuthStore()
  const [uploading, setUploading] = useState(false)
  const [uploaded, setUploaded] = useState(false)

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true)
      if (!event.target.files || event.target.files.length === 0) return
      
      const file = event.target.files[0]
      const fileExt = file.name.split('.').pop()
      const filePath = `${user?.id}/${Date.now()}.${fileExt}`

      // 1. Subir al Bucket
      const { error: uploadError } = await supabase.storage
        .from('payment-proofs')
        .upload(filePath, file)

      if (uploadError) throw uploadError

      // 2. Actualizar tabla de participantes
      const { error: updateError } = await (supabase
        .from('quiniela_participants') as any)
        .update({ 
          payment_proof_url: filePath,
          payment_method: 'transferencia' 
        })
        .eq('quiniela_id', quinielaId)
        .eq('user_id', user?.id)

      if (updateError) throw updateError

      setUploaded(true)
      toast.success('Comprobante enviado. Esperando validación del administrador.')
      onSuccess?.()
    } catch (error: any) {
      toast.error('Error al subir comprobante: ' + error.message)
    } finally {
      setUploading(false)
    }
  }

  if (uploaded) {
    return (
      <Card className="border-green-100 bg-green-50/50">
        <CardContent className="p-6 flex items-center gap-4">
          <div className="p-3 bg-green-100 rounded-full">
            <CheckCircle className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <h4 className="font-black text-green-900 uppercase tracking-tighter">Comprobante enviado</h4>
            <p className="text-xs text-green-700 font-medium">Estamos validando tu pago. Esto puede tardar unos minutos.</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-indigo-100 bg-indigo-50/30 overflow-hidden relative group">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-2 mb-2">
           <div className="w-2 h-2 bg-indigo-600 rounded-full" />
           <CardTitle className="text-sm font-black uppercase tracking-tight">Validación de Inscripción</CardTitle>
        </div>
        <CardDescription className="text-xs font-medium text-slate-500">
           Para activar tu participación, realiza el pago de <strong>${costMxn}.00 MXN</strong> a la siguiente cuenta y sube tu comprobante.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {organiserPaymentInfo && (
          <div className="mb-6 p-4 bg-white border border-indigo-100 rounded-2xl shadow-sm">
             <p className="text-[10px] font-black text-indigo-600 uppercase tracking-widest mb-2">Datos de Depósito</p>
             <p className="text-sm font-sans text-slate-700 whitespace-pre-wrap">{organiserPaymentInfo}</p>
          </div>
        )}

        <div className="relative">
          <input
            type="file"
            accept="image/*"
            onChange={handleUpload}
            disabled={uploading}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed z-10"
          />
          <div className="py-8 border-2 border-dashed border-indigo-200 rounded-2xl flex flex-col items-center justify-center gap-3 bg-white transition-all group-hover:border-indigo-400 group-hover:bg-indigo-50/50">
             {uploading ? (
               <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
             ) : (
               <Upload className="w-8 h-8 text-indigo-400 group-hover:scale-110 transition-transform" />
             )}
             <div className="text-center">
                <p className="text-xs font-black text-indigo-900 uppercase tracking-widest">{uploading ? 'Subiendo...' : 'Seleccionar Comprobante'}</p>
                <p className="text-[10px] text-slate-400 font-bold mt-1 uppercase">Solo imágenes (JPG, PNG)</p>
             </div>
          </div>
        </div>

        <div className="mt-6 flex items-start gap-3 p-4 bg-white rounded-xl border border-indigo-100/50">
           <AlertCircle className="w-4 h-4 text-indigo-400 mt-0.5" />
           <p className="text-[10px] text-slate-500 leading-relaxed font-medium italic">
             Tu participación se activará en cuanto el administrador verifique el depósito en el estado de cuenta. Recibirás una notificación en cuanto se apruebe.
           </p>
        </div>
      </CardContent>
    </Card>
  )
}
