<template>
    <div class="flex overflow-auto rounded-lg border bg-white">
      <div class="w-full p-1">
        <div class="h-[470px]">
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
  } from "chart.js";
  import { Bar } from "vue-chartjs";
  
  const options = ref({
    responsive: true,
    maintainAspectRatio: false,
    scales: {},
  });
  const data = ref({
    labels: [
      "ТЦ Николай",
      "ТЦ Николай",
      "ТЦ Николай",
      "ТЦ Николай",
      "ТЦ Николай",
      "ТЦ Николай",
      "ТЦ Николай",
      "ТЦ Николай",
    ],
    datasets: [
      {
        backgroundColor: "#057CD1",
        borderRadius: 50,
        data: [
          1000000, 480000, 500000, 500000, 873000, 310000, 500000, 870000, 400000,
          1000000,
        ],
      },
      {
        backgroundColor: "#23C00A",
        borderRadius: 50,
        data: [
          1000000, 480000, 490000, 310000, 280000, 150000, 320000, 515000, 310000,
          1000, 200000,
        ],
      },
    ],
  });
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    BarElement
  );
  </script>
  