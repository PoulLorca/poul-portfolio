import type { APIRoute } from 'astro';
import { renderOgPng } from '@/lib/og';

export const GET: APIRoute = async () => {
  const png = await renderOgPng({
    eyebrow: 'POUL LORCA',
    title: 'Poul Lorca — IA, automatización y negocios',
  });
  return new Response(png, { headers: { 'Content-Type': 'image/png' } });
};
