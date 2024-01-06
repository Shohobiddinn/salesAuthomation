<template>
  <div class="rounded-lg bg-white border-grey py-3">
    <div class="flex flex-row gap-4 px-4 items-center">
      <div @click="draggable = true">
        <i-btn>
          <IconColsSVG />
        </i-btn>
      </div>
      <table-filter :headers="headers"></table-filter>
      <div>
        <search-input
          :value="searchText"
          @updated="searchUpdated"
          class="w-full h-38px"
        />
      </div>
      <div>
        <excel-btn :size="'350kb'"></excel-btn>
      </div>
    </div>
    <div class="mt-3 w-full overflow-auto">
      <data-table :headers="headers" @sort="sortData" :sorted="sortedData">
        <template #body>
          <c-tr v-for="data in loadedData" :key="data">
            <c-td v-for="key in headers" :key="key">
              {{ data[key.key] }}
            </c-td>
            <c-td>
              <div class="my-2">
                <IconEdit></IconEdit>
              </div>
            </c-td>
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
function draggableDialog() {
  draggable.value = false;
}
let headers = ref([
  {
    name: "Название",
    checked: true,
    key: "name",
    thWidth: "140px",
  },
  {
    name: "Модуль",
    checked: true,
    key: "model",
    thWidth: "140px",
  },
  {
    name: "Страница",
    checked: true,
    key: "page",
    thWidth: "140px",
  },
  {
    name: "Сортировка",
    checked: true,
    key: "sort",
    thWidth: "140px",
  },
]);
const loadedData = ref([
  {
    name: "Lorem ipsum",
    model: "Отчёт",
    page: "Продажи по клиентам",
    sort: "123",
  },
  {
    name: "Lorem ipsum",
    model: "Отчёт",
    page: "Продажи по клиентам",
    sort: "123",
  },
  {
    name: "Lorem ipsum",
    model: "Отчёт",
    page: "Продажи по клиентам",
    sort: "123",
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
