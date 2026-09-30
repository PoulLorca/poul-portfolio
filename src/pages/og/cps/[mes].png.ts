import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { renderOgPng } from '@/lib/og';

export async function getStaticPaths() {
  const meses = await getCollection('cps');
  return meses.map((m) => ({
    params: { mes: m.id.replace(/\.md$/, '') },
    props: {
      eyebrow: `CPS · ${m.data.dataset}`,
      title: m.data.title,
    },
  }));
}

export const GET: APIRoute = async ({ props }) => {
  const png = await renderOgPng({
    eyebrow: props.eyebrow,
    title: props.title,
  });
  return new Response(png, { headers: { 'Content-Type': 'image/png' } });
};
