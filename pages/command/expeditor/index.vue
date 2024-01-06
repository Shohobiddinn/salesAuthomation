<template>
  <div>
    <div
      class="grid grid-cols-2 justify-items-stretch w-full mb-4 items-center mt-6"
    >
      <div>
        <span class="text-lg font-semibold"> Экспедитор </span>
      </div>
      <div class="flex gap-4 justify-self-end">
        <button
          @click="configurationCompanyModal = true"
          class="border-[#299B9B] bg-white border rounded-lg py-2 px-3 font-[500]"
        >
          <div class="flex">
            <div>Общая конфигурация</div>
          </div>
        </button>
        <m-btn @click="agentsLimitModal = true" class="justify-self-auto">
          Добавить экспедитора
        </m-btn>
      </div>
    </div>
    <div>
      <DoubleTab
        first-tab-name="Активный"
        second-tab-name="Не активный"
        :initialTabNumber="getInitialTabNum"
        @change="onChangeActiveTab"
      >
        <template #first>
          <CommandExpeditorActiveData :is-active="getInitialTabNum === 1"/>
        </template>
        <template #second>
          <CommandExpeditorActiveData :is-active="getInitialTabNum === 2"/>
        </template>
      </DoubleTab>
    </div>
    <transition name="modal">
      <div v-if="agentsLimitModal">
        <d-modal
          :dataContainerWidth="'450px'"
          :name="'Добавить Экпедитора'"
          @closeDialog="agentsLimitDialog"
        >
          <CommandExpeditorDialog @closeDialog="agentsLimitDialog" />
        </d-modal>
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
            <CommandExpeditorConfigurationDialog
              @closeDialog="configurationCompanyDialog"
            />
          </div>
        </d-modal>
      </div>
    </transition>
  </div>
</template>

<script setup>
// state
const router = useRouter();
const route = useRoute();
const agentsLimitModal = ref(false);
const configurationCompanyModal = ref(false);
const dataContainerWidthConfig = ref("540px");

// methods
function configurationCompanyDialog() {
  configurationCompanyModal.value = false;
}

function agentsLimitDialog() {
  agentsLimitModal.value = false;
}

const onChangeActiveTab = (newValue) => {
  router.push({ query: { tabNum: newValue } });
};

const getInitialTabNum = computed(() => {
  return Number(route.query.tabNum) || 1;
});
</script>
