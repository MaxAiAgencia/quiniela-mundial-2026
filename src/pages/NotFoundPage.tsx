import { Link } from 'react-router-dom'
import { Trophy } from 'lucide-react'

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] gap-6 px-4 text-center">
      <Trophy className="w-16 h-16 text-fifa-gold/40" />
      <h1 className="font-display text-7xl text-fifa-gold">404</h1>
      <p className="text-xl text-muted-foreground max-w-sm">
        Página no encontrada. Parece que este balón salió fuera del campo.
      </p>
      <Link
        to="/"
        className="px-6 py-3 bg-fifa-red text-white font-semibold rounded-lg hover:bg-brand-red-dark transition-colors"
      >
        Volver al Inicio
      </Link>
    </div>
  )
}
