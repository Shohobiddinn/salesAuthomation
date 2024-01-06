<template>
  <div class="mt-4">
    <page-title :title="'Купить смс пакеты'"/>
    <div class="mt-4">
      <div class="rounded-lg bg-white border-grey px-[2px]">
        <div class=" w-full overflow-auto">
          <data-table-common2 :headers="headers"
                              @sort="sortData"
                              :sorted="sortedData">
            <template #body>
              <template v-for="(data, index) in loadedData" :key="index">
                <c-tr class="border-b-none b-bottom cursor-pointer">
                  <c-td v-for="key in headers" :key="key" >
                    <div class="pt-2 check" v-if="key.key === 'checkbox'">
                      <checkbox :values="key.checked"/>
                    </div>
                    <div class="pt-1 pb-1 check" v-if="key.key === 'remainedQty'">
                      <button class="py-2 px-8 fs-12 rounded-lg bg-[#299B9B] text-white">Отправить</button>
                    </div>
                    <div class="py-2" v-if="key.checked && key.key !== 'remainedQty'">
                      {{ data[key.key] }}
                    </div>
                  </c-td>
                </c-tr>
              </template>
            </template>
          </data-table-common2>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref} from "vue";

let headers = ref([
  {
    name: "Пакет",
    checked:true,
    key: "package",
    type:"package",
    thWidth:'120px'
  },
  {
    name: "Цена",
    checked:true,
    key: "price",
    type:"price",
    thWidth:'140px',
    bRadius:'8px'
  },
  {
    name: "Кол-во",
    checked:true,
    key: "qty",
    type:"qty",
    thWidth:'140px'
  },
  {
    name: "Остал. Кол-во",
    checked:true,
    key: "remainedQty",
    type:"remainedQty",
    thWidth:'140px'
  }
]);
const loadedData = ref([
  {
    package:"Lorem ipsum",
    price:"100 000",
    qty:"100 000",
    useQty:"100 000",
    remainedQty:"100 000"
  },
  {
    package:"Lorem ipsum",
    price:"100 000",
    qty:"100 000",
    useQty:"100 000",
    remainedQty:"100 000"
  },
  {
    package:"Lorem ipsum",
    price:"100 000",
    qty:"100 000",
    useQty:"100 000",
    remainedQty:"100 000"
  },
  {
    package:"Lorem ipsum",
    price:"100 000",
    qty:"100 000",
    useQty:"100 000",
    remainedQty:"100 000"
  },
  {
    package:"Lorem ipsum",
    price:"100 000",
    qty:"100 000",
    useQty:"100 000",
    remainedQty:"100 000"
  },
  {
    package:"Lorem ipsum",
    price:"100 000",
    qty:"100 000",
    useQty:"100 000",
    remainedQty:"100 000"
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
