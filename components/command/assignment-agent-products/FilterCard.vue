<template>
  <rounded-white-container>
    <flex-row
      class="gap-4 mt-4 justify-end"
      v-for="row in assignmentReportsStore.filterStates"
      :key="row"
    >
      <flex-col class="w-1/4" v-for="cols in row" :key="cols.key">
        <i-title v-if="cols.key !== 'btn'">
          {{ cols.name }}
        </i-title>
        <flex-row
          class="h-full w-full justify-end items-end gap-2"
          v-if="cols.key === 'btn'"
        >
          <m-btn class="w-2/3" @click="onApplyFilter"> Применить </m-btn>
          <sm-btn class="px-4 py-3">
            <IconReloadSVG />
          </sm-btn>
        </flex-row>
        <menu-btn
          class="w-full"
          v-if="cols.key !== 'btn'"
          @click="onOpenDropdown($event, cols.key)"
        >
          <template #btn>
            <m-btn-outlined class="border-grey flex items-center w-full gap-2">
              <fa-icon hash="&#xf078" />
              Выбрать
            </m-btn-outlined>
          </template>
          <template #content>
            <flex-col
              class="gap-2 max-h-88 overflow-auto pr-2"
              v-if="cols.key === 'warehouse'"
            >
              <search-input @change="search($event, cols.key)" />
              <FilterItems
                :data="warehouses"
                :selectedItems="selectedWarehouses"
                @onSelectItems="selectedWarehouses = $event"
                @onLoadElse="onLoadElseWarehouses"
              />
            </flex-col>
            <flex-col
              class="gap-2 max-h-88 overflow-auto pr-2"
              v-if="cols.key === 'agent'"
            >
              <search-input @change="search($event, cols.key)" />
              <FilterItems
                :data="agents"
                :selectedItems="selectedAgents"
                @onSelectItems="selectedAgents = $event"
                @onLoadElse="onLoadElseAgents"
              />
            </flex-col>
            <flex-col
              class="gap-2 max-h-88 overflow-auto pr-2"
              v-if="cols.key === 'product'"
            >
              <search-input @change="search($event, cols.key)" />
              <FilterItems
                :data="products"
                :selectedItems="selectedProducts"
                @onSelectItems="selectedProducts = $event"
                @onLoadElse="onLoadElseProducts"
              />
            </flex-col>
            <flex-col
              class="gap-2 max-h-88 overflow-auto pr-2"
              v-if="cols.key === 'type'"
            >
              <FilterItems
                :data="types"
                :selectedItems="selectedTypes"
                @onSelectItems="selectedTypes = $event"
              />
            </flex-col>
          </template>
        </menu-btn>
      </flex-col>
    </flex-row>
  </rounded-white-container>
</template>

<script setup>
// Stores
const assignmentReportsStore = useAssignmentReportsStore("main");

// states

const warehouses = ref(null);
const agents = ref(null);
const products = ref(null);
const types = ref({
  items: [],
});

const selectedWarehouses = ref([]);
const selectedAgents = ref([]);
const selectedProducts = ref([]);
const selectedTypes = ref([]);

const warehousesParams = ref({
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

const productsParams = ref({
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

// methods
const getAgents = async () => {
  agents.value = await assignmentReportsStore.getAgents(agentsParams.value);
};

const getWarehouses = async () => {
  warehouses.value = await assignmentReportsStore.getWarehouses(
    warehousesParams.value
  );
};

const getProducts = async () => {
  products.value = await assignmentReportsStore.getProducts(
    productsParams.value
  );
};

const getTypes = async () => {
  types.value.items = await assignmentReportsStore.getLimitTypes();
};

const onOpenDropdown = async (value, state) => {
  if (state === "agent" && !agents.value) {
    await getAgents();
    return;
  }
  if (state === "warehouse" && !warehouses.value) {
    await getWarehouses();
    return;
  }
  if (state === "product" && !products.value) {
    await getProducts();
    return;
  }
  if (state === "type" && !types.value.items.length > 0) {
    await getTypes();
    return;
  }
  return;
};

const onLoadElseAgents = async () => {
  agentsParams.value.page_size += 10;
  await getAgents();
};

const onLoadElseWarehouses = async () => {
  warehousesParams.value.page_size += 10;
  await getWarehouses();
};

const onLoadElseProducts = async () => {
  productsParams.value.page_size += 10;
  await getProducts();
};

const search = async (value, state) => {
  if (state === "agent") {
    agentsParams.value.search = value;
    await getAgents();
    return;
  }
  if (state === "warehouse") {
    warehousesParams.value.search = value;
    await getWarehouses();
    return;
  }
  if (state === "product") {
    productsParams.value.search = value;
    await getProducts();
    return;
  }
  return;
};

const onApplyFilter = () => {
  selectedAgents.value = selectedAgents.value;
  selectedAgents.value.length > 0 &&
    (assignmentReportsStore.params.agent = selectedAgents.value);
  selectedWarehouses.value.length > 0 &&
    (assignmentReportsStore.params.warehouse = selectedWarehouses.value);
  selectedProducts.value.length > 0 &&
    (assignmentReportsStore.params.product = selectedProducts.value);
  selectedTypes.value.length > 0 &&
    (assignmentReportsStore.params.type = selectedTypes.value);
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
