<template>
  <div class="rounded-lg bg-white border-grey py-3">
    <div class="flex flex-row gap-4 px-4 items-center">
      <div>
        <i-btn>
          <IconColsSVG/>
        </i-btn>
      </div>
      <div>
        <i-btn>
          <IconRowSVG/>
        </i-btn>
      </div>
      <div>
        <search-input :value="searchText"
                      @updated="searchUpdated"
                      class="w-full h-38px"/>
      </div>
      <div>
        <excel-btn :size="'410kb'"></excel-btn>
      </div>
    </div>
    <div class="mt-3">
      <data-table :headers="headers"
                  @sort="sortData"
                  :sorted="sortedData">
        <template #body>
          <c-tr v-for="data in loadedData" :key="data">
            <c-td v-for="key in headers" :key="key">
              {{ data[key.key] }}
            </c-td>
            <c-td>
              editBtn
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

<script setup>
// State
import {ref} from "vue";

const searchText = ref("")
const availablePages = ref(28)
let currentPage = ref(1)
let pageSize = ref(10)
let headers = ref([
  {
    name: "Название",
    key: "name",
  },
  {
    name: "Title",
    key: "title",
  },
  {
    name: "Код",
    key: "code",
  },
]);
const loadedData = ref([
  {
    name: "Наличный сум",
    title: "Сум",
    code: "UZS"
  },
  {
    name: "Без наличный сум",
    title: "Сум",
    code: "UZS"
  },
  {
    name: "Доллар США",
    title: "Доллар",
    code: "USD"
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
