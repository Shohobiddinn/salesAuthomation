<template>
  <div>
    <div class="flex justify-between mt-4">
      <div class="flex gap-4">
        <button
          class="rounded-lg border w-6 h-6 p-1.5 bg-white hover:bg-gray-200 mt-2"
        >
          <ArrowBottom />
        </button>
        <div class="-mt-1.5"><page-title :title="'Супервайзеры'" /></div>
      </div>
    </div>
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
            <template v-for="(data, index) in salesSupervisor?.items" :key="index">
              <c-tr class="b-bottom cursor-pointer">
                <c-td-no-edit v-for="key in headers" :key="key">
                  <div
                    class="py-2 underline pb-2"
                    v-if="key.key === 'data' && key.checked"
                  >
                    {{ data[key.key] }}
                  </div>
                  <div class="py-2" v-if="key.key !== 'data' && key.checked">
                    {{ data[key.key] }}
                  </div>
                </c-td-no-edit>
              </c-tr>
            </template>
            <tr class="border-t-1 border-b bg-input">
              <td
                v-for="(item, index) in result"
                class="fs-14 fw-6 text-gray-3 pl-3 py-2"
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
          <page-size-btn :current-size="filters.pageSize" @setPageSize="setPageSize" />
        </div>
        <div class="p-3">
          <page-index
            :available-pages="salesSupervisor?.total_pages"
            :current-page="salesSupervisor?.page_number"
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
const props = defineProps({
  salesSupervisor:Object,
  filters:Object
})
const searchText = ref("");
const availablePages = ref(28);
let currentPage = ref(1);
let pageSize = ref(10);
const draggable = ref(false);
// Methods
const result = ref([
  {
    name: "Итоги",
  },
  {
    name: "13126",
  },
  {
    name: "13126",
  },
  {
    name: "13126",
  },
  {
    name: "13126",
  },
  {
    name: "13126",
  },
  {
    name: "13126",
  },
  {
    name: "13126",
  },
]);
function draggableDialog() {
  draggable.value = false;
}

let headers = ref([
  {
    name: "SVR",
    checked: true,
    key: "employee_name",
    type: "employee_name",
    thWidth: "160px",
    bRadius: "8px",
  },
  {
    name: "Сумма",
    checked: true,
    key: "order_amount",
    type: "order_amount",
    thWidth: "100px",
  },
  {
    name: "Заказ",
    checked: true,
    key: "order_count",
    type: "order_count",
    thWidth: "100px",
  },
  {
    name: "Отмененные",
    checked: true,
    key: "canceled_order_count",
    type: "canceled_order_count",
    thWidth: "120px",
  },
  {
    name: "Все визиты",
    checked: true,
    key: "visit_count",
    type: "visit_count",
    thWidth: "140px",
  },
  {
    name: "Отказы",
    checked: true,
    key: "reject",
    type: "reject",
    thWidth: "70px",
  },
  {
    name: "Непосещенные Т.Т",
    checked: true,
    key: "no_visit",
    type: "no_visit",
    thWidth: "160px",
  },
  {
    name: "Фотоотчёты",
    checked: true,
    key: "photo",
    type: "photo",
    thWidth: "70px",
  },
]);
const loadedData = ref([
  {
    svr: "Саша",
    amount: "100 000 000",
    order: "150",
    canceled: "123456",
    allVisit: "123456",
    failure: "123456",
    unVisited: "123456",
    photoReport: "123456",
  },
  {
    svr: "Саша",
    amount: "100 000 000",
    order: "150",
    canceled: "123456",
    allVisit: "123456",
    failure: "123456",
    unVisited: "123456",
    photoReport: "123456",
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
  props.filters.page = index;
}
function setPageSize(size) {
  props.filters.pageSize = size;
}
</script>

<style scoped></style>
