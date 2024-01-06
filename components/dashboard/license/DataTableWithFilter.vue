<template>
  <flex-col class="gap-5.5">
    <flex-row class="gap-5 items-center">
      <flex-col class="gap-2.5 w-1/4">
        <div>Дата с</div>
        <div class="flex-row">
          <d-input-date-picker />
        </div>
      </flex-col>
      <flex-col class="gap-2.5 w-1/4">
        <div>Дата до</div>
        <div class="flex-row">
          <d-input-date-picker />
        </div>
      </flex-col>
      <flex-row class="w-1/4 mt-8.5 gap-2">
        <m-btn class="w-4/5"> Применить </m-btn>
        <sm-btn class="px-4 py-3 w-1/5">
          <IconReloadSVG />
        </sm-btn>
      </flex-row>
    </flex-row>
    <DashboardDolgDataTable :headers="headers" :loadedData="loadedData" />
  </flex-col>
</template>

<script setup lang="ts">
const filter = ref({
  isSelectDateFrom: false,
  isSelectDateTill: false,
});

const headers = ref([
  {
    name: "Дата",
    checked: true,
    key: "date",
    type: "date",
    thWidth: "120px",
  },
  {
    name: "Тип",
    checked: true,
    key: "type",
    type: "type",
    thWidth: "120px",
  },
  {
    name: "Дебет (долг)",
    checked: true,
    key: "debt",
    type: "debt",
    thWidth: "120px",
  },
  {
    name: "Кредит (оплата)",
    checked: true,
    key: "credit",
    type: "credit",
    thWidth: "120px",
  },
  {
    name: "Комментарии",
    checked: true,
    key: "sum",
    type: "sum",
    thWidth: "120px",
  },
]);

const loadedData = ref([
  {
    date: "06.11.2022",
    type: "1 X Админ (Admin-30)",
    debt: "100 000 000",
    credit: "100 000 000",
    comments: "Lorem ipsum",
  },
  {
    date: "06.11.2022",
    type: "1 X Админ (Admin-30)",
    debt: "100 000 000",
    credit: "100 000 000",
    comments: "Lorem ipsum",
  },
  {
    date: "06.11.2022",
    type: "1 X Админ (Admin-30)",
    debt: "100 000 000",
    credit: "100 000 000",
    comments: "Lorem ipsum",
  },
  {
    date: "06.11.2022",
    type: "1 X Админ (Admin-30)",
    debt: "100 000 000",
    credit: "100 000 000",
    comments: "Lorem ipsum",
  },
  {
    date: "06.11.2022",
    type: "1 X Админ (Admin-30)",
    debt: "100 000 000",
    credit: "100 000 000",
    comments: "Lorem ipsum",
  },
  {
    date: "06.11.2022",
    type: "1 X Админ (Admin-30)",
    debt: "100 000 000",
    credit: "100 000 000",
    comments: "Lorem ipsum",
  },
  {
    date: "Обороты",
    type: "",
    debt: "100 000 000",
    credit: "100 000 000",
    comments: "",
  },
  {
    date: "Итого",
    type: "",
    debt: "100 000 000",
    credit: "100 000 000",
    comments: "",
  },
]);
</script>

<style></style>
