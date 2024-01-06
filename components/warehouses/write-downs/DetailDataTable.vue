<template>
  <div v-click-outside="clickOutside" class="rounded-lg bg-white border-grey px-[2px]">
    <div class="flex justify-between border-b-1">
      <div class="m-4 w-100 flex gap-5">
        <div class="fs-12 mt-3">Склад</div>
        <multiply-selections class="w-50" :name="'Склад'" :h="true" :filter.sync="filter.isCash" @toggle="toggle => filter.isCash = toggle"/>
      </div>
      <div class="flex items-center gap-5 m-4 w-2/5">
        <DatePicker />
        <m-btn class="w-50">Добавить</m-btn>
      </div>
    </div>

    <div class="flex mb-4 ml-4 flex-row gap-4 mt-4 items-center">
      <div @click="draggable = true">
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
    <div class="overflow-auto table-containers">
      <data-table :headers="headers" @sort="sortData" :sorted="sortedData">
        <template #body>
          <template v-for="(data, index) in loadedData" :key="index">
            <c-tr class="border-b-none b-bottom cursor-pointer">
              <c-td-no-edit v-for="key in headers" :key="key" >
                <div class="py-2" v-if="key.checked">
                  {{ data[key.key] }}
                </div>
              </c-td-no-edit>
            </c-tr>
          </template>
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

<script setup>
// State
import {ref} from "vue";
const searchText = ref("")
const availablePages = ref(28)
let currentPage = ref(1)
let pageSize = ref(10)
const draggable = ref(false)
// Methods
const dataContainerWidth = ref('1140px')
const changeStatus = ref(false)
function draggableDialog(){
  draggable.value = false
}
const filter = ref({
  isCash:false
})
const clickOutside = () => {
  td.isActive = false;
  console.log(td.isActive);
}

let headers = ref([
  {
    name: "№",
    checked:true,
    key: "no",
    type:"no",
    thWidth:'40px',
    bRadius:'8px'
  },
  {
    name: "Категория товара",
    checked:true,
    key: "productCategory",
    type:"productCategory",
    thWidth:'140px'
  },
  {
    name: "Название",
    checked:true,
    key: "name",
    type:"name",
    thWidth:'70px'
  },
  {
    name: "Код товара",
    checked:true,
    key: "productCode",
    type:"productCode",
    thWidth:'100px'
  },
  {
    name: "Общие",
    checked:true,
    key: "common",
    type:"common",
    thWidth:'120px'
  },
  {
    name: "09.11.2022 17:33",
    checked:true,
    key: "day1",
    type:"day1",
    thWidth:'140px'
  },
  {
    name: "09.11.2022 17:33",
    checked:true,
    key: "day2",
    type:"day2",
    thWidth:'140px'
  },
  {
    name: "09.11.2022 17:33",
    checked:true,
    key: "day3",
    type:"day3",
    thWidth:'140px'
  }
]);
const loadedData = ref([
  {
    no:"1",
    productCategory:"Pepsi",
    name:"Pepsi 1.5",
    productCode:"31268",
    common:"100 000 000",
    day1:"100 000 000",
    day2:"100 000 000",
    day3:"100 000 000",
  },
  {
    no:"1",
    productCategory:"Pepsi",
    name:"Pepsi 1.5",
    productCode:"31268",
    common:"100 000 000",
    day1:"100 000 000",
    day2:"100 000 000",
    day3:"100 000 000",
  },
  {
    no:"1",
    productCategory:"Pepsi",
    name:"Pepsi 1.5",
    productCode:"31268",
    common:"100 000 000",
    day1:"100 000 000",
    day2:"100 000 000",
    day3:"100 000 000",
  },
  {
    no:"1",
    productCategory:"Pepsi",
    name:"Pepsi 1.5",
    productCode:"31268",
    common:"100 000 000",
    day1:"100 000 000",
    day2:"100 000 000",
    day3:"100 000 000",
  },
  {
    no:"1",
    productCategory:"Pepsi",
    name:"Pepsi 1.5",
    productCode:"31268",
    common:"100 000 000",
    day1:"100 000 000",
    day2:"100 000 000",
    day3:"100 000 000",
  },
  {
    no:"1",
    productCategory:"Pepsi",
    name:"Pepsi 1.5",
    productCode:"31268",
    common:"100 000 000",
    day1:"100 000 000",
    day2:"100 000 000",
    day3:"100 000 000",
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

/* Style the artificial checkbox */

</style>

