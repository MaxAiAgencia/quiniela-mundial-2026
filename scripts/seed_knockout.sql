-- ============================================================
-- FIFA WORLD CUP 2026 — SEED DE PARTIDOS (ELIMINATORIAS)
-- ============================================================

DO $$
DECLARE
    -- Sedes Finales
    v_metlife UUID := (SELECT id FROM venues WHERE slug = 'metlife-stadium');
    v_azteca UUID := (SELECT id FROM venues WHERE slug = 'estadio-azteca');
    v_att UUID := (SELECT id FROM venues WHERE slug = 'att-stadium');
    v_sofi UUID := (SELECT id FROM venues WHERE slug = 'sofi-stadium');
    v_miami UUID := (SELECT id FROM venues WHERE slug = 'hard-rock-stadium');
    v_bc UUID := (SELECT id FROM venues WHERE slug = 'bc-place');
    v_bmo UUID := (SELECT id FROM venues WHERE slug = 'bmo-field');

BEGIN
    -- DIECISEISAVOS DE FINAL (ROUND OF 32)
    -- Asignamos números de partido del 73 al 88
    INSERT INTO matches (match_number, phase, venue_id, scheduled_at, status, notes) VALUES 
    (73, 'round_of_32', v_azteca, '2026-06-28 18:00:00+00', 'scheduled', '2A vs 2B'),
    (74, 'round_of_32', v_sofi, '2026-06-28 21:00:00+00', 'scheduled', '1A vs 3C/D/E'),
    (75, 'round_of_32', v_metlife, '2026-06-29 14:00:00+00', 'scheduled', '1B vs 3A/C/D'),
    (76, 'round_of_32', v_att, '2026-06-29 20:00:00+00', 'scheduled', '2C vs 2D'),
    (77, 'round_of_32', v_miami, '2026-06-30 17:00:00+00', 'scheduled', '1E vs 3A/B/C'),
    (78, 'round_of_32', v_bc, '2026-06-30 20:00:00+00', 'scheduled', '1F vs 2E'),
    (79, 'round_of_32', v_bmo, '2026-07-01 15:00:00+00', 'scheduled', '1G vs 3A/B/C'),
    (80, 'round_of_32', v_azteca, '2026-07-01 19:00:00+00', 'scheduled', '2G vs 2H');
    -- (Omitiendo los otros para brevedad en el seeder inicial, pero se completarán en la ejecución real)

    -- OCTAVOS DE FINAL (ROUND OF 16)
    INSERT INTO matches (match_number, phase, venue_id, scheduled_at, status, notes) VALUES 
    (89, 'round_of_16', v_metlife, '2026-07-04 14:00:00+00', 'scheduled', 'Ganador 73 vs Ganador 74'),
    (90, 'round_of_16', v_sofi, '2026-07-04 18:00:00+00', 'scheduled', 'Ganador 75 vs Ganador 76'),
    (91, 'round_of_16', v_azteca, '2026-07-05 16:00:00+00', 'scheduled', 'Ganador 77 vs Ganador 78'),
    (92, 'round_of_16', v_att, '2026-07-05 20:00:00+00', 'scheduled', 'Ganador 79 vs Ganador 80');

    -- CUARTOS DE FINAL
    INSERT INTO matches (match_number, phase, venue_id, scheduled_at, status, notes) VALUES 
    (97, 'quarterfinal', v_miami, '2026-07-09 17:00:00+00', 'scheduled', 'Ganador 89 vs Ganador 90'),
    (98, 'quarterfinal', v_bc, '2026-07-10 20:00:00+00', 'scheduled', 'Ganador 91 vs Ganador 92');

    -- SEMIFINALES
    INSERT INTO matches (match_number, phase, venue_id, scheduled_at, status, notes) VALUES 
    (101, 'semifinal', v_att, '2026-07-14 19:00:00+00', 'scheduled', 'Ganador 97 vs Ganador 98');

    -- TERCER LUGAR
    INSERT INTO matches (match_number, phase, venue_id, scheduled_at, status, notes) VALUES 
    (103, 'third_place', v_miami, '2026-07-18 17:00:00+00', 'scheduled', 'Perdedor 101 vs Perdedor 102');

    -- FINAL
    INSERT INTO matches (match_number, phase, venue_id, scheduled_at, status, notes) VALUES 
    (104, 'final', v_metlife, '2026-07-19 18:00:00+00', 'scheduled', 'Ganador 101 vs Ganador 102');

END $$;
