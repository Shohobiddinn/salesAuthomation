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

    <div class="flex gap-6 pl-4">
      <NuxtLink to="#" @click="activeTab = activeTab !== 1 ? 1 : 1" :class="
        activeTab === 1
          ? 'text-[#299B9B] before:block before:absolute before:inset-1 before:bg-[#299B9B]  relative inline-block before:w-[47px] before:h-[1px] before:rounded-[6px] before:mt-[22px] before:-ml-[2px]'
          : 'text-[#8FA0A0] active:text-[#299B9B]'
      "> Общый</NuxtLink>
      <NuxtLink to="#" @click="activeTab = activeTab !== 2 ? 2 : 2" :class="
        activeTab === 2
          ? 'text-[#299B9B] before:block before:absolute before:inset-1 before:bg-[#299B9B]  relative inline-block before:w-[47px] before:h-[1px] before:rounded-[6px] before:mt-[22px] before:-ml-[2px]'
          : 'text-[#8FA0A0] active:text-[#299B9B]'

      ">Sales</NuxtLink>
      <NuxtLink to="#" @click="activeTab = activeTab !== 3 ? 3 : 3" :class="
        activeTab === 3
          ? 'text-[#299B9B] before:block before:absolute before:inset-1 before:bg-[#299B9B]  relative inline-block before:w-[47px] before:h-[1px] before:rounded-[6px] before:mt-[22px] before:-ml-[2px]'
          : 'text-[#8FA0A0] active:text-[#299B9B] '
      ">Завод</NuxtLink>
    </div>



    <div class="rounded-lg overflow-auto bg-white mt-4">
      <div class="overflow-auto">
        <data-table :headers="headers" @sort="sortData" :sorted="sortedData">
          <template #body>
            <c-tr v-for="data in loadedData" :key="data" class="last:bg-[#E9F9E6]">
              <c-td-no-edit v-for="key in headers" :key="key" class="py-3" :class="key.borderX && 'border-r-1'">
                <div v-if="key.type === come">
                  {{ data[key.key] }}
                </div>

                <div v-else class="flex items-center justify-between">
                  <div>
                    <div class="text-[#013636]">100 000 000</div>
                    <div class="text-[#DB8D8D] fw-4 fs-14">50 000 000</div>
                  </div>
                  <div class="text-[#299B9B]">
                    15%
                  </div>
                </div>
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
        <div class="p-3 z-10">
          <page-index :available-pages="availablePages" :current-page="currentPage" @setPage="setPage" />
        </div>
      </div>
    </div>

    <div class="flex gap-5 pl-[20px] pb-[20px]">
      <div class="flex gap-2.5 items-center">
        <div class=" w-[11px] h-[11px] rounded-[50%] bg-[#013636]"></div>
        <span class="text-gray-3 fs-12 fw-4">Приход</span>
      </div>

      <div class="flex gap-2.5 items-center">
        <div class=" w-[11px] h-[11px] rounded-[50%] bg-[#DB8D8D]"></div>
        <span class="text-gray-3 fs-12 fw-4">Расход</span>
      </div>

      <div class="flex gap-2.5 items-center">
        <div class=" w-[11px] h-[11px] rounded-[50%] bg-[#299B9B]"></div>
        <span class="text-gray-3 fs-12 fw-4">Процент расхода к соотнощению прихода</span>
      </div>
    </div>
  </flex-col>
</template>

<script setup>

// State
let activeTab = ref(0);
const searchText = ref("");
const availablePages = ref(28);
let currentPage = ref(1);
let pageSize = ref(10);
const draggable = ref(false);


const td = ref({
  isActive: false,
  index: -1,

});



const headers = ref([
  {
    name: "№",
    checked: true,
    key: "name",
    thWidth: "140px",
    bRadius: "8px",
  },
  {
    name: "Филиал/завод",
    checked: true,
    key: "okb",
    thWidth: "120px",
  },
  {
    name: "ЙИЛ ХИСОБОТИ",
    checked: true,
    key: "amount1",
    thWidth: "120px",
    borderX: true,
    type: "come",
  },
  {
    name: "ЯНВАРЬ 2022",
    checked: true,
    key: "percent1",
    thWidth: "120px",
    type: "come",
  },
  {
    name: "ЯНВАРЬ 2021",
    checked: true,
    key: "amount2",
    thWidth: "120px",
    borderX: true,
    type: "come",
  },
  {
    name: "ФЕВРАЛЬ",
    checked: true,
    key: "sum",
    thWidth: "120px",
    borderX: true,
    type: "come",

  },
  {
    name: "МАРТ",
    checked: true,
    key: "amount3",
    thWidth: "120px",
    borderX: true,
    type: "come",
  },
  {
    name: "АПРЕЛЬ",
    checked: true,
    key: "percent2",
    thWidth: "120px",
    borderX: true,
    type: "come",


  },
  {
    name: "МАЙ",
    checked: true,
    key: "amount4",
    thWidth: "120px",
    type: "come",
  },
]);
const loadedData = ref([
  {
    name: "1",
    okb: "Lorem заводи",

  },
  {
    name: "1",
    okb: "Lorem заводи",


  },
  {
    name: "1",
    okb: "Lorem заводи",

  },
  {
    name: "1",
    okb: "Lorem заводи",


  },
  {
    name: "1",
    okb: "Lorem заводи",


  },
  {
    name: "1",
    okb: "Lorem заводи",

  },
  {
    name: "1",
    okb: "Lorem заводи",


  },
  {
    name: "Total",
    okb: "Lorem заводи",


  },
]);

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