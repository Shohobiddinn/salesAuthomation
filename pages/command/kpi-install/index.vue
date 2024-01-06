<template>
  <div>
    <div class="flex flex-row my-6">
      <span class="text-gray-3 text-[24px] fw-6"> KPI Установка </span>
    </div>
    <div class="flex flex-row justify-between">
      <div>
        <search-input />
      </div>
      <div class="flex">
        <button
          @click="$router.push('/command/kpi-install/install')"
          class="items-center border-1 border-color-primary rounded-l-lg hover:bg-gray-50 active:bg-gray-200 bg-white flex gap-2 py-2 px-4">
        <IconShoppingCartSVG/> Установка KPI
      </button>
      <button
          @click="$router.push('/command/kpi-install/tasks')"
          class="items-center border-1 border-color-primary -ml-[1px] hover:bg-gray-50 active:bg-gray-200 bg-white flex gap-2 py-2 px-4">
        <IconAddSVG/> Добавить задачу
      </button>
      <button
          @click="$router.push('/command/kpi-install/tasks')"
          class="border-1 border-color-primary -ml-[1px] hover:bg-gray-50 active:bg-gray-200 bg-white flex gap-2 items-center py-2 px-4"
        >
          <IconClipboardSVG /> Задачи
        </button>
        <button
          @click="$router.push('/command/kpi-install/grouping')"
          class="border-1 border-color-primary rounded-r-lg -ml-[1px] hover:bg-gray-50 active:bg-gray-200 bg-white flex gap-2 items-center py-2 px-4"
        >
          <IconBoxSVG /> Группировка
        </button>
      </div>
    </div>
    <div class="mt-4">
      <CommandKpiInstallExcitingDataTable />
    </div>
  </div>
</template>
<script setup>
</script>
<style scoped>

</style>
