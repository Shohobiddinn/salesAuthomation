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
        <excel-btn :size="'340kb'"></excel-btn>
      </div>
    </div>
    <div class="table-containers overflow-y-auto">
      <data-table :headers="headers" @sort="sortData" :sorted="sortedData">
        <template #body>
          <template v-for="(data, index) in loadedData" :key="index">
            <c-tr class="border-b b-bottom cursor-pointer">
              <c-td-no-edit v-for="key in headers" :key="key">
                <div
                  class="my-2"
                  v-if="
                    key.checked &&
                    key.key !== 'client' &&
                    key.key !== 'agent' &&
                    key.key !== 'status'
                  "
                >
                  {{ data[key.key] }}
                </div>
                <nuxt-link
                  to="/clients/about-clients/Description"
                  class=""
                  v-if="key.checked && key.key === 'client'"
                >
                  <span class="border-b border-blue-10 pb-1">{{
                    data[key.key]
                  }}</span>
                </nuxt-link>
                <div class="" v-if="key.checked && key.key === 'agent'">
                  <span class="border-b border-blue-10 pb-1">{{
                    data[key.key]
                  }}</span>
                </div>
                <button
                  class="bg-blue-100 rounded-[40px] p-1 px-2"
                  v-if="key.checked && key.key === 'status'"
                >
                  <span class="text-bluer my-4">{{ data[key.key] }}</span>
                </button>
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
// Methods
const dataContainerWidth = ref("1140px");
const changeStatus = ref(false);
function changeStatusDialog() {
  changeStatus.value = false;
}
const addTask = ref(false);
function addTaskDialog() {
  addTask.value = false;
}
function change(param) {
  headers.value = param;
  draggable.value = false;
}
function draggableDialog() {
  draggable.value = false;
}
const clickOutside = () => {
  td.isActive = false;
  console.log(td.isActive);
};
function openDropdown(index) {
  td.isActive = !td.isActive;
  td.index = index;
}
const td = reactive({
  isActive: false,
  index: -1,
});

let headers = ref([
  {
    name: "№",
    checked: true,
    key: "no",
    type: "no",
    thWidth: "60px",
  },
  {
    name: "Название",
    checked: true,
    key: "name",
    type: "name",
    thWidth: "120px",
    bRadius: "8px",
  },
  {
    name: "Блок",
    checked: true,
    key: "block",
    type: "block",
    thWidth: "100px",
  },
  {
    name: "Объем",
    checked: true,
    key: "volume",
    type: "volume",
    thWidth: "70px",
  },
  {
    name: "АКБ",
    checked: true,
    key: "akb",
    type: "akb",
    thWidth: "100px",
  },
  {
    name: "Доллар США",
    checked: true,
    key: "dollar",
    type: "dollar",
    thWidth: "120px",
  },
  {
    name: "Без нал",
    checked: true,
    key: "withoutCash",
    type: "withoutCash",
    thWidth: "120px",
  },
  {
    name: "Нал. сум",
    checked: true,
    key: "cashSum",
    type: "cashSum",
    thWidth: "120px",
  },
  {
    name: "Общая сумма",
    checked: true,
    key: "allAmount",
    type: "allAmount",
    thWidth: "120px",
  },
]);
const loadedData = ref([
  {
    no: "345",
    name: "Jamoliddin",
    block: "100000",
    volume: "100000",
    akb: "100000",
    dollar: "100000",
    withoutCash: "100000",
    cashSum: "100000",
    allAmount: "100000",
  },
  {
    no: "345",
    name: "Jamoliddin",
    block: "100000",
    volume: "100000",
    akb: "100000",
    dollar: "100000",
    withoutCash: "100000",
    cashSum: "100000",
    allAmount: "100000",
  },
  {
    no: "345",
    name: "Jamoliddin",
    block: "100000",
    volume: "100000",
    akb: "100000",
    dollar: "100000",
    withoutCash: "100000",
    cashSum: "100000",
    allAmount: "100000",
  },
  {
    no: "345",
    name: "Jamoliddin",
    block: "100000",
    volume: "100000",
    akb: "100000",
    dollar: "100000",
    withoutCash: "100000",
    cashSum: "100000",
    allAmount: "100000",
  },
  {
    no: "345",
    name: "Jamoliddin",
    block: "100000",
    volume: "100000",
    akb: "100000",
    dollar: "100000",
    withoutCash: "100000",
    cashSum: "100000",
    allAmount: "100000",
  },
  {
    no: "345",
    name: "Jamoliddin",
    block: "100000",
    volume: "100000",
    akb: "100000",
    dollar: "100000",
    withoutCash: "100000",
    cashSum: "100000",
    allAmount: "100000",
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

<style scoped></style>
