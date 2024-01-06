<template>
  <div>
    <RoundedWhiteContainer>
      <div
        class="grid grid-cols-2 justify-items-stretch w-full mb-4 items-center"
      >
        <div>
          <span class="text-lg font-semibold"> 19. Примечание к заказу </span>
        </div>
        <div class="justify-self-end">
          <m-btn @click="dialogStore.openDialog" class="justify-self-auto">
            Добавить примечание
          </m-btn>
        </div>
      </div>
      <DoubleTab first-tab-name="Активный" second-tab-name="Не активный">
        <template #first>
          <SettingsOrderCommentsTableData :is-active="true" />
        </template>
        <template #second>
          <SettingsOrderCommentsTableData :is-active="false" />
        </template>
      </DoubleTab>
    </RoundedWhiteContainer>
    <transition name="modal">
      <div v-if="dialogStore.isDialogOpen">
        <d-modal
          @closeDialog="dialogStore.closeDialog"
          name="Добавить примечание"
        >
          <SettingsOrderCommentsDataDialog />
        </d-modal>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
const dialogStore = useDialogStore("order_comments");
</script>

<style scoped></style>
