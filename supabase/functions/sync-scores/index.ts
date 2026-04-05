import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

const API_FOOTBALL_KEY = Deno.env.get('API_FOOTBALL_KEY')
const SUPABASE_URL = Deno.env.get('SUPABASE_URL')
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')

const supabase = createClient(SUPABASE_URL!, SUPABASE_SERVICE_ROLE_KEY!)

serve(async (req) => {
  try {
    // 1. Fetch live matches from API-Football
    // Para el Mundial 2026, el ID de liga será específico (ej. 1)
    const response = await fetch('https://v3.football.api-sports.io/fixtures?live=all&league=1', {
      headers: {
        'x-rapidapi-key': API_FOOTBALL_KEY!,
        'x-rapidapi-host': 'v3.football.api-sports.io'
      }
    })
    
    const data = await response.json()
    const fixtures = data.response

    const updates = fixtures.map((f: any) => {
      // Mapeo simple: Usaríamos una tabla de mapeo API_ID <> match_number
      return {
        // match_id: f.fixture.id, 
        home_goals: f.goals.home,
        away_goals: f.goals.away,
        status: f.fixture.status.short === 'FT' ? 'finished' : 'live'
      }
    })

    // 2. Update matches in Supabase
    // Esto es un placeholder. En producción usaríamos un loop o upsert.
    
    return new Response(JSON.stringify({ message: 'Sync complete', count: updates.length }), {
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
})
