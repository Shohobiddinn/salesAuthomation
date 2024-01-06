<template>
  <div>
    <div class="mt-7">
      <DashboardSalesFIlterCard/>
    </div>
    <div class="grid grid-cols-2 gap-5 mt-6">
      <div class="bg-white h-[375px] rounded-lg p-6">
        <div class="flex gap-4">
          <button class="rounded-lg border w-6 h-6 p-1.5 hover:bg-gray-200">
            <ArrowBottom/>
          </button>
          <div class="-mt-3.5"><page-title :title="'Общая сумма заявок на 15 ноя.'"/></div>
        </div>
        <div class="fs-14 text-gray-400 mt-6">Общая сумма</div>
        <div class="text-[28px] mt-4 text-blue-10 fw-6">100 000 000 сум</div>
        <div class="grid grid-cols-2 gap-4 mt-2">
          <div>
            <div>
              <div class="fs-14 text-gray-400 mt-3">Без нал</div>
              <div class="text-[20px] fw-5">100 000 000 сум</div>
            </div>
            <div class="mt-3">
              <div class="fs-14 text-gray-400 mt-3">Без нал</div>
              <div class="text-[20px] fw-5">100 000 000 сум</div>
            </div>
          </div>
          <div>
            <div>
              <div class="fs-14 text-gray-400 mt-3">Без нал</div>
              <div class="text-[20px] fw-5">100 000 000 сум</div>
            </div>
            <div class="mt-3">
              <div class="fs-14 text-gray-400 mt-3">Без нал</div>
              <div class="text-[20px] fw-5">100 000 000 сум</div>
            </div>
          </div>
        </div>
      </div>
      <div class="bg-white h-[375px] rounded-lg">
        <div class="flex justify-center"><page-title :title="'Общая сумма заявок на 15 ноя.'"/></div>
        <DashboardSupervayzerDoughnutChart/>
      </div>
    </div>
    <div class="grid-cols-3 grid gap-4 mt-6">
      <div v-for="item in data" :style="{background: item.colorBg}" class="h-25 rounded-lg flex justify-center items-center">
        <div>
          <div class="text-6 fw-6 text-red text-center" :style="{color: item.colorName}">{{item.name}}</div>
          <div class="fs-14 fw-4 text-red" :style="{color: item.colorText}">{{item.title}}</div>
        </div>
      </div>
    </div>
    <div class="grid grid-cols-2 gap-6 mt-6">
      <div class="bg-white h-130 rounded-lg p-6">
        <DashboardSalesCategoryTable/>
      </div>
      <div class="bg-white h-130 rounded-lg p-6">
        <DashboardSalesSallesChanelTable/>
      </div>
    </div>
    <div class="grid grid-cols-2 gap-6 mt-6">
      <div class="bg-white h-130 rounded-lg p-6">
        <DashboardSalesTerritoryTable/>
      </div>
      <div class="bg-white h-130 rounded-lg p-6">
        <DashboardSalesAgentsTable/>
      </div>
    </div>
    <div class="grid grid-cols-2 gap-6 mt-6">
      <div class="bg-white h-115 rounded-lg p-6">
        <DashboardSalesOrdersRefusals/>
      </div>
      <div class="bg-white h-115 rounded-lg p-6">
        <DashboardSalesShareSalesChannels/>
      </div>
    </div>
    <div class="w-full h-full pt-7.5">
      <DashboardSalesRejectionReasonDiagram/>
    </div>
    <div class="w-full h-full pt-7.5">
      <DashboardSalesDiagram/>
    </div>
  </div>
</template>

<script setup>
import ArrowBottom from "~/components/icon/ArrowBottom.vue";

const data = ref([
  {
    name:"20",
    title:"ОКБ (По плану)",
    colorName:"#BB0A0A",
    colorText:"#8FA0A0",
    colorBg:"#FFE8E1"
  },
  {
    name:"50",
    title:"АКБ (Заказы)",
    colorName:"#492E02",
    colorText:"#8FA0A0",
    colorBg:"#FFF9EF"
  },
  {
    name:"100",
    title:"Процент ОКБ",
    colorName:"#004F04",
    colorText:"#8FA0A0",
    colorBg:"#DDF0DE"
  }
])
</script>

<style scoped>

</style>
