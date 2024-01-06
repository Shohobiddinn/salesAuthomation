<template>
  <div>
    <div class="flex justify-between mt-7">
      <button @click="$router.go(-1)"
        class="h-11 w-40 flex justify-center items-center bg-[#FFFFFF] text-black rounded-lg border">
        <div class="flex">
          <IconArrowLeft class="mt-[5px] mr-2.5"></IconArrowLeft>
          Назад
          <slot></slot>
        </div>
      </button>
      <m-btn class="w-40" @click="save">Добавить</m-btn>
    </div>
    <div class="flex flex-col my-6.5 bg-white rounded-lg">
      <div class="flex flex-col p-12.5 gap-10">
        <p-title> Добавить оплату </p-title>
        <div class="flex justify-between">
          <div class="flex gap-6">
            <PageTitle20 :title="'О клиенте'" />
          </div>
          <div class="flex flex-col w-[60%]">
            <div v-for="item in dropdownHeader" :key="item.key" class="mt-5">
              <i-title>{{ item.name }}<span v-if="item.require" class="text-red-3 fs-16">*</span></i-title>
              <menu-btn v-if="item?.type === 'dropdown'" class="w-full" @click="onOpenDropdown($event, item.key)">
                <template #btn>
                  <m-btn-outlined class="border-grey flex items-center bg-lotion w-full gap-2 h-11">
                    <fa-icon hash="&#xf078;" />
                    <div>
                      {{ form[item.formKey] ? getSelectedItemName(item?.data, item?.getSelectedData)
                        : "Выбрать" }}
                    </div>
                  </m-btn-outlined>
                </template>
                <template #content>
                  <flex-col class="gap-2 max-h-88 overflow-auto pr-2">
                    <search-input v-if="item?.type === 'dropdown' && item.key !== 'cashBoxs'"
                      @change="search($event, item.key)" />
                    <FilterItems :data="item?.data" :selectedItems="item.getSelectedData"
                      :singleSelect="item.isSingleSelect" @onSelectItems="item.setSelectedData = $event"
                      @onSingleItemSelect="item.setSelectedData = $event" @onLoadElse="item?.onLoadElse" />
                  </flex-col>
                </template>
              </menu-btn>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div>
          <div class="h-[1px] bg-[#E1E4E4]"></div>
          <div class="flex flex-col p-12.5 gap-10">
            <div class="flex justify-between">
              <div class="flex gap-6">
                <PageTitle20 :title="'Оплата'" />
              </div>
              <div class="flex flex-col gap-6 w-[60%]">
                <div v-for="item in dropdownPayment" :key="item.key" class="mt-5">
                  <i-title>{{ item.name }} <span v-if="item.require" class="text-red-3 fs-16">*</span></i-title>
                  <menu-btn v-if="item?.type === 'dropdown'" class="w-full" @click="onOpenDropdown($event, item.key)">
                    <template #btn>
                      <m-btn-outlined class="border-grey flex items-center bg-lotion w-full gap-2 h-11">
                        <fa-icon hash="&#xf078;" />
                        <div>
                          {{ form[item.formKey] ? getSelectedItemName(item?.data, item?.getSelectedData)
                            : "Выбрать" }}
                        </div>
                      </m-btn-outlined>
                    </template>
                    <template #content>
                      <flex-col class="gap-2 max-h-88 overflow-auto pr-2">
                        <search-input v-if="item?.type === 'dropdown' && item.key !== 'cashBoxs'"
                          @change="search($event, item.key)" />
                        <FilterItems :data="item?.data" :selectedItems="item.getSelectedData"
                          :singleSelect="item.isSingleSelect" @onSelectItems="item.setSelectedData = $event"
                          @onSingleItemSelect="item.setSelectedData = $event" @onLoadElse="item?.onLoadElse" />
                      </flex-col>
                    </template>
                  </menu-btn>

                  <div v-if="item?.type === 'amount'" class="flex flex-col w-full gap-2.5">
                    <DInput :form="true" :type="'number'" :value="form.payment_amount"
                      @change="form.payment_amount = $event" />
                  </div>

                  <div v-if="item?.type === 'date'" class="flex flex-col w-full gap-2.5">
                    <DInputDatePicker class="h-11" @change="newDate => form.payment_date = newDate" withoutTime />
                  </div>
                  <div v-if="item?.type === 'comment'" class="flex flex-col w-full gap-2.5">
                    <textarea v-model="form.description" placeholder="Добавить комментарии" type="text"
                      class="rounded-lg border h-[100px] p-2 w-full outline-none h-40" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import moment from "moment";
import { notify } from "@kyvg/vue3-notification";

// Store
const initialBalanceClientsStore = useClientsInitialBalanceStore("");

// State 
const router = useRouter();
const agents = ref({ items: null });
const clients = ref();
const priceTypes = ref();
const expeditors = ref();
const tradeDirections = ref();
const remainders = ref({ items: null });
const cashBoxs = ref({ items: null });

const agentsParams = ref({
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

const expeditorsParams = ref({
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

const form = ref({
  payment_date: moment().format("YYYY-MM-DDTHH:MM"),
  payment_amount: null,
  currency_id: "",
  cash_box_id: "",
  payment_courier_id: "",
  client_id: "",
  agent_id: "",
  description: "",
  trade_direction_id: "",
  type: null,
});

const dropdownHeader = ref([
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
])

const dropdownPayment = ref([
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
    name: "Даты оплаты",
    key: "day",
    type: "date",
    require: true,

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
    name: "Тип остатка",
    key: "remainders",
    type: "dropdown",
    require: true,

    formKey: "type",
    get data() {
      return remainders.value || [];
    },
    get getSelectedData() {
      return form.value.type;
    },
    set setSelectedData(value) {
      form.value.type = value;
    },
    onLoadElse: async () => {
      await onLoadElseRemainders();
    },
    isSingleSelect: true,
  },
  {
    name: "Сумма",
    key: "amount",
    type: "amount",
    require: true,
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
    data: form.value.description,
    get getSelectedData() {
      return form.value.description;
    },
    set setSelectedData(value) {
      form.value.description = value;
    },
    isSingleSelect: true,
  },
])


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
  if (type === "remainders" && !remainders.value.items) {
    await getRemainders();
  }
  if (type === "tradeDirections" && !tradeDirections.value) {
    await getTradeDirections();
  }
};

const getAgents = async () => {
  agents.value = await initialBalanceClientsStore.getAgents(agentsParams.value);
};

const onLoadElseAgents = async () => {
  agentsParams.value.page_size += 10;
  await getAgents();
};

const getClients = async () => {
  clients.value = await initialBalanceClientsStore.getClients(
    clientsParams.value
  );
};

const onLoadElseClients = async () => {
  clientsParams.value.page_size += 10;
  await getClients();
};

const getPriceTypes = async () => {
  priceTypes.value = await initialBalanceClientsStore.getPriceTypes(
    priceTypeParams.value
  );
};

const onLoadElsePriceTypes = async () => {
  priceTypeParams.value.page_size += 10;
  await getPriceTypes();
};

const getExpeditors = async () => {
  expeditors.value = await initialBalanceClientsStore.getExpeditors(
    expeditorsParams.value
  );
};

const onLoadElseExpeditors = async () => {
  expeditorsParams.value.page_size += 10;
  await getExpeditors();
};

const getTradeDirections = async () => {
  tradeDirections.value = await initialBalanceClientsStore.getTradeDirections(
    tradeDirectionsParams.value
  );
};

const onLoadElseTradeDirections = async () => {
  tradeDirectionsParams.value.page_size += 10;
  await getTradeDirections();
};

const getCashboxes = async () => {
  cashBoxs.value.items = await initialBalanceClientsStore.getCashboxes();
};

const getRemainders = async () => {
  remainders.value.items = await initialBalanceClientsStore.getRemainders();
};

const onLoadElseRemainders = async () => {
  await getRemainders();
};

const save = async (e) => {
  e.preventDefault();
  if (!form.value.client_id) {
    notify({ title: "Выберите клиент!", type: "error" });
    return;
  }
  if (!form.value.agent_id) {
    notify({ title: "Выберите aгент!", type: "error" });
    return;
  }
  if (!form.value.currency_id) {
    notify({ title: "Выберите тип оплаты!", type: "error" });
    return;
  }
  if (!form.value.type) {
    notify({ title: "Введите тип остатка!", type: "error" });
    return;
  }
  if (!form.value.payment_amount) {
    notify({ title: "Введите сумма!", type: "error" });
    return;
  }
  notify({ title: "Пожалуйста подождите!" });
  await initialBalanceClientsStore.add(form.value);
  notify({ title: "Сохранено!" });
  router.push('/dashboard/initial-balance-clients')
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
