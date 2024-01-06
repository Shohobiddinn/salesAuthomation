<template>
  <div class="rounded-lg bg-white border-grey px-[2px]">
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
      <table class="w-full rounded-t-large overflow-hidden whitespace-nowrap">
        <thead>
          <tr class="mr-1.5 border-primary-gray border-y-1 header-row">
            <td v-for="item in headerT" class="bor fs-12 font-bold py-2 px-2">
              {{ item.name }}
            </td>
          </tr>
          <tr class="mr-1.5 border-primary-gray border-y-1 header-row">
            <th
              class="bor p-2"
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
        </thead>
        <tbody>
          <template v-for="(data, index) in loadedData" :key="data">
            <tr class="border-t-1 child">
              <td v-for="key in headers" :key="key" class="pl-3 bor">
                <button
                  @click="openProducts(index)"
                  v-if="key.key === 'classification'"
                  class="flex justify-start fw-4 fs-14 items-center text-gray-400"
                >
                  <IconArrowBottom />
                  <div class="ml-2 text-gray-700">
                    {{ data[key.key] }}
                  </div>
                </button>
                <flex-col v-if="key.key !== 'classification'" class="py-2">
                  <flex-row
                    class="justify-start fw-4 fs-14 items-center text-gray-700"
                  >
                    <div>
                      {{ data[key.key] }}
                    </div>
                  </flex-row>
                </flex-col>
              </td>
            </tr>
            <template
              v-if="showProduct.isActive && showProduct.index === index"
            >
              <tr
                v-for="(product, chIndex) in data.items"
                :key="'children' + index + chIndex"
                class="child"
              >
                <td v-for="key in headers" :key="key" class="px-3 bor">
                  <flex-col class="">
                    <flex-row
                      v-if="key.key === 'product'"
                      class="justify-between pl-4 fs-14 fw-4 text-gray-400"
                    >
                      {{ data[key.key] }}
                    </flex-row>
                    <flex-row
                      v-if="key.key !== 'product'"
                      class="justify-between fs-14 fw-4 text-gray-400"
                    >
                      {{ data[key.key] }}
                    </flex-row>
                  </flex-col>
                </td>
              </tr>
            </template>
          </template>
          <tr class="border-t-1 border-b bg-input">
            <td class="fs-14 text-gray-3 pl-3 py-2">Общий</td>
            <td class="fs-14 fw-6 text-black pl-3 py-2">13126</td>
            <td class="fs-14 fw-6 text-black pl-3 py-2">13126</td>
            <td class="fs-14 fw-6 text-black pl-3 py-2">13126</td>
            <td class="fs-14 fw-6 text-black pl-3 py-2">13126</td>
            <td class="fs-14 fw-6 text-black pl-3 py-2">13126</td>
            <td class="fs-14 fw-6 text-black pl-3 py-2">13126</td>
            <td class="fs-14 fw-6 text-black pl-3 py-2">13126</td>
            <td class="fs-14 fw-6 text-black pl-3 py-2">13126</td>
            <td class="fs-14 fw-6 text-black pl-3 py-2">13126</td>
          </tr>
        </tbody>
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
        <drag-and-drop></drag-and-drop>
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
function draggableDialog() {
  draggable.value = false;
}
const showProduct = ref({
  isActive: false,
  index: 0,
});
function openProducts(index) {
  showProduct.value.isActive = !showProduct.value.isActive;
  showProduct.value.index = index;
}
const headerT = ref([
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
    name: "",
  },
  {
    name: "",
  },
  {
    name: "Доля",
  },
  {
    name: "",
  },
  {
    name: "",
  },
]);
let headers = ref([
  {
    name: "Классификация",
    checked: true,
    key: "classification",
    type: "classification",
    thWidth: "120px",
    bRadius: "8px",
  },
  {
    name: "Кол-во клиентов",
    checked: true,
    key: "clientQty",
    type: "clientQty",
    thWidth: "140px",
  },
  {
    name: "Кол-во заказов",
    checked: true,
    key: "orderQty",
    type: "orderQty",
    thWidth: "100px",
  },
  {
    name: "Сумма",
    checked: true,
    key: "amount",
    type: "amount",
    thWidth: "90px",
  },
  {
    name: "Средний чек",
    checked: true,
    key: "averageCheck",
    type: "averageCheck",
    thWidth: "120px",
  },
  {
    name: "Coca cola",
    checked: true,
    key: "cocaCola",
    type: "cocaCola",
    thWidth: "100px",
  },
  {
    name: "Pepsi",
    checked: true,
    key: "pepsi",
    type: "pepsi",
    thWidth: "90px",
  },
  {
    name: "Dinay",
    checked: true,
    key: "dinay",
    type: "dinay",
    thWidth: "160px",
  },
  {
    name: "Dena",
    checked: true,
    key: "dena",
    type: "dena",
    thWidth: "160px",
  },
  {
    name: "Fanta",
    checked: true,
    key: "fanta",
    type: "fanta",
    thWidth: "160px",
  },
]);
const loadedData = ref([
  {
    classification: "Dena",
    clientQty: "Lorem ipsum",
    orderQty: "13268",
    amount: "13268",
    averageCheck: "13268",
    cocaCola: "13268",
    pepsi: "13268",
    dinay: "13268",
    dena: "13268",
    fanta: "13268",
    items: [
      {
        classification: "Dena",
        clientQty: "Lorem ipsum",
        orderQty: "13268",
        amount: "13268",
        averageCheck: "13268",
        cocaCola: "13268",
        pepsi: "13268",
        dinay: "13268",
        dena: "13268",
        fanta: "13268",
      },
      {
        classification: "Dena",
        clientQty: "Lorem ipsum",
        orderQty: "13268",
        amount: "13268",
        averageCheck: "13268",
        cocaCola: "13268",
        pepsi: "13268",
        dinay: "13268",
        dena: "13268",
        fanta: "13268",
      },
      {
        classification: "Dena",
        clientQty: "Lorem ipsum",
        orderQty: "13268",
        amount: "13268",
        averageCheck: "13268",
        cocaCola: "13268",
        pepsi: "13268",
        dinay: "13268",
        dena: "13268",
        fanta: "13268",
      },
    ],
  },
  {
    classification: "Dena",
    clientQty: "Lorem ipsum",
    orderQty: "13268",
    amount: "13268",
    averageCheck: "13268",
    cocaCola: "13268",
    pepsi: "13268",
    dinay: "13268",
    dena: "13268",
    fanta: "13268",
    items: [
      {
        classification: "Dena",
        clientQty: "Lorem ipsum",
        orderQty: "13268",
        amount: "13268",
        averageCheck: "13268",
        cocaCola: "13268",
        pepsi: "13268",
        dinay: "13268",
        dena: "13268",
        fanta: "13268",
      },
      {
        classification: "Dena",
        clientQty: "Lorem ipsum",
        orderQty: "13268",
        amount: "13268",
        averageCheck: "13268",
        cocaCola: "13268",
        pepsi: "13268",
        dinay: "13268",
        dena: "13268",
        fanta: "13268",
      },
      {
        classification: "Dena",
        clientQty: "Lorem ipsum",
        orderQty: "13268",
        amount: "13268",
        averageCheck: "13268",
        cocaCola: "13268",
        pepsi: "13268",
        dinay: "13268",
        dena: "13268",
        fanta: "13268",
      },
    ],
  },
  {
    classification: "Dena",
    clientQty: "Lorem ipsum",
    orderQty: "13268",
    amount: "13268",
    averageCheck: "13268",
    cocaCola: "13268",
    pepsi: "13268",
    dinay: "13268",
    dena: "13268",
    fanta: "13268",
    items: [
      {
        classification: "Dena",
        clientQty: "Lorem ipsum",
        orderQty: "13268",
        amount: "13268",
        averageCheck: "13268",
        cocaCola: "13268",
        pepsi: "13268",
        dinay: "13268",
        dena: "13268",
        fanta: "13268",
      },
      {
        classification: "Dena",
        clientQty: "Lorem ipsum",
        orderQty: "13268",
        amount: "13268",
        averageCheck: "13268",
        cocaCola: "13268",
        pepsi: "13268",
        dinay: "13268",
        dena: "13268",
        fanta: "13268",
      },
      {
        classification: "Dena",
        clientQty: "Lorem ipsum",
        orderQty: "13268",
        amount: "13268",
        averageCheck: "13268",
        cocaCola: "13268",
        pepsi: "13268",
        dinay: "13268",
        dena: "13268",
        fanta: "13268",
      },
    ],
  },
  {
    classification: "Dena",
    clientQty: "Lorem ipsum",
    orderQty: "13268",
    amount: "13268",
    averageCheck: "13268",
    cocaCola: "13268",
    pepsi: "13268",
    dinay: "13268",
    dena: "13268",
    fanta: "13268",
    items: [
      {
        classification: "Dena",
        clientQty: "Lorem ipsum",
        orderQty: "13268",
        amount: "13268",
        averageCheck: "13268",
        cocaCola: "13268",
        pepsi: "13268",
        dinay: "13268",
        dena: "13268",
        fanta: "13268",
      },
      {
        classification: "Dena",
        clientQty: "Lorem ipsum",
        orderQty: "13268",
        amount: "13268",
        averageCheck: "13268",
        cocaCola: "13268",
        pepsi: "13268",
        dinay: "13268",
        dena: "13268",
        fanta: "13268",
      },
      {
        classification: "Dena",
        clientQty: "Lorem ipsum",
        orderQty: "13268",
        amount: "13268",
        averageCheck: "13268",
        cocaCola: "13268",
        pepsi: "13268",
        dinay: "13268",
        dena: "13268",
        fanta: "13268",
      },
    ],
  },
  {
    classification: "Dena",
    clientQty: "Lorem ipsum",
    orderQty: "13268",
    amount: "13268",
    averageCheck: "13268",
    cocaCola: "13268",
    pepsi: "13268",
    dinay: "13268",
    dena: "13268",
    fanta: "13268",
    items: [
      {
        classification: "Dena",
        clientQty: "Lorem ipsum",
        orderQty: "13268",
        amount: "13268",
        averageCheck: "13268",
        cocaCola: "13268",
        pepsi: "13268",
        dinay: "13268",
        dena: "13268",
        fanta: "13268",
      },
      {
        classification: "Dena",
        clientQty: "Lorem ipsum",
        orderQty: "13268",
        amount: "13268",
        averageCheck: "13268",
        cocaCola: "13268",
        pepsi: "13268",
        dinay: "13268",
        dena: "13268",
        fanta: "13268",
      },
      {
        classification: "Dena",
        clientQty: "Lorem ipsum",
        orderQty: "13268",
        amount: "13268",
        averageCheck: "13268",
        cocaCola: "13268",
        pepsi: "13268",
        dinay: "13268",
        dena: "13268",
        fanta: "13268",
      },
    ],
  },
  {
    classification: "Dena",
    clientQty: "Lorem ipsum",
    orderQty: "13268",
    amount: "13268",
    averageCheck: "13268",
    cocaCola: "13268",
    pepsi: "13268",
    dinay: "13268",
    dena: "13268",
    fanta: "13268",
    items: [
      {
        classification: "Dena",
        clientQty: "Lorem ipsum",
        orderQty: "13268",
        amount: "13268",
        averageCheck: "13268",
        cocaCola: "13268",
        pepsi: "13268",
        dinay: "13268",
        dena: "13268",
        fanta: "13268",
      },
      {
        classification: "Dena",
        clientQty: "Lorem ipsum",
        orderQty: "13268",
        amount: "13268",
        averageCheck: "13268",
        cocaCola: "13268",
        pepsi: "13268",
        dinay: "13268",
        dena: "13268",
        fanta: "13268",
      },
      {
        classification: "Dena",
        clientQty: "Lorem ipsum",
        orderQty: "13268",
        amount: "13268",
        averageCheck: "13268",
        cocaCola: "13268",
        pepsi: "13268",
        dinay: "13268",
        dena: "13268",
        fanta: "13268",
      },
    ],
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

.bor:nth-child(5) {
  border-right: 1px solid #e1e4e4;
}
</style>
