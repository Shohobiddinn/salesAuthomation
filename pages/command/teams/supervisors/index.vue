<template>
  <div>
    <div>
      <rounded-white-container>
        <div class="flex justify-between mb-4">
          <div class="text-[18px] font-[600]">2. Супервайзеры</div>
          <div class="flex">
            <m-btn @click="supervisorsModal = true">Добавить</m-btn>
          </div>
        </div>
        <DoubleTab first-tab-name="Активный" second-tab-name="Не активный">
          <template #first>
            <CommandTeamsSupervisorsActiveData :is-active="true" />
          </template>
          <template #second>
            <CommandTeamsSupervisorsNoActiveData :is-active="false" />
          </template>
        </DoubleTab>
      </rounded-white-container>
    </div>
    <transition name="modal">
      <div v-if="supervisorsModal">
        <d-modal
          @closeDialog="supervisorsDialog"
          :name="'Добавить супервайзера'"
          :dataContainerWidth="'450px'"
        >
          <CommandTeamsSupervisorsDialogBody
            @closeDialog="supervisorsDialog"
          ></CommandTeamsSupervisorsDialogBody>
        </d-modal>
      </div>
    </transition>
  </div>
</template>

<script setup>
const supervisorsModal = ref(false);
function supervisorsDialog() {
  supervisorsModal.value = false;
}
</script>

<style scoped></style>
