<template>
  <section class="container mx-auto max-w-5xl py-12 px-4" id="home">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card class="col-span-1 md:col-span-2 bg-card hover:shadow-lg transition-all">
            <div class="flex flex-col md:flex-row items-center md:items-start p-6 gap-6">
            <Avatar class="w-32 h-32 md:w-64 md:h-64 lg:w-72 lg:h-72 md:flex-shrink-0">
                <img
                    :src="profileImage" 
                    alt="Poul Lorca"
                    class="w-full h-full object-cover"                    
                />            
            </Avatar>

            <div class="flex-1 flex flex-col items-center md:items-start text-center md:text-left md:pl-4">
                <div class="w-full flex justify-center md:justify-start mb-4">
                <Badge variant="default" class="bg-primary text-foreground animate-shake">
                    Available for Work
                </Badge>
                </div>

                <h2 class="text-3xl font-bold mb-2">Poul Lorca</h2>

                <p class="font-semibold text-lg mb-4 text-muted-foreground">
                Sofware Engineer | Data Analyst | Full Stack Developer
                </p>

                <p class="mb-6">
                Solutions-driven software engineer focused on data analysis and full-stack development, proficient in Java, C#, TypeScript, modern web technologies (Nuxt, Astro), and database management (MySQL, PostgreSQL, Oracle).
                </p>

                <div class="flex gap-4 mt-2">
                    <Button asChild class="text-foreground">
                        <a href="mailto:tu-email@ejemplo.com">
                        <Mail class="mr-2 h-4 w-4" />
                        Contact Me
                        </a>
                    </Button>

                    <Button variant="outline" asChild>
                        <a href="/about-me">
                        <User class="mr-2 h-4 w-4" />
                        About Me
                        </a>
                    </Button>
                </div>
            </div>
            </div>
        </Card>


        <a href="#projects" class="col-span-1 md:row-span-2 order-5 md:order-none block h-full">
          <Card class="bg-card hover:shadow-lg transition-all h-full group cursor-pointer">
              <CardHeader>
                  <CardTitle class="flex items-center">
                      <CodeXml class="mr-2 h-10 w-10" />
                      <span class="text-4xl font-bold">Projects</span>
                  </CardTitle>
              </CardHeader>
              <CardContent class="overflow-hidden">
                  <p>
                    These are some of my public works that I've particularly enjoyed creating. I hope you find them interesting to explore.
                  </p>
          
                  <div class="mt-4 md:mt-10 overflow-hidden rounded-lg shadow-md relative h-60 md:h-96">
                      <img
                      src="/projects.png"
                      alt="Projects"
                      class="absolute w-[115%] h-[115%] object-cover object-center transform origin-center transition-all duration-500 ease-in-out group-hover:scale-120 group-hover:rotate-2"
                      />
                  </div>
              </CardContent>
          </Card>
        </a>

      <Card class="col-span-1 order-2 md:order-none bg-card hover:shadow-lg transition-all">
        <CardHeader>
            <CardTitle class="flex items-center">
                <Boxes class="mr-2 h-10 w-10" />
                <span class="text-4xl font-bold">Tech Stack</span>
            </CardTitle>          
         </CardHeader>
        <CardContent class="flex flex-wrap gap-2">
            <Toggle
            v-for="tech in techStack"
            :key="tech.name"
            :aria-label="tech.name"             
            class="border-2 border-primary rounded-lg p-2 mb-2 hover:bg-primary hover:text-white transition-all duration-200"
            >
                <component :is="tech.icon" class=" h-4 w-4" />
                {{ tech.name }}                
            </Toggle>
        </CardContent>
      </Card>

      <div class="col-span-1 order-3 md:order-none grid grid-cols-1 md:grid-cols-2 gap-6">
        <a 
          href="https://github.com/poullorca" 
          target="_blank" 
          rel="noopener noreferrer" 
          class="block"
        >
          <Card class="bg-card hover:shadow-lg transition-all overflow-hidden group relative cursor-pointer h-full">
            <!-- GitHub icon background -->
            <div class="absolute -right-20 -bottom-20 opacity-10 group-hover:opacity-20 transition-opacity">
              <Github class="w-70 h-70 text-primary" />
            </div>
            
            <CardHeader>
              <div class="flex items-center gap-3 mb-2">
                <Github class="h-8 w-8 text-primary" />
                <CardTitle class="text-2xl md:text-3xl font-bold">Open Source</CardTitle>
              </div>
              
              <CardDescription class="text-base">
                Check out my contributions and projects
              </CardDescription>
            </CardHeader>                        
          </Card>
        </a>

        <Card class="bg-gradient-to-br from-card via-primary/5 to-card hover:shadow-lg transition-all overflow-hidden">
          <CardHeader>
            <CardTitle class="flex items-center">              
              <span class="text-4xl font-bold">Beyond the Code</span>
            </CardTitle>            
          </CardHeader>
          <CardContent>
            <div class="flex flex-wrap gap-2 py-2">
              <Badge varaint="outline" class="bg-primary/10 text-foreground border-primary px-4 py-2 text-sm">
                Writing
              </Badge>
              <Badge varaint="outline" class="bg-primary/10 text-foreground border-primary px-4 py-2 text-sm">
                Music
              </Badge>              
              <Badge varaint="outline" class="bg-primary/10 text-foreground border-primary px-4 py-2 text-sm">
                Cars
              </Badge>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import {Card,CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"; 
import { Button } from "@/components/ui/button";
import { Avatar } from '@/components/ui/avatar'
import { Badge } from "@/components/ui/badge"; 
import { Toggle } from "@/components/ui/toggle";
import { 
    Mail, 
    User,
    CodeXml,
    Boxes,
    FileCode,
    Hammer,
    Leaf,
    DraftingCompass,
    AppWindow,
    Database,
    ChartNetwork,
    Cloud,
    Github,
    Coffee
 } from "lucide-vue-next"; 

const profileImage = 'profileImage.jpg';

const techStack = [
    //{ name: 'HTML5', icon: FileCode },
    { name: 'Java', icon: FileCode },
    { name: 'C#', icon: FileCode },
    { name: 'TypeScript', icon: FileCode },    
    //{ name: 'Vue.js', icon: Hammer },
    { name: 'Nuxt', icon: Hammer },
    { name: 'Astro', icon: Hammer },
    { name: 'Spring', icon: Hammer },
    { name: '.Net', icon: Hammer }, 
    { name: 'Tailwind CSS', icon: Leaf },
    //{ name: 'JavaFx', icon: Leaf },
    //{ name: 'Avalonia UI', icon: Leaf },
    { name: 'Qt', icon: Leaf },
    //{ name: 'Electron', icon: Leaf },
    { name: 'Git', icon: ChartNetwork },
    { name: 'GitHub', icon: ChartNetwork },
    { name: 'Docker', icon: ChartNetwork },    
    //{ name: 'Postman', icon: ChartNetwork },    
    { name: 'Figma', icon: DraftingCompass },
    //{ name: 'Gimp', icon: DraftingCompass },
    { name: 'Linux', icon: AppWindow },
    //{ name: 'Windows', icon: AppWindow },
    //{ name: 'Supabase', icon: Database },
    { name: 'MySQL', icon: Database },
    { name: 'PostgreSQL', icon: Database },
    { name: 'Oracle', icon: Database },
    //{ name: 'SQLite', icon: Database },    
    { name: 'Firebase', icon: Database },    
    { name: 'Azure', icon: Cloud },
    //{ name: 'Google Cloud', icon: Cloud },
    { name: 'Vercel', icon: Cloud },
    //{ name: 'Netlify', icon: Cloud },    
];

</script>

<style scoped>
@keyframes shake {
  0% { transform: translateX(0); }
  10% { transform: translateX(-3px) rotate(-1deg); }
  20% { transform: translateX(3px) rotate(1deg); }
  30% { transform: translateX(-3px) rotate(0deg); }
  40% { transform: translateX(3px) rotate(0deg); }
  50% { transform: translateX(-2px); }
  60% { transform: translateX(2px); }
  70% { transform: translateX(-1px); }
  80% { transform: translateX(1px); }
  90% { transform: translateX(0); }
  100% { transform: translateX(0); }
}

.animate-shake {
  animation-name: shake; 
  animation-duration: 2.5s;
  animation-delay: 5s; 
  animation-iteration-count: infinite;
  animation-fill-mode: both;
  animation-timing-function: ease-in-out;  
}

@layer components {
  .scale-115 {
    --tw-scale-x: 1.15;
    --tw-scale-y: 1.15;
    transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
  }
}
</style>