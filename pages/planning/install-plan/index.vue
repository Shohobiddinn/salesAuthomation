<template>
  <div>
    <div class="mt-[29px]">
      <span class="text-[24px] font-semibold"> Установка плана </span>
    </div>

    <div class="mt-4">
      <PlanningInstallPlanDataTable @updateModalValue="changeDialogValue()" />
    </div>
    <transition name="modal">
      <div v-if="popUpIsOpen">
        <d-modal
          @closeDialog="onClosePopUp"
          :name="'Расчет рекомендации на Ноябрь 2022'"
          :dataContainerWidth="'90%'"
        >
          <PlanningInstallPlanDataDialog />
        </d-modal>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
//state
const popUpIsOpen = ref(false);

//methods
function onClosePopUp() {
  popUpIsOpen.value = false;
}

function clickOutside() {
  popUpIsOpen.value = false;
}

function changeDialogValue() {
  popUpIsOpen.value = !popUpIsOpen.value;
}
</script>
