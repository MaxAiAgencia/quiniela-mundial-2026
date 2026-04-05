-- ============================================================
-- FIFA WORLD CUP 2026 — DATOS INICIALES (SEED)
-- Archivo: supabase/seed.sql
-- Ejecutar DESPUÉS de 001_initial_schema.sql
-- ============================================================

-- ============================================================
-- SEDES (16 Estadios)
-- ============================================================

INSERT INTO venues (slug, name, city, country, capacity, latitude, longitude, is_final, is_inaugural, description) VALUES
('metlife-stadium',       'MetLife Stadium',           'East Rutherford, NJ', 'USA', 82500,  40.8135, -74.0745, TRUE,  FALSE, 'Sede de la Gran Final. Estadio más grande de la NFL, hogar de Giants y Jets.'),
('att-stadium',           'AT&T Stadium',              'Arlington, TX',        'USA', 80000,  32.7480, -97.0930, FALSE, FALSE, 'Conocido como "America''s House". Uno de los estadios más grandes del mundo.'),
('sofi-stadium',          'SoFi Stadium',              'Inglewood, CA',        'USA', 70240,  33.9535, -118.3392,FALSE, FALSE, 'Estadio con techo translúcido inaugurado en 2020. Hogar de Rams y Chargers.'),
('lumen-field',           'Lumen Field',               'Seattle, WA',          'USA', 69000,  47.5952, -122.3316,FALSE, FALSE, 'Estadio al aire libre en el corazón de Seattle, conocido por su ruidosa afición.'),
('levis-stadium',         'Levi''s Stadium',           'Santa Clara, CA',      'USA', 68500,  37.4032, -121.9698,FALSE, FALSE, 'Sede de Super Bowl 50. Estadio sustentable en Silicon Valley.'),
('arrowhead-stadium',     'Arrowhead Stadium',         'Kansas City, MO',      'USA', 76416,  39.0489, -94.4839, FALSE, FALSE, 'Una de las meccas del fútbol americano. Uno de los estadios más ruidosos del mundo.'),
('lincoln-financial',     'Lincoln Financial Field',   'Philadelphia, PA',     'USA', 69176,  39.9008, -75.1675, FALSE, FALSE, 'Hogar de los Philadelphia Eagles. Conocido como "The Linc".'),
('gillette-stadium',      'Gillette Stadium',          'Foxborough, MA',       'USA', 65878,  42.0909, -71.2643, FALSE, FALSE, 'Estadio hogar de los New England Patriots. A 45 min de Boston.'),
('hard-rock-stadium',     'Hard Rock Stadium',         'Miami, FL',            'USA', 65326,  25.9579, -80.2388, FALSE, FALSE, 'Sede del Super Bowl en múltiples ocasiones. En el corazón de Miami.'),
('allegiant-stadium',     'Allegiant Stadium',         'Las Vegas, NV',        'USA', 65000,  36.0909, -115.1833,FALSE, FALSE, 'El "Death Star". Estadio más nuevo y espectacular de la NFL, inaugurado 2020.'),
('nrg-stadium',           'NRG Stadium',               'Houston, TX',          'USA', 72220,  29.6847, -95.4107, FALSE, FALSE, 'Primer estadio retráctil en EE.UU. Sede del Super Bowl en 2004 y 2017.'),
('estadio-azteca',        'Estadio Azteca',            'Ciudad de México',      'MEX', 87523,  19.3030, -99.1506, FALSE, TRUE,  'El Coloso de Santa Úrsula. Único estadio que ha sido sede de 2 Finales del Mundial. Partido inaugural.'),
('estadio-akron',         'Estadio Akron',             'Guadalajara, Jalisco',  'MEX', 49850,  20.6895, -103.4678,FALSE, FALSE, 'Casa de Chivas del Guadalajara. Estadio moderno inaugurado en 2010.'),
('estadio-bbva',          'Estadio BBVA',              'Guadalupe, Nuevo León', 'MEX', 51390,  25.6694, -100.2439,FALSE, FALSE, 'Estadio de los Rayados de Monterrey. Rodeado de montañas con vistas espectaculares.'),
('bc-place',              'BC Place',                  'Vancouver, BC',         'CAN', 54500,  49.2767, -123.1116,FALSE, FALSE, 'Estadio con techo retráctil en el centro de Vancouver. Sede de los Whitecaps.'),
('bmo-field',             'BMO Field',                 'Toronto, ON',           'CAN', 45736,  43.6333, -79.4186, FALSE, FALSE, 'Estadio de fútbol puro en la orilla del lago Ontario. Hogar del Toronto FC.');

-- ============================================================
-- EQUIPOS (48 Selecciones)
-- Según sorteo oficial FIFA diciembre 2024
-- ============================================================

INSERT INTO teams (slug, name, name_en, country_code, confederation, group_id, kit_sponsor, coach, fifa_ranking, world_cups, best_result, primary_color, secondary_color, is_host) VALUES

-- GRUPO A
('mexico',        'México',          'Mexico',       'MEX', 'CONCACAF', 'A', 'Adidas',  'Javier Aguirre',     11, 17, 'Cuartos de Final (1986)',    '#006847', '#FFFFFF', TRUE),
('ecuador',       'Ecuador',         'Ecuador',      'ECU', 'CONMEBOL', 'A', 'Adidas',  'Sebastián Beccacece',44,  5, 'Octavos de Final (2006)',    '#FFD100', '#003399', FALSE),
('iraq',          'Irak',            'Iraq',         'IRQ', 'AFC',      'A', 'Hummel',  'Jesús Casas',        58,  4, 'Primera Ronda (1986)',       '#007A3D', '#FFFFFF', FALSE),
('ukraine',       'Ucrania',         'Ukraine',      'UKR', 'UEFA',     'A', 'Puma',    'Serhiy Rebrov',      22,  1, 'Cuartos de Final (2006)',    '#005BBB', '#FFD500', FALSE),

-- GRUPO B
('usa',           'Estados Unidos',  'United States','USA', 'CONCACAF', 'B', 'Nike',    'Mauricio Pochettino',14, 11, 'Tercero (1930)',             '#B31942', '#FFFFFF', TRUE),
('panama',        'Panamá',          'Panama',       'PAN', 'CONCACAF', 'B', 'Nike',    'Thomas Christiansen',70,  1, 'Primera Ronda (2018)',       '#B40027', '#FFFFFF', FALSE),
('albania',       'Albania',         'Albania',      'ALB', 'UEFA',     'B', 'Macron',  'Sylvinho',           67,  0, 'Debut mundial',             '#E41E20', '#000000', FALSE),
('chile',         'Chile',           'Chile',        'CHL', 'CONMEBOL', 'B', 'Adidas',  'Ricardo Gareca',     37,  9, 'Tercero (1962)',             '#D52B1E', '#FFFFFF', FALSE),

-- GRUPO C
('canada',        'Canadá',          'Canada',       'CAN', 'CONCACAF', 'C', 'Nike',    'Jesse Marsch',       42,  2, 'Primera Ronda (1986)',       '#FF0000', '#FFFFFF', TRUE),
('morocco',       'Marruecos',       'Morocco',      'MAR', 'CAF',      'C', 'Puma',    'Walid Regragui',     14,  6, 'Semifinal (2022)',           '#C1272D', '#006233', FALSE),
('croatia',       'Croacia',         'Croatia',      'CRO', 'UEFA',     'C', 'Nike',    'Zlatko Dalic',       10,  7, 'Segundo (2018)',             '#FF0000', '#FFFFFF', FALSE),
('serbia',        'Serbia',          'Serbia',       'SRB', 'UEFA',     'C', 'Puma',    'Dragan Stojković',   33,  3, 'Segunda Ronda (2022)',       '#C6363C', '#0C4076', FALSE),

-- GRUPO D
('brazil',        'Brasil',          'Brazil',       'BRA', 'CONMEBOL', 'D', 'Nike',    'Dorival Júnior',     5,  22, 'Campeón (1958/62/70/94/02)',  '#009C3B', '#FFDF00', FALSE),
('norway',        'Noruega',         'Norway',       'NOR', 'UEFA',     'D', 'Nike',    'Ståle Solbakken',    23,  3, 'Cuartos de Final (1998)',    '#EF2B2D', '#FFFFFF', FALSE),
('japan',         'Japón',           'Japan',        'JPN', 'AFC',      'D', 'Adidas',  'Hajime Moriyasu',    16,  7, 'Octavos (2002/2022)',        '#BC002D', '#FFFFFF', FALSE),
('cameroon',      'Camerún',         'Cameroon',     'CMR', 'CAF',      'D', 'Puma',    'Rigobert Song',      41,  8, 'Cuartos de Final (1990)',    '#007A5E', '#CE1126', FALSE),

-- GRUPO E
('spain',         'España',          'Spain',        'ESP', 'UEFA',     'E', 'Adidas',  'Luis de la Fuente',  3,  16, 'Campeón (2010)',              '#AA151B', '#F1BF00', FALSE),
('netherlands',   'Países Bajos',    'Netherlands',  'NED', 'UEFA',     'E', 'Nike',    'Ronald Koeman',      7,  11, 'Segundo (1974/78/2010)',     '#FF4F00', '#FFFFFF', FALSE),
('ivory-coast',   'Costa de Marfil', 'Ivory Coast',  'CIV', 'CAF',      'E', 'Puma',    'Emerse Faé',         50,  3, 'Segunda Ronda (2006)',       '#F77F00', '#009A44', FALSE),
('new-zealand',   'Nueva Zelanda',   'New Zealand',  'NZL', 'OFC',      'E', 'Nike',    'Darren Bazeley',    105,  3, 'Segunda Ronda (1982)',       '#FFFFFF', '#000000', FALSE),

-- GRUPO F
('argentina',     'Argentina',       'Argentina',    'ARG', 'CONMEBOL', 'F', 'Adidas',  'Lionel Scaloni',     1,  18, 'Campeón (1978/86/2022)',     '#74ACDF', '#FFFFFF', FALSE),
('south-africa',  'Sudáfrica',       'South Africa', 'RSA', 'CAF',      'F', 'Nike',    'Hugo Broos',         60,  3, 'Segunda Ronda (2010)',       '#007A4D', '#FFB81C', FALSE),
('costa-rica',    'Costa Rica',      'Costa Rica',   'CRC', 'CONCACAF', 'F', 'New Balance','Claudio Vivas',  60,  6, 'Cuartos de Final (2014)',    '#002B7F', '#CE1126', FALSE),
('denmark',       'Dinamarca',       'Denmark',      'DEN', 'UEFA',     'F', 'Hummel',  'Kasper Hjulmand',    13,  6, 'Cuartos de Final (1998)',    '#C60C30', '#FFFFFF', FALSE),

-- GRUPO G
('france',        'Francia',         'France',       'FRA', 'UEFA',     'G', 'Nike',    'Didier Deschamps',   2,  16, 'Campeón (1998/2018)',        '#002395', '#ED2939', FALSE),
('uruguay',       'Uruguay',         'Uruguay',      'URY', 'CONMEBOL', 'G', 'Puma',    'Marcelo Bielsa',     17,  14, 'Campeón (1930/1950)',        '#5FFFFF', '#FFFFFF', FALSE),
('angola',        'Angola',          'Angola',       'ANG', 'CAF',      'G', 'Puma',    'Pedro Gonçalves',    95,  1, 'Segunda Ronda (2006)',       '#CC0000', '#000000', FALSE),
('czech-republic','República Checa', 'Czech Republic','CZE','UEFA',     'G', 'Nike',    'Ivan Hašek',         36,  9, 'Tercero (1962 como Checoslov.)',  '#D7141A', '#FFFFFF', FALSE),

-- GRUPO H
('portugal',      'Portugal',        'Portugal',     'POR', 'UEFA',     'H', 'Nike',    'Roberto Martínez',   6,  8, 'Tercero (1966)',             '#009246', '#FF0000', FALSE),
('colombia',      'Colombia',        'Colombia',     'COL', 'CONMEBOL', 'H', 'Adidas',  'Néstor Lorenzo',     18,  6, 'Cuartos de Final (2014)',    '#FCD116', '#003087', FALSE),
('nigeria',       'Nigeria',         'Nigeria',      'NGA', 'CAF',      'H', 'Nike',    'Finidi George',      40,  7, 'Octavos de Final (1994/98/2014)', '#008751', '#FFFFFF', FALSE),
('georgia',       'Georgia',         'Georgia',      'GEO', 'UEFA',     'H', 'Joma',    'Willy Sagnol',       74,  1, 'Debut mundialista exitoso (2026)', '#DA291C', '#FFFFFF', FALSE),

-- GRUPO I
('germany',       'Alemania',        'Germany',      'GER', 'UEFA',     'I', 'Adidas',  'Julian Nagelsmann',  12,  20, 'Campeón (1954/74/90/2014)',  '#000000', '#DD0000', FALSE),
('venezuela',     'Venezuela',       'Venezuela',    'VEN', 'CONMEBOL', 'I', 'Marathon','Fernando Batista',   55,  0, 'Debut mundial',             '#CF142B', '#00247D', FALSE),
('australia',     'Australia',       'Australia',    'AUS', 'AFC',      'I', 'Nike',    'Tony Popovic',       25,  6, 'Cuartos de Final (2006)',    '#00843D', '#FFD700', FALSE),
('senegal',       'Senegal',         'Senegal',      'SEN', 'CAF',      'I', 'Puma',    'Aliou Cissé',        20,  3, 'Cuartos de Final (2002)',    '#00853F', '#FDEF42', FALSE),

-- GRUPO J
('england',       'Inglaterra',      'England',      'ENG', 'UEFA',     'J', 'Nike',    'Thomas Tuchel',      4,  17, 'Campeón (1966)',             '#FFFFFF', '#003399', FALSE),
('iran',          'Irán',            'Iran',         'IRN', 'AFC',      'J', 'Melli',   'Amir Ghalenoei',     21,  6, 'Segunda Ronda (2022)',       '#239F40', '#DA0000', FALSE),
('cuba',          'Cuba',            'Cuba',         'CUB', 'CONCACAF', 'J', 'Joma',    'Marcos Ambriz',     172,  1, 'Cuartos de Final (1938)',    '#002A8F', '#CF142B', FALSE),
('switzerland',   'Suiza',           'Switzerland',  'SUI', 'UEFA',     'J', 'Puma',    'Murat Yakin',        19,  12, 'Cuartos de Final (1934/38/54)', '#FF0000', '#FFFFFF', FALSE),

-- GRUPO K
('belgium',       'Bélgica',         'Belgium',      'BEL', 'UEFA',     'K', 'Adidas',  'Domenico Tedesco',   3,  14, 'Tercero (1986)',             '#000000', '#FDDA24', FALSE),
('peru',          'Perú',            'Peru',         'PER', 'CONMEBOL', 'K', 'Umbro',   'Jorge Fossati',      28,  5, 'Cuartos de Final (1970)',    '#D91023', '#FFFFFF', FALSE),
('south-korea',   'Corea del Sur',   'South Korea',  'KOR', 'AFC',      'K', 'Nike',    'Hong Myung-bo',      23,  11, 'Semifinal (2002)',           '#CD2E3A', '#003478', FALSE),
('egypt',         'Egipto',          'Egypt',        'EGY', 'CAF',      'K', 'Puma',    'Hossam Hassan',      38,  3, 'Segunda Ronda (1990)',       '#CE1126', '#FFFFFF', FALSE),

-- GRUPO L
('qatar',         'Catar',           'Qatar',        'QAT', 'AFC',      'L', 'Nike',    'Tintín Marqués',     37,  1, 'Primera Ronda (2022)',       '#8D1B3D', '#FFFFFF', FALSE),
('austria',       'Austria',         'Austria',      'AUT', 'UEFA',     'L', 'Puma',    'Ralf Rangnick',      26,  8, 'Tercero (1954)',             '#ED2939', '#FFFFFF', FALSE),
('slovakia',      'Eslovaquia',      'Slovakia',     'SVK', 'UEFA',     'L', 'Nike',    'Francesco Calzona',  49,  1, 'Octavos de Final (2010)',    '#005B99', '#FFFFFF', FALSE),
('honduras',      'Honduras',        'Honduras',     'HON', 'CONCACAF', 'L', 'Hummel',  'Reinaldo Rueda',     85,  3, 'Segunda Ronda (1982)',       '#0073CF', '#FFFFFF', FALSE);

-- ============================================================
-- STANDINGS iniciales (0 pts, en espera de resultados)
-- ============================================================

INSERT INTO standings (team_id, group_id)
SELECT id, group_id FROM teams WHERE group_id IS NOT NULL;

-- ============================================================
-- NOTICIAS (8 noticias iniciales en español)
-- ============================================================

INSERT INTO news (slug, title, summary, content, category, is_featured, published_at) VALUES

('sorteo-grupos-diciembre-2024',
 'FIFA define los 12 grupos del Mundial 2026 en sorteo histórico',
 'El sorteo celebrado en Miami distribuyó a los 48 equipos clasificados en doce grupos. México, EE.UU. y Canadá quedaron en grupos separados como anfitriones.',
 'El sorteo del Mundial FIFA 2026 se realizó en el Kaseya Center de Miami ante miles de fanáticos. Por primera vez en la historia, el torneo contará con 48 selecciones divididas en 12 grupos de 4 equipos. Los países anfitriones — México, Estados Unidos y Canadá — fueron ubicados en grupos separados como cabezas de serie. La fase de grupos se jugará del 11 de junio al 2 de julio de 2026, con el partido inaugural en el Estadio Azteca de Ciudad de México.',
 'general', TRUE, '2024-12-05 20:00:00'),

('estadio-azteca-renovacion',
 'Así quedó el Estadio Azteca tras su renovación para el Mundial 2026',
 'El Coloso de Santa Úrsula completó su modernización integral y está listo para albergar el partido inaugural del torneo.',
 'El Estadio Azteca de Ciudad de México completó su renovación integral de tres años para estar a la altura del Mundial 2026. Con una inversión de más de 500 millones de pesos, el estadio renovó sus accesos, sistemas de iluminación LED, pantallas gigantes de última generación y mejoró significativamente la experiencia del aficionado. El Azteca albergará 3 partidos de fase de grupos y uno de octavos de final, además del partido inaugural programado para el 11 de junio de 2026.',
 'general', TRUE, '2025-03-15 12:00:00'),

('argentina-favorita',
 'Argentina: el vigente campeón llega como gran favorito al Mundial 2026',
 'La Albiceleste de Messi busca su tercer título consecutivo en una Copa del Mundo que se jugará en el continente americano, su casa.',
 'Después de conquistar el Mundial de Qatar 2022, la Selección Argentina llega a la cita de 2026 como uno de los máximos favoritos. Lionel Messi, en lo que podría ser su última Copa del Mundo, lidera un equipo consolidado bajo el mando de Lionel Scaloni. El formato de 48 equipos favorece a selecciones de menor historia, por lo que Argentina deberá mantener su nivel desde el primer partido del Grupo F.',
 'general', FALSE, '2025-04-01 10:00:00'),

('mexico-lista-jugadores',
 'El Tri presenta su lista preliminar de 55 jugadores para el Mundial',
 'Javier Aguirre convocó a los candidatos con sorpresas en el ataque: varios jóvenes de la Liga MX se colaron en la lista.',
 'La Selección Mexicana presentó su lista preliminar de 55 jugadores para el Mundial 2026. El técnico Javier Aguirre incluyó a varios jóvenes promesas de la Liga MX que sorprendieron al medio futbolístico. La lista se reducirá a 26 jugadores definitivos antes del torneo. México debuta en el Estadio Azteca el 11 de junio ante Ecuador en el partido inaugural, con la presión y privilegio de jugar en casa.',
 'convocatorias', TRUE, '2025-05-10 15:00:00'),

('metlife-sede-final',
 'MetLife Stadium: el gigante de Nueva Jersey que albergará la Gran Final',
 'El estadio más grande de la NFL, con capacidad para 82,500 espectadores, acogerá la Final del Mundial el 19 de julio de 2026.',
 'El MetLife Stadium de East Rutherford, Nueva Jersey — hogar de los Giants y Jets de la NFL — será el escenario de la Gran Final del Mundial FIFA 2026. Con capacidad para 82,500 espectadores y ubicado a 30 minutos del centro de Manhattan, el estadio se prepara para vivir su mayor evento. Las obras de adecuación ya comenzaron, incluyendo la instalación de una cancha de césped natural y mejoras en la infraestructura de transmisión.',
 'general', FALSE, '2025-02-20 09:00:00'),

('haaland-noruega-clasificada',
 'Noruega clasifica al Mundial 2026 por primera vez desde 1998, con Haaland como estandarte',
 'Los vikingos rompieron una sequía de 28 años sin aparecer en una Copa del Mundo. Erling Haaland fue decisivo en el proceso eliminatorio.',
 'Noruega regresa a una Copa del Mundo por primera vez desde Francia 1998, y lo hace con Erling Haaland como su máxima figura. El delantero del Manchester City fue determinante durante el proceso eliminatorio europeo, con 15 goles en clasificación. Los noruegos se ubican en el Grupo D junto a Brasil, Japón y Camerún, lo que lo convierte en uno de los grupos más apasionantes del torneo.',
 'general', FALSE, '2025-03-28 18:00:00'),

('quiniela-como-funciona',
 '¿Cómo funciona la Quiniela del Mundial 2026 en nuestra app?',
 'Te explicamos paso a paso cómo participar en nuestra quiniela, llenar tus predicciones y ganar el pozo acumulado.',
 'La Quiniela del Mundial 2026 es nuestra función estrella. Funciona así: el organizador crea una quiniela privada, define el costo por boleto (generalmente $100-$200 MXN) y comparte el link de invitación. Los participantes se registran, pagan su boleto y llenan sus predicciones — el marcador exacto que creen tendrá cada partido — antes de que este inicie. Por cada marcador exacto se obtienen 3 puntos; si solo aciertas el ganador o empate, 1 punto. Al final del torneo, quien más puntos acumule gana el pozo. ¡Regístrate y arma tu quiniela!',
 'general', TRUE, '2025-06-01 08:00:00'),

('format-48-equipos-explicado',
 'El nuevo formato de 48 equipos: todo lo que necesitas saber',
 'FIFA expandió el Mundial de 32 a 48 equipos. Aquí te explicamos las fases, cómo se califican los mejores terceros y el camino a la Final.',
 'El Mundial 2026 estrena el formato de 48 selecciones, el mayor en la historia del torneo. Habrá 12 grupos de 4 equipos cada uno, donde los 2 primeros de cada grupo avanzan directamente a octavos de final. Además, los 8 mejores terceros lugares de los 12 grupos también clasifican, completando los 32 equipos de octavos. Esto significa que incluso terminar tercero puede no ser suficiente si no se suman suficientes puntos. La fase eliminatoria va de octavos a cuartos, semis y Gran Final.',
 'curiosidades', FALSE, '2025-01-15 11:00:00');

-- ============================================================
-- NOTA: Los partidos (matches) se insertan desde el frontend
-- con un seed script separado (src/data/schedule.ts)
-- ya que dependen de los UUIDs generados dinámicamente
-- para los equipos y sedes.
-- 
-- Ver: src/data/seeder.ts para el script de inserción
-- de los 48 partidos de fase de grupos.
-- ============================================================

-- ============================================================
-- QUINIELA DE EJEMPLO (para testing)
-- NOTA: Ejecutar solo si ya existe un usuario con is_admin=true
-- ============================================================

-- INSERT INTO quinielas (slug, name, description, admin_id, cost_mxn, prize_type, status, invite_code)
-- SELECT 
--   'mundial-2026-clasica',
--   'Quiniela Mundial 2026 — Clásica',
--   'La quiniela oficial de la app. ¡$100 por boleto, el pozo completo para el ganador!',
--   id,
--   100.00,
--   'winner_takes_all',
--   'open',
--   'WC2026'
-- FROM profiles WHERE is_admin = TRUE LIMIT 1;
