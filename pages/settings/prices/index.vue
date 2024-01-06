<template>
  <div>
    <RoundedWhiteContainer>
      <div class="grid grid-cols-2 justify-items-stretch w-full mb-4 items-center">
        <div>
          <span class="text-lg font-semibold"> 10. Цена </span>
        </div>
      </div>
      <DoubleTab first-tab-name="Продажа" second-tab-name="Закуп" @change="dataGet">
        <template #first>
          <SettingsPricesDataTable />
          <div class="flex flex-row mt-4 gap-4">
            <dm-btn> Скачать шаблон </dm-btn>
            <button
              class="px-4 bg-[#23C00A] text-white rounded-lg hover:bg-green-600 active:bg-green-700"
            >
              Загрузка цен
            </button>
            <m-btn-outlined
              @click="$router.push('/settings/prices/list')"
              class="border-color-primary"
            >
              Прайст лист
            </m-btn-outlined>
          </div>
        </template>
        <template #second>
          <SettingsPricesDataTablePurchase />
          <div class="flex flex-row mt-4 gap-4">
            <dm-btn> Скачать шаблон </dm-btn>
            <button
              class="px-4 bg-[#23C00A] text-white rounded-lg hover:bg-green-600 active:bg-green-700"
            >
              Загрузка цен
            </button>
            <m-btn-outlined
              @click="$router.push('/settings/prices/list')"
              class="border-color-primary"
            >
              Прайст лист
            </m-btn-outlined>
          </div>
        </template>
      </DoubleTab>
    </RoundedWhiteContainer>
    <loading-modal v-if="priceStore.loading" name="Управление меню таблицы">
      <Loading />
    </loading-modal>
  </div>
</template>

<script setup>
// Store
const priceStore = usePriceStore("");

// Methods
function dataGet(param) {
  if (param === 1) {
    priceStore.getPriceSale(true);
  } else if (param === 2) {
    priceStore.getPricePurchuse();
  }
}
// Hooks
onMounted(() => {
  priceStore.getPriceSale(true);
});
</script>

<style scoped></style>
