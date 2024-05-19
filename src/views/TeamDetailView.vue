<template>
  <div class="container-custom">
    <div v-if="pokemonDetails" class="bg-white rounded-lg shadow-md p-4 relative">
      <h1 class="text-3xl font-bold mb-4">{{ pokemonDetails.name }}</h1>
      <div class="flex flex-col md:flex-row items-center">
        <img
          :src="pokemonDetails.sprites.front_default"
          :alt="pokemonDetails.name"
          class="w-48 h-48 mb-4 md:mb-0 md:mr-4"
        />
        <div>
          <p>
            <strong>Tipos:</strong>
            <span v-for="type in pokemonDetails.types" :key="type.type.name">
              {{ type.type.name }}
            </span>

          </p>
          <p><strong>Altura:</strong> {{ pokemonDetails.height / 10 }} m</p>
          <p><strong>Peso:</strong> {{ pokemonDetails.weight / 10 }} kg</p>
          <p><strong>Descripción:</strong> {{ description }}</p>
        </div>
      </div>
      <div class="mt-6">
        <h2 class="text-2xl font-bold mb-4">Estadísticas</h2>
        <BarChart :stats="pokemonDetails.stats" />
      </div>
      <div class="mt-6">
        <h2 class="text-2xl font-bold mb-4">Cadena Evolutiva</h2>
        <div v-if="evolutionChain.length" class="flex space-x-4">
          <div
            v-for="evolution in evolutionChain"
            :key="evolution.species.name"
            class="text-center"
          >
            <img :src="evolution.image" alt="Evolution Image" class="w-24 h-24" />
            <p>{{ evolution.species.name }}</p>
          </div>
        </div>
      </div>
      <button
        @click.stop="playSound(pokemonCry)"
        class="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center absolute top-5 right-5"
      >
        <IconSound class="w-8 h-8 mr-2" />
      </button>
      <audio ref="audioElement" />
    </div>
    <div v-else class="text-center">Cargando...</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { getPokemonDetails, getPokemonSpecies, getEvolutionChain } from '../services/pokeapi'
import BarChart from '../components/BarChart.vue'
import type { PokemonDetail, PokemonSpecies, EvolutionChain, EvolutionNode, NamedAPIResource } from '../interfaces'
import IconSound from '../components/icons/IconSound.vue'
import { usePlaySound } from '../composables/usePlaySound'

export default defineComponent({
  name: 'TeamDetailView',
  components: {
    BarChart,
    IconSound
  },
  setup() {
    const route = useRoute()
    const pokemonId = parseInt(route.params.id as string)
    const pokemonDetails = ref<PokemonDetail | null>(null)
    const description = ref<string>('')
    const evolutionChain = ref<{ species: NamedAPIResource; image: string }[]>([])
    const pokemonCry = ref<string>('')
    const { setAudioElement, playSound } = usePlaySound()
    const audioElement = ref<HTMLAudioElement | null>(null)

    const fetchPokemonDetails = async () => {
      const details: PokemonDetail = await getPokemonDetails(pokemonId)
      pokemonDetails.value = details

      const species: PokemonSpecies = await getPokemonSpecies(pokemonId)
      const entry = species.flavor_text_entries.find(
        entry => entry.language.name === 'en'
      )
      description.value = entry ? entry.flavor_text : 'No description available.'

      const evolution: EvolutionChain = await getEvolutionChain(species.evolution_chain.url)
      evolutionChain.value = extractEvolutionChain(evolution.chain)

      pokemonCry.value = `https://pokemoncries.com/cries/${pokemonId}.mp3`
    }

    const extractEvolutionChain = (chain: EvolutionNode) => {
      const evolutions: { species: NamedAPIResource; image: string }[] = []

      const traverseChain = (node: EvolutionNode) => {
        const id = node.species.url.split('/').filter(Boolean).pop()
        evolutions.push({
          species: node.species,
          image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
        })
        if (node.evolves_to.length) {
          node.evolves_to.forEach(evolution => traverseChain(evolution))
        }
      }

      traverseChain(chain)
      return evolutions
    }

    onMounted(async () => {
      await fetchPokemonDetails()
      if (audioElement.value) {
        setAudioElement(audioElement.value)
      }
    })

    return {
      pokemonId,
      pokemonDetails,
      description,
      evolutionChain,
      pokemonCry,
      playSound,
      audioElement
    }
  },
  filters: {
    capitalize(value: string) {
      if (!value) return ''
      value = value.toString()
      return value.charAt(0).toUpperCase() + value.slice(1)
    }
  }
})
</script>

<style scoped>
.container-custom {
  padding: 20px;
}
</style>
