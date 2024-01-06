<template>
  <div class="w-full">
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
                  <div class="py-2.5 check" v-if="key.key === 'checkbox'">
                    <checkbox :values="key.checked" />
                  </div>
                  <div
                    @click="payment = true"
                    class="underline pb-2"
                    v-if="key.key === 'supplier' && key.checked"
                  >
                    {{ data[key.key] }}
                  </div>
                  <div
                    class="py-2"
                    v-if="key.key !== 'supplier' && key.checked"
                  >
                    {{ data[key.key] }}
                  </div>
                </c-td-no-edit>
              </c-tr>
            </template>
            <tr class="border-b-1">
              <td
                v-for="(item, index) in result"
                class="py-2.4 px-5 fs-12 fw-6"
              >
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
    name: "Основная касса",
    checked: true,
    key: "mainCash",
    type: "mainCash",
    thWidth: "220px",
  },
  {
    name: "Остатки денежных средств",
    checked: true,
    key: "cashBalance",
    type: "cashBalance",
    thWidth: "250px",
    bRadius: "8px",
  },

  {
    name: "Наличный сум",
    checked: true,
    key: "cashSum",
    type: "cashSum",
    thWidth: "120px",
  },
]);
const loadedData = ref([
  {
    mainCash: "Основная касса",
    cashBalance: "-27,444,772,800",
    cashSum: "-27,444,772,800",
  },
  {
    mainCash: "Основная касса",
    cashBalance: "-27,444,772,800",
    cashSum: "-27,444,772,800",
  },
  {
    mainCash: "Основная касса",
    cashBalance: "-27,444,772,800",
    cashSum: "-27,444,772,800",
  },
  {
    mainCash: "Основная касса",
    cashBalance: "-27,444,772,800",
    cashSum: "-27,444,772,800",
  },
  {
    mainCash: "Основная касса",
    cashBalance: "-27,444,772,800",
    cashSum: "-27,444,772,800",
  },
  {
    mainCash: "Основная касса",
    cashBalance: "-27,444,772,800",
    cashSum: "-27,444,772,800",
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
