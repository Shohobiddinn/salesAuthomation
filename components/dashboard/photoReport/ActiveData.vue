<template>
  <div
    v-click-outside="clickOutside"
    class="rounded-lg bg-white border-grey px-[2px]"
  >
    <div class="flex mb-4 flex-row gap-4 items-center ml-4 mt-4">
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
    <div class="w-full overflow-auto">
      <data-table
        :headers="headers"
        :configuration="CreateConfiguration"
        @sort="sortData"
        :sorted="sortedData"
      >
        <template #body>
          <c-tr v-for="(data, index) in loadedData" :key="data">
            <c-td v-for="key in headers" :key="key">
              <div v-if="key.checked === true && key.key !== 'photoReport'">
                {{ data[key.key] }}
              </div>
              <div v-if="key.checked === true && key.key === 'photoReport'">
                <img class="h-8 w-9" src="assets/ellipse.png" alt="" />
              </div>
            </c-td>
            <c-td :key="index" class="" v-if="CreateConfiguration.isCreate">
              <div
                :key="index"
                @click="openDropdown(index)"
                class="relative td-shadow drop p-1"
              >
                <div
                  :key="index"
                  class="cursor-pointer flex justify-center w-[30px] py-[6px]"
                >
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
                      @click="agentsLimitModal = true"
                      class="flex border-b cursor-pointer pb-2"
                    >
                      <div><IconEdit /></div>
                      <div class="fs-12 text-[#299B9B] ml-2 mt-1">
                        Редактрировать
                      </div>
                    </div>
                    <div
                      @click="agentsDeleteModal = true"
                      class="flex mt-1 cursor-pointer"
                    >
                      <div class="mt-1"><IconTrash /></div>
                      <div class="fs-12 ml-3 mt-1 text-red">Удалить агента</div>
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
    <div v-if="draggable">
      <d-modal @closeDialog="draggableDialog" :name="'Управление меню таблицы'">
        <drag-and-drop></drag-and-drop>
      </d-modal>
    </div>
  </transition>
  <transition name="modal">
    <div v-if="agentsDeleteModal">
      <c-modal :dataContainerWidth="'350px'" @closeDialog="agentsDeleteDialogs">
        <CommandAgentsDeleteDialog />
      </c-modal>
    </div>
  </transition>
  <transition name="modal">
    <div v-if="agentsLimitModal">
      <h-no-modal
        :dataContainerWidth="dataContainerWidth"
        @closeDialog="agentsLimitDialog"
      >
        <CommandAgentsLimitDialog />
      </h-no-modal>
    </div>
  </transition>
</template>

<script setup>
// State
const searchText = ref("");
const availablePages = ref(28);
let bordered = ref("1px solid black");
const dataContainerWidthConfig = ref("540px");
let currentPage = ref(1);
let pageSize = ref(10);
const draggable = ref(false);
const configurationCompanyModal = ref(false);
const agentsDeleteModal = ref(false);
// Methods
function configurationCompanyDialog() {
  configurationCompanyModal.value = false;
}
const agentsLimitModal = ref(false);
function agentsLimitDialog() {
  agentsLimitModal.value = false;
}
const dataContainerWidth = ref("1140px");

function agentsDeleteDialogs() {
  agentsDeleteModal.value = false;
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
const CreateConfiguration = ref({
  isCreate: true,
  isNoCreate: false,
});
let headers = ref([
  {
    name: "Дата создание",
    checked: true,
    key: "creationDate",
    thWidth: "120px",
  },
  {
    name: "Дата отправление",
    checked: true,
    key: "departureDate",
    thWidth: "140px",
  },
  {
    name: "Сумма",
    checked: true,
    key: "amount",
    thWidth: "140px",
  },
  {
    name: "Тип суммы",
    checked: true,
    key: "priceType",
    thWidth: "140px",
  },
  {
    name: "Получатель",
    checked: true,
    key: "recipient",
    thWidth: "140px",
  },
  {
    name: "Отправил",
    checked: true,
    key: "sent",
    thWidth: "100px",
    bRadius: "8px",
  },
  {
    name: "Комментарии",
    checked: true,
    key: "comment",
    thWidth: "100px",
    bRadius: "8px",
  },
  {
    name: "Фотоотчёт",
    checked: true,
    key: "photoReport",
    thWidth: "100px",
    bRadius: "8px",
  },
]);
const loadedData = ref([
  {
    creationDate: "05.11.2022",
    departureDate: "05.11.2022",
    amount: "Без ограничений",
    priceType: "Без ограничений",
    recipient: "Lorem ipsim",
    sent: "Fakhriyor",
    comment: "Lorem ipsum",
    photoReport: "",
  },
  {
    creationDate: "05.11.2022",
    departureDate: "05.11.2022",
    amount: "Без ограничений",
    priceType: "Без ограничений",
    recipient: "Lorem ipsim",
    sent: "Fakhriyor",
    comment: "Lorem ipsum",
    photoReport: "",
  },
  {
    creationDate: "05.11.2022",
    departureDate: "05.11.2022",
    amount: "Без ограничений",
    priceType: "Без ограничений",
    recipient: "Lorem ipsim",
    sent: "Fakhriyor",
    comment: "Lorem ipsum",
    photoReport: "",
  },
  {
    creationDate: "05.11.2022",
    departureDate: "05.11.2022",
    amount: "Без ограничений",
    priceType: "Без ограничений",
    recipient: "Lorem ipsim",
    sent: "Fakhriyor",
    comment: "Lorem ipsum",
    photoReport: "",
  },
  {
    creationDate: "05.11.2022",
    departureDate: "05.11.2022",
    amount: "Без ограничений",
    priceType: "Без ограничений",
    recipient: "Lorem ipsim",
    sent: "Fakhriyor",
    comment: "Lorem ipsum",
    photoReport: "",
  },
  {
    creationDate: "05.11.2022",
    departureDate: "05.11.2022",
    amount: "Без ограничений",
    priceType: "Без ограничений",
    recipient: "Lorem ipsim",
    sent: "Fakhriyor",
    comment: "Lorem ipsum",
    photoReport: "",
  },
  {
    creationDate: "05.11.2022",
    departureDate: "05.11.2022",
    amount: "Без ограничений",
    priceType: "Без ограничений",
    recipient: "Lorem ipsim",
    sent: "Fakhriyor",
    comment: "Lorem ipsum",
    photoReport: "",
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
label input {
  display: none; /* Hide the default checkbox */
}

/* Style the artificial checkbox */
label span {
  height: 20px;
  width: 20px;
  border-radius: 4px;
  border: 1px solid #d2d7d7;
  display: inline-block;
  position: relative;
}

/* Style its checked state...with a ticked icon */
[type="checkbox"]:checked + span:before {
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
</style>
