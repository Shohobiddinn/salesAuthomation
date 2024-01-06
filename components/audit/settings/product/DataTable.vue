<template>
  <div>
    <div class="rounded-lg bg-white border-grey px-[2px] mt-2">
      <div class="flex justify-between">
        <div class="flex mb-4 ml-4 flex-row gap-4 mt-4 items-center">
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
      </div>
      <div class="overflow-auto table-containers">
        <data-table :headers="headers"
                    @sort="sortData"
                    :sorted="sortedData">
          <template #body>
            <template v-for="(data, index) in loadedData" :key="index">
              <c-tr class=" b-bottom cursor-pointer">
                <c-td-no-edit v-for="key in headers" :key="key" >
                  <div class="py-2 underline pb-2" v-if="key.key === 'data'">
                    {{ data[key.key] }}
                  </div>
                  <div class="py-2" v-if="key.key !== 'data'">
                    {{ data[key.key] }}
                  </div>
                </c-td-no-edit>
                <c-td> 
                <div class="p-2 mr-2 cursor-pointer" @click="updateValue()">
                  <IconEdit></IconEdit>
                </div>
              </c-td>
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
  </div>
</template>

<script setup lang="ts">
// State
import {ref} from "vue";
const searchText = ref("")
const availablePages = ref(28)
let currentPage = ref(1)
let pageSize = ref(10)
//types
interface IEmitTypes {
  (e: "updateModalValue", data?: string): void;
}

//emits
const emits = defineEmits<IEmitTypes>();

//methods
const updateValue = () => {
  emits("updateModalValue");
};

let headers = ref([
  {
    name: "Название",
    checked:true,
    key: "svr",
    type:"svr",
    thWidth:'80px',
    bRadius:'8px'
  },
  {
    name: "Категория",
    checked:true,
    key: "amount",
    type:"amount",
    thWidth:'100px'
  },
  {
    name: "Бренд",
    checked:true,
    key: "order",
    type:"order",
    thWidth:'100px'
  },
  {
    name: "Объём",
    checked:true,
    key: "canceled",
    type:"canceled",
    thWidth:'120px'
  },{
    name: "Дата создания",
    checked:true,
    key: "allVisit",
    type:"allVisit",
    thWidth:'140px'
  },
]);
const loadedData = ref([
  {
    svr:"Coca cola",
    amount:"Coca cola",
    order:"Coca cola",
    canceled:"123456",
    allVisit:"2021-10-07 11:24:27",
  },
  {
    svr:"Coca cola",
    amount:"Coca cola",
    order:"Coca cola",
    canceled:"123456",
    allVisit:"2021-10-07 11:24:27",
  },
  {
    svr:"Coca cola",
    amount:"Coca cola",
    order:"150",
    canceled:"123456",
    allVisit:"2021-10-07 11:24:27",
  },
  {
    svr:"Саша",
    amount:"Coca cola",
    order:"Coca cola",
    canceled:"123456",
    allVisit:"2021-10-07 11:24:27",
  },
  {
    svr:"Саша",
    amount:"Coca cola",
    order:"Coca cola",
    canceled:"123456",
    allVisit:"2021-10-07 11:24:27",
  }
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

