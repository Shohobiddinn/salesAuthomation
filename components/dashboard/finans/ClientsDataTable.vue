<template>
  <div>
    <div class="flex justify-between mt-4">
      <div class="flex gap-4">
        <button
          class="rounded-lg border w-6 h-6 p-1.5 bg-white hover:bg-gray-200 mt-2"
        >
          <ArrowBottom />
        </button>
        <div class="text-blue-10 text-[24px] fw-6">Список клиентов</div>
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
            <template v-for="(data, index) in loadedData" :key="index">
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
            <tr class="border-b-1">
              <td v-for="(item, index) in result" class="fs-12 fw-6 py-2 px-4">
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
let headers = ref([
  {
    name: "№",
    checked: true,
    key: "no",
    type: "no",
    thWidth: "40px",
    bRadius: "8px",
  },
  {
    name: "Название",
    checked: true,
    key: "name",
    type: "name",
    thWidth: "100px",
  },
  {
    name: "Общая сумма",
    checked: true,
    key: "totalAmount",
    type: "totalAmount",
    thWidth: "140px",
  },
  {
    name: "Без нал",
    checked: true,
    key: "withoutCash",
    type: "withoutCash",
    thWidth: "8 0px",
  },
  {
    name: "Сум",
    checked: true,
    key: "sum",
    type: "sum",
    thWidth: "70px",
  },
]);
const loadedData = ref([
  {
    no: "1",
    name: "Coca cola",
    totalAmount: "12368",
    withoutCash: "12368",
    sum: "12368",
  },
  {
    no: "1",
    name: "Coca cola",
    totalAmount: "12368",
    withoutCash: "12368",
    sum: "12368",
  },
  {
    no: "1",
    name: "Coca cola",
    totalAmount: "12368",
    withoutCash: "12368",
    sum: "12368",
  },
  {
    no: "1",
    name: "Coca cola",
    totalAmount: "12368",
    withoutCash: "12368",
    sum: "12368",
  },
  {
    no: "1",
    name: "Coca cola",
    totalAmount: "12368",
    withoutCash: "12368",
    sum: "12368",
  },
  {
    no: "1",
    name: "Coca cola",
    totalAmount: "12368",
    withoutCash: "12368",
    sum: "12368",
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
