<template>
  <div>
    <div
      class="grid grid-cols-2 justify-items-stretch w-full mb-4 items-center mt-6"
    >
      <p-title> Супервайзеры </p-title>
      <div class="flex gap-4 justify-self-end">
        <m-btn @click="supervisorsModal = true" class="justify-self-auto">
          Добавить Супервайзера
        </m-btn>
      </div>
    </div>
    <div>
      <CommandSupervisorsActiveData />
    </div>
    <transition name="modal">
      <div v-if="agentsLimitModal">
        <h-no-modal
          :dataContainerWidth="dataContainerWidth"
          @closeDialog="agentsLimitDialog"
        >
          <CommandAgentsLimitDialog />
        </h-no-modal>
      </div>
    </transition>
    <transition name="modal">
      <div v-if="supervisorsModal">
        <d-modal
          @closeDialog="supervisorsDialog"
          :name="'Добавить супервайзер'"
        >
          <div class="relative">
            <CommandSupervisorsDialogBody @closeDialog="supervisorsDialog" />
          </div>
        </d-modal>
      </div>
    </transition>
  </div>
</template>

<script setup>
const agentsLimitModal = ref(false);
const supervisorsModal = ref(false);
function supervisorsDialog() {
  supervisorsModal.value = false;
}
function agentsLimitDialog() {
  agentsLimitModal.value = false;
}
const dataContainerWidth = ref("1140px");
const dataContainerWidthConfig = ref("540px");
</script>

<style scoped></style>
