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
                        <h3 class="text-2xl text-primary font-semibold">About Me (and What Keeps Me Curious)</h3>
                        <p>
                          Hey there! I'm <strong>Poul</strong>, and while I spend my days working with software, my curiosity stretches <em>far beyond the screen</em>. I'm someone who finds joy in the <strong>intricate details of digital systems</strong>, and equally, in the profound beauty of <em>classical music and opera</em>. There's a special kind of resonance in a complex score or a powerful aria that sparks my mind in a truly unique way.
                        </p>
                    </section>
                    
                    <section id="background" class="mb-8">
                        <h3 class="text-2xl text-primary font-semibold">My Journey to Code</h3>
                        <p>
                          My path to software <strong>wasn't a straight line</strong>. As a teenager, I was fascinated by <em>electronics and microcontrollers</em>, always tinkering and building. It was like designing a special circuit for a unique purpose. That <strong>hands-on spirit</strong>, that feeling of making something tangible work, never really left me. My formal journey began with <em>business administration</em>, where I grew captivated by how decisions are made and how data shapes a company's direction. That initial curiosity about business insights and their impact led me to dive deeper into <strong>computer engineering</strong>. What's been particularly rewarding is that I've always <strong>combined studying with working</strong>. This allowed me to see firsthand how theoretical concepts and <em>'best practices'</em> immediately impacted my daily work, strengthening my understanding and capabilities. This journey deepened my fascination with getting the <strong>right feedback, at the right time</strong>, to truly empower a business, and I feel like it's the same kind of design challenge, just on a different scale. It's truly amazing to live and work in a field that resonates so strongly with my <em>earliest hobbies</em>.
                        </p>
                    </section>
                    
                    <section id="skills" class="mb-8">
                        <h3 class="text-2xl text-primary font-semibold">Beyond the Terminal</h3>
                        <p>
                          When I'm not immersed in code or thinking about data, you'll often find me with my nose in a book, maybe jotting down thoughts for an essay – I enjoy <strong>putting ideas on paper</strong>. And speaking of things that click, I'm also really interested in <em>cars and their mechanics</em>. There's a surprising parallel between figuring out a tricky software problem and understanding how an engine works its magic.
                          <br>
                          I'm also a <strong>long-time advocate for free and open-source software (FOSS)</strong>. From embracing <em>Linux and Emacs</em> to championing <strong>internet privacy</strong> and <em>resilient, censorship-resistant networks</em>, these principles have been a personal cause for years.
                        </p>
                    </section>
                    
                    <section id="interests">
                        <h3 class="text-2xl text-primary font-semibold">My Evolving Toolkit & Philosophy</h3>
                        <p>
                          As for the work itself, I'm focused on building things that are <strong>practical and effective</strong>. I've learned that with <em>Python</em>, <strong>simplicity in design is truly everything</strong>. My years of working with <em>Java</em> taught me a lot about how sustainable code relies on being <strong>multi-platform</strong> and having <em>well-defined patterns</em>. Lately, I'm spending time exploring <strong>Clojure</strong>, which is a really interesting language that I'm keen to use for personal projects down the road. I find satisfaction in figuring out how to make robust systems that <strong>just... work</strong>.
                        </p>
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