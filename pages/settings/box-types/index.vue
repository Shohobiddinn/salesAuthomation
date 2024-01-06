<template>
  <div>
    <RoundedWhiteContainer>
      <div
        class="grid grid-cols-2 justify-items-stretch w-full mb-4 items-center"
      >
        <div>
          <span class="text-lg font-semibold"> 24. Тип коробки </span>
        </div>
        <div class="justify-self-end">
          <m-btn @click="dialogStore.openDialog" class="justify-self-auto">
            Добавить тип коробки
          </m-btn>
        </div>
      </div>
      <DoubleTab
        first-tab-name="Активный"
        second-tab-name="Не активный"
        @change="dataGet"
      >
        <template #first>
          <SettingsBoxTypesTableData :boxTypesStore="boxTypesStore" />
        </template>
        <template #second>
          <SettingsBoxTypesTableData :boxTypesStore="boxTypesStore" />
        </template>
      </DoubleTab>
    </RoundedWhiteContainer>
    <transition name="modal">
      <div v-if="dialogStore.isDialogOpen">
        <d-modal
          @closeDialog="dialogStore.closeDialog"
          :name="dialogStore?.singleData?.id ? 'Сохранить тип коробки' : 'Добавить тип коробки'"
        >
          <SettingsBoxTypesDataDialog :boxTypesStore="boxTypesStore"/>
        </d-modal>
      </div>
    </transition>
    <loading-modal v-if="boxTypesStore.loading"
                   name="Управление меню таблицы">
      <Loading/>
    </loading-modal>
  </div>
</template>

<script setup lang="ts">
const dialogStore = useDialogStore("box_types");

const boxTypesStore = useBoxTypesStore("");

const dataGet = (value: any) => {
  if (value === 1) {
    boxTypesStore.getData(true);
  } else if (value === 2) {
    boxTypesStore.getData(false);
  }
};
// Hooks
onMounted(() => {
  boxTypesStore.getData(true);
});
</script>

<style scoped></style>
