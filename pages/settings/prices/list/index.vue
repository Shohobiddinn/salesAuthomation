<template>
  <div>
    <div class="flex flex-row">
      <button
        @click="$router.push('/settings/prices')"
        class="px-6 border-1 py-2 fs-16 fw-4 bg-white flex items-center gap-3 rounded-lg hover:bg-gray-50 active:bg-gray-100"
      >
        <IconBackArrowSVG /> Назад
      </button>
    </div>
    <div class="flex flex-row mt-6">
      <span class="text-gray-3 fw-6 text-[24px]"> Прайст лист </span>
    </div>
    <div class="mt-6">
      <SettingsPricesListFilterCard />
    </div>
    <div class="mt-6">
      <DoubleTab first-tab-name="Активный" second-tab-name="За единицу">
        <template #first>
          <SettingsPricesListDataTable />
        </template>
        <template #second>
          <SettingsPricesListDataTable />
        </template>
      </DoubleTab>
    </div>
  </div>
</template>

<script setup>
// Store
const priceStore = usePriceStore("main");

// Hooks
onMounted(async () => {
  priceStore.params.filter = [];
  await priceStore.getPriceList();
});
</script>
