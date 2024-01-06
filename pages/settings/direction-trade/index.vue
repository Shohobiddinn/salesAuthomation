<template>
  <div>
    <RoundedWhiteContainer>
      <div
        class="grid grid-cols-2 justify-items-stretch w-full mb-4 items-center"
      >
        <div>
          <span class="text-lg font-semibold"> 22. Направление торговли </span>
        </div>
        <div class="justify-self-end">
          <m-btn @click="dialogStore.openDialog" class="justify-self-auto">
            Добавить направление
          </m-btn>
        </div>
      </div>
      <DoubleTab
        first-tab-name="Активный"
        second-tab-name="Не активный"
        @change="dataGet"
      >
        <template #first>
          <SettingsDirectionTradeActiveData
            :tradeDirectionsStore="tradeDirectionsStore"
          />
        </template>
        <template #second>
          <SettingsDirectionTradeActiveData
            :tradeDirectionsStore="tradeDirectionsStore"
          />
        </template>
      </DoubleTab>
    </RoundedWhiteContainer>
    <transition name="modal">
      <div v-if="dialogStore.isDialogOpen">
        <d-modal
          @closeDialog="dialogStore.closeDialog"
          :name="dialogStore?.singleData?.id ? 'Сохранить направление' :'Добавить направление'"
        >
          <SettingsDirectionTradeDialogBody :tradeDirectionsStore="tradeDirectionsStore"/>
        </d-modal>
      </div>
    </transition>
    <loading-modal v-if="tradeDirectionsStore.loading"
                   name="Управление меню таблицы">
      <Loading/>
    </loading-modal>
  </div>
</template>
<script setup>
import { useTradeDirectionsStore } from "~/stores/settings/trade-directions/trade-directions.store";

const dialogStore = useDialogStore("trade-directions");
const tradeDirectionsStore = useTradeDirectionsStore("");
const dataGet = (value) => {
  if (value === 1) {
    tradeDirectionsStore.getData(true);
  } else if (value === 2) {
    tradeDirectionsStore.getData(false);
  }
};
// Hooks
onMounted(() => {
  tradeDirectionsStore.getData(true);
});
</script>

<style scoped></style>
