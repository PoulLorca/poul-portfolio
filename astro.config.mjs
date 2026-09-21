// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

import vue from '@astrojs/vue';
import sitemap from '@astrojs/sitemap';
import pagefind from 'astro-pagefind';

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [vue(), sitemap(), pagefind()],
  site: 'https://poullorca.dev',
  // Solo redirects estáticos: los comodines (/blog/*, /posts/*) van en vercel.json
  // porque en output estático Astro exigiría getStaticPaths para rutas dinámicas.
  redirects: {
    '/about-me': '/',
    '/blog': '/contenido',
    '/blog/posts': '/contenido',
  },
});
