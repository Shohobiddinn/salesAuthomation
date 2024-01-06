<template>
  <div v-click-outside="clickOutside" class="py-9 px-5">
    <div class="flex justify-between">
      <back-btn @click="$router.go(-1)"></back-btn>
      <NuxtLink
        to="/audit/add-audit"
        class="w-1/7 rounded-lg bg-[#299B9B] text-white flex justify-center items-center"
      >
        Добавить
      </NuxtLink>
    </div>
    <div class="flex flex-col pt-6 pb-5">
      <h3 class="font-semibold text-2xl text-black text-gray-3 pb-9">Аудиты</h3>
      <auditSmallDataTable
        :headers="surveyTableHeader"
        :loadedData="surveyTableLoadedData"
        :dataWithIcons="true"
        @onOpenPopUp="onOpenpositionsPopUp"
      />
    </div>
    <transition name="modal">
      <div v-if="positionsPopUpIsOpen">
        <d-modal
          @closeDialog="onClosePositionsPopUp"
          :name="'Позиции'"
          :dataContainerWidth="'70%'"
          class="m-8"
        >
          <auditSurveysPositions />
        </d-modal>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
const positionsPopUpIsOpen = ref(false);

const onOpenpositionsPopUp = () => {
  positionsPopUpIsOpen.value = true;
};

const onClosePositionsPopUp = () => {
  positionsPopUpIsOpen.value = false;
};

const clickOutside = () => {
  positionsPopUpIsOpen.value = false;
};

const surveyTableHeader = ref([
  {
    name: "ID",
    checked: true,
    key: "id",
    thWidth: "120px",
    type: "come",
  },
  {
    name: "Название",
    checked: true,
    key: "name",
    thWidth: "120px",
    type: "come",
  },
  {
    name: "Aктивный ",
    checked: true,
    key: "activity",
    thWidth: "120px",
    type: "come",
  },
  {
    name: "Обязательный",
    checked: true,
    key: "required",
    thWidth: "120px",
    type: "come",
  },
  {
    name: "Дата изменение",
    checked: true,
    key: "dateChanged",
    thWidth: "120px",
    type: "come",
  },
  {
    name: "",
    checked: true,
    key: "icons",
    thWidth: "240px",
    type: "come",
  },
]);

const surveyTableLoadedData = ref([
  {
    id: "ID 13268",
    name: "Опрос 1",
    activity: true,
    required: false,
    dateChanged: "04.11.2022",
    icons: "addAndDelete",
  },
  {
    id: "ID 13268",
    name: "Опрос 1",
    activity: false,
    required: false,
    dateChanged: "04.11.2022",
    icons: "addAndDelete",
  },
  {
    id: "ID 13268",
    name: "Опрос 1",
    activity: true,
    required: false,
    dateChanged: "04.11.2022",
    icons: "addAndDelete",
  },
  {
    id: "ID 13268",
    name: "Опрос 1",
    activity: true,
    required: false,
    dateChanged: "04.11.2022",
    icons: "addAndDelete",
  },
  {
    id: "ID 13268",
    name: "Опрос 1",
    activity: true,
    required: false,
    dateChanged: "04.11.2022",
    icons: "addAndDelete",
  },
  {
    id: "ID 13268",
    name: "Опрос 1",
    activity: true,
    required: false,
    dateChanged: "04.11.2022",
    icons: "addAndDelete",
  },
  {
    id: "ID 13268",
    name: "Опрос 1",
    activity: true,
    required: false,
    dateChanged: "04.11.2022",
    icons: "addAndDelete",
  },
  {
    id: "ID 13268",
    name: "Опрос 1",
    activity: true,
    required: false,
    dateChanged: "04.11.2022",
    icons: "addAndDelete",
  },
]);
</script>
