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
    <div class="overflow-auto table-containers">
      <data-table :headers="headers" @sort="sortData" :sorted="sortedData">
        <template #body>
          <template v-for="(data, index) in loadedData" :key="index">
            <c-tr class="border-b-none b-bottom cursor-pointer">
              <c-td-no-edit v-for="key in headers" :key="key">
                <div class="pt-2 ml-[-2px] check" v-if="key.key === 'checkbox'">
                  <label>
                    <input type="checkbox" />
                    <span></span>
                  </label>
                </div>
                <div
                  class=""
                  v-if="
                    key.checked &&
                    key.key !== 'client' &&
                    key.key !== 'agent' &&
                    key.key !== 'status' &&
                    key.key !== 'data'
                  "
                >
                  {{ data[key.key] }}
                </div>
                <nuxt-link v-if="key.checked && key.key === 'data'">
                  <span class="border-b border-blue-10 pb-1">{{
                    data[key.key]
                  }}</span>
                </nuxt-link>
                <button
                  class="bg-blue-100 rounded-[40px] p-1 px-2"
                  v-if="key.checked && key.key === 'status'"
                >
                  <span class="text-bluer my-4">{{ data[key.key] }}</span>
                </button>
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
</template>

<script setup>
// State
import { ref } from "vue";
const searchText = ref("");
const availablePages = ref(28);
let currentPage = ref(1);
let pageSize = ref(10);
const draggable = ref(false);
// Methods
const dataContainerWidth = ref("1140px");
function draggableDialog() {
  draggable.value = false;
}
let headers = ref([
  {
    name: "",
    checked: true,
    key: "checkbox",
    type: "checkbox",
    thWidth: "120px",
    bRadius: "8px",
  },
  {
    name: "№",
    checked: true,
    key: "no",
    type: "no",
    thWidth: "40px",
    bRadius: "8px",
  },
  {
    name: "Дата создания",
    checked: true,
    key: "dataAdd",
    type: "dataAdd",
    thWidth: "120px",
  },
  {
    name: "Дата",
    checked: true,
    key: "data",
    type: "data",
    thWidth: "120px",
  },
  {
    name: "Кол-во",
    checked: true,
    key: "qty",
    type: "qty",
    thWidth: "70px",
  },
  {
    name: "Статус",
    checked: true,
    key: "status",
    type: "status",
    thWidth: "120px",
  },
  {
    name: "Сумма",
    checked: true,
    key: "amount",
    type: "amount",
    thWidth: "100px",
  },
  {
    name: "Комментарии",
    checked: true,
    key: "comment",
    type: "comment",
    thWidth: "120px",
  },

  {
    name: "Склад",
    checked: true,
    key: "warehouses",
    type: "warehouses",
    thWidth: "100px",
  },
]);
const loadedData = ref([
  {
    no: "1",
    dataAdd: "27.10.2022 13:40",
    data: "27.10.2022 13:40",
    qty: "31268",
    status: "Новый заказ",
    amount: "100 000 000",
    comment: "-",
    warehouses: "Основной склад",
  },
  {
    no: "1",
    dataAdd: "27.10.2022 13:40",
    data: "27.10.2022 13:40",
    qty: "31268",
    status: "Новый заказ",
    amount: "100 000 000",
    comment: "-",
    warehouses: "Основной склад",
  },
  {
    no: "1",
    dataAdd: "27.10.2022 13:40",
    data: "27.10.2022 13:40",
    qty: "31268",
    status: "Новый заказ",
    amount: "100 000 000",
    comment: "-",
    warehouses: "Основной склад",
  },
  {
    no: "1",
    dataAdd: "27.10.2022 13:40",
    data: "27.10.2022 13:40",
    qty: "31268",
    status: "Новый заказ",
    amount: "100 000 000",
    comment: "-",
    warehouses: "Основной склад",
  },
  {
    no: "1",
    dataAdd: "27.10.2022 13:40",
    data: "27.10.2022 13:40",
    qty: "31268",
    status: "Новый заказ",
    amount: "100 000 000",
    comment: "-",
    warehouses: "Основной склад",
  },
  {
    no: "1",
    dataAdd: "27.10.2022 13:40",
    data: "27.10.2022 13:40",
    qty: "31268",
    status: "Новый заказ",
    amount: "100 000 000",
    comment: "-",
    warehouses: "Основной склад",
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
