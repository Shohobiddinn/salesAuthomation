<template>
  <div class="flex flex-col gap-4.5 py-9.5 px-5">
    <div class="flex justify-between pt-1.5">
      <button @click="$router.go(-1)" class="h-[44px] px-[46px] mt-4 bg-[#FFFFFF] text-black rounded-lg border">
        <div class="flex">
          <IconArrowLeft class="mt-[5px] mr-[10px]"></IconArrowLeft>
          Назад
          <slot></slot>
        </div>
      </button>
      <excel-btn :size="'300kb'"></excel-btn>
    </div>
    <p-title>Контроль экспедитора</p-title>
    <flex-row class="justify-between" v-click-outside="clickOutside">
      <flex-row class="w-6/7 gap-10">
        <div class="flex gap-7.5 items-center w-2/5">
          <div class="text-black text-base min-w-fit">Выбрать эспедитора</div>
          <multiply-selections
            :filter="filter.isSelectExpeditor"
            @toggle="(toggle) => (filter.isSelectExpeditor = toggle)"
            class="w-4/5"
          />
        </div>
        <div class="flex gap-7.5 items-center w-2/5">
          <div class="text-black text-base min-w-fit">Способ оплаты</div>
          <multiply-selections
            :filter="filter.isSelectPaymentMethod"
            @toggle="(toggle) => (filter.isSelectPaymentMethod = toggle)"
            class="w-4/5"
          />
        </div>
      </flex-row>
      <menu-btn class="w-1/7">
        <template #btn>
          <m-btn-outlined class="w-full border-color-primary bg-white">
            <div class="flex flex-row items-center gap-2 fs-14 fw-4 h-8">
              <IconCalendarSVG />03.11.2022
            </div>
          </m-btn-outlined>
        </template>
        <template #content>
          <div class="flex flex-col gap-4">
            <button class="flex justify-between gap-4">
              <span class="whitespace-nowrap"> Реальное время </span>
              <!-- <fa-icon hash="&#xf00c" /> -->
            </button>
            <button class="flex justify-between gap-4">
              <span class="whitespace-nowrap"> Выбрать дату </span>
              <!-- <fa-icon hash="&#xf00c" /> -->
            </button>
            <div class="flex flex-row gap-2">
              <input class="border-1 p-2 rounded-lg" type="date" />
              <input class="border-1 p-2 rounded-lg" type="date" />
            </div>
            <div class="flex flex-row gap-2">
              <button class="w-full fs-14 fw-4 bg-gray-100 p-2 rounded-lg">
                Отменить
              </button>
              <m-btn class="w-full"> Применить </m-btn>
            </div>
          </div>
        </template>
      </menu-btn>
    </flex-row>
    <div class="bg-white rounded-lg border-grey mt-3 w-full">
      <flex-row>
        <div class="border-r-1 w-370/1000"></div>
        <div
          class="py-2.5 px-5 text-gray-3 fs-14 font-semibold w-212/1000 border-r-1"
        >
          Консигнация
        </div>
        <div class="py-2.5 px-5 text-gray-3 fs-14 font-semibold">Зав склад</div>
      </flex-row>
      <div class="w-full overflow-auto">
        <data-table
          :headers="headers"
          @sort="sortData"
          :sorted="sortedData"
          class="w-full"
        >
          <template #body>
            <c-tr
              v-for="data in loadedData"
              :key="data"
              class="last:font-semibold"
            >
              <c-td-no-edit
                v-for="key in headers"
                :key="key"
                :class="key.borderX && 'border-r-1'"
              >
                <div>
                  <div class="py-3.5">
                    {{ data[key.key] }}
                  </div>
                </div>
              </c-td-no-edit>
            </c-tr>
          </template>
        </data-table>
      </div>
      <div class="flex justify-between w-full">
        <div class="flex p-3 gap-2 items-center">
          <span class="secondary-gray-text fs-14"> Показать по </span>
          <page-size-btn :current-size="pageSize" @setPageSize="setPageSize" />
        </div>
        <div class="p-3">
          <page-index
            :available-pages="availablePages"
            :current-page="currentPage"
            @setPage="setPage"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const filter = ref({
  isSelectExpeditor: false,
  isSelectPaymentMethod: false,
});

let headers = ref([
  {
    name: "№",
    checked: true,
    key: "no",
    thWidth: "40px",
    bRadius: "40px",
  },
  {
    name: "Экспедитор",
    checked: true,
    key: "expeditor",
    thWidth: "120px",
  },
  {
    name: "Отгружено",
    checked: true,
    key: "shipped",
    thWidth: "120px",
  },
  {
    name: "Оплата",
    checked: true,
    key: "payment",
    thWidth: "120px",
    borderX: true,
  },
  {
    name: "Нал. сумма",
    checked: true,
    key: "cashSum",
    thWidth: "120px",
  },
  {
    name: "Безнал.  сумма",
    checked: true,
    key: "notCashSum",
    thWidth: "120px",
    borderX: true,
  },
  {
    name: "Возврат",
    checked: true,
    key: "return",
    thWidth: "120px",
  },
  {
    name: "Возврат с полки",
    checked: true,
    key: "returnFromShelf",
    thWidth: "140px",
    borderX: true,
  },
  {
    name: "Оплата старых долгов",
    checked: true,
    key: "paymentOldDebts",
    thWidth: "180px",
  },
]);

const loadedData = ref([
  {
    no: "1",
    expeditor: "Доставщик",
    shipped: "1233124",
    payment: "1233124.",
    cashSum: "1233124",
    notCashSum: "1233124",
    return: "1233124",
    returnFromShelf: "1233124",
    paymentOldDebts: "1233124",
  },
  {
    no: "1",
    expeditor: "Доставщик",
    shipped: "1233124",
    payment: "1233124.",
    cashSum: "1233124",
    notCashSum: "1233124",
    return: "1233124",
    returnFromShelf: "1233124",
    paymentOldDebts: "1233124",
  },
  {
    no: "1",
    expeditor: "Доставщик",
    shipped: "1233124",
    payment: "1233124.",
    cashSum: "1233124",
    notCashSum: "1233124",
    return: "1233124",
    returnFromShelf: "1233124",
    paymentOldDebts: "1233124",
  },
  {
    no: "1",
    expeditor: "Доставщик",
    shipped: "1233124",
    payment: "1233124.",
    cashSum: "1233124",
    notCashSum: "1233124",
    return: "1233124",
    returnFromShelf: "1233124",
    paymentOldDebts: "1233124",
  },
  {
    no: "1",
    expeditor: "Доставщик",
    shipped: "1233124",
    payment: "1233124.",
    cashSum: "1233124",
    notCashSum: "1233124",
    return: "1233124",
    returnFromShelf: "1233124",
    paymentOldDebts: "1233124",
  },
  {
    no: "1",
    expeditor: "Доставщик",
    shipped: "1233124",
    payment: "1233124.",
    cashSum: "1233124",
    notCashSum: "1233124",
    return: "1233124",
    returnFromShelf: "1233124",
    paymentOldDebts: "1233124",
  },
  {
    no: "1",
    expeditor: "Доставщик",
    shipped: "1233124",
    payment: "1233124.",
    cashSum: "1233124",
    notCashSum: "1233124",
    return: "1233124",
    returnFromShelf: "1233124",
    paymentOldDebts: "1233124",
  },
  {
    no: "1",
    expeditor: "Доставщик",
    shipped: "1233124",
    payment: "1233124.",
    cashSum: "1233124",
    notCashSum: "1233124",
    return: "1233124",
    returnFromShelf: "1233124",
    paymentOldDebts: "1233124",
  },
  {
    no: "1",
    expeditor: "Доставщик",
    shipped: "1233124",
    payment: "1233124.",
    cashSum: "1233124",
    notCashSum: "1233124",
    return: "1233124",
    returnFromShelf: "1233124",
    paymentOldDebts: "1233124",
  },
  {
    no: "Итого",
    expeditor: "",
    shipped: "1233124",
    payment: "1233124.",
    cashSum: "1233124",
    notCashSum: "1233124",
    return: "1233124",
    returnFromShelf: "1233124",
    paymentOldDebts: "1233124",
  },
]);
let sortedData = ref({ key: "", mode: "" });
const availablePages = ref(28);
let currentPage = ref(1);
let pageSize = ref(10);

function sortData(data: any) {
  sortedData.value = data;
}

function setPage(index: any) {
  currentPage.value = index;
}

function setPageSize(size) {
  pageSize.value = size;
}

const clickOutside = () => {
  filter.value.isSelectExpeditor = false;
  filter.value.isSelectPaymentMethod = false;
};
</script>

<style>
</style>
