<template>
  <section class="container mx-auto max-w-5xl py-12 px-4" id="inicio">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card class="col-span-1 md:col-span-2 bg-card hover:shadow-lg transition-all">
        <div class="flex flex-col md:flex-row items-center md:items-start p-6 gap-6">
          <Avatar class="w-32 h-32 md:w-56 md:h-56 md:flex-shrink-0">
            <img :src="profileImage" alt="Poul Lorca" class="w-full h-full object-cover" />
          </Avatar>

          <div class="flex-1 flex flex-col items-center md:items-start text-center md:text-left md:pl-4">
            <h1 class="text-3xl md:text-4xl font-bold mb-4 text-balance">
              Construye tecnología que realmente ayude al negocio.
            </h1>

            <p class="text-lg mb-6 text-muted-foreground text-balance">
              Agentes, automatización y el costo real de operar IA, explicados en
              artículos y videos en español por alguien que los construye para
              negocios reales.
            </p>

            <div class="flex flex-col sm:flex-row gap-4 mt-2">
              <Button asChild>
                <a href="/contenido">
                  <BookOpen class="mr-2 h-4 w-4" />
                  Ver contenido
                </a>
              </Button>

              <Button variant="outline" asChild>
                <a :href="youtubeUrl" target="_blank" rel="noopener noreferrer">
                  <Youtube class="mr-2 h-4 w-4" />
                  Ver en YouTube
                </a>
              </Button>
            </div>
          </div>
        </div>
      </Card>

      <Card class="col-span-1 bg-card hover:shadow-lg transition-all overflow-hidden">
        <CardContent class="pt-6">
          <div class="rounded-lg bg-foreground/[0.04] dark:bg-black/40 border p-4">
            <TerminalFirma :escenas="escenas" />
          </div>
        </CardContent>
      </Card>

      <template v-if="destacado">
        <a :href="`/contenido/${destacado.slug}`" class="col-span-1 block h-full">
          <Card class="bg-card hover:shadow-lg transition-all h-full group cursor-pointer overflow-hidden relative">
            <CardHeader>
              <div class="flex items-center gap-2 mb-1">
                <Badge class="bg-primary/90">Lo más reciente</Badge>
                <span class="text-sm text-muted-foreground">{{ formatoFecha(destacado.date) }}</span>
              </div>
              <CardTitle class="text-2xl font-bold leading-snug group-hover:text-primary transition-colors">
                {{ destacado.title }}
              </CardTitle>
              <CardDescription class="text-base line-clamp-2">
                {{ destacado.description }}
              </CardDescription>
            </CardHeader>
            <CardContent class="overflow-hidden">
              <div v-if="destacado.image" class="overflow-hidden rounded-lg shadow-md relative h-48">
                <img
                  :src="destacado.image"
                  :alt="destacado.title"
                  loading="lazy"
                  class="absolute w-full h-full object-cover object-center transform origin-center transition-all duration-500 ease-in-out group-hover:scale-105 group-hover:rotate-1"
                />
                <div v-if="destacado.videoUrl" class="absolute top-3 left-3">
                  <Badge class="bg-black/70 text-white text-xs">Video</Badge>
                </div>
              </div>
              <div class="mt-4">
                <Button size="sm">
                  Ver artículo y video
                  <ArrowRight class="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </a>
      </template>
      <template v-else>
        <Card class="col-span-1 bg-card">
          <CardHeader>
            <CardTitle class="text-2xl font-bold">El primer contenido llega el 3 de noviembre.</CardTitle>
            <CardDescription class="text-base">
              Mientras tanto, suscríbete al canal para no perderte el estreno.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild>
              <a :href="youtubeUrl" target="_blank" rel="noopener noreferrer">
                <Youtube class="mr-2 h-4 w-4" />
                Ir al canal
              </a>
            </Button>
          </CardContent>
        </Card>
      </template>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, BookOpen, Youtube } from 'lucide-vue-next';
import TerminalFirma from '@/components/TerminalFirma.vue';

export interface Destacado {
  slug: string;
  title: string;
  description: string;
  date: string;
  videoUrl?: string;
  image?: string;
}

export interface PasoEscena {
  tool: string;
  arg: string;
  output: string;
  bold?: boolean;
}

export interface Escena {
  prompt: string;
  promptCorto?: string;
  pasos: PasoEscena[];
}

withDefaults(defineProps<{
  destacado?: Destacado | null;
  escenas?: Escena[];
  youtubeUrl?: string;
}>(), {
  destacado: null,
  escenas: () => [],
  youtubeUrl: 'https://www.youtube.com/@PoulLorcaDev',
});

const profileImage = '/profileImage.jpg';

const formatoFecha = (d: string) => {
  const date = new Date(d);
  return date.toLocaleDateString('es', { year: 'numeric', month: 'long', day: 'numeric' });
};
</script>
