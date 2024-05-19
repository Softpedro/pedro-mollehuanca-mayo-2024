import { ref } from 'vue'

export function usePlaySound() {
  const audioRef = ref<HTMLAudioElement | null>(null)

  const setAudioElement = (audioElement: HTMLAudioElement) => {
    audioRef.value = audioElement
  }

  const playSound = (src: string) => {
    if (audioRef.value) {
      audioRef.value.src = src
      audioRef.value.play().catch(error => {
        console.error('Error playing sound:', error)
      })
    } else {
      console.warn('Audio element is not set')
    }
  }

  return {
    setAudioElement,
    playSound
  }
}
