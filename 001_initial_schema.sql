-- ============================================================
-- FIFA WORLD CUP 2026 — SCHEMA COMPLETO DE SUPABASE
-- Archivo: supabase/migrations/001_initial_schema.sql
-- Ejecutar en: Supabase SQL Editor
-- ============================================================

-- Habilitar extensiones necesarias
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm"; -- Para búsquedas de texto

-- ============================================================
-- ENUMS
-- ============================================================

CREATE TYPE match_status AS ENUM ('scheduled', 'live', 'finished', 'postponed');
CREATE TYPE match_phase AS ENUM ('group', 'round_of_16', 'quarterfinal', 'semifinal', 'third_place', 'final');
CREATE TYPE confederation AS ENUM ('UEFA', 'CONMEBOL', 'CONCACAF', 'CAF', 'AFC', 'OFC');
CREATE TYPE player_position AS ENUM ('GK', 'DF', 'MF', 'FW');
CREATE TYPE news_category AS ENUM ('resultados', 'lesiones', 'convocatorias', 'curiosidades', 'historia', 'general');
CREATE TYPE quiniela_status AS ENUM ('draft', 'open', 'in_progress', 'closed', 'finished');
CREATE TYPE quiniela_prize_type AS ENUM ('winner_takes_all', 'top3', 'custom');
CREATE TYPE country AS ENUM ('USA', 'MEX', 'CAN');

-- ============================================================
-- TABLA: venues (Sedes / Estadios)
-- ============================================================

CREATE TABLE venues (
  id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug         TEXT UNIQUE NOT NULL,
  name         TEXT NOT NULL,
  city         TEXT NOT NULL,
  country      country NOT NULL,
  capacity     INTEGER NOT NULL,
  latitude     DECIMAL(10, 7),
  longitude    DECIMAL(10, 7),
  image_url    TEXT,
  description  TEXT,
  is_final     BOOLEAN DEFAULT FALSE,    -- MetLife = true
  is_inaugural BOOLEAN DEFAULT FALSE,    -- Azteca = true
  created_at   TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- TABLA: teams (Equipos / Selecciones)
-- ============================================================

CREATE TABLE teams (
  id                  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug                TEXT UNIQUE NOT NULL,         -- 'mexico', 'brazil', etc.
  name                TEXT NOT NULL,                -- 'México'
  name_en             TEXT NOT NULL,                -- 'Mexico'
  country_code        CHAR(3) NOT NULL,             -- 'MEX', 'BRA'
  confederation       confederation NOT NULL,
  group_id            TEXT,                         -- 'A', 'B', ... 'L'
  kit_sponsor         TEXT,                         -- 'Adidas', 'Nike', 'Puma'
  coach               TEXT,
  fifa_ranking        INTEGER,
  world_cups          INTEGER DEFAULT 0,            -- Veces que ha participado
  best_result         TEXT,                         -- 'Campeón 1970', 'Cuartos 2022'
  flag_url            TEXT,
  shield_url          TEXT,
  primary_color       CHAR(7),                      -- '#006847'
  secondary_color     CHAR(7),                      -- '#FFFFFF'
  is_host             BOOLEAN DEFAULT FALSE,
  created_at          TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- TABLA: players (Plantillas)
-- ============================================================

CREATE TABLE players (
  id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  team_id      UUID NOT NULL REFERENCES teams(id) ON DELETE CASCADE,
  jersey_number INTEGER,
  name         TEXT NOT NULL,
  position     player_position NOT NULL,
  club         TEXT,
  nationality  TEXT,
  birth_date   DATE,
  photo_url    TEXT,
  caps         INTEGER DEFAULT 0,      -- Partidos con selección
  goals        INTEGER DEFAULT 0,      -- Goles con selección
  is_captain   BOOLEAN DEFAULT FALSE,
  created_at   TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- TABLA: matches (Partidos)
-- ============================================================

CREATE TABLE matches (
  id               UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  match_number     INTEGER UNIQUE NOT NULL,       -- 1 al 104
  phase            match_phase NOT NULL,
  group_id         TEXT,                          -- 'A'-'L', null en eliminatorias
  home_team_id     UUID REFERENCES teams(id),
  away_team_id     UUID REFERENCES teams(id),
  venue_id         UUID NOT NULL REFERENCES venues(id),
  scheduled_at     TIMESTAMPTZ NOT NULL,
  status           match_status DEFAULT 'scheduled',
  home_goals       INTEGER,
  away_goals       INTEGER,
  home_goals_et    INTEGER,                       -- Tiempo extra
  away_goals_et    INTEGER,
  home_penalties   INTEGER,                       -- Penales
  away_penalties   INTEGER,
  winner_team_id   UUID REFERENCES teams(id),
  attendance       INTEGER,
  referee          TEXT,
  notes            TEXT,
  created_at       TIMESTAMPTZ DEFAULT NOW(),
  updated_at       TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- TABLA: match_events (Goles, tarjetas, cambios)
-- ============================================================

CREATE TABLE match_events (
  id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  match_id     UUID NOT NULL REFERENCES matches(id) ON DELETE CASCADE,
  team_id      UUID NOT NULL REFERENCES teams(id),
  player_id    UUID REFERENCES players(id),
  event_type   TEXT NOT NULL CHECK (event_type IN ('goal', 'own_goal', 'penalty', 'yellow_card', 'red_card', 'substitution_in', 'substitution_out', 'var')),
  minute       INTEGER,
  extra_time   BOOLEAN DEFAULT FALSE,
  description  TEXT,
  created_at   TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- TABLA: standings (Tabla de posiciones por grupo)
-- Se actualiza automáticamente con triggers
-- ============================================================

CREATE TABLE standings (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  team_id         UUID NOT NULL REFERENCES teams(id) ON DELETE CASCADE,
  group_id        TEXT NOT NULL,
  played          INTEGER DEFAULT 0,
  wins            INTEGER DEFAULT 0,
  draws           INTEGER DEFAULT 0,
  losses          INTEGER DEFAULT 0,
  goals_for       INTEGER DEFAULT 0,
  goals_against   INTEGER DEFAULT 0,
  goal_diff       INTEGER GENERATED ALWAYS AS (goals_for - goals_against) STORED,
  points          INTEGER GENERATED ALWAYS AS (wins * 3 + draws) STORED,
  qualified        BOOLEAN DEFAULT FALSE,  -- Clasificó a octavos
  eliminated       BOOLEAN DEFAULT FALSE,
  updated_at       TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(team_id, group_id)
);

-- ============================================================
-- TABLA: tournament_stats (Estadísticas del torneo)
-- ============================================================

CREATE TABLE tournament_stats (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  team_id       UUID REFERENCES teams(id),
  player_id     UUID REFERENCES players(id),
  goals         INTEGER DEFAULT 0,
  assists       INTEGER DEFAULT 0,
  yellow_cards  INTEGER DEFAULT 0,
  red_cards     INTEGER DEFAULT 0,
  matches_played INTEGER DEFAULT 0,
  minutes_played INTEGER DEFAULT 0,
  clean_sheets  INTEGER DEFAULT 0,      -- Para porteros
  saves         INTEGER DEFAULT 0,      -- Para porteros
  updated_at    TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- TABLA: news (Noticias)
-- ============================================================

CREATE TABLE news (
  id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug         TEXT UNIQUE NOT NULL,
  title        TEXT NOT NULL,
  summary      TEXT NOT NULL,
  content      TEXT NOT NULL,
  image_url    TEXT,
  category     news_category NOT NULL DEFAULT 'general',
  author       TEXT DEFAULT 'Redacción',
  is_featured  BOOLEAN DEFAULT FALSE,
  is_published BOOLEAN DEFAULT TRUE,
  views        INTEGER DEFAULT 0,
  published_at TIMESTAMPTZ DEFAULT NOW(),
  created_at   TIMESTAMPTZ DEFAULT NOW(),
  updated_at   TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- TABLA: profiles (Perfiles de usuario — extiende auth.users)
-- ============================================================

CREATE TABLE profiles (
  id           UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username     TEXT UNIQUE NOT NULL,
  display_name TEXT,
  avatar_url   TEXT,
  is_admin     BOOLEAN DEFAULT FALSE,
  created_at   TIMESTAMPTZ DEFAULT NOW(),
  updated_at   TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- TABLA: quinielas
-- ============================================================

CREATE TABLE quinielas (
  id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug              TEXT UNIQUE NOT NULL,
  name              TEXT NOT NULL,
  description       TEXT,
  admin_id          UUID NOT NULL REFERENCES profiles(id),
  cost_mxn          DECIMAL(10, 2) NOT NULL DEFAULT 100.00,
  prize_type        quiniela_prize_type DEFAULT 'winner_takes_all',
  prize_distribution JSONB,   -- { "1st": 60, "2nd": 30, "3rd": 10 } para top3
  status            quiniela_status DEFAULT 'draft',
  phase_included    TEXT[] DEFAULT ARRAY['group'],  -- ['group', 'knockout']
  points_exact      INTEGER DEFAULT 3,    -- Puntos por marcador exacto
  points_winner     INTEGER DEFAULT 1,    -- Puntos por acertar ganador/empate
  registration_deadline TIMESTAMPTZ,
  invite_code       TEXT UNIQUE,          -- Código corto para compartir
  max_participants  INTEGER,              -- NULL = sin límite
  total_collected   DECIMAL(10, 2) DEFAULT 0.00,
  winner_user_id    UUID REFERENCES profiles(id),
  created_at        TIMESTAMPTZ DEFAULT NOW(),
  updated_at        TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- TABLA: quiniela_participants (Participantes por quiniela)
-- ============================================================

CREATE TABLE quiniela_participants (
  id               UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  quiniela_id      UUID NOT NULL REFERENCES quinielas(id) ON DELETE CASCADE,
  user_id          UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  paid             BOOLEAN DEFAULT FALSE,
  paid_at          TIMESTAMPTZ,
  payment_method   TEXT,           -- 'efectivo', 'transferencia', 'oxxo'
  payment_note     TEXT,           -- Nota del admin para confirmar pago
  total_points     INTEGER DEFAULT 0,
  exact_scores     INTEGER DEFAULT 0,
  correct_outcomes INTEGER DEFAULT 0,
  rank             INTEGER,        -- Se calcula al actualizar puntos
  registered_at    TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(quiniela_id, user_id)
);

-- ============================================================
-- TABLA: quiniela_predictions (Predicciones individuales)
-- ============================================================

CREATE TABLE quiniela_predictions (
  id               UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  quiniela_id      UUID NOT NULL REFERENCES quinielas(id) ON DELETE CASCADE,
  user_id          UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  match_id         UUID NOT NULL REFERENCES matches(id) ON DELETE CASCADE,
  home_goals       INTEGER NOT NULL CHECK (home_goals >= 0 AND home_goals <= 30),
  away_goals       INTEGER NOT NULL CHECK (away_goals >= 0 AND away_goals <= 30),
  points_earned    INTEGER DEFAULT 0,     -- Se calcula al ingresar resultado
  is_exact         BOOLEAN DEFAULT FALSE, -- Marcador exacto
  is_correct       BOOLEAN DEFAULT FALSE, -- Solo acertó ganador/empate
  locked           BOOLEAN DEFAULT FALSE, -- TRUE cuando el partido inicia (no editable)
  submitted_at     TIMESTAMPTZ DEFAULT NOW(),
  updated_at       TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(quiniela_id, user_id, match_id)
);

-- ============================================================
-- TABLA: quiniela_messages (Chat opcional dentro de quiniela)
-- ============================================================

CREATE TABLE quiniela_messages (
  id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  quiniela_id  UUID NOT NULL REFERENCES quinielas(id) ON DELETE CASCADE,
  user_id      UUID NOT NULL REFERENCES profiles(id),
  message      TEXT NOT NULL,
  created_at   TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- ÍNDICES
-- ============================================================

CREATE INDEX idx_matches_phase ON matches(phase);
CREATE INDEX idx_matches_status ON matches(status);
CREATE INDEX idx_matches_scheduled ON matches(scheduled_at);
CREATE INDEX idx_matches_group ON matches(group_id);
CREATE INDEX idx_matches_home ON matches(home_team_id);
CREATE INDEX idx_matches_away ON matches(away_team_id);
CREATE INDEX idx_standings_group ON standings(group_id);
CREATE INDEX idx_standings_points ON standings(points DESC, goal_diff DESC);
CREATE INDEX idx_players_team ON players(team_id);
CREATE INDEX idx_players_position ON players(position);
CREATE INDEX idx_news_category ON news(category);
CREATE INDEX idx_news_published ON news(published_at DESC);
CREATE INDEX idx_predictions_quiniela ON quiniela_predictions(quiniela_id);
CREATE INDEX idx_predictions_user ON quiniela_predictions(user_id);
CREATE INDEX idx_participants_quiniela ON quiniela_participants(quiniela_id);
CREATE INDEX idx_participants_rank ON quiniela_participants(quiniela_id, total_points DESC);

-- ============================================================
-- TRIGGER: auto-crear profile al registrarse
-- ============================================================

CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, username, display_name, avatar_url)
  VALUES (
    NEW.id,
    COALESCE(
      NEW.raw_user_meta_data->>'username',
      SPLIT_PART(NEW.email, '@', 1) || '_' || FLOOR(RANDOM() * 9000 + 1000)::TEXT
    ),
    COALESCE(NEW.raw_user_meta_data->>'full_name', SPLIT_PART(NEW.email, '@', 1)),
    NEW.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- ============================================================
-- TRIGGER: actualizar standings cuando hay resultado de partido
-- ============================================================

CREATE OR REPLACE FUNCTION update_standings_on_result()
RETURNS TRIGGER AS $$
DECLARE
  home_pts INTEGER;
  away_pts INTEGER;
BEGIN
  -- Solo actuar si el partido terminó Y es de fase de grupos
  IF NEW.status = 'finished' AND NEW.phase = 'group' AND NEW.home_goals IS NOT NULL THEN

    -- Calcular puntos
    IF NEW.home_goals > NEW.away_goals THEN
      home_pts := 3; away_pts := 0;
    ELSIF NEW.home_goals = NEW.away_goals THEN
      home_pts := 1; away_pts := 1;
    ELSE
      home_pts := 0; away_pts := 3;
    END IF;

    -- Actualizar equipo local
    INSERT INTO standings (team_id, group_id, played, wins, draws, losses, goals_for, goals_against)
    VALUES (
      NEW.home_team_id, NEW.group_id, 1,
      CASE WHEN home_pts = 3 THEN 1 ELSE 0 END,
      CASE WHEN home_pts = 1 THEN 1 ELSE 0 END,
      CASE WHEN home_pts = 0 THEN 1 ELSE 0 END,
      NEW.home_goals, NEW.away_goals
    )
    ON CONFLICT (team_id, group_id) DO UPDATE SET
      played        = standings.played + 1,
      wins          = standings.wins + CASE WHEN home_pts = 3 THEN 1 ELSE 0 END,
      draws         = standings.draws + CASE WHEN home_pts = 1 THEN 1 ELSE 0 END,
      losses        = standings.losses + CASE WHEN home_pts = 0 THEN 1 ELSE 0 END,
      goals_for     = standings.goals_for + NEW.home_goals,
      goals_against = standings.goals_against + NEW.away_goals,
      updated_at    = NOW();

    -- Actualizar equipo visitante
    INSERT INTO standings (team_id, group_id, played, wins, draws, losses, goals_for, goals_against)
    VALUES (
      NEW.away_team_id, NEW.group_id, 1,
      CASE WHEN away_pts = 3 THEN 1 ELSE 0 END,
      CASE WHEN away_pts = 1 THEN 1 ELSE 0 END,
      CASE WHEN away_pts = 0 THEN 1 ELSE 0 END,
      NEW.away_goals, NEW.home_goals
    )
    ON CONFLICT (team_id, group_id) DO UPDATE SET
      played        = standings.played + 1,
      wins          = standings.wins + CASE WHEN away_pts = 3 THEN 1 ELSE 0 END,
      draws         = standings.draws + CASE WHEN away_pts = 1 THEN 1 ELSE 0 END,
      losses        = standings.losses + CASE WHEN away_pts = 0 THEN 1 ELSE 0 END,
      goals_for     = standings.goals_for + NEW.away_goals,
      goals_against = standings.goals_against + NEW.home_goals,
      updated_at    = NOW();
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_match_result_update
  AFTER UPDATE ON matches
  FOR EACH ROW
  WHEN (OLD.status IS DISTINCT FROM NEW.status OR OLD.home_goals IS DISTINCT FROM NEW.home_goals)
  EXECUTE FUNCTION update_standings_on_result();

-- ============================================================
-- TRIGGER: calcular puntos de quiniela cuando hay resultado
-- ============================================================

CREATE OR REPLACE FUNCTION calculate_quiniela_points()
RETURNS TRIGGER AS $$
DECLARE
  q RECORD;
  pts_exact INTEGER;
  pts_winner INTEGER;
  pred_winner TEXT;
  real_winner TEXT;
BEGIN
  IF NEW.status = 'finished' AND NEW.home_goals IS NOT NULL THEN

    -- Para cada quiniela que incluye este partido
    FOR q IN
      SELECT qp.*, qui.points_exact, qui.points_winner
      FROM quiniela_predictions qp
      JOIN quinielas qui ON qui.id = qp.quiniela_id
      WHERE qp.match_id = NEW.id AND NOT qp.locked
    LOOP
      pts_exact := 0;
      pts_winner := 0;

      -- Determinar ganador real
      IF NEW.home_goals > NEW.away_goals THEN real_winner := 'home';
      ELSIF NEW.home_goals < NEW.away_goals THEN real_winner := 'away';
      ELSE real_winner := 'draw';
      END IF;

      -- Determinar ganador predicho
      IF q.home_goals > q.away_goals THEN pred_winner := 'home';
      ELSIF q.home_goals < q.away_goals THEN pred_winner := 'away';
      ELSE pred_winner := 'draw';
      END IF;

      -- Marcador exacto
      IF q.home_goals = NEW.home_goals AND q.away_goals = NEW.away_goals THEN
        pts_exact := q.points_exact;
        UPDATE quiniela_predictions SET
          points_earned = pts_exact,
          is_exact = TRUE,
          is_correct = TRUE,
          locked = TRUE,
          updated_at = NOW()
        WHERE id = q.id;
      -- Solo ganador/empate
      ELSIF pred_winner = real_winner THEN
        pts_winner := q.points_winner;
        UPDATE quiniela_predictions SET
          points_earned = pts_winner,
          is_exact = FALSE,
          is_correct = TRUE,
          locked = TRUE,
          updated_at = NOW()
        WHERE id = q.id;
      -- Error total
      ELSE
        UPDATE quiniela_predictions SET
          points_earned = 0,
          is_exact = FALSE,
          is_correct = FALSE,
          locked = TRUE,
          updated_at = NOW()
        WHERE id = q.id;
      END IF;
    END LOOP;

    -- Recalcular totales por participante para todas las quinielas afectadas
    UPDATE quiniela_participants qpart
    SET
      total_points = (
        SELECT COALESCE(SUM(points_earned), 0)
        FROM quiniela_predictions
        WHERE quiniela_id = qpart.quiniela_id AND user_id = qpart.user_id
      ),
      exact_scores = (
        SELECT COUNT(*) FROM quiniela_predictions
        WHERE quiniela_id = qpart.quiniela_id AND user_id = qpart.user_id AND is_exact = TRUE
      ),
      correct_outcomes = (
        SELECT COUNT(*) FROM quiniela_predictions
        WHERE quiniela_id = qpart.quiniela_id AND user_id = qpart.user_id AND is_correct = TRUE
      )
    WHERE qpart.quiniela_id IN (
      SELECT DISTINCT quiniela_id FROM quiniela_predictions WHERE match_id = NEW.id
    );

    -- Actualizar rankings dentro de cada quiniela
    UPDATE quiniela_participants qp1
    SET rank = (
      SELECT COUNT(*) + 1
      FROM quiniela_participants qp2
      WHERE qp2.quiniela_id = qp1.quiniela_id
        AND (qp2.total_points > qp1.total_points
          OR (qp2.total_points = qp1.total_points AND qp2.exact_scores > qp1.exact_scores))
    )
    WHERE qp1.quiniela_id IN (
      SELECT DISTINCT quiniela_id FROM quiniela_predictions WHERE match_id = NEW.id
    );
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_match_result_quiniela
  AFTER UPDATE ON matches
  FOR EACH ROW
  WHEN (OLD.status IS DISTINCT FROM NEW.status OR OLD.home_goals IS DISTINCT FROM NEW.home_goals)
  EXECUTE FUNCTION calculate_quiniela_points();

-- ============================================================
-- TRIGGER: bloquear predicciones cuando inicia el partido
-- ============================================================

CREATE OR REPLACE FUNCTION lock_predictions_on_kickoff()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.status = 'live' AND OLD.status = 'scheduled' THEN
    UPDATE quiniela_predictions
    SET locked = TRUE, updated_at = NOW()
    WHERE match_id = NEW.id AND locked = FALSE;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_match_kickoff
  AFTER UPDATE ON matches
  FOR EACH ROW
  WHEN (OLD.status = 'scheduled' AND NEW.status = 'live')
  EXECUTE FUNCTION lock_predictions_on_kickoff();

-- ============================================================
-- TRIGGER: actualizar updated_at automáticamente
-- ============================================================

CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_updated_at_matches
  BEFORE UPDATE ON matches FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER set_updated_at_quinielas
  BEFORE UPDATE ON quinielas FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER set_updated_at_news
  BEFORE UPDATE ON news FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER set_updated_at_profiles
  BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================================
-- FUNCIÓN: obtener leaderboard de una quiniela
-- ============================================================

CREATE OR REPLACE FUNCTION get_quiniela_leaderboard(p_quiniela_id UUID)
RETURNS TABLE (
  rank          INTEGER,
  user_id       UUID,
  username      TEXT,
  display_name  TEXT,
  avatar_url    TEXT,
  total_points  INTEGER,
  exact_scores  INTEGER,
  correct_outcomes INTEGER,
  paid          BOOLEAN
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    qp.rank,
    qp.user_id,
    pr.username,
    pr.display_name,
    pr.avatar_url,
    qp.total_points,
    qp.exact_scores,
    qp.correct_outcomes,
    qp.paid
  FROM quiniela_participants qp
  JOIN profiles pr ON pr.id = qp.user_id
  WHERE qp.quiniela_id = p_quiniela_id
  ORDER BY qp.total_points DESC, qp.exact_scores DESC, qp.registered_at ASC;
END;
$$ LANGUAGE plpgsql;

-- ============================================================
-- FUNCIÓN: obtener progreso de predicciones del usuario
-- ============================================================

CREATE OR REPLACE FUNCTION get_user_prediction_progress(p_quiniela_id UUID, p_user_id UUID)
RETURNS TABLE (
  total_matches     BIGINT,
  predicted_matches BIGINT,
  locked_matches    BIGINT,
  completion_pct    NUMERIC
) AS $$
BEGIN
  RETURN QUERY
  WITH total AS (
    SELECT COUNT(*) as cnt
    FROM matches m
    JOIN quinielas q ON q.id = p_quiniela_id
    WHERE m.phase = ANY(
      ARRAY(SELECT unnest(q.phase_included)::match_phase)
    )
  ),
  predicted AS (
    SELECT COUNT(*) as cnt
    FROM quiniela_predictions
    WHERE quiniela_id = p_quiniela_id AND user_id = p_user_id
  ),
  locked_cnt AS (
    SELECT COUNT(*) as cnt
    FROM quiniela_predictions
    WHERE quiniela_id = p_quiniela_id AND user_id = p_user_id AND locked = TRUE
  )
  SELECT
    t.cnt as total_matches,
    p.cnt as predicted_matches,
    l.cnt as locked_matches,
    CASE WHEN t.cnt > 0 THEN ROUND((p.cnt::NUMERIC / t.cnt) * 100, 1) ELSE 0 END
  FROM total t, predicted p, locked_cnt l;
END;
$$ LANGUAGE plpgsql;

-- ============================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE quinielas ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiniela_participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiniela_predictions ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiniela_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE news ENABLE ROW LEVEL SECURITY;
ALTER TABLE matches ENABLE ROW LEVEL SECURITY;
ALTER TABLE teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE venues ENABLE ROW LEVEL SECURITY;
ALTER TABLE standings ENABLE ROW LEVEL SECURITY;
ALTER TABLE players ENABLE ROW LEVEL SECURITY;
ALTER TABLE match_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE tournament_stats ENABLE ROW LEVEL SECURITY;

-- Datos públicos: todos pueden leer
CREATE POLICY "public_read_teams"       ON teams       FOR SELECT USING (TRUE);
CREATE POLICY "public_read_venues"      ON venues      FOR SELECT USING (TRUE);
CREATE POLICY "public_read_matches"     ON matches     FOR SELECT USING (TRUE);
CREATE POLICY "public_read_standings"   ON standings   FOR SELECT USING (TRUE);
CREATE POLICY "public_read_players"     ON players     FOR SELECT USING (TRUE);
CREATE POLICY "public_read_events"      ON match_events FOR SELECT USING (TRUE);
CREATE POLICY "public_read_stats"       ON tournament_stats FOR SELECT USING (TRUE);
CREATE POLICY "public_read_news"        ON news        FOR SELECT USING (is_published = TRUE);

-- Profiles: cada usuario ve/edita el suyo, admins ven todo
CREATE POLICY "profiles_select"  ON profiles FOR SELECT USING (TRUE);
CREATE POLICY "profiles_update"  ON profiles FOR UPDATE USING (auth.uid() = id);

-- Quinielas: lectura pública, escritura solo al admin
CREATE POLICY "quinielas_select"  ON quinielas FOR SELECT USING (TRUE);
CREATE POLICY "quinielas_insert"  ON quinielas FOR INSERT WITH CHECK (auth.uid() = admin_id);
CREATE POLICY "quinielas_update"  ON quinielas FOR UPDATE USING (
  auth.uid() = admin_id OR
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = TRUE)
);

-- Participantes: ver todos de la quiniela si eres participante o admin
CREATE POLICY "participants_select" ON quiniela_participants FOR SELECT USING (
  quiniela_id IN (
    SELECT quiniela_id FROM quiniela_participants WHERE user_id = auth.uid()
  ) OR
  quiniela_id IN (
    SELECT id FROM quinielas WHERE admin_id = auth.uid()
  )
);
CREATE POLICY "participants_insert" ON quiniela_participants FOR INSERT WITH CHECK (
  auth.uid() = user_id
);
CREATE POLICY "participants_update" ON quiniela_participants FOR UPDATE USING (
  quiniela_id IN (SELECT id FROM quinielas WHERE admin_id = auth.uid()) OR
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = TRUE)
);

-- Predicciones: solo el dueño puede ver/editar las suyas (hasta que el partido empiece)
CREATE POLICY "predictions_select" ON quiniela_predictions FOR SELECT USING (
  user_id = auth.uid() OR
  quiniela_id IN (SELECT id FROM quinielas WHERE admin_id = auth.uid())
);
CREATE POLICY "predictions_insert" ON quiniela_predictions FOR INSERT WITH CHECK (
  auth.uid() = user_id AND
  EXISTS (
    SELECT 1 FROM quiniela_participants
    WHERE quiniela_id = quiniela_predictions.quiniela_id
      AND user_id = auth.uid()
      AND paid = TRUE
  )
);
CREATE POLICY "predictions_update" ON quiniela_predictions FOR UPDATE USING (
  auth.uid() = user_id AND locked = FALSE
);

-- Mensajes de quiniela
CREATE POLICY "messages_select" ON quiniela_messages FOR SELECT USING (
  quiniela_id IN (
    SELECT quiniela_id FROM quiniela_participants WHERE user_id = auth.uid()
  )
);
CREATE POLICY "messages_insert" ON quiniela_messages FOR INSERT WITH CHECK (
  auth.uid() = user_id AND
  quiniela_id IN (
    SELECT quiniela_id FROM quiniela_participants WHERE user_id = auth.uid()
  )
);

-- Admin puede modificar todo
CREATE POLICY "admin_all_matches"   ON matches    FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = TRUE)
);
CREATE POLICY "admin_all_news"      ON news       FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = TRUE)
);
CREATE POLICY "admin_all_teams"     ON teams      FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = TRUE)
);
CREATE POLICY "admin_all_players"   ON players    FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = TRUE)
);
CREATE POLICY "admin_all_events"    ON match_events FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = TRUE)
);

-- ============================================================
-- HABILITAR REALTIME para las tablas que lo necesitan
-- ============================================================

ALTER PUBLICATION supabase_realtime ADD TABLE matches;
ALTER PUBLICATION supabase_realtime ADD TABLE standings;
ALTER PUBLICATION supabase_realtime ADD TABLE quiniela_participants;
ALTER PUBLICATION supabase_realtime ADD TABLE quiniela_predictions;
ALTER PUBLICATION supabase_realtime ADD TABLE quiniela_messages;
ALTER PUBLICATION supabase_realtime ADD TABLE news;
