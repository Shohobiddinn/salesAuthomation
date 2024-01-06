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
      <data-table
        :headers="headers"
        @sort="sortData"
        :orderBy="orderBy"
        :sorted="sortedData"
      >
        <template #body>
          <template v-for="(data, index) in loadedData" :key="index">
            <c-tr class="border-b-none b-bottom cursor-pointer">
              <c-td-no-edit
                v-for="key in headers"
                :key="key"
                :orderBy="orderBy"
              >
                <div
                  class="p-2 border-r border-[#E1E4E4] bg-[#F0FBFB]"
                  v-if="key.checked && key.key === 'shipped'"
                >
                  {{ data[key.key] }}
                </div>
                <div
                  class="p-2 border-r border-[#E1E4E4]"
                  v-if="key.checked && key.key !== 'shipped'"
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
        <drag-and-drop @change="change" :templates="headers"></drag-and-drop>
      </d-modal>
    </div>
  </transition>
  <transition name="modal">
    <div v-if="selectModal">
      <d-modal
        @closeDialog="selectDialog"
        :dataContainerWidth="'90%'"
        :name="'Выберите клиентов'"
      >
        <ClientsContactsSelectClientdialog />
      </d-modal>
    </div>
  </transition>
  <transition name="modal">
    <div v-if="contactModal">
      <d-modal
        @closeDialog="contactDialog"
        :dataContainerWidth="'400px'"
        :name="'Контакт'"
      >
        <ClientsContactsContactDialog />
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
const selectModal = ref(false);
function selectDialog() {
  selectModal.value = false;
}
function change(param) {
  headers.value = param;
  draggable.value = false;
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
    name: "Агент",
    checked: true,
    key: "agent",
    type: "agent",
    thWidth: "300px",
  },
  {
    name: "На сумму",
    checked: true,
    key: "amountOf",
    type: "amountOf",
    thWidth: "200px",
    bRadius: "8px",
  },
  {
    name: "Snickers\n",
    checked: true,
    key: "snickers",
    type: "snickers",
    thWidth: "200px",
  },
  {
    name: "Orbit",
    checked: true,
    key: "orbit",
    type: "orbit",
    thWidth: "200px",
  },
  {
    name: "Oltariq suv",
    checked: true,
    key: "water",
    type: "water",
    thWidth: "200px",
  },
  {
    name: "Non",
    checked: true,
    key: "bread",
    type: "bread",
    thWidth: "200px",
  },
]);
const loadedData = ref([
  {
    agent: "ТП Андрей",
    amountOf: "generalOrder",
    snickers: "100 000 000 сум",
    orbit: "100 000 000 сум",
    water: "100 000 000 сум",
    bread: "100 000 000 сум",
  },
  {
    agent: "ТП Андрей",
    amountOf: "generalOrder",
    snickers: "100 000 000 сум",
    orbit: "100 000 000 сум",
    water: "100 000 000 сум",
    bread: "100 000 000 сум",
  },
  {
    agent: "ТП Андрей",
    amountOf: "generalOrder",
    snickers: "100 000 000 сум",
    orbit: "100 000 000 сум",
    water: "100 000 000 сум",
    bread: "100 000 000 сум",
  },
  {
    agent: "ТП Андрей",
    amountOf: "generalOrder",
    snickers: "100 000 000 сум",
    orbit: "100 000 000 сум",
    water: "100 000 000 сум",
    bread: "100 000 000 сум",
  },
  {
    agent: "ТП Андрей",
    amountOf: "generalOrder",
    snickers: "100 000 000 сум",
    orbit: "100 000 000 сум",
    water: "100 000 000 сум",
    bread: "100 000 000 сум",
  },
  {
    agent: "ТП Андрей",
    amountOf: "generalOrder",
    snickers: "100 000 000 сум",
    orbit: "100 000 000 сум",
    water: "100 000 000 сум",
    bread: "100 000 000 сум",
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
.down {
  display: none;
  box-shadow: rgba(136, 165, 191, 0.48) 6px 2px 16px 0px,
    rgba(255, 255, 255, 0.8) -6px -2px 16px 0px;
}
.active-down {
  display: block;
  background-color: white;
}
.down:after {
  position: absolute;
  content: "";
  right: -11px;
  bottom: 40px;
  top: 40px;
  border-left: 15px solid white;
  border-top: 20px solid transparent;
  border-bottom: 20px solid transparent;
}
.check label input {
  display: none; /* Hide the default checkbox */
}

/* Style the artificial checkbox */
.check label span {
  height: 20px;
  width: 20px;
  border-radius: 4px;
  border: 1px solid #d2d7d7;
  display: inline-block;
  position: relative;
}

/* Style its checked state...with a ticked icon */
.check [type="checkbox"]:checked + span:before {
  content: "\f106";
  position: absolute;
  font-weight: 700;
  color: transparent;
  transition: all 0.4s;
  left: 7px;
  top: 2px;
  width: 5px;
  height: 11px;
  border: solid #299b9b;
  border-width: 0 1px 1px 0;
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}
.b-bottom:last-child {
  border-bottom: 1px solid #e1e4e4;
}
.b-top-none {
  border-top: none;
}
.bgy {
  background: rgba(189, 127, 6, 0.1);
}
.bg-accepted {
  background: rgba(35, 192, 10, 0.1);
}
.bg-new {
  background: rgba(41, 155, 155, 0.1);
}
.td-shadow {
  cursor: pointer;
  box-shadow: -4px 0px 4px 0px rgba(0, 0, 0, 0.04);
}
</style>
