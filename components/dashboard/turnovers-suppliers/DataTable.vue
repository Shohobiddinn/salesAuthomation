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
    <div class="overflow-auto table-containers">
      <data-table :headers="headers" @sort="sortData" :sorted="sortedData">
        <template #body>
          <template v-for="(data, index) in loadedData" :key="index">
            <c-tr class="b-bottom cursor-pointer">
              <c-td-no-edit v-for="key in headers" :key="key">
                <div
                  @click="payment = true"
                  class="py-2 underline pb-2"
                  v-if="key.key === 'supplier' && key.checked"
                >
                  {{ data[key.key] }}
                </div>
                <div class="py-2" v-if="key.key !== 'supplier' && key.checked">
                  {{ data[key.key] }}
                </div>
              </c-td-no-edit>
            </c-tr>
          </template>
          <tr class="border-b-1">
            <td v-for="(item, index) in result" class="fs-12 fw-6 py-2 px-4">
              <div v-if="headers[index] && headers[index].checked">
                {{ item.name }}
              </div>
            </td>
          </tr>
          <tr class="border-b-1">
            <td v-for="(item, index) in turnovers" class="fs-12 fw-6 py-2 px-4">
              <div v-if="headers[index] && headers[index].checked">
                {{ item.name }}
              </div>
            </td>
          </tr>
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
function draggableDialog() {
  draggable.value = false;
}
const payment = ref(false);
function closePayment() {
  payment.value = false;
}
let headers = ref([
  {
    name: "Поставщик",
    checked: true,
    key: "supplier",
    type: "supplier",
    thWidth: "170px",
  },
  {
    name: "Наш баланс на начало периода",
    checked: true,
    key: "balance",
    type: "balance",
    thWidth: "240px",
    bRadius: "8px",
  },

  {
    name: "Мы должны",
    checked: true,
    key: "haveTo",
    type: "haveTo",
    thWidth: "180px",
  },
  {
    name: "Мы закрыли",
    checked: true,
    key: "closed",
    type: "closed",
    thWidth: "140px",
  },
  {
    name: "Наш баланс на конец периода",
    checked: true,
    key: "periodBalance",
    type: "periodBalance",
    thWidth: "280px",
  },
]);
const loadedData = ref([
  {
    supplier: "Основной поставщика",
    balance: "-27,444,772,800",
    haveTo: "-27,444,772,800",
    closed: "-27,444,772,800",
    periodBalance: "-27,444,772,800",
  },
  {
    supplier: "Основной поставщика",
    balance: "-27,444,772,800",
    haveTo: "-27,444,772,800",
    closed: "-27,444,772,800",
    periodBalance: "-27,444,772,800",
  },
  {
    supplier: "Основной поставщика",
    balance: "-27,444,772,800",
    haveTo: "-27,444,772,800",
    closed: "-27,444,772,800",
    periodBalance: "-27,444,772,800",
  },
  {
    supplier: "Основной поставщика",
    balance: "-27,444,772,800",
    haveTo: "-27,444,772,800",
    closed: "-27,444,772,800",
    periodBalance: "-27,444,772,800",
  },
  {
    supplier: "Основной поставщика",
    balance: "-27,444,772,800",
    haveTo: "-27,444,772,800",
    closed: "-27,444,772,800",
    periodBalance: "-27,444,772,800",
  },
  {
    supplier: "Основной поставщика",
    balance: "-27,444,772,800",
    haveTo: "-27,444,772,800",
    closed: "-27,444,772,800",
    periodBalance: "-27,444,772,800",
  },
]);
const result = ref([
  {
    name: "Итоги",
  },
  {
    name: "10 000 000",
  },
  {
    name: "10 000 000",
  },
  {
    name: "10 000 000",
  },
  {
    name: "10 000 000",
  },
]);
const turnovers = ref([
  {
    name: "Обороты",
  },
  {
    name: "10 000 000",
  },
  {
    name: "10 000 000",
  },
  {
    name: "10 000 000",
  },
  {
    name: "10 000 000",
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
