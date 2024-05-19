<template>
  <transition name="slide-up">
    <div v-if="show" class="fixed bottom-0 left-0 right-0 h-[180px] flex items-end justify-center p-4 z-50">
      <div class="bg-gray-800 rounded-lg shadow-lg p-4 w-full sm:max-w-sm">
        <h2 class="text-xl font-bold text-center mb-4 text-white !m-0">{{ message }}</h2>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Modal',
  props: {
    show: {
      type: Boolean,
      required: true
    },
    message: {
      type: String,
      required: true
    }
  },
  emits: ['close'],
  methods: {
    close() {
      this.$emit('close')
    }
  }
})
</script>

<style scoped>
.slide-up-enter-active, .slide-up-leave-active {
  transition: all 0.3s ease;
}
.slide-up-enter, .slide-up-leave-to{
  transform: translateY(100%);
  opacity: 0;
}
</style>
