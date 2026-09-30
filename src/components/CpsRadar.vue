<template>
  <div v-if="plottable.length === 0" class="bg-card border rounded-xl p-6 text-center">
    <p class="text-muted-foreground">Este mes no tiene modelos completos para graficar.</p>
  </div>
  <div v-else>
    <div class="max-w-xl mx-auto h-[340px] md:h-[420px]">
      <Radar ref="radarRef" :data="chartData" :options="chartOptions" />
    </div>
    <p class="text-center text-sm text-muted-foreground mt-3">
      Más cerca del centro = más barato por solución · escala logarítmica
    </p>
    <p v-if="excluded.length > 0" class="text-center text-sm text-muted-foreground mt-1">
      No se grafican: {{ excluded.join(', ') }} (corrida incompleta)
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from 'vue';
import { Radar } from 'vue-chartjs';
import {
  Chart as ChartJS,
  RadarController,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Legend,
  Tooltip,
  type ChartOptions,
} from 'chart.js';
import { colorForSlug, withAlpha } from '@/data/cps-colors';

ChartJS.register(RadarController, RadialLinearScale, PointElement, LineElement, Filler, Legend, Tooltip);

interface CpsFlow {
  ok: number;
  completed: number;
  cost_usd: number;
}

interface CpsModel {
  name: string;
  slug: string;
  completed: number;
  total: number;
  ok: number;
  cost_usd: number;
  time_per_task_s: number;
  incomplete: boolean;
  flows: Record<string, CpsFlow>;
  verdict: Record<string, string>;
}

const props = defineProps<{
  models: CpsModel[];
}>();

const FLOW_KEYS = ['F1', 'F2', 'F3', 'F4'] as const;
const FLOW_LABELS = ['Correo', 'Consulta', 'Reporte', 'Extracción'];
const LOG_MIN = Math.log10(0.0005);
const LOG_MAX = Math.log10(0.05);
const FONT = "'Roboto Mono Variable', monospace";

const plottable = computed(() => props.models.filter((m) => !m.incomplete));
const excluded = computed(() => props.models.filter((m) => m.incomplete).map((m) => m.name));

function cpsDeFlujo(model: CpsModel, key: string): number | null {
  const f = model.flows?.[key];
  if (!f || f.ok === 0) return null;
  return f.cost_usd / f.ok;
}

function aLog(cps: number | null): number {
  if (cps === null || !isFinite(cps) || cps <= 0) return LOG_MIN;
  const v = Math.log10(cps);
  return Math.min(Math.max(v, LOG_MIN), LOG_MAX);
}

const chartData = computed(() => ({
  labels: FLOW_LABELS,
  datasets: plottable.value.map((m) => {
    const color = colorForSlug(m.slug);
    const sinAciertos = FLOW_KEYS.map((k) => {
      const f = m.flows?.[k];
      return !f || f.ok === 0;
    });
    return {
      label: m.name,
      data: FLOW_KEYS.map((k) => aLog(cpsDeFlujo(m, k))),
      borderColor: color,
      backgroundColor: withAlpha(color, 0.18),
      pointBackgroundColor: color,
      pointBorderColor: color,
      pointStyle: sinAciertos.map((s) => (s ? 'crossRot' : 'circle')) as ('crossRot' | 'circle')[],
      pointRadius: sinAciertos.map((s) => (s ? 6 : 3)),
      pointHoverRadius: sinAciertos.map((s) => (s ? 8 : 5)),
      borderWidth: 2,
      fill: true,
    };
  }),
}));

const tema = ref({ foreground: '', muted: '', border: '' });

function leerColores() {
  if (typeof window === 'undefined') return tema.value;
  const cs = getComputedStyle(document.documentElement);
  return {
    foreground: cs.getPropertyValue('--foreground').trim() || '#888',
    muted: cs.getPropertyValue('--muted-foreground').trim() || '#888',
    border: cs.getPropertyValue('--border').trim() || 'rgba(128,128,128,0.2)',
  };
}

const radarRef = ref<{ chart?: { update: (mode?: string) => void } } | null>(null);
let observer: MutationObserver | undefined;

onMounted(() => {
  tema.value = leerColores();
  observer = new MutationObserver(() => {
    tema.value = leerColores();
    radarRef.value?.chart?.update('none');
  });
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
});

onUnmounted(() => {
  observer?.disconnect();
});

const chartOptions = computed<ChartOptions<'radar'>>(() => ({
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    r: {
      min: LOG_MIN,
      max: LOG_MAX,
      // Ticks fijos en log10(0.0005), log10(0.005), log10(0.05) → rotulados 0.5, 5, 50.
      afterBuildTicks: (scale) => {
        scale.ticks = [LOG_MIN, LOG_MIN + 1, LOG_MAX].map((v) => ({ value: v }));
      },
      ticks: {
        backdropColor: 'transparent',
        color: tema.value.muted,
        // Con ticks fijos vía afterBuildTicks, stepSize sobra; callback convierte 10^v × 1000.
        callback: function (value) {
          const v = Number(value);
          const porMil = Math.pow(10, v) * 1000;
          const redondeado = Math.round(porMil * 10) / 10;
          return Number.isInteger(redondeado) ? String(Math.round(redondeado)) : String(redondeado);
        },
      },
      grid: { color: tema.value.border },
      angleLines: { color: tema.value.border },
      pointLabels: {
        color: tema.value.foreground,
        font: { family: FONT, size: 12 },
      },
    },
  },
  plugins: {
    legend: {
      display: true,
      labels: {
        color: tema.value.foreground,
        font: { family: FONT, size: 12 },
        usePointStyle: true,
      },
    },
    tooltip: {
      callbacks: {
        title: (items) => {
          const idx = (items[0] as { datasetIndex: number })?.datasetIndex ?? 0;
          return plottable.value[idx]?.name ?? '';
        },
        label: (context) => {
          const di = context.dataIndex;
          const dsi = context.datasetIndex;
          const modelo = plottable.value[dsi];
          const key = FLOW_KEYS[di] ?? 'F1';
          const etiqueta = FLOW_LABELS[di] ?? key;
          const flujo = modelo?.flows?.[key];
          if (!flujo || flujo.ok === 0) {
            const intentos = flujo?.completed ?? 0;
            return intentos > 0 ? `${etiqueta}: sin aciertos (0/${intentos})` : `${etiqueta}: sin aciertos`;
          }
          const c = flujo.cost_usd / flujo.ok;
          const porMil = c * 1000;
          const porMilStr = Number.isInteger(Math.round(porMil * 100) / 100)
            ? String(Math.round(porMil))
            : String(Math.round(porMil * 10) / 10);
          return `${etiqueta}: USD ${c.toFixed(4)} por solución (≈ USD ${porMilStr} cada 1.000) · ${flujo.ok}/${flujo.completed} correctas`;
        },
      },
    },
  },
}));
</script>
