<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
    <div
      v-for="pokemon in pokemons"
      :key="pokemon.name"
      :class="{ '!bg-gray-200': isSelected(pokemon), '!bg-white': !isSelected(pokemon) }"
      class="bg-white rounded-lg shadow-md p-4 flex flex-col items-center cursor-pointer transition duration-300 transform hover:scale-105 hover:shadow-lg"
      @click="togglePokemonSelection(pokemon)"
    >
      <img :src="getImageUrl(pokemon.url)" alt="pokemon.name" class="w-24 h-24 mb-2" />
      <p class="text-lg font-semibold">{{ pokemon.name }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import type { Pokemon, PokemonDetail } from '../interfaces'

export default defineComponent({
  name: 'PokemonList',
  props: {
    pokemons: {
      type: Array as PropType<Pokemon[]>,
      required: true
    },
    selectedPokemons: {
      type: Array as PropType<PokemonDetail[]>,
      required: true
    },
    togglePokemonSelection: {
      type: Function as PropType<(pokemon: Pokemon) => Promise<void>>,
      required: true
    }
  },
  methods: {
    isSelected(pokemon: Pokemon) {
      return this.selectedPokemons.some((p: PokemonDetail) => p.name === pokemon.name)
    },
    getImageUrl(url: string) {
      const id = url.split('/').filter(Boolean).pop()
      return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
    }
  }
})
</script>
