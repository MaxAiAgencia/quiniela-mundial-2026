import { useParams } from 'react-router-dom'
export default function NoticiaDetallePage() {
  const { slug } = useParams()
  return <div className="p-8"><h1 className="font-display text-4xl text-fifa-gold">NOTICIA: {slug}</h1></div>
}
