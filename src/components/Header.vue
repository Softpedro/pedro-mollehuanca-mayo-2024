<template>
  <nav class="bg-gray-800 p-4">
    <div class="container mx-auto flex justify-between items-center">
      <router-link to="/" class="text-white text-lg font-semibold">PokePedroApp</router-link>
      <div class="space-x-4 flex">
        <router-link to="/" class="text-white hover:text-gray-400 flex items-center">
          <IconHome class="w-6 h-6 text-white" />
          Inicio
        </router-link>
        <router-link to="/team" class="text-white hover:text-gray-400">Mi Equipo</router-link>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import IconHome from './icons/IconHome.vue'



export default defineComponent({
  name: 'Header',
  components: {
    IconHome, // Add the missing import statement for the IconHome component
  },
})
</script>
