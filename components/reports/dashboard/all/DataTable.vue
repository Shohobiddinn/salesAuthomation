<template>
  <div>
    <div class="rounded-lg bg-white border-grey px-[2px]">
      <div class="flex mb-4 mx-4 justify-between gap-4 mt-4 items-center">
        <div class="flex flex-row gap-4 items-center">
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
        <div class="flex gap-4">
          <filtr-btn class="w-full"> Конфигурации </filtr-btn>
        </div>
      </div>
      <div class="overflow-y-auto table-containers">
        <data-table :headers="headers" @sort="sortData" :sorted="sortedData">
          <template #body>
            <template v-for="data in loadedData">
              <c-tr class="border-b-none b-bottom cursor-pointer">
                <c-td-no-edit
                  v-for="key in headers"
                  :key="key"
                  custom-padding="p-0"
                  :class="`${key.bordered && ' border-l'}`"
                >
                  <div class="p-2" v-if="key.checked">
                    {{ data[key.key] }}
                  </div>
                </c-td-no-edit>
              </c-tr>
            </template>
          </template>
        </data-table>
      </div>

      <!-- begin pagination -->
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
      <!-- end pagination -->
    </div>
    <transition name="modal">
      <div>
        <d-modal
          v-if="draggable"
          @closeDialog="draggableDialog"
          :name="'Управление меню таблицы'"
        >
          <drag-and-drop></drag-and-drop>
        </d-modal>
      </div>
    </transition>
  </div>
</template>

<script setup>
// State
import { ref } from "vue";
const searchText = ref("");
const availablePages = ref(28);
let currentPage = ref(1);
let pageSize = ref(10);
const draggable = ref(false);
const orderBy = ref(false);

function draggableDialog() {
  draggable.value = false;
}

let headers = ref([
  {
    name: "СВР",
    checked: true,
    key: "id",
    type: "id",
    thWidth: "100px",
  },
  {
    name: "Лимит",
    checked: true,
    key: "tt",
    type: "tt",
    thWidth: "100px",
  },
  {
    name: "Кучадаги колдик",
    checked: true,
    key: "telt",
    type: "telt",
    thWidth: "140px",
  },
  {
    name: "Нечта ходимда",
    checked: true,
    key: "telt",
    type: "telt",
    thWidth: "140px",
    bordered: true,
  },
  {
    name: "Нечта клиентда",
    checked: true,
    key: "telt",
    type: "telt",
    thWidth: "140px",
  },
  {
    name: "Нечта заказда",
    checked: true,
    key: "telt",
    type: "telt",
    thWidth: "140px",
  },
  {
    name: "Оборот",
    checked: true,
    key: "telt",
    type: "telt",
    thWidth: "140px",
    bordered: true,
  },
  {
    name: "%",
    checked: true,
    key: "telt",
    type: "telt",
    thWidth: "100px",
  },
]);
const loadedData = ref([
  {
    id: "Олимжон",
    tt: "1000000",
    telt: "1010000",
  },
  {
    id: "Олимжон",
    tt: "100000",
    telt: "3124124",
  },
  {
    id: "Олимжон",
    tt: "100000",
    telt: "1010000",
  },
  {
    id: "Олимжон",
    tt: "100000",
    telt: "1013210000",
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
/* Style its checked state...with a ticked icon */

.b-bottom:last-child {
  border-bottom: 1px solid #e1e4e4;
}
</style>
