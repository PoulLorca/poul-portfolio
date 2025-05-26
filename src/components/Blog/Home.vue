<template>
  <section class="container mx-auto max-w-8xl py-12 px-4" id="home">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">        

        <Card class="col-span-1 md:row-span-2 order-5 md:order-none bg-card hover:shadow-lg transition-all h-full group relative overflow-hidden">          
          <div class="block md:hidden">            
            <div v-if="latestBlog" class="w-full h-48 overflow-hidden mt-0">
              <img 
                :src="latestBlog.image" 
                :alt="latestBlog.title" 
                class="w-full h-full object-cover object-center"
              />
            </div>
                        
            <div class="p-4">              
              <div class="flex flex-wrap gap-2 mb-3">
                <Badge 
                  v-for="tech in latestBlog.techStack" 
                  :key="tech" 
                  class="bg-primary/80 hover:bg-primary text-dark text-xs"
                >
                  {{ tech }}
                </Badge>
              </div>
                            
              <div class="text-sm font-medium mb-3 text-slate-600 dark:text-slate-300">
                {{ latestBlog.date }}
              </div>
                            
              <h3 class="text-xl font-bold mb-4">{{ latestBlog.title }}</h3>
                            
              <div class="mb-4">
                <a :href="latestBlog.link" class="inline-flex items-center hover:text-primary font-medium transition-colors">
                  Read more <ArrowRight class="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
                            
              <div class="flex flex-wrap gap-2">
                <Badge 
                  v-for="tag in latestBlog.tags" 
                  :key="tag" 
                  variant="outline" 
                  class="text-xs bg-black/10 dark:bg-white/10 dark:border-white/20"
                >
                  {{ tag }}
                </Badge>
              </div>
            </div>
          </div>
                    
          <CardContent class="relative h-full p-0 hidden md:block">                        
            <div v-if="latestBlog" class="absolute inset-0 w-full h-full overflow-hidden">              
              <img 
                :src="latestBlog.image" 
                :alt="latestBlog.title" 
                class="w-full h-full object-cover object-center transform origin-center transition-all duration-500 ease-in-out group-hover:scale-110 group-hover:rotate-2"
              />                                          
              
              <div class="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-card via-card/60 to-transparent z-10"></div>            
              <div class="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-b from-transparent via-black/40 to-card z-10"></div>
            </div>
                          
            <div class="relative z-20 h-full flex flex-col p-6">              
              <div class="dark:text-white/90 text-sm font-medium mb-auto">
                {{ latestBlog.date }}
              </div>
                            
              <div class="absolute top-6 right-6 flex flex-wrap justify-end gap-2 max-w-[70%]">
                <Badge 
                  v-for="tech in latestBlog.techStack" 
                  :key="tech" 
                  class="bg-primary/80 hover:bg-primary text-dark text-xs"
                >
                  {{ tech }}
                </Badge>
              </div>
                              
              <div class="mt-auto">
                <h3 class="text-xl md:text-2xl font-bold mb-4">{{ latestBlog.title }}</h3>
                
                <div class="flex items-center justify-between">
                  <a :href="latestBlog.link" class="inline-flex items-center hover:text-primary font-medium transition-colors">
                    Read more <ArrowRight class="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                                      
                  <div class="flex flex-wrap gap-2 justify-end">
                    <Badge 
                      v-for="tag in latestBlog.tags" 
                      :key="tag" 
                      variant="outline" 
                      class="text-xs text-white bg-black dark:border-white/20"
                    >
                      {{ tag }}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

      <Card class="col-span-1 order-2 md:order-none bg-card hover:shadow-lg transition-all">
        <div class="flex flex-col md:flex-row items-center md:items-start p-6 gap-6">
            <Avatar class="w-24 h-24 md:w-32 md:h-32 lg:w-64 lg:h-64 md:flex-shrink-0">
                <img
                    :src="profileImage" 
                    alt="Poul Lorca"
                    class="w-full h-full object-cover"                    
                />            
            </Avatar>

            <div class="flex-1 flex flex-col items-center md:items-start text-center md:text-left md:pl-4">                

                <CardDescription class="font-semibold text-lg mb-4 text-muted-foreground">
                    Software Engineer
                </CardDescription>                

                <CardTitle class="text-4xl font-extrabold mb-2">
                    Poul Cristian Lorca Sanhueza
                </CardTitle>                                                

                <div class="flex gap-4 mt-4">                    
                    <Button variant="outline" class="bg-white dark:bg-background/95 text-primary text-lg dark:text-blue-600 font-semibold shadow-md hover:bg-white/90 dark:hover:bg-foreground hover:shadow-lg transition-all duration-300" asChild>
                        <a href="/about-me">
                        <User class="mr-2 h-4 w-4" />
                        About Me
                        </a>
                    </Button>
                </div>
            </div>
        </div>        
      </Card>

      <div class="col-span-1 order-3 md:order-none grid grid-cols-1 md:grid-cols-2 gap-6">
        <a 
          href="https://github.com/poullorca" 
          target="_blank" 
          rel="noopener noreferrer" 
          class="block"
        >
          <Card class="bg-card hover:shadow-lg transition-all overflow-hidden group relative cursor-pointer h-full">            
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

        <Card class="bg-card hover:shadow-lg transition-all overflow-hidden">
          <CardHeader>
            <CardTitle class="flex items-center">              
              <span class="text-4xl font-extrabold">TECHS</span>
            </CardTitle>            
          </CardHeader>
            <CardContent class="flex flex-wrap gap-2">
                <Toggle
                v-for="tech in techs"
                :key="tech.name"
                :aria-label="tech.name"             
                class="border-2 border-primary rounded-lg p-2 mb-2 hover:bg-primary hover:text-white transition-all duration-200 cursor-pointer"
                >
                    <component :is="tech.icon" class=" h-4 w-4" />
                    {{ tech.name }}                
                </Toggle>
            </CardContent>
        </Card>

      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
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
    Coffee,
    Heading1,
    ArrowRight,
 } from "lucide-vue-next"; 

const profileImage = 'profileImage.jpg';
const postModules = Object.values(import.meta.glob('@/pages/posts/*.md', { eager: true }));
const extractedPosts = ref<any[]>([]);


const techs = [
    { name: 'HTML5', icon: FileCode },
    //{ name: 'Java', icon: FileCode },
    //{ name: 'C#', icon: FileCode },
    //{ name: 'TypeScript', icon: FileCode },    
    //{ name: 'Vue.js', icon: Hammer },
    //{ name: 'Nuxt', icon: Hammer },
    { name: 'Astro', icon: Hammer },
    { name: 'JavaScript', icon: FileCode },
    //{ name: 'Spring', icon: Hammer },
    //{ name: '.Net', icon: Hammer }, 
    { name: 'Tailwind CSS', icon: Heading1 },
    { name: 'Markdown', icon: Heading1 },
    { name: 'CSS3', icon: Heading1 },
    //{ name: 'JavaFx', icon: Leaf },
    //{ name: 'Avalonia UI', icon: Leaf },
    //{ name: 'Qt', icon: Leaf },
    //{ name: 'Electron', icon: Leaf },
    //{ name: 'Git', icon: ChartNetwork },
    //{ name: 'GitHub', icon: ChartNetwork },
    //{ name: 'Docker', icon: ChartNetwork },    
    //{ name: 'Postman', icon: ChartNetwork },    
    //{ name: 'Figma', icon: DraftingCompass },
    //{ name: 'Gimp', icon: DraftingCompass },
    //{ name: 'Linux', icon: AppWindow },
    //{ name: 'Windows', icon: AppWindow },
    //{ name: 'Supabase', icon: Database },
    //{ name: 'MySQL', icon: Database },
    //{ name: 'PostgreSQL', icon: Database },
    //{ name: 'Oracle', icon: Database },
    //{ name: 'SQLite', icon: Database },    
    //{ name: 'Firebase', icon: Database },    
    //{ name: 'Azure', icon: Cloud },
    //{ name: 'Google Cloud', icon: Cloud },
    //{ name: 'Vercel', icon: Cloud },
    //{ name: 'Netlify', icon: Cloud },  

];

try {
  postModules.forEach(post => {
    const { frontmatter } = post as any;
    if (frontmatter) {
      extractedPosts.value.push({
        title: frontmatter.title || 'Untitled Post',
        date: frontmatter.date || new Date().toISOString(),
        image: frontmatter.image || '/blogs/default.png',
        link: frontmatter.link || (post as any).url || '#',
        techStack: frontmatter.techStack || [],
        tags: frontmatter.tags || []
      });
    }
  });  
} catch (error) {
  console.error('Error processing posts:', error);
}

const blogs = computed(() => {
  if (extractedPosts.value.length > 0) {
    return extractedPosts.value;
  }    
});


const latestBlog = computed(() => {
  if (!blogs.value || blogs.value.length === 0) return null;
  return blogs.value.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];
});
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