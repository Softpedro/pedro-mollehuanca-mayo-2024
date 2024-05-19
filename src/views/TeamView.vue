<template>
  <div class="container-custom">
    <h1 class="text-3xl font-bold mb-4">Tu Equipo Pokémon</h1>
    <p class="text-lg mb-6" v-if="team.length > 0">
      Estos son los Pokémon que has seleccionado para la batalla. ¡Buena suerte, Maestro Pokémon!
    </p>
    <div v-if="team.length === 0" class="text-center flex flex-col items-center justify-center min-h-[70vh]">
      <IconEmpty class="w-12 h-12 text-blue-500" />
      Aún no has seleccionado ningún Pokémon.
      <router-link
        to="/"
        class="mt-2 px-4 py-2 text-white rounded-lg bg-blue-500"
      >
        Escoger Equipo
      </router-link>
    </div>
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      <div
        v-for="pokemon in team"
        :key="pokemon.id"
        class="bg-white rounded-lg shadow-md p-4 flex flex-col items-center cursor-pointer relative"
        @click="viewDetail(pokemon.id)"
      >
        <img
          v-if="pokemon.sprites && pokemon.sprites.front_default"
          :src="pokemon.sprites.front_default"
          :alt="pokemon.name"
          class="w-24 h-24 mb-2"
        />
        <p v-else class="text-center flex flex-col items-center justify-center min-h-[70vh]">
          <IconLoading class="w-12 h-12 text-blue-500 animate-spin" />
          Cargando...
        </p>
        <p class="text-lg font-semibold">{{ pokemon.name }}</p>
        <p><strong>Tipos:</strong></p>
        <ul>
          <li v-for="type in pokemon.types" :key="type.type.name">{{ type.type.name }}</li>

        </ul>
        <button
          @click.stop="removePokemon(pokemon.id)"
          class="mt-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
        >
          Eliminar
        </button>
        <BarChart v-if="pokemon.stats" :stats="pokemon.stats" />
        <button
          @click.stop="playSound(getPokemonSoundUrl(pokemon.id))"
          class="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center absolute top-4 right-4"
        >
          <IconSound class="w-5 h-5" />
        </button>
      </div>
    </div>
    <audio ref="audioElement" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import { useTeamStore } from '../stores/team'
import { useRouter } from 'vue-router'
import BarChart from '../components/BarChart.vue'
import type { PokemonDetail } from '../interfaces'
import IconEmpty from '../components/icons/IconEmpty.vue'
import IconLoading from '../components/icons/IconLoading.vue'
import IconSound from '../components/icons/IconSound.vue'
import { usePlaySound } from '../composables/usePlaySound'

export default defineComponent({
  name: 'TeamView',
  components: {
    BarChart,
    IconEmpty,
    IconLoading,
    IconSound
  },
  setup() {
    const teamStore = useTeamStore()
    const router = useRouter()
    const team = ref<PokemonDetail[]>(teamStore.team as PokemonDetail[])
    const { setAudioElement, playSound } = usePlaySound()
    const audioElement = ref<HTMLAudioElement | null>(null)

    onMounted(() => {
      if (audioElement.value) {
        setAudioElement(audioElement.value)
      }
    })

    const removePokemon = (pokemonId: number) => {
      teamStore.removePokemon(pokemonId)
      team.value = teamStore.team as PokemonDetail[]
    }

    const viewDetail = (pokemonId: number) => {
      router.push(`/team/${pokemonId}`)
    }

    const getPokemonSoundUrl = (pokemonId: number) => {
      return `https://pokemoncries.com/cries/${pokemonId}.mp3`
    }

    return {
      team,
      removePokemon,
      viewDetail,
      playSound,
      audioElement,
      getPokemonSoundUrl
    }
  }
})
</script>
