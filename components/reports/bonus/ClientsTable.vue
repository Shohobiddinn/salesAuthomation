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
          <template v-for="(data, index) in loadedData" :key="index">
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
        <drag-and-drop @change="change" :templates="headers"></drag-and-drop>
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
function draggableDialog() {
  draggable.value = false;
}

function change(param) {
  headers.value = param;
  draggable.value = false;
}
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
    name: "Код агента",
    checked: true,
    key: "codeAgent",
    type: "codeAgent",
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
    name: "Общий бонус",
    checked: true,
    key: "generalBonus",
    type: "generalBonus",
    thWidth: "120px",
  },
  {
    name: "Dena",
    checked: true,
    key: "dena",
    type: "dena",
    thWidth: "120px",
  },
  {
    name: "Dena Zawrik",
    checked: true,
    key: "denaZavrik",
    type: "denaZavrik",
    thWidth: "120px",
  },
  {
    name: "Coca cola",
    checked: true,
    key: "cocaCola",
    type: "cocaCola",
    thWidth: "120px",
  },
  {
    name: "Pepsi",
    checked: true,
    key: "pepsi",
    type: "pepsi",
    thWidth: "120px",
  },
  {
    name: "Dinay",
    checked: true,
    key: "dinay",
    type: "dinay",
    thWidth: "120px",
  },
]);
const loadedData = ref([
  {
    clientId: "ID - 1235",
    clients: "Muhammad Baraka Savdo",
    codeAgent: "5 000 000 сум",
    agents: "ТП Анатолий",
    generalBonus: "23",
    dena: "23",
    denaZavrik: "23",
    cocaCola: "23",
    pepsi: "23",
    dinay: "23",
  },
  {
    clientId: "ID - 1235",
    clients: "Muhammad Baraka Savdo",
    codeAgent: "5 000 000 сум",
    agents: "ТП Анатолий",
    generalBonus: "23",
    dena: "23",
    denaZavrik: "23",
    cocaCola: "23",
    pepsi: "23",
    dinay: "23",
  },
  {
    clientId: "ID - 1235",
    clients: "Muhammad Baraka Savdo",
    codeAgent: "5 000 000 сум",
    agents: "ТП Анатолий",
    generalBonus: "23",
    dena: "23",
    denaZavrik: "23",
    cocaCola: "23",
    pepsi: "23",
    dinay: "23",
  },
  {
    clientId: "ID - 1235",
    clients: "Muhammad Baraka Savdo",
    codeAgent: "5 000 000 сум",
    agents: "ТП Анатолий",
    generalBonus: "23",
    dena: "23",
    denaZavrik: "23",
    cocaCola: "23",
    pepsi: "23",
    dinay: "23",
  },
  {
    clientId: "ID - 1235",
    clients: "Muhammad Baraka Savdo",
    codeAgent: "5 000 000 сум",
    agents: "ТП Анатолий",
    generalBonus: "23",
    dena: "23",
    denaZavrik: "23",
    cocaCola: "23",
    pepsi: "23",
    dinay: "23",
  },
  {
    clientId: "ID - 1235",
    clients: "Muhammad Baraka Savdo",
    codeAgent: "5 000 000 сум",
    agents: "ТП Анатолий",
    generalBonus: "23",
    dena: "23",
    denaZavrik: "23",
    cocaCola: "23",
    pepsi: "23",
    dinay: "23",
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
</style>
