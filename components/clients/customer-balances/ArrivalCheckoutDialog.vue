<template>
  <div class="relative h-[800px]">
    <div>
      <div class="flex items-center gap-8">
        <div class="flex items-center gap-2">
          <div>
            <span class="text-gray-3 fs-14 fw-4"> Касса: </span>
          </div>
          <menu-btn class="h-11 w-[240px]">
            <template #btn>
              <m-btn-outlined
                class="border-grey flex items-center gap-2 w-full"
                @click="getCashboxes"
              >
                <fa-icon hash="&#xf078" />
                {{
                  selectedCashBoxId
                    ? getSelectedName("cashbox", selectedCashBoxId)
                    : "Выбрать"
                }}
              </m-btn-outlined>
            </template>
            <template #content>
              <div class="overflow-auto h-32">
                <FilterItems
                  :data="cashBoxes"
                  :singleSelect="true"
                  :selectedItems="selectedCashBoxId"
                  @onSingleItemSelect="onSelectCashboxId"
                />
              </div>
            </template>
          </menu-btn>
        </div>
        <div class="flex p-2 gap-3">
          <div class="mt-2">Даты оплаты *</div>
          <DInputDatePicker
            withoutTime
            @change="onChangeDate"
            class="w-[240px]"
          />
        </div>
      </div>
    </div>

    <div v-if="clientsData.length" class="w-full">
      <div class="rounded-lg border last:border-b-0">
        <div class="border-b border-[#E1E4E4] flex w-full">
          <div v-for="i in headers" :key="i" class="w-[180px]">
            <div class="p-2 w-full">
              {{ i.name }}
            </div>
          </div>
        </div>
        <div
          v-for="(client, index) in clientsData"
          :key="client.client_id"
          class="border-b border-[#E1E4E4] relative flex"
        >
          <div class="p-2 mt-2 w-[180px]">{{ client?.client_name }}</div>

          <div class="p-2 w-[180px]">
            <menu-btn v-if="clientsData[index]?.agent_id" class="h-11 w-full">
              <template #btn>
                <m-btn-outlined
                  class="border-grey flex items-center w-full justify-between"
                >
                  <div class="flex items-center gap-2">
                    <fa-icon hash="&#xf078" />
                    {{
                      clientsData[index].agent_id
                        ? getSelectedName("agent", clientsData[index].agent_id)
                        : "Выбрать"
                    }}
                  </div>
                </m-btn-outlined>
              </template>
              <template #content>
                <div class="overflow-auto">
                  <FilterItems
                    :data="getEmployedAgentsByClientId(client.client_id)"
                    :singleSelect="true"
                    :selectedItems="clientsData[index].agent_id"
                    @onSingleItemSelect="clientsData[index].agent_id = $event"
                  />
                </div>
              </template>
            </menu-btn>
            <nuxt-link
              v-else
              :to="{
                path: '/clients/group-process/unpin-agents/',
                query: { clientId: client.client_id },
              }"
              class="underline text-primary"
              >Добавить агента</nuxt-link
            >
          </div>
          <div class="p-2 w-[180px]">
            <menu-btn
              v-if="clientsData[index]?.payment_courier_id"
              class="h-11 w-full"
            >
              <template #btn>
                <div
                  class="cursor-pointer rounded-lg text-gray-3 py-1.5 px-1 border-grey flex items-center w-full justify-between hover:bg-gray-50 active:bg-gray-200"
                >
                  <div class="gap-2">
                    <fa-icon hash="&#xf078" />
                    {{
                      clientsData[index].payment_courier_id
                        ? getSelectedName(
                            "expeditor",
                            clientsData[index].payment_courier_id
                          )
                        : "Выбрать"
                    }}
                  </div>
                </div>
              </template>
              <template #content>
                <div class="overflow-auto">
                  <FilterItems
                    :data="getEmployedExpeditorsByClientId(client.client_id)"
                    :singleSelect="true"
                    :selectedItems="clientsData[index].payment_courier_id"
                    @onSingleItemSelect="
                      clientsData[index].payment_courier_id = $event
                    "
                  />
                </div>
              </template>
            </menu-btn>
            <nuxt-link
              v-else
              :to="{
                path: '/clients/group-process/unpin-expeditor/',
                query: { clientId: client.client_id },
              }"
              class="underline text-primary"
              >Добавить экспедитора</nuxt-link
            >
          </div>
          <div v-for="i in headers" :key="i">
            <div v-if="i?.key === 'currency'" class="p-2 w-[180px]">
              <d-input
                placeholder="Введите сумма"
                class="w-full"
                :type="'number'"
                @change="onAddCurrency(clientsData[index], i?.id, $event)"
              />
            </div>
          </div>
          <div class="p-2 w-[180px]">
            <d-input
              placeholder="Введите"
              type="text"
              class="w-full"
              @change="onAddDescription(clientsData[index].client_id, $event)"
            />
          </div>
        </div>
        <div class="flex w-full fixed gap-18">
          <div class="flex ml-2 flex gap-2 w-2/3">
            <div
              v-for="currency in currencies?.items"
              :key="currency.id"
              class="mt-2"
              :class="`w-1/${currencies.items.length}`"
            >
              <div class="text-[#8FA0A0] fs-12 whitespace-nowrap">
                {{ currency?.name }}
              </div>
              <div class="fs-14 fw-6 ml-2">
                {{ getSumOfCurrencyById(currency.id) }}
              </div>
            </div>
          </div>
          <div class="flex p-2 mt-3">
            <m-btn @click="onSave">Сохранить</m-btn>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="w-full flex items-center justify-center">
      <icon-loading :loading="true" :width="14" :height="14" />
    </div>
  </div>
</template>

<script setup>
import { notify } from "@kyvg/vue3-notification";
import moment from "moment";

// store
const clientsBalancesStore = useClientsBalancesStore("main");

// emits
const emit = defineEmits(["closeDialog"]);

//state
const group = ref([
  {
    name: "Клиент",
  },
  {
    name: "Агент",
  },
  {
    name: "Экспедитор",
  },
]);
const cashBoxes = ref({
  items: [],
});
const selectedCashBoxId = ref(null);
const selectedDate = ref(moment().format("YYYY-MM-DD"));
const agents = ref(null);
const clientsEmployedAgents = ref(null);
const expeditors = ref(null);
const clientsEmployedExpeditors = ref(null);
const clientsData = ref([]);
const currencies = ref(null);
const methodData = ref([]);

const agentsParams = ref({
  page: 1,
  page_size: 100,
  search: null,
  order_by: {
    field: "created_date",
    is_asc: true,
  },
});

const currenciesParams = ref({
  page: 1,
  page_size: 10,
  search: null,
  order_by: {
    field: "created_date",
    is_asc: true,
  },
});

// methods
const headers = computed(() => {
  if (currencies.value) {
    return [
      ...group.value,
      ...currencies.value?.items.map((currency) => ({
        ...currency,
        key: "currency",
      })),
      {
        name: "Комментарии",
      },
    ];
  }
  return group.value;
});

onMounted(async () => {
  currencies.value = await clientsBalancesStore.getCurrencies(
    currenciesParams.value
  );
  [agents.value, clientsEmployedAgents.value] = await Promise.all([
    clientsBalancesStore.getAgents(agentsParams.value),
    clientsBalancesStore.getEmployedAgents(),
  ]);
  [expeditors.value, clientsEmployedExpeditors.value] = await Promise.all([
    clientsBalancesStore.getExpeditors(agentsParams.value),
    clientsBalancesStore.getEmployedExpeditors(),
  ]);
  setClietnsData();
});

const getCashboxes = async () => {
  if (!cashBoxes.value.items.length) {
    cashBoxes.value.items = await clientsBalancesStore.getCashboxes();
  }
};

const getSelectedName = (state, selectedId) => {
  if (state === "cashbox" && cashBoxes.value) {
    return cashBoxes.value.items?.find((cashBox) => cashBox.id === selectedId)
      ?.name;
  }
  if (state === "agent" && agents.value) {
    const selectedAgent = agents.value.items?.find(
      (agent) => agent.id === selectedId
    );
    return (
      selectedAgent?.first_name ||
      selectedAgent?.last_name ||
      selectedAgent?.middle_name
    );
  }
  if (state === "expeditor" && expeditors.value) {
    const selectedExpeditor = expeditors.value.items?.find(
      (agent) => agent.id === selectedId
    );
    return (
      selectedExpeditor?.first_name ||
      selectedExpeditor?.last_name ||
      selectedExpeditor?.middle_name
    );
  }
  return "";
};

const getEmployedAgentsByClientId = (clientId) => {
  if (clientId && agents.value) {
    return {
      items: clientsEmployedAgents.value
        ?.find((client) => client.client_id === clientId)
        ?.employees.map((employee) =>
          agents.value.items?.find((agent) => agent.id === employee.employee_id)
        ),
    };
  }
  return [];
};

const getEmployedExpeditorsByClientId = (clientId) => {
  if (clientId && expeditors.value) {
    return {
      items: clientsEmployedExpeditors.value
        ?.find((client) => client.client_id === clientId)
        ?.employees.map((employee) =>
          expeditors.value.items?.find(
            (expeditor) => expeditor.id === employee.employee_id
          )
        ),
    };
  }
  return [];
};

const setClietnsData = () => {
  if (clientsEmployedAgents.value && clientsEmployedExpeditors.value) {
    for (const clientId of clientsBalancesStore.clientsIds) {
      const clientEmployedAgents = clientsEmployedAgents.value.find(
        (agent) => agent.client_id === clientId
      );

      const clientEmployedExpeditors = clientsEmployedExpeditors.value.find(
        (expeditor) => expeditor.client_id === clientId
      );

      clientsData.value.push({
        client_id: clientId,
        client_name: clientEmployedAgents?.client_name,
        agent_id: clientEmployedAgents?.employees?.length
          ? clientEmployedAgents.employees[0].employee_id
          : "",
        payment_courier_id: clientEmployedExpeditors?.employees?.length
          ? clientEmployedExpeditors.employees[0].employee_id
          : "",
      });
    }
  }
};

const onSelectCashboxId = (cashboxId) => {
  selectedCashBoxId.value = cashboxId;
  for (const data of methodData.value) {
    data.cash_box_id = cashboxId;
  }
};

const onChangeDate = (date) => {
  selectedDate.value = date;
  for (const data of methodData.value) {
    data.payment_received_date = date;
  }
};

const onAddDescription = (clientId, value) => {
  const clientData = methodData.value.find(
    (data) => data.client_id === clientId
  );
  if (clientData) {
    clientData.description = value;
  }
};

const getSumOfCurrencyById = (currencyId) => {
  let initial = 0;
  const sum = methodData.value
    .filter((data) => data.currency_id === currencyId)
    ?.reduce((accumulator, data) => accumulator + data.payment_amount, initial);
  return sum;
};

const onAddCurrency = (clientData, currencyId, value) => {
  const isAlreadyExist = methodData.value.find(
    (data) =>
      data?.client_id === clientData.client_id &&
      data?.currency_id === currencyId
  );
  if (!isAlreadyExist) {
    methodData.value.push({
      ...clientData,
      payment_received_date: selectedDate.value,
      currency_id: currencyId,
      cash_box_id: selectedCashBoxId.value,
      payment_amount: value,
    });
  } else {
    isAlreadyExist.payment_amount = value;
  }
};

const onSave = async () => {
  if (!selectedCashBoxId.value) {
    notify({ title: "Сначала выберите кассу!", type: "error" });
    return;
  }
  await clientsBalancesStore.onCreatePaymentList(methodData.value);
  emit("closeDialog");
};
</script>

<style scoped>
.date-picker input {
  width: 100%;
  padding-left: 45px;
  position: relative;
}
.date-picker input[type="date"]::-webkit-calendar-picker-indicator {
  position: absolute;
  color: rgba(0, 0, 0, 0);
  opacity: 1;
  display: block;
  background: url(~/assets/svg/date-pickerscg.svg) no-repeat;
  width: 20px;
  height: 20px;
  left: 10px;
  border-width: thin;
  top: 12px;
}
::-webkit-scrollbar {
  width: 8px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
}
::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5);
}
</style>
