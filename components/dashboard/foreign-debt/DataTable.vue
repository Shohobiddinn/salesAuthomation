<template>
  <div class="rounded-lg bg-white border-grey px-[2px]">
    <div class="flex justify-between">
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
          <excel-btn :size="'340kb'"></excel-btn>
        </div>
      </div>
    </div>
    <div class="overflow-auto table-containers">
      <data-table
        :headers="headers"
        @sort="sortData"
        :border="true"
        :sorted="sortedData"
      >
        <template #body>
          <template v-for="(data, index) in loadedData" :key="index">
            <c-tr class="b-bottom cursor-pointer">
              <c-td-no-edit v-for="key in headers" :key="key" class="brr">
                <button
                  class="py-2 pb-2 bg-yellow-100 text-yellow-600 rounded-20 px-3"
                  v-if="key.key === 'status' && key.checked"
                >
                  {{ data[key.key] }}
                </button>
                <div
                  class="py-2"
                  v-if="
                    key.key !== 'status' &&
                    key.key !== 'dateExpense' &&
                    key.key !== 'pay' &&
                    key.checked
                  "
                >
                  {{ data[key.key] }}
                </div>
              </c-td-no-edit>
              <c-td :key="index" class="">
                <div
                  :key="index"
                  @click="openDropdown(index)"
                  class="relative td-shadow p-2 drop"
                >
                  <div :key="index" class="cursor-pointer w-[30px] p-[10px]">
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
                    :class="{
                      'active-down': td.isActive && td.index === index,
                    }"
                    class="bg-white bottom-[-23px] down rounded-lg z-50 w-[170px] border right-[44px] absolute"
                  >
                    <div class="m-3">
                      <div
                        @click="agentStore.editDialog = data.id"
                        class="flex border-b cursor-pointer pb-2"
                      >
                        <div>
                          <IconEdit />
                        </div>
                        <div class="fs-12 text-[#299B9B] ml-2 mt-1">
                          Редактрировать
                        </div>
                      </div>
                      <div
                        @click="payment = true"
                        class="flex border-b cursor-pointer pb-2 mt-1"
                      >
                        <div class="mt-1">
                          <IconPlus />
                        </div>
                        <div class="fs-12 text-blue ml-2 mt-1">
                          Добавить оплату
                        </div>
                      </div>
                      <div
                        @click="agentStore.deleteDialog = data.id"
                        class="flex mt-1 cursor-pointer"
                      >
                        <div class="mt-1">
                          <IconTrash />
                        </div>
                        <div class="fs-12 ml-3 mt-1 text-red">
                          Удалить агента
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </c-td>
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
      <d-modal @closeDialog="draggableDialog" :name="'Управление меню таблицы'">
        <drag-and-drop></drag-and-drop>
      </d-modal>
    </div>
  </transition>
  <transition name="modal">
    <div v-if="payment">
      <d-modal
        @closeDialog="closePayment"
        :dataContainerWidth="'400px'"
        :name="'Оплатить долг'"
      >
        <div class="relative w-full">
          <LazyDashboardForeignDebtPaymentDialog />
        </div>
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
// Methods
const active = ref({
  isCreate: false,
  isEdite: false,
});
function openDropdown(index) {
  td.isActive = !td.isActive;
  td.index = index;
}

const td = reactive({
  isActive: false,
  index: -1,
});

function draggableDialog() {
  draggable.value = false;
}
const payment = ref(false);
function closePayment() {
  payment.value = false;
}
let headers = ref([
  {
    name: "Имя и фамилия",
    checked: true,
    key: "family",
    type: "family",
    thWidth: "170px",
    bRadius: "8px",
  },
  {
    name: "Дата получение долга",
    checked: true,
    key: "debt",
    type: "debt",
    thWidth: "180px",
  },
  {
    name: "Оплачет до",
    checked: true,
    key: "payUp",
    type: "payUp",
    thWidth: "140px",
  },
  {
    name: "Пос. оплата",
    checked: true,
    key: "posPayment",
    type: "posPayment",
    thWidth: "160px",
  },
  {
    name: "Сумма",
    checked: true,
    key: "amount",
    type: "amount",
    thWidth: "120px",
  },
  {
    name: "Остаток",
    checked: true,
    key: "remainder",
    type: "remainder",
    thWidth: "120px",
  },

  {
    name: "Общая сумма",
    checked: true,
    key: "totalAmount",
    type: "totalAmount",
    thWidth: "120px",
  },
  {
    name: "Статус",
    checked: true,
    key: "status",
    type: "status",
    thWidth: "160px",
  },
  {
    name: "Комментарии",
    checked: true,
    key: "comment",
    type: "comment",
    thWidth: "160px",
  },
]);
const loadedData = ref([
  {
    family: "Eshonov Faxriyor",
    debt: "05.11.2022",
    payUp: "05.11.2022",
    posPayment: "05.11.2022",
    amount: "1 000 000",
    remainder: "4 000 000",
    totalAmount: "4 000 000",
    status: "Оплачивается",
    comment: "4 000 000",
  },
  {
    family: "Eshonov Faxriyor",
    debt: "05.11.2022",
    payUp: "05.11.2022",
    posPayment: "-",
    amount: "1 000 000",
    remainder: "4 000 000",
    totalAmount: "4 000 000",
    status: "Оплачивается",
    comment: "4 000 000",
  },
  {
    family: "Eshonov Faxriyor",
    debt: "05.11.2022",
    payUp: "05.11.2022",
    posPayment: "-",
    amount: "1 000 000",
    remainder: "4 000 000",
    totalAmount: "4 000 000",
    status: "Оплачивается",
    comment: "4 000 000",
  },
  {
    family: "Eshonov Faxriyor",
    debt: "05.11.2022",
    payUp: "05.11.2022",
    posPayment: "-",
    amount: "1 000 000",
    remainder: "4 000 000",
    totalAmount: "4 000 000",
    status: "Оплачивается",
    comment: "4 000 000",
  },
  {
    family: "Eshonov Faxriyor",
    debt: "05.11.2022",
    payUp: "05.11.2022",
    posPayment: "-",
    amount: "1 000 000",
    remainder: "4 000 000",
    totalAmount: "4 000 000",
    status: "Оплачивается",
    comment: "4 000 000",
  },
  {
    family: "Eshonov Faxriyor",
    debt: "05.11.2022",
    payUp: "05.11.2022",
    posPayment: "-",
    amount: "1 000 000",
    remainder: "4 000 000",
    totalAmount: "4 000 000",
    status: "Оплачивается",
    comment: "4 000 000",
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
.brr:nth-child(3) {
  border-right: 1px solid #e1e4e4;
}
.brr:nth-child(5) {
  border-right: 1px solid #e1e4e4;
}
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
</style>
