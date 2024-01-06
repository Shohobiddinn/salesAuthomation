<template>
  <div class="flex overflow-auto">
    <div class="w-full -mt-6">
      <div  class="h-80">
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
const props = defineProps({
  categories:Array,
  amount:Array,
  name:Array,
  color:Array
})
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
      // text: "Общая сумма заявок на 15 ноя.",
    },
  },
})

const data = computed(() => {
  if(props.amount?.length > 0){
    return {
      labels: props.name,
      datasets: [
        {
          label: "Жами туловs",
          backgroundColor: props.color,
          data: props.amount,
        },
      ],
    }
  } else return {
    labels: ["СВР Алижон", "СВР Алижон", "СВР Алижон"],
    datasets: [
      {
        label: "Жами тулов",
        backgroundColor: props.color,
        data: [0],
      },
    ],
  }
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
