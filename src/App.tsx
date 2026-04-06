import { lazy, Suspense, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'sonner'
import { MainLayout } from '@/components/layout/MainLayout'
import { useAuthStore } from '@/stores/authStore'
import { supabase } from '@/lib/supabase'

// ─── Lazy-loaded pages ────────────────────────────────────────
const HomePage          = lazy(() => import('@/pages/HomePage'))
const CalendarioPage    = lazy(() => import('@/pages/CalendarioPage'))
const GruposPage        = lazy(() => import('@/pages/GruposPage'))
const SedesPage         = lazy(() => import('@/pages/SedesPage'))
const EquiposPage       = lazy(() => import('@/pages/EquiposPage'))
const EquipoDetallePage = lazy(() => import('@/pages/EquipoDetallePage'))
const EliminatoriasPage = lazy(() => import('@/pages/EliminatoriasPage'))
const QuinielaPage      = lazy(() => import('@/pages/QuinielaPage'))
const QuinielaNuevaPage = lazy(() => import('@/pages/QuinielaNuevaPage'))
const QuinielaDetallePage=lazy(() => import('@/pages/QuinielaDetallePage'))
const LoginPage         = lazy(() => import('@/pages/LoginPage'))
const DashboardPage     = lazy(() => import('@/pages/DashboardPage'))
const AdminPage         = lazy(() => import('@/pages/admin/AdminPage'))
const NotFoundPage      = lazy(() => import('@/pages/NotFoundPage'))

// ─── Loading fallback ─────────────────────────────────────────
function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-2 border-fifa-gold border-t-transparent rounded-full animate-spin" />
        <p className="text-muted-foreground text-sm font-medium">Cargando…</p>
      </div>
    </div>
  )
}

// ─── TanStack Query ───────────────────────────────────────────
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60_000,
      retry: 1,
    },
  },
})

// ─── Auth Listener ────────────────────────────────────────────
function AuthListener() {
  const { setUser } = useAuthStore()

  useEffect(() => {
    // Sesión inicial
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null, session)
    })
    // Cambios futuros
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null, session)
    })
    return () => subscription.unsubscribe()
  }, [setUser])

  return null
}

// ─── App ──────────────────────────────────────────────────────
export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthListener />
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route element={<MainLayout />}>
              <Route index                      element={<HomePage />} />
              <Route path="calendario"          element={<CalendarioPage />} />
              <Route path="grupos"              element={<GruposPage />} />
              <Route path="sedes"               element={<SedesPage />} />
              <Route path="equipos"             element={<EquiposPage />} />
              <Route path="equipos/:slug"       element={<EquipoDetallePage />} />
              <Route path="eliminatorias"       element={<EliminatoriasPage />} />
              <Route path="quiniela"            element={<QuinielaPage />} />
              <Route path="quiniela/nueva"      element={<QuinielaNuevaPage />} />
              <Route path="quiniela/:id"        element={<QuinielaDetallePage />} />
              <Route path="login"               element={<LoginPage />} />
              <Route path="dashboard"           element={<DashboardPage />} />
              <Route path="admin/*"             element={<AdminPage />} />
              <Route path="*"                   element={<NotFoundPage />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
      <Toaster
        position="top-right"
        theme="dark"
        toastOptions={{
          style: { background: '#1a2e42', border: '1px solid rgba(255,255,255,0.1)', color: '#F5F5F5' },
        }}
      />
    </QueryClientProvider>
  )
}
