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
        <excel-btn :size="'340kb'"></excel-btn>
      </div>
    </div>
    <div class="w-full overflow-auto">
      <data-table :headers="headers" @sort="sortData" :sorted="sortedData">
        <template #body>
          <template v-for="(data, index) in loadedData" :key="index">
            <c-tr class="border-b-none b-bottom cursor-pointer">
              <c-td v-for="key in headers" :key="key">
                <div class="pt-2 check" v-if="key.key === 'checkbox'">
                  <checkbox :values="key.checked" />
                </div>
                <div
                  @click="paymentModal = true"
                  class="pt-2 check"
                  v-if="key.key === 'id'"
                >
                  {{ data[key.key] }}
                </div>
                <div class="" v-if="key.checked && key.key !== 'id'">
                  {{ data[key.key] }}
                </div>
              </c-td>
              <c-td>
                <div
                  :key="index"
                  @click="openDropdown(index)"
                  class="relative drop td-shadow py1"
                >
                  <div
                    :key="index"
                    class="cursor-pointer flex justify-center w-[30px] pl-2 py-[6px]"
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
                    :class="{
                      'active-down': td.isActive && td.index === index,
                    }"
                    class="bg-white bottom-[-23px] down rounded-lg z-50 w-[180px] border right-[44px] absolute"
                  >
                    <div class="m-3">
                      <div class="flex border-b cursor-pointer pb-2">
                        <div class="text-[18px]"><IconEdit /></div>
                        <div class="fs-12 ml-2 mt-1 text-[#299B9B]">
                          Редактрировать
                        </div>
                      </div>
                      <div class="flex mt-1 cursor-pointer">
                        <div class="mt-[6px]"><IconTrash /></div>
                        <div class="fs-12 ml-3 mt-1 text-red">Удалить</div>
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
    <div v-if="selectModal">
      <d-modal
        @closeDialog="selectDialog"
        :dataContainerWidth="'90%'"
        :name="'Выберите клиентов'"
      >
        <ClientsContactsSelectClientdialog />
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
const selectModal = ref(false);
function selectDialog() {
  selectModal.value = false;
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
    name: "ID",
    checked: true,
    key: "id",
    type: "id",
    thWidth: "80px",
  },
  {
    name: "Название",
    checked: true,
    key: "name",
    type: "name",
    thWidth: "180px",
    bRadius: "8px",
  },
  {
    name: "Номер телефона",
    checked: true,
    key: "phoneNumber",
    type: "phoneNumber",
    thWidth: "180px",
  },
  {
    name: "Ник нейм",
    checked: true,
    key: "nikeBName",
    type: "nikeBName",
    thWidth: "240px",
  },
  {
    name: "Бонус\n",
    checked: true,
    key: "bonus",
    type: "bonus",
    thWidth: "140px",
  },
]);
const loadedData = ref([
  {
    id: "ID1325",
    name: "Faxriyor",
    phoneNumber: "+998 97 628 28 82",
    nikeBName: "nikeBName",
    bonus: "123",
  },
  {
    id: "ID1325",
    name: "Faxriyor",
    phoneNumber: "+998 97 628 28 82",
    nikeBName: "nikeBName",
    bonus: "123",
  },
  {
    id: "ID1325",
    name: "Faxriyor",
    phoneNumber: "+998 97 628 28 82",
    nikeBName: "nikeBName",
    bonus: "123",
  },
  {
    id: "ID1325",
    name: "Faxriyor",
    phoneNumber: "+998 97 628 28 82",
    nikeBName: "nikeBName",
    bonus: "123",
  },
  {
    id: "ID1325",
    name: "Faxriyor",
    phoneNumber: "+998 97 628 28 82",
    nikeBName: "nikeBName",
    bonus: "123",
  },
  {
    id: "ID1325",
    name: "Faxriyor",
    phoneNumber: "+998 97 628 28 82",
    nikeBName: "nikeBName",
    bonus: "123",
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
.check label input {
  display: none; /* Hide the default checkbox */
}

/* Style the artificial checkbox */
.check label span {
  height: 20px;
  width: 20px;
  border-radius: 4px;
  border: 1px solid #d2d7d7;
  display: inline-block;
  position: relative;
}

/* Style its checked state...with a ticked icon */
.check [type="checkbox"]:checked + span:before {
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
.b-bottom:last-child {
  border-bottom: 1px solid #e1e4e4;
}
.b-top-none {
  border-top: none;
}
.bgy {
  background: rgba(189, 127, 6, 0.1);
}
.bg-accepted {
  background: rgba(35, 192, 10, 0.1);
}
.bg-new {
  background: rgba(41, 155, 155, 0.1);
}
.td-shadow {
  box-shadow: -4px 0px 4px 0px rgba(0, 0, 0, 0.04);
}
</style>
