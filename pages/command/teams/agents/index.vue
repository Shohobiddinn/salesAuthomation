<template>
  <div>
    <div>
      <rounded-white-container>
        <div class="flex justify-between mb-4">
          <div class="text-[18px] font-[600]">3. Агенты</div>
          <div class="flex">
            <m-btn @click="agentsModal = true">Добавить</m-btn>
          </div>
        </div>
        <DoubleTab first-tab-name="Активный" second-tab-name="Не активный">
          <template #first>
            <CommandTeamsAgentsActiveData :is-active="true" />
          </template>
          <template #second>
            <CommandTeamsAgentsNoActiveData :is-active="false" />
          </template>
        </DoubleTab>
      </rounded-white-container>
    </div>
    <transition name="modal">
      <div v-if="agentsModal">
        <d-modal
          @closeDialog="agentsDialog"
          :dataContainerWidth="'400px'"
          :name="'Добавить агента'"
        >
          <CommandTeamsAgentsDialogBody
            @closeDialog="agentsDialog"
          ></CommandTeamsAgentsDialogBody>
        </d-modal>
      </div>
    </transition>
  </div>
</template>

<script setup>
const agentsModal = ref(false);
function agentsDialog() {
  agentsModal.value = false;
}
</script>

<style scoped></style>
