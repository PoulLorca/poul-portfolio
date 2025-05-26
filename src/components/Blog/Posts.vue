<template>
    <section class="container mx-auto py-12 px-4">
        <div class="flex flex-col items-center mb-8">
            <h2 class="text-4xl font-bold mb-4 dark:text-white flex items-center gap-3">
                <FileText class="w-8 h-8 text-primary" />
                Latest Posts
            </h2>
        </div>    

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <a
                v-for="post in latestPosts"
                :key="post.title"
                :href="post.link"
                class="group bg-card rounded-xl overflow-hidden shadow-md hover:shadow-xl hover:shadow-primary/20 transition-all duration-300 flex flex-col h-full transform hover:-translate-y-2 hover:scale-[1.02] border border-transparent hover:border-primary/20"
            >
                <div class="p-6 flex flex-row gap-4 h-full">
                    <div class="flex-1 flex flex-col justify-between">
                        <div class="text-sm font-medium mb-3 text-slate-600 dark:text-slate-300">
                            {{ formatDate(post.date) }}
                        </div>

                        <h3 class="text-lg font-bold mb-4 dark:text-white group-hover:text-primary transition-colors">
                            {{ post.title }}
                        </h3>

                        <div class="mb-4">
                            <span class="inline-flex items-center text-primary font-medium group-hover:gap-2 transition-all">
                                Read More
                                <ArrowRight class="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform"/>
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

        <div class="text-center">
            <a 
                href="/blog/posts" 
                class="inline-flex items-center text-lg font-semibold text-primary hover:text-primary/80 transition-colors group"
            >
                View all posts 
                <ArrowRight class="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </a>
        </div>
    </section>
</template>
<script lang="ts" setup>
import { computed } from 'vue';
import { Badge } from '@/components/ui/badge';
import { FileText, ArrowRight } from 'lucide-vue-next';

const postModules = Object.values(import.meta.glob('@/pages/posts/*.md', { eager: true }));

const extractedPosts = computed(() => {
    const posts = postModules.map(post => {
        const { frontmatter } = post as any;
        return {
            title: frontmatter?.title || 'Untitled Post',
            date: frontmatter?.date || new Date().toISOString(),
            image: frontmatter?.image || '/blogs/default.jpg',
            link: frontmatter?.link || (post as any).url || '#',
            techStack: frontmatter?.techStack || [],
            tags: frontmatter?.tags || []
        }
    });

    return posts
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 3);
});

const latestPosts = computed(() => {
    if (extractedPosts.value.length > 0){
        return extractedPosts.value;
    }
});

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};
</script>