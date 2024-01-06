<template>
  <div>
    <div class="mt-6">
      <div class="bg-white p-4 w-full rounded-lg">
        <div class="flex items-center justify-between">
          <page-title20 :title="'Фильтр'"></page-title20>
          <div class="flex gap-4">
            <menu-btn>
              <template #btn>
                <m-btn-outlined class="border-primary-gray">
                  <fa-icon hash="&#xf078" />
                  {{
                    selectedDateType
                      ? getSelectedItemName("dateTypes", selectedDateType)
                      : "Выбрать"
                  }}
                </m-btn-outlined>
              </template>
              <template #content>
                <FilterItems
                  singleSelect
                  :data="dateTypes"
                  :selectedItems="selectedDateType"
                  @onSingleItemSelect="selectedDateType = $event"
                />
              </template>
            </menu-btn>
            <DatePicker initialFromDate="2023-01-01" class="w-fit" @onApply="selectedDateRange = $event" />
          </div>
        </div>
        <div
          class="grid grid-cols-3 gap-5 mt-4"
          v-for="s in filterStates"
          :key="s"
        >
          <div v-for="cols in s" :key="cols.key">
            <i-title>{{ cols.name }}</i-title>
            <menu-btn
              v-if="cols.key !== 'btn'"
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
                      <div>Выбрать</div>
                    </div>
                    <div v-if="cols.data?.total_count" class="ml-1">
                      {{ cols.getSelectedData?.length }} из
                      {{ cols.data?.total_count }}
                    </div>
                  </div>
                </m-btn-outlined>
              </template>
              <template #content>
                <flex-col class="gap-2 max-h-88 overflow-auto pr-2">
                  <search-input
                    v-if="cols.key !== 'statuses'"
                    @change="search($event, cols.key)"
                  />
                  <FilterItems
                    :data="cols?.data"
                    :selectedItems="cols.getSelectedData"
                    @onSelectItems="cols.setSelectedData = $event"
                    @onLoadElse="cols?.onLoadElse"
                  />
                </flex-col>
              </template>
            </menu-btn>
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
      </div>
    </div>
  </div>
</template>

<script setup>
// store
const vanSellingOrdersStore = useVanSellingOrdersStore("main");

const route = useRoute()
const statuses = ref({
  items: null,
});
const selectedStatuses = ref([]);
const agents = ref(null);
const selectedAgents = ref([]);
const salesWarehouses = ref(null);
const selectedSalesWarehouses = ref([]);
const vanSellingWarehouses = ref(null);
const selectedVanSellingWarehouses = ref([]);
const priceTypes = ref(null);
const selectedPriceTypes = ref([]);
const dateTypes = ref({
  items: [
    {
      name: "Дата отгрузки",
      id: "1",
    },
    {
      name: "Дата создания",
      id: "2",
    },
  ],
});
const selectedDateType = ref("1");
const selectedDateRange = ref(null);

const agentsParams = ref({
  page: 1,
  page_size: 10,
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

const salesWarehousesParams = ref({
  page: 1,
  page_size: 10,
  order_by: {
    field: "created_date",
    is_asc: true,
  },
  filter: [
    {
      field: "is_active",
      value: ["true"],
    },
    {
      field: "type",
      value: ["Sale"],
    },
  ],
});

const vanSellingWarehousesParams = ref({
  page: 1,
  page_size: 10,
  order_by: {
    field: "created_date",
    is_asc: true,
  },
  filter: [
    {
      field: "is_active",
      value: ["true"],
    },
    {
      field: "is_van_selling",
      value: ["true"],
    },
  ],
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
      field: "is_active",
      value: ["true"],
    },
  ],
});

const filterStates = ref({
  firstRow: [
    {
      name: "Статус",
      key: "statuses",
      get data() {
        return statuses.value || [];
      },
      get getSelectedData() {
        return selectedStatuses.value;
      },
      set setSelectedData(value) {
        selectedStatuses.value = value;
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
      name: "Склад реализации",
      key: "salesWarehouses",
      get data() {
        return salesWarehouses.value || [];
      },
      get getSelectedData() {
        return selectedSalesWarehouses.value;
      },
      set setSelectedData(value) {
        selectedSalesWarehouses.value = value;
      },
      onLoadElse: async () => {
        await onLoadElseSalesWarehouses();
      },
    },
  ],
  secondRow: [
    {
      name: "Склад (Van selling)",
      key: "vanSellingWarehouses",
      get data() {
        return vanSellingWarehouses.value || [];
      },
      get getSelectedData() {
        return selectedVanSellingWarehouses.value;
      },
      set setSelectedData(value) {
        selectedVanSellingWarehouses.value = value;
      },
      onLoadElse: async () => {
        await onLoadElseVanSellingWarehouses();
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
    {
      key: "btn",
    },
  ],
});

// hooks
watchEffect(() => {
  if(route.query.order_type) {
    vanSellingOrdersStore.params.order_type = route.query.order_type
  }
})

// methods
const onOpenDropdown = async (value, state) => {
  if (state === "statuses" && !statuses.value.items) {
    await getStatuses();
    return;
  }
  if (state === "agents" && !agents.value) {
    await getAgents();
    return;
  }
  if (state === "salesWarehouses" && !salesWarehouses.value) {
    await getSalesWarehouses();
    return;
  }
  if (state === "vanSellingWarehouses" && !vanSellingWarehouses.value) {
    await getVanSellingWarehouses();
    return;
  }
  if (state === "priceTypes" && !priceTypes.value) {
    await getPriceTypes();
    return;
  }
  return;
};

const search = async (value, state) => {
  if (state === "agents") {
    agentsParams.value.search = value;
    await getAgents();
    return;
  }
  if (state === "salesWarehouses") {
    salesWarehousesParams.value.search = value;
    await getSalesWarehouses();
    return;
  }
  if (state === "vanSellingWarehouses") {
    vanSellingWarehousesParams.value.search = value;
    await getVanSellingWarehouses();
    return;
  }
  if (state === "priceTypes") {
    priceTypesParams.value.search = value;
    await getPriceTypes();
    return;
  } else return;
};

const getSelectedItemName = (state, selectedItemId) => {
  if (state === "dateTypes" && dateTypes.value) {
    return dateTypes.value.items.find((type) => type.id === selectedItemId)
      .name;
  }
};

const onSetFilters = () => {
  vanSellingOrdersStore.params.status_id_arr = [...selectedStatuses.value];
  vanSellingOrdersStore.params.agent_id_arr = [...selectedAgents.value];
  vanSellingOrdersStore.params.warehouse_id_arr = [
    ...selectedSalesWarehouses.value,
  ];
  vanSellingOrdersStore.params.agent_warehouse_id_arr = [
    ...selectedVanSellingWarehouses.value,
  ];
  vanSellingOrdersStore.params.price_type_id_arr = [
    ...selectedPriceTypes.value,
  ];
  vanSellingOrdersStore.params.date_filter_type = Number(selectedDateType.value);
  if (selectedDateRange.value) {
    vanSellingOrdersStore.params.date_only_range.from_value = `${selectedDateRange.value.fromDate}`;
    vanSellingOrdersStore.params.date_only_range.to_value = `${selectedDateRange.value.toDate}`;
  }
};

const getStatuses = async () => {
  statuses.value.items = await vanSellingOrdersStore.getVanSellingStatuses();
};

const getAgents = async () => {
  agents.value = await vanSellingOrdersStore.getAgents(agentsParams.value);
};

const onLoadElseAgents = async () => {
  agentsParams.value.page_size += 10;
  await getAgents();
};

const getSalesWarehouses = async () => {
  salesWarehouses.value = await vanSellingOrdersStore.getWarehouses(
    salesWarehousesParams.value
  );
};

const onLoadElseSalesWarehouses = async () => {
  salesWarehousesParams.value.page_size += 10;
  await getSalesWarehouses();
};

const getVanSellingWarehouses = async () => {
  vanSellingWarehouses.value = await vanSellingOrdersStore.getWarehouses(
    vanSellingWarehousesParams.value
  );
};

const onLoadElseVanSellingWarehouses = async () => {
  vanSellingWarehousesParams.value.page_size += 10;
  await getVanSellingWarehouses();
};

const getPriceTypes = async () => {
  priceTypes.value = await vanSellingOrdersStore.getPriceTypes(
    priceTypesParams.value
  );
};

const onLoadElsePriceTypes = async () => {
  priceTypesParams.value.page_size += 10;
  await getPriceTypes();
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
