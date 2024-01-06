<template>
  <div>
    <RoundedWhiteContainer>
      <div
        class="grid grid-cols-2 justify-items-stretch w-full mb-4 items-center"
      >
        <div>
          <span class="text-lg font-semibold"> 29. Тара </span>
        </div>
        <div class="justify-self-end">
          <m-btn @click="dialogStore.openDialog" class="justify-self-auto">
            Добавить тара
          </m-btn>
        </div>
      </div>
      <DoubleTab
        first-tab-name="Активный"
        second-tab-name="Не активный"
        @change="dataGet"
      >
        <template #first>
          <SettingsTarasActiveData :tarasStore="tarasStore" />
        </template>
        <template #second>
          <SettingsTarasActiveData :tarasStore="tarasStore" />
        </template>
      </DoubleTab>
    </RoundedWhiteContainer>
    <data-model-two
      v-if="dialogStore.isDialogOpen"
      @closeDialog="dialogStore.closeDialog"
      :name="dialogStore?.singleData?.id ? 'Сохранить тару' : 'Добавить тару'"
    >
      <SettingsTarasTaraDialogBody :tarasStore="tarasStore"/>
    </data-model-two>
    <loading-modal v-if="tarasStore.loading"
                   name="Управление меню таблицы">
      <Loading/>
    </loading-modal>
  </div>
</template>
<script setup>
import { useTarasStore } from "~/stores/settings/taras/taras.store";

const dialogStore = useDialogStore("taras");

const tarasStore = useTarasStore("");
const dataGet = (value) => {
  if (value === 1) {
    tarasStore.getData(true);
  } else if (value === 2) {
    tarasStore.getData(false);
  }
};
// Hooks
onMounted(() => {
  tarasStore.getData(true);
});
</script>

<style scoped></style>
