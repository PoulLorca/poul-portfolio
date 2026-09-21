<template>
  <div>
    <div class="rounded-xl border bg-card p-4 md:p-5 shadow-sm mb-6" data-pagefind-ignore>
      <label class="block">
        <span class="sr-only">Buscar en el contenido</span>
        <input
          id="busqueda-contenido"
          v-model="q"
          type="search"
          name="q"
          placeholder="Busca agentes, costos, Docker…"
          autocomplete="off"
          class="w-full h-10 rounded-md border border-input bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
          @input="alCambiarFiltro"
        />
      </label>

      <div class="mt-3 flex flex-wrap items-center gap-2" role="tablist" aria-label="Filtrar por tipo">
        <button
          v-for="tab in tabs"
          :key="tab.value"
          role="tab"
          :aria-selected="tipo === tab.value"
          :class="tipo === tab.value
            ? 'bg-primary text-primary-foreground'
            : 'bg-background hover:bg-accent hover:text-accent-foreground border'"
          class="h-9 rounded-md px-4 text-sm font-medium transition-all"
          @click="elegirTipo(tab.value)"
        >
          {{ tab.label }}
        </button>
      </div>

      <div class="mt-3 flex flex-wrap items-center gap-2 text-sm">
        <span class="text-muted-foreground">{{ contador }}</span>
        <span v-if="tema" class="inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-xs">
          Tema: {{ tituloTema(tema) }}
          <button class="hover:text-primary" aria-label="Quitar filtro de tema" @click="limpiarCampo('tema')">✕</button>
        </span>
        <span v-if="tag" class="inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-xs">
          Etiqueta: {{ tag }}
          <button class="hover:text-primary" aria-label="Quitar filtro de etiqueta" @click="limpiarCampo('tag')">✕</button>
        </span>
        <span v-if="herramienta" class="inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-xs">
          Herramienta: {{ herramienta }}
          <button class="hover:text-primary" aria-label="Quitar filtro de herramienta" @click="limpiarCampo('herramienta')">✕</button>
        </span>
      </div>
    </div>

    <div v-if="sinPublicaciones" class="text-center py-12">
      <p class="text-muted-foreground text-lg">El primer contenido llega el 3 de noviembre.</p>
    </div>

    <div v-else-if="filtradas.length === 0" class="text-center py-12">
      <p class="text-muted-foreground text-lg mb-4">
        No encontré nada con esos filtros. Prueba con otro término o limpia los filtros.
      </p>
      <Button variant="outline" @click="limpiarFiltros">Limpiar filtros</Button>
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <a
        v-for="pieza in visibles"
        :key="pieza.slug"
        :href="`/contenido/${pieza.slug}`"
        class="group bg-card rounded-xl overflow-hidden shadow-md hover:shadow-xl hover:shadow-primary/20 transition-all duration-300 flex flex-col h-full transform hover:-translate-y-1 hover:scale-[1.01] border border-transparent hover:border-primary/20"
      >
        <div class="aspect-video overflow-hidden relative">
          <img
            :src="pieza.image || '/blogs/default.jpg'"
            :alt="pieza.title"
            loading="lazy"
            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div class="absolute top-3 left-3 flex gap-2">
            <Badge class="bg-primary/90 text-white text-xs">{{ tituloTema(pieza.tema) }}</Badge>
          </div>
          <div v-if="pieza.videoUrl" class="absolute top-3 right-3">
            <Badge class="bg-black/70 text-white text-xs">Video</Badge>
          </div>
        </div>
        <div class="p-5 flex flex-col flex-1">
          <div class="text-xs font-medium mb-2 text-muted-foreground">
            {{ formatoFecha(pieza.date) }} · {{ etiquetaTipo(pieza.tipo) }}
          </div>
          <h3 class="text-base font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2">
            {{ pieza.title }}
          </h3>
          <p class="text-sm text-muted-foreground mb-4 line-clamp-2">{{ pieza.description }}</p>
          <div class="mt-auto flex items-center justify-between">
            <span class="inline-flex items-center text-primary text-sm font-medium">
              Leer
              <ArrowRight class="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </span>
            <div class="flex flex-wrap gap-1 justify-end">
              <Badge
                v-for="tagItem in pieza.tags.slice(0, 2)"
                :key="tagItem"
                variant="outline"
                class="text-[11px]"
              >
                {{ tagItem }}
              </Badge>
            </div>
          </div>
        </div>
      </a>
    </div>

    <div v-if="mostrarBoton" class="text-center mt-10">
      <Button variant="outline" size="lg" @click="cargarMas">
        Cargar más
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-vue-next';
import temasData from '@/data/temas.json';

export interface Pieza {
  slug: string;
  title: string;
  description: string;
  date: string;
  tema: string;
  tipo: string;
  tags: string[];
  herramientas: string[];
  videoUrl?: string;
  image?: string;
  draft?: boolean;
}

const props = withDefaults(defineProps<{
  piezas?: Pieza[];
  inicial?: number;
  paso?: number;
  queryInicial?: string;
  temaInicial?: string;
  tipoInicial?: string;
  tagInicial?: string;
  herramientaInicial?: string;
}>(), {
  piezas: () => [],
  inicial: 16,
  paso: 16,
  queryInicial: '',
  temaInicial: '',
  tipoInicial: '',
  tagInicial: '',
  herramientaInicial: '',
});

const tabs = [
  { value: '', label: 'Todo' },
  { value: 'tutorial', label: 'Tutoriales' },
  { value: 'concepto', label: 'Conceptos' },
  { value: 'comparativa', label: 'Comparativas' },
  { value: 'noticia', label: 'Noticias' },
];

const limite = ref(props.inicial);
const q = ref(props.queryInicial);
const tema = ref(props.temaInicial);
const tipo = ref(props.tipoInicial);
const tag = ref(props.tagInicial);
const herramienta = ref(props.herramientaInicial);

const temasTitulo: Record<string, string> = Object.fromEntries(
  (temasData as { slug: string; title: string }[]).map((t) => [t.slug, t.title])
);

const tituloTema = (slug: string) => temasTitulo[slug] ?? slug;

const normaliza = (s: string) =>
  s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

const sinPublicaciones = computed(() => props.piezas.length === 0);

const filtradas = computed(() => {
  const nq = normaliza(q.value.trim());
  return props.piezas.filter((p) => {
    if (tipo.value && p.tipo !== tipo.value) return false;
    if (tema.value && p.tema !== tema.value) return false;
    if (tag.value && !p.tags.includes(tag.value)) return false;
    if (herramienta.value && !(p.herramientas ?? []).includes(herramienta.value)) return false;
    if (nq) {
      const hay = normaliza(
        `${p.title} ${p.description} ${(p.tags ?? []).join(' ')} ${(p.herramientas ?? []).join(' ')} ${p.tema} ${tituloTema(p.tema)} ${p.tipo}`
      );
      if (!hay.includes(nq)) return false;
    }
    return true;
  });
});

const visibles = computed(() => filtradas.value.slice(0, limite.value));
const mostrarBoton = computed(() => visibles.value.length < filtradas.value.length);
const contador = computed(() => {
  const n = filtradas.value.length;
  return `${n} ${n === 1 ? 'pieza' : 'piezas'}`;
});

const cargarMas = () => {
  limite.value += props.paso;
};

const elegirTipo = (v: string) => {
  tipo.value = v;
  limite.value = props.inicial;
  sincronizaUrl();
};

const alCambiarFiltro = () => {
  limite.value = props.inicial;
  sincronizaUrl();
};

const limpiarCampo = (campo: 'tema' | 'tag' | 'herramienta') => {
  if (campo === 'tema') tema.value = '';
  if (campo === 'tag') tag.value = '';
  if (campo === 'herramienta') herramienta.value = '';
  limite.value = props.inicial;
  sincronizaUrl();
};

const limpiarFiltros = () => {
  q.value = '';
  tipo.value = '';
  tema.value = '';
  tag.value = '';
  herramienta.value = '';
  limite.value = props.inicial;
  sincronizaUrl();
};

const sincronizaUrl = () => {
  const params = new URLSearchParams();
  if (q.value) params.set('q', q.value);
  if (tema.value) params.set('tema', tema.value);
  if (tipo.value) params.set('tipo', tipo.value);
  if (tag.value) params.set('tag', tag.value);
  if (herramienta.value) params.set('herramienta', herramienta.value);
  const url = `${window.location.pathname}${params.toString() ? `?${params}` : ''}`;
  window.history.replaceState({}, '', url);
};

const etiquetaTipo = (t: string) => {
  const mapa: Record<string, string> = {
    tutorial: 'Tutorial',
    concepto: 'Concepto',
    comparativa: 'Comparativa',
    noticia: 'Noticia',
  };
  return mapa[t] ?? t;
};

const formatoFecha = (d: string) => {
  const date = new Date(d);
  return date.toLocaleDateString('es', { year: 'numeric', month: 'long', day: 'numeric' });
};

onMounted(() => {
  const params = new URLSearchParams(window.location.search);
  if (params.get('q') !== null) q.value = params.get('q') ?? '';
  if (params.get('tema') !== null) tema.value = params.get('tema') ?? '';
  if (params.get('tipo') !== null) tipo.value = params.get('tipo') ?? '';
  if (params.get('tag') !== null) tag.value = params.get('tag') ?? '';
  if (params.get('herramienta') !== null) herramienta.value = params.get('herramienta') ?? '';

  if (params.get('focus') === 'buscar' || params.get('buscar') === '1') {
    document.getElementById('busqueda-contenido')?.focus();
  }
});
</script>
