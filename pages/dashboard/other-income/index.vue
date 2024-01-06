<template>
  <div>
    <div class="flex justify-between mt-7">
      <page-title :title="'Прочие приходы'"/>
      <div class="flex gap-5">
        <div class="flex gap-5">
          <div class="flex-row mt-4">
            <span class="text-gray-3 fs-14 fw-4">
              Касса
            </span>
          </div>
          <div class="mt-3">
            <MultiSelect @clear="data.currency=[]" :data="currincyStore.data?.items" field_name="currency" :selected_id="data.currency" class="w-full"></MultiSelect>
          </div>
        </div>
        <div class="mt-3">
          <date-picker :quryParam="queryParam"/>
        </div>
        <flex-row class="h-full items-end gap-2">
          <m-btn @click="filter" class="w-50 h-9.5">
            Применить
          </m-btn>
          <sm-btn class="px-4 py-3">
            <IconReloadSVG/>
          </sm-btn>
        </flex-row>
      </div>
    </div>
    <div class="mt-5">
      <DashboardOtherIncomeDataTable/>
    </div>
    <div v-click-outside="outside" class="mt-5 relative">
      <button @click="totalShow = !totalShow" class="rounded-lg bg-white border border-blue-20 py-2 px-11">Итого</button>
      <div v-if="totalShow" class="absolute w-180 h-40 rounded-lg bg-white top-12 px-4">
        <div class="pt-4"><page-title :title="'Итого'"/></div>
        <div class="flex justify-between">
          <div class="py-2">
            <div class="text-[18px] py-2">Доллар сша</div>
            <div class="text-[18px]">Доллар сша</div>
          </div>
          <div class="fw-6">
            <div class="text-[18px] py-2">100 000 000</div>
            <div class="text-[18px]">100 000 000</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {useOtherIncome} from "~/stores/dashboard/other-income/other-income.store";
import {ref} from "vue";
const otherIncomeStore = useOtherIncome('')

const totalShow = ref(false)
function outside(){
  totalShow.value = false
}
const queryParam = ref({
  currency:[],
  from:null,
  to:null
})
const data = ref({
  currency:[]
})
async function filter(){
  console.log('data', data.value)
  for (let i = 0; i < data.value.currency.length; i++){
    queryParam.value.currency.push(data.value.currency[i].currency)
  }
 await otherIncomeStore.getData(queryParam.value)
}
const otherIncome = useOtherIncome()
const currincyStore = useCurrenciesStore('')
onMounted(()=>{
  currincyStore.getData(true)
})
</script>

<style scoped>

</style>
