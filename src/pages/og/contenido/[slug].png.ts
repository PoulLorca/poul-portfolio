import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import temasData from '@/data/temas.json';
import { renderOgPng } from '@/lib/og';

// Mismo filtro de drafts que la página: en dev sí se generan (para revisarlas),
// en producción se excluyen.
export async function getStaticPaths() {
  const piezas = await getCollection(
    'contenido',
    ({ data }) => import.meta.env.DEV || !data.draft
  );
  return piezas.map((p) => {
    const temaTitulo =
      (temasData as { slug: string; title: string }[]).find((t) => t.slug === p.data.tema)
        ?.title ?? p.data.tema;
    return {
      params: { slug: p.id.replace(/\.md$/, '') },
      props: {
        eyebrow: `POUL LORCA · ${temaTitulo}`,
        title: p.data.title,
      },
    };
  });
}

export const GET: APIRoute = async ({ props }) => {
  const png = await renderOgPng({
    eyebrow: props.eyebrow,
    title: props.title,
  });
  return new Response(png, { headers: { 'Content-Type': 'image/png' } });
};
