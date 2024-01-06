<template>
  <div>
    <div>
      <RoundedWhiteContainer>
        <div
          class="grid grid-cols-2 justify-items-stretch w-full mb-4 items-center"
        >
          <div>
            <span class="text-lg font-semibold">
              12. Причины Обмена и возврата
            </span>
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
            <SettingsRejectDefectsTableData
              :rejectDefectsStore="rejectDefectsStore"
            />
          </template>
          <template #second>
            <SettingsRejectDefectsTableData
              :rejectDefectsStore="rejectDefectsStore"
            />
          </template>
        </DoubleTab>
      </RoundedWhiteContainer>
      <transition name="modal">
        <div v-if="dialogStore.isDialogOpen">
          <d-modal
            @closeDialog="dialogStore.closeDialog"
            name="Причины Обмена и возврата"
          >
            <SettingsRejectDefectsDataDialog :rejectDefectsStore="rejectDefectsStore"/>
          </d-modal>
        </div>
      </transition>
    </div>
    <loading-modal v-if="rejectDefectsStore.loading"
                   name="Управление меню таблицы">
      <Loading/>
    </loading-modal>
  </div>
</template>

<script setup lang="ts">
const dialogStore = useDialogStore("reject_defects");
const rejectDefectsStore = useRejectDefectsStore("");
function dataGet(param: any) {
  if (param === 1) {
    rejectDefectsStore.getData(true);
  } else if (param === 2) {
    rejectDefectsStore.getData(false);
  }
}
// Hooks
onMounted(async () => {
  await rejectDefectsStore.getData(true);
});
</script>

<style scoped></style>
