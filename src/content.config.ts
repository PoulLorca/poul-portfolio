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

export const collections = { contenido };
