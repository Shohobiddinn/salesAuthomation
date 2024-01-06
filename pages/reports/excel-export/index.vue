<template>
  <div class="mt-4">
    <DoubleTab
      first-tab-name="Версия 1"
      second-tab-name="Версия 2"
      third-tab-name="Эскпорт по клиентам"
      fourth-tab-name="JSON"
      fifth-tab-name="Детальные данные"
      borderless
    >
      <template #first>
        <ReportsExcelExportVersionOneFiltr />
        <ReportsExcelExportVersionOneCard class="mt-6" />
        <ReportsExcelExportVersionOneDataTable
          :headers="headersFirst"
          :loadedData="loadedDataFirst"
          class="mt-6"
        />
      </template>
      <template #second>
        <ReportsExcelExportVersionOneFiltr />
        <ReportsExcelExportVersionOneCard class="mt-6" />
        <ReportsExcelExportVersionOneDataTable
          :headers="headersSecond"
          :loadedData="loadedDataFirst"
          class="mt-6"
        />
      </template>
      <template #third>
        <ReportsExcelExportVersionOneFiltr />
        <ReportsExcelExportVersionOneCard class="mt-6" />
        <ReportsExcelExportVersionOneDataTable
          :headers="headersThird"
          :loadedData="loadedDataFirst"
          class="mt-6"
        />
      </template>
      <template #fourth>
        <ReportsExcelExportVersionOneFiltr />
        <ReportsExcelExportVersionOneCard class="mt-6" />
        <div class="flex mt-4">
          <m-btn> Скачать JSON (300 kb) </m-btn>
        </div>
      </template>
      <template #fifth>
        <ReportsExcelExportVersionOneFiltr />
        <div class="flex mt-4 gap-4">
          <div>
            <excel-btn :size="'340kb'" :text="'Скачать Excel.csv'"></excel-btn>
          </div>
          <div>
            <excel-btn :size="'340kb'" :text="'Скачать Excel.xls'"></excel-btn>
          </div>
        </div>
      </template>
    </DoubleTab>
  </div>
</template>
<script setup>
let headersFirst = ref([
  {
    name: "Дата отгрузки",
    checked: true,
    key: "id",
    type: "id",
    thWidth: "130px",
  },
  {
    name: "ID",
    checked: true,
    key: "tt",
    type: "tt",
    thWidth: "80px",
    bRadius: "8px",
  },
  {
    name: "Клиент",
    checked: true,
    key: "telt",
    type: "telt",
    thWidth: "100px",
  },
  {
    name: "Продукт",
    checked: true,
    key: "agents",
    type: "agents",
    thWidth: "120px",
  },
  {
    name: "Кол-во",
    checked: true,
    key: "day",
    type: "day",
    thWidth: "80px",
  },
  {
    name: "Статус",
    checked: true,
    key: "visit",
    type: "visit",
    thWidth: "80px",
  },
  {
    name: "Агент",
    checked: true,
    key: "territories",
    type: "territories",
    thWidth: "100px",
  },
  {
    name: "Код агента",
    checked: true,
    key: "territories",
    type: "territories",
    thWidth: "120px",
  },
  {
    name: "Экспедитор",
    checked: true,
    key: "territories",
    type: "territories",
    thWidth: "100px",
  },
  {
    name: "Код Экспедитора",
    checked: true,
    key: "territories",
    type: "territories",
    thWidth: "140px",
  },
  {
    name: "Сегменты клиентов",
    checked: true,
    key: "territories",
    type: "territories",
    thWidth: "160px",
  },
])
let headersSecond = ref([
  {
    name: "Дата",
    checked: true,
    key: "id",
    type: "id",
    thWidth: "80px",
  },
  {
    name: "ID Клиента",
    checked: true,
    key: "tt",
    type: "tt",
    thWidth: "120px",
  },
  {
    name: "Торговая точка",
    checked: true,
    key: "telt",
    type: "telt",
    thWidth: "140px",
  },
  {
    name: "Состояние заказа",
    checked: true,
    key: "agents",
    type: "agents",
    thWidth: "160px",
  },
  {
    name: "Склад отгрузки",
    checked: true,
    key: "day",
    type: "day",
    thWidth: "140px",
  },
  {
    name: "ТП",
    checked: true,
    key: "visit",
    type: "visit",
    thWidth: "80px",
  },
  {
    name: "Coca cola 1",
    checked: true,
    key: "territories",
    type: "territories",
    thWidth: "140px",
  },
  {
    name: "Fanta",
    checked: true,
    key: "territories",
    type: "territories",
    thWidth: "80px",
  },
  {
    name: "Pepsi",
    checked: true,
    key: "territories",
    type: "territories",
    thWidth: "80px",
  },
  {
    name: "Итого",
    checked: true,
    key: "territories",
    type: "territories",
    thWidth: "80px",
  },
])
let headersThird = ref([
  {
    name: "Дата отгрузки",
    checked: true,
    key: "id",
    type: "id",
    thWidth: "130px",
  },
  {
    name: "ID",
    checked: true,
    key: "tt",
    type: "tt",
    thWidth: "80px",
    bRadius: "8px",
  },
  {
    name: "Клиент",
    checked: true,
    key: "telt",
    type: "telt",
    thWidth: "100px",
  },
  {
    name: "Название клиента",
    checked: true,
    key: "agents",
    type: "agents",
    thWidth: "140px",
  },
  {
    name: "Продукт",
    checked: true,
    key: "agents",
    type: "agents",
    thWidth: "120px",
  },
  {
    name: "Кол-во",
    checked: true,
    key: "day",
    type: "day",
    thWidth: "80px",
  },
  {
    name: "Статус",
    checked: true,
    key: "visit",
    type: "visit",
    thWidth: "80px",
  },
  {
    name: "Агент",
    checked: true,
    key: "territories",
    type: "territories",
    thWidth: "100px",
  },
  {
    name: "Код агента",
    checked: true,
    key: "territories",
    type: "territories",
    thWidth: "120px",
  },
  {
    name: "Экспедитор",
    checked: true,
    key: "territories",
    type: "territories",
    thWidth: "100px",
  },
  {
    name: "Код Экспедитора",
    checked: true,
    key: "territories",
    type: "territories",
    thWidth: "140px",
  },
])

const loadedDataFirst = ref([
  {
    id: "14,11,2022",
    tt: "16589",
    telt: "06.12.2022",
    agents: "Дата доставки",
    day: "16589",
    visit: "Саша",
    territories: "16589",
  },
  {
    id: "14,11,2022",
    tt: "16589",
    telt: "06.12.2022",
    agents: "Дата доставки",
    day: "16589",
    visit: "Саша",
    territories: "16589",
  },
  {
    id: "14,11,2022",
    tt: "16589",
    telt: "06.12.2022",
    agents: "Дата доставки",
    day: "16589",
    visit: "Саша",
    territories: "16589",
  },
  {
    id: "14,11,2022",
    tt: "16589",
    telt: "06.12.2022",
    agents: "Дата доставки",
    day: "16589",
    visit: "Саша",
    territories: "16589",
  },
  {
    id: "14,11,2022",
    tt: "16589",
    telt: "06.12.2022",
    agents: "Дата доставки",
    day: "16589",
    visit: "Саша",
    territories: "16589",
  },
  {
    id: "14,11,2022",
    tt: "16589",
    telt: "06.12.2022",
    agents: "Дата доставки",
    day: "16589",
    visit: "Саша",
    territories: "16589",
  },
  {
    id: "14,11,2022",
    tt: "16589",
    telt: "06.12.2022",
    agents: "Дата доставки",
    day: "16589",
    visit: "Саша",
    territories: "16589",
  },
])
</script>
