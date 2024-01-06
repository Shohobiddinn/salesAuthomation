<template>
  <div class="h-100vh">
    <div class="mt-2 text-[24px] font-[600] text-[#424F4F]">
      Остатки товара на складе (рекомендованный запас)
    </div>
    <div class="mt-4">
      <WarehousesEntranceReportWarehouseFilterCard
          :filters="filters"
          @filterClicked="filterClicked(filters)"/>
    </div>
    <div class="flex mt-4 gap-5">
      <div class="w-[253px] h-[113px] bg-gray-50 rounded flex justify-center items-center">
        <div class="h-[53px] w-[53px] rounded-[50%] bg-[#E9F1F2] flex justify-center items-center"><IconCalendar></IconCalendar></div>
        <div class="ml-4 mt-[-8px]">
          <page-title :title="Math.floor(allDay * 100) / 100"/>
          <div class="fs-12 mt-[-6px]">Всего дней</div>
        </div>
      </div>
      <div class="w-[253px] h-[113px] bg-green-50 rounded flex justify-center items-center">
        <div class="h-[53px] w-[53px] rounded-[50%] bg-gray-300 flex justify-center items-center"><IconCalendar></IconCalendar></div>
        <div class="ml-4 mt-[-8px]">
          <page-title :title="Math.floor(passedDay * 100) / 100"/>
          <div class="fs-12 mt-[-6px]">Пройдено дней</div>
        </div>
      </div>
      <div class="w-[253px] h-[113px] bg-[#E9EBF2] rounded flex justify-center items-center">
        <div class="h-[53px] w-[53px] rounded-[50%] bg-gray-300 flex justify-center items-center"><IconCalendar></IconCalendar></div>
        <div class="ml-4 mt-[-8px]">
          <page-title :title="Math.floor(leftDay * 100) / 100"/>
          <div class="fs-12 mt-[-6px]">Осталось дней</div>
        </div>
      </div>
    </div>
    <div class="mt-4">
      <WarehousesEntranceRemainTable :reportWarehouses="reportWarehouses" :filters="filters" @setPage="setPage" @setPageSize="setPageSize"/>
    </div>
    <loading-modal v-if="loading1"
                   name="Управление меню таблицы">
      <Loading/>
    </loading-modal>
  </div>

</template>

<script setup>
import {ref} from "vue";
import {useReportWarehousesStore} from "~/stores/warehouses/reports-warehouses/report-warehouse";
const date = ref(false)
const reportWarehouses = useReportWarehousesStore('')

const filters = ref({
  page: 1,
  pageSize: 10,
  periodPlace:100,
  category: [],
  warehouse: [],
  product: []
});
function setPage(param){
  filters.value.page = param
}
function setPageSize(size){
  filters.value.pageSize = size
}
const loading1 = ref(false)
watch(filters.value,async ()=>{
  try {
    loading1.value = true
    await reportWarehouses.getData(filters.value)
  }catch (error){

  }finally {
    loading1.value = false
  }
})
async function filterClicked(filters) {
  await reportWarehouses.getData(filters);
}
const allDay = ref(null)
const passedDay = ref(null)
const leftDay = ref(null)

onMounted(async ()=>{
  await reportWarehouses.getData(filters.value)
  allDay.value = reportWarehouses.data?.items.reduce((result, item) => result + item.enough_for_day, 0)
  passedDay.value = reportWarehouses.data?.items.reduce((result, item) => result + item.enough_for6_day, 0)
  leftDay.value = reportWarehouses.data?.items.reduce((result, item) => result + item.quantity_in_warehouse, 0)
})
</script>

<style scoped>

</style>
