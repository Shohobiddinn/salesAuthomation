<template>
  <div>
    <div class="flex gap-4">
      <button class="rounded-lg border w-6 h-6 p-1.5 bg-white hover:bg-gray-200">
        <ArrowBottom/>
      </button>
      <div class="-mt-2 text-6 fw-5">Динамика продаж</div>
    </div>
    <div class="h-78 mt-6">
      <Line :data="data" :options="options" />
    </div>
  </div>
</template>

<script setup lang="ts">

import ArrowBottom from "~/components/icon/ArrowBottom.vue";
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
      label: "Заказы",
      backgroundColor: "#055641",
      data: [
        100000, 480000, 490000, 310000, 280000, 150000, 320000, 515000, 310000,
        1000, 200000, 495000, 500000, 500000, 873000, 310000, 500000, 870000,
        400000, 1000000,
      ],
    },
    {
      label: "Отказы",
      backgroundColor: "#BB0A0A",
      data: [
        160000, 420000, 450000, 380000, 280000, 150000, 320000, 575000, 310000,
        1000, 230000, 435000, 550000, 550000, 853000, 350000, 550000, 870000,
        470000, 1900000,
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

<style scoped>

</style>
