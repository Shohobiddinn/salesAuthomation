<template>
  <rounded-white-container class="gap-4 p-6">
    <flex-row class="items-center justify-between gap-4">
      <div>
        <span class="text-gray-3 text-[20px] fw-6"> Фильтр </span>
      </div>
    </flex-row>
    <div class="grid grid-cols-3 gap-5 mt-4" v-for="s in filterStates" :key="s">
      <div v-for="cols in s" :key="cols.key">
        <i-title>{{ cols.name }}</i-title>
        <menu-btn
          v-if="cols.key !== 'btn' && cols.key !== 'dates'"
          class="w-full"
          @click="onOpenDropdown($event, cols.key)"
        >
          <template #btn>
            <m-btn-outlined
              class="border-grey flex items-center bg-lotion w-full gap-2 h-11"
            >
              <div class="w-full flex items-center justify-between">
                <div class="flex gap-2">
                  <fa-icon hash="&#xf078" />
                  <div>
                    {{
                      cols.isSingleSelect
                        ? getSingleSelectedName(cols.data, cols.getSelectedData)
                        : "Выбрать"
                    }}
                  </div>
                </div>
                <div
                  v-if="!cols.isSingleSelect && cols.data?.total_count"
                  class="ml-1"
                >
                  {{ cols.getSelectedData?.length }} из
                  {{ cols.data?.total_count }}
                </div>
              </div>
            </m-btn-outlined>
          </template>
          <template #content>
            <flex-col class="gap-2 max-h-88 overflow-auto pr-2">
              <search-input
                v-if="!cols.isSingleSelect && cols.key !== 'days'"
                @change="search($event, cols.key)"
              />
              <FilterItems
                :data="cols?.data"
                :selectedItems="cols.getSelectedData"
                :singleSelect="cols.isSingleSelect"
                @onSelectItems="cols.setSelectedData = $event"
                @onSingleItemSelect="cols.setSelectedData = $event"
                @onLoadElse="cols?.onLoadElse"
              />
            </flex-col>
          </template>
        </menu-btn>
        <flex-row v-if="cols.key === 'dates'" class="mt-2 w-full">
          <div class="border-1 rounded-lg grid grid-cols-2 w-full">
            <DInputDatePicker :value="dateTimeFrom" withoutTime borderless class="border-r-1 w-full" @change="(newVal) => dateTimeFrom = newVal"/>
            <DInputDatePicker :value="dateTimeTo" withoutTime borderless class="w-full" @change="(newVal) => dateTimeTo = newVal"/>
          </div>
        </flex-row>
        <flex-row v-if="cols.key === 'btn'" class="items-end gap-2">
          <m-btn @click="onSetFilters" class="w-full h-11 mt-4">
            Применить
          </m-btn>
          <sm-btn class="px-4 py-3">
            <IconReloadSVG />
          </sm-btn>
        </flex-row>
      </div>
    </div>
  </rounded-white-container>
</template>

<script setup>
import moment from "moment";

// Store
const clientsBalancesStore = useClientsBalancesStore("main");

// states
const agents = ref(null);
const selectedAgents = ref([]);
const expeditors = ref(null);
const selectedExpeditors = ref([]);
const territories = ref(null);
const selectedTerritories = ref([]);
const clientCategories = ref(null);
const selectedClientCategories = ref([]);
const statuses = ref({
  items: [
    {
      name: "Активный",
      id: true,
    },
    {
      name: "Не активный",
      id: false,
    },
  ],
});
const selectedStatus = ref(true);
const tradeDirections = ref(null);
const selectedTradeDirections = ref([]);
const dateTimeFrom = ref(moment().format("YYYY-MM-DD"))
const dateTimeTo = ref(moment().format("YYYY-MM-DD"))
const totalBalance = ref({
  items: [
    {
      name: "Долг",
      id: 1,
    },
    {
      name: "Предоплата",
      id: 2,
    },
    {
      name: "Ноль",
      id: 3,
    }
  ],
  total_count: 3
});
const selectedtotalBalance = ref([]);

const agentsParams = ref({
  page: 1,
  page_size: 10,
  order_by: {
    field: "created_date",
    is_asc: true,
  },
  filter: [
    {
      field: 'is_active',
      value: ['true']
    }
  ]
});

const clientCategoryParams = ref({
  page: 1,
  page_size: 10,
  search: null,
  order_by: {
    field: "created_date",
    is_asc: true,
  },
  filter: [
    {
      field: 'is_active',
      value: ['true']
    }
  ]
});

const territoryParams = ref({
  page: 1,
  page_size: 10,
  search: null,
  order_by: {
    field: "created_date",
    is_asc: true,
  },
  filter: [
    {
      field: 'is_active',
      value: ['true']
    }
  ]
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
      field: 'is_active',
      value: ['true']
    }
  ]
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
      field: 'is_active',
      value: ['true']
    }
  ]
});

const filterStates = ref({
  firstRow: [
    {
      name: "Агенты",
      key: "agents",
      get data() {
        return agents.value || [];
      },
      get getSelectedData() {
        return selectedAgents.value;
      },
      set setSelectedData(value) {
        selectedAgents.value = value;
      },
      onLoadElse: async () => {
        await onLoadElseAgents();
      },
    },
    {
      name: "Экспедитор",
      key: "expeditors",
      get data() {
        return expeditors.value || [];
      },
      get getSelectedData() {
        return selectedExpeditors.value;
      },
      set setSelectedData(value) {
        selectedExpeditors.value = value;
      },
      onLoadElse: async () => {
        await onLoadElseExpeditors();
      },
    },
    {
      name: "Территории",
      key: "territories",
      get data() {
        return territories.value || [];
      },
      get getSelectedData() {
        return selectedTerritories.value;
      },
      set setSelectedData(value) {
        selectedTerritories.value = value;
      },
      onLoadElse: async () => {
        await onLoadElseTerritories();
      },
    }
  ],
  secondRow: [
    {
      name: "Категория клиента",
      key: "clientCategories",
      get data() {
        return clientCategories.value || [];
      },
      get getSelectedData() {
        return selectedClientCategories.value;
      },
      set setSelectedData(value) {
        selectedClientCategories.value = value;
      },
      onLoadElse: async () => {
        await onLoadElseClientCategories();
      },
    },
    {
      name: "Статус",
      key: "status",
      data: statuses.value,
      get getSelectedData() {
        return selectedStatus.value;
      },
      set setSelectedData(value) {
        selectedStatus.value = value;
      },
      isSingleSelect: true,
    },
    {
      name: "Направления торговли",
      key: "tradeDirections",
      get data() {
        return tradeDirections.value || [];
      },
      get getSelectedData() {
        return selectedTradeDirections.value;
      },
      set setSelectedData(value) {
        selectedTradeDirections.value = value;
      },
      onLoadElse: async () => {
        await onLoadElseTradeDirections();
      },
    },
  ],
  thirdRow: [
    {
      name: 'Даты',
      key: 'dates'
    },
    {
      name: "Общий баланс",
      key: "totalBalance",
      get data() {
        return totalBalance.value || [];
      },
      get getSelectedData() {
        return selectedtotalBalance.value;
      },
      set setSelectedData(value) {
        selectedtotalBalance.value = value;
      }
    },
    {
      key: 'btn'
    }
  ],
});

// methods
const onOpenDropdown = async (value, state) => {
  if (state === "agents" && !agents.value) {
    await getAgents();
    return;
  }
  if (state === "territories" && !territories.value) {
    await getTerritories();
    return;
  }
  if (state === "clientCategories" && !clientCategories.value) {
    await getClientCategories();
    return;
  }
  if (state === "tradeDirections" && !tradeDirections.value) {
    await getTradeDirections();
    return;
  }
  if (state === "expeditors" && !expeditors.value) {
    await getExpeditors();
    return;
  }
  return;
};

const search = async (value, state) => {
  if (state === "agent") {
    agentsParams.value.search = value;
    await getAgents();
    return;
  }
  if (state === "territories") {
    territories.value.search = value;
    await getTerritories();
    return;
  }
  if (state === "clientCategories") {
    clientCategoryParams.value.search = value;
    await getClientCategories();
    return;
  }
  if (state === "tradeDirections") {
    tradeDirectionsParams.value.search = value;
    await getTradeDirections();
    return;
  }
  if (state === "expeditors") {
    expeditorsParams.value.search = value;
    await getExpeditors();
    return;
  } else return;
};

const onSetFilters = () => {
  clientsBalancesStore.params.Agent = [...selectedAgents.value];
  clientsBalancesStore.params.Territory = [...selectedTerritories.value];
  clientsBalancesStore.params.ClientCategory = [...selectedClientCategories.value];
  clientsBalancesStore.params.TradeDirection = [...selectedTradeDirections.value];
  clientsBalancesStore.params.Expeditor = [...selectedExpeditors.value];
  clientsBalancesStore.params.Type = [...selectedtotalBalance.value];
  clientsBalancesStore.params.IsActive = selectedStatus.value;
};

const getAgents = async () => {
  agents.value = await clientsBalancesStore.getAgents(agentsParams.value);
};

const onLoadElseAgents = async () => {
  agentsParams.value.page_size += 10;
  await getAgents();
};

const getTerritories = async () => {
  territories.value = await clientsBalancesStore.getTerritories(territoryParams.value);
};

const onLoadElseTerritories = async () => {
  territoryParams.value.page_size += 10;
  await getTerritories();
};

const getClientCategories = async () => {
  clientCategories.value = await clientsBalancesStore.getClientCategories(
    clientCategoryParams.value
  );
};

const onLoadElseClientCategories = async () => {
  clientCategoryParams.value.page_size += 10;
  await getClientCategories();
};

const getExpeditors = async () => {
  expeditors.value = await clientsBalancesStore.getExpeditors(expeditorsParams.value);
};

const onLoadElseExpeditors = async () => {
  expeditorsParams.value.page_size += 10;
  await getExpeditors();
};

const getTradeDirections = async () => {
  tradeDirections.value = await clientsBalancesStore.getTradeDirections(tradeDirectionsParams.value);
};

const onLoadElseTradeDirections = async () => {
  tradeDirectionsParams.value.page_size += 10;
  await getTradeDirections();
};

const getSingleSelectedName = (data, value) => {
  return data?.items?.find((val) => val.id === value)?.name;
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
