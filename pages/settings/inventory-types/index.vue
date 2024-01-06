<template>
  <div>
    <RoundedWhiteContainer>
      <div
        class="grid grid-cols-2 justify-items-stretch w-full mb-4 items-center"
      >
        <div>
          <span class="text-lg font-semibold"> 14. Тип инвентаря </span>
        </div>
        <div class="justify-self-end">
          <m-btn @click="dialogStore.openDialog" class="justify-self-auto">
            Добавить тип инвентаря
          </m-btn>
        </div>
      </div>
      <DoubleTab
        first-tab-name="Активный"
        second-tab-name="Не активный"
        @change="dataGet"
      >
        <template #first>
          <SettingsInventoryTypesTableData
            :inventoryTypesStore="inventoryTypesStore"
          />
        </template>
        <template #second>
          <SettingsInventoryTypesTableData
            :inventoryTypesStore="inventoryTypesStore"
          />
        </template>
      </DoubleTab>
    </RoundedWhiteContainer>
    <transition name="modal">
      <div v-if="dialogStore.isDialogOpen">
        <d-modal
          @closeDialog="dialogStore.closeDialog"
          :name="dialogStore?.singleData?.id ? 'Сохранить тип инвентаря' : 'Добавить тип инвентаря'"
        >
          <SettingsInventoryTypesDataDialog :inventoryTypesStore="inventoryTypesStore"/>
        </d-modal>
      </div>
    </transition>
    <loading-modal v-if="inventoryTypesStore.loading"
                   name="Управление меню таблицы">
      <Loading/>
    </loading-modal>
  </div>
</template>

<script setup lang="ts">
const dialogStore = useDialogStore("inventory_types");

const inventoryTypesStore = useInventoryTypesStore("");
function dataGet(param: any) {
  if (param === 1) {
    inventoryTypesStore.getData(true);
  } else if (param === 2) {
    inventoryTypesStore.getData(false);
  }
}
// Hooks
onMounted(() => {
  inventoryTypesStore.getData(true);
});
</script>

<style scoped></style>
