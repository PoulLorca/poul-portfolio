<template>
  <section class="container mx-auto max-w-5xl py-12 px-4">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card class="col-span-1 md:col-span-2 bg-card hover:shadow-lg transition-all">
        <div class="flex flex-col md:flex-row items-center md:items-start p-6 gap-6">
          <Avatar class="w-32 h-32 md:w-64 md:h-64 lg:w-72 lg:h-72 md:flex-shrink-0">
            <img
                :src="profileImage" 
                alt="Poul Lorca"
                class="w-full h-full object-cover"
                @error="showFallback = true"                
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
              Full Stack Developer | UI/UX Designer | Tech Enthusiast
            </p>

            <p class="mb-6">
              Passionate about creating intuitive digital experiences that solve real-world problems. Specialized in modern web technologies and responsive design.
            </p>

            <div class="flex gap-4 mt-2">
                <Button asChild class="text-foreground">
                    <a href="mailto:tu-email@ejemplo.com">
                    <MailIcon class="mr-2 h-4 w-4" />
                    Contact Me
                    </a>
                </Button>

                <Button variant="outline" asChild>
                    <a href="#about">
                    <UserIcon class="mr-2 h-4 w-4" />
                    About Me
                    </a>
                </Button>
            </div>
          </div>
        </div>
      </Card>

      <Card class="col-span-1 md:row-span-2 order-5 md:order-none bg-card hover:shadow-lg transition-all h-full">
        <CardHeader>
          <CardTitle>Card B</CardTitle>
          <CardDescription>Izquierda en desktop, última en móvil</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Esta tarjeta ocupa toda la mitad izquierda en pantallas grandes, pero se mueve al final en móviles.</p>
        </CardContent>
      </Card>

      <Card class="col-span-1 order-2 md:order-none bg-card hover:shadow-lg transition-all">
        <CardHeader>
          <CardTitle>Card C</CardTitle>
          <CardDescription>Arriba a la derecha en desktop</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Esta tarjeta va en la parte superior derecha en pantallas grandes y es la segunda en móviles.</p>
        </CardContent>
      </Card>

      <div class="col-span-1 order-3 md:order-none grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card class="bg-card hover:shadow-lg transition-all">
          <CardHeader>
            <CardTitle>Card D</CardTitle>
            <CardDescription>Mitad izquierda inferior derecha</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Comparte el espacio horizontal con Card E.</p>
          </CardContent>
        </Card>

        <Card class="bg-card hover:shadow-lg transition-all">
          <CardHeader>
            <CardTitle>Card E</CardTitle>
            <CardDescription>Mitad derecha inferior derecha</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Comparte el espacio horizontal con Card D.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import {Card,CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"; 
import { Button } from "@/components/ui/button";
import { Avatar } from '@/components/ui/avatar'
import { Badge } from "@/components/ui/badge"; 
import { Mail as MailIcon, User as UserIcon } from "lucide-vue-next"; 

const profileImage = 'profileImage.jpg';

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
</style>