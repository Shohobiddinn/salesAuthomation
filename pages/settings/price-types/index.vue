<template>
  <div>
    <RoundedWhiteContainer>
      <div class="grid grid-cols-2 justify-items-stretch w-full mb-4 items-center">
        <div>
          <span class="text-lg font-semibold"> 9. Тип цены </span>
        </div>
        <div class="justify-self-end">
          <m-btn @click="dialogStore.openDialog" class="justify-self-auto">
            Добавить тип цены
          </m-btn>
        </div>
      </div>
      <DoubleTab
        first-tab-name="Активный"
        second-tab-name="Не активный"
        @change="dataGet"
      >
        <template #first>
          <SettingsPriceTypesDataTable />
        </template>
        <template #second>
          <SettingsPriceTypesDataTable />
        </template>
      </DoubleTab>
    </RoundedWhiteContainer>
    <DModal
      v-if="dialogStore.isDialogOpen"
      @closeDialog="dialogStore.closeDialog"
      :name="dialogStore?.singleData?.id ? 'Сохранить тип цены' : 'Добавить тип цены'"
    >
      <SettingsPriceTypesNewPrice />
    </DModal>
    <loading-modal v-if="priceTypeStore.loading" name="Управление меню таблицы">
      <Loading />
    </loading-modal>
  </div>
</template>

<script setup>
// Store
const dialogStore = useDialogStore("priceTypes");
const priceTypeStore = usePriceTypesStore("");

// Methods
function dataGet(param) {
  if (param === 1) {
    priceTypeStore.getData(true);
  } else if (param === 2) {
    priceTypeStore.getData(false);
  }
}
// Hooks
onMounted(() => {
  priceTypeStore.getData(true);
});
</script>
