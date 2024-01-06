<template>
  <div v-click-outside="clickOutside">
    <div class="mt-[29px]">
      <span class="text-[24px] font-semibold"> Выполнение плана </span>
    </div>
    <div class="mt-4">
      <PlanTopTabs
        @updateModalValue="changeDialogValue()"
        @updateModal2Value="changeDialog2Value()"
      />
    </div>
    <div class="mt-4">
      <PlanWorkedOutProgressBar />
    </div>

    <div class="mt-4">
      <PlanFilterCard />
    </div>
    <div class="mt-4">
      <DoubleTab
        first-tab-name="По месяцам"
        :borderless="true"
        second-tab-name="По дням"
      >
        <template #first>
          <PlanDataTable :is-active="true" />
        </template>
        <template #second>
          <PlanDataTable :is-active="false" />
        </template>
      </DoubleTab>
    </div>
    <transition name="modal">
      <div v-if="popUpIsOpen">
        <d-modal
          @closeDialog="onClosePopUp"
          :name="'Настроить вес категорий'"
          :dataContainerWidth="'824px'"
        >
          <PlanDataDialog />
        </d-modal>
      </div>
    </transition>
    <transition name="modal">
      <div v-if="popUp2IsOpen">
        <d-modal
          @closeDialog="onClose2PopUp"
          :name="'Кол-во рабочий дней'"
          :dataContainerWidth="'774px'"
        >
          <PlanCalendar />
        </d-modal>
      </div>
    </transition>
  </div>
</template>

<script setup>
// data
const popUpIsOpen = ref(false);
const popUp2IsOpen = ref(false);
//methods
function onClosePopUp() {
  popUpIsOpen.value = false;
  popUp2IsOpen.value = false;
}

function clickOutside() {
  popUpIsOpen.value = false;
  popUp2IsOpen.value = false;
}
function changeDialogValue() {
  popUpIsOpen.value = !popUpIsOpen.value;

  function changeDialog2Value() {
    popUp2IsOpen.value = !popUp2IsOpen.value;
  }
}
</script>
