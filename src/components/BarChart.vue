<template>
  <div class="w-full">
    <Bar :data="chartData" />
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Title } from 'chart.js'

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Title)

export default defineComponent({
  name: 'BarChart',
  components: {
    Bar
  },
  props: {
    stats: {
      type: Array as PropType<Array<{ base_stat: number; stat: { name: string } }>>,
      required: true
    }
  },
  computed: {
    chartData() {
      return {
        labels: this.stats.map((stat) => stat.stat.name),
        datasets: [
          {
            label: 'Stats',
            data: this.stats.map((stat) => stat.base_stat),
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          }
        ]
      }
    }
  }
})
</script>
