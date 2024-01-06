<template>
  <div class="rounded-large border p-4 bg-white">
    <div
      class="gap-4 grid grid-cols-3"
      v-for="(s, index) in filterStates"
      :key="index"
    >
      <div
        v-for="cols in s"
        :key="cols.key"
        :class="cols.key === 'btn' && 'flex justify-end items-center'"
      >
        <i-title v-if="cols.key !== 'btn'">
          {{ cols.name }}
        </i-title>

        <menu-btn
          class="w-full"
          v-if="
            cols.key !== 'btn' &&
            cols.key !== 'date-picker' &&
            cols.key !== 'empty'
          "
          @click="onOpenDropdown($event, cols.key)"
        >
          <template #btn>
            <m-btn-outlined class="border-grey flex items-center w-full gap-2">
              <div class="w-full flex items-center justify-between">
                <div class="flex gap-2">
                  <fa-icon hash="&#xf078" />
                  <div v-if="cols.isSingleSelect">
                    {{
                      cols.getSelectedData
                        ? getSingleSelectedName(cols.data, cols.getSelectedData)
                        : "Выбрать"
                    }}
                  </div>
                  <div v-else>Выбрать</div>
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
            <flex-col class="gap-2">
              <search-input
                v-if="cols.key !== 'statuses'"
                @change="search($event, cols.key)"
              />
              <FilterItems
                :data="cols?.data"
                :selectedItems="cols.getSelectedData"
                :singleSelect="cols.isSingleSelect"
                @onSelectItems="cols.setSelectedData = $event"
                @onLoadElse="cols?.onLoadElse"
                @onSingleItemSelect="cols.setSelectedData = $event"
              />
            </flex-col>
          </template>
        </menu-btn>
        <flex-row
          v-if="cols.key === 'btn'"
          class="w-full flex justify-end items-center gap-4.5 mt-7"
        >
          <div class="w-11/20">
            <DatePicker class="w-full" @onApply="selectedDate = $event" />
          </div>
          <div class="w-9/20 flex">
            <m-btn class="w-4/5" @click="onSetFilters"> Применить </m-btn>
            <sm-btn class="px-2 py-2 w-1/5">
              <IconReloadSVG />
            </sm-btn>
          </div>
        </flex-row>
      </div>
    </div>
  </div>
</template>

<script setup>
// Stores
const clientsRemainsStore = useClientsRemainsStore("main");

// props
const props = defineProps({
  filterByActiveTab: Number,
});

// States
const agents = ref(null);
const selectedAgents = ref([]);
const territories = ref(null);
const selectedTerritories = ref([]);
const productCategories = ref(null);
const selectedProductCategories = ref([]);
const products = ref(null);
const selectedProducts = ref([]);
const priceTypes = ref(null);
const selectedPriceTypes = ref("");
const selectedDate = ref("");

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

const productCategoriesParams = ref({
  page: 1,
  page_size: 10,
  search: "",
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
      name: "Агент",
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
      name: "Территория",
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
      name: "Категория",
      key: "productCategories",
      get data() {
        return productCategories.value || [];
      },
      get getSelectedData() {
        return selectedProductCategories.value;
      },
      set setSelectedData(value) {
        selectedProductCategories.value = value;
      },
      onLoadElse: async () => {
        await onLoadElseProductCategories();
      },
    },
  ],
  secondRow: [
    {
      name: "Продукты",
      key: "products",
      get data() {
        return products.value || [];
      },
      get getSelectedData() {
        return selectedProducts.value;
      },
      set setSelectedData(value) {
        selectedProducts.value = value;
      },
      onLoadElse: async () => {
        await onLoadElseProducts();
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
      isSingleSelect: true,
    },
    {
      name: "",
      key: "btn",
    },
  ],
});

const onOpenDropdown = async (value, state) => {
  if (state === "agents" && !agents.value) {
    await getAgents();
    return;
  }
  if (state === "territories" && !territories.value) {
    await getTerritories();
    return;
  }
  if (state === "productCategories" && !productCategories.value) {
    await getProductCategories();
    return;
  }
  if (state === "products" && !products.value) {
    await getProducts();
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
  if (state === "territories") {
    territoriesParams.value.search = value;
    await getTerritories();
    return;
  }
  if (state === "productCategories") {
    productCategoriesParams.value.search = value;
    await getProductCategories();
    return;
  }
  if (state === "products") {
    productsParams.value.search = value;
    await getProducts();
    return;
  }
  if (state === "priceTypes") {
    priceTypesParams.value.search = value;
    await getPriceTypes();
    return;
  }
};

const getSingleSelectedName = (data, value) => {
  return data?.items?.find((val) => val.id === value)?.name;
};

const getAgents = async () => {
  agents.value = await clientsRemainsStore.getAgents(agentsParams.value);
};

const onLoadElseAgents = async () => {
  agentsParams.value.page_size += 10;
  await getAgents();
};

const getTerritories = async () => {
  territories.value = await clientsRemainsStore.getTerritories(
    agentsParams.value
  );
};

const onLoadElseTerritories = async () => {
  territoriesParams.value.page_size += 10;
  await getTerritories();
};

const getProductCategories = async () => {
  productCategories.value = await clientsRemainsStore.getProductCategories(
    productCategoriesParams.value
  );
};

const onLoadElseProductCategories = async () => {
  productCategoriesParams.value.page_size += 10;
  await getProductCategories();
};

const getProducts = async () => {
  products.value = await clientsRemainsStore.getProducts(productsParams.value);
};

const onLoadElseProducts = async () => {
  productsParams.value.page_size += 10;
  await getProducts();
};

const getPriceTypes = async () => {
  priceTypes.value = await clientsRemainsStore.getPriceTypes(
    priceTypesParams.value
  );
};

const onLoadElsePriceTypes = async () => {
  priceTypesParams.value.page_size += 10;
  await getPriceTypes();
};

const onSetFilters = () => {
  // props.filterByActiveTab  1 - byproduct, 2 - byCategory
  const params =
    props.filterByActiveTab === 1
      ? clientsRemainsStore.byProductParams
      : clientsRemainsStore.byCategoryParams;
  params.agent_id_arr = [...selectedAgents.value];
  params.territory_id_arr = [...selectedTerritories.value];
  params.product_category_id_arr = [...selectedProductCategories.value];
  params.product_id_arr = [...selectedProducts.value];
  if(selectedPriceTypes.value) {
    params.price_type_id = selectedPriceTypes.value;
  }
  if (selectedDate.value) {
    params.date_range["from_value"] = selectedDate.value.fromDate;
    params.date_range["to_value"] = selectedDate.value.toDate;
  }
};
</script>
