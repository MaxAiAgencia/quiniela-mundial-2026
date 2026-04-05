-- ============================================================
-- FIFA WORLD CUP 2026 — SEED DE PARTIDOS (RESTO DE GRUPOS G-L)
-- ============================================================

DO $$
DECLARE
    -- Sedes
    v_azteca UUID := (SELECT id FROM venues WHERE slug = 'estadio-azteca');
    v_metlife UUID := (SELECT id FROM venues WHERE slug = 'metlife-stadium');
    v_sofi UUID := (SELECT id FROM venues WHERE slug = 'sofi-stadium');
    v_akron UUID := (SELECT id FROM venues WHERE slug = 'estadio-akron');
    v_bbva UUID := (SELECT id FROM venues WHERE slug = 'estadio-bbva');
    v_att UUID := (SELECT id FROM venues WHERE slug = 'att-stadium');
    v_bc UUID := (SELECT id FROM venues WHERE slug = 'bc-place');
    v_bmo UUID := (SELECT id FROM venues WHERE slug = 'bmo-field');
    v_lumen UUID := (SELECT id FROM venues WHERE slug = 'lumen-field');
    v_levis UUID := (SELECT id FROM venues WHERE slug = 'levis-stadium');
    v_arrow UUID := (SELECT id FROM venues WHERE slug = 'arrowhead-stadium');
    v_philly UUID := (SELECT id FROM venues WHERE slug = 'lincoln-financial');
    v_boston UUID := (SELECT id FROM venues WHERE slug = 'gillette-stadium');
    v_miami UUID := (SELECT id FROM venues WHERE slug = 'hard-rock-stadium');
    v_vegas UUID := (SELECT id FROM venues WHERE slug = 'allegiant-stadium');
    v_houston UUID := (SELECT id FROM venues WHERE slug = 'nrg-stadium');

BEGIN
    -- GRUPO G (FRA, URU, ANG, CZE) - R1 ya está en p1 o faltante
    INSERT INTO matches (match_number, phase, group_id, home_team_id, away_team_id, venue_id, scheduled_at, status) 
    VALUES (37, 'group', 'G', (SELECT id FROM teams WHERE slug = 'france'), (SELECT id FROM teams WHERE slug = 'uruguay'), v_miami, '2026-06-21 20:00:00+00', 'scheduled');
    INSERT INTO matches (match_number, phase, group_id, home_team_id, away_team_id, venue_id, scheduled_at, status) 
    VALUES (38, 'group', 'G', (SELECT id FROM teams WHERE slug = 'angola'), (SELECT id FROM teams WHERE slug = 'czech-republic'), v_houston, '2026-06-22 14:00:00+00', 'scheduled');
    
    -- GRUPO H (POR, COL, NGA, GEO)
    INSERT INTO matches (match_number, phase, group_id, home_team_id, away_team_id, venue_id, scheduled_at, status) 
    VALUES (39, 'group', 'H', (SELECT id FROM teams WHERE slug = 'portugal'), (SELECT id FROM teams WHERE slug = 'colombia'), v_metlife, '2026-06-22 17:00:00+00', 'scheduled');
    INSERT INTO matches (match_number, phase, group_id, home_team_id, away_team_id, venue_id, scheduled_at, status) 
    VALUES (40, 'group', 'H', (SELECT id FROM teams WHERE slug = 'nigeria'), (SELECT id FROM teams WHERE slug = 'georgia'), v_philly, '2026-06-22 20:00:00+00', 'scheduled');

    -- GRUPO I (GER, VEN, AUS, SEN)
    INSERT INTO matches (match_number, phase, group_id, home_team_id, away_team_id, venue_id, scheduled_at, status) 
    VALUES (41, 'group', 'I', (SELECT id FROM teams WHERE slug = 'germany'), (SELECT id FROM teams WHERE slug = 'venezuela'), v_boston, '2026-06-23 14:00:00+00', 'scheduled');

    -- GRUPO J (ENG, IRN, CUB, SUI)
    INSERT INTO matches (match_number, phase, group_id, home_team_id, away_team_id, venue_id, scheduled_at, status) 
    VALUES (43, 'group', 'J', (SELECT id FROM teams WHERE slug = 'england'), (SELECT id FROM teams WHERE slug = 'iran'), v_boston, '2026-06-24 14:00:00+00', 'scheduled');

    -- GRUPO K (BEL, PER, KOR, EGY)
    INSERT INTO matches (match_number, phase, group_id, home_team_id, away_team_id, venue_id, scheduled_at, status) 
    VALUES (45, 'group', 'K', (SELECT id FROM teams WHERE slug = 'belgium'), (SELECT id FROM teams WHERE slug = 'peru'), v_houston, '2026-06-24 20:00:00+00', 'scheduled');

    -- GRUPO L (QAT, AUT, SVK, HON)
    INSERT INTO matches (match_number, phase, group_id, home_team_id, away_team_id, venue_id, scheduled_at, status) 
    VALUES (47, 'group', 'L', (SELECT id FROM teams WHERE slug = 'qatar'), (SELECT id FROM teams WHERE slug = 'austria'), v_azteca, '2026-06-25 18:00:00+00', 'scheduled');

END $$;
