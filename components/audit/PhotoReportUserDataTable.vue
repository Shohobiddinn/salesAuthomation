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
  
  let headers = ref([
    {
      name: "Пользователь",
      checked:true,
      key: "svr",
      type:"svr",
      thWidth:'276px',
      bRadius:'8px'
    },
    {
      name: "Кол-во ТТ",
      checked:true,
      key: "amount",
      type:"amount",
      thWidth:'100px'
    },
    {
      name: "Нет оценки",
      checked:true,
      key: "order",
      type:"order",
      thWidth:'100px'
    },
    {
      name: "1",
      checked:true,
      key: "canceled",
      type:"canceled",
      thWidth:'120px'
    },
    {
      name: "2",
      checked:true,
      key: "allVisit",
      type:"allVisit",
      thWidth:'140px'
    },
    {
      name: "3",
      checked:true,
      key: "allVisit",
      type:"allVisit",
      thWidth:'140px'
    },
    {
      name: "4",
      checked:true,
      key: "allVisit",
      type:"allVisit",
      thWidth:'140px'
    },
    {
      name: "5",
      checked:true,
      key: "canceled",
      type:"canceled",
      thWidth:'120px'
    },
    {
      name: "6",
      checked:true,
      key: "canceled",
      type:"canceled",
      thWidth:'120px'
    },
    {
      name: "7",
      checked:true,
      key: "canceled",
      type:"canceled",
      thWidth:'120px'
    },
  ]);
  const loadedData = ref([
    {
      svr:"Шерзод ака",
      amount:"156",
      order:"156",
      canceled:"123456",
      allVisit:"123",
    },
    {
      svr:"Шерзод ака",
      amount:"156",
      order:"156",
      canceled:"123456",
      allVisit:"121",
    },
    {
      svr:"Шерзод ака",
      amount:"156",
      order:"156",
      canceled:"123456",
      allVisit:"221",
    },
    {
      svr:"Шерзод ака",
      amount:"156",
      order:"156",
      canceled:"123456",
      allVisit:"202",
    },
    {
      svr:"Шерзод ака",
      amount:"156",
      order:"156",
      canceled:"123456",
      allVisit:"202",
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
  
  