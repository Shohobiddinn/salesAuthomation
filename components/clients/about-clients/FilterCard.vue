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
            cols.key !== 'date-picker' && cols.key !== 'empty'
          "
          @click="onOpenDropdown($event, cols.key)"
        >
          <template #btn>
            <m-btn-outlined class="border-grey flex items-center w-full gap-2">
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
            <flex-col class="gap-2">
              <search-input v-if="cols.key !== 'statuses'" @change="search($event, cols.key)" />
              <FilterItems
                :data="cols?.data"
                :selectedItems="cols.getSelectedData"
                @onSelectItems="cols.setSelectedData = $event"
                @onLoadElse="cols?.onLoadElse"
              />
            </flex-col>
          </template>
        </menu-btn>
        <div
          v-if="cols.key === 'date-picker'"
          class="w-full flex justify-end items-center mt-6"
        >
        <div class="flex gap-4.5 w-full">
          <m-btn-outlined class="w-1/2 border-color-primary flex gap-2 items-center">
            <fa-icon hash="&#xf078" />
            Дата отгрузки
          </m-btn-outlined>
          <div class="w-1/2">
            <DatePicker @onApply="selectedDate = $event"/>
          </div>
        </div>
        </div>
        <flex-row
          v-if="cols.key === 'btn'"
          class="w-full flex justify-end items-center gap-4.5 mt-7"
        >
          <m-btn class="w-full" @click="onSetFilters"> Применить </m-btn>
          <sm-btn class="px-2 py-2">
            <IconReloadSVG />
          </sm-btn>
        </flex-row>
      </div>
    </div>
  </div>
</template>

<script setup>
// Stores
const clientsOrdersStore = useClientsOrdersStore("main");
const clientSalesDynamicsStore = useClientSalesDynamicsStore("main");

// States
const statuses = ref({
  items: []
});
const selectedStatuses = ref([]);
const productCategory = ref(null);
const selectedProductCategories = ref([]);
const currencies = ref(null)
const selectedCurrencies = ref([])
const selectedDate = ref("");


const productCategoryParams = ref({
  page: 1,
  page_size: 10,
  search: "",
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
})

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
      }
    },
    {
      name: "Категории продукта",
      key: "productCategories",
      get data() {
        return productCategory.value || [];
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
    {
      name: "Тип оплаты",
      key: "currencies",
      get data() {
        return currencies.value || [];
      },
      get getSelectedData() {
        return selectedCurrencies.value;
      },
      set setSelectedData(value) {
        selectedCurrencies.value = value;
      },
      onLoadElse: async () => {
        await onLoadElseCurrencies();
      },
    },
  ],
  secondRow: [
    {
      key: 'empty'
    },
    {
      name: "",
      key: "date-picker",
    },
    {
      name: "",
      key: "btn",
    },
  ]
});

// methods
const onOpenDropdown = async (value, state) => {
   if (state === "statuses" && !statuses.value.items.length > 0) {
    await getStatuses();
    return;
  }
  if (state === "productCategories" && !productCategory.value) {
    await getProductCategories();
    return;
  }
  if (state === "currencies" && !currencies.value) {
    await getCurrencies();
    return;
  }
  return;
};

const search = async (value, state) => {
  if (state === "productCategories") {
    productCategoryParams.value.search = value;
    await getProductCategories();
    return;
  }
  if (state === "currencies") {
    currenciesParams.value.search = value;
    await getCurrencies();
    return;
  }
};

const getStatuses = async () => {
  statuses.value.items = await clientsOrdersStore.getOrderStatuses()
}

const getProductCategories = async () => {
  productCategory.value = await clientsOrdersStore.getProductCategories(
    productCategoryParams.value
  );
};

const onLoadElseProductCategories = async () => {
  productCategoryParams.value.page_size += 10;
  await getProductCategories();
};

const getCurrencies = async () => {
  currencies.value = await clientsOrdersStore.getCurrencies(
    currenciesParams.value
  );
};

const onLoadElseCurrencies = async () => {
  currenciesParams.value.page_size += 10;
  await getCurrencies();
};

const onSetFilters = () => {
  clientsOrdersStore.params.Status = [...selectedStatuses.value];
  clientsOrdersStore.params.Currency = [...selectedCurrencies.value];
  clientsOrdersStore.params.ProductCategory = [...selectedProductCategories.value];
  if(selectedDate.value){
    clientsOrdersStore.params['Date.From'] = selectedDate.value.fromDate
    clientsOrdersStore.params['Date.To'] = selectedDate.value.toDate
    clientSalesDynamicsStore.params.DateRange.From = selectedDate.value.fromDate
    clientSalesDynamicsStore.params.DateRange.To = selectedDate.value.toDate
  }
};
</script>
