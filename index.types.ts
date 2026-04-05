// ============================================================
// FIFA WORLD CUP 2026 — TIPOS GLOBALES DE TYPESCRIPT
// Archivo: src/types/index.ts
// ============================================================

// ─── ENUMS ──────────────────────────────────────────────────

export type MatchStatus = 'scheduled' | 'live' | 'finished' | 'postponed'
export type MatchPhase = 'group' | 'round_of_16' | 'quarterfinal' | 'semifinal' | 'third_place' | 'final'
export type Confederation = 'UEFA' | 'CONMEBOL' | 'CONCACAF' | 'CAF' | 'AFC' | 'OFC'
export type PlayerPosition = 'GK' | 'DF' | 'MF' | 'FW'
export type NewsCategory = 'resultados' | 'lesiones' | 'convocatorias' | 'curiosidades' | 'historia' | 'general'
export type QuinielaStatus = 'draft' | 'open' | 'in_progress' | 'closed' | 'finished'
export type QuinielaPrizeType = 'winner_takes_all' | 'top3' | 'custom'
export type HostCountry = 'USA' | 'MEX' | 'CAN'
export type GroupId = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H' | 'I' | 'J' | 'K' | 'L'

// ─── VENUE (SEDE) ────────────────────────────────────────────

export interface Venue {
  id: string
  slug: string
  name: string
  city: string
  country: HostCountry
  capacity: number
  latitude: number
  longitude: number
  image_url?: string
  description?: string
  is_final: boolean
  is_inaugural: boolean
  created_at: string
}

// ─── TEAM (EQUIPO) ───────────────────────────────────────────

export interface Team {
  id: string
  slug: string
  name: string
  name_en: string
  country_code: string
  confederation: Confederation
  group_id: GroupId
  kit_sponsor?: string
  coach?: string
  fifa_ranking?: number
  world_cups: number
  best_result?: string
  flag_url?: string
  shield_url?: string
  primary_color?: string
  secondary_color?: string
  is_host: boolean
  created_at: string
}

// ─── PLAYER (JUGADOR) ────────────────────────────────────────

export interface Player {
  id: string
  team_id: string
  jersey_number?: number
  name: string
  position: PlayerPosition
  club?: string
  nationality?: string
  birth_date?: string
  photo_url?: string
  caps: number
  goals: number
  is_captain: boolean
  created_at: string
}

// ─── MATCH (PARTIDO) ────────────────────────────────────────

export interface Match {
  id: string
  match_number: number
  phase: MatchPhase
  group_id?: GroupId
  home_team_id?: string
  away_team_id?: string
  venue_id: string
  scheduled_at: string
  status: MatchStatus
  home_goals?: number
  away_goals?: number
  home_goals_et?: number
  away_goals_et?: number
  home_penalties?: number
  away_penalties?: number
  winner_team_id?: string
  attendance?: number
  referee?: string
  notes?: string
  created_at: string
  updated_at: string
  // Joins opcionales
  home_team?: Team
  away_team?: Team
  venue?: Venue
}

// ─── MATCH EVENT ────────────────────────────────────────────

export type MatchEventType = 'goal' | 'own_goal' | 'penalty' | 'yellow_card' | 'red_card' | 'substitution_in' | 'substitution_out' | 'var'

export interface MatchEvent {
  id: string
  match_id: string
  team_id: string
  player_id?: string
  event_type: MatchEventType
  minute?: number
  extra_time: boolean
  description?: string
  created_at: string
  // Joins opcionales
  player?: Player
  team?: Team
}

// ─── STANDING (TABLA DE POSICIONES) ─────────────────────────

export interface Standing {
  id: string
  team_id: string
  group_id: GroupId
  played: number
  wins: number
  draws: number
  losses: number
  goals_for: number
  goals_against: number
  goal_diff: number       // Calculado por DB
  points: number          // Calculado por DB
  qualified: boolean
  eliminated: boolean
  updated_at: string
  // Join
  team?: Team
}

// ─── GROUP (GRUPO) ───────────────────────────────────────────

export interface Group {
  id: GroupId
  teams: Team[]
  standings: Standing[]
  matches: Match[]
}

// ─── NEWS ────────────────────────────────────────────────────

export interface News {
  id: string
  slug: string
  title: string
  summary: string
  content: string
  image_url?: string
  category: NewsCategory
  author: string
  is_featured: boolean
  is_published: boolean
  views: number
  published_at: string
  created_at: string
  updated_at: string
}

// ─── PROFILE ────────────────────────────────────────────────

export interface Profile {
  id: string
  username: string
  display_name?: string
  avatar_url?: string
  is_admin: boolean
  created_at: string
  updated_at: string
}

// ─── QUINIELA ────────────────────────────────────────────────

export interface Quiniela {
  id: string
  slug: string
  name: string
  description?: string
  admin_id: string
  cost_mxn: number
  prize_type: QuinielaPrizeType
  prize_distribution?: {
    '1st': number
    '2nd': number
    '3rd': number
  }
  status: QuinielaStatus
  phase_included: MatchPhase[]
  points_exact: number
  points_winner: number
  registration_deadline?: string
  invite_code?: string
  max_participants?: number
  total_collected: number
  winner_user_id?: string
  created_at: string
  updated_at: string
  // Joins opcionales
  admin?: Profile
  participants_count?: number
}

// ─── QUINIELA PARTICIPANT ────────────────────────────────────

export interface QuinielaParticipant {
  id: string
  quiniela_id: string
  user_id: string
  paid: boolean
  paid_at?: string
  payment_method?: string
  payment_note?: string
  total_points: number
  exact_scores: number
  correct_outcomes: number
  rank?: number
  registered_at: string
  // Join
  profile?: Profile
}

// ─── QUINIELA PREDICTION ─────────────────────────────────────

export interface QuinielaPrediction {
  id: string
  quiniela_id: string
  user_id: string
  match_id: string
  home_goals: number
  away_goals: number
  points_earned: number
  is_exact: boolean
  is_correct: boolean
  locked: boolean
  submitted_at: string
  updated_at: string
  // Join
  match?: Match
}

// ─── LEADERBOARD ENTRY ───────────────────────────────────────

export interface LeaderboardEntry {
  rank: number
  user_id: string
  username: string
  display_name?: string
  avatar_url?: string
  total_points: number
  exact_scores: number
  correct_outcomes: number
  paid: boolean
}

// ─── TOURNAMENT STATS ────────────────────────────────────────

export interface TournamentStats {
  id: string
  team_id?: string
  player_id?: string
  goals: number
  assists: number
  yellow_cards: number
  red_cards: number
  matches_played: number
  minutes_played: number
  clean_sheets: number
  saves: number
  updated_at: string
  // Joins
  player?: Player
  team?: Team
}

// ─── BRACKET ────────────────────────────────────────────────

export interface BracketRound {
  phase: MatchPhase
  label: string
  matches: Match[]
}

// ─── FILTER TYPES ────────────────────────────────────────────

export interface MatchFilters {
  phase?: MatchPhase
  group_id?: GroupId
  status?: MatchStatus
  venue_id?: string
  team_id?: string
  date?: string           // 'YYYY-MM-DD'
}

export interface NewsFilters {
  category?: NewsCategory
  featured?: boolean
  page?: number
  limit?: number
}

// ─── FORM TYPES ──────────────────────────────────────────────

export interface CreateQuinielaForm {
  name: string
  description: string
  cost_mxn: number
  prize_type: QuinielaPrizeType
  prize_distribution?: { '1st': number; '2nd': number; '3rd': number }
  phase_included: MatchPhase[]
  points_exact: number
  points_winner: number
  registration_deadline?: string
  max_participants?: number
}

export interface PredictionInput {
  match_id: string
  home_goals: number
  away_goals: number
}

// ─── SUPABASE DATABASE TYPES ─────────────────────────────────
// Referencia de tipos de la base de datos (auto-generados por Supabase CLI)

export interface Database {
  public: {
    Tables: {
      venues: { Row: Venue; Insert: Omit<Venue, 'id' | 'created_at'>; Update: Partial<Venue> }
      teams: { Row: Team; Insert: Omit<Team, 'id' | 'created_at'>; Update: Partial<Team> }
      players: { Row: Player; Insert: Omit<Player, 'id' | 'created_at'>; Update: Partial<Player> }
      matches: { Row: Match; Insert: Omit<Match, 'id' | 'created_at' | 'updated_at'>; Update: Partial<Match> }
      standings: { Row: Standing; Insert: Omit<Standing, 'id' | 'goal_diff' | 'points'>; Update: Partial<Standing> }
      news: { Row: News; Insert: Omit<News, 'id' | 'created_at' | 'updated_at'>; Update: Partial<News> }
      profiles: { Row: Profile; Insert: Omit<Profile, 'created_at' | 'updated_at'>; Update: Partial<Profile> }
      quinielas: { Row: Quiniela; Insert: Omit<Quiniela, 'id' | 'created_at' | 'updated_at'>; Update: Partial<Quiniela> }
      quiniela_participants: { Row: QuinielaParticipant; Insert: Omit<QuinielaParticipant, 'id' | 'registered_at'>; Update: Partial<QuinielaParticipant> }
      quiniela_predictions: { Row: QuinielaPrediction; Insert: Omit<QuinielaPrediction, 'id' | 'submitted_at' | 'updated_at'>; Update: Partial<QuinielaPrediction> }
    }
    Functions: {
      get_quiniela_leaderboard: { Args: { p_quiniela_id: string }; Returns: LeaderboardEntry[] }
      get_user_prediction_progress: { Args: { p_quiniela_id: string; p_user_id: string }; Returns: { total_matches: number; predicted_matches: number; locked_matches: number; completion_pct: number }[] }
    }
  }
}
