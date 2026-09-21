<template>
  <div
    class="font-mono text-sm leading-relaxed min-h-[248px] sm:min-h-[228px] transition-opacity duration-300"
    :class="saliendo ? 'opacity-0' : 'opacity-100'"
    role="log"
    aria-live="polite"
    aria-label="Terminal: problema de negocio, solución y costo de operar"
  >
    <template v-if="!hidratado">
      <div>
        <span class="text-primary font-bold">$</span>
        <span class="ml-2">{{ escenas[0]?.prompt }}</span>
      </div>
      <div v-for="(l, i) in escenas[0]?.lines ?? []" :key="i" class="mt-1.5">
        <span class="text-muted-foreground">→ {{ l.label }}:</span>
        <span class="ml-1">{{ l.text }}</span>
      </div>
      <div class="mt-1.5 font-medium text-emerald-600 dark:text-emerald-400">
        ✓ {{ escenas[0]?.result }}
      </div>
    </template>

    <template v-else>
      <div>
        <span class="text-primary font-bold">$</span>
        <span class="ml-2">{{ typed }}</span><span
          v-if="tipando"
          class="inline-block w-2.5 h-4 bg-primary animate-pulse align-text-bottom ml-0.5"
          aria-hidden="true"
        />
      </div>
      <div v-for="(l, i) in escena.lines" v-show="i < visibles" :key="`${escenaIndex}-${i}`" class="mt-1.5">
        <span class="text-muted-foreground">→ {{ l.label }}:</span>
        <span class="ml-1">{{ l.text }}</span>
      </div>
      <div v-if="mostrarResultado" class="mt-1.5 font-medium text-emerald-600 dark:text-emerald-400">
        ✓ {{ escena.result }}
      </div>
      <div v-if="!tipando" class="mt-1.5 flex items-center gap-1 text-muted-foreground">
        <span class="text-primary font-bold">$</span><span
          class="inline-block w-2.5 h-4 bg-primary animate-pulse"
          aria-hidden="true"
        />
      </div>
    </template>

    <div class="mt-4 flex items-center gap-2" data-pagefind-ignore>
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
import { computed, onMounted, onUnmounted, ref } from 'vue';

export interface EscenaLinea {
  label: string;
  text: string;
}

export interface Escena {
  prompt: string;
  lines: EscenaLinea[];
  result: string;
}

const props = withDefaults(defineProps<{ escenas?: Escena[] }>(), {
  escenas: () => [],
});

const escenaIndex = ref(0);
const escena = computed<Escena>(
  () => props.escenas[escenaIndex.value] ?? { prompt: '', lines: [], result: '' }
);
const typed = ref('');
const visibles = ref(0);
const mostrarResultado = ref(false);
const tipando = ref(true);
const saliendo = ref(false);
const pausado = ref(false);
const hidratado = ref(false);

let vivo = true;
let token = 0;
let reducirMovimiento = false;

const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

const esperarSiPausado = async (mi: number) => {
  while (pausado.value && vivo && mi === token) await sleep(200);
};

async function reproducir(e: Escena, mi: number) {
  typed.value = '';
  visibles.value = 0;
  mostrarResultado.value = false;
  tipando.value = true;
  saliendo.value = false;

  if (reducirMovimiento) {
    typed.value = e.prompt;
    visibles.value = e.lines.length;
    tipando.value = false;
    mostrarResultado.value = true;
    for (let i = 0; i < 30; i++) {
      if (!vivo || mi !== token) return;
      await sleep(200);
    }
    return;
  }

  for (const ch of e.prompt) {
    if (!vivo || mi !== token) return;
    await esperarSiPausado(mi);
    if (!vivo || mi !== token) return;
    typed.value += ch;
    await sleep(26);
  }
  tipando.value = false;

  for (let i = 0; i < e.lines.length; i++) {
    if (!vivo || mi !== token) return;
    await esperarSiPausado(mi);
    if (!vivo || mi !== token) return;
    await sleep(380);
    visibles.value++;
  }

  await sleep(420);
  if (!vivo || mi !== token) return;
  mostrarResultado.value = true;

  for (let i = 0; i < 16; i++) {
    if (!vivo || mi !== token) return;
    await esperarSiPausado(mi);
    await sleep(200);
  }

  saliendo.value = true;
  await sleep(320);
}

async function bucle() {
  while (vivo && props.escenas.length > 0) {
    const mi = token;
    await reproducir(escena.value, mi);
    if (!vivo) return;
    if (mi !== token) continue;
    escenaIndex.value = (escenaIndex.value + 1) % props.escenas.length;
  }
}

const irA = (i: number) => {
  if (i === escenaIndex.value && hidratado.value) return;
  escenaIndex.value = i;
  token++;
};

onMounted(() => {
  reducirMovimiento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  hidratado.value = true;
  document.addEventListener('visibilitychange', onVis);
  bucle();
});

const onVis = () => {
  // Al volver a la pestaña, salta a la siguiente escena para evitar estados a medias
  if (!document.hidden) return;
};

onUnmounted(() => {
  vivo = false;
  document.removeEventListener('visibilitychange', onVis);
});
</script>
