-- ============================================================
-- FIFA WORLD CUP 2026 — ELIMINATORIAS (PARTE 4: R32 A FINAL)
-- ============================================================

DO $$
DECLARE
    v_azteca  UUID := (SELECT id FROM venues WHERE slug = 'estadio-azteca');
    v_metlife UUID := (SELECT id FROM venues WHERE slug = 'metlife-stadium');
    v_sofi    UUID := (SELECT id FROM venues WHERE slug = 'sofi-stadium');
    v_att     UUID := (SELECT id FROM venues WHERE slug = 'att-stadium');
    v_bc      UUID := (SELECT id FROM venues WHERE slug = 'bc-place');
    v_bmo     UUID := (SELECT id FROM venues WHERE slug = 'bmo-field');
    v_lumen   UUID := (SELECT id FROM venues WHERE slug = 'lumen-field');
    v_levis   UUID := (SELECT id FROM venues WHERE slug = 'levis-stadium');
    v_arrow   UUID := (SELECT id FROM venues WHERE slug = 'arrowhead-stadium');
    v_boston  UUID := (SELECT id FROM venues WHERE slug = 'gillette-stadium');
    v_miami   UUID := (SELECT id FROM venues WHERE slug = 'hard-rock-stadium');
    v_vegas   UUID := (SELECT id FROM venues WHERE slug = 'allegiant-stadium');
    v_houston UUID := (SELECT id FROM venues WHERE slug = 'nrg-stadium');
    v_atlanta UUID := (SELECT id FROM venues WHERE slug = 'mercedes-benz-stadium');
    v_philly  UUID := (SELECT id FROM venues WHERE slug = 'lincoln-financial');
BEGIN

-- JORNADA 4: DIECISEISAVOS (Round of 32)
-- 16 partidos (73 a 88)
INSERT INTO matches (match_number, phase, scheduled_at, venue_id, status, notes) VALUES
(73, 'round_of_32', '2026-06-28 22:00:00+00', v_sofi,    'scheduled', 'Ganador A vs 3ro C/D/E'),
(74, 'round_of_32', '2026-06-29 22:00:00+00', v_boston,  'scheduled', 'Ganador E vs 3ro A/B/C'),
(75, 'round_of_32', '2026-06-30 18:00:00+00', v_metlife, 'scheduled', 'Ganador C vs 3ro F/G/H'),
(76, 'round_of_32', '2026-06-30 22:00:00+00', v_azteca,  'scheduled', 'Segundo A vs Segundo B'),
(77, 'round_of_32', '2026-07-01 18:00:00+00', v_att,     'scheduled', 'Ganador B vs 3ro E/F/G'),
(78, 'round_of_32', '2026-07-01 22:00:00+00', v_bc,      'scheduled', 'Ganador F vs Segundo C'),
(79, 'round_of_32', '2026-07-02 18:00:00+00', v_bmo,     'scheduled', 'Ganador D vs 3ro B/E/F'),
(80, 'round_of_32', '2026-07-02 22:00:00+00', v_lumen,   'scheduled', 'Ganador G vs 3ro C/D/H'),
-- (Simplificando el resto para el seed)
(81, 'round_of_32', '2026-07-03 18:00:00+00', v_levis,   'scheduled', 'Ganador H vs Segundo G'),
(82, 'round_of_32', '2026-07-03 22:00:00+00', v_arrow,   'scheduled', 'Ganador I vs 3ro A/D/K'),
(83, 'round_of_32', '2026-07-03 22:00:00+00', v_miami,   'scheduled', 'Ganador J vs Segundo I'),
(84, 'round_of_32', '2026-07-03 22:00:00+00', v_atlanta, 'scheduled', 'Ganador K vs 3ro B/H/J'),
(85, 'round_of_32', '2026-07-03 22:00:00+00', v_houston, 'scheduled', 'Ganador L vs 3ro G/I/J'),
(86, 'round_of_32', '2026-07-03 22:00:00+00', v_philly,  'scheduled', 'Segundo D vs Segundo E'),
(87, 'round_of_32', '2026-07-03 22:00:00+00', v_att,     'scheduled', 'Segundo H vs Segundo J'),
(88, 'round_of_32', '2026-07-03 22:00:00+00', v_sofi,    'scheduled', 'Segundo K vs Segundo L');

-- OCTAVOS DE FINAL (Round of 16)
-- 8 partidos (89 a 96)
INSERT INTO matches (match_number, phase, scheduled_at, venue_id, status, notes) VALUES
(89, 'round_of_16', '2026-07-04 22:00:00+00', v_metlife, 'scheduled', 'Octavo de Final 1'),
(90, 'round_of_16', '2026-07-05 22:00:00+00', v_azteca,  'scheduled', 'Octavo de Final 2'),
(91, 'round_of_16', '2026-07-05 22:00:00+00', v_sofi,    'scheduled', 'Octavo de Final 3'),
(92, 'round_of_16', '2026-07-06 22:00:00+00', v_att,     'scheduled', 'Octavo de Final 4'),
(93, 'round_of_16', '2026-07-06 22:00:00+00', v_bc,      'scheduled', 'Octavo de Final 5'),
(94, 'round_of_16', '2026-07-07 22:00:00+00', v_atlanta, 'scheduled', 'Octavo de Final 6'),
(95, 'round_of_16', '2026-07-07 22:00:00+00', v_miami,   'scheduled', 'Octavo de Final 7'),
(96, 'round_of_16', '2026-07-07 22:00:00+00', v_houston, 'scheduled', 'Octavo de Final 8');

-- CUARTOS DE FINAL (Quarterfinals)
-- 4 partidos (97 a 100)
INSERT INTO matches (match_number, phase, scheduled_at, venue_id, status, notes) VALUES
(97, 'quarterfinal', '2026-07-09 22:00:00+00', v_boston, 'scheduled', 'Cuartos de Final 1'),
(98, 'quarterfinal', '2026-07-10 22:00:00+00', v_att,    'scheduled', 'Cuartos de Final 2'),
(99, 'quarterfinal', '2026-07-11 22:00:00+00', v_miami,  'scheduled', 'Cuartos de Final 3'),
(100,'quarterfinal', '2026-07-11 22:00:00+00', v_arrow,  'scheduled', 'Cuartos de Final 4');

-- SEMIFINALES
-- 2 partidos (101 a 102)
INSERT INTO matches (match_number, phase, scheduled_at, venue_id, status, notes) VALUES
(101, 'semifinal', '2026-07-14 22:00:00+00', v_att,     'scheduled', 'Semifinal 1'),
(102, 'semifinal', '2026-07-15 22:00:00+00', v_atlanta, 'scheduled', 'Semifinal 2');

-- TERCER LUGAR
INSERT INTO matches (match_number, phase, scheduled_at, venue_id, status, notes) VALUES
(103, 'third_place', '2026-07-18 22:00:00+00', v_miami, 'scheduled', 'Partido Tercer Puesto');

-- FINAL
INSERT INTO matches (match_number, phase, scheduled_at, venue_id, status, notes, is_final) VALUES
(104, 'final', '2026-07-19 22:00:00+00', v_metlife, 'scheduled', 'Gran Final de la Copa Mundial 2026', TRUE);

END $$;
