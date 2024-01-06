<template>
  <rounded-white-container class="gap-4 p-6">
    <flex-row class="items-center justify-between gap-4">
      <div>
        <span class="text-gray-3 text-[20px] fw-6"> Фильтр </span>
      </div>
    </flex-row>
    <div class="grid grid-cols-4 gap-5 mt-4" v-for="s in filterStates" :key="s">
      <div v-for="cols in s" :key="cols.key">
        <i-title>{{ cols.name }}</i-title>
        <menu-btn v-if="cols.key !== 'btn' && cols.key !== 'empty'" class="w-full"
          @click="onOpenDropdown($event, cols.key)">
          <template #btn>
            <m-btn-outlined class="border-grey flex items-center bg-lotion w-full gap-2 h-11">
              <div class="w-full flex items-center justify-between">
                <div class="flex gap-2">
                  <fa-icon hash="&#xf078;" />
                  <div>
                    {{
                      cols.isSingleSelect
                      ? (cols.data && cols.getSelectedData !== null ? getSingleSelectedName(cols.data, cols.getSelectedData)
                        : "Выбрать")
                      : "Выбрать"
                    }}
                  </div>
                </div>
                <div v-if="!cols.isSingleSelect && cols.data?.total_count" class="ml-1">
                  {{ cols.getSelectedData?.length }} из
                  {{ cols.data?.total_count }}
                </div>
              </div>
            </m-btn-outlined>
          </template>
          <template #content>
            <flex-col class="gap-2 max-h-88 overflow-auto pr-2">
              <search-input v-if="!cols.isSingleSelect && cols.key !== 'days'" @change="search($event, cols.key)" />
              <FilterItems :data="cols?.data" :selectedItems="cols.getSelectedData" :singleSelect="cols.isSingleSelect"
                @onSelectItems="cols.setSelectedData = $event" @onSingleItemSelect="cols.setSelectedData = $event"
                @onLoadElse="cols?.onLoadElse" />
            </flex-col>
          </template>
        </menu-btn>
        <div v-if="cols.key === 'empty'"></div>
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
// Store
const clientsStore = useClientsStore("main");

// states
const agents = ref(null);
const selectedAgents = ref([]);
const territories = ref(null);
const selectedTerritories = ref([]);
const clientCategories = ref(null);
const selectedClientCategories = ref([]);
const expeditors = ref(null);
const selectedExpeditors = ref([]);
const priceTypes = ref(null);
const selectedPriceTypes = ref([]);
const inventoryTypes = ref(null);
const selectedInventoryTypes = ref([]);
const days = ref({
  items: [
    { name: "Monday", id: "Monday" },
    { name: "Tuesday", id: "Tuesday" },
    { name: "Wednesday", id: "Wednesday" },
    { name: "Thursday", id: "Thursday" },
    { name: "Friday", id: "Friday" },
    { name: "Saturday", id: "Saturday" },
    { name: "Sunday", id: "Sunday" },
  ],
  total_count: 7,
});
const selectedDays = ref([]);

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

const locations = ref({
  items: [
    {
      name: "Есть",
      id: true,
    },
    {
      name: "Нет",
      id: false,
    },
  ],
});

const selectedLocation = ref(null);

const inn = ref({
  items: [
    {
      name: "С ИНН",
      id: true,
    },
    {
      name: "Без ИНН",
      id: false,
    },
  ],
});
const selectedInn = ref(null);

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

const priceTypesParams = ref({
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

const inventoryTypesParams = ref({
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
    },
    {
      name: "Категория клиентов",
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
      name: "Тип оплаты",
      key: "priceTypes",
      get data() {
        return priceTypes.value || [];
      },
      get getSelectedData() {
        return selectedPriceTypes.value;
      },
      set setSelectedData(value) {
        selectedPriceTypes.value = value;
      },
      onLoadElse: async () => {
        await onLoadElsePriceTypes();
      },
    },
  ],
  secondRow: [
    {
      name: "Дни",
      key: "days",
      data: days.value,
      get getSelectedData() {
        return selectedDays.value;
      },
      set setSelectedData(value) {
        selectedDays.value = value;
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
      name: "Локация",
      key: "location",
      data: locations.value,
      get getSelectedData() {
        return selectedLocation.value;
      },
      set setSelectedData(value) {
        selectedLocation.value = value;
      },
      isSingleSelect: true,
    },
  ],
  thirdRow: [
    {
      name: "Тип оборудования",
      key: "inventoryTypes",
      get data() {
        return inventoryTypes.value || [];
      },
      get getSelectedData() {
        return selectedInventoryTypes.value;
      },
      set setSelectedData(value) {
        selectedInventoryTypes.value = value;
      },
      onLoadElse: async () => {
        await onLoadElseInventoryTypes();
      },
    },
    {
      name: "ИНН",
      key: "inn",
      data: inn.value,
      get getSelectedData() {
        return selectedInn.value;
      },
      set setSelectedData(value) {
        selectedInn.value = value;
      },
      isSingleSelect: true,
    },
    {
      key: "empty",
    },
    {
      key: "btn",
    },
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
  if (state === "priceTypes" && !priceTypes.value) {
    await getPriceTypes();
    return;
  }
  if (state === "expeditors" && !expeditors.value) {
    await getExpeditors();
    return;
  }
  if (state === "inventoryTypes" && !inventoryTypes.value) {
    await getInventoryTypes();
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
    territoryParams.value.search = value;
    await getTerritories();
    return;
  }
  if (state === "clientCategories") {
    clientCategoryParams.value.search = value;
    await getClientCategories();
    return;
  }
  if (state === "priceTypes") {
    priceTypesParams.value.search = value;
    await getPriceTypes();
    return;
  }
  if (state === "expeditors") {
    expeditorsParams.value.search = value;
    await getExpeditors();
    return;
  }
  if (state === "inventoryTypes") {
    inventoryTypesParams.value.search = value;
    await getInventoryTypes();
    return;
  } else return;
};

const onSetFilters = () => {
  clientsStore.params.agent = [...selectedAgents.value];
  clientsStore.params.territory = [...selectedTerritories.value];
  clientsStore.params.client_category = [...selectedClientCategories.value];
  clientsStore.params.price_type = [...selectedPriceTypes.value];
  clientsStore.params.day = [...selectedDays.value];
  clientsStore.params.expeditor = [...selectedExpeditors.value];
  clientsStore.params.device = [...selectedInventoryTypes.value];
  clientsStore.params.is_active = selectedStatus.value;
  clientsStore.params.location = selectedLocation.value;
  clientsStore.params.inn = selectedInn.value;
};

const getAgents = async () => {
  agents.value = await clientsStore.getAgents(agentsParams.value);
};

const onLoadElseAgents = async () => {
  agentsParams.value.page_size += 10;
  await getAgents();
};

const getTerritories = async () => {
  territories.value = await clientsStore.getTerritories(territoryParams.value);
};

const onLoadElseTerritories = async () => {
  territoryParams.value.page_size += 10;
  await getTerritories();
};

const getClientCategories = async () => {
  clientCategories.value = await clientsStore.getClientCategories(
    clientCategoryParams.value
  );
};

const onLoadElseClientCategories = async () => {
  clientCategoryParams.value.page_size += 10;
  await getClientCategories();
};

const getExpeditors = async () => {
  expeditors.value = await clientsStore.getExpeditors(expeditorsParams.value);
};

const onLoadElseExpeditors = async () => {
  expeditorsParams.value.page_size += 10;
  await getExpeditors();
};

const getPriceTypes = async () => {
  priceTypes.value = await clientsStore.getPriceTypes(priceTypesParams.value);
};

const onLoadElsePriceTypes = async () => {
  priceTypesParams.value.page_size += 10;
  await getPriceTypes();
};

const getInventoryTypes = async () => {
  inventoryTypes.value = await clientsStore.getInventoryTypes(
    inventoryTypesParams.value
  );
};

const onLoadElseInventoryTypes = async () => {
  inventoryTypesParams.value.page_size += 10;
  await getInventoryTypes();
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
