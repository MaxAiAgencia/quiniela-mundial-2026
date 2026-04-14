import React from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { cn } from '@/lib/utils'
import {
  LayoutDashboard,
  CreditCard,
  Trophy,
  Users,
  Settings,
  History,
  ShieldCheck,
  ChevronRight
} from 'lucide-react'
import { useAuthStore } from '@/stores/authStore'

const navItems = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { label: 'Validar Pagos', href: '/admin/pagos', icon: CreditCard },
  { label: 'Gestionar Partidos', href: '/admin/partidos', icon: Trophy },
  { label: 'Usuarios', href: '/admin/usuarios', icon: Users },
  { label: 'Bitácora / Auditoría', href: '/admin/auditoria', icon: History },
  { label: 'Configuración', href: '/admin/config', icon: Settings },
]

export const AdminLayout: React.FC<{ children?: React.ReactNode }> = () => {
  const location = useLocation()
  const { profile } = useAuthStore()

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans">
      {/* Sidebar Admin */}
      <aside className="w-72 bg-white border-r border-slate-200 hidden lg:flex flex-col sticky top-0 h-screen">
        <div className="p-8">
          <div className="flex items-center gap-3 mb-10">
            <div className="p-2 bg-indigo-600 rounded-lg">
              <ShieldCheck className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-sm font-black uppercase tracking-tighter text-slate-900 leading-none">Admin Panel</h2>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Quiniela Mundial</p>
            </div>
          </div>

          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = location.pathname === item.href
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-xl transition-all group",
                    isActive 
                      ? "bg-indigo-50 text-indigo-700 font-bold" 
                      : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                  )}
                >
                  <Icon className={cn("w-5 h-5", isActive ? "text-indigo-600" : "text-slate-400 group-hover:text-slate-600")} />
                  <span className="text-sm">{item.label}</span>
                  {isActive && <ChevronRight className="w-4 h-4 ml-auto" />}
                </Link>
              )
            })}
          </nav>
        </div>

        <div className="mt-auto p-6 border-t border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-3">
            {profile?.avatar_url ? (
              <img src={profile.avatar_url} alt="" className="w-10 h-10 rounded-full border-2 border-white shadow-sm object-cover" />
            ) : (
              <div className="w-10 h-10 rounded-full bg-indigo-100 border-2 border-white shadow-sm flex items-center justify-center text-indigo-600 font-black text-sm">
                {(profile?.display_name || profile?.username || 'A').charAt(0).toUpperCase()}
              </div>
            )}
            <div>
              <p className="text-xs font-black text-slate-900 leading-none truncate max-w-[140px]">
                {profile?.display_name || profile?.username || 'Admin'}
              </p>
              <p className="text-[10px] font-bold text-slate-500 uppercase mt-1">Super Admin</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-w-0">
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-30">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest">
            <Link to="/" className="hover:text-slate-900">App</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-slate-900">Panel administrativo</span>
          </div>
          
          <div className="flex items-center gap-4">
             <div className="px-3 py-1 bg-green-50 text-green-700 text-[10px] font-black uppercase rounded-full border border-green-100 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                Sincronizado
             </div>
          </div>
        </header>

        <div className="p-8 max-w-6xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
