-- ============================================================
-- FIFA WORLD CUP 2026 — SEED COMPLETO DE ELIMINATORIAS
-- ============================================================

DO $$
DECLARE
    -- Sedes Finales
    v_azteca UUID := (SELECT id FROM venues WHERE slug = 'estadio-azteca');
    v_metlife UUID := (SELECT id FROM venues WHERE slug = 'metlife-stadium');
    v_att UUID := (SELECT id FROM venues WHERE slug = 'att-stadium');
    v_sofi UUID := (SELECT id FROM venues WHERE slug = 'sofi-stadium');
    v_miami UUID := (SELECT id FROM venues WHERE slug = 'hard-rock-stadium');
    v_bc UUID := (SELECT id FROM venues WHERE slug = 'bc-place');
    v_bmo UUID := (SELECT id FROM venues WHERE slug = 'bmo-field');
    v_lumen UUID := (SELECT id FROM venues WHERE slug = 'lumen-field');
    v_levis UUID := (SELECT id FROM venues WHERE slug = 'levis-stadium');
    v_arrow UUID := (SELECT id FROM venues WHERE slug = 'arrowhead-stadium');
    v_philly UUID := (SELECT id FROM venues WHERE slug = 'lincoln-financial');
    v_boston UUID := (SELECT id FROM venues WHERE slug = 'gillette-stadium');
    v_vegas UUID := (SELECT id FROM venues WHERE slug = 'allegiant-stadium');
    v_houston UUID := (SELECT id FROM venues WHERE slug = 'nrg-stadium');

BEGIN
    -- DIECISEISAVOS DE FINAL (ROUND OF 32)
    INSERT INTO matches (match_number, phase, venue_id, scheduled_at, status, notes) VALUES 
    (73, 'round_of_16', v_azteca, '2026-06-28 18:00:00+00', 'scheduled', '2A vs 2B'),
    (74, 'round_of_16', v_sofi, '2026-06-28 21:00:00+00', 'scheduled', '1A vs 3C/D/E'),
    (75, 'round_of_16', v_metlife, '2026-06-29 14:00:00+00', 'scheduled', '1B vs 3A/C/D'),
    (76, 'round_of_16', v_att, '2026-06-29 20:00:00+00', 'scheduled', '2C vs 2D'),
    (77, 'round_of_16', v_miami, '2026-06-30 17:00:00+00', 'scheduled', '1C vs 3A/B/F'),
    (78, 'round_of_16', v_bc, '2026-06-30 20:00:00+00', 'scheduled', '1D vs 3B/E/F'),
    (79, 'round_of_16', v_bmo, '2026-07-01 15:00:00+00', 'scheduled', '1E vs 3A/B/C'),
    (80, 'round_of_16', v_azteca, '2026-07-01 19:00:00+00', 'scheduled', '1F vs 3D/E/A'),
    (81, 'round_of_16', v_arrow, '2026-07-01 22:00:00+00', 'scheduled', '1G vs 3A/B/C'),
    (82, 'round_of_16', v_philly, '2026-07-02 14:00:00+00', 'scheduled', '1H vs 2G'),
    (83, 'round_of_16', v_boston, '2026-07-02 17:00:00+00', 'scheduled', '1I vs 3D/E/F'),
    (84, 'round_of_16', v_vegas, '2026-07-02 20:00:00+00', 'scheduled', '1J vs 2I'),
    (85, 'round_of_16', v_houston, '2026-07-03 14:00:00+00', 'scheduled', '1K vs 3D/E/F'),
    (86, 'round_of_16', v_levis, '2026-07-03 17:00:00+00', 'scheduled', '1L vs 2K'),
    (87, 'round_of_16', v_lumen, '2026-07-03 20:00:00+00', 'scheduled', '2F vs 2E'),
    (88, 'round_of_16', v_sofi, '2026-07-03 23:00:00+00', 'scheduled', '2J vs 2L');

    -- OCTAVOS DE FINAL
    INSERT INTO matches (match_number, phase, venue_id, scheduled_at, status, notes) VALUES 
    (89, 'round_of_16', v_metlife, '2026-07-04 14:00:00+00', 'scheduled', 'G73 vs G74'),
    (90, 'round_of_16', v_sofi, '2026-07-04 18:00:00+00', 'scheduled', 'G75 vs G76'),
    (91, 'round_of_16', v_azteca, '2026-07-05 16:00:00+00', 'scheduled', 'G77 vs G78'),
    (92, 'round_of_16', v_att, '2026-07-05 20:00:00+00', 'scheduled', 'G79 vs G80'),
    (93, 'round_of_16', v_miami, '2026-07-06 17:00:00+00', 'scheduled', 'G81 vs G82'),
    (94, 'round_of_16', v_bc, '2026-07-06 20:00:00+00', 'scheduled', 'G83 vs G84'),
    (95, 'round_of_16', v_bmo, '2026-07-07 15:00:00+00', 'scheduled', 'G85 vs G86'),
    (96, 'round_of_16', v_houston, '2026-07-07 19:00:00+00', 'scheduled', 'G87 vs G88');

    -- CUARTOS DE FINAL
    INSERT INTO matches (match_number, phase, venue_id, scheduled_at, status, notes) VALUES 
    (97, 'quarterfinal', v_boston, '2026-07-09 14:00:00+00', 'scheduled', 'G89 vs G90'),
    (98, 'quarterfinal', v_sofi, '2026-07-09 18:00:00+00', 'scheduled', 'G91 vs G92'),
    (99, 'quarterfinal', v_miami, '2026-07-10 17:00:00+00', 'scheduled', 'G93 vs G94'),
    (100, 'quarterfinal', v_bc, '2026-07-10 20:00:00+00', 'scheduled', 'G95 vs G96');

    -- SEMIFINALES
    INSERT INTO matches (match_number, phase, venue_id, scheduled_at, status, notes) VALUES 
    (101, 'semifinal', v_att, '2026-07-14 19:00:00+00', 'scheduled', 'G97 vs G98'),
    (102, 'semifinal', v_miami, '2026-07-15 19:00:00+00', 'scheduled', 'G99 vs G100');

    -- TERCER LUGAR
    INSERT INTO matches (match_number, phase, venue_id, scheduled_at, status, notes) VALUES 
    (103, 'third_place', v_miami, '2026-07-18 17:00:00+00', 'scheduled', 'P101 vs P102');

    -- FINAL
    INSERT INTO matches (match_number, phase, venue_id, scheduled_at, status, notes) VALUES 
    (104, 'final', v_metlife, '2026-07-19 18:00:00+00', 'scheduled', 'G101 vs G102');

END $$;
