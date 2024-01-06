<template>
  <div class="flex overflow-auto rounded-lg border bg-white">
    <div class="w-full p-3">
      <div class="h-[350px]">
        <Line :data="data" :options="options" />
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
import { Line, Bar } from "vue-chartjs";

const options = ref({
  responsive: true,
  maintainAspectRatio: false,
});
const data = ref({
  labels: [
    10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
  ],
  datasets: [
    {
      label: "Data One",
      backgroundColor: "#055641",
      data: [
        100000, 480000, 490000, 310000, 280000, 150000, 320000, 515000, 310000,
        1000, 200000, 495000, 500000, 500000, 873000, 310000, 500000, 870000,
        400000, 1000000,
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
