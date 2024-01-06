<template>
  <div>
    <div>
      <div class="flex justify-between mt-4">
        <page-title :title="'Заявки'" />
        <div class="relative" v-click-outside="outside">
          <div class="flex w-[242px] h-[44px] bg-blue-10 rounded-lg mt-4">
            <button
              @click="orderSave = !orderSave"
              class="bg-blue-20 w-[40px] h-full rounded-l-lg flex justify-center items-center"
            >
              <IconArrowBottom :color="true" />
            </button>
            <span class="fs-16 fw-5 text-white w-[202px] pt-2.5 text-center">
              <nuxt-link
                :to="{
                  path: '/orders/create-orders',
                  query: { request: '' },
                }"
              >
                Создать заявку
              </nuxt-link>
            </span>
          </div>
          <div
            v-show="orderSave"
            class="w-[242px] absolute shadow z-50 bg-white px-3 rounded-lg top-18"
          >
            <div class="mt-2">
              <nuxt-link
                :to="{
                  path: '/orders/create-orders',
                  query: { refund: '' },
                }"
                class="border-b border-grey_4 mt-2 p-3"
              >
                <span class="whitespace-nowrap">Добавить возврат с полки</span>
              </nuxt-link>
            </div>
            <button class="p-3">
              <nuxt-link
                :to="{
                  path: '/orders/create-orders',
                  query: { exchange: '' },
                }"
              >
                <span>Добвить обмен</span>
              </nuxt-link>
            </button>
          </div>
        </div>
      </div>
      <div class="mt-4">
        <OrdersOrdersFiltr
          :filters="filters1"
          @filterClicked="filterClicked(filters1)"
        />
      </div>
      <div class="flex justify-between mt-2">
        <page-title :title="'Таблица'" />
        <button class="flex mt-2">
          <icon-eye />
          <span class="fs-14 fw-5 ml-2 text-blue-10 mt-[2px]"
            >Показать не отработанных заявок</span
          >
        </button>
      </div>
      <div class="mt-2">
        <OrdersOrdersDataTable
          @getId="getId"
          @clear="ordersId = []"
          @getAllId="getAllId"
          :ordersId="ordersId"
          :filters="filters"
          @setPageSize="setPageSize"
          @setPage="setPage"
          @canceled="canceled"
          @newOrder="newOrder"
          @restore="restore"
          :ordersStore="ordersStore"
          :orders="ordersStore.data?.items"
        />
      </div>
      <div class="flex justify-between w-full">
        <div class="mt-6 relative w-full">
          <div
            class="w-[500px] h-[44px] border border-blue-20 flex bg-white rounded-lg"
          >
            <div class="form_radio_btn h-full w-[40%]">
              <input
                id="product-2"
                @input="inputValue(2)"
                type="radio"
                name="product"
                :value="amount"
              />
              <label
                for="product-2"
                class="h-[44px] rounded-l-lg w-full py-[14px] px-4 fs-14"
                >Прикрепить екпедиторва</label
              >
            </div>
            <div class="form_radio_btn h-full w-[30%]">
              <input
                id="product-3"
                @input="inputValue(3)"
                @click="payment"
                type="radio"
                name="product"
                :value="amount"
              />
              <label
                for="product-3"
                class="h-[44px] w-full py-[14px] px-4 fs-14"
                >Приход в кассу</label
              >
            </div>
            <div class="form_radio_btn h-full w-[30%]">
              <input
                id="product-4"
                @input="inputValue(4)"
                type="radio"
                name="product"
                :value="amount"
              />
              <label
                for="product-4"
                class="h-[44px] w-full rounded-r-lg py-[14px] px-4 fs-14"
                >Итоги по заказам</label
              >
            </div>
          </div>
          <div
            v-show="amount === 1"
            class="bg-white rounded-lg px-3 w-[257px] absolute top-14"
          >
            <div
              v-for="item in status"
              :key="item"
              class="border-b border-gray-40 pb-1 pt-1"
            >
              {{ item.name }}
            </div>
            <div
              class="border-gray-40 pb-1 pt-1 mt-1 text-blue-10 fs-14 fw-5 flex"
            >
              <IconCalendar /><span class="mt-[2px] ml-2"
                >Прикрепить дата отгрузки</span
              >
            </div>
          </div>
          <div
            v-show="amount === 2"
            class="bg-white rounded-lg px-3 w-[769px] absolute top-14"
          >
            <div class="flex w-full mt-6 mb-3 gap-4">
              <span class="mt-3">Выберите экспедитора:</span>
              <div class="w-[30%] ml-3">
                <div class="flex-row">
                  <select
                    v-model="dataExpeditor.expeditorId"
                    class="border w-full h-[42px] bg-[#FAFDFD] rounded-lg mt-[1px] mr-[18px] pl-[15px]"
                  >
                    <option value="">Выбрать</option>
                    <option
                      v-for="item in expeditorStore.data?.items"
                      :key="item"
                      :value="item.id"
                    >
                      {{ item.first_name }}
                    </option>
                  </select>
                </div>
              </div>
              <div class="w-[30%] mt-1">
                <m-btn @click="saveExpeditor" class="w-[100%]">Сохранить</m-btn>
              </div>
            </div>
          </div>
        </div>
        <div class="flex gap-5 mt-6">
          <button
            @click="loadF"
            class="border border-blue-10 rounded-lg flex p-2 px-6 bg-white h-40px w-[150px]"
          >
            <span><IconClipboardSVG /></span>
            <span class="fs-14 ml-2">Загруз</span>
          </button>
          <button
            class="border border-blue-10 rounded-lg flex p-2 px-6 h-40px w-[200px] bg-white"
          >
            <span><IconDownload /></span>
            <span class="fs-14 ml-2">Скачать для 1C</span>
          </button>
        </div>
      </div>
      <div v-show="amount === 4" class="bg-white border rounded-lg w-full mt-2">
        <OrdersOrdersOrderTotals />
      </div>
      <div v-show="loading" class="bg-white p-2 mt-2 rounded-lg">
        <OrdersOrdersLoading />
      </div>
    </div>
    <loading-modal v-if="loading1" name="Управление меню таблицы">
      <Loading />
    </loading-modal>
  </div>
</template>

<script setup>
const router = useRouter();
const status = ref([
  {
    name: "Отгружен",
  },
  {
    name: "Доставлен",
  },
  {
    name: "Возврат",
  },
  {
    name: "Отменён",
  },
  {
    name: "Новый",
  },
]);
const filters = ref({
  page: 1,
  pageSize: 10,
  AgentId: [],
  Status: [],
  PriceTypeId: [],
  Type: [],
  CurrencyId: [],
  ProductCategoryId: [],
  ClientCategoryId: [],
  WarehouseId: [],
  ExpeditorId: [],
  TerritoryId: [],
  Day: [],
});
const filters1 = ref({
  page: 1,
  pageSize: 10,
  AgentId: [],
  Status: [],
  PriceTypeId: [],
  Type: [],
  CurrencyId: [],
  ProductCategoryId: [],
  ClientCategoryId: [],
  WarehouseId: [],
  ExpeditorId: [],
  TerritoryId: [],
  Day: [],
});
const ordersId = ref([]);
const expeditorStore = useExpeditorsStore("");
const orderPayment = usePaymentOrdersStore("");
function getId(id, index) {
  if (!ordersId.value.includes(id)) {
    ordersId.value.push(id);
  } else {
    const currentIndex = ordersId.value.findIndex((it) => it === id);
    ordersId.value.splice(currentIndex, 1);
  }
  // clientsStore.clientsId = [...clientsId.value]
}
async function payment() {
  dataExpeditor.value.orders = ordersId.value;
  const queryString = Object.entries(dataExpeditor.value.orders)
    .map(([key, values]) => {
      if (typeof values !== "object") {
        return `orders=${values}`;
      } else {
        if (values.length > 0) {
          return `${key}=${values.join(`&=`)}`;
        } else return;
      }
    })
    .filter((query) => query)
    .join("&");
  console.log("queryString", queryString);
  router.push({ path: "/orders/orders/order-payment", query: { queryString } });
}
function getAllId() {
  if (ordersStore.data?.items.length !== ordersId.value.length) {
    for (let i = 0; i < ordersStore.data?.items.length; i++) {
      if (!ordersId.value.includes(ordersStore.data?.items[i].id)) {
        ordersId.value.push(ordersStore.data?.items[i].id);
      }
    }
  } else {
    ordersId.value = [];
  }
}
watch(filters.value, async () => {
  try {
    loading1.value = true;
    await ordersStore.getData(filters.value);
  } catch (error) {
  } finally {
    loading1.value = false;
  }
});
async function setPageSize(value) {
  filters.value.pageSize = value;
}
function setPage(value) {
  filters.value.page = value;
}
async function filterClicked(filters) {
  // await clientsSharedStore.getData(filters)
  await ordersStore.getData(filters);
}

const orderSave = ref(false);
const amount = ref(0);
const loading = ref(false);
const loading1 = ref(false);

const outside = () => {
  orderSave.value = false;
};
const ordersStore = useOrdersStore("");
const filter = ref({
  isStatus: false,
  isType: false,
  isTypeAmount: false,
  isTypePayment: false,
  isAgent: false,
  isDay: false,
  isCity: false,
  isProductCategory: false,
  isClientCategory: false,
  isWarehouse: false,
  isExpeditor: false,
});
const dataExpeditor = ref({
  expeditorId: "",
  orders: [],
});
async function saveExpeditor() {
  dataExpeditor.value.orders = ordersId.value;
  try {
    loading1.value = true;
    await ordersStore.setExpeditor(dataExpeditor.value);
  } catch (error) {
  } finally {
    loading1.value = false;
    await ordersStore.refresh();
  }
}
function inputValue(param) {
  amount.value = param;
  loading.value = false;
}
function loadF() {
  loading.value = !loading.value;
  amount.value = 0;
}
async function canceled(param) {
  await ordersStore.cancel(param);
  await ordersStore.refresh();
}
async function restore(param) {
  await ordersStore.restore(param);
  await ordersStore.refresh();
}
async function newOrder(param) {
  await ordersStore.cancel(param);
}
onMounted(() => {
  ordersStore.getData(filters.value);
  expeditorStore.getData();
});
</script>

<style scoped>
input[type="radio"] {
  /* ...existing styles */
  display: grid;
  place-content: center;
}

input[type="radio"]::before {
  content: "";
  width: 1em;
  height: 1em;
  border-radius: 50%;
  background-color: #299b9b;
  border: 1px solid #cccccc;
  transform: scale(0);
  transition: 120ms transform ease-in-out;
  box-shadow: inset 1em 1em var(--form-control-color);
}
input[type="radio"]:checked::before {
  transform: scale(1);
}
.form_radio_btn {
  display: inline-block;
}
.form_radio_btn input[type="radio"] {
  display: none;
}
.form_radio_btn label {
  display: inline-block;
  cursor: pointer;
  line-height: 100%;
  user-select: none;
}

/* Checked */
.form_radio_btn input[type="radio"]:checked + label {
  background: #299b9b;
  color: white;
}

/* Hover */
.form_radio_btn label:hover {
  color: #666;
}

/* Disabled */
.form_radio_btn input[type="radio"]:disabled + label {
  background: #efefef;
  color: #666;
}
</style>
