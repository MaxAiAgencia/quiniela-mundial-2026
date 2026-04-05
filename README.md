# 🏆 FIFA World Cup 2026 — Web App

Aplicación web completa, responsiva y en tiempo real para seguir el Mundial FIFA 2026.
Incluye calendario, grupos, sedes, plantillas, eliminatorias, noticias y sistema de **quiniela monetizable**.

![Stack](https://img.shields.io/badge/React-18-blue?logo=react)
![Stack](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Stack](https://img.shields.io/badge/Tailwind-3-blue?logo=tailwindcss)
![Stack](https://img.shields.io/badge/Supabase-backend-green?logo=supabase)
![Stack](https://img.shields.io/badge/Vite-build-purple?logo=vite)

---

## ✨ Funcionalidades

| Sección | Descripción |
|---|---|
| 🏠 Home | Hero con cuenta regresiva, partidos del día, noticias recientes |
| 🗓️ Calendario | Todos los 64 partidos con filtros por fecha, grupo y sede |
| 🌍 Grupos | 12 grupos con tablas de posiciones en vivo |
| 🏟️ Sedes | 16 estadios con mapa, capacidad y partidos asignados |
| 👕 Equipos | 48 equipos con plantillas completas y estadísticas |
| 🏆 Eliminatorias | Bracket interactivo de octavos a la Gran Final |
| 📰 Noticias | Blog del torneo con categorías y panel de admin |
| 🎯 Quiniela | Sistema completo de apuestas grupales con leaderboard en tiempo real |

---

## 🛠 Stack Tecnológico

```
Frontend:   React 18 + TypeScript + Vite
Estilos:    Tailwind CSS + shadcn/ui
Animaciones: Framer Motion
Routing:    React Router v6
Estado:     Zustand + React Query (TanStack)
Backend:    Supabase (PostgreSQL + Auth + Realtime + Storage)
Deploy:     Vercel
```

---

## 📁 Estructura del Proyecto

```
fifa-2026/
├── public/
│   ├── flags/              # SVGs de banderas de los 48 países
│   └── stadiums/           # Imágenes de estadios
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── ui/             # shadcn/ui base components
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   └── MobileNav.tsx
│   │   ├── match/
│   │   │   ├── MatchCard.tsx
│   │   │   ├── MatchList.tsx
│   │   │   └── MatchFilters.tsx
│   │   ├── group/
│   │   │   ├── GroupTable.tsx
│   │   │   └── GroupCard.tsx
│   │   ├── team/
│   │   │   ├── TeamCard.tsx
│   │   │   ├── TeamFlag.tsx
│   │   │   └── SquadList.tsx
│   │   ├── stadium/
│   │   │   └── StadiumCard.tsx
│   │   ├── bracket/
│   │   │   ├── BracketView.tsx
│   │   │   └── BracketMatch.tsx
│   │   ├── news/
│   │   │   └── NewsCard.tsx
│   │   └── quiniela/
│   │       ├── QuinielaCard.tsx
│   │       ├── PredictionForm.tsx
│   │       ├── Leaderboard.tsx
│   │       └── ShareButton.tsx
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── Calendar.tsx
│   │   ├── Groups.tsx
│   │   ├── Venues.tsx
│   │   ├── Teams.tsx
│   │   ├── TeamDetail.tsx
│   │   ├── Bracket.tsx
│   │   ├── News.tsx
│   │   ├── NewsDetail.tsx
│   │   ├── Quiniela.tsx
│   │   ├── QuinielaDetail.tsx
│   │   └── admin/
│   │       ├── AdminDashboard.tsx
│   │       ├── AdminMatches.tsx
│   │       ├── AdminNews.tsx
│   │       └── AdminQuinielas.tsx
│   ├── lib/
│   │   ├── supabase.ts     # Supabase client
│   │   ├── utils.ts        # Helpers generales
│   │   └── constants.ts    # Constantes del torneo
│   ├── hooks/
│   │   ├── useMatches.ts
│   │   ├── useGroups.ts
│   │   ├── useQuiniela.ts
│   │   └── useRealtime.ts
│   ├── store/
│   │   ├── authStore.ts
│   │   └── quinielaStore.ts
│   ├── types/
│   │   └── index.ts        # TypeScript types globales
│   ├── data/
│   │   ├── teams.ts        # 48 equipos hardcoded
│   │   ├── groups.ts       # 12 grupos
│   │   ├── venues.ts       # 16 sedes
│   │   └── schedule.ts     # Calendario inicial
│   ├── App.tsx
│   ├── main.tsx
│   └── router.tsx
├── supabase/
│   ├── migrations/
│   │   └── 001_initial_schema.sql
│   └── seed.sql
├── .env.example
├── .env.local              # NO commitear
├── tailwind.config.ts
├── tsconfig.json
├── vite.config.ts
└── README.md
```

---

## ⚙️ Instalación y Setup

### 1. Clonar e instalar

```bash
git clone https://github.com/tu-usuario/fifa-2026.git
cd fifa-2026
npm install
```

### 2. Configurar Supabase

1. Crea un proyecto en [supabase.com](https://supabase.com)
2. Copia las credenciales de **Project Settings → API**
3. En la sección **SQL Editor** de Supabase, ejecuta en orden:
   - `supabase/migrations/001_initial_schema.sql`
   - `supabase/seed.sql`

### 3. Variables de entorno

```bash
cp .env.example .env.local
```

Edita `.env.local` con tus credenciales (ver sección abajo).

### 4. Correr en desarrollo

```bash
npm run dev
```

Abre [http://localhost:5173](http://localhost:5173)

---

## 🔐 Variables de Entorno

Crea un archivo `.env.local` en la raíz del proyecto:

```env
# Supabase
VITE_SUPABASE_URL=https://xxxxxxxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Admin (email que tendrá acceso al panel /admin)
VITE_ADMIN_EMAIL=tu@email.com
```

---

## 🚀 Deploy en Vercel

```bash
npm install -g vercel
vercel
```

O conecta tu repositorio de GitHub en [vercel.com](https://vercel.com) y agrega las variables de entorno en **Project Settings → Environment Variables**.

---

## 🎯 Sistema de Quiniela — Guía Rápida

### Para el organizador (admin):
1. Accede a `/admin` con tu cuenta de email admin
2. Ve a **Quinielas → Nueva Quiniela**
3. Define: nombre, costo por boleto, partidos incluidos y reglas de premio
4. Comparte el link único con los participantes

### Para los participantes:
1. Se registran con email o Google
2. El admin marca su pago (campo `pagado = true`)
3. Llenan sus predicciones antes de cada partido
4. El leaderboard se actualiza en tiempo real conforme avanzan los resultados

### Puntuación:
| Acierto | Puntos |
|---|---|
| Marcador exacto (ej. 2-1) | 3 pts |
| Ganador correcto / empate | 1 pt |
| Error total | 0 pts |

---

## 🏟️ Sedes del Mundial 2026

| País | Sedes |
|---|---|
| 🇺🇸 EE.UU. | MetLife (NJ), AT&T (TX), SoFi (CA), Lumen Field (WA), Levi's (CA), Arrowhead (MO), Lincoln Financial (PA), Gillette (MA), Hard Rock (FL), Allegiant (NV), NRG (TX) |
| 🇲🇽 México | Estadio Azteca (CDMX), Akron (GDL), BBVA (MTY) |
| 🇨🇦 Canadá | BC Place (Vancouver), BMO Field (Toronto) |

**Partido inaugural:** 11 junio 2026 — Estadio Azteca, CDMX 🇲🇽  
**Gran Final:** 19 julio 2026 — MetLife Stadium, Nueva Jersey 🇺🇸

---

## 📅 Fechas Clave

```
Fase de Grupos:     11 jun — 2 jul 2026
Octavos de Final:    5 jul — 8 jul 2026
Cuartos de Final:   11 jul — 12 jul 2026
Semifinales:        15 jul — 16 jul 2026
Tercer Lugar:       18 jul 2026
Gran Final:         19 jul 2026
```

---

## 🤝 Contribuciones

Pull requests bienvenidos. Para cambios mayores, abre un issue primero.

---

## 📄 Licencia

MIT — Úsalo, modifícalo y véndelo con quinielas incluidas 🎉
