<template>
  <div class="mt-6">
    <page-title :title="'Отчёт по кол-во заказов'" class="!my-6" />
    <ReportsNumberOfOrdersFiltr />
    <ReportsCustomerClientDataTable
      :headers="headers"
      :loadedData="loadedData"
    />
  </div>
</template>
<script setup>
let headers = ref([
  {
    name: "Т.Т",
    checked: true,
    key: "id",
    type: "id",
    thWidth: "20px",
  },
  {
    name: "Номер тел.",
    checked: true,
    key: "tt",
    type: "tt",
    thWidth: "100px",
    bRadius: "8px",
  },
  {
    name: "Т.П",
    checked: true,
    key: "tt",
    type: "tt",
    thWidth: "100px",
    bRadius: "8px",
  },
  {
    name: "Заказ",
    checked: true,
    key: "telt",
    type: "telt",
    thWidth: "80px",
  },
  {
    name: "Возврат с полки",
    checked: true,
    key: "agents",
    type: "agents",
    // thWidth: "100px",
  },
  {
    name: "Обмен",
    checked: true,
    key: "agents",
    type: "agents",
    // thWidth: "80px",
  },
])

const loadedData = ref([
  {
    id: "TTS savdo",
    tt: "+998 97 628 28 82",
    telt: "Агент 001",
    agents: "165",
    day: "165",
    visit: "165",
  },
  {
    id: "TTS savdo",
    tt: "+998 97 628 28 82",
    telt: "Агент 001",
    agents: "165",
    day: "165",
    visit: "165",
  },
  {
    id: "TTS savdo",
    tt: "+998 97 628 28 82",
    telt: "Агент 001",
    agents: "165",
    day: "165",
    visit: "165",
  },
  {
    id: "TTS savdo",
    tt: "+998 97 628 28 82",
    telt: "Агент 001",
    agents: "165",
    day: "165",
    visit: "165",
  },
  {
    id: "TTS savdo",
    tt: "+998 97 628 28 82",
    telt: "Агент 001",
    agents: "165",
    day: "165",
    visit: "165",
  },
  {
    id: "TTS savdo",
    tt: "+998 97 628 28 82",
    telt: "Агент 001",
    agents: "165",
    day: "165",
    visit: "165",
  },
])
</script>
