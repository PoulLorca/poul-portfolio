// Mapa slug → color para el radar CPS. El color de cada modelo se mantiene entre meses.
// Paleta base Okabe–Ito (apta para daltónicos).
const PALETA = [
  '#0072B2',
  '#D55E00',
  '#009E73',
  '#E69F00',
  '#56B4E9',
  '#CC79A7',
  '#F0E442',
  '#000000',
];

export const cpsColors: Record<string, string> = {
  'openrouter_minimax-m3': PALETA[0],
  'openrouter_glm-4.6': PALETA[1],
  'openrouter_deepseek-v3.2': PALETA[2],
};

// Color determinista para slugs fuera del mapa: hash djb2 → índice de la paleta.
export function colorForSlug(slug: string): string {
  const fijo = cpsColors[slug];
  if (fijo) return fijo;
  let hash = 5381;
  for (let i = 0; i < slug.length; i++) {
    hash = ((hash << 5) + hash + slug.charCodeAt(i)) | 0;
  }
  return PALETA[Math.abs(hash) % PALETA.length];
}

// Hex + opacidad (0–1) → rgba para el relleno del radar.
export function withAlpha(hex: string, alpha: number): string {
  const h = hex.replace('#', '');
  const full = h.length === 3 ? h.split('').map((c) => c + c).join('') : h;
  const r = parseInt(full.slice(0, 2), 16);
  const g = parseInt(full.slice(2, 4), 16);
  const b = parseInt(full.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
