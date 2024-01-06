<template>
  <div>
    <div
      class="grid grid-cols-2 justify-items-stretch w-full mb-4 items-center mt-6"
    >
      <div>
        <span class="text-lg font-semibold">
          Создание ограничений для агентов
        </span>
      </div>
      <div class="flex gap-4 justify-self-end">
        <button
          @click="configurationCompanyModal = true"
          class="border-[#299B9B] flex items-center gap-2 bg-white border rounded-lg py-2 px-3 font-[500]"
        >
          <IconSettingsAlt />
          Конфигурации компании
        </button>
      </div>
    </div>
    <div>
      <CommandAgentsLimitActiveData />
    </div>
    <div class="mt-4">
      <button
        @click="onOpenMultipleEditiDalog"
        class="border-[#299B9B] border bg-white px-4 py-[9px] rounded-lg text-[16px] font-[500]"
      >
        Создать/Изменить Ограничения агентов
      </button>
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
      <div v-if="configurationCompanyModal">
        <d-modal
          :dataContainerWidth="dataContainerWidthConfig"
          @closeDialog="configurationCompanyDialog"
          :name="'Конфигурация компании'"
        >
          <div class="relative">
            <CommandAgentsLimitConfigurationCompanyDialog />
          </div>
        </d-modal>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { useNotification } from "@kyvg/vue3-notification";

// store
const agentsLimitStore = useAgentsLimitStore("main");

const agentsLimitModal = ref(false);
const configurationCompanyModal = ref(false);
function configurationCompanyDialog() {
  configurationCompanyModal.value = false;
}
function agentsLimitDialog() {
  agentsLimitModal.value = false;
}
const dataContainerWidth = ref("1140px");
const dataContainerWidthConfig = ref("540px");

const onOpenMultipleEditiDalog = () => {
  if (agentsLimitStore.editMultipleDialog.length > 0) {
    agentsLimitModal.value = true;
  } else {
    const { notify } = useNotification();
    notify({ title: "Сначала выберите несколько агентов!", type: "error" });
  }
};
</script>

<style scoped></style>
