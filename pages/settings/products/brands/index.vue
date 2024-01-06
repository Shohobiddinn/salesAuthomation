<template>
  <div>
    <rounded-white-container>
      <div class="flex flex-row items-center justify-between my-4">
        <transparent-btn
          class="border-1"
          @click="$router.push('/settings/products')"
        >
          <fa-icon hash="&#xf060"/> Назад
        </transparent-btn>
        <m-btn @click="dialogStore.openDialog"> Добавить </m-btn>
      </div>
      <div class="flex flex-row my-4">
        <span class="text-lg font-semibold"> Бренды </span>
      </div>
      <DoubleTab
        first-tab-name="Активный"
        second-tab-name="Не активный"
        @change="dataGet"
      >
        <template #first>
          <SettingsProductsBrandsDataTable :brandsStore="brandsStore" />
        </template>
        <template #second>
          <SettingsProductsBrandsDataTable :brandsStore="brandsStore" />
        </template>
      </DoubleTab>
    </rounded-white-container>
    <transition name="modal">
      <div v-if="dialogStore.isDialogOpen">
        <d-modal @closeDialog="dialogStore.closeDialog" :name="'Добавить'">
          <SettingsProductsBrandsNewBrand />
        </d-modal>
      </div>
    </transition>
  </div>
</template>

<script setup>

const dialogStore = useDialogStore("brands");

const brandsStore = useBrandsStore(true);
function dataGet(param) {
  if (param === 1) {
    brandsStore.getData(true);
  } else if (param === 2) {
    brandsStore.getData(false);
  }
}
// Hooks
onMounted(() => {
  brandsStore.getData(true);
});
</script>

<style scoped></style>
