<template>
  <div v-click-outside="clickOutside">
    <div class="mt-[29px]">
      <span class="text-[24px] font-semibold"> Выполнение плана </span>
    </div>

    <div class="mt-4 grid grid-cols-3 gap-5">
      <PlanningMonthly2TopTabs
        :amount="'465'"
        :icon="'calendar'"
        :text="'Кол-во рабочий дней'"
        class="bg-[#E9F1F2]"
        @click="changeDialog2Value()"
      />

      <NuxtLink to="/planning/monthly2/check">
        <PlanningMonthly2TopTabs
          :amount="'465'"
          :icon="'check'"
          :text="'Отработано'"
          class="bg-[#EAF2E9]"
        />
      </NuxtLink>

      <NuxtLink to="/planning/monthly2/day-left">
        <PlanningMonthly2TopTabs
          :amount="'465'"
          :icon="'hourGlass'"
          :text="'Остались дни'"
          class="bg-[#E9EBF2]"
        />
      </NuxtLink>
    </div>

    <div class="mt-6">
      <PlanningOutletDataTable />
    </div>
    <transition name="modal">
      <div v-if="popUpIsOpen">
        <d-modal
          @closeDialog="onClosePopUp"
          :name="'Настроить вес категорий'"
          :dataContainerWidth="'824px'"
        >
          <PlanningMonthly2DataDialog />
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
          <PlanningMonthly2Calendar />
        </d-modal>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
// data
const popUpIsOpen = ref(false);
const popUp2IsOpen = ref(false);

//methods
function onClosePopUp() {
  popUpIsOpen.value = false;
}

function onClose2PopUp() {
  popUp2IsOpen.value = false;
}

function clickOutside() {
  popUpIsOpen.value = false;
  popUp2IsOpen.value = false;
}
function changeDialogValue() {
  popUpIsOpen.value = !popUpIsOpen.value;
}

function changeDialog2Value() {
  popUp2IsOpen.value = !popUp2IsOpen.value;
}
</script>
