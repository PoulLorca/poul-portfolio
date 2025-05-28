<template>
  <section class="container mx-auto max-w-5xl py-12 px-4" id="experience">
    <div class="flex flex-col items-center mb-12 md:mb-16">
      <h2 class="text-4xl font-bold mb-4 text-slate-900 dark:text-white flex items-center gap-3">
        <Briefcase class="w-8 h-8 text-primary" />
        Professional Experience
      </h2>
    </div>

    <div class="relative"> 
      <div class="absolute left-0 md:left-[20px] top-0 h-full w-0.5 bg-primary/25 dark:bg-primary/40 rounded"></div>

      <div class="space-y-12">
        <div v-for="(job, index) in experience" :key="index" class="relative pl-8 md:pl-12">
          <div class="absolute left-0 md:left-[20px] top-1/2 -translate-y-1/2 transform -translate-x-1/2 w-5 h-5 rounded-full border-2 border-white dark:border-slate-800 bg-primary z-10"></div>

          <div class="bg-card dark:bg-slate-800/80 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-slate-200 dark:border-slate-700 p-6 md:p-8">
            <div class="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-4">
              <div class="flex-grow">
                <h3 class="text-xl font-semibold text-slate-800 dark:text-slate-100">{{ job.role }}</h3>
                <p class="text-sm text-primary dark:text-primary-400 font-medium mt-1">{{ job.company }}</p>
              </div>
              <span class="mt-3 self-center sm:self-auto sm:mt-0 sm:ml-3 shrink-0 px-3 py-1 bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary-300 rounded-full text-xs font-medium">
                {{ job.period }}
              </span>
            </div>
            <p class="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {{ job.description }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Briefcase } from 'lucide-vue-next';


const experience = [
  {
    role: "Freelance Software Developer",
    company: "Various Clients",
    period: "2023 – Present (Part-Time)",
    description: "Helped clients bring their ideas to life by building complete web applications. Focused on making sure projects were delivered on time and just as requested, even making older systems run much faster.",
  },
  {
    role: "Head of Data and Financial Reporting (Breeders Division)",
    company: "Don Pollo",
    period: "2020 – Present",
    description: "Transformed how financial data was handled, speeding up reports from weeks to just a few days. Created a central system to bring together information from many production sites, and helped colleagues become more comfortable using data tools.",
  },
  {
    role: "Data Analyst & Reporting Specialist",
    company: "Don Pollo",
    period: "2013 – 2020",
    description: "Improved how accurately we could predict production by a significant margin. Automated many daily tasks, drastically cutting down on manual errors, and developed a model to better forecast egg and hatch outcomes.",
  },
];
</script>

<style scoped>
@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.space-y-12 > div {
    animation: fadeIn 0.6s ease-out forwards;
    opacity: 0;
}

.space-y-12 > div:nth-child(1) {
    animation-delay: 0.2s;
}

.space-y-12 > div:nth-child(2) {
    animation-delay: 0.4s;
}

.space-y-12 > div:nth-child(3) {
    animation-delay: 0.6s;
}
</style>