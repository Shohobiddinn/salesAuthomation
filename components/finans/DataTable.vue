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
          class="w-full h-9.5"
        />
      </div>
      <div>
        <excel-btn :size="'300kb'"></excel-btn>
      </div>
    </div>
    <div class="w-full overflow-auto">
      <data-table :headers="templates" @sort="sortData" :sorted="sortedData">
        <template #body>
          <template v-for="(data, index) in data" :key="index">
            <c-tr class="border-b-none b-bottom cursor-pointer">
              <c-td v-for="key in templates" :key="key">
                <div class="pt-2 check" v-if="key.key === 'checkbox'">
                  <label>
                    <input type="checkbox" />
                    <span></span>
                  </label>
                </div>
                <div
                  @click="paymentModal = true"
                  v-if="key.checked && key.key === 'id'"
                >
                  {{ data[key.key] }}
                </div>
                <div v-if="key.checked && key.key !== 'id'">
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
                    class="cursor-pointer flex justify-center w-7.5 pl-2 py-1.5"
                  >
                    <IconThreeDotsSVG />
                  </div>
                  <div
                    :key="index"
                    :class="{
                      'active-down': td.isActive && td.index === index,
                    }"
                    class="bg-white bottom-[-23px] down rounded-lg z-50 w-[170px] border right-[44px] absolute"
                  >
                    <div class="m-3">
                      <div class="flex mt-1 cursor-pointer border-b pb-2">
                        <div class="mt-1"><IconTrash /></div>
                        <div class="fs-12 ml-3 mt-1 text-red">
                          Удалить агента
                        </div>
                      </div>
                      <div class="flex items-center cursor-pointer">
                        <div><IconSms :color="'#000000'" /></div>
                        <div class="fs-12 text-black ml-2 mt-1">
                          Отправить SMS
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
    <div v-if="paymentModal">
      <d-modal
        @closeDialog="paymentModal = false"
        :dataContainerWidth="'625px'"
        :name="'Оплата ID - 1235'"
      >
        <lazy-clients-payment-dialog />
      </d-modal>
    </div>
  </transition>
</template>

<script setup lang="ts">
// State
const paymentModal = ref(false);
const templates = ref([
  {
    name: "",
    checked: true,
    key: "checkbox",
    type: "checkbox",
    thWidth: "100px",
  },
  {
    name: "ID",
    checked: true,
    key: "id",
    type: "id",
    thWidth: "140px",
  },
  {
    name: "Дата оплаты",
    checked: true,
    key: "dateOfPayment",
    type: "dateOfPayment",
    thWidth: "140px",
    bRadius: "8px",
  },
  {
    name: "Дата получение оплаты",
    checked: true,
    key: "dateReceiptOfPayment",
    type: "dateReceiptOfPayment",
    thWidth: "140px",
  },
  {
    name: "ИНН",
    checked: true,
    key: "inn",
    type: "inn",
    thWidth: "140px",
  },
  {
    name: "Клиент",
    checked: true,
    key: "client",
    type: "client",
    thWidth: "100px",
  },
  {
    name: "Клиент ID",
    checked: true,
    key: "clientId",
    type: "clientId",
    thWidth: "140px",
  },
  {
    name: "Тип",
    checked: true,
    key: "type",
    type: "type",
    thWidth: "140px",
  },
  {
    name: "Способ оплаты",
    checked: true,
    key: "paymentMethod",
    type: "paymentMethod",
    thWidth: "140px",
  },
  {
    name: "Сумма",
    checked: true,
    key: "sum",
    type: "sum",
    thWidth: "140px",
  },
]);

const data = ref([
  {
    id: "ID - 1235",
    dateOfPayment: "13.10.2022",
    dateReceiptOfPayment: "13.10.2022",
    inn: "12366549129",
    client: "Андрей ака",
    clientId: "ID 1235",
    type: "Оплата",
    paymentMethod: "Наличный Cум",
    sum: "120 000 UZS",
  },
  {
    id: "ID - 1235",
    dateOfPayment: "13.10.2022",
    dateReceiptOfPayment: "13.10.2022",
    inn: "12366549129",
    client: "Андрей ака",
    clientId: "ID 1235",
    type: "Оплата",
    paymentMethod: "Наличный Cум",
    sum: "120 000 UZS",
  },
  {
    id: "ID - 1235",
    dateOfPayment: "13.10.2022",
    dateReceiptOfPayment: "13.10.2022",
    inn: "12366549129",
    client: "Андрей ака",
    clientId: "ID 1235",
    type: "Оплата",
    paymentMethod: "Наличный Cум",
    sum: "120 000 UZS",
  },
  {
    id: "ID - 1235",
    dateOfPayment: "13.10.2022",
    dateReceiptOfPayment: "13.10.2022",
    inn: "12366549129",
    client: "Андрей ака",
    clientId: "ID 1235",
    type: "Оплата",
    paymentMethod: "Наличный Cум",
    sum: "120 000 UZS",
  },
  {
    id: "ID - 1235",
    dateOfPayment: "13.10.2022",
    dateReceiptOfPayment: "13.10.2022",
    inn: "12366549129",
    client: "Андрей ака",
    clientId: "ID 1235",
    type: "Оплата",
    paymentMethod: "Наличный Cум",
    sum: "120 000 UZS",
  },
  {
    id: "ID - 1235",
    dateOfPayment: "13.10.2022",
    dateReceiptOfPayment: "13.10.2022",
    inn: "12366549129",
    client: "Андрей ака",
    clientId: "ID 1235",
    type: "Оплата",
    paymentMethod: "Наличный Cум",
    sum: "120 000 UZS",
  },
  {
    id: "ID - 1235",
    dateOfPayment: "13.10.2022",
    dateReceiptOfPayment: "13.10.2022",
    inn: "12366549129",
    client: "Андрей ака",
    clientId: "ID 1235",
    type: "Оплата",
    paymentMethod: "Наличный Cум",
    sum: "120 000 UZS",
  },
  {
    id: "ID - 1235",
    dateOfPayment: "13.10.2022",
    dateReceiptOfPayment: "13.10.2022",
    inn: "12366549129",
    client: "Андрей ака",
    clientId: "ID 1235",
    type: "Оплата",
    paymentMethod: "Наличный Cум",
    sum: "120 000 UZS",
  },
]);

const searchText = ref("");
const availablePages = ref(28);
let currentPage = ref(1);
let pageSize = ref(10);
const draggable = ref(false);
const router = useRouter();
const sortedData = ref({ key: "", mode: "" });
// Methods
const dataContainerWidth = ref("1140px");
function draggableDialog() {
  draggable.value = false;
}
const clickOutside = () => {
  td.isActive = false;
};
function openDropdown(index: any) {
  td.isActive = !td.isActive;
  td.index = index;
}
const td = reactive({
  isActive: false,
  index: -1,
});
// Methods
const sortData = (data: any) => {
  sortedData.value = data;
};
function setPage(index: any) {
  currentPage.value = index;
}

function setPageSize(size: any) {
  pageSize.value = size;
}
// const props = defineProps({
//   isActive: {
//     type: Boolean,
//     required: true,
//   },
// });

// State
// const { isActive } = toRefs(props);
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
  cursor: pointer;
  box-shadow: -4px 0px 4px 0px rgba(0, 0, 0, 0.04);
}
</style>
