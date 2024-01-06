<template>
  <div>
    <rounded-white-container>
      <div class="flex flex-row">
        <span class="text-lg font-semibold"> 8. Товар </span>
      </div>
      <div>
        <SettingsProductsButtonsGroup />
      </div>
      <DoubleTab
        first-tab-name="Активный"
        second-tab-name="Не активный"
        @change="dataGet"
      >
        <template #first>
          <SettingsProductsDataTable />
          <div class="flex flex-row my-4 gap-4">
            <dm-btn class="hidden"> Сортировка товаров </dm-btn>
            <dm-btn @click="onChangeStatus"> Активировать/Деактивировать </dm-btn>
          </div>
        </template>
        <template #second>
          <SettingsProductsDataTable />
          <div class="flex flex-row my-4 gap-4">
            <dm-btn class="hidden"> Сортировка товаров </dm-btn>
            <dm-btn @click="onChangeStatus">
              Активировать/Деактивировать
            </dm-btn>
          </div>
        </template>
      </DoubleTab>
      <div class="flex flex-row gap-4 my-4">
        <excel-btn text="Импорт с Excel"> Импорт с Excel </excel-btn>
        <excel-btn text="Импортировать обновление товаров"> </excel-btn>
        <excel-btn text="Обновление товаров" :with-icon="false" />
      </div>
    </rounded-white-container>
    <loading-modal v-if="productsStore.loading" name="Управление меню таблицы">
      <Loading />
    </loading-modal>
  </div>
</template>
<script setup>
import { notify } from "@kyvg/vue3-notification";

// Store
const productsStore = useProductsStore("");

const onChangeStatus = async () => {
  if (!productsStore.productsIds.length) {
    notify({ title: "Выберите продукт!", type: "error" });
    return;
  } else {
    await productsStore.onChangeMultipleProductsStatus()
  }
};

// Methods
function dataGet(param) {
  if (param === 1) {
    productsStore.getData(true);
  } else if (param === 2) {
    productsStore.getData(false);
  }
}

// Hooks
onMounted(() => {
  productsStore.getData(true);
});
</script>

<style scoped></style>
