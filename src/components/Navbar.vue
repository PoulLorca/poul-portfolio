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

      <!-- Desktop Navigation -->
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
              href="/about-me"
            >
              About Me
            </a>
          </Button>
          <Button variant="ghost" asChild>
            <a
              class="transition-all duration-200 hover:text-primary hover:scale-110"
              href="/blog"
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

      <!-- Mobile Navigation Toggle -->
      <div class="flex imtems-center space-x-2">
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
        
        <button
          @click="toogleMobileMenu"
          class="md:hidden p-1 rounded-md transition-all duration-200 hover:scale-110 cursor-pointer"
          aria-label="Toggle menu"
        >
          <Menu
            class="w-5 h-5 primary transition-transform duration-200"
            :class="{ 'rotate-90': isMobileMenuOpen }"
          />
        </button>
      </div>  
    </div>

    <!-- Mobile Menu -->
    <div
      class="md:hidden overflow-hidden transition-all duration-300 ease-in-out border-b bg-background/95 backdrop-blur"
      :class="isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'"
    >
      <nav class="container px-4 py-4">
        <!-- Navigation Links -->
        <div class="flex flex-col space-y-2 mb-4">
          <Button variant="ghost" asChild class="justify-start">
            <a
              class="transition-all duration-200 hover:text-primary"
              :href="isHomePage ? '#home' : '/#home'"
              @click="closeMobileMenu"
            >
              Home
            </a>
          </Button>
          <Button variant="ghost" asChild class="justify-start">
            <a
              class="transition-all duration-200 hover:text-primary"
              :href="isHomePage ? '#experience' : '/#experience'"
              @click="closeMobileMenu"
            >
              Experience
            </a>
          </Button>
          <Button variant="ghost" asChild class="justify-start">
            <a
              class="transition-all duration-200 hover:text-primary"
              :href="isHomePage ? '#projects' : '/#projects'"
              @click="closeMobileMenu"
            >
              Projects
            </a>
          </Button>
          <Button variant="ghost" asChild class="justify-start">
            <a
              class="transition-all duration-200 hover:text-primary"
              href="/about-me"
              @click="closeMobileMenu"
            >
              About Me
            </a>
          </Button>
          <Button variant="ghost" asChild class="justify-start">
            <a
              class="transition-all duration-200 hover:text-primary"
              href="/blog"
              @click="closeMobileMenu"
            >
              Blog
            </a>
          </Button>
        </div>
        
        <div class="flex items-center space-x-4 pt-2 border-t border-border">
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
      </nav>
    </div> 

  </header>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { Button } from "@/components/ui/button"; 
import { Github, Linkedin, Pilcrow, Sun, Moon, Menu } from "lucide-vue-next"; 

const props = defineProps<{
  currentPath: string; 
}>();

const isHomePage = computed(() => {  
  return (
    props.currentPath === "/"     
  );
});

const currentTheme = ref<'light' | 'dark'>('light');
const isMobileMenuOpen = ref(false);


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

const toogleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false;
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
