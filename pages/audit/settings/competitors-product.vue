<template>
  <div>
    <div class="my-[29px]">
      <RoundedWhiteContainer>
        <div
          class="grid grid-cols-2 justify-items-stretch w-full mb-4 items-center"
        >
          <div>
            <span class="text-lg font-semibold"> Продукты конкурентов </span>
          </div>
          <div class="justify-self-end">
            <m-btn class="justify-self-auto" @click="changeDialogValue()">
              Добавить
            </m-btn>
          </div>
        </div>
        <DoubleTab first-tab-name="Активный" second-tab-name="Не активный">
          <template #first>
            <AuditSettingsCompetitorsProductDataTable :is-active="true" />
          </template>
          <template #second>
            <AuditSettingsCompetitorsProductDataTable :is-active="false" />
          </template>
        </DoubleTab>
      </RoundedWhiteContainer>
    </div>
    <transition name="modal">
      <div v-if="popUpIsOpen">
        <d-modal
          @closeDialog="onClosePopUp"
          :name="'Изменить'"
          :dataContainerWidth="'740px'"
        >
          <AuditSettingsCompetitorsProductDataDialog />
        </d-modal>
      </div>
    </transition>
  </div>
</template>
<script setup lang="ts">
//state
const popUpIsOpen = ref(false);

//methods

const onClosePopUp = () => {
  popUpIsOpen.value = false;
};

const changeDialogValue = () => {
  popUpIsOpen.value = !popUpIsOpen.value;
};
</script>
