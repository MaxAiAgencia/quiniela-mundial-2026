import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'
import { Team, Player } from '@/types'

export function useTeamDetail(slug: string) {
  return useQuery({
    queryKey: ['team', slug],
    queryFn: async () => {
      // 1. Get team info
      const { data: team, error: teamError } = await supabase
        .from('teams')
        .select('*')
        .eq('slug', slug)
        .single()
      
      if (teamError) throw teamError

      // 2. Get players for this team
      const { data: players, error: playersError } = await (supabase
        .from('players') as any)
        .select('*')
        .eq('team_id', (team as any).id)
        .order('jersey_number', { ascending: true })
      
      if (playersError) throw playersError

      // 3. Get next matches for this team
      const { data: matches, error: matchesError } = await (supabase
        .from('matches') as any)
        .select('*, home_team:home_team_id(*), away_team:away_team_id(*), venue:venue_id(*)')
        .or(`home_team_id.eq.${(team as any).id},away_team_id.eq.${(team as any).id}`)
        .order('scheduled_at', { ascending: true })
        .limit(5)
      
      if (matchesError) throw matchesError

      return {
        team: team as Team,
        players: (players as any) as Player[],
        matches: (matches as any) || []
      }
    }
  })
}
