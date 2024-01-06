<template>
  <div>
    <rounded-white-container>
      <div class="flex flex-row">
        <span class="text-lg font-semibold"> 7. Категория товара </span>
      </div>
      <div>
        <SettingsProductCategoryManageButtons />
      </div>
      <div>
        <DoubleTab
          first-tab-name="Активный"
          second-tab-name="Не активный"
          @change="dataGet"
          class="mt-6"
        >
          <template #first>
            <SettingsProductCategoryActiveData />
          </template>
          <template #second>
            <SettingsProductCategoryActiveData />
          </template>
        </DoubleTab>
      </div>
    </rounded-white-container>
    <loading-modal v-if="productActiveStore.loading" name="Управление меню таблицы">
      <Loading />
    </loading-modal>
  </div>
</template>

<script setup>
// Store
const productActiveStore = useProductCategoryStore("");

// Methods
function dataGet(param) {
  if (param === 1) {
    productActiveStore.getData(true);
  } else if (param === 2) {
    productActiveStore.getData(false);
  }
}

// Hooks
onMounted(() => {
  productActiveStore.getData(true);
});
</script>
