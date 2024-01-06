<template>
  <div v-if="!loading" class="w-full relative">
    <div class="grid grid-cols-2 gap-4">
      <div v-for="s in filterStates" :key="s">
        <div v-for="cols in s" :key="cols.key" class="mt-5">
          <i-title>{{ cols.name }}
            <span v-if="cols.require" class="text-red-3 fs-16">*</span></i-title>
          <menu-btn v-if="cols.type === 'dropdown'" :disabled="cols?.key === 'clients'" class="w-full"
            @click="onOpenDropdown($event, cols.key)">
            <template #btn>
              <m-btn-outlined class="border-grey flex items-center bg-lotion w-full gap-2 h-11">
                <fa-icon hash="&#xf078;" />
                <div>
                  {{ form[cols?.formKey] ? getSelectedItemName(cols?.data, cols?.getSelectedData)
                    : "Выбрать" }}
                </div>
              </m-btn-outlined>
            </template>
            <template #content>
              <flex-col class="gap-2 max-h-88 overflow-auto pr-2">
                <search-input v-if="cols.type === 'dropdown' && cols.key !== 'cashBoxs'"
                  @change="search($event, cols.key)" />
                <FilterItems :data="cols?.data" :selectedItems="cols.getSelectedData" :singleSelect="cols.isSingleSelect"
                  @onSelectItems="cols.setSelectedData = $event" @onSingleItemSelect="cols.setSelectedData = $event"
                  @onLoadElse="cols?.onLoadElse" />
              </flex-col>
            </template>
          </menu-btn>
          <div v-if="cols.type === 'date'" class="flex flex-col w-full gap-2.5 mb-4" disabled>
            <DInputDatePicker disabled class="h-11" @change="newDate => form.payment_date = newDate" withoutTime />
          </div>
          <div v-if="cols.type === 'amount'" class="flex flex-col w-full gap-2.5 mb-4">
            <DInput :form="true" :type="'number'" :value="form.payment_amount" @change="form.payment_amount = $event" />
          </div>
          <div v-if="cols.type === 'comment'" class="flex flex-col w-full gap-2.5">
            <textarea v-model="form.description" placeholder="Добавить комментарии" :type="'text'"
              class="rounded-lg border h-[136px] p-2 w-full outline-none my-input" />
          </div>
        </div>
      </div>
    </div>
    <div class="flex justify-between">
      <div></div>
      <div class="flex pt-4 mb-[-20px]">
        <button class="bg-[#EFF3F3] py-[10px] px-3 rounded-lg mr-4" @click.prevent="deleteItem(detail.id)">
          <IconTrash />
        </button>
        <m-btn @click="save">
          <div class="flex">
            <IconEditb :color="true" class="mr-3" />
            <div>Cохранять</div>
          </div>
        </m-btn>
      </div>
    </div>
  </div>
  <div v-else class="flex items-center justify-center ms-auto me-auto">
    <IconLoading :loading="true" :width="14" :height="14" />
  </div>
</template>

<script setup>
import moment from "moment";
import { notify } from "@kyvg/vue3-notification";
const emit = defineEmits(["closeModal"]);

// Store
const clientsInitialBalanceStore = useClientsInitialBalanceStore("");

// State
const detail = ref(clientsInitialBalanceStore.detail)
const agents = ref({ items: null });
const clients = ref();
const priceTypes = ref();
const expeditors = ref();
const tradeDirections = ref();
const cashBoxs = ref({ items: null });
const loading = ref(true)

const agentsParams = ref({
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

const clientsParams = ref({
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

const expeditorsParams = ref({
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

const form = ref({
  id: "",
  payment_date: moment().format("YYYY-MM-DDTHH:MM"),
  payment_amount: null,
  currency_id: "",
  cash_box_id: "",
  payment_courier_id: "",
  client_id: "",
  agent_id: "",
  trade_direction_id: "",
  description: "",
  type: null,
});

const filterStates = ref({
  firstRow: [
    {
      name: "Клиент",
      key: "clients",
      type: "dropdown",
      formKey: "client_id",
      require: true,

      get data() {
        return clients.value || [];
      },
      get getSelectedData() {
        return form.value.client_id;
      },
      set setSelectedData(value) {
        form.value.client_id = value;
      },
      onLoadElse: async () => {
        await onLoadElseClients();
      },
      isSingleSelect: true,
    },
    {
      name: "Агент",
      key: "agents",
      type: "dropdown",
      require: true,

      formKey: "agent_id",
      get data() {
        return agents.value || [];
      },
      get getSelectedData() {
        return form.value.agent_id;
      },
      set setSelectedData(value) {
        form.value.agent_id = value;
      },
      onLoadElse: async () => {
        await onLoadElseAgents();
      },
      isSingleSelect: true,
    },
    {
      name: "Экспедитор",
      key: "expeditors",
      type: "dropdown",
      formKey: "payment_courier_id",
      get data() {
        return expeditors.value || [];
      },
      get getSelectedData() {
        return form.value.payment_courier_id;
      },
      set setSelectedData(value) {
        form.value.payment_courier_id = value;
      },
      onLoadElse: async () => {
        await onLoadElseExpeditors();
      },
      isSingleSelect: true,
    },
    {
      name: "Тип оплаты",
      key: "priceTypes",
      type: "dropdown",
      formKey: "currency_id",
      get data() {
        return priceTypes.value || [];
      },
      get getSelectedData() {
        return form.value.currency_id;
      },
      set setSelectedData(value) {
        form.value.currency_id = value;
      },
      onLoadElse: async () => {
        await onLoadElsePriceTypes();
      },
      isSingleSelect: true,
    },
    {
      name: "Касса",
      key: "cashBoxs",
      type: "dropdown",
      formKey: "cash_box_id",
      get data() {
        return cashBoxs.value || [];
      },
      get getSelectedData() {
        return form.value.cash_box_id;
      },
      set setSelectedData(value) {
        form.value.cash_box_id = value;
      },
      isSingleSelect: true,
    },
  ],
  secondRow: [
    {
      name: "Направление торговли",
      key: "tradeDirections",
      type: "dropdown",
      formKey: "trade_direction_id",
      get data() {
        return tradeDirections.value || [];
      },
      get getSelectedData() {
        return form.value.trade_direction_id;
      },
      set setSelectedData(value) {
        form.value.trade_direction_id = value;
      },
      onLoadElse: async () => {
        await onLoadElseTradeDirections();
      },
      isSingleSelect: true,
    },
    {
      name: "Даты оплаты",
      key: "day",
      type: "date",
      require: true,
      formKey: "payment_date",
      data: form.value.payment_date,
      get getSelectedData() {
        return form.value.payment_date;
      },
      set setSelectedData(value) {
        form.value.payment_date = value;
      },
      isSingleSelect: true,
    },
    {

      name: "Сумма",
      key: "amount",
      require: true,
      formKey: "payment_amount",

      type: "amount",
      data: form.value.payment_amount,
      get getSelectedData() {
        return form.value.payment_amount;
      },
      set setSelectedData(value) {
        form.value.payment_amount = value;
      },
      isSingleSelect: true,
    },
    {
      name: "Комментарии",
      key: "comment",
      type: "comment",
      formKey: "description",
      data: form.value.description,
      get getSelectedData() {
        return form.value.description;
      },
      set setSelectedData(value) {
        form.value.description = value;
      },
      isSingleSelect: true,
    },
  ],
});

// Methods
const getSelectedItemName = (state, selectedItemId) => {
  if (state && selectedItemId) {
    let item = state.items.find((item) => item.id === selectedItemId);
    return item?.name ||
      item?.first_name ||
      item?.last_name ||
      item?.middle_name ||
      "---"
  }
};

const onOpenDropdown = async (value, type) => {
  if (type === "agents" && !agents.value.items) {
    await getAgents();
  }
  if (type === "clients" && !clients.value) {
    await getClients();
  }
  if (type === "priceTypes" && !priceTypes.value) {
    await getPriceTypes();
  }
  if (type === "expeditors" && !expeditors.value) {
    await getExpeditors();
  }
  if (type === "cashBoxs" && !cashBoxs.value.items) {
    await getCashboxes();
  }
  if (type === "tradeDirections" && !tradeDirections.value) {
    await getTradeDirections();
  }
};

const search = async (state, value) => {
  if (state === "clients") {
    clientsParams.value.search = value;
    await getClients();
    return;
  };

  if (state === "agents") {
    agentsParams.value.search = value;
    await getAgents();
    return;
  };

  if (state === "expeditors") {
    expeditorsParams.value.search = value;
    await getExpeditors();
    return;
  };

  if (state === "priceTypes") {
    priceTypeParams.value.search = value;
    await getPriceTypes();
    return;
  };

  if (state === "tradeDirections") {
    tradeDirectionsParams.value.search = value;
    await getTradeDirections();
    return;
  };

};

const getAgents = async () => {
  agents.value = await clientsInitialBalanceStore.getAgents(agentsParams.value);
  console.log(agents.value);
};

const onLoadElseAgents = async () => {
  agentsParams.value.page_size += 10;
  await getAgents();
};

const getClients = async () => {
  clients.value = await clientsInitialBalanceStore.getClients(
    clientsParams.value
  );
};

const onLoadElseClients = async () => {
  clientsParams.value.page_size += 10;
  await getClients();
};

const getPriceTypes = async () => {
  priceTypes.value = await clientsInitialBalanceStore.getPriceTypes(
    priceTypeParams.value
  );
};

const onLoadElsePriceTypes = async () => {
  priceTypeParams.value.page_size += 10;
  await getPriceTypes();
};

const getExpeditors = async () => {
  expeditors.value = await clientsInitialBalanceStore.getExpeditors(
    expeditorsParams.value
  );
};

const onLoadElseExpeditors = async () => {
  expeditorsParams.value.page_size += 10;
  await getExpeditors();
};

const getCashboxes = async () => {
  cashBoxs.value.items = await clientsInitialBalanceStore.getCashboxes();
};

const getTradeDirections = async () => {
  tradeDirections.value = await clientsInitialBalanceStore.getTradeDirections(
    tradeDirectionsParams.value
  );
};

const onLoadElseTradeDirections = async () => {
  tradeDirectionsParams.value.page_size += 10;
  await getTradeDirections();
};

const save = async (e) => {
  e.preventDefault();
  if (!form.value.client_id) {
    notify({ title: "Выберите клиент!", type: "error" });
    return;
  }
  if (!form.value.currency_id) {
    notify({ title: "Выберите тип оплаты!", type: "error" });
    return;
  }

  if (!form.value.payment_amount) {
    notify({ title: "Введите сумма!", type: "error" });
    return;
  }
  notify({ title: "Пожалуйста подождите!" });
  await clientsInitialBalanceStore.add(form.value)
  emit("closeModal");
};

const deleteItem = async (id) => {
  await clientsInitialBalanceStore.deleteItem(id);
  notify({ title: "Сохранено!" });
  emit("closeModal");
};

// Hooks
onMounted(async () => {
  if (detail.value) {
    await getAgents();
    await getClients();
    await getPriceTypes();
    await getCashboxes();
    await getExpeditors();
    await getTradeDirections();
    form.value.client_id = detail.value.client?.id
    form.value.agent_id = detail.value.agent?.id
    form.value.cash_box_id = detail.value.cash_box?.id
    form.value.payment_courier_id = detail.value.payment_courier?.id
    form.value.currency_id = detail.value.currency?.id
    form.value.description = detail.value.description
    form.value.payment_amount = detail.value.payment_amount
    form.value.id = detail.value.id
    form.value.type = detail.value.type?.id
    form.value.fact = detail.value.fact
    form.value.phone = detail.value.phone
    form.value.trade_direction_id = detail.value.trade_direction?.id
    form.value.payment_date = moment(detail.value.created_date).format("YYYY-MM-DDTHH:MM")
    loading.value = false
  } else {
    loading.value = false
    return
  };
});
</script>

<style scoped>
textarea {
  transition: border 200ms ease-out;
}

textarea:active {
  border-color: var(--primary-color);
}
</style>
