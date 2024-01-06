<template>
  <div>
    <div class="my-6">
      <p-title> Продажи по клиентам 3</p-title>
    </div>
    <ReportsCustomerClientFiltr />
    <div class="my-6 grid grid-cols-4 gap-5">
      <ReportsCustomerClientCard :type="'all'" :title="'Общая'" />
      <ReportsCustomerClientCard :title="'Abdulla aka osh markazi'" />
      <ReportsCustomerClientCard :title="'Mini supermarket'" />
      <ReportsCustomerClientCard :title="'Mini supermarket'" />
      <ReportsCustomerClientCard :title="'Mini supermarket'" />
      <ReportsCustomerClientCard :title="'Mini supermarket'" />
      <ReportsCustomerClientCard :title="'Mini supermarket'" />
      <ReportsCustomerClientCard :title="'Mini supermarket'" />
    </div>
    <div class="my-6">
      <p-title> По категории клиентов </p-title>
    </div>
    <ReportsCustomerClientDataTable
      :headers="headers"
      :loadedData="loadedData"
    />
    <div class="my-6">
      <p-title> По территории </p-title>
    </div>
    <ReportsCustomerClientDataTable
      :headers="headersSecond"
      :loadedData="loadedData"
    />
    <div class="my-6">
      <p-title> По агентам </p-title>
    </div>
    <ReportsCustomerClientDataTable
      :headers="headersThird"
      :loadedData="loadedData"
    />
    <div class="my-4 grid grid-cols-2 gap-5">
      <ReportsCustomerClientChart />
      <ReportsCustomerClientChart />
    </div>
  </div>
</template>
<script setup>
let headers = ref([
  {
    name: "ID клиента",
    checked: true,
    key: "id",
    type: "id",
    thWidth: "100px",
  },
  {
    name: "Названия",
    checked: true,
    key: "tt",
    type: "tt",
    thWidth: "100px",
    bRadius: "8px",
  },
  {
    name: "Дата добавления",
    checked: true,
    key: "telt",
    type: "telt",
    thWidth: "140px",
  },
  {
    name: "Категория",
    checked: true,
    key: "agents",
    type: "agents",
    thWidth: "100px",
  },
  {
    name: "Активный",
    checked: true,
    key: "agents",
    type: "agents",
    thWidth: "100px",
  },
  {
    name: "Сумма",
    checked: true,
    key: "day",
    type: "day",
    thWidth: "80px",
  },
  {
    name: "Кол-во",
    checked: true,
    key: "visit",
    type: "visit",
    thWidth: "80px",
  },
  {
    name: "Объем",
    checked: true,
    key: "territories",
    type: "territories",
    thWidth: "80px",
  },
  {
    name: "Агент",
    checked: true,
    key: "territories",
    type: "territories",
    thWidth: "80px",
  },
  {
    name: "Код агент",
    checked: true,
    key: "territories",
    type: "territories",
    thWidth: "100px",
  },
  {
    name: "Дни посещений",
    checked: true,
    key: "territories",
    type: "territories",
    thWidth: "140px",
  },
])
let headersSecond = ref([
  {
    name: "№",
    checked: true,
    key: "id",
    type: "id",
    thWidth: "20px",
  },
  {
    name: "Территория",
    checked: true,
    key: "tt",
    type: "tt",
    thWidth: "100px",
    bRadius: "8px",
  },
  {
    name: "АКБ",
    checked: true,
    key: "telt",
    type: "telt",
    thWidth: "80px",
  },
  {
    name: "Категория",
    checked: true,
    key: "agents",
    type: "agents",
    // thWidth: "100px",
  },
  {
    name: "ОКБ",
    checked: true,
    key: "agents",
    type: "agents",
    // thWidth: "80px",
  },
  {
    name: "От ОКБ",
    checked: true,
    key: "day",
    type: "day",
    // thWidth: "100px",
  },
  {
    name: "Кол-во",
    checked: true,
    key: "visit",
    type: "visit",
    // thWidth: "80px",
  },
  {
    name: "Объем",
    checked: true,
    key: "territories",
    type: "territories",
    // thWidth: "120px",
  },
  {
    name: "Сумма",
    checked: true,
    key: "territories",
    type: "territories",
    // thWidth: "120px",
  },
])
let headersThird = ref([
  {
    name: "№",
    checked: true,
    key: "id",
    type: "id",
    thWidth: "20px",
  },
  {
    name: "Агент",
    checked: true,
    key: "tt",
    type: "tt",
    thWidth: "100px",
    bRadius: "8px",
  },
  {
    name: "Код агента",
    checked: true,
    key: "tt",
    type: "tt",
    thWidth: "100px",
    bRadius: "8px",
  },
  {
    name: "АКБ",
    checked: true,
    key: "telt",
    type: "telt",
    thWidth: "80px",
  },
  {
    name: "Категория",
    checked: true,
    key: "agents",
    type: "agents",
    // thWidth: "100px",
  },
  {
    name: "ОКБ",
    checked: true,
    key: "agents",
    type: "agents",
    // thWidth: "80px",
  },
  {
    name: "От ОКБ",
    checked: true,
    key: "day",
    type: "day",
    // thWidth: "100px",
  },
  {
    name: "Кол-во",
    checked: true,
    key: "visit",
    type: "visit",
    // thWidth: "80px",
  },
  {
    name: "Объем",
    checked: true,
    key: "territories",
    type: "territories",
    // thWidth: "120px",
  },
  {
    name: "Сумма",
    checked: true,
    key: "territories",
    type: "territories",
    // thWidth: "120px",
  },
])

const loadedData = ref([
  {
    id: "ID 132654",
    tt: "Nematjonbek",
    telt: "01.10.2022",
    agents: "Розница",
    day: "Да",
    visit: "816,000	",
    territories: "23",
  },
  {
    id: "ID 132654",
    tt: "Nematjonbek",
    telt: "01.10.2022",
    agents: "Розница",
    day: "Да",
    visit: "816,000	",
    territories: "23",
  },
  {
    id: "ID 132654",
    tt: "Nematjonbek",
    telt: "01.10.2022",
    agents: "Розница",
    day: "Да",
    visit: "816,000	",
    territories: "23",
  },
  {
    id: "ID 132654",
    tt: "Nematjonbek",
    telt: "01.10.2022",
    agents: "Розница",
    day: "Да",
    visit: "816,000	",
    territories: "23",
  },
  {
    id: "ID 132654",
    tt: "Nematjonbek",
    telt: "01.10.2022",
    agents: "Розница",
    day: "Да",
    visit: "816,000	",
    territories: "23",
  },
])
</script>
