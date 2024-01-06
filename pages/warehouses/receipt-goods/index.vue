<template>
  <div class="mt-8">
    <page-title :title="'Движения товаров на складе'"/>
    <rounded-white-container class="mt-6">
      <div class="flex gap-4 w-full">
        <div class="w-[40%]">
          <span class="fs-12">Дата с</span>
          <d-input-date-picker class="mt-2"/>
        </div>
        <div class="w-[40%]">
          <span class="fs-12">Дата до</span>
          <d-input-date-picker class="mt-2"/>
        </div>
        <div class="flex justify-end w-[20%] h-40px mt-[34px]">
          <button class="w-[100%] py-2 rounded-lg bg-[#299B9B] text-white">Применить</button>
          <boutton class="mt-3 ml-3"><IconRe/></boutton>
        </div>
      </div>
    </rounded-white-container>
    <div class="mt-6">
      <WarehousesReceiptGoodsDataTable/>
    </div>
  </div>

</template>

<script setup>
const filter = ref({
  isDataFrom: false,
  isDataTo: false
})
</script>

<style scoped>

</style>
