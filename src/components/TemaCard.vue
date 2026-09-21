<template>
  <a
    :href="`/temas/${tema.slug}`"
    class="group bg-card rounded-xl overflow-hidden shadow-md hover:shadow-xl hover:shadow-primary/20 transition-all duration-300 flex flex-col h-full transform hover:-translate-y-1 hover:scale-[1.01] border border-transparent hover:border-primary/20 p-6"
  >
    <div class="flex items-center gap-3 mb-3">
      <span class="rounded-lg bg-primary/10 p-2.5">
        <component :is="icono" class="h-7 w-7 text-primary" />
      </span>
      <h3 class="text-xl font-bold group-hover:text-primary transition-colors">{{ tema.title }}</h3>
    </div>
    <p class="text-sm text-muted-foreground mb-4 flex-1">{{ tema.short ?? tema.description }}</p>
    <div class="flex items-center justify-between mt-auto">
      <span class="text-sm text-muted-foreground">
        {{ tema.count }} {{ tema.count === 1 ? 'pieza' : 'piezas' }}
      </span>
      <span class="inline-flex items-center text-primary text-sm font-medium">
        Explorar
        <ArrowRight class="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
      </span>
    </div>
  </a>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { ArrowRight, Bot, Coins, Network, Wrench, LayoutGrid } from 'lucide-vue-next';

export interface Tema {
  slug: string;
  title: string;
  description: string;
  short?: string;
  icon?: string;
  count?: number;
}

const props = withDefaults(defineProps<{ tema: Tema }>(), {
  tema: () => ({ slug: '', title: '', description: '', count: 0 }),
});

const icono = computed(() => {
  const mapa: Record<string, unknown> = {
    Bot,
    Coins,
    Network,
    Wrench,
  };
  return (props.tema.icon && mapa[props.tema.icon]) || LayoutGrid;
});
</script>
