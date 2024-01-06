<template>
  <div class="flex flex-col gap-7.5 py-9 px-5">
    <div class="flex justify-between">
      <p-title>Долги</p-title>

      <flex-row class="h-full items-end gap-2">
        <DatePicker />
        <m-btn class="w-full"> Применить </m-btn>
        <sm-btn class="px-4 py-3">
          <IconReloadSVG />
        </sm-btn>
      </flex-row>
    </div>
    <rounded-white-container>
      <h3 class="text-gray-3 text-xl font-semibold pb-2.5">По заказам</h3>
      <DoubleTab
        first-tab-name="По агентам"
        second-tab-name="По эспедиторам"
        :bgWhite="true"
      >
        <template #first>
          <DashboardDolgDataTable
            :headers="headersByOrder"
            :loadedData="loadedDataByOrder"
          />
        </template>
        <template #second>
          <DashboardDolgDataTable
            :headers="headersByOrder"
            :loadedData="loadedDataByOrder"
          />
        </template>
      </DoubleTab>
    </rounded-white-container>

    <rounded-white-container>
      <h3 class="text-gray-3 text-xl font-semibold pb-2.5">По маршрутам</h3>
      <DoubleTab first-tab-name="По агентам" :bgWhite="true">
        <template #first>
          <DashboardDolgDataTable
            :headers="headersByOrder"
            :loadedData="loadedDataByOrder"
          />
        </template>
      </DoubleTab>
    </rounded-white-container>
  </div>
</template>

<script setup lang="ts">
const headersByOrder = ref([
  {
    name: "Select all",
    key: "selected",
    checked: true,
    type: "checkbox",
    value: false,
  },
  {
    name: "№",
    checked: true,
    key: "number",
    type: "number",
    thWidth: "40px",
  },
  {
    name: "Названия",
    checked: true,
    key: "name",
    type: "name",
    thWidth: "120px",
  },
  {
    name: "Aктивный ",
    checked: true,
    key: "isActive",
    type: "isActive",
    thWidth: "120px",
  },
  {
    name: "Общий",
    checked: true,
    key: "total",
    type: "total",
    thWidth: "120px",
  },
]);

const loadedDataByOrder = ref([
  {
    number: 1,
    name: "Shamsiddin",
    isActive: true,
    total: "100 000 000",
  },
  {
    number: 2,
    name: "Shamsiddin",
    isActive: true,
    total: "100 000 000",
  },
  {
    number: 3,
    name: "Shamsiddin",
    isActive: true,
    total: "100 000 000",
  },
  {
    number: 4,
    name: "Shamsiddin",
    isActive: true,
    total: "100 000 000",
  },
  {
    number: 5,
    name: "Shamsiddin",
    isActive: true,
    total: "100 000 000",
  },
  {
    number: 6,
    name: "Shamsiddin",
    isActive: true,
    total: "100 000 000",
  },
]);
</script>

<style>
</style>