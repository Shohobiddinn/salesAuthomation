<template>
  <div>
    <RoundedWhiteContainer>
      <div class="grid grid-cols-2 justify-items-stretch w-full mb-4 items-center">
        <div>
          <span class="text-lg font-semibold"> 2. RLP Бонус </span>
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
          <SettingsRlpDiscountsActiveData />
        </template>
        <template #second>
          <SettingsRlpDiscountsActiveData />
        </template>
      </DoubleTab>
    </RoundedWhiteContainer>
    <d-modal
      v-if="dialogStore.isDialogOpen"
      @closeDialog="dialogStore.closeDialog"
      :name="dialogStore?.singleData?.id ? 'Сохранить RLP Бонус' : 'Добавить RLP Бонус'"
    >
      <SettingsRLPDiscountDialogBody />
    </d-modal>
    <loading-modal v-if="rlpBonusStore.loading" name="Управление меню таблицы">
      <Loading />
    </loading-modal>
  </div>
</template>
<script setup lang="ts">
import { useRlpBonustore } from "~/stores/settings/rlp-bonus/rlp-bonus.store";
const dialogStore = useDialogStore("rlp-discount");
// State
const rlpBonusStore = useRlpBonustore("");
// Hooks
onMounted(() => {
  rlpBonusStore.getData(true);
});

function dataGet(param) {
  if (param === 1) {
    rlpBonusStore.getData(true);
  } else if (param === 2) {
    rlpBonusStore.getData(false);
  }
}
</script>
