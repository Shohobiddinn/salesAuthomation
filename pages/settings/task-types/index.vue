<template>
  <div>
    <RoundedWhiteContainer>
      <div
        class="grid grid-cols-2 justify-items-stretch w-full mb-4 items-center"
      >
        <div>
          <span class="text-lg font-semibold"> 21. Типы задач </span>
        </div>
        <div class="justify-self-end">
          <m-btn @click="dialogStore.openDialog" class="justify-self-auto">
            Добавить тип задач
          </m-btn>
        </div>
      </div>
      <DoubleTab
        first-tab-name="Активный"
        second-tab-name="Не активный"
        @change="dataGet"
      >
        <template #first>
          <SettingsTaskTypesTableData :taskTypesStore="taskTypesStore" />
        </template>
        <template #second>
          <SettingsTaskTypesTableData :taskTypesStore="taskTypesStore" />
        </template>
      </DoubleTab>
    </RoundedWhiteContainer>
    <transition name="modal">
      <div v-if="dialogStore.isDialogOpen">
        <d-modal
          @closeDialog="dialogStore.closeDialog"
          :name="dialogStore?.singleData?.id ? 'Сохранить тип задач' : 'Добавить тип задач'"
        >
          <SettingsTaskTypesDataDialog :taskTypesStore="taskTypesStore"/>
        </d-modal>
      </div>
    </transition>
    <loading-modal v-if="taskTypesStore.loading"
                   name="Управление меню таблицы">
      <Loading/>
    </loading-modal>
  </div>
</template>

<script setup lang="ts">
const dialogStore = useDialogStore("task_types");

const taskTypesStore = useTaskTypesStore("");
const dataGet = (value: number) => {
  if (value === 1) {
    taskTypesStore.getData(true);
  } else if (value === 2) {
    taskTypesStore.getData(false);
  }
};
// Hooks
onMounted(() => {
  taskTypesStore.getData(true);
});
</script>

<style scoped></style>
