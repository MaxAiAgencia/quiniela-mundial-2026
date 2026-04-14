import { lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import { AdminLayout } from '@/layouts/AdminLayout'

// Lazy-loaded Admin Pages
const AdminDashboard = lazy(() => import('./AdminDashboard'))
const AdminPagos     = lazy(() => import('./AdminPagosPage'))
const AdminPartidos  = lazy(() => import('./AdminPartidosPage'))
const AdminUsuarios  = lazy(() => import('./AdminUsuariosPage'))

export default function AdminPage() {
  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route index            element={<AdminDashboard />} />
        <Route path="pagos"     element={<AdminPagos />} />
        <Route path="partidos"  element={<AdminPartidos />} />
        <Route path="usuarios"  element={<AdminUsuarios />} />
        {/* Placeholder for other admin pages */}
        <Route path="*"         element={<div className="p-20 text-center font-black uppercase text-slate-300">Próximamente</div>} />
      </Route>
    </Routes>
  )
}
