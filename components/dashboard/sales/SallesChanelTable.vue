<template>
  <div class="flex gap-4">
    <button class="rounded-lg border w-6 h-6 p-1.5 bg-white hover:bg-gray-200">
      <ArrowBottom/>
    </button>
    <div class="-mt-3.5"><page-title :title="'По каналам продаж'"/></div>
  </div>
  <div class="flex mb-4 flex-row gap-4  items-center mt-6">
    <div>
      <i-btn>
        <IconColsSVG/>
      </i-btn>
    </div>
    <SettingsRlpDiscountsTableCheckbox :headers="headers"></SettingsRlpDiscountsTableCheckbox>
    <div>
      <search-input :value="searchText"
                    @updated="searchUpdated"
                    class="w-full h-38px"/>
    </div>
    <div>
      <excel-btn :size="'340kb'"></excel-btn>
    </div>
  </div>
  <div class="rounded-lg bg-white border-grey px-[2px]">
    <div class="w-full h-75 overflow-auto">
      <data-table :headers="headers"
                  @sort="sortData"
                  :sorted="sortedData">
        <template #body>
          <c-tr v-for="(data, index) in loadedData" :key="data">
            <c-td v-for="key in headers" :key="key" >
              <div class="p-2" v-if="key.checked">
                {{ data[key.key] }}
              </div>
            </c-td>
          </c-tr>
        </template>
      </data-table>
    </div>
    <div class="flex justify-between w-full">
      <div class="flex p-3 gap-2 items-center">
        <span class="secondary-gray-text fs-14">
          Показать по
        </span>
        <page-size-btn :current-size="pageSize" @setPageSize="setPageSize"/>
      </div>
      <div class="p-3">
        <page-index :available-pages="availablePages"
                    :current-page="currentPage"
                    @setPage="setPage"/>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// State
import ArrowBottom from "~/components/icon/ArrowBottom.vue";

const searchText = ref("")
const availablePages = ref(28)
let bordered = ref('1px solid black')
let currentPage = ref(1)
let pageSize = ref(10)

let headers = ref([
  {
    name: "№",
    checked:true,
    key: "no",
    thWidth:'80px'
  },
  {
    name: "Агент",
    checked:true,
    key: "agents",
    thWidth:'140px'
  },
  {
    name: "Сумма",
    checked:true,
    key: "amount",
    thWidth:'140px'
  },
  {
    name: "Обьем",
    checked:true,
    key: "volume",
    thWidth:'300px'
  },
  {
    name: "АКБ",
    checked:true,
    key: "akb",
    thWidth:'140px'
  }
]);
const loadedData = ref([
  {
    no: "1",
    agents:"Саша",
    amount:"123456",
    volume:"123456",
    akb:"123456"
  },
  {
    no: "1",
    agents:"Саша",
    amount:"123456",
    volume:"123456",
    akb:"123456"
  },
  {
    no: "1",
    agents:"Саша",
    amount:"123456",
    volume:"123456",
    akb:"123456"
  },
  {
    no: "1",
    agents:"Саша",
    amount:"123456",
    volume:"123456",
    akb:"123456"
  },
  {
    no: "1",
    agents:"Саша",
    amount:"123456",
    volume:"123456",
    akb:"123456"
  },
  {
    no: "1",
    agents:"Саша",
    amount:"123456",
    volume:"123456",
    akb:"123456"
  },
  {
    no: "1",
    agents:"Саша",
    amount:"123456",
    volume:"123456",
    akb:"123456"
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


