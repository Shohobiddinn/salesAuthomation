<template>
  <div class="rounded-lg bg-white border-grey px-[2px] mt-6">
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
        <excel-btn :size="'340kb'" :text="'Скачать Excel'"></excel-btn>
      </div>
    </div>
    <div class="overflow-y-auto table-containers">
      <data-table :headers="headers" @sort="sortData" :sorted="sortedData">
        <template #body>
          <template v-for="data in loadedData">
            <c-tr class="border-b-none b-bottom">
              <c-td-no-edit
                v-for="key in headers"
                :key="key"
                :orderBy="orderBy"
              >
                <div
                  class="p-2"
                  v-if="
                    key.checked &&
                    key.key !== 'status' &&
                    key?.type !== 'checkbox'
                  "
                >
                  {{ data[key.key] }}
                </div>
                <div class="px-2" v-if="key?.type === 'checkbox'">
                  <Checkbox />
                </div>
                <div
                  class="m-2 rounded-full text-center py-1.5 px-2.5"
                  v-if="key.checked && key.key === 'status'"
                  :class="
                    data[key.key] === 'reset'
                      ? 'bg-[#FFEFD6] text-[#BD7F06]'
                      : 'bg-[rgba(187,10,10,0.1)] text-[#D10505]'
                  "
                >
                  {{ data[key.key] === "reset" ? "Возврат" : "Не отработан" }}
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
import { ref } from "vue";
function change(param) {
  headers.value = param;
  draggable.value = false;
}
let headers = ref([
  {
    name: "",
    type: "checkbox",
    key: "checkbox",
    checked: true,
    thWidth: "20px",
  },
  {
    name: "Клиент",
    checked: true,
    key: "id",
    type: "id",
    thWidth: "120px",
  },
  {
    name: "Дата  синх.",
    checked: true,
    key: "tt",
    type: "tt",
    thWidth: "160px",
  },
  {
    name: "Категория клиента",
    checked: true,
    key: "telt",
    type: "telt",
    thWidth: "160px",
  },
  {
    name: "Территория",
    checked: true,
    key: "agents",
    type: "agents",
    thWidth: "120px",
  },
  {
    name: "Пользователь",
    checked: true,
    key: "agents",
    type: "agents",
    // thWidth: "120px",
  },
  {
    name: "Категория отчёта",
    checked: true,
    key: "day",
    type: "day",
    // thWidth: "140px",
  },
  {
    name: "Задача",
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
]);
const loadedData = ref([
  {
    id: "ID 132654",
    tt: "Nematjonbek",
    telt: "01.10.2022",
    agents: "Розница",
    day: "Да",
    visit: "816,000	",
    status: "resetd",
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
    status: "resetd",
    territories: "23",
  },
  {
    id: "ID 132654",
    tt: "Nematjonbek",
    telt: "01.10.2022",
    agents: "Розница",
    day: "Да",
    visit: "816,000	",
    status: "resetd",
    territories: "23",
  },
]);
// State
const searchText = ref("");
const availablePages = ref(28);
let currentPage = ref(1);
let pageSize = ref(10);
const draggable = ref(false);
const orderBy = ref(true);
// Methods

function draggableDialog() {
  draggable.value = false;
}

function openDropdown(index) {
  td.isActive = !td.isActive;
  td.index = index;
}
const td = reactive({
  isActive: false,
  index: -1,
});

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
