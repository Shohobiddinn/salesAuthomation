<template>
  <div class="py-7.5 px-5 flex flex-col gap-7.5">
    <div class="flex justify-between">
      <h3 class="text-2xl font-semibold text-gray-3">Детальные результаты</h3>
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
            <div class="fs-12 my-2">Супервайзер</div>
            <div>
              <div
                @click="filter.isSelectSuperviser = !filter.isSelectSuperviser"
                class="w-full relative flex pt-2 h-[42px] border rounded-lg bg-[#FAFDFD]"
              >
                <div class="ml-4 mt-2">
                  <IconArrowBottom />
                </div>
                <div class="fs-14 text-gray ml-2">Выбрать</div>
              </div>
              <div
                v-if="filter.isSelectSuperviser"
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
            <div class="fs-12 my-2">Дни посещения</div>
            <div
              @click="filter.isSelectVisitDays = !filter.isSelectVisitDays"
              class="w-full relative flex pt-2 h-[42px] border rounded-lg bg-[#FAFDFD]"
            >
              <div class="ml-4 mt-2">
                <IconArrowBottom />
              </div>
              <div class="fs-14 text-gray ml-2">Выбрать</div>
            </div>
            <div
              v-if="filter.isSelectVisitDays"
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
            <div class="fs-12 my-2">Категория клиентов</div>
            <div
              @click="
                filter.isSelectCategoryClients = !filter.isSelectCategoryClients
              "
              class="w-full relative flex pt-2 h-[42px] border rounded-lg bg-[#FAFDFD]"
            >
              <div class="ml-4 mt-2">
                <IconArrowBottom />
              </div>
              <div class="fs-14 text-gray ml-2">Выбрать</div>
            </div>
            <div
              v-if="filter.isSelectCategoryClients"
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
            <div class="fs-12 my-2">Категория продуктов</div>
            <div>
              <div
                @click="
                  filter.isSelectCategoryProducts =
                    !filter.isSelectCategoryProducts
                "
                class="w-full relative flex pt-2 h-[42px] border rounded-lg bg-[#FAFDFD]"
              >
                <div class="ml-4 mt-2">
                  <IconArrowBottom />
                </div>
                <div class="fs-14 text-gray ml-2">Выбрать</div>
              </div>
              <div
                v-if="filter.isSelectCategoryProducts"
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
            <div class="fs-12 my-2">Группа</div>
            <div
              @click="filter.isSelectGroup = !filter.isSelectGroup"
              class="w-full relative flex pt-2 h-[42px] border rounded-lg bg-[#FAFDFD]"
            >
              <div class="ml-4 mt-2">
                <IconArrowBottom />
              </div>
              <div class="fs-14 text-gray ml-2">Выбрать</div>
            </div>
            <div
              v-if="filter.isSelectGroup"
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
                <div v-for="i in 15" class="flex pl-3 pt-2" :key="i">
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
            <div class="fs-12 my-2">Процент %</div>
            <div
              @click="filter.isSelectPercent = !filter.isSelectPercent"
              class="w-full relative flex pt-2 h-[42px] border rounded-lg bg-[#FAFDFD]"
            >
              <div class="ml-4 mt-2">
                <IconArrowBottom />
              </div>
              <div class="fs-14 text-gray ml-2">Выбрать</div>
            </div>
            <div
              v-if="filter.isSelectPercent"
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
            <div class="fs-12 my-2">Год</div>
            <div
              @click="filter.isSelectYear = !filter.isSelectYear"
              class="w-full relative flex pt-2 h-[42px] border rounded-lg bg-[#FAFDFD]"
            >
              <div class="ml-4 mt-2">
                <IconArrowBottom />
              </div>
              <div class="fs-14 text-gray ml-2">Выбрать</div>
            </div>
            <div
              v-if="filter.isSelectYear"
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
        <data-table
          :headers="headers"
          @sort="sortData"
          :sorted="sortedData"
          class="whitespace-nowrap"
        >
          <template #body>
            <template v-for="(data, index) in loadedData" :key="index">
              <c-tr class="border-b-none b-bottom cursor-pointer">
                <c-td-no-edit v-for="key in headers" :key="key">
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
  isSelectSuperviser: false,
  isSelectAgent: false,
  isSelectVisitDays: false,
  isSelectCategoryClients: false,
  isSelectCategoryProducts: false,
  isSelectGroup: false,
  isSelectPercent: false,
  isSelectYear: false,
  isSelectMonth: false,
});

const searchText = ref("");
const availablePages = ref(28);
const currentPage = ref(1);
const pageSize = ref(10);
const draggable = ref(false);
const paymentModal = ref(false);

const sortedData = ref({ key: "", mode: "" });

const headers = ref([
  {
    name: "ID",
    checked: true,
    key: "id",
    type: "id",
    thWidth: "80px",
  },
  {
    name: "Код агент",
    checked: true,
    key: "codeAgent",
    type: "codeAgent",
    thWidth: "140px",
  },
  {
    name: "Название агента",
    checked: true,
    key: "nameAgent",
    type: "nameAgent",
    thWidth: "140px",
  },
  {
    name: "Название клиента",
    checked: true,
    key: "nameClient",
    type: "nameClient",
    thWidth: "140px",
  },

  {
    name: "Инвентарь",
    checked: true,
    key: "inventory",
    type: "inventory",
    thWidth: "180px",
  },
  {
    name: "День визита",
    checked: true,
    key: "visitDay",
    type: "visitDay",
    thWidth: "140px",
  },
  {
    name: "Июль",
    checked: true,
    key: "july",
    type: "july",
    thWidth: "140px",
  },
  {
    name: "Авг.",
    checked: true,
    key: "august",
    type: "august",
    thWidth: "140px",
  },
  {
    name: "Сен.",
    checked: true,
    key: "september",
    type: "september",
    thWidth: "140px",
  },
  {
    name: "Сред",
    checked: true,
    key: "average",
    type: "average",
    thWidth: "140px",
  },
  {
    name: "Факт Окт.",
    checked: true,
    key: "factOctober",
    type: "factOctober",
    thWidth: "140px",
  },
  {
    name: "План Окт.",
    checked: true,
    key: "planOctober",
    type: "planOctober",
    thWidth: "140px",
  },
]);
const loadedData = ref([
  {
    id: "1",
    codeAgent: "12368",
    nameAgent: "ТП андрей",
    nameClient: "Саша",
    inventory: "Lorem ipsum",
    visitDay: "Пн, Вт, ср",
    july: "156",
    august: "156",
    september: "156",
    average: "156",
    factOctober: "156",
    planOctober: "156",
  },
  {
    id: "1",
    codeAgent: "12368",
    nameAgent: "ТП андрей",
    nameClient: "Саша",
    inventory: "Lorem ipsum",
    visitDay: "Пн, Вт, ср",
    july: "156",
    august: "156",
    september: "156",
    average: "156",
    factOctober: "156",
    planOctober: "156",
  },
  {
    id: "1",
    codeAgent: "12368",
    nameAgent: "ТП андрей",
    nameClient: "Саша",
    inventory: "Lorem ipsum",
    visitDay: "Пн, Вт, ср",
    july: "156",
    august: "156",
    september: "156",
    average: "156",
    factOctober: "156",
    planOctober: "156",
  },
  {
    id: "1",
    codeAgent: "12368",
    nameAgent: "ТП андрей",
    nameClient: "Саша",
    inventory: "Lorem ipsum",
    visitDay: "Пн, Вт, ср",
    july: "156",
    august: "156",
    september: "156",
    average: "156",
    factOctober: "156",
    planOctober: "156",
  },
  {
    id: "1",
    codeAgent: "12368",
    nameAgent: "ТП андрей",
    nameClient: "Саша",
    inventory: "Lorem ipsum",
    visitDay: "Пн, Вт, ср",
    july: "156",
    august: "156",
    september: "156",
    average: "156",
    factOctober: "156",
    planOctober: "156",
  },
  {
    id: "1",
    codeAgent: "12368",
    nameAgent: "ТП андрей",
    nameClient: "Саша",
    inventory: "Lorem ipsum",
    visitDay: "Пн, Вт, ср",
    july: "156",
    august: "156",
    september: "156",
    average: "156",
    factOctober: "156",
    planOctober: "156",
  },
  {
    id: "1",
    codeAgent: "12368",
    nameAgent: "ТП андрей",
    nameClient: "Саша",
    inventory: "Lorem ipsum",
    visitDay: "Пн, Вт, ср",
    july: "156",
    august: "156",
    september: "156",
    average: "156",
    factOctober: "156",
    planOctober: "156",
  },
  {
    id: "1",
    codeAgent: "12368",
    nameAgent: "ТП андрей",
    nameClient: "Саша",
    inventory: "Lorem ipsum",
    visitDay: "Пн, Вт, ср",
    july: "156",
    august: "156",
    september: "156",
    average: "156",
    factOctober: "156",
    planOctober: "156",
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
  filter.value.isSelectSuperviser = false;
  filter.value.isSelectAgent = false;
  filter.value.isSelectVisitDays = false;
  filter.value.isSelectCategoryClients = false;
  filter.value.isSelectCategoryProducts = false;
  filter.value.isSelectGroup = false;
  filter.value.isSelectPercent = false;
  filter.value.isSelectYear = false;
  filter.value.isSelectMonth = false;
};
</script>

<style></style>
