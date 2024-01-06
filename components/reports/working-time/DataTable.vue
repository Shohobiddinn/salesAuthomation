<template>
  <flex-col
    v-click-outside="clickOutside"
    class="rounded-lg bg-white border-grey px-[2px] grow"
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
      <div class="w-1/4">
        <search-input
          :value="searchText"
          @updated="searchUpdated"
          class="w-full h-9.5"
        />
      </div>
      <div>
        <excel-btn :size="'300kb'"></excel-btn>
      </div>
    </div>
    <div class="overflow-auto flex flex-col">
      <data-table
        :headers="headers"
        @sort="sortData"
        :sorted="sortedData"
        class="bg-lotion"
      >
        <template #body>
          <template v-for="(data, index) in loadedData" :key="index">
            <c-tr class="cursor-pointer" :class="[data.agent && 'mt-4.5']">
              <c-td-no-edit v-for="key in headers" :key="key">
                <div
                  v-if="key.checked"
                  class="py-3.5"
                  :class="[key.key == 'agent' && 'font-semibold']"
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
  </flex-col>
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
const searchText = ref("");
const availablePages = ref(28);
let currentPage = ref(1);
let pageSize = ref(10);
const draggable = ref(false);
const td = reactive({
  isActive: false,
  index: -1,
});
function change(param) {
  headers.value = param;
  draggable.value = false;
}
// Methods
const dataContainerWidth = ref("1140px");
const changeStatus = ref(false);
function draggableDialog() {
  draggable.value = false;
}
const clickOutside = () => {
  td.isActive = false;
};

const headers = ref([
  {
    name: "Агент",
    checked: true,
    key: "agent",
    type: "come",
    thWidth: "120px",
  },
  {
    name: "Дата",
    checked: true,
    key: "date",
    type: "come",
    thWidth: "120px",
  },
  {
    name: "Первая Aктивный ",
    checked: true,
    key: "firstActivity",
    type: "come",
    thWidth: "120px",
  },
  {
    name: "Последняя Aктивный ",
    checked: true,
    key: "lastActivity",
    type: "come",
    thWidth: "120px",
  },
  {
    name: "Общее рабочее время",
    checked: true,
    key: "generalWorkingTime",
    type: "come",
    thWidth: "120px",
  },
  {
    name: "ОКБ / Общее количество Т.Т.",
    checked: true,
    key: "generalAmount",
    type: "come",
    thWidth: "120px",
  },
  {
    name: "Посещенные Т.Т.",
    checked: true,
    key: "visited",
    type: "come",
    thWidth: "120px",
  },
  {
    name: "Не посещенные Т.Т.",
    checked: true,
    key: "notVisited",
    type: "come",
    thWidth: "120px",
  },
  {
    name: "АКБ",
    checked: true,
    key: "akb",
    type: "come",
    thWidth: "120px",
  },
  {
    name: "Общая сумма заказов",
    checked: true,
    key: "generalAmountOrders",
    type: "come",
    thWidth: "120px",
  },
]);
const loadedData = ref([
  {
    agent: "Максим (Продовец)",
    date: "Окт 29	",
    firstActivity: "08:50",
    lastActivity: "08:50",
    generalWorkingTime: "38 час, 56 мин.",
    generalAmount: "108",
    visited: "108",
    notVisited: "108",
    akb: "108",
    generalAmountOrders: "108",
  },
  {
    agent: "",
    date: "Окт 29	",
    firstActivity: "08:50",
    lastActivity: "08:50",
    generalWorkingTime: "38 час, 56 мин.",
    generalAmount: "108",
    visited: "108",
    notVisited: "108",
    akb: "108",
    generalAmountOrders: "108",
  },
  {
    agent: "",
    date: "Окт 29	",
    firstActivity: "08:50",
    lastActivity: "08:50",
    generalWorkingTime: "38 час, 56 мин.",
    generalAmount: "108",
    visited: "108",
    notVisited: "108",
    akb: "108",
    generalAmountOrders: "108",
  },
  {
    agent: "",
    date: "Окт 29	",
    firstActivity: "08:50",
    lastActivity: "08:50",
    generalWorkingTime: "38 час, 56 мин.",
    generalAmount: "108",
    visited: "108",
    notVisited: "108",
    akb: "108",
    generalAmountOrders: "108",
  },
  {
    agent: "",
    date: "Окт 29	",
    firstActivity: "08:50",
    lastActivity: "08:50",
    generalWorkingTime: "38 час, 56 мин.",
    generalAmount: "108",
    visited: "108",
    notVisited: "108",
    akb: "108",
    generalAmountOrders: "108",
  },
  {
    agent: "",
    date: "Окт 29	",
    firstActivity: "08:50",
    lastActivity: "08:50",
    generalWorkingTime: "38 час, 56 мин.",
    generalAmount: "108",
    visited: "108",
    notVisited: "108",
    akb: "108",
    generalAmountOrders: "108",
  },
  {
    agent: "Максим (Продовец)",
    date: "Окт 29	",
    firstActivity: "08:50",
    lastActivity: "08:50",
    generalWorkingTime: "38 час, 56 мин.",
    generalAmount: "108",
    visited: "108",
    notVisited: "108",
    akb: "108",
    generalAmountOrders: "108",
  },
  {
    agent: "",
    date: "Окт 29	",
    firstActivity: "08:50",
    lastActivity: "08:50",
    generalWorkingTime: "38 час, 56 мин.",
    generalAmount: "108",
    visited: "108",
    notVisited: "108",
    akb: "108",
    generalAmountOrders: "108",
  },
  {
    agent: "",
    date: "Окт 29	",
    firstActivity: "08:50",
    lastActivity: "08:50",
    generalWorkingTime: "38 час, 56 мин.",
    generalAmount: "108",
    visited: "108",
    notVisited: "108",
    akb: "108",
    generalAmountOrders: "108",
  },
  {
    agent: "",
    date: "Окт 29	",
    firstActivity: "08:50",
    lastActivity: "08:50",
    generalWorkingTime: "38 час, 56 мин.",
    generalAmount: "108",
    visited: "108",
    notVisited: "108",
    akb: "108",
    generalAmountOrders: "108",
  },
  {
    agent: "",
    date: "Окт 29	",
    firstActivity: "08:50",
    lastActivity: "08:50",
    generalWorkingTime: "38 час, 56 мин.",
    generalAmount: "108",
    visited: "108",
    notVisited: "108",
    akb: "108",
    generalAmountOrders: "108",
  },
  {
    agent: "",
    date: "Окт 29	",
    firstActivity: "08:50",
    lastActivity: "08:50",
    generalWorkingTime: "38 час, 56 мин.",
    generalAmount: "108",
    visited: "108",
    notVisited: "108",
    akb: "108",
    generalAmountOrders: "108",
  },
  {
    agent: "Максим (Продовец)",
    date: "Окт 29	",
    firstActivity: "08:50",
    lastActivity: "08:50",
    generalWorkingTime: "38 час, 56 мин.",
    generalAmount: "108",
    visited: "108",
    notVisited: "108",
    akb: "108",
    generalAmountOrders: "108",
  },
  {
    agent: "",
    date: "Окт 29	",
    firstActivity: "08:50",
    lastActivity: "08:50",
    generalWorkingTime: "38 час, 56 мин.",
    generalAmount: "108",
    visited: "108",
    notVisited: "108",
    akb: "108",
    generalAmountOrders: "108",
  },
  {
    agent: "",
    date: "Окт 29	",
    firstActivity: "08:50",
    lastActivity: "08:50",
    generalWorkingTime: "38 час, 56 мин.",
    generalAmount: "108",
    visited: "108",
    notVisited: "108",
    akb: "108",
    generalAmountOrders: "108",
  },
  {
    agent: "",
    date: "Окт 29	",
    firstActivity: "08:50",
    lastActivity: "08:50",
    generalWorkingTime: "38 час, 56 мин.",
    generalAmount: "108",
    visited: "108",
    notVisited: "108",
    akb: "108",
    generalAmountOrders: "108",
  },
  {
    agent: "",
    date: "Окт 29	",
    firstActivity: "08:50",
    lastActivity: "08:50",
    generalWorkingTime: "38 час, 56 мин.",
    generalAmount: "108",
    visited: "108",
    notVisited: "108",
    akb: "108",
    generalAmountOrders: "108",
  },
  {
    agent: "",
    date: "Окт 29	",
    firstActivity: "08:50",
    lastActivity: "08:50",
    generalWorkingTime: "38 час, 56 мин.",
    generalAmount: "108",
    visited: "108",
    notVisited: "108",
    akb: "108",
    generalAmountOrders: "108",
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
