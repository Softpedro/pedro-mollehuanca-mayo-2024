<template>
  <div class="text-center mt-8">
    <button
      @click="loadMore"
      class="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
    >
      Cargar Más Pokémon
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'

export default defineComponent({
  name: 'LoadMoreButton',
  props: {
    loadMore: {
      type: Function as PropType<() => void>,
      required: true
    }
  }
})
</script>
