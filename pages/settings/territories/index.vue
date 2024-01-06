<template>
  <div>
    <RoundedWhiteContainer>
      <div class="grid grid-cols-2 justify-items-stretch w-full mb-4 items-center">
        <div>
          <span class="text-lg font-semibold"> 4. Территория </span>
        </div>
        <div class="justify-self-end">
          <m-btn @click="dialogStore.openDialog" class="justify-self-auto">
            Добавить территория
          </m-btn>
        </div>
      </div>
      <DoubleTab
        first-tab-name="Активный"
        second-tab-name="Не активный"
        @change="dataGet"
      >
        <template #first>
          <SettingsTerritoriesTableData />
        </template>
        <template #second>
          <SettingsTerritoriesTableData />
        </template>
      </DoubleTab>
    </RoundedWhiteContainer>
    <transition name="modal">
      <div v-if="dialogStore.isDialogOpen">
        <d-modal
          @closeDialog="dialogStore.closeDialog"
          data-container-width="1200px"
          :name="
            dialogStore?.singleData?.id ? ' Сохранить территория' : 'Добавить территория'
          "
        >
          <SettingsTerritoriesDataDialog />
        </d-modal>
      </div>
    </transition>
    <loading-modal v-if="territoriesStore.loading" name="Управление меню таблицы">
      <Loading />
    </loading-modal>
  </div>
</template>

<script setup lang="ts">
// Store
const dialogStore = useDialogStore("territories");
const territoriesStore = useTerritoriesStore("");

// Methods
function dataGet(param: any) {
  if (param === 1) {
    territoriesStore.getData(true);
  } else if (param === 2) {
    territoriesStore.getData(false);
  }
}
// Hooks
onMounted(() => {
  territoriesStore.getData(true);
});
</script>
