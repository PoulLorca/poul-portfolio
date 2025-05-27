<template>
  <section class="container mx-auto py-12 px-4">
    
    <div class="flex flex-col items-center mb-8">
      <h1 class="text-4xl font-bold mb-4 text-slate-900 dark:text-white flex items-center gap-3">
        <FileText class="w-8 h-8 text-primary" />
        All Posts
      </h1>      
    </div>

    
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      
      <div class="lg:col-span-2">
        
        <div class="space-y-6 max-h-screen overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent">
          <a 
            v-for="post in allPosts" 
            :key="post.title"
            :href="post.link"
            class="group bg-card rounded-xl overflow-hidden shadow-md hover:shadow-xl hover:shadow-primary/20 transition-all duration-300 flex flex-col transform hover:-translate-y-2 hover:scale-[1.02] border border-transparent hover:border-primary/20 block"
          >
            <div class="p-6 flex flex-row gap-4 h-full">
              
              <div class="flex-1 flex flex-col justify-between">
                
                <div class="text-sm font-medium mb-3 text-slate-600 dark:text-slate-300">
                  {{ formatDate(post.date) }}
                </div>
                
                
                <h3 class="text-lg font-bold mb-4 text-slate-900 dark:text-white group-hover:text-primary transition-colors">
                  {{ post.title }}
                </h3>
                
                
                <div class="mb-4">
                  <span class="inline-flex items-center text-primary font-medium group-hover:gap-2 transition-all">
                    Read more 
                    <ArrowRight class="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
                
                
                <div class="flex flex-wrap gap-2 mb-3">
                  <Badge 
                    v-for="tech in post.techStack" 
                    :key="tech" 
                    class="bg-primary/80 hover:bg-primary text-white text-xs"
                  >
                    {{ tech }}
                  </Badge>
                </div>
                
                
                <div class="flex flex-wrap gap-2 mt-auto">
                  <Badge 
                    v-for="tag in post.tags" 
                    :key="tag" 
                    variant="outline" 
                    class="text-xs bg-slate-100 dark:bg-slate-800 dark:border-slate-700"
                  >
                    {{ tag }}
                  </Badge>
                </div>
              </div>
              
              
              <div class="w-24 h-24 md:w-28 md:h-28 flex-shrink-0">
                <img 
                  :src="post.image" 
                  :alt="post.title" 
                  class="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>
          </a>
        </div>
      </div>

      
      <div class="lg:col-span-1">
        <div class="sticky top-8 space-y-8">
          
          <div class="bg-card rounded-xl p-6 shadow-md">
            <h3 class="text-xl font-bold mb-4 text-slate-900 dark:text-white flex items-center gap-2">
              <Hash class="w-5 h-5 text-primary" />
              Categories
            </h3>
            <div class="flex flex-wrap gap-2">
              <Badge
                v-for="tag in uniqueTags"
                :key="tag.name"
                :class="getTagBadgeClasses(tag.count)"
                class="cursor-pointer hover:scale-105 transition-transform duration-200"
                @click="filterByTag(tag.name)"
              >
                {{ tag.name }}
                <span class="ml-1 text-xs opacity-75">({{ tag.count }})</span>
              </Badge>
            </div>
          </div>

          
          <div class="bg-card rounded-xl p-6 shadow-md">
            <h3 class="text-xl font-bold mb-4 text-slate-900 dark:text-white flex items-center gap-2">
              <Code class="w-5 h-5 text-primary" />
              Technologies
            </h3>
            <div class="flex flex-wrap gap-2">
              <Badge
                v-for="tech in uniqueTechnologies"
                :key="tech.name"
                :class="getTechBadgeClasses(tech.count)"
                class="cursor-pointer hover:scale-105 transition-transform duration-200"
                @click="filterByTech(tech.name)"
              >
                {{ tech.name }}
                <span class="ml-1 text-xs opacity-75">({{ tech.count }})</span>
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue';
import { Badge } from '@/components/ui/badge';
import { FileText, ArrowRight, Hash, Code } from 'lucide-vue-next';

const postModules = Object.values(import.meta.glob('@/pages/posts/*.md', { eager: true }));
const extractedPosts = ref<any[]>([]);

try{
    postModules.forEach(post => {
        const {frontmatter} = post as any;
        if (frontmatter) {
            extractedPosts.value.push({
                title: frontmatter.title || 'Untitled Post',
                date: frontmatter.date || new Date().toISOString(),
                image: frontmatter.image || '/blogs/default.jpg',
                link: frontmatter.link || (post as any).url || '#',
                techStack: frontmatter.techStack || [],
                tags: frontmatter.tags || []                
            });
        }
    });
}catch (error) {
    console.error('Error extracting posts:', error);
}

const allPosts = computed(() => {
    if (extractedPosts.value.length > 0) {
        return extractedPosts.value
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());    
    }
    return []; 
})

const uniqueTags = computed(() => {
    const allTags = allPosts.value
        .map(post => post.tags)
        .flat()
    
    const tagCounts = allTags.reduce((acc: Record<string, number>, tag: string) => {
        acc[tag] = (acc[tag] || 0) + 1;
        return acc;
    }, {});

    return Object.entries(tagCounts)
        .map(([name, count]) => ({ name, count: count as number }))
        .sort((a, b) => b.count - a.count);
});

const uniqueTechnologies = computed(() => {
    const allTechs = allPosts.value
        .map(post => post.techStack)
        .flat()

    const techCounts = allTechs.reduce((acc: Record<string, number>, tech: string) => {
        acc[tech] = (acc[tech] || 0) + 1;
        return acc;
    }, {});

    return Object.entries(techCounts)
        .map(([name, count]) => ({ name, count: count as number }))
        .sort((a, b) => b.count - a.count);
});

const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
};

const getTagBadgeClasses = (count: number) => {
    if (count >= 3){
        return 'bg-primary dark:text-white text-dark text-sm px-3 py-1';        
    }else if (count >= 3) {
        return 'bg-primary/80 dark:text-white text-dark text-sm px-2 py-1';    
    }else{
        return 'bg-primary/60 dark:text-white text-dark text-xs px-2 py-1';
    }
}

const getTechBadgeClasses = (count: number) => {
  if (count >= 3) {
    return 'bg-secondary text-secondary-foreground text-sm px-3 py-1';
  } else if (count >= 2) {
    return 'bg-secondary/80 text-secondary-foreground text-sm px-2 py-1';
  } else {
    return 'bg-secondary/60 text-secondary-foreground text-xs px-2 py-1';
  }
};

const filterByTag = (tagName: string) => {
  console.log(`Filter by tag: ${tagName}`);
  // Aquí puedes implementar la lógica de filtrado
};

const filterByTech = (techName: string) => {
  console.log(`Filter by technology: ${techName}`);
  // Aquí puedes implementar la lógica de filtrado
};

</script>
<style scoped>
/* Estilos personalizados para el scrollbar */
.scrollbar-thin::-webkit-scrollbar {
  width: 6px;
}

.scrollbar-thumb-primary\/20::-webkit-scrollbar-thumb {
  background-color: rgba(var(--primary), 0.2);
  border-radius: 3px;
}

.scrollbar-track-transparent::-webkit-scrollbar-track {
  background: transparent;
}
</style>