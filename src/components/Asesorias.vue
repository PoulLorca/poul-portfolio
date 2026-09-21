<template>
  <section class="container mx-auto max-w-4xl py-12 px-4">
    <div class="text-center mb-10">
      <h1 class="text-4xl font-bold mb-4">¿Tu negocio necesita esto funcionando?</h1>
      <p class="text-lg text-muted-foreground text-balance">
        Te ayudo a pasar de la idea a algo que funcione, sea sostenible y tenga un costo claro.
      </p>
    </div>

    <Card class="mb-10">
      <CardHeader>
        <CardTitle class="flex items-center gap-2">
          <Wrench class="h-6 w-6 text-primary" />
          En qué te puedo ayudar
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm md:text-base">
          <li v-for="s in servicios" :key="s.titulo" class="rounded-lg border p-4">
            <p class="font-bold mb-1">{{ s.titulo }}</p>
            <p class="text-muted-foreground text-sm">{{ s.texto }}</p>
          </li>
        </ul>
      </CardContent>
    </Card>

    <Card class="mb-10">
      <CardHeader>
        <CardTitle class="flex items-center gap-2">
          <CalendarCheck class="h-6 w-6 text-primary" />
          Cómo trabajamos
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ol class="space-y-3 text-sm md:text-base">
          <li><strong>1. Me cuentas el problema.</strong></li>
          <li><strong>2. Te propongo una solución</strong> con su costo estimado de operación.</li>
          <li><strong>3. La construimos juntos,</strong> o te guío para que la construyas tú.</li>
        </ol>
      </CardContent>
    </Card>

    <div class="flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
      <Button asChild size="lg">
        <a :href="fiverrUrl" target="_blank" rel="noopener noreferrer">
          <Briefcase class="mr-2 h-4 w-4" />
          Trabajemos en Fiverr
        </a>
      </Button>
      <a :href="`mailto:${email}`" class="text-primary font-medium hover:underline">
        Escríbeme → {{ email }}
      </a>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Wrench, CalendarCheck, Briefcase } from 'lucide-vue-next';
import site from '@/data/site.json';

const fiverrUrl = site.fiverrUrl;
const email = site.email;

const servicios = [
  {
    titulo: 'Automatizar procesos',
    texto: 'Tareas repetitivas que hoy se comen horas de tu equipo.',
  },
  {
    titulo: 'Agentes de IA',
    texto: 'Diseñarlos, montarlos y dejarlos operando.',
  },
  {
    titulo: 'Integraciones con IA',
    texto: 'Conectar modelos con tus sistemas y datos existentes (MCP).',
  },
  {
    titulo: 'Costos de operar IA',
    texto: 'Estimar cuánto costará al mes y cómo reducirlo.',
  },
];
</script>
