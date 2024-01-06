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
      <table-filter :templates="headers"></table-filter>
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
    <div class="w-full overflow-auto">
      <data-table :headers="headers" @sort="sortData" :sorted="sortedData">
        <template #body>
          <template v-for="(data, index) in loadedData" :key="index">
            <c-tr class="border-b-none b-bottom cursor-pointer">
              <c-td-no-edit v-for="key in headers" :key="key">
                <div class="py-2" v-if="key.checked">
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
    <div v-if="paymentModal">
      <d-modal
        @closeDialog="paymentDialog"
        :dataContainerWidth="'625px'"
        :name="'Оплата ID - 1235'"
      >
        <lazy-clients-payment-dialog />
      </d-modal>
    </div>
  </transition>
</template>

<script setup>
// State
const emit = defineEmits(["editInventory"]);
function edit() {
  emit("editInventory");
}
import { ref } from "vue";
const searchText = ref("");
const availablePages = ref(28);
let currentPage = ref(1);
let pageSize = ref(10);
const draggable = ref(false);
// Methods
const paymentModal = ref(false);
function paymentDialog() {
  paymentModal.value = false;
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
let headers = ref([
  {
    name: "Название клиента",
    checked: true,
    key: "clientName",
    type: "clientName",
    thWidth: "140px",
    bRadius: "8px",
  },
  {
    name: "Название компании",
    checked: true,
    key: "companyName",
    type: "companyName",
    thWidth: "150px",
  },
  {
    name: "Номер телефона",
    checked: true,
    key: "phoneNumber",
    type: "phoneNumber",
    thWidth: "140px",
  },
  {
    name: "Агент",
    checked: true,
    key: "agent",
    type: "agent",
    thWidth: "100px",
  },

  {
    name: "Аудитор",
    checked: true,
    key: "auditor",
    type: "auditor",
    thWidth: "100px",
  },
  {
    name: "По названии",
    checked: true,
    key: "nameBy",
    type: "nameBy",
    thWidth: "140px",
  },
  {
    name: "По названии компании",
    checked: true,
    key: "companyNameBy",
    type: "companyNameBy",
    thWidth: "180px",
  },
  {
    name: "По телефону",
    checked: true,
    key: "phoneBy",
    type: "phoneBy",
    thWidth: "140px",
  },
]);
const loadedData = ref([
  {
    clientName: "Стеллажи",
    companyName: "OOO Kucharov",
    phoneNumber: "phoneNumber",
    agent: "ТП Николай",
    auditor: "merch",
    nameBy: "1",
    companyNameBy: "2",
    phoneBy: "+998 97 628 28 82",
  },
  {
    clientName: "Стеллажи",
    companyName: "OOO Kucharov",
    phoneNumber: "phoneNumber",
    agent: "ТП Николай",
    auditor: "merch",
    nameBy: "1",
    companyNameBy: "2",
    phoneBy: "+998 97 628 28 82",
  },
  {
    clientName: "Стеллажи",
    companyName: "OOO Kucharov",
    phoneNumber: "phoneNumber",
    agent: "ТП Николай",
    auditor: "merch",
    nameBy: "1",
    companyNameBy: "2",
    phoneBy: "+998 97 628 28 82",
  },
  {
    clientName: "Стеллажи",
    companyName: "OOO Kucharov",
    phoneNumber: "phoneNumber",
    agent: "ТП Николай",
    auditor: "merch",
    nameBy: "1",
    companyNameBy: "2",
    phoneBy: "+998 97 628 28 82",
  },
  {
    clientName: "Стеллажи",
    companyName: "OOO Kucharov",
    phoneNumber: "phoneNumber",
    agent: "ТП Николай",
    auditor: "merch",
    nameBy: "1",
    companyNameBy: "2",
    phoneBy: "+998 97 628 28 82",
  },
  {
    clientName: "Стеллажи",
    companyName: "OOO Kucharov",
    phoneNumber: "phoneNumber",
    agent: "ТП Николай",
    auditor: "merch",
    nameBy: "1",
    companyNameBy: "2",
    phoneBy: "+998 97 628 28 82",
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
</style>
