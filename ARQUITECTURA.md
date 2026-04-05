# 📐 FIFA World Cup 2026 — Especificación de Componentes y Arquitectura

## ARQUITECTURA GENERAL

```
┌─────────────────────────────────────────────────────────────┐
│                        BROWSER                              │
├─────────────────────────────────────────────────────────────┤
│  React App (Vite)                                           │
│  ┌──────────┐  ┌──────────────┐  ┌───────────────────────┐ │
│  │  Router  │  │  Zustand     │  │   TanStack Query      │ │
│  │ (rutas)  │  │  (auth/UI)   │  │   (server state)      │ │
│  └──────────┘  └──────────────┘  └───────────────────────┘ │
├─────────────────────────────────────────────────────────────┤
│  Supabase Client (@supabase/supabase-js)                    │
├─────────────────────────────────────────────────────────────┤
│                     SUPABASE                                │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌───────────┐  │
│  │PostgreSQL│  │   Auth   │  │ Realtime │  │  Storage  │  │
│  └──────────┘  └──────────┘  └──────────┘  └───────────┘  │
└─────────────────────────────────────────────────────────────┘
```

---

## COMPONENTES — ESPECIFICACIÓN DETALLADA

### `<MatchCard />` 
**Archivo:** `src/components/match/MatchCard.tsx`

```
Props:
  match: Match
  variant?: 'default' | 'compact' | 'featured'
  showVenue?: boolean

Visualización:
┌─────────────────────────────────────────────┐
│  🟢 GRUPO A · Jornada 1                     │
│                                             │
│  🇲🇽 MÉXICO   ·vs·   ECUADOR 🇪🇨             │
│                                             │
│  📅 11 Jun 2026 · 17:00 CST                 │
│  🏟 Estadio Azteca, CDMX                    │
└─────────────────────────────────────────────┘

Estados visuales:
- scheduled: borde gris, hora prominente
- live:      borde rojo pulsante, marcador grande "2 - 1 🔴 67'"
- finished:  borde verde, marcador final prominente
```

---

### `<GroupTable />`
**Archivo:** `src/components/group/GroupTable.tsx`

```
Props:
  group_id: GroupId
  standings: Standing[]
  compact?: boolean

Visualización:
┌────────────────────────────────────────────────────────────┐
│  GRUPO A                                                   │
├────┬─────────────────┬────┬───┬───┬───┬────┬────┬────┬────┤
│ POS│ EQUIPO          │ PJ │ G │ E │ P │ GF │ GC │DIF │ PTS│
├────┼─────────────────┼────┼───┼───┼───┼────┼────┼────┼────┤
│  1 │ 🇲🇽 México       │  2 │ 1 │ 1 │ 0 │  3 │  1 │ +2 │  4 │  ← verde
│  2 │ 🇺🇦 Ucrania       │  2 │ 1 │ 0 │ 1 │  2 │  2 │  0 │  3 │  ← verde
│  3 │ 🇪🇨 Ecuador       │  2 │ 0 │ 1 │ 1 │  1 │  2 │ -1 │  1 │  ← amarillo*
│  4 │ 🇮🇶 Irak          │  2 │ 0 │ 0 │ 2 │  0 │  1 │ -1 │  0 │
└────┴─────────────────┴────┴───┴───┴───┴────┴────┴────┴────┘
*amarillo = posible mejor 3ro
```

---

### `<BracketView />`
**Archivo:** `src/components/bracket/BracketView.tsx`

```
Layout horizontal scrollable:

Octavos  Cuartos   Semis   Tercer  Final
  │         │        │      Lugar    │
[1A vs 2B] ─┐        │        │      │
             ├─[W1 vs W2]─┐   │      │
[1C vs 2D] ─┘             │   │      │
                      ├─[W5 vs W6]   │
[1E vs 2F] ─┐             │          │
             ├─[W3 vs W4]─┘          │
[1G vs 2H] ─┘                        │
                                  FINAL
[...8 partidos más...]

Animación: al actualizar ganador, slide-in hacia la derecha con Framer Motion
```

---

### `<QuinielaCard />`
**Archivo:** `src/components/quiniela/QuinielaCard.tsx`

```
Props:
  match: Match
  prediction?: QuinielaPrediction
  onSave: (matchId: string, home: number, away: number) => void
  readonly?: boolean

Visualización (activo):
┌─────────────────────────────────────────────────────┐
│  Grupo A · 11 Jun · Azteca                          │
│                                                     │
│  🇲🇽 México  [  2  ]  -  [  1  ]  Ecuador 🇪🇨        │
│                                                     │
│  ✏️ Sin guardar                    [Guardar]         │
└─────────────────────────────────────────────────────┘

Visualización (bloqueado con resultado):
┌─────────────────────────────────────────────────────┐
│  🔒 Partido finalizado                              │
│                                                     │
│  🇲🇽 México   2  -  1   Ecuador 🇪🇨                  │
│  Tu predicción: 2 - 1  ✅ +3 pts (¡Exacto!)        │
└─────────────────────────────────────────────────────┘
```

---

### `<Leaderboard />`
**Archivo:** `src/components/quiniela/Leaderboard.tsx`

```
Props:
  quiniela_id: string
  current_user_id: string

Visualización:
┌──────────────────────────────────────────────────────────┐
│  🏆 Clasificación en tiempo real          [24 jugadores] │
├──────────────────────────────────────────────────────────┤
│ 🥇  1  │ @carlosgdl   │ 47 pts │ 12✅ │ 29🟡 │ ✓ Pagado │
│ 🥈  2  │ @maripaz     │ 44 pts │ 10✅ │ 24🟡 │ ✓ Pagado │
│ 🥉  3  │ @juanmx      │ 41 pts │  9✅ │ 23🟡 │ ✓ Pagado │
├──────────────────────────────────────────────────────────┤
│    4   │ @analuisa    │ 38 pts │  8✅ │ 22🟡 │           │
│    5   │ @robertof    │ 35 pts │  8✅ │ 19🟡 │           │
│   ...  │    ...       │  ...   │  ... │  ... │           │
├──────────────────────────────────────────────────────────┤
│ ★  12  │ @TÚ (max_u)  │ 22 pts │  4✅ │ 14🟡 │ ✓ Pagado │  ← sticky
└──────────────────────────────────────────────────────────┘

Realtime: badge verde "En vivo" pulsante + última actualización hace X seg
```

---

## HOOKS — DESCRIPCIÓN

### `useMatches(filters?)`
```ts
// Fetch de partidos con filtros opcionales
// Cache: 5 minutos (resultados cambian poco)
// Realtime: suscripción a cambios de status
const { data, isLoading, error } = useMatches({ phase: 'group', group_id: 'A' })
```

### `useGroups()`
```ts
// Todos los grupos con standings actualizados
// Cache: 2 minutos durante fase de grupos
// Refetch automático cada 60s si hay partido en vivo
const { groups } = useGroups()
```

### `useQuiniela(quinielaId)`
```ts
// Datos de quiniela + participantes + predicciones del usuario actual
// Realtime: leaderboard se actualiza en tiempo real
const { quiniela, predictions, leaderboard } = useQuiniela(id)
```

### `useRealtime(channel, table, callback)`
```ts
// Hook genérico para suscripciones de Supabase Realtime
// Se limpia automáticamente al desmontar el componente
useRealtime('leaderboard-' + id, 'quiniela_participants', (payload) => {
  refetchLeaderboard()
})
```

---

## ZUSTAND STORES

### `authStore`
```ts
interface AuthStore {
  user: User | null
  profile: Profile | null
  isAdmin: boolean
  isLoading: boolean
  signIn: (email, password) => Promise<void>
  signInWithGoogle: () => Promise<void>
  signOut: () => Promise<void>
  updateProfile: (data) => Promise<void>
}
```

### `quinielaStore`
```ts
interface QuinielaStore {
  currentQuiniela: Quiniela | null
  unsavedPredictions: Map<string, { home: number; away: number }>
  setPrediction: (matchId, home, away) => void
  saveAllPredictions: () => Promise<void>
  clearUnsaved: () => void
}
```

---

## RUTAS COMPLETAS

```
/                           → Home
/calendario                 → Calendario completo
/grupos                     → Vista de 12 grupos
/grupos/:groupId            → Detalle de un grupo (A-L)
/sedes                      → Grid de 16 sedes
/sedes/:slug                → Detalle de sede
/equipos                    → Grid de 48 equipos
/equipos/:slug              → Detalle + plantilla del equipo
/eliminatorias              → Bracket interactivo
/noticias                   → Grid de noticias
/noticias/:slug             → Artículo completo
/quiniela                   → Mis quinielas / Landing
/quiniela/nueva             → Crear quiniela
/quiniela/unirse/:code      → Unirse con código de invitación
/quiniela/:id               → Detalle de quiniela (tabs)
/quiniela/:id/admin         → Panel admin de quiniela
/login                      → Login / Registro
/admin                      → Dashboard admin
/admin/partidos             → Gestión de resultados
/admin/noticias             → Gestión de noticias
/admin/equipos              → Gestión de equipos y plantillas
/admin/quinielas            → Vista global de quinielas
*                           → 404
```

---

## CONSIDERACIONES DE RENDIMIENTO

1. **Code splitting por ruta** — React.lazy() en cada página
2. **Image optimization** — usar `loading="lazy"` en todas las imágenes
3. **Virtual scrolling** — para la lista de 48 partidos de fase de grupos
4. **Memoización** — React.memo en MatchCard, GroupTable, QuinielaCard
5. **Stale-while-revalidate** — TanStack Query con staleTime apropiado:
   - Equipos/Sedes: `staleTime: Infinity` (no cambian)
   - Standings: `staleTime: 60_000` (1 min)
   - Partidos en vivo: `staleTime: 10_000` + polling
   - Leaderboard: Supabase Realtime (no polling)

---

## MANEJO DE ERRORES

```tsx
// Boundary global
<ErrorBoundary fallback={<ErrorPage />}>
  <App />
</ErrorBoundary>

// En cada query:
if (error) return <ErrorCard message="Error cargando partidos" retry={refetch} />
if (isLoading) return <SkeletonList count={5} />
```

---

## INTERNACIONALIZACIÓN DE FECHAS (México)

```ts
// src/lib/utils.ts

export const formatMatchDate = (iso: string) =>
  new Intl.DateTimeFormat('es-MX', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    timeZone: 'America/Mexico_City'
  }).format(new Date(iso))

export const formatMatchTime = (iso: string) =>
  new Intl.DateTimeFormat('es-MX', {
    hour: '2-digit',
    minute: '2-digit',
    timeZoneName: 'short',
    timeZone: 'America/Mexico_City'
  }).format(new Date(iso))

export const formatMXN = (amount: number) =>
  new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN'
  }).format(amount)
```
