<template>
  <div class="flex flex-col py-9.5 px-5 gap-6">
    <p-title>Отчёт по поступлениям</p-title>
    <div class="flex gap-5 pt-1">
      <DashboardKassaIncomeSumBox
        :title="'Наличный сум'"
        :titleColor="'text-[#94A791]'"
        :sum="'40 400 000'"
        :sumColor="'text-[#167506]'"
        class="bg-[#23c00a1a] w-1/4"
      />
      <DashboardKassaIncomeSumBox
        :title="'Без нал'"
        :titleColor="'text-[#8A8478]'"
        :sum="'40 400 000'"
        :sumColor="'text-[#66470A]'"
        class="bg-[#bd7f061a] w-1/4"
      />
      <DashboardKassaIncomeSumBox
        :title="'Без нал'"
        :titleColor="'text-[#7B7185]'"
        :sum="'40 400 000'"
        :sumColor="'text-[#3B0763]'"
        class="bg-[#F6ECFF] w-1/4"
      />
      <DashboardKassaIncomeSumBox
        :title="'Общий'"
        :titleColor="'text-[#8FA0A0]'"
        :sum="'40 400 000'"
        :sumColor="'text-[#072C63]'"
        class="bg-[#ECEBF4] w-1/4"
      />
    </div>
    <DashboardKassaIncomeFilterCard />
    <p-title class="pt-4">Поступления за период</p-title>
    <DashboardKassaIncomeDataTable
      :headers="inComePeriodHeaders"
      :loadedData="inComePeriodLoadedData"
    />
    <p-title class="pt-4">По территориям</p-title>
    <DashboardKassaIncomeDataTable
      :headers="inComeTerritoryHeaders"
      :loadedData="inComeTerritoryLoadedData"
    />
  </div>
</template>

<script setup lang="ts">
const inComePeriodHeaders = ref([
  {
    name: "Тип оплаты",
    checked: true,
    key: "paymentType",
    type: "paymentType",
    thWidth: "120px",
  },
  {
    name: "Сумма",
    checked: true,
    key: "sum",
    type: "sum",
    thWidth: "120px",
  },
]);
const inComePeriodLoadedData = ref([
  {
    paymentType: "Наличный Cум 1",
    sum: "100 000 000 UZS",
  },
  {
    paymentType: "Наличный Cум 1",
    sum: "100 000 000 UZS",
  },
  {
    paymentType: "Наличный Cум 1",
    sum: "100 000 000 UZS",
  },
  {
    paymentType: "Наличный Cум 1",
    sum: "100 000 000 UZS",
  },
  {
    paymentType: "Наличный Cум 1",
    sum: "100 000 000 UZS",
  },
  {
    paymentType: "Наличный Cум 1",
    sum: "100 000 000 UZS",
  },
  {
    paymentType: "Наличный Cум 1",
    sum: "100 000 000 UZS",
  },
  {
    paymentType: "Наличный Cум 1",
    sum: "100 000 000 UZS",
  },
  {
    paymentType: "Наличный Cум 1",
    sum: "100 000 000 UZS",
  },
  {
    paymentType: "Наличный Cум 1",
    sum: "100 000 000 UZS",
  },
]);

const inComeTerritoryHeaders = ref([
  {
    name: "№",
    checked: true,
    key: "number",
    type: "number",
    thWidth: "40px",
  },
  {
    name: "Территория",
    checked: true,
    key: "territory",
    type: "territory",
    thWidth: "120px",
  },
  {
    name: "Наличный",
    checked: true,
    key: "cash",
    type: "cash",
    thWidth: "120px",
  },
  {
    name: "Безналичный",
    checked: true,
    key: "notCash",
    type: "notCash",
    thWidth: "120px",
  },
  {
    name: "Доллар",
    checked: true,
    key: "dollar",
    type: "dollar",
    thWidth: "120px",
  },
  {
    name: "Итог",
    checked: true,
    key: "total",
    type: "total",
    thWidth: "120px",
  },
]);

const inComeTerritoryLoadedData = ref([
  {
    number: "1",
    territory: "Юнусабад",
    cash: "100 000 000 UZS",
    notCash: "100 000 000 UZS",
    dollar: "100 000 000 UZS",
    total: "100 000 000 UZS",
  },
  {
    number: "1",
    territory: "Юнусабад",
    cash: "100 000 000 UZS",
    notCash: "100 000 000 UZS",
    dollar: "100 000 000 UZS",
    total: "100 000 000 UZS",
  },
  {
    number: "1",
    territory: "Юнусабад",
    cash: "100 000 000 UZS",
    notCash: "100 000 000 UZS",
    dollar: "100 000 000 UZS",
    total: "100 000 000 UZS",
  },
  {
    number: "1",
    territory: "Юнусабад",
    cash: "100 000 000 UZS",
    notCash: "100 000 000 UZS",
    dollar: "100 000 000 UZS",
    total: "100 000 000 UZS",
  },
  {
    number: "1",
    territory: "Юнусабад",
    cash: "100 000 000 UZS",
    notCash: "100 000 000 UZS",
    dollar: "100 000 000 UZS",
    total: "100 000 000 UZS",
  },
  {
    number: "1",
    territory: "Юнусабад",
    cash: "100 000 000 UZS",
    notCash: "100 000 000 UZS",
    dollar: "100 000 000 UZS",
    total: "100 000 000 UZS",
  },
  {
    number: "1",
    territory: "Юнусабад",
    cash: "100 000 000 UZS",
    notCash: "100 000 000 UZS",
    dollar: "100 000 000 UZS",
    total: "100 000 000 UZS",
  },
  {
    number: "1",
    territory: "Юнусабад",
    cash: "100 000 000 UZS",
    notCash: "100 000 000 UZS",
    dollar: "100 000 000 UZS",
    total: "100 000 000 UZS",
  },
  {
    number: "1",
    territory: "Юнусабад",
    cash: "100 000 000 UZS",
    notCash: "100 000 000 UZS",
    dollar: "100 000 000 UZS",
    total: "100 000 000 UZS",
  },
  {
    number: "1",
    territory: "Юнусабад",
    cash: "100 000 000 UZS",
    notCash: "100 000 000 UZS",
    dollar: "100 000 000 UZS",
    total: "100 000 000 UZS",
  },
]);
</script>

<style>
</style>