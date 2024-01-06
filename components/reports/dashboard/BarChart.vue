<template>
  <div class="flex overflow-auto rounded-lg border bg-white">
    <div class="w-full p-1">
      <div class="h-[350px]">
        <Bar :data="data" :options="options" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
} from "chart.js"
import { Bar } from "vue-chartjs"

const options = ref({
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: {
      display: false,
    },
    y: {
      display: false,
    },
  },
  plugins: {
    legend: {
      position: "top",
      align: "end",
      labels: {
        boxWidth: 24,
        boxHeight: 24,
        usePointStyle: true,
      },
      title: {
        color: "#fff",
      },
    },
    // title: {
    //   display: true,
    //   text: "Ноллаш бўйича умумий маълумот",
    // },
  },
})
const data = ref({
  labels: [
    "СВР Алижон",
    "СВР Алижон",
    "СВР Алижон",
    "СВР Алижон",
    "СВР Алижон",
    "СВР Алижон",
    "СВР Алижон",
    "СВР Алижон",
  ],
  datasets: [
    {
      label: "Жами тулов",
      backgroundColor: "#057CD1",
      borderRadius: 50,
      data: [
        1000000, 480000, 500000, 500000, 873000, 310000, 500000, 870000, 400000,
        1000000,
      ],
    },
    {
      label: "Умумий оборот",
      backgroundColor: "#23C00A",
      borderRadius: 50,
      data: [
        1000000, 480000, 490000, 310000, 280000, 150000, 320000, 515000, 310000,
        1000, 200000,
      ],
    },
    {
      label: "Кучадаги колдик",
      backgroundColor: "#BD7F06",
      borderRadius: 50,
      data: [0, 0, 0, 0, 0, 0, 0, 310000, 1000, 200000],
    },
  ],
})
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement
)
</script>
