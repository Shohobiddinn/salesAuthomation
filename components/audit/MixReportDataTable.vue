<template>
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
    <flex-row class="w-full overflow-auto mb-3">
      <div>
        <div class="h-45px">
          <div class="bg-lotion w-full h-full border-t-1 border-r-1"></div>
        </div>
        <data-table
          :headers="headers.plans"
          @sort="sortData"
          :sorted="sortedData"
          class="border-r-1"
        >
          <template #body>
            <c-tr
              v-for="data in loadedData.plans"
              :key="data"
              class="border-b-none b-bottom cursor-pointer"
            >
              <c-td-no-edit v-for="key in headers.plans" :key="key">
                <div
                  class="py-14px"
                  @click="$emit('onOpenDetailsPopUp' /*data.id*/)"
                >
                  {{ data[key.key] }}
                </div>
              </c-td-no-edit>
            </c-tr>
          </template>
        </data-table>
      </div>
      <div>
        <div class="h-45px">
          <div class="bg-lotion w-full h-full border-t-1 border-r-1">
            <span class="py-3.5 px-8 text-black fs-12 font-semibold"
              >Дициплина</span
            >
          </div>
        </div>
        <data-table
          :headers="headers.discipline"
          @sort="sortData"
          :sorted="sortedData"
          class="border-r-1"
        >
          <template #body>
            <c-tr
              v-for="data in loadedData.discipline"
              :key="data"
              class="border-b-none b-bottom cursor-pointer"
            >
              <c-td-no-edit v-for="key in headers.discipline" :key="key">
                <div class="py-14px">
                  {{ data[key.key] }}
                </div>
              </c-td-no-edit>
            </c-tr>
          </template>
        </data-table>
      </div>
      <div>
        <div class="h-45px">
          <div class="bg-lotion w-full h-full border-t-1">
            <span class="py-3.5 px-8 text-black fs-12 font-semibold"
              >Аудит опрос</span
            >
          </div>
        </div>
        <data-table
          :headers="headers.auditSurvey"
          @sort="sortData"
          :sorted="sortedData"
        >
          <template #body>
            <c-tr
              v-for="data in loadedData.auditSurvey"
              :key="data"
              class="border-b-none b-bottom cursor-pointer"
            >
              <c-td-no-edit v-for="key in headers.auditSurvey" :key="key">
                <div class="py-14px">
                  {{ data[key.key] }}
                </div>
              </c-td-no-edit>
            </c-tr>
          </template>
        </data-table>
      </div>
    </flex-row>
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

const emits = defineEmits(["onOpenDetailsPopUp"]);

// Methods
function draggableDialog() {
  draggable.value = false;
}
const clickOutside = () => {
  td.isActive = false;
  console.log(td.isActive);
};

const td = reactive({
  isActive: false,
  index: -1,
});

let headers = ref({
  plans: [
    {
      name: "ФИО мерчен",
      checked: true,
      key: "FullNameMerchan",
      type: "FullNameMerchan",
      thWidth: "140px",
      thHeight: "57px",
    },
    {
      name: "ОКБ",
      checked: true,
      key: "OKB",
      type: "OKB",
      thWidth: "140px",
      thHeight: "57px",
    },
    {
      name: "План визит",
      checked: true,
      key: "planVisit",
      type: "planVisit",
      thWidth: "140px",
      thHeight: "57px",
    },
    {
      name: "План посещено",
      checked: true,
      key: "planIncome",
      type: "planIncome",
      thWidth: "140px",
      thHeight: "57px",
    },
  ],
  discipline: [
    {
      name: "Сред. прод. визит (час.мин)",
      checked: true,
      key: "averageDuration",
      type: "averageDuration",
      thWidth: "140px",
      thHeight: "57px",
    },
    {
      name: "Дни до",
      checked: true,
      key: "daysTill",
      type: "daysTill",
      thWidth: "140px",
      thHeight: "57px",
    },
    {
      name: "Дни после",
      checked: true,
      key: "daysAfter",
      type: "daysAfter",
      thWidth: "140px",
      thHeight: "57px",
    },
  ],
  auditSurvey: [
    {
      name: "Наш. прод.",
      checked: true,
      key: "ourProd",
      type: "ourProd",
      thWidth: "140px",
      thHeight: "57px",
    },
    {
      name: "Конк.прод",
      checked: true,
      key: "konkProd",
      type: "konkProd",
      thWidth: "140px",
      thHeight: "57px",
    },
    {
      name: "Общий",
      checked: true,
      key: "general",
      type: "general",
      thWidth: "140px",
      thHeight: "57px",
    },
    {
      name: "Полный",
      checked: true,
      key: "fully",
      type: "fully",
      thWidth: "140px",
      thHeight: "57px",
    },
  ],
});
const loadedData = ref({
  plans: [
    {
      FullNameMerchan: "Э. Фахриёр",
      OKB: "654",
      planVisit: "654",
      planIncome: "654",
    },
    {
      FullNameMerchan: "Э. Фахриёр",
      OKB: "654",
      planVisit: "654",
      planIncome: "654",
    },
    {
      FullNameMerchan: "Э. Фахриёр",
      OKB: "654",
      planVisit: "654",
      planIncome: "654",
    },
    {
      FullNameMerchan: "Э. Фахриёр",
      OKB: "654",
      planVisit: "654",
      planIncome: "654",
    },
    {
      FullNameMerchan: "Э. Фахриёр",
      OKB: "654",
      planVisit: "654",
      planIncome: "654",
    },
    {
      FullNameMerchan: "Э. Фахриёр",
      OKB: "654",
      planVisit: "654",
      planIncome: "654",
    },
    {
      FullNameMerchan: "Э. Фахриёр",
      OKB: "654",
      planVisit: "654",
      planIncome: "654",
    },
    {
      FullNameMerchan: "Э. Фахриёр",
      OKB: "654",
      planVisit: "654",
      planIncome: "654",
    },
  ],
  discipline: [
    {
      averageDuration: "5 000 000",
      daysTill: "5 000 000",
      daysAfter: "5 000 000",
    },
    {
      averageDuration: "5 000 000",
      daysTill: "5 000 000",
      daysAfter: "5 000 000",
    },
    {
      averageDuration: "5 000 000",
      daysTill: "5 000 000",
      daysAfter: "5 000 000",
    },
    {
      averageDuration: "5 000 000",
      daysTill: "5 000 000",
      daysAfter: "5 000 000",
    },
    {
      averageDuration: "5 000 000",
      daysTill: "5 000 000",
      daysAfter: "5 000 000",
    },
    {
      averageDuration: "5 000 000",
      daysTill: "5 000 000",
      daysAfter: "5 000 000",
    },
    {
      averageDuration: "5 000 000",
      daysTill: "5 000 000",
      daysAfter: "5 000 000",
    },
    {
      averageDuration: "5 000 000",
      daysTill: "5 000 000",
      daysAfter: "5 000 000",
    },
  ],
  auditSurvey: [
    {
      ourProd: "5%",
      konkProd: "5%",
      general: "5%",
      fully: "5%",
    },
    {
      ourProd: "5%",
      konkProd: "5%",
      general: "5%",
      fully: "5%",
    },
    {
      ourProd: "5%",
      konkProd: "5%",
      general: "5%",
      fully: "5%",
    },
    {
      ourProd: "5%",
      konkProd: "5%",
      general: "5%",
      fully: "5%",
    },
    {
      ourProd: "5%",
      konkProd: "5%",
      general: "5%",
      fully: "5%",
    },
    {
      ourProd: "5%",
      konkProd: "5%",
      general: "5%",
      fully: "5%",
    },
    {
      ourProd: "5%",
      konkProd: "5%",
      general: "5%",
      fully: "5%",
    },
    {
      ourProd: "5%",
      konkProd: "5%",
      general: "5%",
      fully: "5%",
    },
  ],
});
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
