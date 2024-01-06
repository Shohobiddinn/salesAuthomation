<template>
  <div class="rounded-lg bg-white border-grey px-[2px]">
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
                <button
                  class="py-2 pb-2 bg-yellow-100 text-yellow-600 rounded-20 px-3"
                  v-if="key.key === 'status' && key.checked"
                >
                  {{ data[key.key] }}
                </button>
                <div
                  class="py-2"
                  v-if="
                    key.key !== 'status' &&
                    key.key !== 'dateExpense' &&
                    key.key !== 'pay' &&
                    key.checked
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
        <drag-and-drop></drag-and-drop>
      </d-modal>
    </div>
  </transition>
  <transition name="modal">
    <div v-if="payment">
      <h-no-modal @closeDialog="closePayment" :dataContainerWidth="'400px'">
        <DashboardTabelDialog />
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
// Methods
const active = ref({
  isCreate: false,
  isEdite: false,
});

function draggableDialog() {
  draggable.value = false;
}
const payment = ref(false);
function closePayment() {
  payment.value = false;
}
let headers = ref([
  {
    name: "Дата получение долга",
    checked: true,
    key: "dateDebt",
    type: "dateDebt",
    thWidth: "170px",
    bRadius: "8px",
  },
  {
    name: "Оплачет до",
    checked: true,
    key: "payUp",
    type: "payUp",
    thWidth: "120px",
  },
  {
    name: "Сумма за месяц",
    checked: true,
    key: "monthAmount",
    type: "monthAmount",
    thWidth: "140px",
  },
  {
    name: "Общая сумма долга",
    checked: true,
    key: "totalAmount",
    type: "totalAmount",
    thWidth: "160px",
  },
  {
    name: "Должность",
    checked: true,
    key: "important",
    type: "important",
    thWidth: "120px",
  },
  {
    name: "Сотрудник",
    checked: true,
    key: "employee",
    type: "employee",
    thWidth: "120px",
  },

  {
    name: "Статус",
    checked: true,
    key: "status",
    type: "status",
    thWidth: "120px",
  },
  {
    name: "Комментарии",
    checked: true,
    key: "comment",
    type: "comment",
    thWidth: "160px",
  },
]);
const loadedData = ref([
  {
    dateDebt: "05.11.2022",
    payUp: "05.11.2022",
    monthAmount: "5 000 000",
    totalAmount: "5 000 000",
    important: "Оператор",
    employee: "Fakhriyor",
    status: "Оплачивается",
    comment: "4 000 000",
  },
  {
    dateDebt: "05.11.2022",
    payUp: "05.11.2022",
    monthAmount: "5 000 000",
    totalAmount: "5 000 000",
    important: "Оператор",
    employee: "Fakhriyor",
    status: "Оплачивается",
    comment: "4 000 000",
  },
  {
    dateDebt: "05.11.2022",
    payUp: "05.11.2022",
    monthAmount: "5 000 000",
    totalAmount: "5 000 000",
    important: "Оператор",
    employee: "Fakhriyor",
    status: "Оплачивается",
    comment: "4 000 000",
  },
  {
    dateDebt: "05.11.2022",
    payUp: "05.11.2022",
    monthAmount: "5 000 000",
    totalAmount: "5 000 000",
    important: "Оператор",
    employee: "Fakhriyor",
    status: "Оплачивается",
    comment: "4 000 000",
  },
  {
    dateDebt: "05.11.2022",
    payUp: "05.11.2022",
    monthAmount: "5 000 000",
    totalAmount: "5 000 000",
    important: "Оператор",
    employee: "Fakhriyor",
    status: "Оплачивается",
    comment: "4 000 000",
  },
  {
    dateDebt: "05.11.2022",
    payUp: "05.11.2022",
    monthAmount: "5 000 000",
    totalAmount: "5 000 000",
    important: "Оператор",
    employee: "Fakhriyor",
    status: "Оплачивается",
    comment: "4 000 000",
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
.brr:nth-child(3) {
  border-right: 1px solid #e1e4e4;
}
.brr:nth-child(5) {
  border-right: 1px solid #e1e4e4;
}
</style>
