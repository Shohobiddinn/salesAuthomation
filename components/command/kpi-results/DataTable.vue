<template>
  <div class="rounded-lg bg-white border-grey px-[2px]">
    <div class="w-full overflow-auto">
      <data-table-border
        :headers="headers"
        @sort="sortData"
        :sorted="sortedData"
      >
        <template #body>
          <c-tr v-for="data in loadedData" :key="data">
            <c-td class="td" v-for="key in headers" :key="key">
              <div class="mt-[-10px] mb-[-10px]" v-if="key.key === 'active'">
                <button
                  class="h-[33px] w-[80px] fs-12 bg-[#E3FCF0] rounded-[41px]"
                >
                  Активный
                </button>
              </div>
              <div v-if="key.checked === true" class="py-2">
                {{ data[key.key] }}
              </div>
            </c-td>
          </c-tr>
        </template>
      </data-table-border>
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
    <div v-if="bonusDiscountModal">
      <d-modal
        @closeDialog="discountBonusesDialog"
        :name="'Изменить данные агента'"
      >
        <CommandAgentsDialogBody />
      </d-modal>
    </div>
  </transition>
  <transition name="modal">
    <div v-if="agentsDeleteModal">
      <c-modal
        :dataContainerWidth="dataContainerWidth"
        @closeDialog="agentsDeleteDialogs"
      >
        <CommandAgentsDeleteDialog />
      </c-modal>
    </div>
  </transition>
</template>

<script setup>
// State
import { ref } from "vue";
const dataContainerWidth = ref("346px");
const searchText = ref("");
const availablePages = ref(28);
let currentPage = ref(1);
let pageSize = ref(10);
const draggable = ref(false);
const bonusDiscountModal = ref(false);
const agentsDeleteModal = ref(false);
// Methods
function discountBonusesDialog() {
  bonusDiscountModal.value = false;
}
function agentsDeleteDialogs() {
  agentsDeleteModal.value = false;
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
    name: "Агенты",
    checked: true,
    key: "agent",
    thWidth: "120px",
    bLeft: "8px",
  },
  {
    name: "Фикс. зарплата",
    checked: true,
    key: "salary",
    thWidth: "120px",
  },
  {
    name: "Факт",
    checked: true,
    key: "fact",
    thWidth: "140px",
  },
  {
    name: "Вознаграждение",
    checked: true,
    key: "reward",
    thWidth: "140px",
  },
  {
    name: "Итого",
    checked: true,
    key: "total",
    thWidth: "140px",
  },
  {
    name: "Факт",
    checked: true,
    key: "fact1",
    thWidth: "140px",
  },
]);
const loadedData = ref([
  {
    agent: "ТП Андрей",
    salary: "100 000 000",
    fact: "100 000 000",
    reward: "100 000 000 ",
    total: "100 000 000",
    fact1: "100 000 000",
  },
  {
    agent: "ТП Андрей",
    salary: "100 000 000",
    fact: "100 000 000",
    reward: "100 000 000 ",
    total: "100 000 000",
    fact1: "100 000 000",
  },
  {
    agent: "ТП Андрей",
    salary: "100 000 000",
    fact: "100 000 000",
    reward: "100 000 000 ",
    total: "100 000 000",
    fact1: "100 000 000",
  },
  {
    agent: "ТП Андрей",
    salary: "100 000 000",
    fact: "100 000 000",
    reward: "100 000 000 ",
    total: "100 000 000",
    fact1: "100 000 000",
  },
  {
    agent: "ТП Андрей",
    salary: "100 000 000",
    fact: "100 000 000",
    reward: "100 000 000 ",
    total: "100 000 000",
    fact1: "100 000 000",
  },
  {
    agent: "ТП Андрей",
    salary: "100 000 000",
    fact: "100 000 000",
    reward: "100 000 000 ",
    total: "100 000 000",
    fact1: "100 000 000",
  },
  {
    agent: "ТП Андрей",
    salary: "100 000 000",
    fact: "100 000 000",
    reward: "100 000 000 ",
    total: "100 000 000",
    fact1: "100 000 000",
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
.td:nth-child(2) {
  border-right: 1px solid #e1e4e4;
}
.td:nth-child(4) {
  border-right: 1px solid #e1e4e4;
}
.td:nth-child(5) {
  border-right: 1px solid #e1e4e4;
}
</style>
