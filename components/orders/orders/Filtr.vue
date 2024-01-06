<template>
  <div class="rounded-large border p-4 bg-white">
    <div class="flex justify-between w-full mb-6">
      <page-title-20 :title="'Фильтр'" />
      <div class="flex justify-end w-100 gap-4">
        <div
          class="rounded-large w-75 justify-center items-center flex gap-2 bg-blue-50 px-8"
        >
          <radio-btn>Дата заявки</radio-btn>
          <radio-btn>Дата отгрузки</radio-btn>
        </div>
        <DatePicker class="w-45" />
      </div>
    </div>
    <div
      class="gap-4 grid grid-cols-4"
      v-for="(s, index) in filterStates"
      :key="index"
    >
      <div v-for="cols in s" :key="cols.key">
        <i-title v-if="cols.key !== 'btn'">
          {{ cols.name }}
        </i-title>
        <flex-row
          v-if="cols.key === 'btn'"
          class="h-10 flex justify-end gap-2 mt-9"
        >
          <m-btn @click="$emit('filterClicked')" class="w-full h-9">
            Применить
          </m-btn>
          <sm-btn class="px-3 py-2">
            <IconReloadSVG />
          </sm-btn>
        </flex-row>
        <menu-btn
          v-if="cols.key !== 'btn'"
          class="w-full"
          @click="onOpenDropdown($event, cols.key)"
        >
          <template #btn>
            <m-btn-outlined class="border-grey flex items-center w-full gap-2">
              <fa-icon hash="&#xf078" />
              <div v-if="cols.key === 'territory'" class="w-full">
                <div
                  v-if="territories !== null"
                  class="w-full flex justify-between items-center"
                >
                  <span>Выбрано</span>
                  <span
                    >{{ props.filters.TerritoryId?.length }} из
                    {{ territories.total_count }}</span
                  >
                </div>
                <span v-else>Выбрать</span>
              </div>
              <div v-if="cols.key === 'day'" class="w-full">
                <div
                  v-if="week !== null"
                  class="w-full flex justify-between items-center"
                >
                  <span>Выбрано</span>
                  <span
                    >{{ props.filters.Day?.length }} из
                    {{ week.total_count }}</span
                  >
                </div>
                <span v-else>Выбрать</span>
              </div>
              <div v-if="cols.key === 'agent'" class="w-full">
                <div
                  v-if="agents !== null"
                  class="w-full flex justify-between items-center"
                >
                  <span>Выбрано</span>
                  <span
                    >{{ props.filters.AgentId?.length }} из
                    {{ agents?.total_count }}</span
                  >
                </div>
                <span v-else>Выбрать</span>
              </div>
              <div v-if="cols.key === 'expeditor'" class="w-full">
                <div
                  v-if="expeditors !== null"
                  class="w-full flex justify-between items-center"
                >
                  <span>Выбрано</span>
                  <span
                    >{{ props.filters.ExpeditorId?.length }} из
                    {{ expeditors?.total_count }}</span
                  >
                </div>
                <span v-else>Выбрать</span>
              </div>
              <div v-if="cols.key === 'categoryClients'" class="w-full">
                <div
                  v-if="categoryClients !== null"
                  class="w-full flex justify-between items-center"
                >
                  <span>Выбрано</span>
                  <span
                    >{{ props.filters.ClientCategoryId?.length }} из
                    {{ categoryClients?.total_count }}</span
                  >
                </div>
                <span v-else>Выбрать</span>
              </div>
              <div v-if="cols.key === 'productCategory'" class="w-full">
                <div
                  v-if="productCategory !== null"
                  class="w-full flex justify-between items-center"
                >
                  <span>Выбрано</span>
                  <span
                    >{{ props.filters.ProductCategoryId?.length }} из
                    {{ productCategory?.total_count }}</span
                  >
                </div>
                <span v-else>Выбрать</span>
              </div>
              <div v-if="cols.key === 'statuses'" class="w-full">
                <div
                  v-if="statuses !== null"
                  class="w-full flex justify-between items-center"
                >
                  <span>Выбрано</span>
                  <span
                    >{{ props.filters.Status?.length }} из
                    {{ statuses?.length }}</span
                  >
                </div>
                <span v-else>Выбрать</span>
              </div>
              <div v-if="cols.key === 'type'" class="w-full">
                <div
                  v-if="types !== null"
                  class="w-full flex justify-between items-center"
                >
                  <span>Выбрано</span>
                  <span
                    >{{ props.filters.Type?.length }} из
                    {{ types?.length }}</span
                  >
                </div>
                <span v-else>Выбрать</span>
              </div>
              <div v-if="cols.key === 'warehouses'" class="w-full">
                <div
                  v-if="warehouses !== null"
                  class="w-full flex justify-between items-center"
                >
                  <span>Выбрано</span>
                  <span
                    >{{ props.filters?.WarehouseId?.length }} из
                    {{ warehouses?.total_count }}</span
                  >
                </div>
                <span v-else>Выбрать</span>
              </div>
              <div v-if="cols.key === 'priceType'" class="w-full">
                <div
                  v-if="priceTypes !== null"
                  class="w-full flex justify-between items-center"
                >
                  <span>Выбрано</span>
                  <span
                    >{{ props.filters.PriceTypeId?.length }} из
                    {{ priceTypes?.total_count }}</span
                  >
                </div>
                <span v-else>Выбрать</span>
              </div>
              <div v-if="cols.key === 'paymentType'" class="w-full">
                <div v-if="currency !== null" class="w-full flex justify-between items-center">
                  <span>Выбрано</span> {{ props.filters.CurrencyId?.length }} из
                  {{ currency?.total_count }}
                </div>
                <span v-else>Выбрать</span>
              </div>
            </m-btn-outlined>
          </template>
          <template #content>
            <flex-col
              class="gap-2 max-h-88 overflow-auto pr-2"
              v-if="cols.key === 'statuses' && cols.key !== 'btn'"
            >
              <search-input @change="search($event, cols.key)" />
              <FilterItemsStatus
                :data="statuses"
                :selectedItems="filters.Status"
                @onSelectItems="selectStatus"
                @onLoadElse="onLoadElseStatus"
              />
            </flex-col>
            <flex-col
              class="gap-2 max-h-88 overflow-auto pr-2"
              v-if="cols.key === 'type' && cols.key !== 'btn'"
            >
              <search-input @change="search($event, cols.key)" />
              <FilterItemsStatus
                :data="types"
                :selectedItems="filters.Type"
                @onSelectItems="selectType"
                @onLoadElse="onLoadElseType"
              />
            </flex-col>
            <flex-col
              class="gap-2 max-h-88 overflow-auto pr-2"
              v-if="cols.key === 'priceType' && cols.key !== 'btn'"
            >
              <search-input @change="search($event, cols.key)" />
              <FilterItems
                :data="priceTypes"
                :selectedItems="filters.PriceTypeId"
                @onSelectItems="selectPriceType"
                @onLoadElse="onLoadElsePriceType"
              />
            </flex-col>
            <flex-col
              class="gap-2 max-h-88 overflow-auto pr-2"
              v-if="cols.key === 'paymentType' && cols.key !== 'btn'"
            >
              <search-input @change="search($event, cols.key)" />
              <FilterItems
                :data="currency"
                :selectedItems="filters.CurrencyId"
                @onSelectItems="selectCurrency"
                @onLoadElse="onLoadElseCurrency"
              />
            </flex-col>
            <flex-col
              class="gap-2 max-h-88 overflow-auto pr-2"
              v-if="cols.key === 'productCategory' && cols.key !== 'btn'"
            >
              <search-input @change="search($event, cols.key)" />
              <FilterItems
                :data="productCategory"
                :selectedItems="filters.ProductCategoryId"
                @onSelectItems="selectProductCategory"
                @onLoadElse="onLoadElseProductCategory"
              />
            </flex-col>
            <flex-col
              class="gap-2 max-h-88 overflow-auto pr-2"
              v-if="cols.key === 'categoryClients' && cols.key !== 'btn'"
            >
              <search-input @change="search($event, cols.key)" />
              <FilterItems
                :data="categoryClients"
                :selectedItems="filters.ClientCategoryId"
                @onSelectItems="selectClientCategory"
                @onLoadElse="onLoadElseClientCategory"
              />
            </flex-col>
            <flex-col
              class="gap-2 max-h-88 overflow-auto pr-2"
              v-if="cols.key === 'warehouses' && cols.key !== 'btn'"
            >
              <search-input @change="search($event, cols.key)" />
              <FilterItems
                :data="warehouses"
                :selectedItems="filters.WarehouseId"
                @onSelectItems="selectWarehouses"
                @onLoadElse="onLoadElseWarehouses"
              />
            </flex-col>
            <flex-col
              class="gap-2 max-h-88 overflow-auto pr-2"
              v-if="cols.key === 'expeditor' && cols.key !== 'btn'"
            >
              <search-input @change="search($event, cols.key)" />
              <FilterItems
                :data="expeditors"
                :selectedItems="filters.ExpeditorId"
                @onSelectItems="selectExpeditors"
                @onLoadElse="onLoadElseExpeditors"
              />
            </flex-col>
            <flex-col
              class="gap-2 max-h-88 overflow-auto pr-2"
              v-if="cols.key === 'agent' && cols.key !== 'btn'"
            >
              <search-input @change="search($event, cols.key)" />
              <FilterItems
                :data="agents"
                :selectedItems="filters.AgentId"
                @onSelectItems="selectAgents"
                @onLoadElse="onLoadElseUsers"
              />
            </flex-col>
            <flex-col
              class="gap-2 max-h-88 overflow-auto pr-2"
              v-if="cols.key === 'day' && cols.key !== 'btn'"
            >
              <search-input @change="search($event, cols.key)" />
              <FilterItems
                :data="week"
                :selectedItems="filters.Day"
                @onSelectItems="selectDay"
                @onLoadElse="onLoadElseDay"
              />
            </flex-col>
            <flex-col
              class="gap-2 max-h-88 overflow-auto pr-2"
              v-if="cols.key === 'territory' && cols.key !== 'btn'"
            >
              <search-input @change="search($event, cols.key)" />
              <FilterItems
                :data="territories"
                :selectedItems="filters.TerritoryId"
                @onSelectItems="selectTerritories"
                @onLoadElse="onLoadElseTerritories"
              />
            </flex-col>
          </template>
        </menu-btn>
      </div>
    </div>
  </div>
</template>

<script setup>
// Store
import FilterItemsStatus from "~/components/global/FilterItemsStatus.vue";
import { useFilterListStore } from "~/stores/list-for-filter/list.store";

const props = defineProps({
  filters: Object,
});
const customerStore = useReportCustomerStore("main");
const filterStore = useFilterListStore("");
const orderStore = useOrdersStore("");
const agents = ref(null);
const territories = ref(null);
const taras = ref(null);
const statuses = ref(null);
const types = ref(null);
const priceTypes = ref(null);
const currency = ref(null);
const productCategory = ref(null);
const categoryClients = ref(null);
const warehouses = ref(null);
const expeditors = ref(null);

function selectAgents(param) {
  props.filters.AgentId = param;
}

const week = ref({
  items: [
    {
      name: "Пн",
      id: "Monday",
    },
    {
      name: "Вт",
      id: "Tuesday",
    },
    {
      name: "Ср",
      id: "Wednesday",
    },
    {
      name: "Чт",
      id: "Thursday",
    },
    {
      name: "Пт",
      id: "Friday",
    },
    {
      name: "Сб",
      id: "Saturday",
    },
    {
      name: "Вс",
      id: "Sunday",
    },
  ],
  total_count: 7
});
function selectStatus(param) {
  props.filters.Status = param;
}
function selectType(param) {
  props.filters.Type = param;
}
const priceTypesN = ref({
  name: null,
  names: [],
});
const paymentTypesN = ref({
  name: null,
  names: [],
});
function selectPriceType(param, names) {
  props.filters.PriceTypeId = param;
  priceTypesN.value.names = names;
  priceTypesN.value.name = names[0];
}
function selectCurrency(param, names) {
  props.filters.CurrencyId = param;
  paymentTypesN.value.names = names;
  paymentTypesN.value.name = names[0];
}
function selectProductCategory(param) {
  props.filters.ProductCategoryId = param;
}
function selectClientCategory(param) {
  props.filters.ClientCategoryId = param;
}
let warehousesNames = ref(null);
let warehousesName = ref(null);

function selectWarehouses(param, name) {
  props.filters.WarehouseId = param;
  warehousesNames.value = name;
  warehousesName.value = warehousesNames.value[0];
}
function selectExpeditors(param) {
  props.filters.ExpeditorId = param;
}
function selectTerritories(param) {
  props.filters.TerritoryId = param;
}
function selectDay(param) {
  props.filters.Day = param;
}

const onLoadElseStatus = async () => {
  usersParams.value.page_size += 10;
  await getStatus();
};
const onLoadElseType = async () => {
  usersParams.value.page_size += 10;
  await getTypes();
};
const onLoadElsePriceType = async () => {
  usersParams.value.page_size += 10;
  await getPriceTypes();
};
const onLoadElseCurrency = async () => {
  usersParams.value.page_size += 10;
  await getCurrency();
};
const onLoadElseProductCategory = async () => {
  usersParams.value.page_size += 10;
  await getProductCategory();
};
const onLoadElseClientCategory = async () => {
  usersParams.value.page_size += 10;
  await getClientCategory();
};
const onLoadElseWarehouses = async () => {
  usersParams.value.page_size += 10;
  await getWarehouses();
};
const onLoadElseExpeditors = async () => {
  usersParams.value.page_size += 10;
  await getExpeditors();
};
const onLoadElseUsers = async () => {
  usersParams.value.page_size += 10;
  await getUsers();
};
const onLoadElseTerritories = async () => {
  territoriesParams.value.page_size += 10;
  await getTerritories();
};
const onLoadElseDay = async () => {
  territoriesParams.value.page_size += 10;
  await getDay();
};

const territoriesParams = ref({
  page: 1,
  page_size: 10,
  search: null,
  order_by: {
    field: "id",
    is_asc: true,
  },
  filter: [
    {
      field: "is_active",
      value: ["true"],
    },
  ],
});

const usersParams = ref({
  page: 1,
  page_size: 10,
  search: null,
  order_by: {
    field: "id",
    is_asc: true,
  },
  filter: [
    {
      field: 'is_active',
      value: ['true']
    }
  ]
});
const getUsers = async () => {
  const data = await filterStore.getAgent(usersParams.value);
  agents.value = data;
  agents.value = JSON.parse(JSON.stringify(data));
};
const getStatus = async () => {
  const data = await orderStore.getOrderStatus(usersParams.value);
  statuses.value = data;
  statuses.value = JSON.parse(JSON.stringify(data));
};
const getTypes = async () => {
  const data = await orderStore.getOrderTypes(usersParams.value);
  types.value = data;
  types.value = JSON.parse(JSON.stringify(data));
};
const getPriceTypes = async () => {
  const data = await filterStore.getPriceType(usersParams.value);
  priceTypes.value = data;
  priceTypes.value = JSON.parse(JSON.stringify(data));
};
const getCurrency = async () => {
  const data = await filterStore.getCurrency(usersParams.value);
  currency.value = data;
  currency.value = JSON.parse(JSON.stringify(data));
  console.log("currency", currency.value);
};
const getProductCategory = async () => {
  const data = await filterStore.getProductCategory(usersParams.value);
  productCategory.value = data;
  productCategory.value = JSON.parse(JSON.stringify(data));
  console.log("currency", currency.value);
};
const getClientCategory = async () => {
  const data = await filterStore.getCategoryClient(usersParams.value);
  categoryClients.value = data;
  categoryClients.value = JSON.parse(JSON.stringify(data));
  console.log("currency", currency.value);
};
const getWarehouses = async () => {
  const data = await filterStore.getWarehouses(usersParams.value);
  warehouses.value = data;
  warehouses.value = JSON.parse(JSON.stringify(data));
  console.log("currency", currency.value);
};
const getExpeditors = async () => {
  const data = await filterStore.getExpeditors(usersParams.value);
  expeditors.value = data;
  expeditors.value = JSON.parse(JSON.stringify(data));
};
const getTerritories = async () => {
  const data = await filterStore.getTerritories(territoriesParams.value);
  territories.value = data;
  territories.value = JSON.parse(JSON.stringify(data));
};
const getDay = async () => {
  // we
  // territories.value = data
  // territories.value = JSON.parse(JSON.stringify(data))
};

const onOpenDropdown = async (value, state) => {
  if (state === "agent" && !agents.value) {
    await getUsers();
    return;
  }
  if (state === "territory" && !territories.value) {
    await getTerritories();
    return;
  }

  if (state === "statuses" && !statuses.value) {
    await getStatus();
    return;
  }
  if (state === "type" && !types.value) {
    await getTypes();
    return;
  }
  if (state === "priceType" && !priceTypes.value) {
    await getPriceTypes();
    return;
  }
  if (state === "paymentType" && !currency.value) {
    await getCurrency();
    return;
  }
  if (state === "productCategory" && !productCategory.value) {
    await getProductCategory();
    return;
  }
  if (state === "categoryClients" && !categoryClients.value) {
    await getClientCategory();
    return;
  }
  if (state === "warehouses" && !warehouses.value) {
    await getWarehouses();
    return;
  }
  if (state === "expeditor" && !expeditors.value) {
    await getExpeditors();
    return;
  }
  return;
};
const search = async (value, state) => {
  if (state === "agent") {
    usersParams.value.search = value;
    await getUsers();
    return;
  }
  if (state === "territory") {
    territoriesParams.value.search = value;
    await getTerritories();
    return;
  }

  if (state === "priceType") {
    usersParams.value.search = value;
    await getPriceTypes();
    return;
  }
  if (state === "paymentType") {
    usersParams.value.search = value;
    await getCurrency();
    return;
  }
  if (state === "productCategory") {
    usersParams.value.search = value;
    await getProductCategory();
    return;
  }
  if (state === "categoryClients") {
    usersParams.value.search = value;
    await getClientCategory();
    return;
  }
  if (state === "warehouses") {
    usersParams.value.search = value;
    await getWarehouses();
    return;
  }
  if (state === "expeditor") {
    usersParams.value.search = value;
    await getExpeditors();
    return;
  }
  // if (state === "statuses") {
  //   territoriesParams.value.search = value;
  //   await getTaras();
  //   return;
  // }
  return;
};
// State
const filterStates = ref({
  firstRow: [
    {
      name: "Статус",
      key: "statuses",
    },
    {
      name: "Тип",
      key: "type",
    },
    {
      name: "Тип цены",
      key: "priceType",
    },
    {
      name: "Тип оплаты",
      key: "paymentType",
    },
    {
      name: "Агент",
      key: "agent",
    },
    {
      name: "День",
      key: "day",
    },
    {
      name: "Город",
      key: "territory",
    },
    {
      name: "Категория товара",
      key: "productCategory",
    },
    {
      name: "Категории клиентов",
      key: "categoryClients",
    },
    {
      name: "Склад",
      key: "warehouses",
    },
    {
      name: "Эспедитор",
      key: "expeditor",
    },
    {
      name: "Группа товаров",
      key: "btn",
    },
  ],
});
// Methods
</script>

<style scoped></style>
