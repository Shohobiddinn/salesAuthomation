<template>
  <div>
    <div class="flex justify-center"><page-title20 :title="'Активная клиентская база'"/></div>
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
