<template>
  <div ref="root">
    <!-- Altura fija: el contenido que aparece NO mueve el layout -->
    <div class="relative h-[352px] sm:h-[340px]">
      <Transition name="ta-escena" mode="out-in">
        <div :key="escenaIndex" class="flex h-full flex-col">
          <!-- Header fijo -->
          <div class="flex items-center gap-2 border-b border-border pb-2.5 text-[13px]">
            <span class="text-primary">✻</span>
            <span class="font-bold">{{ ui.usuario }}</span>
            <span class="truncate text-muted-foreground">{{ ui.ruta }}</span>
          </div>

          <!-- Transcripción (el chat) -->
          <div class="flex min-h-0 flex-1 flex-col gap-2.5 pt-3 text-[12.5px] leading-snug">
            <!-- Mensaje enviado: llega aquí cuando se termina de escribir en el input -->
            <div
              class="transition-all duration-300 ease-out"
              :class="enviado ? 'translate-y-0 opacity-100' : 'pointer-events-none -translate-y-1 opacity-0'"
            >
              <span class="text-muted-foreground">&gt;</span>
              <span class="ml-1.5">{{ escena.prompt }}</span>
            </div>

            <!-- Pasos: aparecen uno por uno solo mientras trabaja -->
            <div
              v-for="(p, i) in escena.pasos"
              :key="i"
              class="flex flex-col gap-0.5 transition-all duration-300 ease-out"
              :class="visibles > i ? 'translate-y-0 opacity-100' : 'translate-y-1.5 opacity-0'"
            >
              <div>
                <span class="text-primary">●</span>
                <span class="ml-1.5 font-bold">{{ p.tool }}</span>
                <span>({{ p.arg }})</span>
              </div>
              <div class="pl-5 text-muted-foreground">
                <span class="opacity-70">└</span>
                <span
                  v-if="p.bold"
                  class="ml-1 font-bold text-emerald-600 dark:text-emerald-400"
                >✓ {{ p.output }}</span>
                <span v-else class="ml-1">{{ p.output }}</span>
              </div>
            </div>
          </div>

          <!-- Indicador de trabajo: SOLO visible mientras está trabajando (fila reservada) -->
          <div class="h-[18px]">
            <Transition name="ta-busy">
              <div v-if="trabajando" class="text-[12.5px]">
                <span class="text-[#b48cf2]"><span class="ta-girar">✻</span> {{ ui.trabajando }}</span>
                <span class="text-muted-foreground"> {{ ui.escHint }}</span>
              </div>
            </Transition>
          </div>

          <!-- Input del chat: aquí se escribe la pregunta -->
          <div class="flex items-center">
            <span class="text-muted-foreground">&gt;</span>
            <span class="ml-1.5">{{ typed }}</span>
            <span class="ta-cursor ml-0.5 inline-block h-4 w-2 bg-primary" />
          </div>
        </div>
      </Transition>
    </div>

    <!-- Controles -->
    <div v-if="!reducirMovimiento" class="mt-4 flex items-center gap-2" data-pagefind-ignore>
      <button
        v-for="(_, i) in escenas"
        :key="i"
        class="h-2 rounded-full transition-all"
        :class="i === escenaIndex ? 'w-6 bg-primary' : 'w-2 bg-muted-foreground/30 hover:bg-muted-foreground/60'"
        :aria-label="`Ver escena ${i + 1} de ${escenas.length}`"
        :aria-current="i === escenaIndex ? 'true' : undefined"
        @click="irA(i)"
      />
      <button
        class="ml-auto text-xs text-muted-foreground hover:text-primary transition-colors"
        :aria-label="pausado ? 'Reanudar animación' : 'Pausar animación'"
        @click="pausado = !pausado"
      >
        {{ pausado ? '▶ reanudar' : '⏸ pausar' }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
// ============================================================================
// CONFIG — textos fijos de la interfaz (las escenas viven en terminal.json)
// ============================================================================
const ui = {
  usuario: 'poul',
  ruta: '~/negocio',
  trabajando: 'Trabajando…',
  escHint: '(esc para interrumpir)',
};

// Timeline declarativa, como un chatbot:
// escribir en el input → enviar → "Trabajando…" + pasos → terminar → loop
const TIMELINE = [
  { accion: 'escribir', delayMs: 300 },
  { accion: 'enviar', delayMs: 400 },
  { accion: 'paso', delayMs: 550, indice: 0 },
  { accion: 'paso', delayMs: 600, indice: 1 },
  { accion: 'paso', delayMs: 600, indice: 2 },
  { accion: 'paso', delayMs: 600, indice: 3 },
  { accion: 'terminar', delayMs: 350 },
  { accion: 'espera', delayMs: 2400 },
  { accion: 'siguiente' },
] as const;

import { computed, onBeforeUnmount, onMounted, ref } from 'vue';

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

const props = withDefaults(defineProps<{ escenas?: Escena[] }>(), {
  escenas: () => [],
});

const root = ref<HTMLElement | null>(null);
const escenaIndex = ref(0);
const escena = computed<Escena>(
  () => props.escenas[escenaIndex.value] ?? { prompt: '', pasos: [] }
);
const typed = ref('');
const enviado = ref(false);
const listo = ref(false);
const visibles = ref(0);
const pausado = ref(false);

const trabajando = computed(() => enviado.value && !listo.value);

let vivo = true;
let token = 0;
let enPantalla = true;
let tabVisible = true;
let reducir = false;
let io: IntersectionObserver | undefined;

const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

const activo = () => !pausado.value && enPantalla && tabVisible;

// Espera que extiende su plazo mientras la tarjeta está pausada o fuera de vista
async function espera(ms: number) {
  let restante = ms;
  while (vivo && restante > 0) {
    if (!activo()) {
      await sleep(150);
      continue;
    }
    const t = Math.min(100, restante);
    await sleep(t);
    restante -= t;
  }
}

// Escribe la pregunta EN EL INPUT letra por letra (~35ms), variante corta en móvil
async function escribir(mi: number) {
  const movil = window.matchMedia('(max-width: 640px)').matches;
  const texto = movil
    ? (escena.value.promptCorto ?? escena.value.prompt)
    : escena.value.prompt;
  typed.value = '';
  for (const ch of texto) {
    while (vivo && mi === token && !activo()) await sleep(150);
    if (!vivo || mi !== token) return;
    typed.value += ch;
    await sleep(35);
  }
}

async function ejecutar(paso: (typeof TIMELINE)[number], mi: number) {
  switch (paso.accion) {
    case 'escribir':
      await espera(paso.delayMs);
      if (vivo && mi === token) await escribir(mi);
      break;
    case 'enviar': // la pregunta sube a la transcripción y empieza el trabajo
      await espera(paso.delayMs);
      if (vivo && mi === token) {
        typed.value = '';
        enviado.value = true;
      }
      break;
    case 'paso':
      await espera(paso.delayMs);
      if (vivo && mi === token) visibles.value = paso.indice + 1;
      break;
    case 'terminar': // trabajo terminado: "Trabajando…" desaparece
      await espera(paso.delayMs);
      if (vivo && mi === token) listo.value = true;
      break;
    case 'espera':
      await espera(paso.delayMs);
      break;
    case 'siguiente':
      if (props.escenas.length > 1) {
        escenaIndex.value = (escenaIndex.value + 1) % props.escenas.length;
      }
      break;
  }
}

async function correr() {
  while (vivo) {
    const mi = token;
    typed.value = '';
    enviado.value = false;
    listo.value = false;
    visibles.value = 0;
    for (const paso of TIMELINE) {
      if (!vivo || mi !== token) break;
      await ejecutar(paso, mi);
    }
  }
}

const irA = (i: number) => {
  if (i === escenaIndex.value) return;
  escenaIndex.value = i;
  token++;
};

const onVis = () => {
  tabVisible = !document.hidden;
};

onMounted(() => {
  reducir = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reducir) {
    // Conversación completa, estática (trabajo ya terminado)
    enviado.value = true;
    listo.value = true;
    visibles.value = escena.value.pasos.length;
    return;
  }

  io = new IntersectionObserver(
    (entries) => {
      enPantalla = entries[0]?.isIntersecting ?? true;
    },
    { threshold: 0.25 }
  );
  if (root.value) io.observe(root.value);
  document.addEventListener('visibilitychange', onVis);

  correr();
});

onBeforeUnmount(() => {
  vivo = false;
  io?.disconnect();
  document.removeEventListener('visibilitychange', onVis);
});
</script>

<style scoped>
/* Transición entre escenas: fade + translateY(8px), 400ms ease-out */
.ta-escena-enter-active,
.ta-escena-leave-active {
  transition: opacity 0.4s ease-out, transform 0.4s ease-out;
}
.ta-escena-enter-from,
.ta-escena-leave-to {
  opacity: 0;
  transform: translateY(8px);
}

/* Entrada/salida del indicador "Trabajando…" */
.ta-busy-enter-active,
.ta-busy-leave-active {
  transition: opacity 0.2s ease-out;
}
.ta-busy-enter-from,
.ta-busy-leave-to {
  opacity: 0;
}

@keyframes ta-cursor {
  50% {
    opacity: 0;
  }
}
.ta-cursor {
  animation: 1s step-end infinite ta-cursor;
}

@keyframes ta-girar {
  to {
    transform: rotate(360deg);
  }
}
.ta-girar {
  display: inline-block;
  animation: 2s linear infinite ta-girar;
}

@media (prefers-reduced-motion: reduce) {
  .ta-cursor,
  .ta-girar {
    animation: none !important;
  }
}
</style>
