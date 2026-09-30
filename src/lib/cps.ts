import { marked } from 'marked';

// Flujos fijos del índice CPS (F1–F4 en orden).
export const FLUJOS = [
  { key: 'F1', label: 'Correo' },
  { key: 'F2', label: 'Consulta' },
  { key: 'F3', label: 'Reporte' },
  { key: 'F4', label: 'Extracción' },
] as const;

export type FlujoKey = (typeof FLUJOS)[number]['key'];

export interface CpsFlowData {
  ok: number;
  completed: number;
  cost_usd: number;
}

export interface CpsModelData {
  name: string;
  slug: string;
  completed: number;
  total: number;
  ok: number;
  cost_usd: number;
  time_per_task_s: number;
  incomplete: boolean;
  flows: Record<string, CpsFlowData>;
  verdict: Record<string, string>;
}

export interface CpsSection {
  slug: string;
  title: string;
  md: string;
}

// Deriva un slug estable desde el título de una sección `##`.
function slugify(titulo: string): string {
  return titulo
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Divide el cuerpo markdown por encabezados `## ` preservando el orden.
// Tolera secciones opcionales ausentes (p. ej. `Notas de la corrida`).
export function splitSections(body: string): CpsSection[] {
  const re = /^##\s+(.+?)\s*$/gm;
  const matches = [...body.matchAll(re)];
  if (matches.length === 0) return [];
  const secciones: CpsSection[] = [];
  for (let i = 0; i < matches.length; i++) {
    const m = matches[i];
    const title = (m[1] ?? '').trim();
    const start = (m.index ?? 0) + m[0].length;
    const end = i + 1 < matches.length ? (matches[i + 1].index ?? body.length) : body.length;
    const md = body.slice(start, end).trim();
    secciones.push({ slug: slugify(title), title, md });
  }
  return secciones;
}

// Convierte markdown a HTML en build (solo server-side). GFM on para tablas.
export function renderMd(md: string): string {
  return marked.parse(md, { gfm: true }) as string;
}

// CPS global: cost_usd / ok; null si ok === 0.
export function cps(model: CpsModelData): number | null {
  if (model.ok === 0) return null;
  return model.cost_usd / model.ok;
}

// CPS de un flujo: cost_usd / ok; null si ok === 0 o el flujo no existe.
export function cpsFlujo(model: CpsModelData, key: string): number | null {
  const f = model.flows?.[key];
  if (!f || f.ok === 0) return null;
  return f.cost_usd / f.ok;
}

// Quita sintaxis markdown y colapsa espacios (para SEO).
export function plainText(md: string): string {
  return md
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`([^`]*)`/g, '$1')
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/(\*\*|__)(.*?)\1/g, '$2')
    .replace(/(\*|_)(.*?)\1/g, '$2')
    .replace(/~~(.*?)~~/g, '$1')
    .replace(/^>\s?/gm, '')
    .replace(/^\s*[-*+]\s+/gm, '')
    .replace(/^\s*\d+[.)]\s+/gm, '')
    .replace(/\|/g, ' ')
    .replace(/^[\s:|-]+$/gm, ' ')
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

// Descripción SEO (~155 caracteres, corte en límite de palabra).
export function seoDescription(veredictoMd: string): string {
  const text = plainText(veredictoMd);
  if (text.length <= 155) return text;
  const corte = text.slice(0, 155);
  const ultimoEspacio = corte.lastIndexOf(' ');
  if (ultimoEspacio > 80) return corte.slice(0, ultimoEspacio) + '…';
  return corte + '…';
}
