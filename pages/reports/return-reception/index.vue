<template>
  <div class="flex flex-col gap-6 py-9.5 px-5">
    <back-btn @click="$router.go(-1)" class="w-1/8"></back-btn>
    <p-title>Прием возврат</p-title>
    <flex-row class="gap-7.5 w-full" v-click-outside="clickOutside">
      <div class="flex gap-7.5 items-center w-2/5">
        <div class="text-black text-base min-w-fit">Выбрать эспедитора</div>
        <multiply-selections
          :filter="filter.isSelectExpeditor"
          @toggle="(toggle) => (filter.isSelectExpeditor = toggle)"
          class="w-4/5"
        />
      </div>
      <div class="flex gap-7.5 items-center w-2/5">
        <div class="text-black text-base min-w-fit">Склад возврата</div>
        <multiply-selections
          :filter="filter.isSelectReturnWarehouse"
          @toggle="(toggle) => (filter.isSelectReturnWarehouse = toggle)"
          class="w-4/5"
        />
      </div>
      <menu-btn class="w-1/5">
        <template #btn>
          <m-btn-outlined class="w-full border-color-primary bg-white">
            <div class="flex flex-row items-center gap-2 fs-14 fw-4 h-8">
              <IconCalendarSVG />
              03.11.2022 - 03.11.2022
            </div>
          </m-btn-outlined>
        </template>
        <template #content>
          <div class="flex flex-col gap-4">
            <button class="flex justify-between gap-4">
              <span class="whitespace-nowrap"> Реальное время </span>
              <fa-icon hash="&#xf00c" />
            </button>
            <button class="flex justify-between gap-4">
              <span class="whitespace-nowrap"> Выбрать дату </span>
              <fa-icon hash="&#xf00c" />
            </button>
            <div class="flex flex-row gap-2">
              <input class="border-1 p-2 rounded-lg" type="date" />
              <input class="border-1 p-2 rounded-lg" type="date" />
            </div>
            <div class="flex flex-row gap-2">
              <button class="w-full fs-14 fw-4 bg-gray-100 p-2 rounded-lg">
                Отменить
              </button>
              <m-btn class="w-full"> Применить </m-btn>
            </div>
          </div>
        </template>
      </menu-btn>
    </flex-row>
    <ReportsTaraDataTable
      :headers="headers"
      :loadedData="loadedData"
      :lastRowBold="true"
    />
  </div>
</template>

<script setup lang="ts">
const filter = ref({
  isSelectExpeditor: false,
  isSelectReturnWarehouse: false,
});

const headers = ref([
  {
    name: "Эспедитор",
    checked: true,
    key: "expeditor",
    type: "expeditor",
    thWidth: "120px",
  },
  {
    name: "Дата возврата",
    checked: true,
    key: "returnDate",
    type: "returnDate",
    thWidth: "140px",
  },
  {
    name: "Возврат",
    checked: true,
    key: "return",
    type: "return",
    thWidth: "140px",
  },
  {
    name: "Догруз",
    checked: true,
    key: "cargo",
    type: "cargo",
    thWidth: "140px",
  },
  {
    name: "Прием склада",
    checked: true,
    key: "warehouseReception",
    type: "warehouseReception",
    thWidth: "140px",
  },
  {
    name: "Списания",
    checked: true,
    key: "writeOffs",
    type: "writeOffs",
    thWidth: "140px",
  },
  {
    name: "Остатки",
    checked: true,
    key: "remains",
    type: "remains",
    thWidth: "120px",
  },
]);

const loadedData = ref([
  {
    expeditor: "Abdumalik labo",
    returnDate: "03.11.2022",
    return: "1523",
    cargo: "1523",
    warehouseReception: "1523",
    writeOffs: "1523",
    remains: "1523",
  },
  {
    expeditor: "Abdumalik labo",
    returnDate: "03.11.2022",
    return: "1523",
    cargo: "1523",
    warehouseReception: "1523",
    writeOffs: "1523",
    remains: "1523",
  },
  {
    expeditor: "Abdumalik labo",
    returnDate: "03.11.2022",
    return: "1523",
    cargo: "1523",
    warehouseReception: "1523",
    writeOffs: "1523",
    remains: "1523",
  },
  {
    expeditor: "Abdumalik labo",
    returnDate: "03.11.2022",
    return: "1523",
    cargo: "1523",
    warehouseReception: "1523",
    writeOffs: "1523",
    remains: "1523",
  },
  {
    expeditor: "Abdumalik labo",
    returnDate: "03.11.2022",
    return: "1523",
    cargo: "1523",
    warehouseReception: "1523",
    writeOffs: "1523",
    remains: "1523",
  },
  {
    expeditor: "Abdumalik labo",
    returnDate: "03.11.2022",
    return: "1523",
    cargo: "1523",
    warehouseReception: "1523",
    writeOffs: "1523",
    remains: "1523",
  },
  {
    expeditor: "Abdumalik labo",
    returnDate: "03.11.2022",
    return: "1523",
    cargo: "1523",
    warehouseReception: "1523",
    writeOffs: "1523",
    remains: "1523",
  },
  {
    expeditor: "Abdumalik labo",
    returnDate: "03.11.2022",
    return: "1523",
    cargo: "1523",
    warehouseReception: "1523",
    writeOffs: "1523",
    remains: "1523",
  },
  {
    expeditor: "Abdumalik labo",
    returnDate: "03.11.2022",
    return: "1523",
    cargo: "1523",
    warehouseReception: "1523",
    writeOffs: "1523",
    remains: "1523",
  },
  {
    expeditor: "Итого",
    returnDate: "03.11.2022",
    return: "1523",
    cargo: "1523",
    warehouseReception: "1523",
    writeOffs: "1523",
    remains: "1523",
  },
]);
</script>
