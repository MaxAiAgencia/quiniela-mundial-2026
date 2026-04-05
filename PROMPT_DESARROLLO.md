# 🏆 FIFA WORLD CUP 2026 — PROMPT MAESTRO DE DESARROLLO

> Usa este prompt en **Claude Code**, **Lovable**, **Bolt** o **Replit Agent**
> Para mejores resultados en Lovable/Bolt: pega sección por sección en el orden indicado
> Para Claude Code: puedes pegar el prompt completo de una vez

---

## 📋 CONTEXTO DEL PROYECTO

Desarrolla una **Web App completa, moderna y 100% responsiva** para el FIFA World Cup 2026.
La app debe ser visualmente impresionante, con una identidad visual fuerte y consistente.

**Stack obligatorio:**
```
React 18 + TypeScript + Vite
Tailwind CSS + shadcn/ui
React Router v6
Zustand (estado global) + TanStack Query (server state)
Supabase (PostgreSQL + Auth + Realtime + Storage)
Framer Motion (animaciones)
```

**Paleta de colores oficial:**
```css
--fifa-navy:  #0D1B2A   /* Fondo principal */
--fifa-red:   #C41230   /* Acento rojo */
--fifa-gold:  #C9A84C   /* Dorado/premium */
--fifa-white: #F5F5F5   /* Texto claro */
--fifa-blue:  #00A8E8   /* Acento azul */
```

**Tipografía:**
- Títulos: `Bebas Neue` (Google Fonts) — bold, impactante
- Cuerpo: `DM Sans` (Google Fonts) — limpio, legible

**Idioma de la UI:** Español (México) en todo momento

---

## 🏗 FASE 1 — SETUP E INFRAESTRUCTURA

```
1. Inicializa proyecto: Vite + React + TypeScript
2. Configura Tailwind CSS con la paleta de colores custom en tailwind.config.ts
3. Instala y configura shadcn/ui
4. Instala dependencias: framer-motion, @supabase/supabase-js, zustand,
   @tanstack/react-query, react-router-dom, react-confetti, lucide-react
5. Crea src/lib/supabase.ts con el cliente de Supabase
6. Crea src/types/index.ts con los tipos TypeScript del proyecto (ver archivo adjunto)
7. Configura React Router con las 8 rutas principales más /admin
8. Crea el Layout base: Sidebar fija en desktop, Bottom Navigation en móvil
```

**Layout responsivo:**
```
Mobile (<768px):   Contenido full width + Bottom Nav de 5 íconos
Tablet (768-1024): Sidebar colapsable (overlay)
Desktop (>1024px): Sidebar fija de 240px + contenido principal
```

**Estructura de navegación (Sidebar/BottomNav):**
```
🏠 Inicio          → /
🗓 Calendario      → /calendario
🌍 Grupos          → /grupos
🏟 Sedes           → /sedes
👕 Equipos         → /equipos
🏆 Eliminatorias   → /eliminatorias
📰 Noticias        → /noticias
🎯 Quiniela        → /quiniela
```

---

## 🏗 FASE 2 — DATOS Y COMPONENTES BASE

```
1. Crea src/data/teams.ts con los 48 equipos (ver seed.sql para los datos)
2. Crea src/data/venues.ts con las 16 sedes
3. Crea src/data/groups.ts que agrupa los equipos A-L
4. Crea src/data/schedule.ts con el calendario de fase de grupos
5. Crea src/lib/supabase-seeder.ts que inserta estos datos en Supabase al iniciar
```

**Componentes base a crear:**

```tsx
// src/components/match/MatchCard.tsx
// Muestra: banderas, nombres de equipos, fecha/hora, sede, estado (badge)
// Estado "live" → pulso rojo animado
// Estado "finished" → marcador prominente

// src/components/team/TeamFlag.tsx
// Bandera del país + nombre, tamaños: sm | md | lg

// src/components/group/GroupTable.tsx
// Tabla: POS, EQUIPO, PJ, G, E, P, GF, GC, DIF, PTS
// Top 2 → fondo verde suave (clasificados)
// Posibles mejores 3ros → fondo amarillo

// src/components/quiniela/QuinielaCard.tsx
// Predicción individual: dos inputs numéricos con banderas
// Disabled si locked=true, con badge "Bloqueado"
```

---

## 🏗 FASE 3 — PÁGINAS PRINCIPALES

### 3A. HOME (/)

Hero animado con:
- Logo del Mundial 2026 centrado
- Cuenta regresiva con días/horas/minutos/segundos al 11 jun 2026
- Subtítulo: "El Mundial más grande de la historia"

Secciones debajo del hero:
- "Próximos partidos" (3 MatchCards horizontales)
- "Grupos en juego" (tabla compacta del grupo más activo)
- "Últimas noticias" (3 NewsCards en grid)
- Banner CTA de Quiniela: "¿Listo para ganar? Únete a la Quiniela →"

---

### 3B. CALENDARIO (/calendario)

Filtros en barra superior:
- Selector de fase (Grupos / Octavos / Cuartos / Semis / Final)
- Selector de grupo (A-L, solo en fase grupos)
- Selector de equipo (dropdown con buscador)
- Selector de sede
- Toggle: Vista lista / Vista cuadrícula

Lista de partidos agrupados por fecha.
Cada partido: MatchCard con animación de entrada (stagger).
Badge de estado: "Próximo" (gris) / "En Vivo 🔴" (rojo pulsante) / "Finalizado" (verde)

---

### 3C. GRUPOS (/grupos)

Grid de 12 grupos (A-L), 3 columnas en desktop, 2 en tablet, 1 en móvil.
Cada grupo: GroupTable + lista de partidos del grupo.
Al hacer click en un equipo dentro de la tabla → navegar a /equipos/:slug

---

### 3D. SEDES (/sedes)

Mapa interactivo (Google Maps embed) con pins de las 16 sedes.
Filtro por país: 🇺🇸 EE.UU. / 🇲🇽 México / 🇨🇦 Canadá

Grid de StadiumCards:
- Imagen del estadio (placeholder de unsplash)
- Nombre, ciudad, país (bandera)
- Capacidad con ícono
- Badge "Gran Final" para MetLife / "Partido Inaugural" para Azteca
- Número de partidos asignados

---

### 3E. EQUIPOS (/equipos y /equipos/:slug)

Vista lista: 48 equipos en grid con filtro por confederación.
Cada TeamCard: bandera grande, nombre, confederación, posición FIFA.

Página de detalle (/equipos/:slug):
- Banner con colores del equipo (primary_color + secondary_color)
- Escudo + nombre oficial + confederación
- Estadísticas: participaciones mundiales, mejor resultado
- Patrocinador de kit (badge)
- Entrenador con ícono
- Plantilla organizada en 4 secciones: GK / DF / MF / FW
  - Cada jugador: número, foto placeholder, nombre, club
  - Capitán marcado con banda especial
- Fixture del equipo: todos sus partidos con resultados

---

### 3F. ELIMINATORIAS (/eliminatorias)

Bracket visual horizontal que muestra:
Octavos (16) → Cuartos (8) → Semis (4) → 3er Lugar (1) → Final (1)

- Diseño tipo "árbol de copa" con líneas conectoras SVG
- Slots vacíos con "Por definir" en gris hasta que haya resultados
- Al haber ganador, su nombre/bandera avanza al siguiente round con animación
- Al final: el campeón con animación de confetti y trofeo 🏆

Panel de estadísticas bajo el bracket:
- Goleador del torneo
- Equipo con más goles
- Portero con menos goles recibidos

---

### 3G. NOTICIAS (/noticias y /noticias/:slug)

Grid de NewsCards con imagen, título, categoría (badge), fecha y resumen.
Filtros: Todos / Resultados / Lesiones / Convocatorias / Curiosidades / Historia
Paginación: 9 noticias por página.

Detalle de noticia (/noticias/:slug):
- Imagen hero full-width
- Título grande + meta (autor, fecha, categoría)
- Contenido en prosa con tipografía legible
- Botones de compartir (WhatsApp, Twitter/X, copiar link)
- 3 noticias relacionadas al pie

---

## 🏗 FASE 4 — QUINIELA (Sección estrella 🎯)

Esta es la sección más importante. Implementar con Supabase Auth + Realtime.

### AUTENTICACIÓN

```
- Login/Registro con email+contraseña
- Botón "Continuar con Google" (Supabase OAuth)
- Al registrarse: se crea el perfil automáticamente (trigger en DB)
- Rutas protegidas: /quiniela/* requiere estar autenticado
```

### FLUJO COMPLETO

**Landing de Quiniela (/quiniela):**
- Si no autenticado: pantalla de login/registro con descripción de la quiniela
- Si autenticado: lista de quinielas a las que pertenece + botón "Unirse a quiniela"
- Botón "Crear quiniela" (visible para todos los usuarios autenticados)

**Crear Quiniela (/quiniela/nueva):**
```
Form con:
- Nombre de la quiniela *
- Descripción opcional
- Costo por boleto (MXN) *
- Tipo de premio: "Todo al ganador" | "Top 3 (60/30/10%)" | "Personalizado"
- Fases incluidas: checkboxes [Fase de Grupos] [Eliminatorias]
- Sistema de puntos: exacto (default 3) / ganador (default 1)
- Límite de participantes (opcional)
- Fecha límite de registro
Al guardar: genera invite_code único de 6 caracteres alfanuméricos
```

**Detalle de Quiniela (/quiniela/:id):**

4 tabs principales:
1. **Mis Predicciones** — Form para llenar predicciones
2. **Clasificación** — Leaderboard en tiempo real
3. **Partidos** — Ver resultados vs predicciones
4. **Info** — Detalles, reglas, cómo pagar

**Tab 1 — Mis Predicciones:**
```
- Lista de todos los partidos incluidos en la quiniela
- Cada partido: QuinielaCard con banderas + 2 inputs numéricos
- Progress bar: "Has llenado 20/48 predicciones"
- Botón "Guardar todas" sticky al fondo
- Partidos pasados: bloqueados con badge "Cerrado 🔒"
- Si partido en vivo: badge rojo pulsante + bloqueado
- Agrupar por fecha con cabecera de fecha
```

**Tab 2 — Clasificación (Leaderboard):**
```
- Top 3 con cards especiales: 🥇 🥈 🥉 con fondo dorado/plata/bronce
- Lista del resto con: pos, avatar, nombre, puntos, exactos, correctos
- Mi posición siempre visible aunque esté en el lugar 37
- Actualización en tiempo real con Supabase Realtime
  (supabase.channel('quiniela-' + id).on('postgres_changes'...))
- Badge "Sin pagar ⚠️" en participantes que no han pagado
```

**Tab 3 — Partidos:**
```
- Lista de partidos con resultado real vs predicción del usuario
- Íconos de resultado: ✅ exacto (3pts) / 🟡 correcto (1pt) / ❌ error (0pts)
- Partidos futuros: mostrar solo la predicción del usuario (ocultar las de otros)
```

**Tab 4 — Info:**
```
- Nombre y descripción de la quiniela
- Costo y estado de pago del usuario actual
- Reglas de puntuación
- Link de invitación con botón de copiar
- Botón "Compartir por WhatsApp" con mensaje prediseñado:
  "¡Únete a mi quiniela del Mundial 2026! 🏆⚽
   Quiniela: {nombre}
   Costo: ${monto} MXN
   Únete aquí: {link}
   Código: {invite_code}"
```

**Panel Admin de Quiniela (solo admin de la quiniela):**
```
- Botón "⚙️ Admin" en el detalle de quiniela (solo visible al admin)
- Lista de participantes con: nombre, email, estado de pago, puntos
- Toggle de pago por participante (pagado / pendiente)
- Input de método de pago y nota
- Botón "Cerrar quiniela y declarar ganadores"
- Formulario de resultados: ingresar marcador final de cada partido
```

---

## 🏗 FASE 5 — PANEL DE ADMINISTRACIÓN (/admin)

Ruta protegida. Solo accesible si `profile.is_admin = true`.

```
Dashboard:
- Tarjetas resumen: partidos hoy, quinielas activas, usuarios registrados, noticias publicadas
- Accesos rápidos a cada sección

/admin/partidos:
- Lista todos los partidos con filtros
- Al hacer click: modal para ingresar resultado
  - Score final (local - visitante)
  - ¿Hubo tiempo extra? → score de tiempo extra
  - ¿Hubo penales? → score de penales
  - Cambiar estado: scheduled → live → finished
- Al guardar resultado: los triggers de DB calculan standings y puntos de quinielas automáticamente

/admin/noticias:
- Lista con editar/eliminar/publicar
- Formulario de nueva noticia:
  - Título, slug (auto-generado), resumen, contenido (textarea rico)
  - Categoría, imagen URL, es_destacada, publicar_ahora

/admin/equipos:
- Editar datos de cada equipo (coach, ranking FIFA)
- Agregar/editar jugadores de plantilla

/admin/quinielas:
- Ver todas las quinielas creadas por usuarios
- Estadísticas: total participantes, total recaudado
```

---

## 🏗 FASE 6 — DETALLES FINALES Y DEPLOY

```
1. SEO básico: React Helmet con título/description por página
2. PWA: vite-plugin-pwa para que sea instalable en móvil
3. Loading states: Skeleton components en todas las listas
4. Error boundaries: pantalla de error amigable
5. 404 page: con link al home y diseño en tema del mundial
6. Optimistic updates en predicciones de quiniela
7. Toast notifications (sonner o react-hot-toast)
8. Accesibilidad: aria-labels, foco visible, contraste adecuado
```

**Deploy en Vercel:**
```bash
npm run build
vercel --prod
# Agregar variables de entorno en Vercel Dashboard:
# VITE_SUPABASE_URL
# VITE_SUPABASE_ANON_KEY
# VITE_ADMIN_EMAIL
```

---

## 📌 ORDEN DE IMPLEMENTACIÓN RECOMENDADO

Si el agente pide prioridad, seguir este orden exacto:

```
1.  Setup + Router + Layout responsivo
2.  Conexión Supabase + tipos TypeScript
3.  Seed de datos (equipos, sedes, grupos)
4.  Componentes base (MatchCard, TeamFlag, GroupTable)
5.  Página: Grupos
6.  Página: Calendario (con filtros)
7.  Página: Sedes
8.  Página: Equipos + detalle
9.  Página: Eliminatorias (bracket)
10. Página: Noticias + detalle
11. Auth (login/registro)
12. Quiniela: crear y unirse
13. Quiniela: predicciones + leaderboard realtime
14. Quiniela: panel de admin
15. Home (junta todo)
16. Panel Admin global (/admin)
17. PWA + SEO + optimizaciones
18. Deploy Vercel
```

---

## ⚠️ REGLAS CRÍTICAS PARA EL AGENTE

1. **Mobile first SIEMPRE** — Diseña para 375px primero, luego escala
2. **No hardcodear IDs** — Usar slugs o códigos de país para referencias
3. **Supabase Realtime** en leaderboard y resultados de partidos
4. **Predicciones inmutables** — Nunca permitir editar una predicción después de que el partido inicie
5. **RLS activo** — Nunca exponer datos de predicciones de otros usuarios antes del inicio del partido
6. **Idioma: Español (México)** — Fechas, números, moneda: todo en formato mexicano
7. **Skeleton loaders** en cada componente que haga fetch a Supabase
8. **Optimistic updates** en el guardado de predicciones para UX fluida
