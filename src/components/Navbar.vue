<template>
  <header
    class="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
    data-pagefind-ignore
  >
    <div class="container flex h-16 items-center justify-between px-4">
      <div class="flex items-center">
        <a href="/" class="flex items-center space-x-2">
          <Pilcrow class="w-8 h-8 text-primary" />
          <span class="text-2xl font-bold text-primary">Poul L</span>
        </a>
      </div>

      <!-- Desktop Navigation -->
      <nav class="hidden md:flex items-center justify-center flex-1" aria-label="Principal">
        <div class="flex items-center space-x-1">
          <Button
            v-for="link in links"
            :key="link.href"
            variant="ghost"
            asChild
            :class="esActiva(link.href) ? 'text-primary' : ''"
          >
            <a
              class="transition-all duration-200 hover:text-primary hover:scale-105"
              :href="link.href"
              :aria-current="esActiva(link.href) ? 'page' : undefined"
            >
              {{ link.label }}
            </a>
          </Button>
        </div>
      </nav>

      <div class="hidden md:flex items-center space-x-3">
        <a
          href="/contenido?buscar=1"
          title="Buscar en el contenido"
          aria-label="Buscar en el contenido"
          class="transition-all duration-200 hover:text-primary hover:scale-110 p-1"
        >
          <Search class="w-5 h-5" />
        </a>
        <a
          :href="site.youtubeUrl"
          target="_blank"
          rel="noopener noreferrer"
          title="YouTube"
          aria-label="YouTube"
          class="transition-all duration-200 hover:text-primary hover:scale-110"
        >
          <Youtube class="w-5 h-5" />
        </a>
        <a
          :href="site.xUrl"
          target="_blank"
          rel="noopener noreferrer"
          title="X (Twitter)"
          aria-label="X (Twitter)"
          class="transition-all duration-200 hover:text-primary hover:scale-110"
        >
          <Twitter class="w-5 h-5" />
        </a>
        <a
          :href="site.githubUrl"
          target="_blank"
          rel="noopener noreferrer"
          title="GitHub"
          aria-label="GitHub"
          class="transition-all duration-200 hover:text-primary hover:scale-110"
        >
          <Github class="w-5 h-5" />
        </a>
        <a
          :href="site.linkedinUrl"
          target="_blank"
          rel="noopener noreferrer"
          title="LinkedIn"
          aria-label="LinkedIn"
          class="transition-all duration-200 hover:text-primary hover:scale-110"
        >
          <Linkedin class="w-5 h-5" />
        </a>
      </div>

      <!-- Mobile Navigation Toggle -->
      <div class="flex items-center space-x-2">
        <a
          href="/contenido?buscar=1"
          title="Buscar"
          aria-label="Buscar"
          class="md:hidden p-1 rounded-md transition-all duration-200 hover:scale-110"
        >
          <Search class="w-5 h-5" />
        </a>
        <button
          id="theme-toggle"
          @click="toggleTheme"
          class="p-1 rounded-md transition-all duration-200 hover:scale-110 cursor-pointer"
          aria-label="Cambiar tema claro/oscuro"
        >
          <Sun
            id="sun-icon"
            class="w-6 h-6 hover:text-amber-500"
            :class="{ hidden: currentTheme === 'light' }"
          />
          <Moon
            id="moon-icon"
            class="w-6 h-6 hover:text-primary"
            :class="{ hidden: currentTheme === 'dark' }"
          />
        </button>

        <button
          @click="toogleMobileMenu"
          class="md:hidden p-1 rounded-md transition-all duration-200 hover:scale-110 cursor-pointer"
          aria-label="Abrir menú"
          :aria-expanded="isMobileMenuOpen"
        >
          <Menu
            class="w-5 h-5 transition-transform duration-200"
            :class="{ 'rotate-90': isMobileMenuOpen }"
          />
        </button>
      </div>
    </div>

    <!-- Mobile Menu -->
    <div
      class="md:hidden overflow-hidden transition-all duration-300 ease-in-out border-b bg-background/95 backdrop-blur"
      :class="isMobileMenuOpen ? 'max-h-[28rem] opacity-100' : 'max-h-0 opacity-0'"
    >
      <nav class="container px-4 py-4" aria-label="Móvil">
        <div class="flex flex-col space-y-2 mb-4">
          <Button
            v-for="link in links"
            :key="link.href"
            variant="ghost"
            asChild
            class="justify-start"
          >
            <a
              class="transition-all duration-200 hover:text-primary"
              :href="link.href"
              @click="closeMobileMenu"
            >
              {{ link.label }}
            </a>
          </Button>
          <Button variant="ghost" asChild class="justify-start">
            <a
              class="transition-all duration-200 hover:text-primary"
              href="/contenido?buscar=1"
              @click="closeMobileMenu"
            >
              Buscar
            </a>
          </Button>
        </div>

        <div class="flex items-center space-x-4 pt-2 border-t border-border">
          <a
            :href="site.youtubeUrl"
            target="_blank"
            rel="noopener noreferrer"
            title="YouTube"
            aria-label="YouTube"
            class="transition-all duration-200 hover:text-primary hover:scale-110"
          >
            <Youtube class="w-6 h-6" />
          </a>
          <a
            :href="site.xUrl"
            target="_blank"
            rel="noopener noreferrer"
            title="X (Twitter)"
            aria-label="X (Twitter)"
            class="transition-all duration-200 hover:text-primary hover:scale-110"
          >
            <Twitter class="w-6 h-6" />
          </a>
          <a
            :href="site.githubUrl"
            target="_blank"
            rel="noopener noreferrer"
            title="GitHub"
            aria-label="GitHub"
            class="transition-all duration-200 hover:text-primary hover:scale-110"
          >
            <Github class="w-6 h-6" />
          </a>
          <a
            :href="site.linkedinUrl"
            target="_blank"
            rel="noopener noreferrer"
            title="LinkedIn"
            aria-label="LinkedIn"
            class="transition-all duration-200 hover:text-primary hover:scale-110"
          >
            <Linkedin class="w-6 h-6" />
          </a>
        </div>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { Button } from '@/components/ui/button';
import { Youtube, Github, Linkedin, Twitter, Mail, Pilcrow, Sun, Moon, Menu, Search } from 'lucide-vue-next';
import site from '@/data/site.json';

const props = defineProps<{
  currentPath: string;
}>();

const links = [
  { href: '/', label: 'Inicio' },
  { href: '/contenido', label: 'Contenido' },
  { href: '/temas', label: 'Temas' },
  { href: '/asesorias', label: 'Asesorías' },
];

const esActiva = (href: string) => {
  if (href === '/') return props.currentPath === '/';
  return props.currentPath === href || props.currentPath.startsWith(href + '/');
};

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
  // Sincroniza con el script inline de main.astro (misma clave localStorage.theme)
  const yaOscuro = document.documentElement.classList.contains('dark');
  if ((initialTheme === 'dark') !== yaOscuro) {
    setTheme(initialTheme);
  } else {
    currentTheme.value = initialTheme;
  }
});
</script>
