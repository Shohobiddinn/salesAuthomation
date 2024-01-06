<template>
  <div
    v-click-outside="clickOutside"
    class="rounded-lg bg-white border-grey px-[2px]"
  >
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
      <div class="w-50 m-4">
        <multiply-selections
          :h="true"
          :name="'Категории продукта'"
          :filter.sync="filter.isSelectProduct"
          @toggle="(toggle) => (filter.isSelectProduct = toggle)"
          class="w-[100%]"
        />
      </div>
    </div>

    <div class="overflow-auto table-containers">
      <data-table :headers="headers" @sort="sortData" :sorted="sortedData">
        <template #body>
          <template v-for="(data, index) in loadedData" :key="index">
            <c-tr class="border-b-none b-bottom cursor-pointer">
              <c-td-no-edit v-for="key in headers" :key="key">
                <div
                  class="p-2"
                  v-if="
                    key.checked &&
                    key.key !== 'dataTransfer' &&
                    key.key !== 'agent' &&
                    key.key !== 'status' &&
                    key.key !== 'data'
                  "
                >
                  {{ data[key.key] }}
                </div>
                <nuxt-link v-if="key.checked && key.key === 'dataTransfer'">
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
const filter = ref({
  isSelectProduct: false,
});
function draggableDialog() {
  draggable.value = false;
}
let headers = ref([
  {
    name: "№",
    checked: true,
    key: "no",
    type: "no",
    thWidth: "50px",
    bRadius: "8px",
  },
  {
    name: "Ассортимент",
    checked: true,
    key: "assortiment",
    type: "assortiment",
    thWidth: "140px",
  },
  {
    name: "В основном складе было",
    checked: true,
    key: "mainWarehouses",
    type: "mainWarehouses",
    thWidth: "220px",
  },
  {
    name: "Перенесли на Основлой склад",
    checked: true,
    key: "moved",
    type: "moved",
    thWidth: "250px",
  },
]);
const loadedData = ref([
  {
    no: "1",
    assortiment: '"Dena" - Зеленая Яблоко 1л',
    mainWarehouses: "123345",
    moved: "1356",
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
