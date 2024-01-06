<template>
  <div class="flex overflow-auto rounded-lg border bg-white">
    <div class="w-full p-3">
      <div class="h-[350px]">
        <Doughnut :data="data" :options="options" />
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
import { Line, Bar, Doughnut } from "vue-chartjs"

const options = ref({
  responsive: true,
  maintainAspectRatio: false,
  cutout: 95,
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
    title: {
      display: true,
      text: "Умумий оборотга филиалларни хиссаси",
    },
  },
})
const data = ref({
  labels: ["СВР Алижон", "СВР Алижон", "СВР Алижон"],
  datasets: [
    {
      label: "Жами тулов",
      backgroundColor: ["#057CD1", "#D48C1E", "#BB72F4"],
      data: [100000, 213123, 984760],
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
