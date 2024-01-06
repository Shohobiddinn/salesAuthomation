<template>
  <div>
    <div class="flex gap-8">
      <button @click="$router.go(-1)" class="h-[44px] px-[46px] mt-4 bg-[#FFFFFF] text-black rounded-lg border">
        <div class="flex">
          <IconArrowLeft class="mt-[5px] mr-[10px]"></IconArrowLeft>
          Назад
          <slot></slot>
        </div>
      </button>
      <div class="mt-4">
        <div class="fw-6">{{exchangeStore.exchangesDetail.client}}</div>
        <div class="fw-4 fs-14 text-gray-400">{{exchangeStore.exchangesDetail.phone}}</div>
      </div>
      <div class="mt-4">
        <div class="text-gray-400 fs-14">Агент</div>
        <div class="fw-6">{{exchangeStore.exchangesDetail.agent}}</div>
      </div>
      <div class="mt-4">
        <div class="text-gray-400 fs-14">Дата обмена:</div>
        <div class="fw-6">{{exchangeStore.exchangesDetail.date}}</div>
      </div>
    </div>
    <div class="mt-6  w-full grid grid-cols-2 gap-5">
      <rounded-white-container>
        <div >
          <page-title20 :title="'Обмен (возврат)'"/>
        </div>
        <div class="rounded-lg bg-white border-grey mt-3 px-[2px] relative w-full">
          <div class="absolute p-2 flex justify-between bg-[#FAFDFD] bb-r bottom-0 w-full ml-[-2px] z-20 h-40px border-t border-[#E1E4E4]">
            <div class="fs-14">Итого</div>
            <div class="fs-14">{{}} шт</div>
            <div class="fs-14 font-[600]">{{}} сум</div>
          </div>
          <div class="overflow-y-auto pb-5 table-containers max-h-70">
            <data-table :headers="headers"
                        @sort="sortData"
                        :sorted="sortedData">
              <template #body>
                <c-tr v-for="(data, index) in exchangeStore.exchangesDetail.refund" :key="data">
                  <c-td-no-edit v-for="key in headers" :key="key" >
                    <div class="py-2">
                      <div class="mt-[-10px] mb-[-10px]" v-if="key.key === 'active'">
                        <button class="h-[33px]  w-[80px] fs-12 bg-[#E3FCF0] rounded-[41px]">Активный</button>
                      </div>
                      <div v-if="key.checked === true">
                        {{ data[key.key] }}
                      </div>
                    </div>
                  </c-td-no-edit>
                </c-tr>
              </template>
            </data-table>
          </div>
        </div>
        <div class="mt-4">
          <m-btn @click="edit('refund')">Посмотреть</m-btn>
        </div>
      </rounded-white-container>
      <rounded-white-container>
        <div>
          <page-title20 :title="'Обмен (отправка)'"/>
        </div>
        <div class="rounded-lg bg-white border-grey mt-3 px-[2px] relative w-full">
          <div class="absolute p-2 flex justify-between bg-[#FAFDFD] bb-r bottom-0 w-full ml-[-2px] z-20 h-40px border-t border-[#E1E4E4]">
            <div class="fs-14">Итого</div>
            <div class="fs-14">{{}} шт</div>
            <div class="fs-14 font-[600]">{{}} сум</div>
          </div>
          <div class="overflow-y-auto pb-5 table-containers max-h-70">
            <data-table :headers="headers"
                        @sort="sortData"
                        :sorted="sortedData">
              <template #body>
                <c-tr v-for="(data, index) in exchangeStore.exchangesDetail.request" :key="data">
                  <c-td-no-edit v-for="key in headers" :key="key" >
                    <div class="py-2">
                      <div class="mt-[-10px] mb-[-10px]" v-if="key.key === 'active'">
                        <button class="h-[33px]  w-[80px] fs-12 bg-[#E3FCF0] rounded-[41px]">Активный</button>
                      </div>
                      <div v-if="key.checked === true">
                        {{ data[key.key] }}
                      </div>
                    </div>
                  </c-td-no-edit>
                </c-tr>
              </template>
            </data-table>
          </div>
        </div>
        <div class="mt-4">
          <m-btn @click="edit('request')">Посмотреть</m-btn>
        </div>
      </rounded-white-container>
    </div>

  </div>
</template>

<script setup>

import {useExchangeStore} from "~/stores/orders/exchanges/exchanges.store";
import {ref} from "vue";
let headers = ref([
  {
    name: "No",
    checked:true,
    key: "no",
    thWidth:'40px',
    bRadius:'8px'
  },
  {
    name: "Продукт",
    checked:true,
    key: "product",
    thWidth:'270px',
    bRadius:'8px'
  },
  {
    name: "Kоличество",
    checked:true,
    key: "count",
    thWidth:'80px'
  },
  {
    name: "Цена",
    checked:true,
    key: "price",
    thWidth:'60px'
  },
  {
    name: "Сумма",
    checked:true,
    key: "cost",
    thWidth:'80px'
  },
]);
const route = useRoute()
const router = useRouter()
const exchangeStore = useExchangeStore('')
function edit(param){
  router.push({ path:'/orders/create-exchange/create-exchange-product', query: {id: route.query.id, status:param}})
}
onMounted(()=>{
  exchangeStore.getExchangeDetail(route.query.id)
})
let sortedData = ref({key: '', mode: ''});

function sortData(data) {
  sortedData.value = data
}
</script>

<style scoped>

</style>
