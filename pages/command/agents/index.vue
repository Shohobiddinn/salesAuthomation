<template>
  <div>
    <div
      class="grid grid-cols-2 justify-items-stretch w-full mb-4 items-center mt-6"
    >
      <div>
        <span class="text-lg font-semibold"> Агенты </span>
      </div>
      <div class="justify-self-end">
        <m-btn
          @click="agentStore.newAgentDialog = true"
          class="justify-self-auto"
        >
          Добавить Агента
        </m-btn>
      </div>
    </div>
    <DoubleTab
      first-tab-name="Активные"
      :borderless="true"
      second-tab-name="Удаленные"
    >
      <template #first>
        <CommandAgentsTableData :is-active="true" />
      </template>
      <template #second>
        <CommandAgentsTableData :is-active="false" />
      </template>
    </DoubleTab>
    <transition name="modal">
      <div v-if="agentStore.newAgentDialog">
        <d-modal
          :dataContainerWidth="dataContainerWidth"
          @closeDialog="agentStore.closeNewAgentDialog"
          :name="'Добавить агента'"
        >
          <CommandAgentsDialogBody
            @closeDialog="agentStore.closeNewAgentDialog"
          />
        </d-modal>
      </div>
    </transition>
  </div>
</template>
<script setup lang="ts">
const dataContainerWidth = ref("450px");

// Store
const agentStore = useAgentsStore("main");
</script>

<style scoped></style>
