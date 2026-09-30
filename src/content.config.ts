import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const contenido = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/contenido' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    tema: z.string().describe('Slug del tema: agentes, costos, arquitectura, herramientas'),
    tipo: z.enum(['tutorial', 'concepto', 'comparativa', 'noticia']).default('tutorial'),
    tags: z.array(z.string()).default([]),
    herramientas: z.array(z.string()).default([]),
    image: z.string().optional(),
    videoUrl: z.string().url().optional(),
    repoUrl: z.string().url().optional(),
    capitulos: z
      .array(z.object({ tiempo: z.string(), titulo: z.string() }))
      .default([]),
    destacado: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

// Nuevo mes CPS = copiar un `.md` a `src/content/cps/` con nombre AAAA-MM.md.
const cpsFlow = z.object({
  ok: z.number().int().min(0),
  completed: z.number().int().min(0),
  cost_usd: z.number().min(0),
});
const cpsModel = z.object({
  name: z.string(),
  slug: z.string(),
  completed: z.number().int().min(0),
  total: z.number().int().min(0),
  ok: z.number().int().min(0),
  cost_usd: z.number().min(0),
  time_per_task_s: z.number(),
  incomplete: z.boolean(),
  flows: z.record(z.string(), cpsFlow),
  verdict: z.record(z.string(), z.enum(['usable', 'supervision', 'no_usable', 'incompleto'])),
});
const cps = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/cps' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    dataset: z.string(),
    status: z.enum(['completa', 'incompleta']),
    cost_source: z.string(),
    pdf: z.string().optional(),
    models: z.array(cpsModel).min(1),
  }),
});

export const collections = { contenido, cps };
