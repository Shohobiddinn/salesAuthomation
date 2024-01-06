<template>
  <div>
    <RoundedWhiteContainer>
      <div
        class="grid grid-cols-2 justify-items-stretch w-full mb-4 items-center"
      >
        <div>
          <span class="text-lg font-semibold"> 6. Тип клиента </span>
        </div>
        <div class="justify-self-end">
          <m-btn @click="dialogStore.openDialog" class="justify-self-auto">
            Добавить тип клиента
          </m-btn>
        </div>
      </div>
      <DoubleTab
        first-tab-name="Активный"
        second-tab-name="Не активный"
        @change="dataGet"
      >
        <template #first>
          <SettingsClientTypesTableData :clientTypesStore="clientTypesStore" />
        </template>
        <template #second>
          <SettingsClientTypesTableData :clientTypesStore="clientTypesStore" />
        </template>
      </DoubleTab>
    </RoundedWhiteContainer>
    <DModal
      v-if="dialogStore.isDialogOpen"
      @closeDialog="dialogStore.closeDialog"
      :name="dialogStore?.singleData?.id ? 'Сохранить тип клиента' : 'Добавить тип клиента'"
    >
      <SettingsClientTypesDataDialog :clientTypesStore="clientTypesStore"/>
    </DModal>
    <loading-modal v-if="clientTypesStore.loading"
                   name="Управление меню таблицы">
      <Loading/>
    </loading-modal>
  </div>
</template>

<script setup lang="ts">
const dialogStore = useDialogStore("client_types");

const clientTypesStore = useClientTypesStore("");
function dataGet(param: any) {
  if (param === 1) {
    clientTypesStore.getData(true);
  } else if (param === 2) {
    clientTypesStore.getData(false);
  }
}
// Hooks
onMounted(() => {
  clientTypesStore.getData(true);
});
</script>

<style scoped></style>
