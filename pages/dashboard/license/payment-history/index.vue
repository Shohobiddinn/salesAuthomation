<template>
  <div class="flex flex-col gap-6 py-7.5 px-5">
    <back-btn @click="$router.go(-1)" class="w-1/8 mt-1.5"></back-btn>
    <p-title class="mt-1.5">История платежей / акт сверки</p-title>
    <rounded-white-container>
      <DoubleTab
        first-tab-name="Оплата"
        second-tab-name="Акт сверки"
        :bgWhite="true"
      >
        <template #first>
          <DashboardDolgDataTable
            :headers="headersPayment"
            :loadedData="loadedDataPayment"
          />
        </template>
        <template #second>
          <DashboardLicenseDataTableWithFilter />
        </template>
      </DoubleTab>
    </rounded-white-container>
  </div>
</template>

<script setup lang="ts">
const headersPayment = ref([
  {
    name: "Дата",
    checked: true,
    key: "date",
    type: "date",
    thWidth: "120px",
  },
  {
    name: "Форма оплаты",
    checked: true,
    key: "paymentForm",
    type: "paymentForm",
    thWidth: "120px",
  },
  {
    name: "Комментарии",
    checked: true,
    key: "commnets",
    type: "commnets",
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

const loadedDataPayment = ref([
  {
    date: "06.11.2022",
    paymentForm: "Payme",
    comments: "Lorem ipsum",
    sum: "100 000 000",
  },
  {
    date: "06.11.2022",
    paymentForm: "Payme",
    comments: "Lorem ipsum",
    sum: "100 000 000",
  },
  {
    date: "06.11.2022",
    paymentForm: "Payme",
    comments: "Lorem ipsum",
    sum: "100 000 000",
  },
  {
    date: "06.11.2022",
    paymentForm: "Payme",
    comments: "Lorem ipsum",
    sum: "100 000 000",
  },
  {
    date: "06.11.2022",
    paymentForm: "Payme",
    comments: "Lorem ipsum",
    sum: "100 000 000",
  },
  {
    date: "06.11.2022",
    paymentForm: "Payme",
    comments: "Lorem ipsum",
    sum: "100 000 000",
  },
]);
</script>

<style>
</style>