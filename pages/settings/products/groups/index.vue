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
        <span class="text-lg font-semibold"> Группа продуктов </span>
      </div>
      <DoubleTab
        first-tab-name="Активный"
        second-tab-name="Не активный"
        @change="dataGet"
      >
        <template #first>
          <SettingsProductsGroupsDataTable
          />
        </template>
        <template #second>
          <SettingsProductsGroupsDataTable
          />
        </template>
      </DoubleTab>
    </rounded-white-container>

    <transition name="modal">
      <div v-if="dialogStore.isDialogOpen">
        <d-modal @closeDialog="dialogStore.closeDialog" :name="'Добавить'">
          <SettingsProductsGroupsNewGroup />
        </d-modal>
      </div>
    </transition>
  </div>
</template>

<script setup>
// Store
const productGroupsActiveStore = useProductGroupsStore("main");

// State
const dialogStore = useDialogStore("product_groups");

// Methods
function dataGet(param) {
  if (param === 1) {
    productGroupsActiveStore.getData(true);
  } else if (param === 2) {
    productGroupsActiveStore.getData(false);
  }
}

// Hooks
onMounted(() => {
  productGroupsActiveStore.getData(true);
});
</script>

<style scoped></style>
