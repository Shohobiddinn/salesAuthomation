<template>
  <div class="relative w-full">
    <div class="absolute bottom-0 z-50 bg-white w-full">
      <div class="flex justify-end mt-4">
        <m-btn :disabled="isSaveBtnDisabled" class="w-[200px]" @click="onSave"
          >Сохранить</m-btn
        >
      </div>
    </div>
    <div class="w-full h-[550px] overflow-auto pr-4">
      <div class="mt-[-10px]">
        <page-title
          :title="`Создать ${isOrder ? 'заявку' : 'возврат'} (Van Selling)`"
        />
      </div>
      <div
        class="grid grid-cols-3 gap-5 mt-4"
        v-for="s in filterStates"
        :key="s"
      >
        <div v-for="cols in s" :key="cols.key">
          <div class="mb-2.5">
            {{ cols.name }}
            <span v-if="cols.required" class="text-red-3">*</span>
          </div>
          <menu-btn
            v-if="cols.type === 'dropdown'"
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
                    <div v-if="!cols.isMultiSelect">
                      {{
                        cols.getSelectedData
                          ? getSingleSelectedItemName(
                              cols.data,
                              cols.getSelectedData
                            )
                          : "Выбрать"
                      }}
                    </div>
                    <div v-else>
                      {{
                        cols.getSelectedData.length
                          ? getMultiSelectedItemName(
                              cols.data,
                              cols.getSelectedData
                            )
                          : "Выбрать"
                      }}
                    </div>
                  </div>
                </div>
              </m-btn-outlined>
            </template>
            <template #content>
              <flex-col class="gap-2 max-h-66 overflow-auto pr-2">
                <search-input
                  v-if="cols.type === 'dropdown'"
                  @change="search($event, cols.key)"
                />
                <FilterItems
                  :data="cols?.data"
                  :singleSelect="!cols.isMultiSelect"
                  :selectedItems="cols.getSelectedData"
                  @onSingleItemSelect="cols.setSelectedData = $event"
                  @onSelectItems="cols.setSelectedData = $event"
                  @onLoadElse="cols?.onLoadElse"
                />
              </flex-col>
            </template>
          </menu-btn>
          <div v-else-if="cols.type === 'date-picker'">
            <DInputDatePicker
              :value="selectedDate"
              @change="(newVal) => (selectedDate = newVal)"
            />
          </div>
          <div v-else-if="cols.type === 'comment'">
            <DInput :value="comment" @change="(newVal) => (comment = newVal)" />
          </div>
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
      <div v-if="isSharedProductsParamsSelected">
        <div class="font-semibold mt-7.5">Продукты</div>
        <div class="w-full mt-4">
          <div class="rounded-lg border w-fit">
            <button
              v-for="category in selectedProductCategoryItems"
              :key="category.id"
              @click="selectedCategoryFromTabs = category.id"
              :class="[
                category.id === selectedCategoryFromTabs ? 'order bgc' : '',
              ]"
              class="px-3 py-2 order text-white button-bg outline-none"
            >
              {{ category.name }}
            </button>
          </div>
        </div>
        <div class="border rounded-lg mt-4 mb-22 overflow-auto min-h-[200px]">
          <data-table
            withInformationAboveHeader
            :headers="headers"
            :loading="isTableLoading"
            :isEmpty="!products?.length"
          >
            <template #body>
              <c-tr v-for="(data, index) in products" :key="data">
                <c-td-no-edit v-for="key in headers" :key="key">
                  <div class="py-2">
                    <div v-if="key.key === 'product_name'">
                      {{ data[key.key] }}
                    </div>
                    <div v-else-if="key.key === 'no'">
                      {{ ++index }}
                    </div>
                    <div v-else-if="key.type === 'input'" class="w-28">
                      <d-input
                        class="w-full"
                        type="number"
                        :disabled="key.isDisabled || data.amount <= 0"
                        :value="data[key.key]"
                        @change="onAddProductAmount(key.key, data, $event)"
                        :max="data.amount"
                      />
                    </div>
                    <div v-else>
                      {{ data[key.key] }}
                    </div>
                  </div>
                </c-td-no-edit>
              </c-tr>
            </template>
          </data-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import moment from "moment";

// store
const vanSellingOrdersStore = useVanSellingOrdersStore("main");

// emits
const emit = defineEmits(['closeDialog'])

// states
const route = useRoute();
const selectedDate = ref(moment().format("YYYY-MM-DDTHH:MM"));
const priceTypes = ref(null);
const selectedPriceTypeId = ref("");
const warehouses = ref(null);
const selectedWarehouseId = ref("");
const agents = ref(null);
const selectedAgents = ref("");
const productCategories = ref(null);
const selectedCategoriesFromDropDown = ref([]);
const selectedCategoryFromTabs = ref("");
const products = ref(null);
const comment = ref("");
const isTableLoading = ref(false);
const addedProducts = ref([]);

const headers = ref([
  {
    name: "№",
    checked: true,
    key: "no",
    type: "no",
    thWidth: "40px",
    bRadius: "8px",
  },
  {
    name: "Ассортимент",
    checked: true,
    key: "product_name",
    type: "asortiment",
    thWidth: "160px",
  },
  {
    name: "Цена",
    checked: true,
    key: "price",
    type: "price",
    thWidth: "100px",
  },
  {
    name: "Блок",
    checked: true,
    key: "block",
    type: "input",
    thWidth: "70px",
  },
  {
    name: "Количество",
    checked: true,
    key: "quantity",
    type: "input",
    thWidth: "120px",
  },
  {
    name: "На складе",
    checked: true,
    key: "amount",
    type: "amount",
    thWidth: "120px",
  },
  {
    name: "Сумма",
    checked: true,
    key: "sum",
    type: "input",
    isDisabled: true,
    thWidth: "120px",
  },
]);

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
    {
      field: "agent_type",
      value: ["VanSelling"],
    },
  ],
});

const warehousesParams = ref({
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

const productCategoriesParams = ref({
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
      name: "Дата заявки",
      key: "date-picker",
      type: "date-picker",
    },
    {
      name: "Тип цены",
      key: "priceTypes",
      type: "dropdown",
      get data() {
        return priceTypes.value || [];
      },
      get getSelectedData() {
        return selectedPriceTypeId.value;
      },
      set setSelectedData(value) {
        selectedPriceTypeId.value = value;
      },
      onLoadElse: async () => {
        await onLoadElsePriceTypes();
      },
      required: true,
    },
    {
      name: "Склад",
      key: "warehouses",
      type: "dropdown",
      get data() {
        return warehouses.value || [];
      },
      get getSelectedData() {
        return selectedWarehouseId.value;
      },
      set setSelectedData(value) {
        selectedWarehouseId.value = value;
      },
      onLoadElse: async () => {
        await onLoadElseWarehouses();
      },
      required: true,
    },
  ],
  secondRow: [
    {
      name: "Агенты",
      key: "agents",
      type: "dropdown",
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
      required: true,
    },
    {
      name: "Продукт категорий",
      key: "productCategories",
      type: "dropdown",
      get data() {
        return productCategories.value || [];
      },
      get getSelectedData() {
        return selectedCategoriesFromDropDown.value;
      },
      set setSelectedData(value) {
        onSetSelectedCategory(value);
      },
      onLoadElse: async () => {
        await onLoadElseProductCategories();
      },
      required: true,
      isMultiSelect: true,
    },
    {
      name: "Комментарии",
      key: "comment",
      type: "comment",
    },
  ],
});

// hooks

watchEffect(async () => {
  if (
    selectedCategoryFromTabs.value &&
    selectedWarehouseId.value &&
    selectedPriceTypeId.value
  ) {
    isTableLoading.value = true;
    await getSharedProducts();
    isTableLoading.value = false;
  }
});

const isSharedProductsParamsSelected = computed(() => {
  return (
    selectedCategoryFromTabs.value &&
    selectedWarehouseId.value &&
    selectedPriceTypeId.value
  );
});

const selectedProductCategoryItems = computed(() => {
  if (productCategories.value && selectedCategoriesFromDropDown.value.length) {
    return productCategories.value.items.filter((category) =>
      selectedCategoriesFromDropDown.value.includes(category.id)
    );
  }
  return [];
});

const isSaveBtnDisabled = computed(() => {
  if (addedProducts.value.length && selectedAgents.value.length) {
    return false;
  }
  return true;
});

const isOrder = computed(() => {
  return route.query.order_type === "1";
});

// methods
const onOpenDropdown = async (value, state) => {
  if (state === "agents" && !agents.value) {
    await getAgents();
    return;
  }
  if (state === "warehouses" && !warehouses.value) {
    await getWarehouses();
    return;
  }
  if (state === "priceTypes" && !priceTypes.value) {
    await getPriceTypes();
    return;
  }
  if (state === "productCategories" && !productCategories.value) {
    await getProductCategories();
    return;
  }
  return;
};

const search = async (value, state) => {
  if (state === "agents") {
    agentsParams.value.search = value;
    await getAgents();
    return;
  } else if (state === "warehouses") {
    warehousesParams.value.search = value;
    await getWarehouses();
    return;
  } else if (state === "priceTypes") {
    priceTypesParams.value.search = value;
    await getPriceTypes();
    return;
  } else if (state === "productCategories") {
    productCategoriesParams.value.search = value;
    await getProductCategories();
    return;
  } else return;
};

const getSingleSelectedItemName = (state, selectedItemId) => {
  if (state && selectedItemId) {
    const item = state.items.find((item) => item.id === selectedItemId);
    return (
      item?.name ||
      item?.first_name ||
      item?.last_name ||
      item?.middle_name ||
      "---"
    );
  }
};

const getMultiSelectedItemName = (state, selectedItemsIdArr) => {
  if (state && selectedItemsIdArr.length) {
    const namesArr = (state?.items || [])
      .map((category) =>
        selectedItemsIdArr.includes(category.id) ? category.name : undefined
      )
      .filter(Boolean);
    if (namesArr.length > 3) {
      return namesArr.slice(0, 3).join(", ") + ` и eщё ${namesArr.length - 3}`;
    }
    return namesArr?.join(", ");
  }
};

const onSetSelectedCategory = (value) => {
  selectedCategoriesFromDropDown.value = value;
  selectedCategoryFromTabs.value = selectedCategoriesFromDropDown.value[0];
};

const onAddProductAmount = (inputType, product, value) => {
  const { amount, price, quantity_in_package, product_id } = product;

  if (product.quantity > amount) {
    product.quantity = amount;
  }

  if (inputType === "quantity") {
    updateQuantity(value, product, quantity_in_package);
  } else if (inputType === "block") {
    updateBlock(value, product, quantity_in_package);
  }

  onSaveToAddedProducts(product_id, product.quantity, price);

  updateSum(product, price);
};

const updateQuantity = (value, product, quantity_in_package) => {
  product.quantity = value;
  if (typeof quantity_in_package === "number" && quantity_in_package !== 0)
    product.block = parseFloat(product.quantity / quantity_in_package);
};

const updateBlock = (value, product, quantity_in_package) => {
  product.block = value;
  if (typeof quantity_in_package === "number" && quantity_in_package !== 0)
    product.quantity = product.block * quantity_in_package;
};

const updateSum = (product, price) => {
  product.sum = product.quantity * price;
};

const onSaveToAddedProducts = (product_id, quantity, price) => {
  const isAlreadyExist = addedProducts.value.find(
    (product) => product.product_id === product_id
  );

  if (!isAlreadyExist) {
    addedProducts.value.push({
      product_id,
      count: quantity,
      price,
    });
  } else {
    isAlreadyExist.count = quantity;
  }
};

const getAgents = async () => {
  agents.value = await vanSellingOrdersStore.getAgents(agentsParams.value);
};

const onLoadElseAgents = async () => {
  agentsParams.value.page_size += 10;
  await getAgents();
};

const getWarehouses = async () => {
  warehouses.value = await vanSellingOrdersStore.getWarehouses(
    warehousesParams.value
  );
};

const onLoadElseWarehouses = async () => {
  warehousesParams.value.page_size += 10;
  await getWarehouses();
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

const getProductCategories = async () => {
  productCategories.value = await vanSellingOrdersStore.getProductCategories(
    productCategoriesParams.value
  );
};

const onLoadElseProductCategories = async () => {
  productCategoriesParams.value.page_size += 10;
  await getProductCategories();
};

const getSharedProducts = async () => {
  const sharedParams = {
    warehouseId: selectedWarehouseId.value,
    priceTypeId: selectedPriceTypeId.value,
    categoryId: selectedCategoryFromTabs.value,
  };

  products.value = await vanSellingOrdersStore.getProductsFromSharedApi(
    sharedParams
  );
};

const onSave = async () => {
  const data = {
    is_active: true,
    order_date: selectedDate.value,
    agent_id: selectedAgents.value,
    price_type_id: selectedPriceTypeId.value,
    warehouse_id: selectedWarehouseId.value,
    comment: comment.value,
    products: addedProducts.value,
  };

  await vanSellingOrdersStore.setVanSellingOrderRequest(data);
  await vanSellingOrdersStore.refresh()
  emit('closeDialog')
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

.order:first-child {
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
}

.order:last-child {
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
}

.bgc {
  background: #fff;
  color: #000;
}
</style>
