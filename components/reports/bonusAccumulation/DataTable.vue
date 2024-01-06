<template>
  <div
    v-click-outside="clickOutside"
    class="rounded-lg bg-white border-grey px-[2px]"
  >
    <div class="flex mb-4 ml-4 flex-row gap-4 mt-4 items-center">
      <div @click="draggable = true">
        <i-btn>
          <IconColsSVG />
        </i-btn>
      </div>
      <SettingsRlpDiscountsTableCheckbox
        :headers="headers"
      ></SettingsRlpDiscountsTableCheckbox>
      <div>
        <search-input
          :value="searchText"
          @updated="searchUpdated"
          class="w-full h-38px"
        />
      </div>
      <div>
        <excel-btn :size="'300kb'"></excel-btn>
      </div>
    </div>
    <div class="overflow-auto">
      <data-table :headers="headers" @sort="sortData" :sorted="sortedData">
        <template #body>
          <template v-for="(data, index) in loadedData" :key="index">
            <c-tr class="cursor-pointer last:font-semibold">
              <c-td-no-edit v-for="key in headers" :key="key">
                <div class="py-4" v-if="key.checked">
                  {{ data[key.key] }}
                </div>
              </c-td-no-edit>
            </c-tr>
          </template>
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
  <transition name="modal">
    <div v-if="draggable">
      <d-modal @closeDialog="draggableDialog" :name="'Управление меню таблицы'">
        <drag-and-drop @change="change" :templates="headers"></drag-and-drop>
      </d-modal>
    </div>
  </transition>
</template>

<script setup>
// State
import { ref } from "vue";
const searchText = ref("");
const availablePages = ref(28);
let currentPage = ref(1);
let pageSize = ref(10);
const draggable = ref(false);
const td = reactive({
  isActive: false,
  index: -1,
});
// Methods
const dataContainerWidth = ref("1140px");
const changeStatus = ref(false);
function draggableDialog() {
  draggable.value = false;
}
function change(param) {
  headers.value = param;
  draggable.value = false;
}
const clickOutside = () => {
  td.isActive = false;
};

const headers = ref([
  {
    name: "Клиент",
    checked: true,
    key: "client",
    type: "client",
    thWidth: "120px",
    bRadius: "8px",
  },
  {
    name: "Сумма закупки",
    checked: true,
    key: "purchaseAmount",
    type: "purchaseAmount",
    thWidth: "120px",
  },
  {
    name: "Coca cola",
    checked: true,
    key: "cola1",
    type: "cola1",
    thWidth: "120px",
  },
  {
    name: "Family",
    checked: true,
    key: "family",
    type: "family",
    thWidth: "120px",
  },
  {
    name: "Dinay",
    checked: true,
    key: "dinay",
    type: "dinay",
    thWidth: "120px",
  },
  {
    name: "Pepsi",
    checked: true,
    key: "pepsi",
    type: "pepsi",
    thWidth: "120px",
  },
  {
    name: "Coca cola",
    checked: true,
    key: "cola2",
    type: "cola2",
    thWidth: "120px",
  },
  {
    name: "Nestle",
    checked: true,
    key: "nestle",
    type: "nestle",
    thWidth: "120px",
  },
  {
    name: "Общий бонус",
    checked: true,
    key: "totalBonus",
    type: "totalBonus",
    thWidth: "120px",
  },
  {
    name: "Накоп. сумма",
    checked: true,
    key: "accumulatedSum",
    type: "accumulatedSum",
    thWidth: "120px",
  },
]);
const loadedData = ref([
  {
    client: "Андрей ака",
    purchaseAmount: "10 000 000",
    cola1: "10 000 000",
    family: "10 000 000",
    dinay: "100 000 000",
    pepsi: "100 000 000",
    cola2: "100 000 000",
    nestle: "100 000 000",
    nestle: "100 000 000",
    dena: "100 000 000",
    totalBonus: "56",
    accumulatedSum: "56",
  },
  {
    client: "Андрей ака",
    purchaseAmount: "10 000 000",
    cola1: "10 000 000",
    family: "10 000 000",
    dinay: "100 000 000",
    pepsi: "100 000 000",
    cola2: "100 000 000",
    nestle: "100 000 000",
    nestle: "100 000 000",
    dena: "100 000 000",
    totalBonus: "56",
    accumulatedSum: "56",
  },
  {
    client: "Андрей ака",
    purchaseAmount: "10 000 000",
    cola1: "10 000 000",
    family: "10 000 000",
    dinay: "100 000 000",
    pepsi: "100 000 000",
    cola2: "100 000 000",
    nestle: "100 000 000",
    nestle: "100 000 000",
    dena: "100 000 000",
    totalBonus: "56",
    accumulatedSum: "56",
  },
  {
    client: "Андрей ака",
    purchaseAmount: "10 000 000",
    cola1: "10 000 000",
    family: "10 000 000",
    dinay: "100 000 000",
    pepsi: "100 000 000",
    cola2: "100 000 000",
    nestle: "100 000 000",
    nestle: "100 000 000",
    dena: "100 000 000",
    totalBonus: "56",
    accumulatedSum: "56",
  },
  {
    client: "Андрей ака",
    purchaseAmount: "10 000 000",
    cola1: "10 000 000",
    family: "10 000 000",
    dinay: "100 000 000",
    pepsi: "100 000 000",
    cola2: "100 000 000",
    nestle: "100 000 000",
    nestle: "100 000 000",
    dena: "100 000 000",
    totalBonus: "56",
    accumulatedSum: "56",
  },
  {
    client: "Андрей ака",
    purchaseAmount: "10 000 000",
    cola1: "10 000 000",
    family: "10 000 000",
    dinay: "100 000 000",
    pepsi: "100 000 000",
    cola2: "100 000 000",
    nestle: "100 000 000",
    nestle: "100 000 000",
    dena: "100 000 000",
    totalBonus: "56",
    accumulatedSum: "56",
  },
  {
    client: "Андрей ака",
    purchaseAmount: "10 000 000",
    cola1: "10 000 000",
    family: "10 000 000",
    dinay: "100 000 000",
    pepsi: "100 000 000",
    cola2: "100 000 000",
    nestle: "100 000 000",
    nestle: "100 000 000",
    dena: "100 000 000",
    totalBonus: "56",
    accumulatedSum: "56",
  },
  {
    client: "",
    purchaseAmount: "123312",
    cola1: "123312",
    family: "123312",
    dinay: "123312",
    pepsi: "123312",
    cola2: "123312",
    nestle: "123312",
    nestle: "123312",
    dena: "123312",
    totalBonus: "123312",
    accumulatedSum: "123312",
  },
]);
let sortedData = ref({ key: "", mode: "" });

// Methods
function searchUpdated(text) {
  console.log(text);
}

function sortData(data) {
  sortedData.value = data;
}

function setPage(index) {
  currentPage.value = index;
}

function setPageSize(size) {
  pageSize.value = size;
}
</script>
