<template>
  <div>
    <div class="flex gap-4">
      <button class="rounded-lg border w-6 h-6 p-1.5 bg-white hover:bg-gray-200">
        <ArrowBottom/>
      </button>
      <div class="text-6 fw-5 -mt-2">Доля По каналам продаж</div>
    </div>
    <div class="mt-4">
      <Pie :data="data" :options="options" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { PolarArea } from 'vue-chartjs'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'vue-chartjs'
ChartJS.register(ArcElement, Tooltip, Legend)
import ArrowBottom from "~/components/icon/ArrowBottom.vue";

const data = ref({
  labels: ['80% Розница', '20% Оптом'],
  datasets: [
    {
      backgroundColor: ['#299B9B', '#374957'],
      data: [80, 10]
    }
  ]
})
const options = ref({
  responsive: true,
  maintainAspectRatio: false
})

</script>

<style scoped>

</style>
