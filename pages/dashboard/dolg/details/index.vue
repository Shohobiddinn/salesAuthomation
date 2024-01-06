<template>
  <div class="py-10 px-5 flex flex-col gap-6">
    <back-btn @click="$router.go(-1)" class="w-1/8"></back-btn>
    <p-title>Саша (Van-selling)</p-title>
    <DashboardDolgDataTable :headers="headers" :loadedData="loadedData" />
  </div>
</template>

<script setup lang="ts">
let headers = ref([
  {
    name: "ID Клиента",
    checked: true,
    key: "id",
    type: "id",
    thWidth: "120px",
  },
  {
    name: "Название",
    checked: true,
    key: "name",
    type: "name",
    thWidth: "120px",
  },
  {
    name: "ИНН",
    checked: true,
    key: "inn",
    type: "inn",
    thWidth: "120px",
  },
  {
    name: "Территория",
    checked: true,
    key: "territory",
    type: "territory",
    thWidth: "120px",
  },
  {
    name: "Номер телефона",
    checked: true,
    key: "phoneNumber",
    type: "phoneNumber",
    thWidth: "140px",
  },
  {
    name: "Общий",
    checked: true,
    key: "total",
    type: "total",
    thWidth: "120px",
  },
]);
const loadedData = ref([
  {
    id: "ID - 1235",
    name: "Jamoliddin",
    inn: "13585698",
    territory: "Алмазар",
    phoneNumber: "+998 97 628 28 82",
    total: "100 000 000",
  },
  {
    id: "ID - 1235",
    name: "Jamoliddin",
    inn: "13585698",
    territory: "Алмазар",
    phoneNumber: "+998 97 628 28 82",
    total: "100 000 000",
  },
  {
    id: "ID - 1235",
    name: "Jamoliddin",
    inn: "13585698",
    territory: "Алмазар",
    phoneNumber: "+998 97 628 28 82",
    total: "100 000 000",
  },
  {
    id: "ID - 1235",
    name: "Jamoliddin",
    inn: "13585698",
    territory: "Алмазар",
    phoneNumber: "+998 97 628 28 82",
    total: "100 000 000",
  },
  {
    id: "ID - 1235",
    name: "Jamoliddin",
    inn: "13585698",
    territory: "Алмазар",
    phoneNumber: "+998 97 628 28 82",
    total: "100 000 000",
  },
  {
    id: "ID - 1235",
    name: "Jamoliddin",
    inn: "13585698",
    territory: "Алмазар",
    phoneNumber: "+998 97 628 28 82",
    total: "100 000 000",
  },
  {
    id: "ID - 1235",
    name: "Jamoliddin",
    inn: "13585698",
    territory: "Алмазар",
    phoneNumber: "+998 97 628 28 82",
    total: "100 000 000",
  },
]);
</script>

<style>
</style>