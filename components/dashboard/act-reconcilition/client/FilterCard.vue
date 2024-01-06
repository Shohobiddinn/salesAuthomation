<template>
  <div class="">
    <div class="gap-4 grid grid-cols-2">
      <div v-for="item in filterStates" :key="item.key" class="w-full">
        <i-title class="h-6"
          >{{ item.name
          }}<span v-if="item.require" class="text-red-3 fs-16">*</span></i-title
        >
        <menu-btn
          v-if="item.type === 'dropdown'"
          class="w-full"
          @click="onOpenDropdown($event, item.key)"
        >
          <template #btn>
            <m-btn-outlined
              class="border-grey flex items-center bg-lotion w-full gap-2 h-11"
            >
              <fa-icon hash="&#xf078;" />
              <div>
                {{
                  form[item.formKey]
                    ? getSelectedItemName(item?.data, item?.getSelectedData)
                    : "Выбрать"
                }}
              </div>
            </m-btn-outlined>
          </template>
          <template #content>
            <flex-col class="gap-2 max-h-88 overflow-auto pr-2">
              <search-input
                v-if="item?.type === 'dropdown' && item.key !== 'cashBoxs'"
                @change="search($event, item.key)"
              />
              <FilterItems
                :data="item?.data"
                :selectedItems="item.getSelectedData"
                singleSelect
                @onSelectItems="item.setSelectedData = $event"
                @onSingleItemSelect="item.setSelectedData = $event"
                @onLoadElse="item?.onLoadElse"
              />
            </flex-col>
          </template>
        </menu-btn>
        <flex-row v-if="item?.type === 'date'" class="mt-2 w-full">
          <div class="border-1 rounded-lg grid grid-cols-2 w-full">
            <DInputDatePicker
              :value="form.from"
              withoutTime
              borderless
              class="border-r-1 w-full"
              @change="(newVal) => (form.from = newVal)"
            />
            <DInputDatePicker
              :value="form.to"
              withoutTime
              borderless
              class="w-full"
              @change="(newVal) => (form.to = newVal)"
            />
          </div>
        </flex-row>
      </div>
    </div>
    <div class="flex justify-end">
      <flex-row class="h-full flex justify-end gap-2 mt-6">
        <m-btn class="w-full h-9" @click="save"> Показать результат </m-btn>
        <sm-btn class="px-4 py-2" @click="clearFilter">
          <IconReloadSVG />
        </sm-btn>
      </flex-row>
    </div>
  </div>
</template>

<script setup>
import moment from "moment";
import { notify } from "@kyvg/vue3-notification";

// Store
const dashboardClientsActRecStore = useDashboardClientsActRecStore("");

// State
const clients = ref();
const priceTypes = ref();
const tradeDirections = ref();

const clientsParams = ref({
  page: 1,
  page_size: 10,
  search: null,
  order_by: {
    field: "created_date",
    is_asc: true,
  },
  filter: [
    {
      field: "is_active",
      value: ["true"],
    },
  ],
  agent: [],
  client_category: [],
  day: [],
  device: [],
  expeditor: [],
  price_type: [],
  territory: [],
});

const priceTypeParams = ref({
  page: 1,
  page_size: 10,
  search: null,
  order_by: {
    field: "created_date",
    is_asc: true,
  },
  filter: [
    {
      field: "is_active",
      value: ["true"],
    },
  ],
});

const tradeDirectionsParams = ref({
  page: 1,
  page_size: 10,
  search: null,
  order_by: {
    field: "created_date",
    is_asc: true,
  },
  filter: [
    {
      field: "is_active",
      value: ["true"],
    },
  ],
});

const form = reactive({
  from: moment().format("YYYY-MM-DD"),
  to: moment().format("YYYY-MM-DD"),
  currency_id: "",
  client_id: "",
  trade_direction_id: "",
});

const filterStates = ref([
  {
    name: "Клиент",
    key: "clients",
    type: "dropdown",
    require: true,
    formKey: "client_id",
    get data() {
      return clients.value || [];
    },
    get getSelectedData() {
      return form.client_id;
    },
    set setSelectedData(value) {
      form.client_id = value;
    },
    onLoadElse: async () => {
      await onLoadElseClients();
    },
  },
  {
    name: "Выберите дату",
    key: "date",
    type: "date",
    require: true,

    data: form.payment_date,
    get getSelectedData() {
      return form.payment_date;
    },
    set setSelectedData(value) {
      form.payment_date = value;
    },
  },
  {
    name: "Тип оплаты",
    key: "priceTypes",
    type: "dropdown",
    require: true,
    formKey: "currency_id",
    get data() {
      return priceTypes.value || [];
    },
    get getSelectedData() {
      return form.currency_id;
    },
    set setSelectedData(value) {
      form.currency_id = value;
    },
    onLoadElse: async () => {
      await onLoadElsePriceTypes();
    },
  },
  {
    name: "Направление торговли",
    key: "tradeDirections",
    type: "dropdown",
    formKey: "trade_direction_id",
    get data() {
      return tradeDirections.value || [];
    },
    get getSelectedData() {
      return form.trade_direction_id;
    },
    set setSelectedData(value) {
      form.trade_direction_id = value;
    },
    onLoadElse: async () => {
      await onLoadElseTradeDirections();
    },
  },
]);

// Methods
const clearFilter = () => {
  form.from = moment().format("YYYY-MM-DD");
  form.to = moment().format("YYYY-MM-DD");
  form.currency_id = "";
  form.client_id = "";
  form.trade_direction_id = "";
};

const getSelectedItemName = (state, selectedItemId) => {
  if (state && selectedItemId) {
    let item = state.items.find((item) => item.id === selectedItemId);
    return (
      item?.name || item?.first_name || item?.last_name || item?.middle_name || "---"
    );
  }
};

const onOpenDropdown = async (value, type) => {
  if (type === "clients" && !clients.value) {
    await getClients();
  }
  if (type === "priceTypes" && !priceTypes.value) {
    await getPriceTypes();
  }
  if (type === "tradeDirections" && !tradeDirections.value) {
    await getTradeDirections();
  }
};

const getClients = async () => {
  clients.value = await dashboardClientsActRecStore.getClients(clientsParams.value);
};

const onLoadElseClients = async () => {
  clientsParams.value.page_size += 10;
  await getClients();
};

const getPriceTypes = async () => {
  priceTypes.value = await dashboardClientsActRecStore.getPriceTypes(
    priceTypeParams.value
  );
};

const onLoadElsePriceTypes = async () => {
  priceTypeParams.value.page_size += 10;
  await getPriceTypes();
};

const getTradeDirections = async () => {
  tradeDirections.value = await dashboardClientsActRecStore.getTradeDirections(
    tradeDirectionsParams.value
  );
};

const onLoadElseTradeDirections = async () => {
  tradeDirectionsParams.value.page_size += 10;
  await getTradeDirections();
};

const save = async (e) => {
  e.preventDefault();
  if (!form.client_id) {
    notify({ title: "Выберите клиент!", type: "error" });
    return;
  }
  if (!form.currency_id) {
    notify({ title: "Выберите тип оплаты!", type: "error" });
    return;
  }
  notify({ title: "Пожалуйста подождите!" });
  // await dashboardClientsActRecStore.add(form);
  console.log(form);
  notify({ title: "Сохранено!" });
};
</script>

<style scoped>
::-webkit-scrollbar {
  width: 12px;
}

::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5);
}
</style>
