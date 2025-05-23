<template>
    <section class="container mx-auto py-12 px-4" id="stack">
        <div class="flex flex-col items-center mb-8">
            <h2 class="text-4xl font-bold mb-4 text-slate-900 dark:text-white flex items-center gap-3">
                <Boxes class="w-8 h-8 text-primary" />
                Tech Stack
            </h2>
            <p class="text-lg text-center text-slate-700 dark:text-slate-300 max-w-2xl">
                Technologies and tools I work with
            </p>
        </div>

        <div class="flex flex-wrap justify-center gap-3 mt-6">
            <button
                v-for="tech in techStack"
                :key="tech.name"
                :aria-label="tech.name"
                class="flex items-center gap-2 border-2 border-primary rounded-lg px-4 py-2 bg-background/95  hover:bg-primary hover:text-white transition-all duration-200"
            >
                <component :is="tech.icon" class="h-4 w-4" />
                <span>{{ tech.name }}</span>
            </button>
        </div>
    </section>

</template>
<script setup lang="ts">
import {
    Boxes,
    FileCode,
    Hammer,
    Leaf,
    ChartNetwork,
    DraftingCompass,
    AppWindow,
    Database,
    Cloud,
} from 'lucide-vue-next';

interface TechItem {
  name: string;
  icon: any;
}

const techStack: TechItem[] = [
  { name: 'Java', icon: FileCode },
  { name: 'C#', icon: FileCode },
  { name: 'TypeScript', icon: FileCode },    
  { name: 'Nuxt', icon: Hammer },
  { name: 'Astro', icon: Hammer },
  { name: 'Spring', icon: Hammer },
  { name: '.Net', icon: Hammer }, 
  { name: 'Tailwind CSS', icon: Leaf },
  { name: 'Qt', icon: Leaf },
  { name: 'Git', icon: ChartNetwork },
  { name: 'GitHub', icon: ChartNetwork },
  { name: 'Docker', icon: ChartNetwork },    
  { name: 'Figma', icon: DraftingCompass },
  { name: 'Linux', icon: AppWindow },
  { name: 'MySQL', icon: Database },
  { name: 'PostgreSQL', icon: Database },
  { name: 'Oracle', icon: Database },
  { name: 'Firebase', icon: Database },    
  { name: 'Azure', icon: Cloud },
  { name: 'Vercel', icon: Cloud },
];
</script>