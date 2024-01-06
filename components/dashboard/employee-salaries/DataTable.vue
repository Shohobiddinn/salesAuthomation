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
      <div class="flex p-3 gap-4">
        <button
          v-if="!active.isEdite"
          @click="edite"
          class="fs-14 w-35 h-10.5 bg-[#EEF5F5] rounded-lg"
        >
          Изменить
        </button>
        <button
          v-if="active.isEdite"
          @click="reset"
          class="fs-14 w-35 h-10.5 bg-[#EEF5F5] rounded-lg"
        >
          Отменить
        </button>
        <m-btn v-if="active.isEdite" @click="create">Сохранить</m-btn>
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
                    key.key !== 'must' &&
                    key.key !== 'prize' &&
                    key.key !== 'expense' &&
                    key.checked
                  "
                >
                  {{ data[key.key] }}
                </div>
                <div class="py-2" v-if="key.key === 'must' && key.checked">
                  <div v-if="!active.isEdite">{{ data[key.key] }}</div>
                  <div v-if="active.isEdite">
                    <d-input
                      :value="data.prize"
                      @change="(value) => (data.prize = value)"
                    />
                  </div>
                </div>
                <div class="py-2" v-if="key.key === 'prize' && key.checked">
                  <div v-if="!active.isEdite">{{ data[key.key] }}</div>
                  <div v-if="active.isEdite">
                    <d-input
                      :value="data.prize"
                      @change="(value) => (data.prize = value)"
                    />
                  </div>
                </div>
                <div class="py-2" v-if="key.key === 'expense' && key.checked">
                  <div v-if="!active.isEdite">{{ data[key.key] }}</div>
                  <div v-if="active.isEdite">
                    <d-input
                      :value="data.expense"
                      @change="(value) => (data.expense = value)"
                    />
                  </div>
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
      <d-modal
        @closeDialog="closePayment"
        :dataContainerWidth="'625px'"
        :name="'Оплата № 6'"
      >
        <DashboardPaymentSuppliersDialog />
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
    type: "important",
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
    name: "Общая сумма зарплаты",
    checked: true,
    key: "totalAmount",
    type: "totalAmount",
    thWidth: "180px",
  },
  {
    name: "Долг",
    checked: true,
    key: "dolg",
    type: "dolg",
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
]);
const loadedData = ref([
  {
    important: "Оператор",
    workDay: "Основной",
    status: "Не оплачено",
    totalAmount: "5 000 000",
    dolg: "1 000 000",
    expense: "1 000 000",
    plastic: "0",
    must: "4 000 000",
    prize: "4 000 000",
    given: "0",
  },
  {
    important: "Оператор",
    workDay: "Основной",
    status: "Не оплачено",
    totalAmount: "5 000 000",
    dolg: "1 000 000",
    expense: "1 000 000",
    plastic: "0",
    must: "4 000 000",
    prize: "4 000 000",
    given: "0",
  },
  {
    important: "Оператор",
    workDay: "Основной",
    status: "Не оплачено",
    totalAmount: "5 000 000",
    dolg: "1 000 000",
    expense: "1 000 000",
    plastic: "0",
    must: "4 000 000",
    prize: "4 000 000",
    given: "0",
  },
  {
    important: "Оператор",
    workDay: "Основной",
    status: "Не оплачено",
    totalAmount: "5 000 000",
    dolg: "1 000 000",
    expense: "1 000 000",
    plastic: "0",
    must: "4 000 000",
    prize: "4 000 000",
    given: "0",
  },
  {
    important: "Оператор",
    workDay: "Основной",
    status: "Не оплачено",
    totalAmount: "5 000 000",
    dolg: "1 000 000",
    expense: "1 000 000",
    plastic: "0",
    must: "4 000 000",
    prize: "4 000 000",
    given: "0",
  },
  {
    important: "Оператор",
    workDay: "Основной",
    status: "Не оплачено",
    totalAmount: "5 000 000",
    dolg: "1 000 000",
    expense: "1 000 000",
    plastic: "0",
    must: "4 000 000",
    prize: "4 000 000",
    given: "0",
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
