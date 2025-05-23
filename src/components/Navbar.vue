<template>
  <header
    class="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
  >
    <div class="container flex h-16 items-center justify-between px-4">
      <div class="flex items-center">
        <a href="/" class="flex items-center space-x-2">
          <Pilcrow class="w-8 h-8 primary" />
          <span class="text-2xl font-bold text-primary">Poul L</span>
        </a>
      </div>

      <nav class="hidden md:flex items-center justify-center flex-1">
        <div class="flex items-center space-x-4">
          <Button variant="ghost" asChild>
            <a
              class="transition-all duration-200 hover:text-primary hover:scale-110"
              :href="isHomePage ? '#home' : '/#home'"
            >
              Home
            </a>
          </Button>
          <Button variant="ghost" asChild>
            <a
              class="transition-all duration-200 hover:text-primary hover:scale-110"
              :href="isHomePage ? '#experience' : '/#experience'"
            >
              Experience
            </a>
          </Button>
          <Button variant="ghost" asChild>
            <a
              class="transition-all duration-200 hover:text-primary hover:scale-110"
              :href="isHomePage ? '#projects' : '/#projects'"
            >
              Projects
            </a>
          </Button>
          <Button variant="ghost" asChild>
            <a
              class="transition-all duration-200 hover:text-primary hover:scale-110"
              :href="isHomePage ? '/about-me' : '/lbrowser-site/about-me'"
            >
              About Me
            </a>
          </Button>
          <Button variant="ghost" asChild>
            <a
              class="transition-all duration-200 hover:text-primary hover:scale-110"
              :href="isHomePage ? '#faq' : '/lbrowser-site/#faq'"
            >
              Blog
            </a>
          </Button>
        </div>
      </nav>

      <div class="hidden md:flex items-center space-x-4">
        <a
          href="https://github.com/poullorca"
          target="_blank"
          rel="noopener noreferrer"
          class="transition-all duration-200 hover:text-primary hover:scale-110"
        >
          <Github class="w-6 h-6 primary" />
        </a>
        <a
          href="https://linkedin.com/in/poul-lorca-9433a8296"
          target="_blank"
          rel="noopener noreferrer"
          class="transition-all duration-200 hover:text-primary hover:scale-110"
        >
          <Linkedin class="w-6 h-6 primary" />
        </a>
      </div>

      <button
        id="theme-toggle"
        @click="toggleTheme"
        class="p-1 rounded-md transition-all duration-200 hover:scale-110 cursor-pointer ml-4"
      >
        <Sun
          id="sun-icon"
          class="w-6 h-6 primary hover:text-amber-500"
          :class="{ hidden: currentTheme === 'light' }"
        />
        <Moon
          id="moon-icon"
          class="w-6 h-6 primary hover:text-primary"
          :class="{ hidden: currentTheme === 'dark' }"
        />
      </button>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { Button } from "@/components/ui/button"; 
import { Github, Linkedin, Pilcrow, Sun, Moon } from "lucide-vue-next"; 

const props = defineProps<{
  currentPath: string; 
}>();

const isHomePage = computed(() => {  
  return (
    props.currentPath === "/"     
  );
});

const currentTheme = ref<'light' | 'dark'>('light');


const setTheme = (themeValue: 'light' | 'dark') => {
  currentTheme.value = themeValue;
  if (themeValue === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
  localStorage.setItem('theme', themeValue);
};


const toggleTheme = () => {
  setTheme(currentTheme.value === 'light' ? 'dark' : 'light');
};


onMounted(() => {
  const storedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
  const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)').matches;

  let initialTheme: 'light' | 'dark';

  if (storedTheme) {
    initialTheme = storedTheme;
  } else {
    initialTheme = prefersDarkScheme ? 'dark' : 'light';
  }
  setTheme(initialTheme);
});
</script>
