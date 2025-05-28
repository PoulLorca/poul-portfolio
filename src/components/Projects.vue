<template>
    <section class="container mx-auto max-w-5xl py-6 px-4" id="projects">
        <div class="flex flex-col items-center mb-12 md:mb-16">
            <h2 class="text-4xl font-bold mb-4 text-slate-900 dark:text-white flex items-center gap-3">
                <CodeXml class="w-8 h-8 text-primary" />
                Projects
            </h2>
            <p class="text-lg text-center text-slate-700 dark:text-slate-300 max-w-2xl">
                These are the public works that I like the most and may interest you.
            </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <a v-for="project in projects" :key="project.id" :href="project.link" target="_blank" rel="noopener noreferrer"
                class="project-card group bg-card rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col h-full transform hover:-translate-y-2">
                <div class="relative overflow-hidden">
                    <img :src="project.image" :alt="project.title" class="w-full h-48 object-cover" />
                    <div class="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div class="p-6 flex flex-col flex-grow">
                    <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-3">{{ project.title }}</h3>
                    <div class="flex flex-wrap gap-2 mb-4">
                        <span v-for="(tech, index) in project.technologies" :key="index"
                            class="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary font-medium">
                            {{ tech }}
                        </span>
                    </div>
                    <p class="text-slate-700 dark:text-slate-300 mb-4 flex-grow">{{ project.description }}</p>
                    <span class="text-primary font-medium flex items-center gap-1 mt-auto">
                        View Project <ArrowRight class="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                </div>
            </a>
        </div>                
    </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { CodeXml, ArrowRight } from 'lucide-vue-next';

interface Project {
    id: number;
    title: string;
    description: string;
    image: string;
    technologies: string[];
    link: string;
}

const projects = ref<Project[]>([
    {
        id: 1,
        title: "LBrowser",
        description: "LBrowser is a lightweight, privacy-focused, open-source web browser that enables easy access to alternative networks like Tor, I2P, and Zeronet via Docker, without tracking or selling your data.",
        image: "projects/submarine.png", 
        technologies: ["Java", "Qt", "Docker"],
        link: "https://poullorca.github.io/lbrowser-site/"
    },
    {
        id: 2,
        title: "Hyphanet Docker",
        description: "Hyphanet is a decentralized, peer-to-peer network that allows users to create and share content without relying on traditional internet infrastructure. This Docker image simplifies the deployment of Hyphanet nodes.",
        image: "projects/hyphanet.png", 
        technologies: ["Linux", "Docker"],
        link: "https://hub.docker.com/r/poullorca/hyphanet-node"
    },
    {
        id: 3,
        title: "This Website",
        description: "A personal portfolio website built with Vue.js + Astro and Tailwind CSS, showcasing my projects, blog posts, and professional experience.",
        image: "projects/paragraph.png", 
        technologies: ["Vue.js", "Astro", "Tailwind CSS"],
        link: "https://example.com/project3"
    }
]);
</script>