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
      <data-table
        :headers="headers"
        @sort="sortData"
        :border="true"
        :sorted="sortedData"
      >
        <template #body>
          <template v-for="(data, index) in loadedData" :key="index">
            <c-tr class="b-bottom cursor-pointer">
              <c-td-no-edit v-for="key in headers" :key="key" class="brr">
                <button
                  class="py-2 pb-2 bg-red-200 text-red rounded-20 px-3"
                  v-if="key.key === 'status' && key.checked"
                >
                  {{ data[key.key] }}
                </button>
                <button
                  class="py-2 pb-2 bg-blue-10 text-white rounded-lg px-3"
                  v-if="key.key === 'dateExpense' && key.checked"
                >
                  {{ data[key.key] }}
                </button>
                <button
                  @click="payment = true"
                  class="py-2 pb-2 bg-blue-600 text-white rounded-lg px-3"
                  v-if="key.key === 'pay' && key.checked"
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
function edite() {
  active.value.isEdite = true;
}
function create() {
  active.value.isCreate = true;
  active.value.isEdite = false;
}
function reset() {}
function draggableDialog() {
  draggable.value = false;
}
const payment = ref(false);
function closePayment() {
  payment.value = false;
}
let headers = ref([
  {
    name: "Должность",
    checked: true,
    key: "important",
    type: "import",
    thWidth: "140px",
    bRadius: "8px",
  },
  {
    name: "Иш куни (План/факт)",
    checked: true,
    key: "workDay",
    type: "workDay",
    thWidth: "170px",
  },
  {
    name: "Статус",
    checked: true,
    key: "status",
    type: "status",
    thWidth: "120px",
  },
  {
    name: "Аванс",
    checked: true,
    key: "expense",
    type: "expense",
    thWidth: "120px",
  },
  {
    name: "Дать аванс",
    checked: true,
    key: "dateExpense",
    type: "dateExpense",
    thWidth: "120px",
  },
  {
    name: "Долг",
    checked: true,
    key: "dolg",
    type: "dolg",
    thWidth: "120px",
  },

  {
    name: "Пластик",
    checked: true,
    key: "plastic",
    type: "plastic",
    thWidth: "120px",
  },
  {
    name: "Берилиши керак",
    checked: true,
    key: "must",
    type: "must",
    thWidth: "160px",
  },
  {
    name: "Премия",
    checked: true,
    key: "prize",
    type: "prize",
    thWidth: "120px",
  },
  {
    name: "Берилди",
    checked: true,
    key: "given",
    type: "given",
    thWidth: "120px",
  },
  {
    name: "Оплатить",
    checked: true,
    key: "pay",
    type: "pay",
    thWidth: "120px",
  },
]);
const loadedData = ref([
  {
    important: "Оператор",
    workDay: "Основной",
    status: "Не оплачено",
    expense: "1 000 000",
    dateExpense: "Аванс",
    dolg: "1 000 000",
    plastic: "0",
    must: "4 000 000",
    prize: "4 000 000",
    given: "0",
    pay: "Зарплата",
  },
  {
    important: "Оператор",
    workDay: "Основной",
    status: "Не оплачено",
    expense: "1 000 000",
    dateExpense: "Аванс",
    dolg: "1 000 000",
    plastic: "0",
    must: "4 000 000",
    prize: "4 000 000",
    given: "0",
    pay: "Зарплата",
  },
  {
    important: "Оператор",
    workDay: "Основной",
    status: "Не оплачено",
    expense: "1 000 000",
    dateExpense: "Аванс",
    dolg: "1 000 000",
    plastic: "0",
    must: "4 000 000",
    prize: "4 000 000",
    given: "0",
    pay: "Зарплата",
  },
  {
    important: "Оператор",
    workDay: "Основной",
    status: "Не оплачено",
    expense: "1 000 000",
    dateExpense: "Аванс",
    dolg: "1 000 000",
    plastic: "0",
    must: "4 000 000",
    prize: "4 000 000",
    given: "0",
    pay: "Зарплата",
  },
  {
    important: "Оператор",
    workDay: "Основной",
    status: "Не оплачено",
    expense: "1 000 000",
    dateExpense: "Аванс",
    dolg: "1 000 000",
    plastic: "0",
    must: "4 000 000",
    prize: "4 000 000",
    given: "0",
    pay: "Зарплата",
  },
  {
    important: "Оператор",
    workDay: "Основной",
    status: "Не оплачено",
    expense: "1 000 000",
    dateExpense: "Аванс",
    dolg: "1 000 000",
    plastic: "0",
    must: "4 000 000",
    prize: "4 000 000",
    given: "0",
    pay: "Зарплата",
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
