<template>
  <div class="flex mb-4 flex-row gap-4  items-center">
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
    <div class="w-full h-70 overflow-auto">
      <data-table :headers="headers"
                  @sort="sortData"
                  :sorted="sortedData">
        <template #body>
          <c-tr v-for="(data, index) in details?.items" :key="data">
            <c-td v-for="key in headers" :key="key" >
              <div v-if="key.checked && key.key === 'date'" class="p-2" >
                {{  moment(data[key.key]).format("DD-MMM")}}
              </div>
              <div v-if="key.checked && key.key !== 'date'" class="p-2" >
                {{  data[key.key] }}
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
        <page-size-btn :current-size="filters.pageSize" @setPageSize="setPageSize"/>
      </div>
      <div class="p-3">
        <page-index :available-pages="details?.total_pages"
                    :current-page="details?.page_number"
                    @setPage="setPage"/>
      </div>
    </div>
  </div>
</template>

<script setup>
// State
import moment from "moment";

const searchText = ref("")
const availablePages = ref(28)
let bordered = ref('1px solid black')
let currentPage = ref(1)
let pageSize = ref(10)
const props = defineProps({
  details:Object,
  filters:Object
})

let headers = ref([
  {
    name: "Дата",
    checked:true,
    key: "date",
    thWidth:'80px'
  },
  {
    name: "Клиент",
    checked:true,
    key: "client",
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
  props.filters.page = index
}

function setPageSize(size){
  props.filters.pageSize = size
}

</script>

<style scoped>

</style>


