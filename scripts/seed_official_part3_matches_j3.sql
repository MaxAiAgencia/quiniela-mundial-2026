-- ============================================================
-- FIFA WORLD CUP 2026 — PARTIDOS OFICIALES (PARTE 3: JORNADA 3)
-- Ejecutar DESPUÉS de part2
-- Jornada 3: Partidos simultáneos por grupo
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
BEGIN

-- ============================================================
-- JORNADA 3 (24 partidos — Jun 25 a 28)
-- Rotación FIFA: T4 vs T1, T2 vs T3 (SIMULTÁNEOS)
-- ============================================================

-- Jun 25 — Grupo A J3
INSERT INTO matches (match_number, phase, group_id, home_team_id, away_team_id, venue_id, scheduled_at, status) VALUES
(49, 'group', 'A', (SELECT id FROM teams WHERE slug='czech-republic'),(SELECT id FROM teams WHERE slug='mexico'),      v_akron,   '2026-06-25 21:00:00+00', 'scheduled'),
(50, 'group', 'A', (SELECT id FROM teams WHERE slug='south-africa'),  (SELECT id FROM teams WHERE slug='south-korea'), v_azteca,  '2026-06-25 21:00:00+00', 'scheduled');

-- Jun 25 — Grupo B J3
INSERT INTO matches (match_number, phase, group_id, home_team_id, away_team_id, venue_id, scheduled_at, status) VALUES
(51, 'group', 'B', (SELECT id FROM teams WHERE slug='switzerland'),   (SELECT id FROM teams WHERE slug='canada'),      v_levis,   '2026-06-26 00:00:00+00', 'scheduled'),
(52, 'group', 'B', (SELECT id FROM teams WHERE slug='bosnia'),        (SELECT id FROM teams WHERE slug='qatar'),       v_bmo,     '2026-06-26 00:00:00+00', 'scheduled');

-- Jun 26 — Grupo C J3
INSERT INTO matches (match_number, phase, group_id, home_team_id, away_team_id, venue_id, scheduled_at, status) VALUES
(53, 'group', 'C', (SELECT id FROM teams WHERE slug='scotland'),      (SELECT id FROM teams WHERE slug='brazil'),      v_boston,  '2026-06-26 21:00:00+00', 'scheduled'),
(54, 'group', 'C', (SELECT id FROM teams WHERE slug='morocco'),       (SELECT id FROM teams WHERE slug='haiti'),       v_metlife, '2026-06-26 21:00:00+00', 'scheduled');

-- Jun 26 — Grupo D J3
INSERT INTO matches (match_number, phase, group_id, home_team_id, away_team_id, venue_id, scheduled_at, status) VALUES
(55, 'group', 'D', (SELECT id FROM teams WHERE slug='turkey'),        (SELECT id FROM teams WHERE slug='usa'),         v_bc,      '2026-06-27 00:00:00+00', 'scheduled'),
(56, 'group', 'D', (SELECT id FROM teams WHERE slug='paraguay'),      (SELECT id FROM teams WHERE slug='australia'),   v_sofi,    '2026-06-27 00:00:00+00', 'scheduled');

-- Jun 26 — Grupo E J3
INSERT INTO matches (match_number, phase, group_id, home_team_id, away_team_id, venue_id, scheduled_at, status) VALUES
(57, 'group', 'E', (SELECT id FROM teams WHERE slug='ecuador'),       (SELECT id FROM teams WHERE slug='germany'),     v_philly,  '2026-06-26 22:00:00+00', 'scheduled'),
(58, 'group', 'E', (SELECT id FROM teams WHERE slug='curacao'),       (SELECT id FROM teams WHERE slug='ivory-coast'), v_houston, '2026-06-26 22:00:00+00', 'scheduled');

-- Jun 27 — Grupo F J3
INSERT INTO matches (match_number, phase, group_id, home_team_id, away_team_id, venue_id, scheduled_at, status) VALUES
(59, 'group', 'F', (SELECT id FROM teams WHERE slug='tunisia'),       (SELECT id FROM teams WHERE slug='netherlands'), v_bbva,    '2026-06-27 21:00:00+00', 'scheduled'),
(60, 'group', 'F', (SELECT id FROM teams WHERE slug='japan'),         (SELECT id FROM teams WHERE slug='sweden'),      v_att,     '2026-06-27 21:00:00+00', 'scheduled');

-- Jun 27 — Grupo G J3
INSERT INTO matches (match_number, phase, group_id, home_team_id, away_team_id, venue_id, scheduled_at, status) VALUES
(61, 'group', 'G', (SELECT id FROM teams WHERE slug='new-zealand'),   (SELECT id FROM teams WHERE slug='belgium'),     v_sofi,    '2026-06-28 00:00:00+00', 'scheduled'),
(62, 'group', 'G', (SELECT id FROM teams WHERE slug='egypt'),         (SELECT id FROM teams WHERE slug='iran'),        v_lumen,   '2026-06-28 00:00:00+00', 'scheduled');

-- Jun 27 — Grupo H J3
INSERT INTO matches (match_number, phase, group_id, home_team_id, away_team_id, venue_id, scheduled_at, status) VALUES
(63, 'group', 'H', (SELECT id FROM teams WHERE slug='uruguay'),       (SELECT id FROM teams WHERE slug='spain'),       v_miami,   '2026-06-27 22:00:00+00', 'scheduled'),
(64, 'group', 'H', (SELECT id FROM teams WHERE slug='cape-verde'),    (SELECT id FROM teams WHERE slug='saudi-arabia'),v_atlanta, '2026-06-27 22:00:00+00', 'scheduled');

-- Jun 28 — Grupo I J3
INSERT INTO matches (match_number, phase, group_id, home_team_id, away_team_id, venue_id, scheduled_at, status) VALUES
(65, 'group', 'I', (SELECT id FROM teams WHERE slug='norway'),        (SELECT id FROM teams WHERE slug='france'),      v_boston,  '2026-06-28 21:00:00+00', 'scheduled'),
(66, 'group', 'I', (SELECT id FROM teams WHERE slug='senegal'),       (SELECT id FROM teams WHERE slug='iraq'),        v_metlife, '2026-06-28 21:00:00+00', 'scheduled');

-- Jun 28 — Grupo J J3
INSERT INTO matches (match_number, phase, group_id, home_team_id, away_team_id, venue_id, scheduled_at, status) VALUES
(67, 'group', 'J', (SELECT id FROM teams WHERE slug='jordan'),        (SELECT id FROM teams WHERE slug='argentina'),   v_levis,   '2026-06-29 00:00:00+00', 'scheduled'),
(68, 'group', 'J', (SELECT id FROM teams WHERE slug='algeria'),       (SELECT id FROM teams WHERE slug='austria'),     v_arrow,   '2026-06-29 00:00:00+00', 'scheduled');

-- Jun 28 — Grupo K J3
INSERT INTO matches (match_number, phase, group_id, home_team_id, away_team_id, venue_id, scheduled_at, status) VALUES
(69, 'group', 'K', (SELECT id FROM teams WHERE slug='colombia'),      (SELECT id FROM teams WHERE slug='portugal'),    v_azteca,  '2026-06-28 22:00:00+00', 'scheduled'),
(70, 'group', 'K', (SELECT id FROM teams WHERE slug='dr-congo'),      (SELECT id FROM teams WHERE slug='uzbekistan'),  v_houston, '2026-06-28 22:00:00+00', 'scheduled');

-- Jun 28 — Grupo L J3
INSERT INTO matches (match_number, phase, group_id, home_team_id, away_team_id, venue_id, scheduled_at, status) VALUES
(71, 'group', 'L', (SELECT id FROM teams WHERE slug='croatia'),       (SELECT id FROM teams WHERE slug='england'),     v_bmo,     '2026-06-29 01:00:00+00', 'scheduled'),
(72, 'group', 'L', (SELECT id FROM teams WHERE slug='panama'),        (SELECT id FROM teams WHERE slug='ghana'),       v_att,     '2026-06-29 01:00:00+00', 'scheduled');

END $$;
