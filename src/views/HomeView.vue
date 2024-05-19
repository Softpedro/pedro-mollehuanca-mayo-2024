<template>
  <div class="container-custom !pb-[120px]">
    <h1 class="text-3xl font-bold mb-4">Bienvenido, Maestro Pokémon</h1>
    <p class="text-lg mb-6">Escoge 6 de tus mejores Pokémon para la batalla.</p>
    <div v-if="loading" class="text-center flex flex-col items-center justify-center min-h-[70vh]">
      <IconLoading class="w-12 h-12 text-blue-500 animate-spin" />
      Cargando...
    </div>
    <div v-else>
      <PokemonList
        :pokemons="pokemons"
        :selectedPokemons="selectedPokemons"
        :togglePokemonSelection="togglePokemonSelection"
      />
      <LoadMoreButton :loadMore="loadMore" />
    </div>
    <div
      v-if="selectedPokemons.length > 0"
      class="fixed bottom-4 right-4 p-4 rounded-lg shadow-lg bg-white bg-opacity-90 backdrop-blur-lg"
    >
      <p class="w-full text-center">{{ selectedPokemons.length }}/6</p>
      <button
        @click="viewTeam"
        :disabled="selectedPokemons.length !== 6"
        :class="{
          'bg-blue-500': selectedPokemons.length === 6,
          'bg-gray-500': selectedPokemons.length !== 6
        }"
        class="mt-2 px-4 py-2 text-white rounded-lg"
      >
        Ver Equipo
      </button>
    </div>
    <Modal v-if="showModal" :show="showModal" :message="modalMessage" @close="closeModal" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import { useTeamStore } from '../stores/team'
import { getPokemonList, getPokemonDetails } from '../services/pokeapi'
import { useRouter } from 'vue-router'
import PokemonList from '../components/PokemonList.vue'
import LoadMoreButton from '../components/LoadMoreButton.vue'
import Modal from '../components/ModalPokemon.vue'
import IconLoading from '../components/icons/IconLoading.vue'
import type { Pokemon, PokemonDetail, NamedAPIResourceList } from '../interfaces'

export default defineComponent({
  name: 'Home',
  components: {
    PokemonList,
    LoadMoreButton,
    Modal,
    IconLoading
  },
  setup() {
    const teamStore = useTeamStore()
    const router = useRouter()
    const pokemons = ref<Pokemon[]>([])
    const selectedPokemons = ref<PokemonDetail[]>([])
    const loading = ref(true)
    const limit = ref(25)
    const offset = ref(0)
    const showModal = ref(false)
    const modalMessage = ref('')

    const fetchPokemons = async () => {
      loading.value = true
      const data: NamedAPIResourceList = await getPokemonList(limit.value, offset.value)
      pokemons.value.push(
        ...data.results.map((pokemon, index) => ({
          id: offset.value + index + 1,
          name: pokemon.name,
          url: pokemon.url
        }))
      )
      loading.value = false
    }

    const togglePokemonSelection = async (pokemon: Pokemon) => {
      const index = selectedPokemons.value.findIndex((p) => p.name === pokemon.name)
      if (index === -1 && selectedPokemons.value.length < 6) {
        const detailedPokemon = await getPokemonDetails(pokemon.id)
        selectedPokemons.value.push(detailedPokemon)
        modalMessage.value = `${pokemon.name} ¡yo te elijo!`
        showModal.value = true
        setTimeout(() => {
          showModal.value = false
        }, 800)
      } else {
        selectedPokemons.value.splice(index, 1)
      }
    }

    const loadMore = async () => {
      offset.value += limit.value
      await fetchPokemons()
      window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' })
    }

    const viewTeam = () => {
      teamStore.setTeam(selectedPokemons.value)
      router.push('/team')
    }

    const closeModal = () => {
      showModal.value = false
    }

    onMounted(fetchPokemons)

    return {
      pokemons,
      loading,
      selectedPokemons,
      togglePokemonSelection,
      loadMore,
      viewTeam,
      showModal,
      modalMessage,
      closeModal
    }
  }
})
</script>
