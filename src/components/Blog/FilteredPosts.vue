<template>
    <section class="container mx-auto py-12 px-4">
        <div class="flex flex-col items-center mb-8">
            <h1 class="text-4xl font-bold mb-4 text-dark dark:text-white flex items-center gap-3">
                <component :is="filterType === 'tag' ? Hash : Code" class="w-8 h-8 text-primary" />
                Posts {{ filterType === 'tag' ? 'tagged with' : 'using' }} "<span class="text-primary">{{ filterValue }}</span>"
            </h1>
            <p class="test-slate-600 dark:text-slate-400">
                Found {{ posts.length }} post{{ posts.length !== 1 ? 's' : '' }}
            </p>
            <a
                href="/blog/posts"
                class="mt-4 text-primary hover:underline flex items-center gap-1"
            >
                <ArrowLwft class="w-4 h-4" />
                Back to all posts
            </a>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <a 
                v-for="post in posts" 
                :key="post.title"
                :href="post.link"
                class="group bg-card rounded-xl overflow-hidden shadow-md hover:shadow-xl hover:shadow-primary/20 transition-all duration-300 transform hover:-translate-y-2 hover:scale-[1.02] border border-transparent hover:border-primary/20 block"
            >
                <div class="aspect-video overflow-hidden">
                    <img 
                        :src="post.image" 
                        :alt="post.title" 
                        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                </div>
                
                <div class="p-6">
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
                
                    <div class="flex flex-wrap gap-2">
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
            </a>
        </div>

        <div v-if="posts.length === 0" class="text-center py-12">
            <p class="text-slate-500 dark:text-slate-400 text-lg">
                No posts found for this {{ filterType }}.
            </p>
        </div>        
    </section>
</template>

<script setup lang="ts">
    import { Badge } from '@/components/ui/badge';
    import { Hash, Code, ArrowRight, ArrowLeft } from 'lucide-vue-next';

interface Post {
    title: string;
    date: string;
    image: string;
    link: string;
    techStack: string[];
    tags: string[];
}

interface Props {
    posts: Post[];
    filterType: 'tag' | 'technology';
    filterValue: string;
}

defineProps<Props>();

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};
</script>