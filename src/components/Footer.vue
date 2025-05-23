<template>
    <footer class="w-full border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-6">
        <div class="container flex flex-col md:flex-row items-center justify-between px-4 gap-6 md:gap-0">

            <div class="flex items-center">
                <a href="/" class="flex items-center space-x-2">
                    <Pilcrow class="w-6 h-6 text-primary" />
                    <span class="text-xl font-bold text-primary">Poul L</span>
                </a>
            </div>

            <div class="flex items-center justify-center space-x-2 text-slate-600 dark:text-slate-300">
                <Code2 class="w-5 h-5" />
                <span>Developed by Poul Lorca, with Vue + Astro</span>
            </div>

            <div class="flex items-center space-x-4">
                <a
                href="mailto:your.email@example.com"
                title="Email"
                class="transition-all duration-200 hover:text-primary hover:scale-110"
                >
                <Mail class="w-5 h-5" />
                </a>
                <a
                href="https://twitter.com/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                title="Twitter"
                class="transition-all duration-200 hover:text-primary hover:scale-110"
                >
                <Twitter class="w-5 h-5" />
                </a>
                <a
                href="https://github.com/poullorca"
                target="_blank"
                rel="noopener noreferrer"
                title="GitHub"
                class="transition-all duration-200 hover:text-primary hover:scale-110"
                >
                <Github class="w-5 h-5" />
                </a>
                <a
                href="https://linkedin.com/in/poul-lorca-9433a8296"
                target="_blank"
                rel="noopener noreferrer"
                title="LinkedIn"
                class="transition-all duration-200 hover:text-primary hover:scale-110"
                >
                <Linkedin class="w-5 h-5" />
                </a>
            </div>

        </div>
    </footer>
</template>

<script setup lang="ts">
import { 
    Pilcrow,
    Code2,
    Mail,
    Twitter,
    Github,
    Linkedin
 } from 'lucide-vue-next';

</script>