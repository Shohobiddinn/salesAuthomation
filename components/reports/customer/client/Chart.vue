<template>
  <div class="flex overflow-auto rounded-lg border bg-white">
    <div class="w-full p-3 text-center gap-4 flex flex-col">
      <p-title>Доля По каналам продаж</p-title>
      <div class="h-[350px]">
        <Pie :data="data" :options="options" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  Chart as ChartJS,
  CategoryScale,
  ArcElement,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
} from "chart.js"
import { Line, Bar, Doughnut, Pie } from "vue-chartjs"

const options = ref({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "bottom",
      labels: {
        boxWidth: 20,
        boxHeight: 20,
        borderRadius: 30,
        pointStyleWidth: 30,
      },
    },
  },
})
const data = ref({
  labels: ["СВР Алижон", "СВР Алижон"],
  datasets: [
    {
      label: "Жами тулов",
      backgroundColor: ["#374957", "#299B9B"],
      data: [100000, 984760],
    },
  ],
})
ChartJS.register(
  CategoryScale,
  LinearScale,
  ArcElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement
)
</script>
