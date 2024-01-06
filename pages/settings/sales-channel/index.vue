<template>
  <div>
    <RoundedWhiteContainer>
      <div
        class="grid grid-cols-2 justify-items-stretch w-full mb-4 items-center"
      >
        <div>
          <span class="text-lg font-semibold"> 23. Канал сбыта </span>
        </div>
        <div class="justify-self-end">
          <m-btn @click="dialogStore.openDialog" class="justify-self-auto">
            Добавить канал
          </m-btn>
        </div>
      </div>
      <DoubleTab
        first-tab-name="Активный"
        second-tab-name="Не активный"
        @change="dataGet"
      >
        <template #first>
          <SettingsSalesChannelActiveData
            :salesChannelsStore="salesChannelsStore"
          />
        </template>
        <template #second>
          <SettingsSalesChannelActiveData
            :salesChannelsStore="salesChannelsStore"
          />
        </template>
      </DoubleTab>
    </RoundedWhiteContainer>
    <transition name="modal">
      <div v-if="dialogStore.isDialogOpen">
        <d-modal
          @closeDialog="dialogStore.closeDialog"
          :name="dialogStore?.singleData?.id ? 'Сохранить канал' : 'Добавить канал'"
        >
          <SettingsSalesChannelDialogBody :salesChannelsStore="salesChannelsStore"/>
        </d-modal>
      </div>
    </transition>
    <loading-modal v-if="salesChannelsStore.loading"
                   name="Управление меню таблицы">
      <Loading/>
    </loading-modal>
  </div>
</template>
<script setup>
import { useSalesChannelsStore } from "~/stores/settings/sales-channels/sales-channels.store";

const dialogStore = useDialogStore("sales-channels");
const salesChannelsStore = useSalesChannelsStore("");
const dataGet = (value) => {
  if (value === 1) {
    salesChannelsStore.getData(true);
  } else if (value === 2) {
    salesChannelsStore.getData(false);
  }
};
// Hooks
onMounted(() => {
  salesChannelsStore.getData(true);
});
</script>

<style scoped></style>
