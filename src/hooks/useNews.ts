import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'

export interface NewsArticle {
  id: string
  slug: string
  title: string
  summary: string
  content: string
  image_url: string | null
  category: 'resultados' | 'lesiones' | 'convocatorias' | 'curiosidades' | 'historia' | 'general'
  author: string
  is_featured: boolean
  published_at: string
  views: number
}

export function useNews() {
  return useQuery({
    queryKey: ['news'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('news')
        .select('*')
        .eq('is_published', true)
        .order('published_at', { ascending: false })
      
      if (error) throw error
      return data as NewsArticle[]
    }
  })
}

export function useNewsArticle(slug: string) {
  return useQuery({
    queryKey: ['news', slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('news')
        .select('*')
        .eq('slug', slug)
        .single()
      
      if (error) throw error
      return data as NewsArticle
    }
  })
}
