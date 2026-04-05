import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'

export interface Venue {
  id: string
  slug: string
  name: string
  city: string
  country: 'USA' | 'MEX' | 'CAN'
  capacity: number
  image_url: string | null
  description: string | null
  is_final: boolean
  is_inaugural: boolean
}

export function useVenues() {
  return useQuery({
    queryKey: ['venues'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('venues')
        .select('*')
        .order('name')
      
      if (error) throw error
      return data as Venue[]
    }
  })
}
