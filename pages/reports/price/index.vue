<template>
  <div class="mt-6">
    <page-title :title="'История изменения цен'" class="!my-6" />
    <ReportsPriceFiltr />
    <ReportsCustomerClientDataTable
      :headers="headers"
      :loadedData="loadedData"
    />
  </div>
</template>
<script setup>
let headers = ref([
  {
    name: "ID",
    checked: true,
    key: "id",
    type: "id",
    thWidth: "20px",
  },
  {
    name: "Код товара",
    checked: true,
    key: "tt",
    type: "tt",
    thWidth: "100px",
  },
  {
    name: "Категория",
    checked: true,
    key: "tt",
    type: "tt",
    thWidth: "100px",
    bRadius: "8px",
  },
  {
    name: "Продукт",
    checked: true,
    key: "telt",
    type: "telt",
    thWidth: "80px",
  },
  {
    name: "Т.П",
    checked: true,
    key: "agents",
    type: "agents",
    // thWidth: "100px",
  },
  {
    name: "12.11.2022",
    checked: true,
    key: "agents",
    type: "agents",
    // thWidth: "80px",
  },
  {
    name: "12.11.2022",
    checked: true,
    key: "agents",
    type: "agents",
    // thWidth: "80px",
  },
  {
    name: "12.11.2022",
    checked: true,
    key: "agents",
    type: "agents",
    // thWidth: "80px",
  },
  {
    name: "12.11.2022",
    checked: true,
    key: "agents",
    type: "agents",
    // thWidth: "80px",
  },
  {
    name: "12.11.2022",
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
