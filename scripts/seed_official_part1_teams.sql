-- ============================================================
-- FIFA WORLD CUP 2026 — DATOS OFICIALES (PARTE 1: EQUIPOS)
-- Fuente: https://www.fifa.com/es/tournaments/mens/worldcup/canadamexicousa2026
-- Ejecutar en el SQL Editor de Supabase ANTES de part2
-- ============================================================

-- 0. Limpiar datos anteriores (en orden por FK)
TRUNCATE matches CASCADE;
TRUNCATE standings CASCADE;
TRUNCATE teams CASCADE;

-- 1. Agregar sede faltante: Atlanta
INSERT INTO venues (slug, name, city, country, capacity, latitude, longitude, is_final, is_inaugural, description)
VALUES ('mercedes-benz-stadium', 'Mercedes-Benz Stadium', 'Atlanta, GA', 'USA', 71000, 33.7553, -84.4006, FALSE, FALSE, 'Estadio con techo retráctil único. Hogar de los Atlanta United y Atlanta Falcons.')
ON CONFLICT (slug) DO NOTHING;

-- 2. Insertar los 48 equipos oficiales
INSERT INTO teams (slug, name, name_en, country_code, confederation, group_id, fifa_ranking, primary_color, secondary_color, is_host) VALUES
-- GRUPO A
('mexico',         'México',              'Mexico',              'MEX', 'CONCACAF', 'A', 15, '#006847', '#FFFFFF', TRUE),
('south-africa',   'Sudáfrica',           'South Africa',        'RSA', 'CAF',      'A', 60, '#007A4D', '#FFB81C', FALSE),
('south-korea',    'Rep. de Corea',       'South Korea',         'KOR', 'AFC',      'A', 23, '#CD2E3A', '#003478', FALSE),
('czech-republic', 'Chequia',             'Czech Republic',      'CZE', 'UEFA',     'A', 36, '#D7141A', '#11457E', FALSE),
-- GRUPO B
('canada',         'Canadá',              'Canada',              'CAN', 'CONCACAF', 'B', 42, '#FF0000', '#FFFFFF', TRUE),
('bosnia',         'Bosnia y Herzegovina','Bosnia and Herzegovina','BIH','UEFA',     'B', 65, '#002395', '#F1BF00', FALSE),
('qatar',          'Catar',               'Qatar',               'QAT', 'AFC',      'B', 37, '#8D1B3D', '#FFFFFF', FALSE),
('switzerland',    'Suiza',               'Switzerland',         'SUI', 'UEFA',     'B', 19, '#FF0000', '#FFFFFF', FALSE),
-- GRUPO C
('brazil',         'Brasil',              'Brazil',              'BRA', 'CONMEBOL', 'C', 5,  '#009C3B', '#FFDF00', FALSE),
('morocco',        'Marruecos',           'Morocco',             'MAR', 'CAF',      'C', 14, '#C1272D', '#006233', FALSE),
('haiti',          'Haití',               'Haiti',               'HAI', 'CONCACAF', 'C',120, '#00209F', '#D21034', FALSE),
('scotland',       'Escocia',             'Scotland',            'SCO', 'UEFA',     'C', 55, '#003399', '#FFFFFF', FALSE),
-- GRUPO D
('usa',            'Estados Unidos',      'United States',       'USA', 'CONCACAF', 'D', 14, '#B31942', '#FFFFFF', TRUE),
('paraguay',       'Paraguay',            'Paraguay',            'PAR', 'CONMEBOL', 'D', 50, '#DA291C', '#FFFFFF', FALSE),
('australia',      'Australia',           'Australia',           'AUS', 'AFC',      'D', 25, '#00843D', '#FFD700', FALSE),
('turkey',         'Turquía',             'Turkey',              'TUR', 'UEFA',     'D', 30, '#E30A17', '#FFFFFF', FALSE),
-- GRUPO E
('germany',        'Alemania',            'Germany',             'GER', 'UEFA',     'E', 12, '#000000', '#DD0000', FALSE),
('curacao',        'Curazao',             'Curaçao',             'CUW', 'CONCACAF', 'E',160, '#002B7F', '#F9E814', FALSE),
('ivory-coast',    'Costa de Marfil',     'Ivory Coast',         'CIV', 'CAF',      'E', 50, '#F77F00', '#009A44', FALSE),
('ecuador',        'Ecuador',             'Ecuador',             'ECU', 'CONMEBOL', 'E', 44, '#FFD100', '#003399', FALSE),
-- GRUPO F
('netherlands',    'Países Bajos',        'Netherlands',         'NED', 'UEFA',     'F',  7, '#FF4F00', '#FFFFFF', FALSE),
('japan',          'Japón',               'Japan',               'JPN', 'AFC',      'F', 16, '#BC002D', '#FFFFFF', FALSE),
('sweden',         'Suecia',              'Sweden',              'SWE', 'UEFA',     'F', 20, '#006AA7', '#FECC00', FALSE),
('tunisia',        'Túnez',               'Tunisia',             'TUN', 'CAF',      'F', 35, '#E70013', '#FFFFFF', FALSE),
-- GRUPO G
('belgium',        'Bélgica',             'Belgium',             'BEL', 'UEFA',     'G',  3, '#000000', '#FDDA24', FALSE),
('egypt',          'Egipto',              'Egypt',               'EGY', 'CAF',      'G', 38, '#CE1126', '#FFFFFF', FALSE),
('iran',           'Irán',                'Iran',                'IRN', 'AFC',      'G', 21, '#239F40', '#DA0000', FALSE),
('new-zealand',    'Nueva Zelanda',       'New Zealand',         'NZL', 'OFC',      'G',105, '#000000', '#FFFFFF', FALSE),
-- GRUPO H
('spain',          'España',              'Spain',               'ESP', 'UEFA',     'H',  3, '#AA151B', '#F1BF00', FALSE),
('cape-verde',     'Cabo Verde',          'Cape Verde',          'CPV', 'CAF',      'H', 75, '#003893', '#CE1126', FALSE),
('saudi-arabia',   'Arabia Saudí',        'Saudi Arabia',        'KSA', 'AFC',      'H', 56, '#006C35', '#FFFFFF', FALSE),
('uruguay',        'Uruguay',             'Uruguay',             'URU', 'CONMEBOL', 'H', 17, '#5FFFFF', '#FFFFFF', FALSE),
-- GRUPO I
('france',         'Francia',             'France',              'FRA', 'UEFA',     'I',  2, '#002395', '#ED2939', FALSE),
('senegal',        'Senegal',             'Senegal',             'SEN', 'CAF',      'I', 20, '#00853F', '#FDEF42', FALSE),
('iraq',           'Irak',                'Iraq',                'IRQ', 'AFC',      'I', 58, '#007A3D', '#FFFFFF', FALSE),
('norway',         'Noruega',             'Norway',              'NOR', 'UEFA',     'I', 23, '#EF2B2D', '#FFFFFF', FALSE),
-- GRUPO J
('argentina',      'Argentina',           'Argentina',           'ARG', 'CONMEBOL', 'J',  1, '#74ACDF', '#FFFFFF', FALSE),
('algeria',        'Argelia',             'Algeria',             'ALG', 'CAF',      'J', 40, '#006233', '#FFFFFF', FALSE),
('austria',        'Austria',             'Austria',             'AUT', 'UEFA',     'J', 26, '#ED2939', '#FFFFFF', FALSE),
('jordan',         'Jordania',            'Jordan',              'JOR', 'AFC',      'J', 68, '#007A3D', '#000000', FALSE),
-- GRUPO K
('portugal',       'Portugal',            'Portugal',            'POR', 'UEFA',     'K',  6, '#009246', '#FF0000', FALSE),
('dr-congo',       'RD Congo',            'DR Congo',            'COD', 'CAF',      'K', 60, '#007FFF', '#CE1021', FALSE),
('uzbekistan',     'Uzbekistán',          'Uzbekistan',          'UZB', 'AFC',      'K', 55, '#0099B5', '#1EB53A', FALSE),
('colombia',       'Colombia',            'Colombia',            'COL', 'CONMEBOL', 'K', 18, '#FCD116', '#003087', FALSE),
-- GRUPO L
('england',        'Inglaterra',          'England',             'ENG', 'UEFA',     'L',  4, '#FFFFFF', '#003399', FALSE),
('croatia',        'Croacia',             'Croatia',             'CRO', 'UEFA',     'L', 10, '#FF0000', '#FFFFFF', FALSE),
('ghana',          'Ghana',               'Ghana',               'GHA', 'CAF',      'L', 45, '#006B3F', '#FCD116', FALSE),
('panama',         'Panamá',              'Panama',              'PAN', 'CONCACAF', 'L', 70, '#B40027', '#FFFFFF', FALSE);

-- 3. Regenerar standings vacíos
INSERT INTO standings (team_id, group_id)
SELECT id, group_id FROM teams WHERE group_id IS NOT NULL;

-- FIN PARTE 1
