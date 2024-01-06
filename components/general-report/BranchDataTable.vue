<template>
  <flex-col v-click-outside="clickOutside" class="rounded-lg bg-white border-grey grow">
    <div class="flex mb-4 ml-4 flex-row gap-4 mt-4 items-center">
      <div @click="draggable = true">
        <i-btn>
          <IconColsSVG />
        </i-btn>
      </div>
      <SettingsRlpDiscountsTableCheckbox :headers="headers"></SettingsRlpDiscountsTableCheckbox>
      <div class="w-1/4">
        <search-input :value="searchText" @updated="searchUpdated" class="w-full h-9.5" />
      </div>
      <div>
        <excel-btn :size="'300kb'"></excel-btn>
      </div>
    </div>



    <div class="rounded-lg overflow-auto bg-white mt-4">
      <div class="overflow-auto">
        <!-- <table class="w-full whitespace-nowrap overflow-auto">
          <thead>
            <tr class="border-y-1 header-row">
              <td v-for="item in headerTs" :key="item" class="fs-12 bor font-bold text-blue-10 py-2.5 pl-7.5">
                {{ item.name }}
              </td>
            </tr>
            <tr class="border-primary-gray border-y-1 header-row">
              <th class="p-2" v-for="header in headers" :key="header" :class="header.borderX && 'border-r-1'">
                <div :style="{ width: header.thWidth }">
                  <div class="flex p-1 gap-1 fs-14 fw-4 py-3">
                    <div class="secondary-gray-text">
                      {{ header.name }}
                    </div>
                    <div class="grid">
                      <fa-icon class="fa-icon cursor-pointer" :class="!(sortedData.field === header.key &&
                        sortedData.mode) ? '-my-0.8' : '-mb-0'" v-if="!(sortedData.field === header.key &&
    !sortedData.mode)" @click="sortData(header.key,
    false)" hash="&#xf0d8" />
                      <fa-icon class="fa-icon cursor-pointer" :class="!(sortedData.field === header.key &&
                        !sortedData.mode) ? '-my-3.5' : 'mt-0'" v-if="!(sortedData.field === header.key &&
    sortedData.mode)" @click="sortData(header.key, true)" hash="&#xf0d7" />
                    </div>
                  </div>
                </div>
              </th>
            </tr>
          </thead>
          <tbody class="border">
            <template v-for="data in loadedData" :key="data">
              <tr class="first:font-semibold">
                <td v-for="key in headers" :key="key" :class="key.borderX && 'border-r-1'">
                  <div class="py-3 px-4"
                    :class="[key.key === 'name' ? 'bg-[#FFF8F8]' : '', key.key === 'okb' ? 'bg-[#FFF8F8]' : '', key.key === 'percent1' ? 'text-[#299B9B]' : '', key.key === 'amount2' ? 'text-[#DB8D8D]' : '']">
                    {{ data[key.key] }}
                  </div>
                </td>
              </tr>
            </template>

            <template v-for="data in loadedData" :key="data">
              <tr class="first:font-semibold border-y-1">
                <td v-for="key in headers" :key="key" :class="key.borderX && 'border-r-1'">
                  <div class="py-3 px-4"
                    :class="[key.key === 'name' ? 'bg-[#FDFFF8]' : '', key.key === 'okb' ? 'bg-[#FDFFF8]' : '', key.key === 'percent1' ? 'text-[#299B9B]' : '', key.key === 'amount2' ? 'text-[#DB8D8D]' : '']">
                    {{ data[key.key] }}
                  </div>
                </td>
              </tr>
            </template>

            <template v-for="data in loadedData" :key="data">
              <tr class="semiBold">
                <td v-for="key in headers" :key="key" :class="key.borderX && 'border-r-1'">
                  <div class="py-3 px-4"
                    :class="[key.key === 'name' ? 'bg-[#FBF8FF]' : '', key.key === 'okb' ? 'bg-[#FBF8FF]' : '', key.key === 'percent1' ? 'text-[#299B9B]' : '', key.key === 'amount2' ? 'text-[#DB8D8D]' : '']">
                    {{ data[key.key] }}
                  </div>
                </td>
              </tr>
            </template>
            <tr class="border-t-1 border-b bg-[#E9F9E6] w-full">
              <td class="fs-14 fw-6 text-gray-3 pl-3 py-2">Итоги</td>
              <td class="fs-14 fw-6 text-black pl-3 py-2 ">13126</td>
              <td class="fs-14 fw-6 text-black pl-3 py-2 ">13126</td>
              <td class="fs-14 fw-6 text-black pl-3 py-2 ">13126</td>
              <td class="fs-14 fw-6 text-black pl-3 py-2 ">13126</td>
              <td class="fs-14 fw-6 text-black pl-3 py-2 ">13126</td>
              <td class="fs-14 fw-6 text-black pl-3 py-2 ">13126</td>
              <td class="fs-14 fw-6 text-black pl-3 py-2 ">13126</td>
            </tr>
          </tbody>
        </table> -->
       <thead>
        <tr class="border-y-1 header-row">
              <td v-for="item in headerTs" :key="item" class="fs-12 bor font-bold text-blue-10 py-2.5 pl-7.5">
                {{ item.name }}
              </td>
            </tr>
       </thead>
        <data-table :headers="headers" @sort="sortData" :sorted="sortData">
          <template #body>
            <c-tr v-for="data in loadedData" :key="data" class="first:font-semibold">
              <c-td-no-edit :custom-padding="true" v-for="key in headers" :key="key" class="px-2 py-3"
                :class="[key.key === 'name' ? 'bg-[#FFF8F8]' : '', key.key === 'okb' ? 'bg-[#FFF8F8]' : '', key.key === 'percent1' ? 'text-[#299B9B]' : '', key.key === 'amount2' ? 'text-[#DB8D8D]' : '', key.borderX && 'border-r-1']">
                {{ data[key.key] }}
              </c-td-no-edit>
            </c-tr>

            <c-tr v-for="data in loadedData" :key="data" class="first:font-semibold">
              <c-td-no-edit :custom-padding="true" v-for="key in headers" :key="key" class="px-2 py-3"
                :class="[key.key === 'name' ? 'bg-[#FDFFF8]' : '', key.key === 'okb' ? 'bg-[#FDFFF8]' : '', key.key === 'percent1' ? 'text-[#299B9B]' : '', key.key === 'amount2' ? 'text-[#DB8D8D]' : '', key.borderX && 'border-r-1']">
                {{ data[key.key] }}
              </c-td-no-edit>
            </c-tr>

            <c-tr v-for="data in loadedData" :key="data" class="first:font-semibold">
              <c-td-no-edit :custom-padding="true" v-for="key in headers" :key="key" class="px-2 py-3"
                :class="[key.key === 'name' ? 'bg-[#FBF8FF]' : '', key.key === 'okb' ? 'bg-[#FBF8FF]' : '', key.key === 'percent1' ? 'text-[#299B9B]' : '', key.key === 'amount2' ? 'text-[#DB8D8D]' : '', key.borderX && 'border-r-1']">
                {{ data[key.key] }}
              </c-td-no-edit>
            </c-tr>

            <c-tr v-for="data in loadedDataBottom" :key="data" class="font-semibold last:bg-[#E9F9E6]">
              <c-td-no-edit :custom-padding="true" v-for="key in headers" :key="key" class="px-2 py-3"
                :class="[key.key === 'percent1' ? 'text-[#299B9B]' : '', key.key === 'amount2' ? 'text-[#DB8D8D]' : '', key.borderX && 'border-r-1']">
                {{ data[key.key] }}
              </c-td-no-edit>
            </c-tr>


          </template>
        </data-table>
      </div>
      <div class="flex justify-between w-full">
        <div class="flex p-3 gap-2 items-center">
          <span class="secondary-gray-text fs-14"> Показать по </span>
          <page-size-btn :current-size="pageSize" @setPageSize="setPageSize" />
        </div>
        <div class="p-3">
          <page-index :available-pages="availablePages" :current-page="currentPage" @setPage="setPage" />
        </div>
      </div>
    </div>
    <div class="flex gap-2.5 items-center pl-[19px] pb-[21px]">
        <div class=" w-[11px] h-[11px] rounded-[50%] bg-[#299B9B]"></div>
        <span class="text-gray-3 fs-12 fw-4">Процент расхода к соотнощению прихода</span>
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
    name: "ЯНВАРЬ 2022",
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
    name: "ЯНВАРЬ 2022",
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
    name: "№",
    checked: true,
    key: "name",
    thWidth: "20px",
  },
  {
    name: "Бренд",
    checked: true,
    key: "okb",
    thWidth: "120px",
    borderX: true,
  },
  {
    name: "Приходы",
    checked: true,
    key: "amount1",
    thWidth: "90px",
  },
  {
    name: "%",
    checked: true,
    key: "percent1",
    thWidth: "20px",
  },
  {
    name: "Расходы",
    checked: true,
    key: "amount2",
    thWidth: "90px",
    borderX: true,

  },
  {
    name: "Приходы",
    checked: true,
    key: "amount1",
    thWidth: "90px",
  },
  {
    name: "%",
    checked: true,
    key: "percent1",
    thWidth: "20px",
  },
  {
    name: "Расходы",
    checked: true,
    key: "amount2",
    thWidth: "90px",
    borderX: true,

  },
  {
    name: "Приходы",
    checked: true,
    key: "amount1",
    thWidth: "90px",
  },
  {
    name: "%",
    checked: true,
    key: "percent1",
    thWidth: "20px",
  },
  {
    name: "Расходы",
    checked: true,
    key: "amount2",
    thWidth: "90px",

  },


]);
const loadedData = ref([
  {
    name: "1",
    okb: "Филлиал номи",
    amount1: "100 000 000",
    percent1: "15%",
    amount2: "100 000 000",

  },
  {
    name: "1",
    okb: "Ташкент",
    amount1: "100 000 000",
    percent1: "15%",
    amount2: "100 000 000",

  },
  {
    name: "1",
    okb: "Ташкент",
    amount1: "100 000 000",
    percent1: "15%",
    amount2: "100 000 000",

  },
  {
    name: "1",
    okb: "Ташкент",
    amount1: "100 000 000",
    percent1: "15%",
    amount2: "100 000 000",

  },
  {
    name: "1",
    okb: "Ташкент",
    amount1: "100 000 000",
    percent1: "15%",
    amount2: "100 000 000",

  },
]);

const loadedDataBottom = ref([
{
    name: "1",
    okb: "Филлиал номи",
    amount1: "100 000 000",
    percent1: "15%",
    amount2: "100 000 000",

  },
  {
    name: "1",
    okb: "Ташкент",
    amount1: "100 000 000",
    percent1: "15%",
    amount2: "100 000 000",

  },
  {
    name: "1",
    okb: "Ташкент",
    amount1: "100 000 000",
    percent1: "15%",
    amount2: "100 000 000",

  },
])

// Methods

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

<style scoped>
.semiBold:first-of-type {
  font-weight: 600;
  font-size: 12px;
  color: #013636;
}
</style>