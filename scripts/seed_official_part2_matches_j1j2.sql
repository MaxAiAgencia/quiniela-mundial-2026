-- ============================================================
-- FIFA WORLD CUP 2026 — PARTIDOS OFICIALES (PARTE 2: JORNADA 1 y 2)
-- Fuente: fifa.com/es/tournaments/mens/worldcup/canadamexicousa2026/scores-fixtures
-- Ejecutar DESPUÉS de part1_teams.sql
-- ============================================================

DO $$
DECLARE
    v_azteca  UUID := (SELECT id FROM venues WHERE slug = 'estadio-azteca');
    v_metlife UUID := (SELECT id FROM venues WHERE slug = 'metlife-stadium');
    v_sofi    UUID := (SELECT id FROM venues WHERE slug = 'sofi-stadium');
    v_akron   UUID := (SELECT id FROM venues WHERE slug = 'estadio-akron');
    v_bbva    UUID := (SELECT id FROM venues WHERE slug = 'estadio-bbva');
    v_att     UUID := (SELECT id FROM venues WHERE slug = 'att-stadium');
    v_bc      UUID := (SELECT id FROM venues WHERE slug = 'bc-place');
    v_bmo     UUID := (SELECT id FROM venues WHERE slug = 'bmo-field');
    v_lumen   UUID := (SELECT id FROM venues WHERE slug = 'lumen-field');
    v_levis   UUID := (SELECT id FROM venues WHERE slug = 'levis-stadium');
    v_arrow   UUID := (SELECT id FROM venues WHERE slug = 'arrowhead-stadium');
    v_philly  UUID := (SELECT id FROM venues WHERE slug = 'lincoln-financial');
    v_boston  UUID := (SELECT id FROM venues WHERE slug = 'gillette-stadium');
    v_miami   UUID := (SELECT id FROM venues WHERE slug = 'hard-rock-stadium');
    v_vegas   UUID := (SELECT id FROM venues WHERE slug = 'allegiant-stadium');
    v_houston UUID := (SELECT id FROM venues WHERE slug = 'nrg-stadium');
    v_atlanta UUID := (SELECT id FROM venues WHERE slug = 'mercedes-benz-stadium');

    -- Helper function para buscar team
    FUNCTION tid(s TEXT) RETURNS UUID AS 'SELECT id FROM teams WHERE slug = s' LANGUAGE sql;
BEGIN

-- ============================================================
-- JORNADA 1 (24 partidos — Jun 11 a 17)
-- ============================================================

-- Jun 11 — Día 1
INSERT INTO matches (match_number, phase, group_id, home_team_id, away_team_id, venue_id, scheduled_at, status) VALUES
(1, 'group', 'A', (SELECT id FROM teams WHERE slug='mexico'),      (SELECT id FROM teams WHERE slug='south-africa'),  v_azteca,  '2026-06-11 18:00:00+00', 'scheduled'),
(2, 'group', 'A', (SELECT id FROM teams WHERE slug='south-korea'),  (SELECT id FROM teams WHERE slug='czech-republic'),v_akron,   '2026-06-12 01:00:00+00', 'scheduled');

-- Jun 12 — Día 2
INSERT INTO matches (match_number, phase, group_id, home_team_id, away_team_id, venue_id, scheduled_at, status) VALUES
(3, 'group', 'B', (SELECT id FROM teams WHERE slug='canada'),       (SELECT id FROM teams WHERE slug='bosnia'),        v_bmo,     '2026-06-12 18:00:00+00', 'scheduled'),
(4, 'group', 'D', (SELECT id FROM teams WHERE slug='usa'),          (SELECT id FROM teams WHERE slug='paraguay'),      v_sofi,    '2026-06-13 00:00:00+00', 'scheduled');

-- Jun 13 — Día 3
INSERT INTO matches (match_number, phase, group_id, home_team_id, away_team_id, venue_id, scheduled_at, status) VALUES
(5, 'group', 'B', (SELECT id FROM teams WHERE slug='qatar'),        (SELECT id FROM teams WHERE slug='switzerland'),   v_levis,   '2026-06-13 18:00:00+00', 'scheduled'),
(6, 'group', 'C', (SELECT id FROM teams WHERE slug='brazil'),       (SELECT id FROM teams WHERE slug='morocco'),       v_metlife, '2026-06-13 21:00:00+00', 'scheduled'),
(7, 'group', 'C', (SELECT id FROM teams WHERE slug='haiti'),        (SELECT id FROM teams WHERE slug='scotland'),      v_boston,  '2026-06-14 00:00:00+00', 'scheduled'),
(8, 'group', 'D', (SELECT id FROM teams WHERE slug='australia'),    (SELECT id FROM teams WHERE slug='turkey'),        v_bc,      '2026-06-14 03:00:00+00', 'scheduled');

-- Jun 14 — Día 4
INSERT INTO matches (match_number, phase, group_id, home_team_id, away_team_id, venue_id, scheduled_at, status) VALUES
(9,  'group', 'E', (SELECT id FROM teams WHERE slug='germany'),     (SELECT id FROM teams WHERE slug='curacao'),       v_houston, '2026-06-14 16:00:00+00', 'scheduled'),
(10, 'group', 'F', (SELECT id FROM teams WHERE slug='netherlands'), (SELECT id FROM teams WHERE slug='japan'),         v_att,     '2026-06-14 19:00:00+00', 'scheduled'),
(11, 'group', 'E', (SELECT id FROM teams WHERE slug='ivory-coast'), (SELECT id FROM teams WHERE slug='ecuador'),       v_philly,  '2026-06-14 22:00:00+00', 'scheduled'),
(12, 'group', 'F', (SELECT id FROM teams WHERE slug='sweden'),      (SELECT id FROM teams WHERE slug='tunisia'),       v_bbva,    '2026-06-15 01:00:00+00', 'scheduled');

-- Jun 15 — Día 5
INSERT INTO matches (match_number, phase, group_id, home_team_id, away_team_id, venue_id, scheduled_at, status) VALUES
(13, 'group', 'H', (SELECT id FROM teams WHERE slug='spain'),       (SELECT id FROM teams WHERE slug='cape-verde'),    v_atlanta, '2026-06-15 15:00:00+00', 'scheduled'),
(14, 'group', 'G', (SELECT id FROM teams WHERE slug='belgium'),     (SELECT id FROM teams WHERE slug='egypt'),         v_lumen,   '2026-06-15 18:00:00+00', 'scheduled'),
(15, 'group', 'H', (SELECT id FROM teams WHERE slug='saudi-arabia'),(SELECT id FROM teams WHERE slug='uruguay'),       v_miami,   '2026-06-15 21:00:00+00', 'scheduled'),
(16, 'group', 'G', (SELECT id FROM teams WHERE slug='iran'),        (SELECT id FROM teams WHERE slug='new-zealand'),   v_sofi,    '2026-06-16 00:00:00+00', 'scheduled');

-- Jun 16 — Día 6
INSERT INTO matches (match_number, phase, group_id, home_team_id, away_team_id, venue_id, scheduled_at, status) VALUES
(17, 'group', 'I', (SELECT id FROM teams WHERE slug='france'),      (SELECT id FROM teams WHERE slug='senegal'),       v_metlife, '2026-06-16 18:00:00+00', 'scheduled'),
(18, 'group', 'I', (SELECT id FROM teams WHERE slug='iraq'),        (SELECT id FROM teams WHERE slug='norway'),        v_boston,  '2026-06-16 21:00:00+00', 'scheduled'),
(19, 'group', 'J', (SELECT id FROM teams WHERE slug='argentina'),   (SELECT id FROM teams WHERE slug='algeria'),       v_arrow,   '2026-06-17 00:00:00+00', 'scheduled'),
(20, 'group', 'J', (SELECT id FROM teams WHERE slug='austria'),     (SELECT id FROM teams WHERE slug='jordan'),        v_levis,   '2026-06-17 03:00:00+00', 'scheduled');

-- Jun 17 — Día 7
INSERT INTO matches (match_number, phase, group_id, home_team_id, away_team_id, venue_id, scheduled_at, status) VALUES
(21, 'group', 'K', (SELECT id FROM teams WHERE slug='portugal'),    (SELECT id FROM teams WHERE slug='dr-congo'),      v_houston, '2026-06-17 16:00:00+00', 'scheduled'),
(22, 'group', 'L', (SELECT id FROM teams WHERE slug='england'),     (SELECT id FROM teams WHERE slug='croatia'),       v_att,     '2026-06-17 19:00:00+00', 'scheduled'),
(23, 'group', 'L', (SELECT id FROM teams WHERE slug='ghana'),       (SELECT id FROM teams WHERE slug='panama'),        v_bmo,     '2026-06-17 22:00:00+00', 'scheduled'),
(24, 'group', 'K', (SELECT id FROM teams WHERE slug='uzbekistan'),  (SELECT id FROM teams WHERE slug='colombia'),      v_azteca,  '2026-06-18 01:00:00+00', 'scheduled');

-- ============================================================
-- JORNADA 2 (24 partidos — Jun 18 a 23)
-- Rotación FIFA: T1 vs T3, T4 vs T2
-- ============================================================

-- Jun 18 — Grupo A J2
INSERT INTO matches (match_number, phase, group_id, home_team_id, away_team_id, venue_id, scheduled_at, status) VALUES
(25, 'group', 'A', (SELECT id FROM teams WHERE slug='mexico'),      (SELECT id FROM teams WHERE slug='south-korea'),   v_azteca,  '2026-06-18 18:00:00+00', 'scheduled'),
(26, 'group', 'A', (SELECT id FROM teams WHERE slug='czech-republic'),(SELECT id FROM teams WHERE slug='south-africa'),v_akron,   '2026-06-18 21:00:00+00', 'scheduled');

-- Jun 19 — Grupo B, C J2
INSERT INTO matches (match_number, phase, group_id, home_team_id, away_team_id, venue_id, scheduled_at, status) VALUES
(27, 'group', 'B', (SELECT id FROM teams WHERE slug='canada'),      (SELECT id FROM teams WHERE slug='qatar'),         v_bmo,     '2026-06-19 18:00:00+00', 'scheduled'),
(28, 'group', 'B', (SELECT id FROM teams WHERE slug='switzerland'), (SELECT id FROM teams WHERE slug='bosnia'),        v_levis,   '2026-06-19 21:00:00+00', 'scheduled'),
(29, 'group', 'C', (SELECT id FROM teams WHERE slug='brazil'),      (SELECT id FROM teams WHERE slug='haiti'),         v_metlife, '2026-06-19 22:00:00+00', 'scheduled'),
(30, 'group', 'C', (SELECT id FROM teams WHERE slug='scotland'),    (SELECT id FROM teams WHERE slug='morocco'),       v_boston,  '2026-06-20 01:00:00+00', 'scheduled');

-- Jun 20 — Grupo D, E J2
INSERT INTO matches (match_number, phase, group_id, home_team_id, away_team_id, venue_id, scheduled_at, status) VALUES
(31, 'group', 'D', (SELECT id FROM teams WHERE slug='usa'),         (SELECT id FROM teams WHERE slug='australia'),     v_sofi,    '2026-06-20 18:00:00+00', 'scheduled'),
(32, 'group', 'D', (SELECT id FROM teams WHERE slug='turkey'),      (SELECT id FROM teams WHERE slug='paraguay'),      v_bc,      '2026-06-20 21:00:00+00', 'scheduled'),
(33, 'group', 'E', (SELECT id FROM teams WHERE slug='germany'),     (SELECT id FROM teams WHERE slug='ivory-coast'),   v_houston, '2026-06-20 22:00:00+00', 'scheduled'),
(34, 'group', 'E', (SELECT id FROM teams WHERE slug='ecuador'),     (SELECT id FROM teams WHERE slug='curacao'),       v_philly,  '2026-06-21 01:00:00+00', 'scheduled');

-- Jun 21 — Grupo F, G, H J2
INSERT INTO matches (match_number, phase, group_id, home_team_id, away_team_id, venue_id, scheduled_at, status) VALUES
(35, 'group', 'F', (SELECT id FROM teams WHERE slug='netherlands'), (SELECT id FROM teams WHERE slug='sweden'),        v_att,     '2026-06-21 18:00:00+00', 'scheduled'),
(36, 'group', 'F', (SELECT id FROM teams WHERE slug='tunisia'),     (SELECT id FROM teams WHERE slug='japan'),         v_bbva,    '2026-06-21 21:00:00+00', 'scheduled'),
(37, 'group', 'G', (SELECT id FROM teams WHERE slug='belgium'),     (SELECT id FROM teams WHERE slug='iran'),          v_lumen,   '2026-06-21 22:00:00+00', 'scheduled'),
(38, 'group', 'G', (SELECT id FROM teams WHERE slug='new-zealand'), (SELECT id FROM teams WHERE slug='egypt'),         v_sofi,    '2026-06-22 01:00:00+00', 'scheduled'),
(39, 'group', 'H', (SELECT id FROM teams WHERE slug='spain'),       (SELECT id FROM teams WHERE slug='saudi-arabia'),  v_atlanta, '2026-06-21 19:00:00+00', 'scheduled'),
(40, 'group', 'H', (SELECT id FROM teams WHERE slug='uruguay'),     (SELECT id FROM teams WHERE slug='cape-verde'),    v_miami,   '2026-06-21 22:00:00+00', 'scheduled');

-- Jun 22 — Grupo I, J J2
INSERT INTO matches (match_number, phase, group_id, home_team_id, away_team_id, venue_id, scheduled_at, status) VALUES
(41, 'group', 'I', (SELECT id FROM teams WHERE slug='france'),      (SELECT id FROM teams WHERE slug='iraq'),          v_metlife, '2026-06-22 18:00:00+00', 'scheduled'),
(42, 'group', 'I', (SELECT id FROM teams WHERE slug='norway'),      (SELECT id FROM teams WHERE slug='senegal'),       v_boston,  '2026-06-22 21:00:00+00', 'scheduled'),
(43, 'group', 'J', (SELECT id FROM teams WHERE slug='argentina'),   (SELECT id FROM teams WHERE slug='austria'),       v_arrow,   '2026-06-22 22:00:00+00', 'scheduled'),
(44, 'group', 'J', (SELECT id FROM teams WHERE slug='jordan'),      (SELECT id FROM teams WHERE slug='algeria'),       v_levis,   '2026-06-23 01:00:00+00', 'scheduled');

-- Jun 23 — Grupo K, L J2
INSERT INTO matches (match_number, phase, group_id, home_team_id, away_team_id, venue_id, scheduled_at, status) VALUES
(45, 'group', 'K', (SELECT id FROM teams WHERE slug='portugal'),    (SELECT id FROM teams WHERE slug='uzbekistan'),    v_houston, '2026-06-23 18:00:00+00', 'scheduled'),
(46, 'group', 'K', (SELECT id FROM teams WHERE slug='colombia'),    (SELECT id FROM teams WHERE slug='dr-congo'),      v_azteca,  '2026-06-23 21:00:00+00', 'scheduled'),
(47, 'group', 'L', (SELECT id FROM teams WHERE slug='england'),     (SELECT id FROM teams WHERE slug='ghana'),         v_att,     '2026-06-23 22:00:00+00', 'scheduled'),
(48, 'group', 'L', (SELECT id FROM teams WHERE slug='panama'),      (SELECT id FROM teams WHERE slug='croatia'),       v_bmo,     '2026-06-24 01:00:00+00', 'scheduled');

END $$;
