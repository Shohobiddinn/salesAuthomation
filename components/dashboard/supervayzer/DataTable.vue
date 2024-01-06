<template>
  <div class="rounded-lg bg-white border-grey px-[2px] mt-4">
    <div class="overflow-y-auto table-containers">
      <table class="w-full rounded-t-large overflow-hidden whitespace-nowrap">
        <thead>
          <tr class="mr-1.5 border-primary-gray border-y-1 header-row">
            <td
              v-for="(item, index) in headerT"
              :key="index"
              :class="[
                index < 9 ? 'bg-green-100 text-green-600' : '',
                index >= 9 ? 'bg-[#F5F2FE] text-[#835FEE]' : '',
              ]"
              class="bord fs-12 font-bold py-3 px-2"
            >
              {{ item.name }}
            </td>
          </tr>
          <tr
            class="mr-1.5 border-primary-gray border-y-1 header-row border-b-none"
          >
            <td
              v-for="item in headerTs"
              :key="item"
              class="fs-12 bor font-bold text-blue-10 py-1 px-2"
            >
              {{ item.name }}
            </td>
          </tr>
          <tr
            class="mr-1.5 border-t-none border-primary-gray border-y-1 header-row"
          >
            <th
              class="bor p-2"
              :style="{ background: header.bgHeader }"
              :class="[
                header.key === 'stockEnough' ? 'border-x-1' : '',
                orderBy ? 'brr' : '',
              ]"
              v-for="header in headers"
              :key="header"
            >
              <div>
                <div
                  v-if="header.type !== 'checkbox'"
                  :style="{ width: header.thWidth }"
                  class="flex p-1 gap-1 fs-14 fw-4"
                >
                  <div class="secondary-gray-text">
                    {{ header.name }}
                  </div>
                  <div
                    v-if="
                      header.type !== 'diapazon' &&
                      header.type !== 'inWarehouse' &&
                      header.type !== 'come' &&
                      header.type !== 'quantitys'
                    "
                    class="grid"
                  >
                    <fa-icon class="fa-icon cursor-pointer"
                           :class="!(sortedData.field === header.key && sortedData.is_asc) ? '-my-0.8':'-mb-0'"
                           v-if="!(sortedData.field === header.key && !sortedData.is_asc)"
                           @click="sortedData(header.key, false)"
                           hash="&#xf0d8"/>
                    <fa-icon class="fa-icon cursor-pointer"
                           :class="!(sortedData.field === header.key && !sortedData.is_asc) ? '-my-3.5':'mt-0'"
                           v-if="!(sortedData.field === header.key && sortedData.is_asc)"
                           @click="sortedData(header.key, true)"
                           hash="&#xf0d7"/>
                  </div>
                </div>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          <template v-for="(data, index) in dailyReport?.items" :key="data">
            <tr class="border-t-1 child">
              <td v-for="key in headers" :key="key" class="pl-3 bor">
                <flex-col v-if="key.checked" class="py-2">
                  <flex-row
                    class="justify-start fw-4 fs-14 items-center text-gray-700">
                    <div v-if="key.key === 'no'">
                      {{ index +1 }}
                    </div>
                    <div v-if="key.key === 'name'">
                      {{ data.plan.name }}
                    </div>
                    <div v-if="key.key === 'plan'">
                      {{ data.plan.plan }}
                    </div>
                    <div v-if="key.key === 'visited'">
                      {{ data.plan.visited }}
                    </div>
                    <div v-if="key.key === 'unvisited'">
                      {{ data.plan.unvisited }}
                    </div>
                    <div v-if="key.key === 'planPhotos'">
                      {{ data.plan.photos }}
                    </div>
                    <div v-if="key.key === 'planAmount'">
                      {{ data.plan.order_amount }}
                    </div>
                    <div v-if="key.key === 'planOrderCount'">
                      {{ data.plan.order_count }}
                    </div>
                    <div v-if="key.key === 'planNoOrder'">
                      {{ data.plan.no_order }}
                    </div>
                    <div v-if="key.key === 'outAmounts'">
                      {{ data.out_of_plan.visited }}
                    </div>
                    <div v-if="key.key === 'outVisited'">
                      {{ data.out_of_plan.visited }}
                    </div>
                    <div
                        v-if="key.key !== 'visited'
                        && key.key !== 'no'
                        && key.key !== 'plan'
                        && key.key !== 'name'
                        && key.key !== 'unvisited'
                        && key.key !== 'planPhotos'
                        && key.key !== 'planAmount'
                        && key.key !== 'planOrderCount'
                        && key.key !== 'planNoOrder'
                        && key.key !== 'outVisited' && key.key !== 'outAmounts'">
                      {{ data.plan.visited }}
                    </div>
                  </flex-row>
                </flex-col>
              </td>
            </tr>
            <template
              v-if="showProduct.isActive && showProduct.index === index"
            >
              <tr
                v-for="(product, chIndex) in data.items"
                :key="'children' + index + chIndex"
                class="child"
              >
                <td v-for="key in headers" :key="key" class="px-3">
                  <flex-col class="">
                    <flex-row
                      v-if="key.key === 'product'"
                      class="justify-between pl-4 fs-14 fw-4 text-gray-400"
                    >
                      {{ data[key.key] }}
                    </flex-row>
                    <flex-row
                      v-if="key.key !== 'product'"
                      class="justify-between fs-14 fw-4 text-gray-400"
                    >
                      {{ data[key.key] }}
                    </flex-row>
                  </flex-col>
                </td>
              </tr>
            </template>
          </template>
          <td
            v-for="(item, index) in result"
            :key="index"
            class="fs-14 fw-6 text-gray-3 pl-3 py-2"
          >
            <div v-if="headers[index] && headers[index].checked">
              {{ item.name }}
            </div>
          </td>
        </tbody>
      </table>
    </div>
    <div class="flex justify-between w-full">
      <div class="flex p-3 gap-2 items-center">
        <span class="secondary-gray-text fs-14"> Показать по </span>
        <page-size-btn :current-size="filters.pageSize" @setPageSize="setPageSize" />
      </div>
      <div class="p-3">
        <page-index
          :available-pages="dailyReport?.total_pages"
          :current-page="dailyReport?.page_number"
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
    <div v-if="clientsId">
      <h-no-modal @closeDialog="closeClient" :dataContainerWidth="'1363px'">
        <div class="-mt-6">
          <page-title :title="'Закуп по месецям'" />
          <div class="mt-2">
            <reports-inventory-dialog-table />
          </div>
        </div>
      </h-no-modal>
    </div>
  </transition>
</template>

<script setup>
const props = defineProps({
  dailyReport:Object,
  filters:Object
})
// State
import { ref } from "vue";
const searchText = ref("");
const availablePages = ref(28);
let currentPage = ref(1);
let pageSize = ref(10);
const draggable = ref(false);
const orderBy = ref(true);
// Methods
const clientsId = ref(false);
function closeClient() {
  clientsId.value = false;
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
]);
function draggableDialog() {
  draggable.value = false;
}
const showProduct = ref({
  isActive: false,
  index: 0,
});
function openProducts(index) {
  showProduct.value.isActive = !showProduct.value.isActive;
  showProduct.value.index = index;
}
const headerT = ref([
  {
    name: "пО ПЛАНУ",
  },
  {
    name: "",
  },
  {
    name: "",
  },
  {
    name: "",
  },
  {
    name: "",
  },
  {
    name: "",
  },
  {
    name: "",
  },
  {
    name: "Посещения",
  },
  {
    name: "",
  },
  {
    name: "Вне плана",
  },
  {
    name: "Посещения",
  },
]);
const headerTs = ref([
  {
    name: "",
  },
  {
    name: "",
  },
  {
    name: "",
  },
  {
    name: "",
  },
  {
    name: "",
  },
  {
    name: "",
  },
  {
    name: "Заказ",
  },
  {
    name: "",
  },
  {
    name: "Нет заказа",
  },
  {
    name: "",
  },
  {
    name: "Заказ",
  },
]);
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
    name: "Агент",
    checked: true,
    key: "name",
    type: "name",
    thWidth: "100px",
  },
  {
    name: "План",
    checked: true,
    key: "plan",
    type: "plan",
    thWidth: "100px",
  },
  {
    name: "Посещено",
    checked: true,
    key: "visited",
    type: "visited",
    thWidth: "120px",
  },
  {
    name: "Непосещено",
    checked: true,
    key: "unvisited",
    type: "unvisited",
    thWidth: "100px",
  },
  {
    name: "Фото",
    checked: true,
    key: "planPhotos",
    type: "planPhotos",
    thWidth: "90px",
  },
  {
    name: "Сумма",
    checked: true,
    key: "planAmount",
    type: "planAmount",
    thWidth: "80px",
  },
  {
    name: "К-во",
    checked: true,
    key: "planOrderCount",
    type: "planOrderCount",
    thWidth: "120px",
  },
  {
    name: "Не результативно",
    checked: true,
    key: "planNoOrder",
    type: "planNoOrder",
    thWidth: "160px",
  },
  {
    name: "Посещено",
    checked: true,
    key: "outVisited",
    type: "outVisited",
    thWidth: "160px",
  },
  {
    name: "Сумма",
    checked: true,
    key: "outAmounts",
    type: "outAmounts",
    thWidth: "160px",
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

<style scoped>
.down {
  display: none;
  box-shadow: rgba(136, 165, 191, 0.48) 6px 2px 16px 0px,
    rgba(255, 255, 255, 0.8) -6px -2px 16px 0px;
}
.active-down {
  display: block;
  background-color: white;
}
.down:after {
  position: absolute;
  content: "";
  right: -11px;
  bottom: 40px;
  top: 40px;
  border-left: 15px solid white;
  border-top: 20px solid transparent;
  border-bottom: 20px solid transparent;
}
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
.bor:nth-child(6) {
  border-right: 1px solid #e1e4e4;
}
.bor:nth-child(8) {
  border-right: 1px solid #e1e4e4;
}
.bor:nth-child(9) {
  border-right: 1px solid #e1e4e4;
}
.bor:nth-child(10) {
  border-right: 1px solid #e1e4e4;
}
.bor:nth-child(11) {
  border-right: 1px solid #e1e4e4;
}
.bord:nth-child(6) {
  border-right: 1px solid #e1e4e4;
}

.bord:nth-child(9) {
  border-right: 1px solid #e1e4e4;
}
.bord:nth-child(10) {
  border-right: 1px solid #e1e4e4;
}
.bord:nth-child(11) {
  border-right: 1px solid #e1e4e4;
}
</style>
