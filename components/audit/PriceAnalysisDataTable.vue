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
    <div class="w-full overflow-auto">
      <data-table
        :headers="headers"
        @sort="sortData"
        :sorted="sortedData"
        class="whitespace-nowrap"
      >
        <template #body>
          <c-tr
            v-for="data in loadedData"
            :key="data"
            class="border-b-none b-bottom cursor-pointer"
          >
            <c-td-no-edit v-for="key in headers" :key="key">
              <div class="py-14px">
                {{ data[key.key] }}
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
const clickOutside = () => {
  td.isActive = false;
  console.log(td.isActive);
};

const td = reactive({
  isActive: false,
  index: -1,
});

let headers = ref([
  {
    name: "Продукт",
    checked: true,
    key: "product",
    type: "product",
    thWidth: "140px",
  },
  {
    name: "Категория",
    checked: true,
    key: "category",
    type: "category",
    thWidth: "140px",
    bRadius: "8px",
  },
  {
    name: "Мин. цена",
    checked: true,
    key: "minPrice",
    type: "minPrice",
    thWidth: "140px",
  },
  {
    name: "Макс. цена",
    checked: true,
    key: "maxPrice",
    type: "maxPrice",
    thWidth: "140px",
  },
  {
    name: "Средняя цена",
    checked: true,
    key: "midPrice",
    type: "midPrice",
    thWidth: "100px",
  },
  {
    name: "Результаты",
    checked: true,
    key: "results",
    type: "results",
    thWidth: "140px",
  },
]);
const loadedData = ref([
  {
    product: "Coca Cola 1.5",
    category: "Coca Cola",
    minPrice: "10 000 000",
    maxPrice: "10 000 000",
    midPrice: "10 000 000",
    results: "10 000 000",
  },
  {
    product: "Coca Cola 1.5",
    category: "Coca Cola",
    minPrice: "10 000 000",
    maxPrice: "10 000 000",
    midPrice: "10 000 000",
    results: "10 000 000",
  },
  {
    product: "Coca Cola 1.5",
    category: "Coca Cola",
    minPrice: "10 000 000",
    maxPrice: "10 000 000",
    midPrice: "10 000 000",
    results: "10 000 000",
  },
  {
    product: "Coca Cola 1.5",
    category: "Coca Cola",
    minPrice: "10 000 000",
    maxPrice: "10 000 000",
    midPrice: "10 000 000",
    results: "10 000 000",
  },
  {
    product: "Coca Cola 1.5",
    category: "Coca Cola",
    minPrice: "10 000 000",
    maxPrice: "10 000 000",
    midPrice: "10 000 000",
    results: "10 000 000",
  },
  {
    product: "Coca Cola 1.5",
    category: "Coca Cola",
    minPrice: "10 000 000",
    maxPrice: "10 000 000",
    midPrice: "10 000 000",
    results: "10 000 000",
  },
  {
    product: "Coca Cola 1.5",
    category: "Coca Cola",
    minPrice: "10 000 000",
    maxPrice: "10 000 000",
    midPrice: "10 000 000",
    results: "10 000 000",
  },
  {
    product: "Coca Cola 1.5",
    category: "Coca Cola",
    minPrice: "10 000 000",
    maxPrice: "10 000 000",
    midPrice: "10 000 000",
    results: "10 000 000",
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

<style scoped>
.b-bottom:last-child {
  border-bottom: 1px solid #e1e4e4;
}
</style>
