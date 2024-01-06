<template>
  <div>
    <div class="rounded-lg bg-white border-grey px-[2px] mt-2">
      <div class="flex justify-between">
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
      </div>
      <div class="overflow-auto table-containers">
        <data-table :headers="headers" @sort="sortData" :sorted="sortedData">
          <template #body>
            <template v-for="(data, index) in loadedData" :key="index">
              <c-tr class="b-bottom cursor-pointer">
                <c-td-no-edit v-for="key in headers" :key="key">
                  <div class="py-2 underline pb-2" v-if="key.key === 'type'">
                    {{ data[key.key] }}
                  </div>
                  <div class="py-2" v-if="key.key !== 'type'">
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
import ArrowBottom from "~/components/icon/ArrowBottom.vue";
const searchText = ref("");
const availablePages = ref(28);
let currentPage = ref(1);
let pageSize = ref(10);
const draggable = ref(false);
// Methods
function draggableDialog() {
  draggable.value = false;
}

let headers = ref([
  {
    name: "Дата оплаты",
    checked: true,
    key: "datePayment",
    type: "datePayment",
    thWidth: "120px",
    bRadius: "8px",
  },
  {
    name: "Тип",
    checked: true,
    key: "type",
    type: "type",
    thWidth: "100px",
  },
  {
    name: "Долг",
    checked: true,
    key: "dolg",
    type: "dolg",
    thWidth: "140px",
  },
  {
    name: "Оплата",
    checked: true,
    key: "payment",
    type: "payment",
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
    name: "Экспедитор",
    checked: true,
    key: "expeditor",
    type: "expeditor",
    thWidth: "120px",
  },
  {
    name: "Комментарии",
    checked: true,
    key: "comment",
    type: "comment",
    thWidth: "120px",
  },
  {
    name: "Операции",
    checked: true,
    key: "operation",
    type: "operation",
    thWidth: "120px",
  },
]);
const loadedData = ref([
  {
    datePayment: "05.11.2022",
    type: "Заказ",
    dolg: "-100 000 000",
    payment: "100 000 000",
    agents: "Андрей",
    expeditor: "Основной",
    comment: "Lorem ipsum",
    operation: "",
  },
  {
    datePayment: "05.11.2022",
    type: "Заказ",
    dolg: "-100 000 000",
    payment: "100 000 000",
    agents: "Андрей",
    expeditor: "Основной",
    comment: "Lorem ipsum",
    operation: "",
  },
  {
    datePayment: "05.11.2022",
    type: "Заказ",
    dolg: "-100 000 000",
    payment: "100 000 000",
    agents: "Андрей",
    expeditor: "Основной",
    comment: "Lorem ipsum",
    operation: "",
  },
  {
    datePayment: "05.11.2022",
    type: "Заказ",
    dolg: "-100 000 000",
    payment: "100 000 000",
    agents: "Андрей",
    expeditor: "Основной",
    comment: "Lorem ipsum",
    operation: "",
  },
  {
    datePayment: "05.11.2022",
    type: "Заказ",
    dolg: "-100 000 000",
    payment: "100 000 000",
    agents: "Андрей",
    expeditor: "Основной",
    comment: "Lorem ipsum",
    operation: "",
  },
  {
    datePayment: "05.11.2022",
    type: "Заказ",
    dolg: "-100 000 000",
    payment: "100 000 000",
    agents: "Андрей",
    expeditor: "Основной",
    comment: "Lorem ipsum",
    operation: "",
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

<style scoped></style>
