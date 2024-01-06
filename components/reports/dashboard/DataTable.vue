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
    <div class="overflow-y-auto table-containers">
      <data-table :headers="headers" @sort="sortData" :sorted="sortedData">
        <template #body>
          <template v-for="data in loadedData">
            <c-tr class="border-b-none b-bottom cursor-pointer">
              <c-td-no-edit
                v-for="key in headers"
                :key="key"
                :orderBy="orderBy"
              >
                <div class="p-2" v-if="key.checked && key.key === 'shipped'">
                  {{ data[key.key] }}
                </div>
                <div
                  @click="agentModal = true"
                  class="p-2 underline"
                  v-if="key.checked && key.key === 'agent'"
                >
                  {{ data[key.key] }}
                </div>
                <div
                  class="p-2"
                  v-if="
                    key.checked && key.key !== 'shipped' && key.key !== 'agent'
                  "
                >
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
  <transition name="modal">
    <div v-if="agentModal">
      <d-modal
        @closeDialog="agentDialog"
        :dataContainerWidth="'1363px'"
        :name="'ТП Андрей'"
      >
        <reports-order-by-agents-agent-dialog />
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
const orderBy = ref(true);
// Methods
const agentModal = ref(false);
function agentDialog() {
  agentModal.value = false;
}
const contactModal = ref(false);
function contactDialog() {
  contactModal.value = false;
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
    name: "№ ",
    checked: true,
    key: "id",
    type: "id",
    thWidth: "30px",
  },
  {
    name: "Номер заказа",
    checked: true,
    key: "tt",
    type: "tt",
    thWidth: "120px",
    bRadius: "8px",
  },
  {
    name: "Дата заказа",
    checked: true,
    key: "telt",
    type: "telt",
    thWidth: "120px",
  },
  {
    name: "Дата доставки",
    checked: true,
    key: "agents",
    type: "agents",
    thWidth: "120px",
  },
  {
    name: "ID клиента",
    checked: true,
    key: "day",
    type: "day",
    thWidth: "120px",
  },
  {
    name: "Название клиента",
    checked: true,
    key: "visit",
    type: "visit",
    thWidth: "180px",
  },
  {
    name: "Код Агента",
    checked: true,
    key: "territories",
    type: "territories",
    thWidth: "120px",
  },
  {
    name: "Название агента",
    checked: true,
    key: "territories",
    type: "territories",
    thWidth: "180px",
  },
  {
    name: "Экспедитор",
    checked: true,
    key: "territories",
    type: "territories",
    thWidth: "120px",
  },
  {
    name: "Территория",
    checked: true,
    key: "territories",
    type: "territories",
    thWidth: "120px",
  },
]);
const loadedData = ref([
  {
    id: "1",
    tt: "16589",
    telt: "06.12.2022",
    agents: "Дата доставки",
    day: "16589",
    visit: "Саша",
    territories: "16589",
  },
  {
    id: "1",
    tt: "16589",
    telt: "06.12.2022",
    agents: "Дата доставки",
    day: "16589",
    visit: "Саша",
    territories: "16589",
  },
  {
    id: "1",
    tt: "16589",
    telt: "06.12.2022",
    agents: "Дата доставки",
    day: "16589",
    visit: "Саша",
    territories: "16589",
  },
  {
    id: "1",
    tt: "16589",
    telt: "06.12.2022",
    agents: "Дата доставки",
    day: "16589",
    visit: "Саша",
    territories: "16589",
  },
  {
    id: "1",
    tt: "16589",
    telt: "06.12.2022",
    agents: "Дата доставки",
    day: "16589",
    visit: "Саша",
    territories: "16589",
  },
  {
    id: "1",
    tt: "16589",
    telt: "06.12.2022",
    agents: "Дата доставки",
    day: "16589",
    visit: "Саша",
    territories: "16589",
  },
  {
    id: "1",
    tt: "16589",
    telt: "06.12.2022",
    agents: "Дата доставки",
    day: "16589",
    visit: "Саша",
    territories: "16589",
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
