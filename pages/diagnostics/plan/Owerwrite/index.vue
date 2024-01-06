<template>
  <div class="py-7.5 px-5 flex flex-col gap-5">
    <h3 class="text-2xl font-semibold text-gray-3 mb-0">
      Установка плана: Outlet Targeting
    </h3>
    <div class="flex gap-5">
      <diagnosticsProductAmountBox
        :title="'Coca cola'"
        :amount="76800.0"
        class="w-1/4"
      />
      <diagnosticsProductAmountBox
        :title="'Coca cola'"
        :amount="76800.0"
        class="w-1/4"
      />
      <diagnosticsProductAmountBox
        :title="'Coca cola'"
        :amount="76800.0"
        class="w-1/4"
      />
      <diagnosticsProductAmountBox
        :title="'Coca cola'"
        :amount="76800.0"
        class="w-1/4"
      />
    </div>

    <div v-click-outside="clickOutside" class="pt-2.5">
      <div class="bg-white p-4 w-full rounded-lg flex flex-col gap-9">
        <div class="grid grid-cols-4 gap-4">
          <div class="relative">
            <div class="fs-12 my-2">Период истории</div>
            <div>
              <div
                @click="
                  filter.isSelectPeriodHistory = !filter.isSelectPeriodHistory
                "
                class="w-full relative flex pt-2 h-[42px] border rounded-lg bg-[#FAFDFD]"
              >
                <div class="ml-4 mt-2">
                  <IconArrowBottom />
                </div>
                <div class="fs-14 text-gray ml-2">Выбрать</div>
              </div>
              <div
                v-if="filter.isSelectPeriodHistory"
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
            <div class="fs-12 my-2">Тип плана</div>
            <div
              @click="filter.isSelectTypePlan = !filter.isSelectTypePlan"
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
        </div>
      </div>
    </div>
    <div class="w-full flex justify-start">
      <nuxt-link class="w-full" to="/diagnostics/plan/215">
        <m-btn class="w-1/5">Рассчитать заного</m-btn>
      </nuxt-link>
    </div>

    <h3 class="text-2xl font-semibold text-gray-3 mb-0 pb-1 pt-2.5">
      Побробнее
    </h3>
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
const searchText = ref("");
const availablePages = ref(28);
const currentPage = ref(1);
const pageSize = ref(10);
const draggable = ref(false);
const paymentModal = ref(false);

const filter = ref({
  isSelectPeriodHistory: false,
  isSelectTypePlan: false,
  isSelectMonth: false,
  isSelectYear: false,
});

const sortedData = ref({ key: "", mode: "" });

const headers = ref([
  {
    name: "Название агента",
    checked: true,
    key: "nameOfAgent",
    type: "nameOfAgent",
    thWidth: "180px",
  },
  {
    name: "Дена",
    checked: true,
    key: "dena1",
    type: "dena",
    thWidth: "180px",
  },
  {
    name: "Дена",
    checked: true,
    key: "dena2",
    type: "dena",
    thWidth: "180px",
  },
  {
    name: "Дена",
    checked: true,
    key: "dena3",
    type: "dena",
    thWidth: "180px",
  },
  {
    name: "Дена",
    checked: true,
    key: "dena4",
    type: "dena",
    thWidth: "180px",
  },
  {
    name: "Дена",
    checked: true,
    key: "dena5",
    type: "dena",
    thWidth: "180px",
  },
]);
const loadedData = ref([
  {
    nameOfAgent: "ТП андрей",
    dena1: "156",
    dena2: "156",
    dena3: "156",
    dena4: "156",
    dena5: "156",
  },
  {
    nameOfAgent: "ТП андрей",
    dena1: "156",
    dena2: "156",
    dena3: "156",
    dena4: "156",
    dena5: "156",
  },
  {
    nameOfAgent: "ТП андрей",
    dena1: "156",
    dena2: "156",
    dena3: "156",
    dena4: "156",
    dena5: "156",
  },
  {
    nameOfAgent: "ТП андрей",
    dena1: "156",
    dena2: "156",
    dena3: "156",
    dena4: "156",
    dena5: "156",
  },
  {
    nameOfAgent: "ТП андрей",
    dena1: "156",
    dena2: "156",
    dena3: "156",
    dena4: "156",
    dena5: "156",
  },
  {
    nameOfAgent: "ТП андрей",
    dena1: "156",
    dena2: "156",
    dena3: "156",
    dena4: "156",
    dena5: "156",
  },
  {
    nameOfAgent: "ТП андрей",
    dena1: "156",
    dena2: "156",
    dena3: "156",
    dena4: "156",
    dena5: "156",
  },
  {
    nameOfAgent: "ТП андрей",
    dena1: "156",
    dena2: "156",
    dena3: "156",
    dena4: "156",
    dena5: "156",
  },
]);

// Methods
const clickOutside = () => {
  filter.value.isSelectPeriodHistory = false;
  filter.value.isSelectTypePlan = false;
  filter.value.isSelectMonth = false;
  filter.value.isSelectYear = false;
};

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
</script>

<style></style>
