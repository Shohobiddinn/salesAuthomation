<template>
  <div>
    <div class="flex justify-between mt-2">
      <page-title :title="'Склад финального отчета'" />
      <div class="flex justify-between gap-6">
        <button class="border border-blue-20 bg-white rounded-lg p-2 w-50">
          Отчёт за период
        </button>
        <m-btn class="w-50">Добавить</m-btn>
      </div>
    </div>
    <div class="mt-4">
      <WarehousesWriteDownsDetailDataTable />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
const date = ref(false);
</script>

<style scoped></style>
