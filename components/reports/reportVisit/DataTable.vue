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
      <div class="flex grow border-t-1 bg-lotion">
        <div class="text-lg font-medium p-4.5 pr-0 border-r-1">
          <div class="w-[120px] text-black">Агенты</div>
        </div>
        <div class="text-lg w-full text-black font-medium py-4.5 px-8">
          Ноябрь
        </div>
      </div>
      <data-table :headers="headers" @sort="sortData" :sorted="sortedData">
        <template #body>
          <template v-for="(data, index) in loadedData" :key="index">
            <c-tr class="last:text-[#299B9B] cursor-pointer last:font-semibold">
              <c-td-no-edit
                v-for="key in headers"
                :class="key.borderX && 'border-r-1'"
                :key="key"
              >
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
    name: "",
    checked: true,
    key: "client",
    type: "come",
    borderX: true,
    thWidth: "120px",
  },
  {
    name: "1",
    checked: true,
    key: "1",
    type: "come",
    thWidth: "120px",
  },
  {
    name: "2",
    checked: true,
    key: "2",
    type: "come",
    thWidth: "120px",
  },
  {
    name: "3",
    checked: true,
    key: "3",
    type: "come",
    thWidth: "120px",
  },
  {
    name: "4",
    checked: true,
    key: "4",
    type: "come",
    thWidth: "120px",
  },
  {
    name: "5",
    checked: true,
    key: "5",
    type: "come",
    thWidth: "120px",
  },
  {
    name: "6",
    checked: true,
    key: "6",
    type: "come",
    thWidth: "120px",
  },
  {
    name: "7",
    checked: true,
    key: "7",
    type: "come",
    thWidth: "120px",
  },
  {
    name: "8",
    checked: true,
    key: "8",
    type: "come",
    thWidth: "120px",
  },
  {
    name: "9",
    checked: true,
    key: "9",
    type: "come",
    thWidth: "120px",
  },
  {
    name: "10",
    checked: true,
    key: "10",
    type: "come",
    thWidth: "120px",
  },
  {
    name: "11",
    checked: true,
    key: "11",
    type: "come",
    thWidth: "120px",
  },
  {
    name: "12",
    checked: true,
    key: "12",
    type: "come",
    thWidth: "120px",
  },
  {
    name: "13",
    checked: true,
    key: "13",
    type: "come",
    thWidth: "120px",
  },
  {
    name: "14",
    checked: true,
    key: "14",
    type: "come",
    thWidth: "120px",
  },
  {
    name: "15",
    checked: true,
    key: "15",
    type: "come",
    thWidth: "120px",
  },
  {
    name: "16",
    checked: true,
    key: "16",
    type: "come",
    thWidth: "120px",
  },
]);
const loadedData = ref([
  {
    client: "ТП Андрей",
    1: "27%",
    2: "27%",
    3: "27%",
    4: "27%",
    5: "27%",
    6: "27%",
    7: "27%",
    8: "27%",
    9: "27%",
    10: "27%",
    11: "27%",
    12: "27%",
    13: "27%",
    14: "27%",
    15: "27%",
    16: "27%",
  },
  {
    client: "ТП Андрей",
    1: "27%",
    2: "27%",
    3: "27%",
    4: "27%",
    5: "27%",
    6: "27%",
    7: "27%",
    8: "27%",
    9: "27%",
    10: "27%",
    11: "27%",
    12: "27%",
    13: "27%",
    14: "27%",
    15: "27%",
    16: "27%",
  },
  {
    client: "ТП Андрей",
    1: "27%",
    2: "27%",
    3: "27%",
    4: "27%",
    5: "27%",
    6: "27%",
    7: "27%",
    8: "27%",
    9: "27%",
    10: "27%",
    11: "27%",
    12: "27%",
    13: "27%",
    14: "27%",
    15: "27%",
    16: "27%",
  },
  {
    client: "ТП Андрей",
    1: "27%",
    2: "27%",
    3: "27%",
    4: "27%",
    5: "27%",
    6: "27%",
    7: "27%",
    8: "27%",
    9: "27%",
    10: "27%",
    11: "27%",
    12: "27%",
    13: "27%",
    14: "27%",
    15: "27%",
    16: "27%",
  },
  {
    client: "ТП Андрей",
    1: "27%",
    2: "27%",
    3: "27%",
    4: "27%",
    5: "27%",
    6: "27%",
    7: "27%",
    8: "27%",
    9: "27%",
    10: "27%",
    11: "27%",
    12: "27%",
    13: "27%",
    14: "27%",
    15: "27%",
    16: "27%",
  },
  {
    client: "ТП Андрей",
    1: "27%",
    2: "27%",
    3: "27%",
    4: "27%",
    5: "27%",
    6: "27%",
    7: "27%",
    8: "27%",
    9: "27%",
    10: "27%",
    11: "27%",
    12: "27%",
    13: "27%",
    14: "27%",
    15: "27%",
    16: "27%",
  },
  {
    client: "Total",
    1: "27%",
    2: "27%",
    3: "27%",
    4: "27%",
    5: "27%",
    6: "27%",
    7: "27%",
    8: "27%",
    9: "27%",
    10: "27%",
    11: "27%",
    12: "27%",
    13: "27%",
    14: "27%",
    15: "27%",
    16: "27%",
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
