<template>
  <div>
    <div class="my-6">
      <p-title> Отчет - продажа по товарам</p-title>
    </div>
    <ReportsExpeditorReportFiltr />
    <div class="my-6">
      <p-title> По заказам </p-title>
    </div>
    <ReportsExpeditorReportDataTableModal
      :headers="headersModal"
      :loadedData="loadedData"
    />
    <div class="my-6 flex gap-5">
      <p-title> По товарам </p-title>
      <div
        class="h-[38px] grid grid-cols-3 bg-white rounded-lg font-normal text-sm text-center text-[#8FA0A0]"
      >
        <div class="form_radio_btn h-full">
          <input id="radio-1" type="radio" name="radio" value="1" checked />
          <label
            for="radio-1"
            class="h-[38px] rounded-l-lg w-full py-[12px] px-4"
            >По блоку</label
          >
        </div>
        <div class="form_radio_btn h-full border-x">
          <input id="radio-2" type="radio" name="radio" value="2" />
          <label for="radio-2" class="h-[38px] w-full py-[12px] px-4"
            >По объему</label
          >
        </div>
        <div class="form_radio_btn h-full w-full">
          <input id="radio-3" type="radio" name="radio" value="3" />
          <label
            for="radio-3"
            class="h-[38px] w-full rounded-r-lg py-[12px] px-4"
            >По кол-во</label
          >
        </div>
      </div>
    </div>
    <ReportsExpeditorReportDataTable
      :headers="headers"
      :loadedData="loadedData"
    />
    <div class="my-6">
      <p-title> По товарам </p-title>
    </div>

    <ReportsExpeditorReportDataTable
      :headers="headersSecond"
      :loadedData="loadedData"
    />
  </div>
</template>

<script setup>
let headers = ref([
  {
    name: "Категория",
    checked: true,
    key: "id",
    type: "id",
    // thWidth: "20px",
  },
  {
    name: "Продукты",
    checked: true,
    key: "tt",
    type: "tt",
    // thWidth: "100px",
  },
  {
    name: "Заказ",
    checked: true,
    key: "telt",
    type: "telt",
    // thWidth: "80px",
  },
  {
    name: "Возврат",
    checked: true,
    key: "agents",
    type: "agents",
    // thWidth: "100px",
  },
  {
    name: "Догруз",
    checked: true,
    key: "agents",
    type: "agents",
    // thWidth: "80px",
  },
  {
    name: "Доставка",
    checked: true,
    key: "day",
    type: "day",
    // thWidth: "100px",
  },
  {
    name: "Возврат",
    checked: true,
    key: "visit",
    type: "visit",
    // thWidth: "80px",
  },
])
let headersModal = ref([
  {
    name: "ID Заказа",
    checked: true,
    key: "id",
    type: "id",
    thWidth: "120px",
  },
  {
    name: "Тип",
    checked: true,
    key: "tt",
    type: "tt",
    // thWidth: "100px",
  },
  {
    name: "Дата заказа",
    checked: true,
    key: "telt",
    type: "telt",
    thWidth: "120px",
  },
  {
    name: "Дата отгрузки",
    checked: true,
    key: "agents",
    type: "agents",
    thWidth: "120px",
  },
  {
    name: "Клиент",
    checked: true,
    key: "agents",
    type: "agents",
    // thWidth: "120px",
  },
  {
    name: "Агент",
    checked: true,
    key: "day",
    type: "day",
    // thWidth: "100px",
  },
  {
    name: "Экспедитор",
    checked: true,
    key: "visit",
    type: "visit",
    // thWidth: "80px",
  },
  {
    name: "Статус",
    checked: true,
    key: "status",
    type: "status",
    // thWidth: "80px",
  },
  {
    name: "Заказ",
    checked: true,
    key: "visit",
    type: "visit",
    // thWidth: "80px",
  },
  {
    name: "Возврат",
    checked: true,
    key: "visit",
    type: "visit",
    // thWidth: "80px",
  },
  {
    name: "Бонус",
    checked: true,
    key: "visit",
    type: "visit",
    // thWidth: "80px",
  },
  {
    name: "Сумма бон. возврата",
    checked: true,
    key: "visit",
    type: "visit",
    thWidth: "160px",
  },
  {
    name: "Догруз",
    checked: true,
    key: "visit",
    type: "visit",
    // thWidth: "80px",
  },
  {
    name: "Доставка",
    checked: true,
    key: "visit",
    type: "visit",
    // thWidth: "80px",
  },
])
let headersSecond = ref([
  {
    name: "Клиент",
    checked: true,
    key: "id",
    type: "id",
    // thWidth: "20px",
  },
  {
    name: "Категория",
    checked: true,
    key: "id",
    type: "id",
    // thWidth: "20px",
  },
  {
    name: "Продукты",
    checked: true,
    key: "tt",
    type: "tt",
    // thWidth: "100px",
  },
  {
    name: "Заказ",
    checked: true,
    key: "telt",
    type: "telt",
    // thWidth: "80px",
  },
  {
    name: "Возврат",
    checked: true,
    key: "agents",
    type: "agents",
    // thWidth: "100px",
  },
  {
    name: "Догруз",
    checked: true,
    key: "agents",
    type: "agents",
    // thWidth: "80px",
  },
  {
    name: "Доставка",
    checked: true,
    key: "day",
    type: "day",
    // thWidth: "100px",
  },
  {
    name: "Возврат",
    checked: true,
    key: "visit",
    type: "visit",
    // thWidth: "80px",
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
    status: "reset",
    territories: "23",
  },
  {
    id: "ID 132654",
    tt: "Nematjonbek",
    telt: "01.10.2022",
    agents: "Розница",
    day: "Да",
    visit: "816,000	",
    status: "v",
    territories: "23",
  },
  {
    id: "ID 132654",
    tt: "Nematjonbek",
    telt: "01.10.2022",
    agents: "Розница",
    day: "Да",
    visit: "816,000	",
    status: "v",
    territories: "23",
  },
  {
    id: "ID 132654",
    tt: "Nematjonbek",
    telt: "01.10.2022",
    agents: "Розница",
    day: "Да",
    visit: "816,000	",
    status: "reset",
    territories: "23",
  },
  {
    id: "ID 132654",
    tt: "Nematjonbek",
    telt: "01.10.2022",
    agents: "Розница",
    day: "Да",
    visit: "816,000	",
    status: "reset",
    territories: "23",
  },
])
</script>

<style scoped>
.form_radio_btn {
  display: inline-block;
}
.form_radio_btn input[type="radio"] {
  display: none;
}
.form_radio_btn label {
  display: inline-block;
  cursor: pointer;
  line-height: 100%;
  user-select: none;
}

/* Checked */
.form_radio_btn input[type="radio"]:checked + label {
  background: #299b9b;
  color: white;
}

/* Hover */
.form_radio_btn label:hover {
  color: #666;
}

/* Disabled */
.form_radio_btn input[type="radio"]:disabled + label {
  background: #efefef;
  color: #666;
}
</style>
