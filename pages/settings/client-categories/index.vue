<template>
  <div>
    <RoundedWhiteContainer>
      <div class="grid grid-cols-2 justify-items-stretch w-full mb-4 items-center">
        <div>
          <span class="text-lg font-semibold"> 5. Категория клиента </span>
        </div>
        <div class="justify-self-end">
          <m-btn @click="dialogStore.openDialog" class="justify-self-auto">
            Добавить Категорию клиента
          </m-btn>
        </div>
      </div>
      <DoubleTab
        first-tab-name="Активный"
        second-tab-name="Не активный"
        @change="dataGet"
      >
        <template #first>
          <SettingsClientCategoriesTableData />
        </template>
        <template #second>
          <SettingsClientCategoriesTableData />
        </template>
      </DoubleTab>
    </RoundedWhiteContainer>
    <transition name="modal">
      <div v-if="dialogStore.isDialogOpen">
        <d-modal
          @closeDialog="dialogStore.closeDialog"
          :name="
            dialogStore?.singleData?.id
              ? 'Сохранить Категорию клиента'
              : 'Добавить Категорию клиента'
          "
        >
          <SettingsClientCategoriesDataDialog />
        </d-modal>
      </div>
    </transition>
    <loading-modal v-if="clientCategoriesStore.loading">
      <Loading />
    </loading-modal>
  </div>
</template>

<script setup lang="ts">
const dialogStore = useDialogStore("client_categories");

const clientCategoriesStore = useClientCategoriesStore("");
function dataGet(param: any) {
  if (param === 1) {
    clientCategoriesStore.getData(true);
  } else if (param === 2) {
    clientCategoriesStore.getData(false);
  }
}
// Hooks
onMounted(() => {
  clientCategoriesStore.getData(true);
});
</script>

<style scoped></style>
