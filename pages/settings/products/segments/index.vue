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
        <span class="text-lg font-semibold"> Сегмент </span>
      </div>
      <DoubleTab
        first-tab-name="Активный"
        second-tab-name="Не активный"
        @change="dataGet"
      >
        <template #first>
          <SettingsProductsSegmentsDataTable />
        </template>
        <template #second>
          <SettingsProductsSegmentsDataTable />
        </template>
      </DoubleTab>
    </rounded-white-container>
    <transition name="modal">
      <div v-if="dialogStore.isDialogOpen">
        <d-modal @closeDialog="dialogStore.closeDialog" :name="'Добавить'">
          <SettingsProductsSegmentsNewSegment />
        </d-modal>
      </div>
    </transition>
  </div>
</template>

<script setup>
// Store
const dialogStore = useDialogStore("segments");
const segmentsStore = useSegmentsStore("segments");

// Methods
function dataGet(param) {
  if (param === 1) {
    segmentsStore.getData(true);
  } else if (param === 2) {
    segmentsStore.getData(false);
  }
}
// Hooks
onMounted(() => {
  segmentsStore.getData(true);
});
</script>
