<template>
    <section class="container mx-auto py-12 px-4">
        <div class="flex flex-col items-center mb-8">
            <h2 class="text-4xl font-bold mb-4 flex items-center gap-3">
                <Hash class="w-8 h-8 text-primary" />
                Tags
            </h2>            
        </div>

        <div class="flex flex-wrap justify-center gap-3 mt-6">
            <Badge
                v-for="tag in uniqueTags"
                :key="tag.name"
                :class="getBadgeClasses(tag.count)"
                class="cursor-pointer hover:scale-105 transition-transform duration-200"
                @click="handleTagClick(tag.name)"
            >                
                {{ tag.name }} 
                <span class="ml-1 text-xs opacity-75">({{ tag.count }})</span>
            </Badge>
        </div>
    </section>
</template>
<script lang="ts" setup>
import { computed } from 'vue';
import { Badge } from '@/components/ui/badge';
import { Hash } from 'lucide-vue-next';

const postModules = Object.values(import.meta.glob('@/pages/posts/*.md', { eager: true }));

const uniqueTags = computed(() => {

    const allTags = postModules
        .map(post => {
            const { frontmatter } = post as any;
            return frontmatter?.tags || [];
        })
        .flat();

    const tagCounts = allTags.reduce((acc: Record<string, number>, tag: string) => {
        acc[tag] = (acc[tag] || 0) + 1;
        return acc;
    }, {});   
    
    return Object.entries(tagCounts)
        .map(([name, count]) => ({ name, count: count as number }))
});

const getBadgeClasses = (count: number) => {
    if (count >= 5){
        return 'bg-primary dark:text-white text-dark text-lg px-4 py-2';        
    }else if (count >= 3) {
        return 'bg-primary/80 dark:text-white text-dark  text-base px-3 py-1';    
    }else{
        return 'bg-primary/60 dark:text-white text-dark text-sm px-2 py-1';
    }
}

const handleTagClick = (tagName: string) => {
    console.log(`Tag clicked: ${tagName}`);
    // Implement navigation or filtering logic here
}
</script>