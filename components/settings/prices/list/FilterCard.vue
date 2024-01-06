<template>
  <rounded-white-container class="gap-4 p-6">
    <flex-row class="items-center justify-between gap-4">
      <div>
        <span class="text-gray-3 text-[20px] fw-6"> Фильтр </span>
      </div>
      <div class="border-1 rounded-lg grid grid-cols-2">
        <DInputDatePicker :value="dateTimeFrom" withoutTime borderless class="border-r-1 w-full"
          @change="(newVal) => dateTimeFrom = newVal" />
        <DInputDatePicker :value="dateTimeTo" withoutTime borderless class="w-full"
          @change="(newVal) => dateTimeTo = newVal" />
      </div>
    </flex-row>
    <div class="grid grid-cols-4 gap-5 mt-4" v-for="s in filterStates" :key="s">
      <div v-for="cols in s" :key="cols.key">
        <i-title>{{ cols.name }}</i-title>
        <menu-btn v-if="cols.type === 'dropdown'" class="w-full" @click="onOpenDropdown($event, cols.key)">
          <template #btn>
            <m-btn-outlined class="border-grey flex items-center bg-lotion w-full gap-2 h-11">
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
              <FilterItems :data="cols.data" :selectedItems="cols.getSelectedData" :singleSelect="cols.isSingleSelect"
                @onSelectItems="cols.setSelectedData = $event" @onSingleItemSelect="cols.setSelectedData = $event"
                @onLoadElse="cols?.onLoadElse" />
            </flex-col>
          </template>
        </menu-btn>
        <div v-if="cols.type === 'empty'"></div>
        <flex-row v-if="cols.type === 'btn'" class="items-end gap-2 mt-24px mr-auto">
          <m-btn @click="onSetFilters" class="w-full h-11"> Применить </m-btn>
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
const priceTypesStore = usePriceStore("main");

// State
const dateTimeFrom = ref(moment().format("YYYY-MM-DD"))
const dateTimeTo = ref(moment().format("YYYY-MM-DD"))
const priceTypes = ref(null);
const selectedPriceTypes = ref([]);
const warehouses = ref({
  items: [],
});
const selectedWarehouse = ref([]);
const productCategorys = ref(null);
const selectedProductCategory = ref([]);
const tradeDirections = ref(null);
const selectedTradeDirections = ref([]);
const brands = ref(null);
const selectedBrands = ref([]);

const statuses = ref({
  items: [
    {
      name: "Все продукты",
      id: 2,
    },
    {
      name: "Активный",
      id: 1,
    },
    {
      name: "Не активный",
      id: 0,
    },
  ],
});

const selectedStatus = ref(1);

const priceTypesParams = ref({
  page: 1,
  page_size: 10,
  search: null,
  order_by: {
    field: "created_date",
    is_asc: true,
  },
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

const warehousesParams = ref({
  page: 1,
  page_size: 10,
  search: null,
  order_by: {
    field: "created_date",
    is_asc: true,
  },
});

const productCategorysParams = ref({
  page: 1,
  page_size: 10,
  search: null,
  order_by: {
    field: "created_date",
    is_asc: true,
  },
});

const brandsParams = ref({
  page: 1,
  page_size: 10,
  search: null,
  order_by: {
    field: "created_date",
    is_asc: true,
  },
});

const filterStates = ref({
  firstRow: [
    {
      name: "Тип цены",
      key: "priceType",
      type:"dropdown",
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
        await onLoadElseGetPriceTypes();
      },
    },
    {
      name: "Направления торговли",
      key: "tradeDirections",
      type:"dropdown",
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
    {
      name: "Бренд",
      key: "brands",
      type:"dropdown",
      get data() {
        return brands.value || [];
      },
      get getSelectedData() {
        return selectedBrands.value;
      },
      set setSelectedData(value) {
        selectedBrands.value = value;
      },
      onLoadElse: async () => {
        await onLoadElseBrands();
      },
    },
    {
      name: "Категория",
      key: "productCategory",
      type:"dropdown",
      get data() {
        return productCategorys.value || [];
      },
      get getSelectedData() {
        return selectedProductCategory.value;
      },
      set setSelectedData(value) {
        selectedProductCategory.value = value;
      },
      onLoadElse: async () => {
        await onLoadElseGetProductCategorys();
      },
    },
    {
      name: "Статус",
      key: "status",
      type:"dropdown",
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
      name: "Cклад",
      key: "warehouse",
      type:"dropdown",
      get data() {
        return warehouses.value || [];
      },
      get getSelectedData() {
        return selectedWarehouse.value;
      },
      set setSelectedData(value) {
        selectedWarehouse.value = value;
      },
      onLoadElse: async () => {
        await onLoadElseGetWarehouse();
      },
    },
    {
      type: "empty",
    },
    {
      name: "",
      type: "btn",
    },
  ],
});

// Methods
const onOpenDropdown = async (value, state) => {
  if (state === "priceType" && !priceTypes.value) {
    await getPriceTypes();
    return;
  }
  if (state === "warehouse" && !warehouses.value.items.length > 0) {
    await getWarehouse();
    return;
  }
  if (state === "productCategory" && !productCategorys.value) {
    await getProductCategorys();
    return;
  }
  if (state === "tradeDirections" && !tradeDirections.value) {
    await getTradeDirections();
    return;
  }
  if (state === "brands" && !brands.value) {
    await getBrands();
    return;
  }
  return;
};

const search = async (value, state) => {
  if (state === "priceType") {
    priceTypesStore.params.search = value;
    return;
  }
  if (state === "warehouse") {
    warehousesParams.value.search = value;
    await getWarehouse();
    return;
  }
  if (state === "productCategory") {
    productCategorysParams.value.search = value;
    await getProductCategorys();
    return;
  }
  if (state === "tradeDirections") {
    tradeDirectionsParams.value.search = value;
    await getBrands();
    return;
  }
  if (state === "brands") {
    brandsParams.value.search = value;
    await getBrands();
    return;
  }
  return;
};

const onSetFilters = () => {
  priceTypesStore.priceListParams.price_type_id_arr =  [...selectedPriceTypes.value];
  priceTypesStore.priceListParams.warehouse = [...selectedWarehouse.value];
  priceTypesStore.priceListParams.category_id_arr= [...selectedProductCategory.value];
  priceTypesStore.priceListParams.trade_direction_id_arr= [...selectedTradeDirections.value]
  priceTypesStore.priceListParams.brand_id_arr =[...selectedBrands.value]
  priceTypesStore.priceListParams.is_active=selectedStatus.value;
  priceTypesStore.priceListParams.date_only_range.from_value= dateTimeFrom.value
  priceTypesStore.priceListParams.date_only_range.to_value= dateTimeTo.value
};

const getPriceTypes = async () => {
  await priceTypesStore.getData();
  priceTypes.value = priceTypesStore.data;
};

const onLoadElseGetPriceTypes = async () => {
  priceTypesParams.value.page_size += 10;
  priceTypes.value = await getPriceTypes();
};

const getWarehouse = async () => {
  warehouses.value = await priceTypesStore.getWarehouses(
    warehousesParams.value
  );
};

const onLoadElseGetWarehouse = async () => {
  warehousesParams.value.page_size += 10;
  warehouses.value = await getWarehouse();
};

const getProductCategorys = async () => {
  productCategorys.value = await priceTypesStore.getProductCategories(
    productCategorysParams.value
  );
};

const onLoadElseGetProductCategorys = async () => {
  productCategorysParams.value.page_size += 10;
  productCategorys.value = await getProductCategorys();
};

const getSingleSelectedName = (data, value) => {
  return data?.items?.find((val) => val.id === value)?.name;
};
const getTradeDirections = async () => {
  tradeDirections.value = await priceTypesStore.getTradeDirections(tradeDirectionsParams.value);
};

const onLoadElseTradeDirections = async () => {
  tradeDirectionsParams.value.page_size += 10;
  await getTradeDirections();
};

const getBrands = async () => {
  brands.value = await priceTypesStore.getBrands(brandsParams.value);
};

const onLoadElseBrands = async () => {
  brandsParams.value.page_size += 10;
  await getBrands();
};
</script>
