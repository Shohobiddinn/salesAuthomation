<template>
  <div>
    <div class="my-[29px]">
      <RoundedWhiteContainer>
        <div
          class="grid grid-cols-2 justify-items-stretch w-full mb-4 items-center"
        >
          <div>
            <span class="text-lg font-semibold"> 11. Комменты </span>
          </div>
          <div class="justify-self-end">
            <m-btn class="justify-self-auto"> Добавить </m-btn>
          </div>
        </div>
        <DoubleTab first-tab-name="Активный" second-tab-name="Не активный">
          <template #first>
            <AuditSettingsCommentsDataTable
              :is-active="true"
              @updateModalValue="changeDialogValue()"
            />
          </template>
          <template #second>
            <AuditSettingsCommentsDataTable
              :is-active="false"
              @updateModalValue="changeDialogValue()"
            />
          </template>
        </DoubleTab>
      </RoundedWhiteContainer>
    </div>

    <transition name="modal">
      <div v-if="popUpIsOpen">
        <d-modal
          @closeDialog="onClosePopUp"
          :name="'Изменить'"
          :dataContainerWidth="'405px'"
        >
          <AuditSettingsCommentsDataDialog />
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
