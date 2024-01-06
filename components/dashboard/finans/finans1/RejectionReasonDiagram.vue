<template>
  <div class="overflow-auto bg-white">
    <div class="flex gap-4 ml-4">
      <button class="rounded-lg border w-6 h-6 p-1.5 bg-white hover:bg-gray-200">
        <ArrowBottom/>
      </button>
      <div class="-mt-2 text-6 fw-5">Доля по ассортименту</div>
    </div>
    <div class="w-full p-3">
      <div class="h-[350px]">
        <DashboardSalesBarChart/>
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
import ArrowBottom from "~/components/icon/ArrowBottom.vue";

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
