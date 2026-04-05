import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

// ─── Tailwind class merging ───────────────────────────────────
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// ─── Formato de fechas en Español México ─────────────────────
export const formatMatchDate = (iso: string): string =>
  new Intl.DateTimeFormat('es-MX', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    timeZone: 'America/Mexico_City',
  }).format(new Date(iso))

export const formatMatchDateShort = (iso: string): string =>
  new Intl.DateTimeFormat('es-MX', {
    day: 'numeric',
    month: 'short',
    timeZone: 'America/Mexico_City',
  }).format(new Date(iso))

export const formatMatchTime = (iso: string): string =>
  new Intl.DateTimeFormat('es-MX', {
    hour: '2-digit',
    minute: '2-digit',
    timeZoneName: 'short',
    timeZone: 'America/Mexico_City',
  }).format(new Date(iso))

export const formatMXN = (amount: number): string =>
  new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
  }).format(amount)

// ─── Cuenta regresiva al Mundial ─────────────────────────────
export const getCountdown = () => {
  const worldCupStart = new Date('2026-06-11T18:00:00Z') // Partido inaugural UTC
  const now = new Date()
  const diff = worldCupStart.getTime() - now.getTime()

  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, started: true }

  const days    = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours   = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((diff % (1000 * 60)) / 1000)

  return { days, hours, minutes, seconds, started: false }
}

// ─── Label de fase en español ─────────────────────────────────
export const phaseLabel: Record<string, string> = {
  group:       'Fase de Grupos',
  round_of_32: 'Dieciseisavos de Final',
  round_of_16: 'Octavos de Final',
  quarterfinal:'Cuartos de Final',
  semifinal:   'Semifinal',
  third_place: 'Tercer Lugar',
  final:       'Gran Final',
}

// ─── Label de estado en español ───────────────────────────────
export const statusLabel: Record<string, string> = {
  scheduled: 'Próximo',
  live:      'En Vivo',
  finished:  'Finalizado',
  postponed: 'Suspendido',
}

// ─── Emoji de país ISO2 ──────────────────────────────────────
export const countryFlag = (code: string): string => {
  const codePoints = code
    .toUpperCase()
    .split('')
    .map((char) => 127397 + char.charCodeAt(0))
  return String.fromCodePoint(...codePoints)
}

// ─── Generar slug ─────────────────────────────────────────────
export const slugify = (str: string): string =>
  str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

// ─── Código de invitación aleatorio ──────────────────────────
export const generateInviteCode = (): string => {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  return Array.from({ length: 6 }, () =>
    chars[Math.floor(Math.random() * chars.length)]
  ).join('')
}
