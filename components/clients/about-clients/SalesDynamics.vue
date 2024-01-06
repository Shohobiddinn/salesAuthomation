<template>
  <div class="flex h-[400px]">
    <div class="rounded-lg border p-3 w-full">
      <div class="text-[24px] fw-5">Продажи</div>
      <div class="h-[350px]">
        <Line :data="filteredDataLine" :options="options" />
      </div>
    </div>
  </div>
  <div class="flex h-[400px] mt-4">
    <div class="rounded-lg border p-3 w-full">
      <div class="text-[24px] fw-5">Продажи</div>
      <div class="h-[350px]">
        <Bar :data="filteredDataBar" :options="options" />
      </div>
    </div>
  </div>
  <div class="text-[24px] fs-6 mt-3">Таблица</div>
  <div
    v-click-outside="clickOutside"
    class="rounded-lg bg-white border-grey mt-3 px-[2px]"
  >
    <div class="w-full overflow-auto">
      <data-table
        :headers="headers"
        :withInformationAboveHeader="true"
        :isEmpty="!clientSalesDynamicsStore?.dynamicsByCategory?.items?.length"
      >
        <template #body>
          <c-tr
            v-for="data in clientSalesDynamicsStore?.dynamicsByCategory?.items"
            :key="data"
          >
            <c-td-no-edit v-for="key in headers" :key="key">
              <div class="py-2">
                <div v-if="key.key === 'Month'">
                  {{ data[key.key]?.Name }} {{ data?.Year }}
                </div>
                <div v-else>
                  {{ data[key.key] }}
                </div>
              </div>
            </c-td-no-edit>
          </c-tr>
        </template>
      </data-table>
    </div>
  </div>
</template>

<script setup>
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
import moment from "moment";
import { Line, Bar } from "vue-chartjs";

// store
const clientSalesDynamicsStore = useClientSalesDynamicsStore("main");

// props
const props = defineProps({
  isActive: Boolean,
});

// chart-js states
const options = ref({
  responsive: true,
  maintainAspectRatio: false,
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

// state
const route = useRoute();

// methods
watchEffect(() => {
  if (props.isActive) {
    clientSalesDynamicsStore.params.clientId = route.params.id;
  }
});

const filteredDataLine = computed(() => {
  const dataLine = {
    labels: [],
    datasets: [
      {
        label: "",
        backgroundColor: "#299B9B",
        data: [],
      },
    ],
  };
  if (clientSalesDynamicsStore.dynamicsByDay) {
    const startDate = moment(clientSalesDynamicsStore.params.DateRange.From);
    const endDate = moment(clientSalesDynamicsStore.params.DateRange.To);
    dataLine.datasets[0].label =
      "Динамика продаж за последние " +
      endDate.diff(startDate, "days") +
      " дней";

    for (const dayDynamic of clientSalesDynamicsStore.dynamicsByDay) {
      dataLine.labels.push(moment(dayDynamic?.date).format("DD MMM"));
      dataLine.datasets[0].data.push(dayDynamic?.total_sold);
    }
  }

  return dataLine;
});

const filteredDataBar = computed(() => {
  const dataBar = {
    labels: [],
    datasets: [
      {
        label: "Динамика продаж по месяцам",
        backgroundColor: "#f87979",
        data: [],
      },
    ],
  };

  if (clientSalesDynamicsStore.dynamicsByMonth) {
    for (const monthDynamic of clientSalesDynamicsStore.dynamicsByMonth) {
      dataBar.labels.push(moment(monthDynamic?.date).format("MMMM"));
      dataBar.datasets[0].data.push(monthDynamic?.total_sold);
    }
  }

  return dataBar;
});

const headers = computed(() => {
  if (clientSalesDynamicsStore.dynamicsByCategory?.items[0]?.length) {
    return Object.keys(
      clientSalesDynamicsStore.dynamicsByCategory?.items[0]
    )?.map((item) => {
      if (item === "Year") {
        return {};
      }
      if (item === "TotalSold") {
        return {
          name: "Общее продажа",
          key: item,
          checked: true,
          type: "come",
        };
      } else if (item === "Month") {
        return { name: "Месяц", key: item, checked: true, type: "come" };
      } else {
        return { name: item, key: item, checked: true, type: "come" };
      }
    });
  }
});
</script>
