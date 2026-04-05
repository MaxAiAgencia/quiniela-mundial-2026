import { useState } from 'react'
import { motion } from 'framer-motion'
import { Trophy, Mail, Lock, User, ArrowRight, Github, Chrome } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/stores/authStore'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { toast } from 'sonner'
import { supabase } from '@/lib/supabase'

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const navigate = useNavigate()
  const { signIn, signInWithGoogle } = useAuthStore()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      await signIn(email, password)
      toast.success('¡Bienvenido de nuevo!')
      navigate('/dashboard')
    } catch (error: any) {
      toast.error(error.message || 'Error al iniciar sesión')
    } finally {
      setIsLoading(false)
    }
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { username, display_name: username }
        }
      })
      if (error) throw error
      
      if (data.user) {
        toast.success('¡Registro exitoso! Revisa tu correo o inicia sesión.')
      }
    } catch (error: any) {
      toast.error(error.message || 'Error al registrarse')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      {/* Background Decor */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-fifa-red/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-fifa-gold/5 blur-[120px] rounded-full" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8 space-y-2">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-fifa-gold to-gold-dark shadow-xl mb-4">
            <Trophy className="w-8 h-8 text-navy-dark" />
          </div>
          <h1 className="font-display text-3xl text-fifa-white uppercase tracking-tight">Quiniela Mundial</h1>
          <p className="text-muted-foreground text-sm">Tu puerta de entrada a la gloria en 2026</p>
        </div>

        <Card className="border-white/10 bg-navy-dark/40 backdrop-blur-xl shadow-2xl rounded-[32px] overflow-hidden">
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-navy-light/50 p-1 rounded-none border-b border-white/5">
              <TabsTrigger value="login" className="font-display text-[10px] uppercase tracking-widest py-3">Iniciar Sesión</TabsTrigger>
              <TabsTrigger value="register" className="font-display text-[10px] uppercase tracking-widest py-3">Crear Cuenta</TabsTrigger>
            </TabsList>

            <CardContent className="p-8">
              <TabsContent value="login" className="mt-0 space-y-6">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest ml-1">Email</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-navy-light/30 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm text-white placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-fifa-gold/50 transition-all font-sans"
                        placeholder="ejemplo@email.com"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest ml-1">Contraseña</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <input
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full bg-navy-light/30 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm text-white placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-fifa-gold/50 transition-all font-sans"
                        placeholder="••••••••"
                      />
                    </div>
                  </div>
                  <Button type="submit" disabled={isLoading} className="w-full py-6 bg-fifa-gold hover:bg-gold-light text-navy-dark font-display font-bold uppercase tracking-widest rounded-xl transition-all shadow-lg active:scale-95 group">
                    {isLoading ? 'Cargando...' : 'Entrar'}
                    {!isLoading && <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />}
                  </Button>
                </form>

                <div className="relative py-4">
                  <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/5" /></div>
                  <div className="relative flex justify-center text-[10px] uppercase tracking-widest"><span className="bg-[#0f1b2d] px-2 text-muted-foreground">O entrar con</span></div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" className="border-white/10 hover:bg-white/5 h-12 rounded-xl group" onClick={signInWithGoogle}>
                    <Chrome className="w-4 h-4 mr-2 text-red-500 transition-transform group-hover:scale-125" />
                    Google
                  </Button>
                  <Button variant="outline" className="border-white/10 hover:bg-white/5 h-12 rounded-xl group">
                    <Github className="w-4 h-4 mr-2 text-white transition-transform group-hover:scale-125" />
                    GitHub
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="register" className="mt-0 space-y-6">
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest ml-1">Nombre de Usuario</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <input
                        type="text"
                        required
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full bg-navy-light/30 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm text-white focus:outline-none focus:ring-2 focus:ring-fifa-gold/50 transition-all font-sans"
                        placeholder="@tu_usuario"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest ml-1">Email</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-navy-light/30 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm text-white focus:outline-none focus:ring-2 focus:ring-fifa-gold/50 transition-all font-sans"
                        placeholder="email@dominio.com"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest ml-1">Contraseña</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <input
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full bg-navy-light/30 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm text-white focus:outline-none focus:ring-2 focus:ring-fifa-gold/50 transition-all font-sans"
                        placeholder="Mínimo 6 caracteres"
                      />
                    </div>
                  </div>
                  <Button type="submit" disabled={isLoading} className="w-full py-6 bg-fifa-red hover:bg-fifa-red/80 text-white font-display font-bold uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-fifa-red/20 active:scale-95">
                    {isLoading ? 'Registrando...' : 'Crear mi Cuenta'}
                  </Button>
                </form>
                <p className="text-[9px] text-center text-muted-foreground leading-relaxed px-4">
                  Al registrarte, aceptas nuestros términos y condiciones y el reglamento de la Quiniela Mundial 2026.
                </p>
              </TabsContent>
            </CardContent>
          </Tabs>
        </Card>
      </motion.div>
    </div>
  )
}
