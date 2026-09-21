<template>
  <footer
    class="w-full border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-10"
    data-pagefind-ignore
  >
    <div class="container px-4 mx-auto max-w-5xl">
      <div class="mb-8">
        <a href="/" class="flex items-center space-x-2 mb-3">
          <Pilcrow class="w-6 h-6 text-primary" />
          <span class="text-xl font-bold text-primary">Poul Lorca</span>
        </a>
        <p class="text-sm text-muted-foreground max-w-2xl">
          Tecnología aplicada a negocios, en español. Por Poul Lorca con más de 10 años construyendo software.
        </p>
      </div>

      <div class="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
        <nav aria-label="Contenido">
          <h3 class="font-bold mb-3 text-sm uppercase tracking-wider">Contenido</h3>
          <ul class="space-y-2 text-sm">
            <li><a href="/contenido" class="hover:text-primary transition-colors">Todo el contenido</a></li>
            <li><a href="/temas" class="hover:text-primary transition-colors">Temas</a></li>
            <li><a href="/contenido?buscar=1" class="hover:text-primary transition-colors">Buscar</a></li>
          </ul>
        </nav>

        <nav aria-label="Temas">
          <h3 class="font-bold mb-3 text-sm uppercase tracking-wider">Temas</h3>
          <ul class="space-y-2 text-sm">
            <li v-for="t in temas" :key="t.slug">
              <a :href="`/temas/${t.slug}`" class="hover:text-primary transition-colors">
                {{ t.title }}
              </a>
            </li>
          </ul>
        </nav>

        <nav aria-label="Redes">
          <h3 class="font-bold mb-3 text-sm uppercase tracking-wider">Redes</h3>
          <ul class="space-y-2 text-sm">
            <li>
              <a :href="site.youtubeUrl" target="_blank" rel="noopener noreferrer" class="hover:text-primary transition-colors">
                YouTube
              </a>
            </li>
            <li>
              <a :href="site.xUrl" target="_blank" rel="noopener noreferrer" class="hover:text-primary transition-colors">
                X
              </a>
            </li>
            <li>
              <a :href="site.githubUrl" target="_blank" rel="noopener noreferrer" class="hover:text-primary transition-colors">
                GitHub
              </a>
            </li>
            <li>
              <a :href="site.linkedinUrl" target="_blank" rel="noopener noreferrer" class="hover:text-primary transition-colors">
                LinkedIn
              </a>
            </li>
          </ul>
        </nav>

        <nav aria-label="Contacto">
          <h3 class="font-bold mb-3 text-sm uppercase tracking-wider">Contacto</h3>
          <ul class="space-y-2 text-sm">
            <li><a href="/asesorias" class="hover:text-primary transition-colors">Asesorías</a></li>
            <li>
              <a :href="site.fiverrUrl" target="_blank" rel="noopener noreferrer" class="hover:text-primary transition-colors">
                Fiverr
              </a>
            </li>
            <li>
              <a :href="`mailto:${site.email}`" class="hover:text-primary transition-colors">
                Correo
              </a>
            </li>
          </ul>
        </nav>
      </div>

      <div
        class="pt-6 border-t border-border text-sm text-muted-foreground text-center"
      >
        <span>© 2026 Poul Lorca · Hecho con Vue + Astro</span>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { Pilcrow } from 'lucide-vue-next';
import temasData from '@/data/temas.json';
import site from '@/data/site.json';

const temas = temasData as { slug: string; title: string }[];
</script>
