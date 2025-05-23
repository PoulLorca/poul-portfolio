<template>
    <section class="container mx-auto py-12 px-4">
        <div class="flex flex-col items-center">
            <div class="mb-8 relative">
                <div class="image-container">
                    <Avatar class="w-32 h-32 md:w-64 md:h-64 lg:w-72 lg:h-72 md:flex-shrink-0">
                        <img
                            :src="profileImage" 
                            alt="Poul Lorca"
                            class="w-full h-full object-cover"                    
                        />            
                    </Avatar>
                    <div class="glow-effect"></div>                    
                </div>
            </div>

            <h2 class="text-4xl font-bold mb-12 text-center">About Me</h2>

            <div class="w-full max-w-3xl backdrop-blur-sm bg-white/30 dark:bg-slate-900/30 rounded-xl p-6 md:p-8 shadow-lg">
                <div class="prose prose-lg dark:prose-invert max-w-none">
                    <section id="about" class="mb-8">
                        <h3 class="text-2xl text-primary font-semibold">About Me</h3>
                        <p>Hello! I'm Poul, a software developer passionate about creating elegant solutions to complex problems. My approach combines technical expertise with creative thinking to deliver high-quality applications that meet both user needs and business objectives.</p>
                    </section>
                    
                    <section id="background" class="mb-8">
                        <h3 class="text-2xl text-primary font-semibold">Background</h3>
                        <p>With over X years of experience in software development, I've specialized in full-stack development with a focus on modern web technologies. I've worked with diverse teams across various industries, from startups to enterprise organizations, helping to build scalable and maintainable solutions.</p>
                    </section>
                    
                    <section id="skills" class="mb-8">
                        <h3 class="text-2xl text-primary font-semibold">Skills</h3>
                        <p>My core technical competencies include full-stack development with Java, C#, and TypeScript. I'm experienced with frameworks like Spring, .NET, Vue.js, and Astro. I pride myself on writing clean, maintainable code and staying current with industry best practices and emerging technologies.</p>
                    </section>
                    
                    <section id="interests">
                        <h3 class="text-2xl text-primary font-semibold">Interests</h3>
                        <p>Beyond coding, I enjoy exploring new technologies, contributing to open-source projects, and mentoring aspiring developers. When I'm not at my computer, you might find me hiking, reading about technology trends, or experimenting with new cooking recipes.</p>
                    </section>
                </div>
            </div>                                             
        </div>            
    </section>
</template>
<script setup lang="ts">
import { Avatar } from '@/components/ui/avatar'

const profileImage = 'profileImage.jpg';
</script>

<style scoped>
.image-container {
  position: relative;
  display: inline-block;
}

.glow-effect {
  position: absolute;
  top: -5px;
  left: -5px;
  right: -5px;
  bottom: -5px;
  border-radius: 50%;
  z-index: -1;
  background: conic-gradient(
    from 0deg,
    transparent 0%,
    var(--tw-text-opacity-primary, #3b82f6) 20%,
    transparent 40%
  );
  opacity: 0.7;
  animation: rotate 4s linear infinite;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

:root {
  --tw-text-opacity-primary: #3b82f6;
}

.dark {
  --tw-text-opacity-primary: #60a5fa;
}
</style>