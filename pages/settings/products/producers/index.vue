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
        <span class="text-lg font-semibold"> Производитель </span>
      </div>
      <DoubleTab first-tab-name="Активный" second-tab-name="Не активный">
        <template #first>
          <SettingsProductsProducersDataTable :is-active="true" />
        </template>
        <template #second>
          <SettingsProductsProducersDataTable />
        </template>
      </DoubleTab>
    </rounded-white-container>
    <transition name="modal">
      <div v-if="dialogStore.isDialogOpen">
        <d-modal @closeDialog="dialogStore.closeDialog" :name="'Добавить'">
          <SettingsProductsProducersNewProducer />
        </d-modal>
      </div>
    </transition>
  </div>
</template>

<script setup>
//Store
const dialogStore = useDialogStore("manufactures");
</script>
