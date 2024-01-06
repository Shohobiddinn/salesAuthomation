<template>
  <flex-col
    v-click-outside="clickOutside"
    class="rounded-lg bg-white border-grey grow"
  >
    <!-- <div class="flex mb-4 ml-4 flex-row gap-4 mt-4 items-center">
      <div @click="draggable = true">
        <i-btn>
          <IconColsSVG />
        </i-btn>
      </div>
      <SettingsRlpDiscountsTableCheckbox
        :headers="headers"
      ></SettingsRlpDiscountsTableCheckbox>
      <div class="w-1/4">
        <search-input
          :value="searchText"
          @updated="searchUpdated"
          class="w-full h-9.5"
        />
      </div>
      <div>
        <excel-btn :size="'300kb'"></excel-btn>
      </div>
    </div> -->

    <!-- ICONSLANI QOYAS COMMENTNI OCHIRB TASHAB -->


    <div class="rounded-lg overflow-auto bg-white mt-4">
      <div class="overflow-auto table-containers">
        <table class="w-full whitespace-nowrap overflow-auto">
          <thead>
            <tr
              class="border-y-1 header-row"
            >
              <td
                v-for="item in headerTs"
                :key="item"
                class="fs-12 bor font-bold text-blue-10 py-2.5 even:border-r-1 pl-7.5"
              >
                {{ item.name }}
              </td>
            </tr>
            <tr
              class="border-primary-gray border-y-1 header-row"
            >
              <th
                class="p-2"
                v-for="header in headers"
                :key="header"
                :class="header.borderX && 'border-r-1'"
              >
                <div :style="{width: header.thWidth}">
                  <div
                    class="flex p-1 gap-1 fs-14 fw-4 py-3"
                  >
                    <div class="secondary-gray-text ">
                      {{ header.name }}
                    </div>
                    <div
                      class="grid"
                    >
                      <fa-icon class="fa-icon cursor-pointer"
                      :class="!(sortedData.field === header.key &&
                      sortedData.mode) ? '-my-0.8':'-mb-0'"
                      v-if="!(sortedData.field === header.key &&
                      !sortedData.mode)" @click="sortData(header.key,
                      false)"
                      hash="&#xf0d8"/>
                      <fa-icon class="fa-icon cursor-pointer"
                      :class="!(sortedData.field === header.key &&
                      !sortedData.mode) ? '-my-3.5':'mt-0'"
                      v-if="!(sortedData.field === header.key &&
                      sortedData.mode)" @click="sortData(header.key, true)"
                      hash="&#xf0d7"/>
                    </div>
                  </div>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            <template v-for="data in loadedData" :key="data">
              <c-tr class="border-y-1 child last:font-semibold">
                <c-td-no-edit v-for="key in headers" :key="key" :class="key.borderX && 'border-r-1'">
                  <div class="py-4" v-if="key.checked">
                  {{ data[key.key] }}
                  </div>
              </c-td-no-edit>
              </c-tr>
            </template>
          </tbody>
        </table>
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
  </flex-col>
</template>

<script setup>
// State
const searchText = ref("");
const availablePages = ref(28);
let currentPage = ref(1);
let pageSize = ref(10);
const draggable = ref(false);
const td = ref({
  isActive: false,
  index: -1,
});

const headerTs = ref([
  {
    name: "",
  },
  {
    name: "",
  },
  {
    name: "АКБ",
  },
  {
    name: "",
  },
  {
    name: "Кол-во заказ",
  },
  {
    name: "",
  },
  {
    name: "Отказы",
  },
  {
    name: "",
  },
  {
    name: "Фотоотчёты",
  },
  {
    name: "",
  },
  {
    name: "Непосещенные",
  },
]);
const headers = ref([
  {
    name: "Название",
    checked: true,
    key: "name",
    thWidth: "140px",
  },
  {
    name: "ОКБ",
    checked: true,
    key: "okb",
    thWidth: "120px",
    borderX: true,
  },
  {
    name: "Кол.",
    checked: true,
    key: "amount1",
    thWidth: "120px",
  },
  {
    name: "%",
    checked: true,
    key: "percent1",
    thWidth: "120px",
    borderX: true,
  },
  {
    name: "Кол.",
    checked: true,
    key: "amount2",
    thWidth: "120px",
  },
  {
    name: "Сумма",
    checked: true,
    key: "sum",
    thWidth: "120px",
    borderX: true,
  },
  {
    name: "Кол.",
    checked: true,
    key: "amount3",
    thWidth: "120px",
  },
  {
    name: "%",
    checked: true,
    key: "percent2",
    thWidth: "120px",
    borderX: true,
  },
  {
    name: "Кол.",
    checked: true,
    key: "amount4",
    thWidth: "120px",
  },
  {
    name: "%",
    checked: true,
    key: "percent3",
    thWidth: "120px",
    borderX: true,
  },
  {
    name: "Кол.",
    checked: true,
    key: "amount5",
    thWidth: "120px",
  },
  {
    name: "%",
    checked: true,
    key: "percent4",
    thWidth: "120px",
    borderX: true,
  },
]);
const loadedData = ref([
  {
    name: "Максим (Продовец)",
    okb: "123312",
    amount1: "1123312",
    percent1: "123312",
    amount2: "123312",
    sum: "123312",
    amount3: "1123312",
    percent2: "123312",
    amount4: "1123312",
    percent3: "123312",
    amount5: "1123312",
    percent4: "123312",
  },
  {
    name: "Максим (Продовец)",
    okb: "123312",
    amount1: "1123312",
    percent1: "123312",
    amount2: "123312",
    sum: "123312",
    amount3: "1123312",
    percent2: "123312",
    amount4: "1123312",
    percent3: "123312",
    amount5: "1123312",
    percent4: "123312",
  },
  {
    name: "Максим (Продовец)",
    okb: "123312",
    amount1: "1123312",
    percent1: "123312",
    amount2: "123312",
    sum: "123312",
    amount3: "1123312",
    percent2: "123312",
    amount4: "1123312",
    percent3: "123312",
    amount5: "1123312",
    percent4: "123312",
  },
  {
    name: "Максим (Продовец)",
    okb: "123312",
    amount1: "1123312",
    percent1: "123312",
    amount2: "123312",
    sum: "123312",
    amount3: "1123312",
    percent2: "123312",
    amount4: "1123312",
    percent3: "123312",
    amount5: "1123312",
    percent4: "123312",
  },
  {
    name: "Максим (Продовец)",
    okb: "123312",
    amount1: "1123312",
    percent1: "123312",
    amount2: "123312",
    sum: "123312",
    amount3: "1123312",
    percent2: "123312",
    amount4: "1123312",
    percent3: "123312",
    amount5: "1123312",
    percent4: "123312",
  },
  {
    name: "Максим (Продовец)",
    okb: "123312",
    amount1: "1123312",
    percent1: "123312",
    amount2: "123312",
    sum: "123312",
    amount3: "1123312",
    percent2: "123312",
    amount4: "1123312",
    percent3: "123312",
    amount5: "1123312",
    percent4: "123312",
  },
  {
    name: "Максим (Продовец)",
    okb: "123312",
    amount1: "1123312",
    percent1: "123312",
    amount2: "123312",
    sum: "123312",
    amount3: "1123312",
    percent2: "123312",
    amount4: "1123312",
    percent3: "123312",
    amount5: "1123312",
    percent4: "123312",
  },
  {
    name: "Total",
    okb: "123312",
    amount1: "1123312",
    percent1: "123312",
    amount2: "123312",
    sum: "123312",
    amount3: "1123312",
    percent2: "123312",
    amount4: "1123312",
    percent3: "123312",
    amount5: "1123312",
    percent4: "123312",
  },
]);

// Methods
const dataContainerWidth = ref("1140px");
const changeStatus = ref(false);
function draggableDialog() {
  draggable.value = false;
}
const clickOutside = () => {
  td.isActive = false;
};

let sortedData = ref({ key: "", mode: "" });

// Methods
function searchUpdated(text) {
  console.log(text);
}

function sortData(field, mode) {
  sortedData.value = { field, mode };
}

function setPage(index) {
  currentPage.value = index;
}

function setPageSize(size) {
  pageSize.value = size;
}
</script>
