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
        title: "E-commerce Platform",
        description: "A modern e-commerce solution with cart functionality, payment processing, and user authentication.",
        image: "/images/project1.jpg", 
        technologies: ["Vue.js", "Node.js", "MongoDB", "Stripe"],
        link: "https://example.com/project1"
    },
    {
        id: 2,
        title: "Task Management App",
        description: "A productivity application for organizing tasks with drag-and-drop functionality and team collaboration.",
        image: "/images/project2.jpg", 
        technologies: ["React", "Firebase", "Tailwind CSS", "Redux"],
        link: "https://example.com/project2"
    },
    {
        id: 3,
        title: "Real-time Chat Application",
        description: "A messaging platform with real-time communication, user presence, and file sharing capabilities.",
        image: "/images/project3.jpg", 
        technologies: ["Vue.js", "Socket.io", "Express", "PostgreSQL"],
        link: "https://example.com/project3"
    }
]);
</script>