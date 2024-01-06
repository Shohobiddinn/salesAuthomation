<template>
  <div>
    <div class="mt-7">
      <DashboardFinansFIlterCard/>
    </div>
    <div class="grid grid-cols-2 gap-5 mt-6">
      <div class="bg-white h-[375px] rounded-lg p-6">
        <div class="flex gap-4">
          <button class="rounded-lg border w-6 h-6 p-1.5 hover:bg-gray-200">
            <ArrowBottom/>
          </button>
          <div class="-mt-3.5"><page-title :title="'Продажа за месяц'"/></div>
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
        <div class="flex justify-center"><page-title :title="'Суммарная доля по категориям'"/></div>
        <DashboardFinansDoughnutChart/>
      </div>
    </div>
    <div class="grid grid-cols-2 gap-5 mt-6">
      <div class="bg-white h-[375px] rounded-lg p-6">
        <div class="flex gap-4">
          <button class="rounded-lg border w-6 h-6 p-1.5 hover:bg-gray-200">
            <ArrowBottom/>
          </button>
          <div class="-mt-3.5"><page-title :title="'Долги (по периодам)'"/></div>
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
      <div class="bg-white h-[375px] rounded-lg p-6">
        <div class="flex gap-4">
          <button class="rounded-lg border w-6 h-6 p-1.5 hover:bg-gray-200">
            <ArrowBottom/>
          </button>
          <div class="-mt-3.5"><page-title :title="'Долги (общие)'"/></div>
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
    </div>
    <div class="mt-5">
      <DashboardFinansProductCategory/>
    </div>
    <div class="mt-5">
      <DashboardFinansClientsDataTable/>
    </div>
  </div>
</template>

<script setup>

import ArrowBottom from "~/components/icon/ArrowBottom.vue";
</script>

<style scoped>

</style>
