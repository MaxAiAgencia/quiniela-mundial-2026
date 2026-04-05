import { NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Home, Calendar, Globe2, MapPin, Shirt,
  Trophy, Newspaper, Target, X, ShieldAlert,
  User, LogOut, LogIn
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useAuthStore } from '@/stores/authStore'

const navItems = [
  { path: '/',             label: 'Inicio',        icon: Home },
  { path: '/calendario',   label: 'Calendario',    icon: Calendar },
  { path: '/grupos',       label: 'Grupos',        icon: Globe2 },
  { path: '/sedes',        label: 'Sedes',         icon: MapPin },
  { path: '/equipos',      label: 'Equipos',       icon: Shirt },
  { path: '/eliminatorias',label: 'Eliminatorias', icon: Trophy },
  { path: '/noticias',     label: 'Noticias',      icon: Newspaper },
  { path: '/quiniela',     label: 'Quiniela',      icon: Target },
]

interface SidebarProps {
  onClose?: () => void
  mobile?: boolean
}

export function Sidebar({ onClose, mobile }: SidebarProps) {
  const { user, isAdmin } = useAuthStore()

  return (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center justify-between px-5 py-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-fifa-gold to-gold-dark flex items-center justify-center">
            <Trophy className="w-5 h-5 text-navy-dark" />
          </div>
          <div>
            <p className="font-display text-lg text-fifa-white leading-none">MUNDIAL</p>
            <p className="font-display text-xs text-fifa-gold leading-none tracking-widest">2026</p>
          </div>
        </div>
        {mobile && (
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-white transition-colors p-1"
            aria-label="Cerrar menú"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Nav Links */}
      <nav className="flex-1 py-4 px-3 space-y-0.5 overflow-y-auto">
        {navItems.map(({ path, label, icon: Icon }) => (
          <NavLink
            key={path}
            to={path}
            end={path === '/'}
            onClick={mobile ? onClose : undefined}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200',
                isActive
                  ? 'bg-fifa-red/20 text-fifa-white border border-fifa-red/30'
                  : 'text-muted-foreground hover:text-white hover:bg-white/5'
              )
            }
          >
            {({ isActive }) => (
              <>
                <Icon
                  className={cn(
                    'w-4.5 h-4.5 shrink-0',
                    isActive ? 'text-fifa-gold' : 'text-current'
                  )}
                />
                {label}
                {path === '/quiniela' && (
                  <span className="ml-auto bg-fifa-gold text-navy-dark text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                    ¡Juega!
                  </span>
                )}
              </>
            )}
          </NavLink>
        ))}

        {isAdmin && (
          <NavLink
            to="/admin"
            onClick={mobile ? onClose : undefined}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 mt-6 mb-2 mx-1',
                isActive
                  ? 'bg-indigo-600/20 text-white border border-indigo-500/30 shadow-[0_0_15px_rgba(79,70,229,0.1)]'
                  : 'text-indigo-400 hover:text-white hover:bg-indigo-500/10'
              )
            }
          >
            <ShieldAlert className="w-4.5 h-4.5 shrink-0 text-indigo-400" />
            PANEL DE CONTROL
          </NavLink>
        )}
      </nav>

      {/* Auth Section */}
      <div className="px-3 py-4 border-t border-white/10 space-y-1">
        {user ? (
          <>
            <NavLink
              to="/dashboard"
              onClick={mobile ? onClose : undefined}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-white hover:bg-white/5 transition-all"
            >
              <User className="w-4 h-4 text-fifa-gold" />
              Mi Perfil
            </NavLink>
            <button
              onClick={() => {
                const { signOut } = useAuthStore.getState()
                signOut()
                if (onClose) onClose()
              }}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-fifa-red hover:bg-fifa-red/10 transition-all mt-1"
            >
              <LogOut className="w-4 h-4" />
              Cerrar Sesión
            </button>
          </>
        ) : (
          <NavLink
            to="/login"
            onClick={mobile ? onClose : undefined}
            className="flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-bold bg-fifa-gold text-navy-dark hover:bg-gold-light transition-all justify-center shadow-lg active:scale-95"
          >
            <LogIn className="w-4 h-4" />
            ENTRAR / REGISTRO
          </NavLink>
        )}
      </div>

      {/* Footer de sidebar */}
      <div className="px-5 py-4 border-t border-white/10">
        <p className="text-[11px] text-muted-foreground text-center">
          FIFA World Cup 2026™
        </p>
      </div>
    </div>
  )
}

// ─── Bottom Navigation (Móvil) ───────────────────────────────

const bottomNavItems = [
  { path: '/',              label: 'Inicio',      icon: Home },
  { path: '/grupos',        label: 'Grupos',      icon: Globe2 },
  { path: '/calendario',    label: 'Partidos',    icon: Calendar },
  { path: '/quiniela',      label: 'Quiniela',    icon: Target },
  { path: '/eliminatorias', label: 'Bracket',     icon: Trophy },
]

export function BottomNav() {
  const location = useLocation()

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 bg-navy-dark/95 backdrop-blur-lg border-t border-white/10 safe-area-pb"
      aria-label="Navegación principal"
    >
      <div className="flex items-center justify-around h-16 px-1 max-w-lg mx-auto">
        {bottomNavItems.map(({ path, label, icon: Icon }) => {
          const isActive = path === '/'
            ? location.pathname === '/'
            : location.pathname.startsWith(path)

          return (
            <NavLink
              key={path}
              to={path}
              className="flex flex-col items-center justify-center flex-1 h-full gap-1 relative group"
              aria-label={label}
            >
              {isActive && (
                <motion.span
                  layoutId="bottom-nav-indicator"
                  className="absolute top-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-fifa-gold rounded-full"
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}
              <Icon
                className={cn(
                  'w-5 h-5 transition-all duration-200',
                  isActive
                    ? 'text-fifa-gold scale-110'
                    : 'text-muted-foreground group-hover:text-white'
                )}
              />
              <span
                className={cn(
                  'text-[10px] font-medium transition-colors',
                  isActive ? 'text-fifa-white' : 'text-muted-foreground group-hover:text-white'
                )}
              >
                {label}
              </span>
            </NavLink>
          )
        })}
      </div>
    </nav>
  )
}

// ─── Overlay Sidebar Móvil ─────────────────────────────────

interface MobileSidebarProps {
  isOpen: boolean
  onClose: () => void
}

export function MobileSidebar({ isOpen, onClose }: MobileSidebarProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
            onClick={onClose}
          />
          {/* Sidebar panel */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            className="fixed top-0 left-0 bottom-0 z-50 w-72 bg-navy-dark border-r border-white/10 md:hidden"
          >
            <Sidebar onClose={onClose} mobile />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
