<template>
  <div
    v-if="pokemon.sprites && pokemon.sprites.front_default"
    class="bg-white rounded-lg shadow-md p-4 flex flex-col items-center cursor-pointer"
    @click="viewDetail(pokemon.id)"
  >
    <img :src="pokemon.sprites.front_default" alt="pokemon.name" class="w-24 h-24 mb-2" />
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
    <BarChart :stats="pokemon.stats" />
    <audio :src="`https://pokemoncries.com/cries/${pokemon.id}.mp3`" controls class="mt-2"></audio>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { useRouter } from 'vue-router'
import BarChart from './BarChart.vue'
import { PokemonDetail } from '../interfaces'

export default defineComponent({
  name: 'PokemonCard',
  components: {
    BarChart
  },
  props: {
    pokemon: {
      type: Object as PropType<PokemonDetail>,
      required: true
    },
    removePokemon: {
      type: Function as PropType<(pokemonId: number) => void>,
      required: true
    }
  },
  setup(props) {
    const router = useRouter()

    const viewDetail = (pokemonId: number) => {
      router.push(`/team/${pokemonId}`)
    }

    return {
      viewDetail
    }
  }
})
</script>
