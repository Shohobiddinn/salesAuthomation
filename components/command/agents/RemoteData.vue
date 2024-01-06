<template>
  <div class="flex flex-row gap-4 px-4 items-center">
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
  <div
    v-click-outside="clickOutside"
    class="rounded-lg bg-white border-grey px-[2px] mt-4"
  >
    <div class="w-full overflow-auto">
      <data-table :headers="headers" @sort="sortData" :sorted="sortedData">
        <template #body>
          <c-tr v-for="(data, index) in loadedData" :key="data">
            <c-td v-for="key in headers" :key="key">
              <div class="mt-[-10px] mb-[-10px]" v-if="key.key === 'active'">
                <button
                  class="h-[33px] w-[80px] fs-12 bg-[#E3FCF0] rounded-[41px]"
                >
                  Активный
                </button>
              </div>
              <div
                class="mt-[-10px] mb-[-10px] bg-[#FAFDFD] border rounded-lg"
                v-if="key.key === 'filter'"
              >
                <button
                  @click="okF(index)"
                  :class="[
                    ok.isActive && ok.index === index
                      ? 'bg-[#299B9B] text-white'
                      : '',
                  ]"
                  class="h-[33px] w-[80px] fs-12 rounded-lg"
                >
                  Да
                </button>
                <button
                  @click="noF(index)"
                  :class="[
                    no.isActive && no.index === index
                      ? 'bg-[#299B9B] text-white'
                      : '',
                  ]"
                  class="h-[33px] w-[80px] fs-12 rounded-lg"
                >
                  Нет
                </button>
              </div>
              <div v-if="key.checked === true">
                {{ data[key.key] }}
              </div>
            </c-td>
            <c-td :key="index" class="">
              <div
                :key="index"
                @click="openDropdown(index)"
                class="relative drop td-shadow p-1"
              >
                <div :key="index" class="cursor-pointer w-[30px] ml-2 p-[10px]">
                  <svg
                    width="3"
                    height="17"
                    viewBox="0 0 3 17"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1.5 3C2.32842 3 2.99999 2.32843 2.99999 1.5C2.99999 0.671573 2.32842 0 1.5 0C0.671572 0 0 0.671573 0 1.5C0 2.32843 0.671572 3 1.5 3Z"
                      fill="#424F4F"
                    />
                    <path
                      d="M1.5 10C2.32843 10 3 9.32843 3 8.5C3 7.67157 2.32843 7 1.5 7C0.671573 7 0 7.67157 0 8.5C0 9.32843 0.671573 10 1.5 10Z"
                      fill="#424F4F"
                    />
                    <path
                      d="M1.49999 17C2.32841 17 2.99998 16.3284 2.99998 15.5C2.99998 14.6716 2.32841 14 1.49999 14C0.671568 14 0 14.6716 0 15.5C0 16.3284 0.671568 17 1.49999 17Z"
                      fill="#424F4F"
                    />
                  </svg>
                </div>
                <div
                  :key="index"
                  :class="{ 'active-down': td.isActive && td.index === index }"
                  class="bg-white bottom-[-23px] down rounded-lg z-50 w-[170px] border h-[84px] right-[44px] absolute"
                >
                  <div class="m-3">
                    <div
                      @click="bonusDiscountModal = true"
                      class="flex border-b cursor-pointer pb-2"
                    >
                      <div class="mt-1"><IconRe /></div>
                      <div class="fs-12 text-[#299B9B] ml-2 mt-1">
                        Восстановить
                      </div>
                    </div>
                    <div
                      @click="operationModal = true"
                      class="flex mt-1 cursor-pointer"
                    >
                      <div class="mt-1 text-yellow"><IconInfoCircleY /></div>
                      <div class="fs-12 ml-2 mt-1 text-[#BD7F06]">Операции</div>
                    </div>
                  </div>
                </div>
              </div>
            </c-td>
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
        <page-index
          :available-pages="availablePages"
          :current-page="currentPage"
          @setPage="setPage"
        />
      </div>
    </div>
  </div>
  <transition name="modal">
    <div>
      <d-modal
        v-if="draggable"
        @closeDialog="draggableDialog"
        :name="'Управление меню таблицы'"
      >
        <drag-and-drop></drag-and-drop>
      </d-modal>
    </div>
  </transition>
  <transition name="modal">
    <div v-if="bonusDiscountModal">
      <d-modal
        :dataContainerWidth="dataContainerWidth"
        @closeDialog="discountBonusesDialog"
        :name="'Прикрепление агентов'"
      >
        <CommandAgentsDialogBody />
      </d-modal>
    </div>
  </transition>
  <transition name="modal">
    <div v-if="operationModal">
      <c-modal
        :dataContainerWidth="dataContainerWidth"
        @closeDialog="operationDialog"
        :name="'Прикрепление агентов'"
      >
        <CommandAgentsOperationDialog />
      </c-modal>
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
const dataContainerWidth = ref("450px");
const bonusDiscountModal = ref(false);
const operationModal = ref(false);
function operationDialog() {
  operationModal.value = false;
}
const ok = reactive({
  index: -1,
  isActive: true,
});
const no = reactive({
  index: -1,
  isActive: false,
});
function okF(index) {
  ok.isActive = true;
  no.isActive = false;
  ok.index = index;
}
function noF(index) {
  ok.isActive = false;
  no.isActive = true;
  no.index = index;
}
// Methods
function discountBonusesDialog() {
  bonusDiscountModal.value = false;
}
function draggableDialog() {
  draggable.value = false;
}
const clickOutside = () => {
  td.isActive = false;
  console.log(td.isActive);
};
function openDropdown(index) {
  td.isActive = !td.isActive;
  td.index = index;
}
const td = reactive({
  isActive: false,
  index: -1,
});
let headers = ref([
  {
    name: "№",
    checked: true,
    key: "no",
    thWidth: "70px",
  },
  {
    name: "Ф.И.О",
    checked: true,
    key: "fio",
    thWidth: "120px",
  },
  {
    name: "Версия APK",
    checked: true,
    key: "version",
    thWidth: "140px",
  },
  {
    name: "Фильтр",
    checked: true,
    key: "filter",
    thWidth: "155px",
  },
  {
    name: "Телефон",
    checked: true,
    key: "phone",
    thWidth: "140px",
  },
  {
    name: "Login",
    checked: true,
    key: "login",
    thWidth: "140px",
  },
  {
    name: "Тип",
    checked: true,
    key: "type",
    thWidth: "240px",
  },
]);
const loadedData = ref([
  {
    no: "1",
    version: "ТП Андрей",
    fio: "2.73.54",
    filter: "",
    phone: "+998 97 628 28 82",
    login: "Login 1",
    type: "Торговый представитель",
  },
  {
    no: "1",
    version: "ТП Андрей",
    fio: "2.73.54",
    filter: "",
    phone: "+998 97 628 28 82",
    login: "Login 1",
    type: "Торговый представитель",
  },
  {
    no: "1",
    version: "ТП Андрей",
    fio: "2.73.54",
    filter: "",
    phone: "+998 97 628 28 82",
    login: "Login 1",
    type: "Торговый представитель",
  },
  {
    no: "1",
    version: "ТП Андрей",
    fio: "2.73.54",
    filter: "",
    phone: "+998 97 628 28 82",
    login: "Login 1",
    type: "Торговый представитель",
  },
  {
    no: "1",
    version: "ТП Андрей",
    fio: "2.73.54",
    filter: "",
    phone: "+998 97 628 28 82",
    login: "Login 1",
    type: "Торговый представитель",
  },
  {
    no: "1",
    version: "ТП Андрей",
    fio: "2.73.54",
    filter: "",
    phone: "+998 97 628 28 82",
    login: "Login 1",
    type: "Торговый представитель",
  },
  {
    no: "1",
    version: "ТП Андрей",
    fio: "2.73.54",
    filter: "",
    phone: "+998 97 628 28 82",
    login: "Login 1",
    type: "Торговый представитель",
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
  bottom: 20px;
  top: 20px;
  border-left: 15px solid white;
  border-top: 20px solid transparent;
  border-bottom: 20px solid transparent;
}
</style>
