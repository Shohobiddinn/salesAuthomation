<template>
  <div v-for="s in filterStates" :key="s" class="w-full">
    <div v-for="cols in s" :key="cols.key" class="my-2 w-full">
      <menu-btn class="w-full" @click="onOpenDropdown($event, cols.key)">
        <template #btn>
          <m-btn-outlined class="border-grey flex items-center w-full gap-2">
            <div class="w-full flex items-center justify-between">
              <div class="flex gap-2">
                <fa-icon hash="&#xf078" />
                <div v-if="cols.isSingleSelect">
                  {{ getSingleSelectedName(cols.data, cols.getSelectedData) }}
                </div>
                <div v-else>{{ cols?.name }}</div>
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
    </div>
  </div>
  <flex-row class="h-full justify-end items-end gap-2">
    <m-btn @click="onSetFilters" class="w-full mt-5"> Применить </m-btn>
    <sm-btn class="px-4 py-3">
      <IconReloadSVG />
    </sm-btn>
  </flex-row>
</template>

<script setup>
// store
const clientsMapStore = useClientsmappStore("main");

// states
const agents = ref(null);
const selectedAgents = ref([]);
const territories = ref(null);
const selectedTerritories = ref([]);
const clientCategories = ref(null);
const selectedClientCategories = ref([]);
const clientTypes = ref(null);
const selectedClientTypes = ref([]);
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
const selectedStatus = ref(false);
const equipments = ref({
  items: [
    {
      name: "С оборудованием",
      id: true,
    },
    {
      name: "Без оборудования",
      id: false,
    },
  ],
});
const isEquipment = ref(false);

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

const clientTypesParams = ref({
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

const filterStates = ref({
  firstRow: [
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
      name: "Категории",
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
      name: "Тип клиента",
      key: "clientTypes",
      get data() {
        return clientTypes.value || [];
      },
      get getSelectedData() {
        return selectedClientTypes.value;
      },
      set setSelectedData(value) {
        selectedClientTypes.value = value;
      },
      onLoadElse: async () => {
        await onLoadElseClientTypes();
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
      name: "Оборудование",
      key: "isEquipment",
      data: equipments.value,
      get getSelectedData() {
        return isEquipment.value;
      },
      set setSelectedData(value) {
        isEquipment.value = value;
      },
      isSingleSelect: true,
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
  if (state === "clientTypes" && !clientTypes.value) {
    await getClientTypes();
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
  if (state === "clientTypes") {
    clientTypesParams.value.search = value;
    await getClientTypes();
    return;
  }
};

const getAgents = async () => {
  agents.value = await clientsMapStore.getAgents(agentsParams.value);
};

const onLoadElseAgents = async () => {
  agentsParams.value.page_size += 10;
  await getAgents();
};

const getTerritories = async () => {
  territories.value = await clientsMapStore.getTerritories(
    territoryParams.value
  );
};

const onLoadElseTerritories = async () => {
  territoryParams.value.page_size += 10;
  await getTerritories();
};

const getClientCategories = async () => {
  clientCategories.value = await clientsMapStore.getClientCategories(
    clientCategoryParams.value
  );
};

const onLoadElseClientCategories = async () => {
  clientCategoryParams.value.page_size += 10;
  await getClientCategories();
};

const getClientTypes = async () => {
  clientTypes.value = await clientsMapStore.getClientTypes(
    clientTypesParams.value
  );
};

const onLoadElseClientTypes = async () => {
  clientTypesParams.value.page_size += 10;
  await getClientTypes();
};

const onSetFilters = () => {
  clientsMapStore.params.agents = [...selectedAgents.value],
  clientsMapStore.params.days = [...selectedDays.value],
  clientsMapStore.params.territories = [...selectedTerritories.value],
  clientsMapStore.params.clientCategories = [...selectedClientCategories.value],
  clientsMapStore.params.clientTypes = [...selectedClientTypes.value],
  clientsMapStore.params.isActive = selectedStatus.value,
  clientsMapStore.params.isRquipment = isEquipment.value
}

const getSingleSelectedName = (data, value) => {
  return data?.items?.find((val) => val.id === value)?.name;
};
</script>
