<template>
  <div>
    <div class="flex justify-between mt-4">
      <div class="flex gap-4">
        <button
          class="rounded-lg border w-6 h-6 p-1.5 bg-white hover:bg-gray-200 mt-2"
        >
          <ArrowBottom />
        </button>
        <div class="-mt-1.5">
          <page-title :title="'По категории продуктор: по агентам '" />
        </div>
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
        <div class="flex gap-4 m-4">
          <div class="pt-2 check">
            <label>
              <input type="checkbox" />
              <span></span>
            </label>
          </div>
          <div class="mt-1.5">Скрыть нулевые цифры</div>
        </div>
      </div>
      <div class="mx-3">
        <DoubleTab
            first-tab-name="По АКБ"
            second-tab-name="По объему"
            third-tab-name="По сумме"
        >
          <template #first>
            <div class="overflow-auto table-containers">
              <data-table :headers="headers" @sort="sortData" :sorted="sortedData">
                <template #body>
                  <template v-for="(data, index) in salesSupervisorAgentCategoryReport?.items" :key="index">
                    <c-tr class="b-bottom cursor-pointer">
                      <c-td-no-edit
                          v-for="key in headers"
                          :key="key"
                          :class="[
                    key.key === 'agents' ? 'bg-yellow-50' : '',
                    key.key === 'amount' ? 'bg-yellow-50' : '',
                  ]"
                      >
                        <div class="-mb-3" v-if="data.akb.detail.find(i => i.category_name == key.key) && key.checked">
                          {{ data.akb.detail.find(i => i.category_name == key.key)?.value }}
                        </div>
                        <div class="py-2 underline pb-2" v-if="key.key === 'total' && key.checked">
                          {{ data.akb.total }}
                        </div>
                        <div class="py-2" v-if="key.key !== 'total' && data.akb.detail.filter(i => i.category_name != key.key) && key.checked">
                          {{ data[key.key] }}
                        </div>
                      </c-td-no-edit>
                    </c-tr>
                  </template>
                  <td
                      v-for="(item, index) in result"
                      class="fs-14 fw-6 text-gray-3 pl-3 py-2"
                  >
                    <div v-if="headers[index] && headers[index].checked">
                      {{ item.name }}
                    </div>
                  </td>
                </template>
              </data-table>
            </div>
          </template>
          <template #second>
            <div class="overflow-auto table-containers">
              <data-table :headers="headers" @sort="sortData" :sorted="sortedData">
                <template #body>
                  <template v-for="(data, index) in salesSupervisorAgentCategoryReport?.items" :key="index">
                    <c-tr class="b-bottom cursor-pointer">
                      <c-td-no-edit
                          v-for="key in headers"
                          :key="key"
                          :class="[
                    key.key === 'agents' ? 'bg-yellow-50' : '',
                    key.key === 'amount' ? 'bg-yellow-50' : '',
                  ]"
                      >
                        <div class="-mb-3"
                             v-if="data.volume.detail.find(i => i.category_name == key.key) && key.checked"
                        >
                          {{ data.volume.detail.find(i => i.category_name == key.key)?.value }}
                        </div>
                        <div
                            class="py-2 underline pb-2"
                            v-if="key.key === 'total' && key.checked"
                        >
                          {{ data.volume.total }}
                        </div>
                        <div class="py-2" v-if="key.key !== 'total' && data.volume.detail.filter(i => i.category_name != key.key) && key.checked">
                          {{ data[key.key] }}
                        </div>
                      </c-td-no-edit>
                    </c-tr>
                  </template>
                  <td
                      v-for="(item, index) in result"
                      class="fs-14 fw-6 text-gray-3 pl-3 py-2"
                  >
                    <div v-if="headers[index] && headers[index].checked">
                      {{ item.name }}
                    </div>
                  </td>
                </template>
              </data-table>
            </div>
          </template>
          <template #third>
            <div class="overflow-auto table-containers">
              <data-table :headers="headers" @sort="sortData" :sorted="sortedData">
                <template #body>
                  <template v-for="(data, index) in salesSupervisorAgentCategoryReport?.items" :key="index">
                    <c-tr class="b-bottom cursor-pointer">
                      <c-td-no-edit
                          v-for="key in headers"
                          :key="key"
                          :class="[
                    key.key === 'agents' ? 'bg-yellow-50' : '',
                    key.key === 'amount' ? 'bg-yellow-50' : '',
                  ]"
                      >
                        <div class="-mb-3"
                             v-if="data.amount.detail.find(i => i.category_name == key.key) && key.checked"
                        >
                          {{ data.amount.detail.find(i => i.category_name == key.key)?.value }}
                        </div>
                        <div
                            class="py-2 underline pb-2"
                            v-if="key.key === 'total' && key.checked"
                        >
                          {{ data.amount.total }}
                        </div>
                        <div class="py-2" v-if="key.key !== 'total' && data.amount.detail.filter(i => i.category_name != key.key) && key.checked">
                          {{ data[key.key] }}
                        </div>
                      </c-td-no-edit>
                    </c-tr>
                  </template>
                  <td
                      v-for="(item, index) in result"
                      class="fs-14 fw-6 text-gray-3 pl-3 py-2"
                  >
                    <div v-if="headers[index] && headers[index].checked">
                      {{ item.name }}
                    </div>
                  </td>
                </template>
              </data-table>
            </div>
          </template>
        </DoubleTab>
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
const props =  defineProps({
  salesSupervisorAgentCategoryReport:Object,
  headers:Array
})
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
// let headers = ref([
//   {
//     name: "Агент",
//     checked: true,
//     key: "employee",
//     type: "employee",
//     thWidth: "160px",
//     bRadius: "8px",
//   },
//   {
//     name: "Сумма",
//     checked: true,
//     key: "total",
//     type: "total",
//     thWidth: "100px",
//   },
//   {
//     name: "Pepsi",
//     checked: true,
//     key: "pepsi1",
//     type: "pepsi1",
//     thWidth: "100px",
//   },
//   {
//     name: "Pepsi",
//     checked: true,
//     key: "pepsi2",
//     type: "pepsi2",
//     thWidth: "100px",
//   },
//   {
//     name: "Pepsi",
//     checked: true,
//     key: "pepsi3",
//     type: "pepsi3",
//     thWidth: "100px",
//   },
//   {
//     name: "Pepsi",
//     checked: true,
//     key: "pepsi4",
//     type: "pepsi4",
//     thWidth: "100px",
//   },
//   {
//     name: "Pepsi",
//     checked: true,
//     key: "pepsi5",
//     type: "pepsi5",
//     thWidth: "100px",
//   },
//   {
//     name: "Pepsi",
//     checked: true,
//     key: "pepsi6",
//     type: "pepsi6",
//     thWidth: "100px",
//   },
// ]);
const loadedData = ref([
  {
    agents: "Саша",
    amount: "100 000 000",
    pepsi1: "150",
    pepsi2: "150",
    pepsi3: "150",
    pepsi4: "150",
    pepsi5: "150",
    pepsi6: "150",
  },
  {
    agents: "Саша",
    amount: "100 000 000",
    pepsi1: "150",
    pepsi2: "150",
    pepsi3: "150",
    pepsi4: "150",
    pepsi5: "150",
    pepsi6: "150",
  },
  {
    agents: "Саша",
    amount: "100 000 000",
    pepsi1: "150",
    pepsi2: "150",
    pepsi3: "150",
    pepsi4: "150",
    pepsi5: "150",
    pepsi6: "150",
  },
  {
    agents: "Саша",
    amount: "100 000 000",
    pepsi1: "150",
    pepsi2: "150",
    pepsi3: "150",
    pepsi4: "150",
    pepsi5: "150",
    pepsi6: "150",
  },
  {
    agents: "Саша",
    amount: "100 000 000",
    pepsi1: "150",
    pepsi2: "150",
    pepsi3: "150",
    pepsi4: "150",
    pepsi5: "150",
    pepsi6: "150",
  },
  {
    agents: "Саша",
    amount: "100 000 000",
    pepsi1: "150",
    pepsi2: "150",
    pepsi3: "150",
    pepsi4: "150",
    pepsi5: "150",
    pepsi6: "150",
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
