<template>
  <div>
    <div class="rounded-lg bg-white border-grey px-[2px]">
      <div class="flex mb-4 mx-4 justify-between gap-4 mt-4 items-center">
        <div class="flex flex-row gap-4 items-center">
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
      <div class="overflow-y-auto table-containers">
        <data-table :headers="headers" @sort="sortData" :sorted="sortedData">
          <template #body>
            <template v-for="(data, index) in loadedData">
              <c-tr class="border-b-none b-bottom cursor-pointer">
                <c-td-no-edit
                  v-for="key in headers"
                  :key="key"
                  :orderBy="orderBy"
                >
                  <button
                    @click="openProducts(index)"
                    v-if="key.key === 'id'"
                    class="flex justify-start fw-4 fs-14 items-center text-gray-400"
                  >
                    <span class="text-xl font-light w-4.5">{{
                      showProduct.isActive && showProduct.index === index
                        ? "-"
                        : showProduct.index !== index
                        ? "+"
                        : showProduct.index === index &&
                          !showProduct.isActive &&
                          "+"
                    }}</span>
                    <div class="ml-2 text-gray-700">
                      {{ data[key.key] }}
                    </div>
                  </button>
                  <div class="p-2" v-if="key.checked && key.key !== 'id'">
                    {{ data[key.key] }}
                  </div>
                </c-td-no-edit>
              </c-tr>
              <template
                v-if="showProduct.isActive && showProduct.index === index"
              >
                <tr
                  v-for="(product, chIndex) in data.items"
                  :key="'children' + index + chIndex"
                  class="child"
                >
                  <c-td-no-edit v-for="key in headers" :key="key" class="px-3">
                    <flex-col class="">
                      <flex-row class="justify-between pl-4 fs-14 fw-4">
                        {{ data[key.key] }}
                      </flex-row>
                    </flex-col>
                  </c-td-no-edit>
                </tr>
              </template>
            </template>
          </template>
        </data-table>
      </div>

      <!-- begin pagination -->
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
      <!-- end pagination -->
    </div>
    <transition name="modal">
      <div v-if="draggable">
        <d-modal
          @closeDialog="draggableDialog"
          :name="'Управление меню таблицы'"
        >
          <drag-and-drop></drag-and-drop>
        </d-modal>
      </div>
    </transition>
  </div>
</template>

<script setup>
// State
import { ref } from "vue";
const searchText = ref("");
const availablePages = ref(28);
let currentPage = ref(1);
let pageSize = ref(10);
const draggable = ref(false);
const orderBy = ref(false);

const showProduct = ref({
  isActive: false,
  index: 0,
});
function openProducts(index) {
  showProduct.value.isActive = !showProduct.value.isActive;
  showProduct.value.index = index;
}

function draggableDialog() {
  draggable.value = false;
}

let headers = ref([
  {
    name: "Название агента",
    checked: true,
    key: "id",
    type: "id",
    thWidth: "160px",
  },
  {
    name: "Ноллашга чиққан сумма",
    checked: true,
    key: "tt",
    type: "tt",
    thWidth: "200px",
  },
  {
    name: "Кирган сумма",
    checked: true,
    key: "telt",
    type: "telt",
    thWidth: "200px",
  },
  {
    name: "Кўчадаги қолдиқ сумма",
    checked: true,
    key: "telt",
    type: "telt",
    thWidth: "200px",
  },
]);
const loadedData = ref([
  {
    id: "Вансел Андрей",
    tt: "100000000",
    telt: "1010000",
    items: [
      {
        tt: "100000000",
        telt: "1010000",
      },
      {
        tt: "100000000",
        telt: "1010000",
      },
      {
        tt: "100000000",
        telt: "1010000",
      },
    ],
  },
  {
    id: "Вансел Андрей",
    tt: "100000000",
    telt: "1010000",

    items: [
      {
        tt: "100000000",
        telt: "1010000",
      },
      {
        tt: "100000000",
        telt: "1010000",
      },
      {
        tt: "100000000",
        telt: "1010000",
      },
    ],
  },
  {
    id: "Вансел Андрей",
    tt: "100000000",
    telt: "1010000",
    items: [
      {
        tt: "100000000",
        telt: "1010000",
      },
      {
        tt: "100000000",
        telt: "1010000",
      },
      {
        tt: "100000000",
        telt: "1010000",
      },
    ],
  },
  {
    id: "Вансел Андрей",
    tt: "100000000",
    telt: "1010000",
    items: [
      {
        tt: "100000000",
        telt: "1010000",
      },
      {
        tt: "100000000",
        telt: "1010000",
      },
      {
        tt: "100000000",
        telt: "1010000",
      },
    ],
  },
  {
    id: "Вансел Андрей",
    tt: "100000000",
    telt: "1010000",
    items: [
      {
        tt: "100000000",
        telt: "1010000",
      },
      {
        tt: "100000000",
        telt: "1010000",
      },
      {
        tt: "100000000",
        telt: "1010000",
      },
    ],
  },
  {
    id: "Вансел Андрей",
    tt: "100000000",
    telt: "1010000",
    items: [
      {
        tt: "100000000",
        telt: "1010000",
      },
      {
        tt: "100000000",
        telt: "1010000",
      },
      {
        tt: "100000000",
        telt: "1010000",
      },
    ],
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
.b-bottom:last-child {
  border-bottom: 1px solid #e1e4e4;
}
</style>
