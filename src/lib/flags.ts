/**
 * Mapa de códigos FIFA a ISO-2 (para URLs de banderas)
 * Fuente: fifa.com
 */
export const fifaToIso2: Record<string, string> = {
  // Grupo A
  MEX: 'mx', RSA: 'za', KOR: 'kr', CZE: 'cz',
  // Grupo B
  CAN: 'ca', BIH: 'ba', QAT: 'qa', SUI: 'ch',
  // Grupo C
  BRA: 'br', MAR: 'ma', HAI: 'ht', SCO: 'gb-sct',
  // Grupo D
  USA: 'us', PAR: 'py', AUS: 'au', TUR: 'tr',
  // Grupo E
  GER: 'de', CUW: 'cw', CIV: 'ci', ECU: 'ec',
  // Grupo F
  NED: 'nl', JPN: 'jp', SWE: 'se', TUN: 'tn',
  // Grupo G
  BEL: 'be', EGY: 'eg', IRN: 'ir', NZL: 'nz',
  // Grupo H
  ESP: 'es', CPV: 'cv', KSA: 'sa', URU: 'uy',
  // Grupo I
  FRA: 'fr', SEN: 'sn', IRQ: 'iq', NOR: 'no',
  // Grupo J
  ARG: 'ar', ALG: 'dz', AUT: 'at', JOR: 'jo',
  // Grupo K
  POR: 'pt', COD: 'cd', UZB: 'uz', COL: 'co',
  // Grupo L
  ENG: 'gb-eng', CRO: 'hr', GHA: 'gh', PAN: 'pa',
}

/**
 * Obtener URL de bandera a partir del código FIFA
 * Usa flagcdn.com que soporta subdivisiones de GB (England, Scotland)
 */
export function getFlagUrl(fifaCode: string, size: number = 80): string {
  const iso = fifaToIso2[fifaCode?.toUpperCase()]
  if (!iso) return `https://flagcdn.com/w${size}/${fifaCode?.toLowerCase()?.slice(0, 2)}.png`
  return `https://flagcdn.com/w${size}/${iso}.png`
}
