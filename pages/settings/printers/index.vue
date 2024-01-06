<template>
  <div>
    <RoundedWhiteContainer>
      <div
        class="grid grid-cols-2 justify-items-stretch w-full mb-4 items-center"
      >
        <div>
          <span class="text-lg font-semibold"> 28. Принтеры </span>
        </div>
        <div class="justify-self-end">
          <m-btn @click="dialogStore.openDialog" class="justify-self-auto">
            Добавить принтер
          </m-btn>
        </div>
      </div>
      <DoubleTab first-tab-name="Активный" second-tab-name="Не активный">
        <template #first>
          <SettingsPrintersActiveData :is_active="true" />
        </template>
        <template #second>
          <SettingsPrintersActiveData :is_active="false" />
        </template>
      </DoubleTab>
    </RoundedWhiteContainer>
    <transition name="modal">
      <div v-if="dialogStore.isDialogOpen">
        <d-modal
          @closeDialog="dialogStore.closeDialog"
          :name="dialogStore?.singleData?.id ? 'Сохранить тип базы знаний' : 'Добавить тип базы знаний'"
        >
          <SettingsPrintersDialogBody />
        </d-modal>
      </div>
    </transition>

  </div>
</template>
<script setup>
const dialogStore = useDialogStore("printers");
</script>

<style scoped></style>
