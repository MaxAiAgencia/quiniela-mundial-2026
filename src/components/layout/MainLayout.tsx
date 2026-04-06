import { useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Menu } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sidebar, BottomNav, MobileSidebar } from './Navigation'
import { useAuthStore } from '@/stores/authStore'
import { User, LogIn } from 'lucide-react'
import { Link } from 'react-router-dom'

export function MainLayout() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { user } = useAuthStore()
  const location = useLocation()

  return (
    <div className="flex min-h-dvh bg-fifa-navy">
      {/* ── Sidebar Desktop (≥ 1024px) ── */}
      <aside className="hidden lg:flex flex-col w-60 shrink-0 bg-navy-dark border-r border-white/10 fixed top-0 left-0 bottom-0 z-30">
        <Sidebar />
      </aside>

      {/* ── Sidebar Overlay Mobile/Tablet (< 1024px) ── */}
      <MobileSidebar
        isOpen={isMobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />

      {/* ── Main Content Area ── */}
      <div className="flex-1 flex flex-col min-w-0 lg:ml-60">
        {/* Top Header (Móvil/Tablet) */}
        <header className="lg:hidden sticky top-0 z-20 flex items-center gap-3 px-4 h-14 bg-navy-dark/95 backdrop-blur-lg border-b border-white/10">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="p-2 -ml-2 text-muted-foreground hover:text-white transition-colors rounded-lg"
            aria-label="Abrir menú"
            id="menu-button"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2 flex-1">
            <div className="w-6 h-6 rounded bg-gradient-to-br from-fifa-gold to-gold-dark flex items-center justify-center text-[10px]">🏆</div>
            <span className="font-display text-base text-fifa-white tracking-wide">MUNDIAL 2026</span>
          </div>

          <Link
            to={user ? '/dashboard' : '/login'}
            className="p-2 text-muted-foreground hover:text-white transition-colors"
            aria-label={user ? 'Mi Perfil' : 'Entrar'}
          >
            {user ? (
              <User className="w-5 h-5 text-fifa-gold" />
            ) : (
              <LogIn className="w-5 h-5" />
            )}
          </Link>
        </header>

        {/* Page Content */}
        <main className="flex-1 pb-20 lg:pb-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="h-full"
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* ── Bottom Navigation (< 1024px) ── */}
      <div className="lg:hidden">
        <BottomNav />
      </div>
    </div>
  )
}
