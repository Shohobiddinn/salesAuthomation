<template>
  <div>
    <div class="mt-6">
      <DashboardFinansFinans1FIlterCard/>
    </div>
    <div class="mt-5 w-full flex gap-5">
      <div class="w-[60%]">
        <div class="text-[24px]">Сегодня</div>
        <div class="grid grid-cols-2 gap-4 mt-2">
          <div v-for="(item, index) in 4"
               class="flex justify-center items-center rounded-lg bg-green-50 h-26 relative"
               :class="index === 0 ? 'bg-yellow-50' : ''">
            <div :class="[index === 0 ? 'bg-green' : '',index === 2 ? 'bg-blue' : '']" class="rounded-lg w-2.5 h-full left-0 absolute bg-blue-10"></div>
            <div class="flex gap-5">
              <div :class="index === 0 ? '#CBE7CD' : ''" class="flex justify-center items-center rounded-[50%] h-13 w-13 bg-[#C2E0E0]">
                <IconShopping v-if="index === 0"/>
                <IconLocation v-if="index === 1"/>
                <IconDollar v-if="index === 2"/>
                <IconDollar v-if="index === 3"/>
              </div>
              <div>
                <div class="text-[18px] font-[500]">-500 000 000</div>
                <div class="text-gray-400 fs-14">Наличные</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="w-[40%]">
        <div class="text-[24px]">Общая продажа</div>
        <div class="rounded-lg bg-white h-56 mt-2">
           <div class="flex border-b-1 p-6 justify-between h-[50%]">
             <div>
               <div class="fs-14 text-gray-400">Сумма продаж</div>
               <div class="text-[28px] font-[500]">-500 000 000</div>
             </div>
             <div>
               <div class="flex justify-center items-center rounded-[50%] h-13 w-13 bg-[#C2E0E0]">
                 <IconDollar/>
               </div>
             </div>
           </div>
          <div class="flex border-b-1 p-6 justify-between h-[50%]">
            <div>
              <div class="fs-14 text-gray-400">Доставлено</div>
              <div class="text-[28px] font-[500]">15489</div>
            </div>
            <div>
              <div class="flex justify-center items-center rounded-[50%] h-13 w-13">
                <IconLocation/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="bg-white rounded-lg mt-5">
      <div class="flex justify-between p-4 border-b-1">
        <div class="flex gap-4 mt-4">
          <button class="rounded-lg border w-6 h-6 p-1.5 hover:bg-gray-200">
            <ArrowBottom/>
          </button>
          <div class="-mt-2 text-[24px] font-[500]">Склад</div>
        </div>
        <div class="flex gap-5">
          <IconBoxSVG class="mt-4"/>
          <div>
            <div class="fs-16 font-[500]">-500 000 000</div>
            <div class="fs-14">Общая сумма продаж</div>
          </div>
        </div>
      </div>
      <div class="grid grid-cols-2 gap-5 p-3">
        <div>
          <div v-for="item in 5" class="py-2">
            <div class="fs-14 font-[500]">Coca cola 1 шт: 126</div>
            <div class="h-3 rounded-lg w-full bg-[#F2F5F5] mt-2">
              <div class="h-full w-[80%] bg-blue-10 rounded-lg"></div>
            </div>
          </div>
        </div>
        <div>
          <div v-for="item in 5" class="py-2">
            <div class="fs-14 font-[500]">Coca cola 1 шт: 126</div>
            <div class="h-3 rounded-lg w-full bg-[#F2F5F5] mt-2">
              <div class="h-full w-[80%] bg-blue-10 rounded-lg"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="mt-5 grid grid-cols-2 gap-5">
      <div class="bg-white p-4 rounded-lg">
        <DashboardFinansFinans1TerritoryTable/>
      </div>
      <div class="bg-white p-4 rounded-lg">
        <DashboardFinansFinans1ClientDataTable/>
      </div>
    </div>
    <div class="mt-5 grid grid-cols-2 gap-5">
      <div class="bg-white p-4 rounded-lg">
        <DashboardFinansFinans1OrdersRefusals/>
      </div>
      <div class="bg-white p-4 rounded-lg">
        <DashboardFinansFinans1RejectionReasonDiagram/>
      </div>
    </div>
    <div class="flex gap-4 mt-4">
      <button class="rounded-lg border w-6 h-6 p-1.5 bg-white hover:bg-gray-200">
        <ArrowBottom/>
      </button>
      <div class="text-6 fw-5 -mt-2">Клиентская база</div>
    </div>
    <div class="bg-white p-4 rounded-lg w-full grid grid-cols-2 mt-5">
      <div class="border-r-1">
        <DashboardFinansFinans1ShareSalesChannels/>
      </div>
      <div>
        <DashboardFinansFinans1ShareSalesChannels/>
      </div>
    </div>
  </div>
</template>

<script setup>

import ArrowBottom from "~/components/icon/ArrowBottom.vue";
</script>

<style scoped>

</style>
