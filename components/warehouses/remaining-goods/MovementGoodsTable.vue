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
    <div class="overflow-auto table-containers">
      <data-table :headers="headers" @sort="sortData" :sorted="sortedData">
        <template #body>
          <template v-for="(data, index) in loadedData" :key="index">
            <c-tr class="b-bottom cursor-pointer">
              <c-td-no-edit v-for="key in headers" :key="key">
                <div class="py-2 underline pb-2" v-if="key.key === 'data'">
                  {{ data[key.key] }}
                </div>
                <div class="py-2" v-if="key.key !== 'data'">
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
        <drag-and-drop></drag-and-drop>
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
function draggableDialog() {
  draggable.value = false;
}

let headers = ref([
  {
    name: "Категория",
    checked: true,
    key: "category",
    type: "category",
    thWidth: "100px",
    bRadius: "8px",
  },
  {
    name: "Продукт",
    checked: true,
    key: "product",
    type: "product",
    thWidth: "100px",
  },
  {
    name: "Сортировка",
    checked: true,
    key: "sort",
    type: "sort",
    thWidth: "100px",
  },
  {
    name: "Приход",
    checked: true,
    key: "coming",
    type: "coming",
    thWidth: "8 0px",
  },
  {
    name: "Бонус",
    checked: true,
    key: "bonus",
    type: "bonus",
    thWidth: "70px",
  },
  {
    name: "Заказ",
    checked: true,
    key: "order",
    type: "order",
    thWidth: "80px",
  },
  {
    name: "Обмен",
    checked: true,
    key: "volume",
    type: "volume",
    thWidth: "80px",
  },
  {
    name: "Возврат с полки",
    checked: true,
    key: "returnShelf",
    type: "returnShelf",
    thWidth: "140px",
  },
  {
    name: "Остатки",
    checked: true,
    key: "remains",
    type: "remains",
    thWidth: "100px",
  },
  {
    name: "Корректировка",
    checked: true,
    key: "adjustments",
    type: "adjustments",
    thWidth: "100px",
  },
  {
    name: "Списание",
    checked: true,
    key: "writeDowns",
    type: "writeDowns",
    thWidth: "100px",
  },
]);
const loadedData = ref([
  {
    category: "Pepsi",
    product: "pepsi 1.5",
    sort: "pepsi 1.5",
    coming: "13268",
    bonus: "13268",
    order: "13268",
    volume: "13268",
    returnShelf: "13268",
    remains: "13268",
    adjustments: "13268",
    writeDowns: "13268",
  },
  {
    category: "Pepsi",
    product: "pepsi 1.5",
    sort: "pepsi 1.5",
    coming: "13268",
    bonus: "13268",
    order: "13268",
    volume: "13268",
    returnShelf: "13268",
    remains: "13268",
    adjustments: "13268",
    writeDowns: "13268",
  },
  {
    category: "Pepsi",
    product: "pepsi 1.5",
    sort: "pepsi 1.5",
    coming: "13268",
    bonus: "13268",
    order: "13268",
    volume: "13268",
    returnShelf: "13268",
    remains: "13268",
    adjustments: "13268",
    writeDowns: "13268",
  },
  {
    category: "Pepsi",
    product: "pepsi 1.5",
    sort: "pepsi 1.5",
    coming: "13268",
    bonus: "13268",
    order: "13268",
    volume: "13268",
    returnShelf: "13268",
    remains: "13268",
    adjustments: "13268",
    writeDowns: "13268",
  },
  {
    category: "Pepsi",
    product: "pepsi 1.5",
    sort: "pepsi 1.5",
    coming: "13268",
    bonus: "13268",
    order: "13268",
    volume: "13268",
    returnShelf: "13268",
    remains: "13268",
    adjustments: "13268",
    writeDowns: "13268",
  },
  {
    category: "Pepsi",
    product: "pepsi 1.5",
    sort: "pepsi 1.5",
    coming: "13268",
    bonus: "13268",
    order: "13268",
    volume: "13268",
    returnShelf: "13268",
    remains: "13268",
    adjustments: "13268",
    writeDowns: "13268",
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
