<template>
  <div>
    <page-title :title="'Возврат поставщика'"></page-title>
    <div class="flex justify-between mt-6">
      <div class="flex gap-4">
        <m-btn class="w-[215px]">Сделать возврат 1</m-btn>
        <m-btn class="w-[215px]">Сделать возврат</m-btn>
      </div>
      <div class="flex gap-4">
        <DatePicker class="h-11 w-fit"/>
        <m-btn class="w-[150px]">Применить</m-btn>
      </div>
    </div>
    <div class="mt-4">
      <WarehousesSuplierRefundDataTable/>
    </div>
    <div class="mt-4">
      <button class="rounded-lg bg-white p-2 text-gray-3 ">Сформировать накладную</button>
    </div>
  </div>
</template>

<script setup>

</script>

<style scoped>

</style>
