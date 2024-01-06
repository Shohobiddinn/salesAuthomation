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
      <table class="w-full">
        <tr class="mr-1.5 border-primary-gray border-y-1 header-row">
          <td v-for="item in headerT" class="bor fs-12 font-bold py-2 px-2">
            {{ item.name }}
          </td>
        </tr>
        <tr class="mr-1.5 border-primary-gray border-y-1 header-row">
          <th
            class="bor"
            :style="{ background: header.bgHeader }"
            :class="[
              header.key === 'stockEnough' ? 'border-x-1' : '',
              orderBy ? 'brr' : '',
            ]"
            v-for="header in headers"
            :key="header"
          >
            <div>
              <div
                v-if="header.type !== 'checkbox'"
                :style="{ width: header.thWidth }"
                class="flex p-1 gap-1 fs-14 fw-4"
              >
                <div class="secondary-gray-text">
                  {{ header.name }}
                </div>
                <div
                  v-if="
                    header.type !== 'diapazon' &&
                    header.type !== 'inWarehouse' &&
                    header.type !== 'come' &&
                    header.type !== 'quantitys'
                  "
                  class="grid"
                >
                  <fa-icon class="fa-icon cursor-pointer"
                           :class="!(sortedData.field === header.key && sortedData.is_asc) ? '-my-0.8':'-mb-0'"
                           v-if="!(sortedData.field === header.key && !sortedData.is_asc)"
                           @click="sortedData(header.key, false)"
                           hash="&#xf0d8"/>
                  <fa-icon class="fa-icon cursor-pointer"
                           :class="!(sortedData.field === header.key && !sortedData.is_asc) ? '-my-3.5':'mt-0'"
                           v-if="!(sortedData.field === header.key && sortedData.is_asc)"
                           @click="sortedData(header.key, true)"
                           hash="&#xf0d7"/>
                </div>
              </div>
            </div>
          </th>
        </tr>
        <tr
          v-for="(data, index) in loadedData"
          :class="[data.amount < 1 ? 'bg-gray-100' : '']"
          :key="index"
          class="border-b b-bottom cursor-pointer fs-12 fw-4"
        >
          <td v-for="key in headers" :key="key" :orderBy="orderBy" class="bor">
            <button
              @click="clientsId = true"
              class="p-2 bg-[#F0FBFB]"
              v-if="key.checked && key.key === 'clientId'"
            >
              {{ data[key.key] }}
            </button>
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
                key.checked && key.key !== 'clientId' && key.key !== 'agent'
              "
            >
              {{ data[key.key] }}
            </div>
          </td>
        </tr>
      </table>
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
    <div v-if="clientsId">
      <h-no-modal @closeDialog="closeClient" :dataContainerWidth="'1363px'">
        <div class="-mt-6">
          <page-title :title="'Закуп по месецям'" />
          <div class="mt-2">
            <reports-inventory-dialog-table />
          </div>
        </div>
      </h-no-modal>
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
const clientsId = ref(false);
function closeClient() {
  clientsId.value = false;
}
function change(param) {
  headers.value = param;
  draggable.value = false;
}
function draggableDialog() {
  draggable.value = false;
}
const clickOutside = () => {
  td.isActive = false;
  console.log(td.isActive);
};
const headerT = ref([
  {
    name: "",
  },
  {
    name: "",
  },
  {
    name: "Текущая дата",
  },
  {
    name: "",
  },
  {
    name: "",
  },
  {
    name: "",
  },
  {
    name: "Последний закуп",
  },
  {
    name: "",
  },
]);
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
    name: "ID клиента",
    checked: true,
    key: "clientId",
    type: "clientId",
    thWidth: "100px",
  },
  {
    name: "Клиент",
    checked: true,
    key: "clients",
    type: "clients",
    thWidth: "180px",
    bRadius: "8px",
  },
  {
    name: "Сумма",
    checked: true,
    key: "amount",
    type: "amount",
    thWidth: "120px",
  },
  {
    name: "Объем / кол-во",
    checked: true,
    key: "qty",
    type: "qty",
    thWidth: "120px",
  },
  {
    name: "Агент",
    checked: true,
    key: "agents",
    type: "agents",
    thWidth: "120px",
  },
  {
    name: "Инвентарь",
    checked: true,
    key: "inventory",
    type: "inventory",
    thWidth: "120px",
  },
  {
    name: "Сумма",
    checked: true,
    key: "amounts",
    type: "amounts",
    thWidth: "120px",
  },
  {
    name: "Объем / кол-во",
    checked: true,
    key: "qtys",
    type: "qtys",
    thWidth: "120px",
  },
]);
const loadedData = ref([
  {
    clientId: "ID - 1235",
    clients: "Muhammad Baraka Savdo",
    amount: "5 000 000 сум",
    qty: "5 000 000 сум",
    agents: "ТП Анатолий",
    inventory: "Xolodilnik",
    amounts: "5 000 000",
    qtys: "5 000 000",
  },
  {
    clientId: "ID - 1235",
    clients: "Muhammad Baraka Savdo",
    amount: "5 000 000 сум",
    qty: "5 000 000 сум",
    agents: "ТП Анатолий",
    inventory: "Xolodilnik",
    amounts: "5 000 000",
    qtys: "5 000 000",
  },
  {
    clientId: "ID - 1235",
    clients: "Muhammad Baraka Savdo",
    amount: "5 000 000 сум",
    qty: "5 000 000 сум",
    agents: "ТП Анатолий",
    inventory: "Xolodilnik",
    amounts: "5 000 000",
    qtys: "5 000 000",
  },
  {
    clientId: "ID - 1235",
    clients: "Muhammad Baraka Savdo",
    amount: "0",
    qty: "0",
    agents: "ТП Анатолий",
    inventory: "Xolodilnik",
    amounts: "0",
    qtys: "0",
  },
  {
    clientId: "ID - 1235",
    clients: "Muhammad Baraka Savdo",
    amount: "0",
    qty: "0",
    agents: "ТП Анатолий",
    inventory: "Xolodilnik",
    amounts: "0",
    qtys: "0",
  },
  {
    clientId: "ID - 1235",
    clients: "Muhammad Baraka Savdo",
    amount: "5 000 000 сум",
    qty: "5 000 000 сум",
    agents: "ТП Анатолий",
    inventory: "Xolodilnik",
    amounts: "5 000 000",
    qtys: "5 000 000",
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
  box-shadow: -4px 0px 4px 0px rgba(0, 0, 0, 0.04);
  cursor: pointer;
}
.bor:nth-child(2) {
  border-right: 1px solid #e1e4e4;
}
.bor:nth-child(6) {
  border-right: 1px solid #e1e4e4;
}
</style>
