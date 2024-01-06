<template>
  <div>
    <RoundedWhiteContainer>
      <div
        class="grid grid-cols-2 justify-items-stretch w-full mb-4 items-center"
      >
        <div>
          <span class="text-lg font-semibold"> 26. База знания </span>
        </div>
        <div class="justify-self-end">
          <m-btn class="justify-self-auto">
            <nuxt-link to="/settings/knowledge-base/AddKnowledgebase"
              >Добавить базы знаний</nuxt-link
            >
          </m-btn>
        </div>
      </div>
      <DoubleTab first-tab-name="Активный" second-tab-name="Не активный">
        <template #first>
          <SettingsKnowledgeBaseActiveData />
        </template>
        <template #second>
          <SettingsKnowledgeBaseNoActiveData />
        </template>
      </DoubleTab>
    </RoundedWhiteContainer>
    <transition name="modal">
      <div v-if="knowledgeBaseModal">
        <d-modal
          @closeDialog="knowledgeDialog"
          :name="'Добавить тип базы знаний'"
        >
          <SettingsKnowledgeBaseDialogBody />
        </d-modal>
      </div>
    </transition>
  </div>
</template>
<script setup>
import { ref } from "vue";

// State
const knowledgeBaseModal = ref(false);

// Methods
function knowledgeDialog() {
  knowledgeBaseModal.value = false;
}
</script>

<style scoped></style>
