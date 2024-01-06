<template>
  <div class="py-7.5 px-5 flex flex-col gap-7.5">
    <div class="flex justify-between">
      <h3 class="text-2xl font-semibold text-gray-3">Sku</h3>
      <nuxt-link to="/diagnostics/sku/plan">
        <div class="fs-16 text-[#299B9B] font-semibold cursor-pointer">
          Установить план
        </div>
      </nuxt-link>
    </div>
    <div class="flex gap-5">
      <diagnosticsOutletReportBox
        :amount="465"
        :icon="'calendar'"
        :text="'Кол-во рабочий дней'"
        class="bg-[#E9F1F2] w-1/3"
      />
      <diagnosticsOutletReportBox
        :amount="465"
        :icon="'check'"
        :text="'Отработано'"
        class="bg-[#EAF2E9] w-1/3"
      />
      <diagnosticsOutletReportBox
        :amount="465"
        :icon="'hourGlass'"
        :text="'Остались дни'"
        class="bg-[#E9EBF2] w-1/3"
      />
    </div>

    <div v-click-outside="clickOutside" class="mt-4">
      <div class="bg-white p-4 w-full rounded-lg">
        <div class="flex justify-between">
          <div class="mt-2 text-[24px] font-[600] text-[#424F4F]">Фильтр</div>
        </div>
        <div class="grid grid-cols-4 gap-4 mt-4">
          <div class="relative">
            <div class="fs-12 my-2">Агент</div>
            <div
              @click="filter.isSelectAgent = !filter.isSelectAgent"
              class="w-full relative flex pt-2 h-[42px] border rounded-lg bg-[#FAFDFD]"
            >
              <div class="ml-4 mt-2">
                <IconArrowBottom />
              </div>
              <div class="fs-14 text-gray ml-2">Выбрать</div>
            </div>
            <div
              v-if="filter.isSelectAgent"
              class="absolute w-full pt-2 border top-[85px] z-50 rounded-lg bg-[#FAFDFD]"
            >
              <div class="flex pl-3 border-b border-[#E1E4E4]">
                <div>
                  <label>
                    <input type="checkbox" />
                    <span></span>
                  </label>
                </div>
                <div class="fs-14 ml-2">Select all</div>
              </div>
              <div class="h-[200px] overflow-auto mr-3">
                <div v-for="i in 15" :key="i" class="flex pl-3 pt-2">
                  <div>
                    <label>
                      <input type="checkbox" />
                      <span></span>
                    </label>
                  </div>
                  <div class="fs-14 ml-2">Checkbox</div>
                </div>
              </div>
            </div>
          </div>
          <div class="relative">
            <div class="fs-12 my-2">Территория</div>
            <div>
              <div
                @click="filter.isSelectTerritory = !filter.isSelectTerritory"
                class="w-full relative flex pt-2 h-[42px] border rounded-lg bg-[#FAFDFD]"
              >
                <div class="ml-4 mt-2">
                  <IconArrowBottom />
                </div>
                <div class="fs-14 text-gray ml-2">Выбрать</div>
              </div>
              <div
                v-if="filter.isSelectTerritory"
                class="absolute w-full pt-2 border top-[85px] z-50 rounded-lg bg-[#FAFDFD]"
              >
                <div class="flex pl-3 border-b border-[#E1E4E4]">
                  <div>
                    <label>
                      <input type="checkbox" />
                      <span></span>
                    </label>
                  </div>
                  <div class="fs-14 ml-2">Select all</div>
                </div>
                <div class="h-[200px] overflow-auto mr-3">
                  <div v-for="i in 15" :key="i" class="flex pl-3 pt-2">
                    <div>
                      <label>
                        <input type="checkbox" />
                        <span></span>
                      </label>
                    </div>
                    <div class="fs-14 ml-2">Checkbox</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="relative">
            <div class="fs-12 my-2">Категория</div>
            <div
              @click="filter.isSelectCategory = !filter.isSelectCategory"
              class="w-full relative flex pt-2 h-[42px] border rounded-lg bg-[#FAFDFD]"
            >
              <div class="ml-4 mt-2">
                <IconArrowBottom />
              </div>
              <div class="fs-14 text-gray ml-2">Выбрать</div>
            </div>
            <div
              v-if="filter.isSelectCategory"
              class="absolute w-full pt-2 border top-[85px] z-50 rounded-lg bg-[#FAFDFD]"
            >
              <div class="flex pl-3 border-b border-[#E1E4E4]">
                <div>
                  <label>
                    <input type="checkbox" />
                    <span></span>
                  </label>
                </div>
                <div class="fs-14 ml-2">Select all</div>
              </div>
              <div class="h-[200px] overflow-auto mr-3">
                <div
                  style="
                    border-bottom-right-radius: 8px;
                    border-bottom-left-radius: 8px;
                  "
                  class="absolute flex justify-center bottom-0 h-40px w-100 bg-white z-[9999]"
                >
                  <button
                    class="w-[80%] bg-[#299B9B] fs-12 h-[30px] text-white rounded-lg mt-1"
                  >
                    load
                  </button>
                </div>
                <div v-for="i in 15" :key="i" class="flex pl-3 pt-2">
                  <div>
                    <label>
                      <input type="checkbox" />
                      <span></span>
                    </label>
                  </div>
                  <div class="fs-14 ml-2">Checkbox</div>
                </div>
              </div>
            </div>
          </div>
          <div class="relative">
            <div class="fs-12 my-2">День</div>
            <div
              @click="filter.isSelectDay = !filter.isSelectDay"
              class="w-full relative flex pt-2 h-[42px] border rounded-lg bg-[#FAFDFD]"
            >
              <div class="ml-4 mt-2">
                <IconArrowBottom />
              </div>
              <div class="fs-14 text-gray ml-2">Выбрать</div>
            </div>
            <div
              v-if="filter.isSelectDay"
              class="absolute w-full pt-2 border top-[85px] z-50 rounded-lg bg-[#FAFDFD]"
            >
              <div class="flex pl-3 border-b border-[#E1E4E4]">
                <div>
                  <label>
                    <input type="checkbox" />
                    <span></span>
                  </label>
                </div>
                <div class="fs-14 ml-2">Select all</div>
              </div>
              <div class="h-[200px] overflow-auto mr-3">
                <div v-for="i in 15" :key="i" class="flex pl-3 pt-2">
                  <div>
                    <label>
                      <input type="checkbox" />
                      <span></span>
                    </label>
                  </div>
                  <div class="fs-14 ml-2">Checkbox</div>
                </div>
              </div>
            </div>
          </div>
          <div class="relative">
            <div class="fs-12 my-2">Месяц</div>
            <div>
              <div
                @click="filter.isSelectMonth = !filter.isSelectMonth"
                class="w-full relative flex pt-2 h-[42px] border rounded-lg bg-[#FAFDFD]"
              >
                <div class="ml-4 mt-2">
                  <IconArrowBottom />
                </div>
                <div class="fs-14 text-gray ml-2">Выбрать</div>
              </div>
              <div
                v-if="filter.isSelectMonth"
                class="absolute w-full pt-2 border top-[85px] z-50 rounded-lg bg-[#FAFDFD]"
              >
                <div class="flex pl-3 border-b border-[#E1E4E4]">
                  <div>
                    <label>
                      <input type="checkbox" />
                      <span></span>
                    </label>
                  </div>
                  <div class="fs-14 ml-2">Select all</div>
                </div>
                <div class="h-[200px] overflow-auto mr-3">
                  <div v-for="i in 15" :key="i" class="flex pl-3 pt-2">
                    <div>
                      <label>
                        <input type="checkbox" />
                        <span></span>
                      </label>
                    </div>
                    <div class="fs-14 ml-2">Checkbox</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div></div>
          <div></div>
          <div class="flex justify-end h-40px mt-9">
            <button class="w-[92%] py-2 rounded-lg bg-[#299B9B] text-white">
              Применить
            </button>
            <button class="mt-3 ml-3"><IconRe /></button>
          </div>
        </div>
      </div>
    </div>

    <div class="flex gap-7.5 items-center">
      <h3 class="fs-16 font-semibold text-gray-3 mt-4">Выберите продукт</h3>
      <div class="w-[40%] h-[44px] flex bg-white rounded-lg mt-4">
        <div
          v-for="item in tabs"
          :key="item.number"
          class="inline-block h-full w-[30%]"
        >
          <input
            :id="item.number"
            @click="onChangeTab(item.number)"
            type="radio"
            :value="amount"
            class="hidden"
          />
          <label
            :class="[
              item.number === 5
                ? 'rounded-r-large'
                : '' || item.number === 1
                ? 'rounded-l-large'
                : '',
              amount === item.number && 'selected_tab',
            ]"
            :for="item.number"
            class="text-center inline-block cursor-pointer leading-[100%] hover:text-gray-500 w-full py-[14px] px-4 fs-14"
            >{{ item.name }}</label
          >
        </div>
      </div>
    </div>

    <h3 class="text-2xl font-semibold text-gray-3">Агенты</h3>

    <div
      v-click-outside="clickOutside"
      class="rounded-lg bg-white border-grey px-[2px]"
    >
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
          <excel-btn :size="'300kb'"></excel-btn>
        </div>
      </div>
      <div class="w-full overflow-auto">
        <data-table :headers="headers" @sort="sortData" :sorted="sortedData">
          <template #body>
            <template v-for="(data, index) in loadedData" :key="index">
              <c-tr class="border-b-none b-bottom cursor-pointer">
                <c-td-no-edit
                  v-for="key in headers"
                  :key="key"
                  :class="key.borderX && 'border-r-1'"
                >
                  <div class="py-2" v-if="key.checked">
                    {{ data[key.key] }}
                  </div>
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
        <d-modal
          @closeDialog="draggableDialog"
          :name="'Управление меню таблицы'"
        >
          <drag-and-drop></drag-and-drop>
        </d-modal>
      </div>
    </transition>
    <transition name="modal">
      <div v-if="paymentModal">
        <d-modal
          @closeDialog="paymentDialog"
          :dataContainerWidth="'625px'"
          :name="'Оплата ID - 1235'"
        >
          <lazy-clients-payment-dialog />
        </d-modal>
      </div>
    </transition>

    <h3 class="text-2xl font-semibold text-gray-3">Супервайзер</h3>

    <div
      v-click-outside="clickOutside"
      class="rounded-lg bg-white border-grey px-[2px]"
    >
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
          <excel-btn :size="'300kb'"></excel-btn>
        </div>
      </div>
      <div class="w-full overflow-auto">
        <data-table :headers="headers" @sort="sortData" :sorted="sortedData">
          <template #body>
            <template v-for="(data, index) in loadedData" :key="index">
              <c-tr class="border-b-none b-bottom cursor-pointer">
                <c-td-no-edit
                  v-for="key in headers"
                  :key="key"
                  :class="key.borderX && 'border-r-1'"
                >
                  <div class="py-2" v-if="key.checked">
                    {{ data[key.key] }}
                  </div>
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
        <d-modal
          @closeDialog="draggableDialog"
          :name="'Управление меню таблицы'"
        >
          <drag-and-drop></drag-and-drop>
        </d-modal>
      </div>
    </transition>
    <transition name="modal">
      <div v-if="paymentModal">
        <d-modal
          @closeDialog="paymentDialog"
          :dataContainerWidth="'625px'"
          :name="'Оплата ID - 1235'"
        >
          <lazy-clients-payment-dialog />
        </d-modal>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
const filter = ref({
  isSelectAgent: false,
  isSelectTerritory: false,
  isSelectCategory: false,
  isSelectDay: false,
  isSelectMonth: false,
});

const amount = ref(1);
const searchText = ref("");
const availablePages = ref(28);
let currentPage = ref(1);
let pageSize = ref(10);
const draggable = ref(false);
const paymentModal = ref(false);

let sortedData = ref({ key: "", mode: "" });

const tabs = ref([
  {
    name: "Tab",
    number: 1,
    tab: "tab1",
  },
  {
    name: "Tab",
    number: 2,
    tab: "tab2",
  },
  {
    name: "Tab",
    number: 3,
    tab: "tab3",
  },
  {
    name: "Tab",
    number: 4,
    tab: "tab4",
  },
  {
    name: "Tab",
    number: 5,
    tab: "tab5",
  },
]);
let headers = ref([
  {
    name: "Код агент",
    checked: true,
    key: "codeAgent",
    type: "come",
    thWidth: "80px",
  },
  {
    name: "ФИО",
    checked: true,
    key: "fullName",
    type: "come",
    thWidth: "110px",
  },
  {
    name: "Доля в бизнесе",
    checked: true,
    key: "shareInBusiness",
    type: "come",
    thWidth: "110px",
  },
  {
    name: "План",
    checked: true,
    key: "plan",
    type: "come",
    thWidth: "110px",
  },

  {
    name: "Факт",
    checked: true,
    key: "fact",
    type: "come",
    thWidth: "110px",
  },
  {
    name: "Индекс Факт/План",
    checked: true,
    key: "indexFactPlan",
    type: "come",
    thWidth: "140px",
    borderX: true,
  },
  {
    name: "1 окт",
    checked: true,
    key: "oct_1",
    type: "come",
    thWidth: "110px",
    borderX: true,
    bgHeader: "#FFF1F1",
  },
  {
    name: "2 окт",
    checked: true,
    key: "oct_2",
    type: "come",
    thWidth: "110px",
    borderX: true,
  },
  {
    name: "3 окт",
    checked: true,
    key: "oct_3",
    type: "come",
    thWidth: "110px",
    borderX: true,
  },
  {
    name: "4 окт",
    checked: true,
    key: "oct_4",
    type: "come",
    thWidth: "110px",
    borderX: true,
  },
  {
    name: "5 окт",
    checked: true,
    key: "oct_5",
    type: "come",
    thWidth: "110px",
    borderX: true,
  },
  {
    name: "6 окт",
    checked: true,
    key: "oct_6",
    type: "come",
    thWidth: "110px",
    borderX: true,
  },
  {
    name: "7 окт",
    checked: true,
    key: "oct_7",
    type: "come",
    thWidth: "110px",
    borderX: true,
  },
]);
const loadedData = ref([
  {
    codeAgent: "1",
    fullName: "Максим",
    shareInBusiness: "0%",
    plan: "13",
    fact: "6,7",
    indexFactPlan: "0%",
    oct_1: "100 000",
    oct_2: "100 000",
    oct_3: "100 000",
    oct_4: "100 000",
    oct_5: "100 000",
    oct_6: "100 000",
    oct_7: "100 000",
  },
  {
    codeAgent: "1",
    fullName: "Максим",
    shareInBusiness: "0%",
    plan: "13",
    fact: "6,7",
    indexFactPlan: "0%",
    oct_1: "100 000",
    oct_2: "100 000",
    oct_3: "100 000",
    oct_4: "100 000",
    oct_5: "100 000",
    oct_6: "100 000",
    oct_7: "100 000",
  },
  {
    codeAgent: "1",
    fullName: "Максим",
    shareInBusiness: "0%",
    plan: "13",
    fact: "6,7",
    indexFactPlan: "0%",
    oct_1: "100 000",
    oct_2: "100 000",
    oct_3: "100 000",
    oct_4: "100 000",
    oct_5: "100 000",
    oct_6: "100 000",
    oct_7: "100 000",
  },
  {
    codeAgent: "1",
    fullName: "Максим",
    shareInBusiness: "0%",
    plan: "13",
    fact: "6,7",
    indexFactPlan: "0%",
    oct_1: "100 000",
    oct_2: "100 000",
    oct_3: "100 000",
    oct_4: "100 000",
    oct_5: "100 000",
    oct_6: "100 000",
    oct_7: "100 000",
  },
  {
    codeAgent: "1",
    fullName: "Максим",
    shareInBusiness: "0%",
    plan: "13",
    fact: "6,7",
    indexFactPlan: "0%",
    oct_1: "100 000",
    oct_2: "100 000",
    oct_3: "100 000",
    oct_4: "100 000",
    oct_5: "100 000",
    oct_6: "100 000",
    oct_7: "100 000",
  },
  {
    codeAgent: "1",
    fullName: "Максим",
    shareInBusiness: "0%",
    plan: "13",
    fact: "6,7",
    indexFactPlan: "0%",
    oct_1: "100 000",
    oct_2: "100 000",
    oct_3: "100 000",
    oct_4: "100 000",
    oct_5: "100 000",
    oct_6: "100 000",
    oct_7: "100 000",
  },
  {
    codeAgent: "1",
    fullName: "Максим",
    shareInBusiness: "0%",
    plan: "13",
    fact: "6,7",
    indexFactPlan: "0%",
    oct_1: "100 000",
    oct_2: "100 000",
    oct_3: "100 000",
    oct_4: "100 000",
    oct_5: "100 000",
    oct_6: "100 000",
    oct_7: "100 000",
  },
  {
    codeAgent: "1",
    fullName: "Максим",
    shareInBusiness: "0%",
    plan: "13",
    fact: "6,7",
    indexFactPlan: "0%",
    oct_1: "100 000",
    oct_2: "100 000",
    oct_3: "100 000",
    oct_4: "100 000",
    oct_5: "100 000",
    oct_6: "100 000",
    oct_7: "100 000",
  },
]);

// Methods
function searchUpdated(text: any) {
  console.log(text);
}

function sortData(data: any) {
  sortedData.value = data;
}

function setPage(index: any) {
  currentPage.value = index;
}

function setPageSize(size: any) {
  pageSize.value = size;
}

function draggableDialog() {
  draggable.value = false;
}

const clickOutside = () => {
  filter.value.isSelectAgent = false;
  filter.value.isSelectTerritory = false;
  filter.value.isSelectCategory = false;
  filter.value.isSelectDay = false;
  filter.value.isSelectMonth = false;
};

const onChangeTab = (param: number) => {
  amount.value = param;
};
</script>

<style scoped>
/* Checked */
.selected_tab {
  background: #299b9b;
  color: white;
  height: 44px;
}
</style>
