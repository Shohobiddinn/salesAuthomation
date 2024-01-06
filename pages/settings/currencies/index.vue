<template>
  <div>
    <RoundedWhiteContainer>
      <div class="grid grid-cols-2 justify-items-stretch w-full mb-4 items-center">
        <div>
          <span class="text-lg font-semibold"> 2. Способ оплаты </span>
        </div>
        <div class="justify-self-end">
          <m-btn @click="dialogStore.openDialog" class="justify-self-auto">
            Добавить способ оплаты
          </m-btn>
        </div>
      </div>
      <DoubleTab
        first-tab-name="Активный"
        second-tab-name="Не активный"
        @change="dataGet"
      >
        <template #first>
          <SettingsCurrenciesTableData />
        </template>
        <template #second>
          <SettingsCurrenciesTableData />
        </template>
      </DoubleTab>
    </RoundedWhiteContainer>
    <transition name="modal">
      <div v-if="dialogStore.isDialogOpen">
        <d-modal
          @closeDialog="dialogStore.closeDialog"
          :name="
            dialogStore?.singleData?.id
              ? 'Сохранить способ оплаты'
              : 'Добавить способ оплаты'
          "
        >
          <SettingsCurrenciesDataDialog />
        </d-modal>
      </div>
    </transition>
    <loading-modal v-if="currenciesStore.loading" name="Управление меню таблицы">
      <Loading />
    </loading-modal>
  </div>
</template>
<script setup lang="ts">
// Store
const dialogStore = useDialogStore("currencies");
const currenciesStore = useCurrenciesStore("");

// Methods
function dataGet(param: any) {
  if (param === 1) {
    currenciesStore.getData(true);
  } else if (param === 2) {
    currenciesStore.getData(false);
  }
}
// Hooks
onMounted(async () => {
  await currenciesStore.getData(true);
});
</script>
