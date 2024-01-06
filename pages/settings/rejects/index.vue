<template>
  <div>
    <RoundedWhiteContainer>
      <div
        class="grid grid-cols-2 justify-items-stretch w-full mb-4 items-center"
      >
        <div>
          <span class="text-lg font-semibold"> 11. Причины отказа </span>
        </div>
        <div class="justify-self-end">
          <m-btn @click="dialogStore.openDialog" class="justify-self-auto">
            Добавить причину
          </m-btn>
        </div>
      </div>
      <DoubleTab
        first-tab-name="Активный"
        second-tab-name="Не активный"
        @change="dataGet"
      >
        <template #first>
          <SettingsRejectsTableData :rejectsStore="rejectsStore" />
        </template>
        <template #second>
          <SettingsRejectsTableData :rejectsStore="rejectsStore" />
        </template>
      </DoubleTab>
    </RoundedWhiteContainer>
    <transition name="modal">
      <div v-if="dialogStore.isDialogOpen">
        <d-modal @closeDialog="dialogStore.closeDialog" name="Причины отказа">
          <SettingsRejectsDataDialog :rejectsStore="rejectsStore"/>
        </d-modal>
      </div>
    </transition>
    <loading-modal v-if="rejectsStore.loading"
                   name="Управление меню таблицы">
      <Loading/>
    </loading-modal>
  </div>
</template>

<script setup lang="ts">
const dialogStore = useDialogStore("rejects");

const rejectsStore = useRejectsStore("");

function dataGet(param: any) {
  if (param === 1) {
    rejectsStore.getData(true);
  } else if (param === 2) {
    rejectsStore.getData(false);
  }
}
// Hooks
onMounted(() => {
  rejectsStore.getData(true);
});
</script>

<style scoped></style>
