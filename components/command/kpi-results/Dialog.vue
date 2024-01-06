<template>
  <div class="bg-[#E1E4E4] rounded-lg h-[8px] w-full mb-4">
    <div class="bg-[#057CD1] w-[30%] h-[8px] rounded-lg"></div>
  </div>
  <div class="rounded-lg border px-4 py-2 mb-3">
    <div class="fs-12 font-[600]">Процент от суммы продаж</div>
    <div class="fs-12 font-[600]">Вознаграждение: 0 % от суммы продаж</div>
  </div>
  <div class="rounded-lg bg-white border-grey px-[2px]">
    <div class="text-[18px] font-[600] p-2">Этапы выполнения задачи</div>
   <div class=" w-full overflow-auto">
    <data-table :headers="headers"
                       @sort="sortData"
                       :sorted="sortedData">
      <template #body>
        <c-tr v-for="data in loadedData" :key="data">
          <c-td class="td" v-for="key in headers" :key="key" >
            <div class="mt-[-10px] mb-[-10px]" v-if="key.key === 'active'">
              <button class="h-[33px]  w-[80px] fs-12 bg-[#E3FCF0] rounded-[41px]">Активный</button>
            </div>
            <div v-if="key.checked === true && key.key === 'indicator'" class="py-2">
              <div class="h-[20px] w-[20px] bg-red rounded-[50%]"></div>
            </div>
            <div v-if="key.checked === true && key.key !== 'indicator'" class="py-2">
              {{ data[key.key] }}
            </div>

          </c-td>
        </c-tr>
      </template>
    </data-table>
   </div>
  </div>
</template>

<script setup>
import {ref} from "vue";

let headers = ref([
  {
    name: "Индикатор",
    checked:true,
    key: "indicator",
    thWidth:'80px',
    bLeft:'8px'
  },
  {
    name: "Этапы выполнения задачи",
    checked:true,
    key: "steps",
    thWidth:'200px'
  },
  {
    name: "Процент выполнение",
    checked:true,
    key: "percent",
    thWidth:'170px'
  },
  {
    name: "Бонус",
    checked:true,
    key: "discount",
    thWidth:'70px'
  },
]);
const loadedData = ref([
  {
    indicator: "",
    steps: "Минимальный порог",
    percent: "От 0% - До",
    discount:"100% ",
  },
  {
    indicator: "",
    steps: "Минимальный порог",
    percent: "От 0% - До",
    discount:"100% ",
  },
  {
    indicator: "",
    steps: "Минимальный порог",
    percent: "От 0% - До",
    discount:"100% ",
  },
  {
    indicator: "",
    steps: "Минимальный порог",
    percent: "От 0% - До",
    discount:"100% ",
  },
  {
    indicator: "",
    steps: "Минимальный порог",
    percent: "От 0% - До",
    discount:"100% ",
  },
  {
    indicator: "",
    steps: "Минимальный порог",
    percent: "От 0% - До",
    discount:"100% ",
  },
  {
    indicator: "",
    steps: "Минимальный порог",
    percent: "От 0% - До",
    discount:"100% ",
  },
])
let sortedData = ref({key: '', mode: ''});

// Methods
function searchUpdated(text) {
  console.log(text)
}

function sortData(data) {
  sortedData.value = data
}

function setPage(index){
  currentPage.value = index
}

function setPageSize(size){
  pageSize.value = size
}

</script>

<style scoped>

</style>
