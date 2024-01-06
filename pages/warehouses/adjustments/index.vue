<template>
 <div class="mt-4">
   <div class="flex justify-between">
     <page-title :title="'Корректировка склада'"></page-title>
     <div class="flex gap-4">
       <nuxt-link to="/warehouses/adjustments/adjustments" class="border border-blue-20 rounded-lg p-2 px-6 bg-white fs-14">Корректировка склада</nuxt-link>
       <nuxt-link to="/warehouses/adjustments/inventory-warehouses" class="border border-blue-20 rounded-lg p-2 px-6 bg-white fs-14">Инвентаризация склада</nuxt-link>
     </div>
   </div>
   <div class="mt-4">
     <WarehousesAdjustmentsDataTable/>
   </div>
 </div>
</template>

<script setup>
</script>

<style scoped>

</style>
