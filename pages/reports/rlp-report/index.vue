<template>
  <div class="flex flex-col gap-6 py-7.5 px-5">
    <p-title>RLP отчёты</p-title>
    <ReportsRlpReportFilterCard />
    <div class="w-1/3 h-[44px] flex bg-white rounded-large mt-1.5">
      <div v-for="item in tabs" :key="item" class="inline-block h-full w-1/3">
        <input
          :id="item.tab"
          @input="inputValue(item.number)"
          type="radio"
          name="product"
          :value="amount"
          class="hidden"
        />
        <label
          :class="[
            item.number === 3 && 'rounded-r-large',
            item.number === 1 && 'rounded-l-large',
            amount === item.number && 'form_radio_label',
          ]"
          :for="item.tab"
          class="h-buttonHeight text-center inline-block cursor-pointer leading-[100%] hover:text-gray-500 w-full py-[14px] px-4 fs-14"
          >{{ item.name }}</label
        >
      </div>
    </div>
    <p-title class="mt-1.5">Общая продажа RLP клиентов</p-title>
    <ReportsTaraDataTable
      :headers="generealClientsHeaders"
      :loadedData="generalClientsLoadedData"
    />
    <p-title class="mt-4">RLP бонусы клиентов</p-title>
    <ReportsTaraDataTable
      :headers="generealClientsHeaders"
      :loadedData="generalClientsLoadedData"
    />
  </div>
</template>

<script setup lang="ts">
// Tabs
const tabs = ref([
  {
    name: "По блоку",
    number: 1,
    tab: "tab1",
  },
  {
    name: "По объему",
    number: 2,
    tab: "tab2",
  },
  {
    name: "По сумму",
    number: 3,
    tab: "tab3",
  },
]);
const amount = ref(1);
function inputValue(param: any) {
  amount.value = param;
}

// Tables
const generealClientsHeaders = ref([
  {
    name: "ID клиента",
    checked: true,
    key: "clientId",
    thWidth: "120px",
  },
  {
    name: "Клиент",
    checked: true,
    key: "client",
    thWidth: "120px",
  },
  {
    name: "Название фирмы",
    checked: true,
    key: "companyName",
    thWidth: "140px",
  },
  {
    name: "SR code",
    checked: true,
    key: "srCode",
    thWidth: "120px",
  },
  {
    name: "Pepsi",
    checked: true,
    key: "pepsi",
    thWidth: "120px",
  },
  {
    name: "Coca cola",
    checked: true,
    key: "cola",
    thWidth: "120px",
  },
  {
    name: "Mars",
    checked: true,
    key: "mars",
    thWidth: "140px",
  },
  {
    name: "Dinay",
    checked: true,
    key: "dinay",
    thWidth: "120px",
  },
  {
    name: "Печенье",
    checked: true,
    key: "cookie",
    thWidth: "140px",
  },
  {
    name: "Фото отчёты",
    checked: true,
    key: "photoReports",
    thWidth: "120px",
  },
  {
    name: "Отказы",
    checked: true,
    key: "rejects",
    thWidth: "140px",
  },
]);

const generalClientsLoadedData = ref([
  {
    clientId: "ID1326",
    client: "Jamoliddin",
    companyName: "Al Faxriyoriy MCHJ",
    srCode: "1000",
    pepsi: "1000",
    cola: "1000",
    mars: "1000",
    dinay: "1000",
    cookie: "1000",
    photoReports: "1000",
    rejects: "1000",
  },
  {
    clientId: "ID1326",
    client: "Jamoliddin",
    companyName: "Al Faxriyoriy MCHJ",
    srCode: "1000",
    pepsi: "1000",
    cola: "1000",
    mars: "1000",
    dinay: "1000",
    cookie: "1000",
    photoReports: "1000",
    rejects: "1000",
  },
  {
    clientId: "ID1326",
    client: "Jamoliddin",
    companyName: "Al Faxriyoriy MCHJ",
    srCode: "1000",
    pepsi: "1000",
    cola: "1000",
    mars: "1000",
    dinay: "1000",
    cookie: "1000",
    photoReports: "1000",
    rejects: "1000",
  },
  {
    clientId: "ID1326",
    client: "Jamoliddin",
    companyName: "Al Faxriyoriy MCHJ",
    srCode: "1000",
    pepsi: "1000",
    cola: "1000",
    mars: "1000",
    dinay: "1000",
    cookie: "1000",
    photoReports: "1000",
    rejects: "1000",
  },
  {
    clientId: "ID1326",
    client: "Jamoliddin",
    companyName: "Al Faxriyoriy MCHJ",
    srCode: "1000",
    pepsi: "1000",
    cola: "1000",
    mars: "1000",
    dinay: "1000",
    cookie: "1000",
    photoReports: "1000",
    rejects: "1000",
  },
  {
    clientId: "ID1326",
    client: "Jamoliddin",
    companyName: "Al Faxriyoriy MCHJ",
    srCode: "1000",
    pepsi: "1000",
    cola: "1000",
    mars: "1000",
    dinay: "1000",
    cookie: "1000",
    photoReports: "1000",
    rejects: "1000",
  },
  {
    clientId: "ID1326",
    client: "Jamoliddin",
    companyName: "Al Faxriyoriy MCHJ",
    srCode: "1000",
    pepsi: "1000",
    cola: "1000",
    mars: "1000",
    dinay: "1000",
    cookie: "1000",
    photoReports: "1000",
    rejects: "1000",
  },
  {
    clientId: "ID1326",
    client: "Jamoliddin",
    companyName: "Al Faxriyoriy MCHJ",
    srCode: "1000",
    pepsi: "1000",
    cola: "1000",
    mars: "1000",
    dinay: "1000",
    cookie: "1000",
    photoReports: "1000",
    rejects: "1000",
  },
  {
    clientId: "ID1326",
    client: "Jamoliddin",
    companyName: "Al Faxriyoriy MCHJ",
    srCode: "1000",
    pepsi: "1000",
    cola: "1000",
    mars: "1000",
    dinay: "1000",
    cookie: "1000",
    photoReports: "1000",
    rejects: "1000",
  },
]);
</script>

<style scoped>
/* Checked */
.form_radio_label {
  background: #299b9b;
  color: white;
  text-align: center;
  height: 44px;
}
</style>