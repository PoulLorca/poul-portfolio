<template>
    <section class="w-full bg-gradient-to-b from-primary to-background py-4 md:py-8">    
        <div class="container mx-auto max-w-6xl px-4 md:px-6">
            <div class="flex flex-col md:flex-row items-center justify-between gap-8">
                <div class="text-center md:text-left">
                    <h2 class="text-3xl md:text-4xl lg:text-4xl font-bold leading-tight">
                        Chech out my resume                        
                    </h2>
                </div>
                
                <Button 
                    asChild 
                    variant="outline"
                    size="lg"
                    class="mt-6 md:mt-0 bg-white dark:bg-background/95 text-primary dark:text-blue-600 text-lg font-semibold shadow-md hover:bg-white/90 dark:hover:bg-foreground hover:shadow-lg transition-all duration-300 cursor-pointer"
                >
                    <a href="/resume.pdf"
                        target="_blank"
                        rel="noopdndf noreferrer"
                        aria-label="Download resume"
                    >
                        <FileUser class="mr-2 h-5 w-5" />
                        Resume
                    </a>
                </Button>
                

            </div>
        </div>

    </section>
</template>
<script setup lang="ts">
import { Button } from '@/components/ui/button';
import { FileUser } from 'lucide-vue-next';
</script>