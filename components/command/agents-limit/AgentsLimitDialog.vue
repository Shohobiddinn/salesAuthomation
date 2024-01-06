<template>
  <div class="w-full">
    <div class="text-[20px] font-[600] mt-[-20px]">Ограничении</div>
    <div class="flex justify-between w-full mt-[-20px] mt-4">
      <div class="text-[16px] font-[400]">
        Агенты: {{ agentLimits?.last_name ? agentLimits?.last_name : '-' }} {{ agentLimits?.middle_name ? agentLimits?.middle_name : '-' }} {{ agentLimits?.first_name ? agentLimits?.first_name : '-' }}
      </div>
      <flex-row class="gap-3 w-1/2 items-center">
        <div class="flex w-1/4 justify-end">
          <div class="text-gray-3 fs-14 fw-4 whitespace-nowrap">Группа товаров</div>
        </div>
        <menu-btn class="w-3/4 relative z-47" @click="onOpenDropdown('product-groups')">
          <template #btn>
            <m-btn-outlined class="border-grey flex items-center w-full gap-2">
              <fa-icon hash="&#xf078" />
              {{
                selectedProductGroupId
                  ? getProductGroupName(selectedProductGroupId)
                  : "Выбрать"
              }}
            </m-btn-outlined>
          </template>
          <template #content>
            <div class="h-auto overflow-auto">
              <FilterItems
                :data="productGroups"
                :singleSelect="true"
                :selectedItems="selectedProductGroupId"
                @onSingleItemSelect="selectedProductGroupId = $event"
                @onLoadElse="loadElseProductGroups"
              />
            </div>
          </template>
        </menu-btn>
      </flex-row>
    </div>
    <div class="grid grid-cols-2 gap-6 w-full">
      <div>
        <div class="mb-[10px] font-[500]">Тип оплаты</div>
        <div class="border rounded-lg w-full h-[344px] mr-3 relative">
          <div class="absolute z-50 h-[55px] bg-[#fff] w-[93%] tara-search">
            <div class="mt-2 ml-[12px]">
              <search-input-border-none @updated="searchCurrency($event)"></search-input-border-none>
            </div>
          </div>
          <div class="w-[98%] h-full tara-content">
            <div class="mr-3 pt-[55px] h-full tara-content-item">
              <div
                v-for="item in currencies?.items"
                :key="item.id"
                class="p-[10px] tara-child"
              >
                <div
                  class="flex mt-1 check"
                >
                  <label>
                    <input type="checkbox" :id="item.id" :checked="isPriceTypeChecked(item.id)" @change="onCheckPriceType(item.id)"/>
                    <span></span>
                  </label>
                  <label :for="item.id" class="ml-[10px]">{{
                    item.name
                  }}</label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div class="mb-[10px] font-[500]">Продукты</div>
        <div class="border rounded-lg w-full h-[344px] mr-3 relative">
          <div class="absolute z-42 h-[55px] bg-[#fff] w-[93%] tara-search">
            <div class="mt-2 ml-[12px]">
              <search-input-border-none @updated="searchProducts($event)"></search-input-border-none>
            </div>
          </div>
          <div class="w-[98%] h-full tara-content">
            <div class="mr-3 pt-[55px] h-full tara-content-item">
              <div
                v-for="product in products"
                :key="product.product_id"
                class="p-[10px] tara-child"
              >
                <div class="flex mt-1 check">
                  <label>
                    <input type="checkbox" :id="product.product_id" :checked="isProductChecked(product.product_id)" @change="onCheckProduct(product.product_id)"/>
                    <span></span>
                  </label>
                  <label :for="product.product_id" class="ml-[10px]">{{ product.product_name }}</label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex justify-end mt-4 mb-4">
      <m-btn @click="onSave">Сохранить</m-btn>
    </div>
  </div>
</template>

<script setup>
// store
const agentsLimitStore = useAgentsLimitStore("main");

// state
const agentLimits = ref();
const currencies = ref();
const products = ref();
const productGroups = ref();
const selectedProductGroupId = ref(null);
const methodData = ref({
  agent_id: agentsLimitStore.editDialog,
  products: [],
  price_types: [],
})

const postAgentLimitData = ref({
  agent_id: agentsLimitStore.editDialog,
  products: [],
  price_types: [],
});

const currenciesParams = ref({
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

const productGroupsParams = ref({
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
const onOpenDropdown = async (state) => {
  if(state === 'product-groups' && !productGroups.value){
    await getProductGroups()
  }
}

const getProductGroups = async () => {
  productGroups.value = await agentsLimitStore.getProductGroups(
    productGroupsParams.value
  );
};

const loadElseProductGroups = async () => {
  productGroupsParams.value.page_size = +10;
  await getProductGroups();
};

const getProductGroupName = (groupId) => {
  if(productGroups.value){
    return productGroups.value.items?.find(group => group.id === groupId)?.name
  }else return
}

const searchProducts = async (value) => {
  products.value = products.value.filter(product => product.product_name.includes(value))
  if(!value){
    products.value = await agentsLimitStore.getProductsByGroupId(selectedProductGroupId.value)
  }
}

const searchCurrency = async (value) => {
  currencies.value.items = currencies.value.items?.filter(currency => currency.name.includes(value))
  if(!value){
    currencies.value = await agentsLimitStore.getPriceTypes(currenciesParams.value)
  }
}

const isPriceTypeChecked = (itemId) => {
  const findId = agentLimits.value?.price_types.find(price => price.price_type_id === itemId)
  return !!findId
}

const isProductChecked = (itemId) => {
  const findId = agentLimits.value?.products.find(product => product.product_id === itemId)
  return !!findId
}

const onCheckProduct = (itemId) => {
  const isChecked = methodData.value.products.find(product => product.product_id === itemId)
  if(!!isChecked){
    methodData.value.products = methodData.value.products.filter(product => product.product_id !== itemId)
  } else {
    methodData.value.products = [...methodData.value.products, {product_id: itemId}]
  }
}

const onCheckPriceType = (itemId) => {
  const isChecked = methodData.value.price_types.find(price => price.price_type_id === itemId)
  if(!!isChecked){
    methodData.value.price_types = methodData.value.price_types.filter(price => price.price_type_id !== itemId)
  } else {
    methodData.value.price_types = [...methodData.value.price_types, {price_type_id: itemId}]
  }
}

const onSave = async () => {
  await agentsLimitStore.add(methodData.value)
  agentsLimitStore.closeEditDialog()
}

onMounted(async () => {
  const [currenciesData, productsData] = await Promise.all([
    agentsLimitStore.getPriceTypes(currenciesParams.value),
    agentsLimitStore.getProductsByGroupId(selectedProductGroupId.value),
  ]);
  currencies.value = currenciesData;
  products.value = productsData;

  if(agentsLimitStore.editDialog){
    agentLimits.value = await agentsLimitStore.getAgentLimitDetail(agentsLimitStore.editDialog);
    methodData.value.price_types = agentLimits.value.price_types
    methodData.value.products = agentLimits.value.products
  }
});

watchEffect(async () => {
  if(selectedProductGroupId.value){
    products.value = await agentsLimitStore.getProductsByGroupId(selectedProductGroupId.value)
  }
})
</script>

<style scoped>
.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #ffffff;
  z-index: 1;
}

.dropdown-content a {
  text-decoration: none;
  display: block;
}

.dropdown-content a:hover {
  background-color: #ddd;
}

.show {
  display: block;
}
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  border-radius: 4px;
}

::-webkit-scrollbar-thumb {
  border-radius: 8px;
}
.check label input {
  display: none; /* Hide the default checkbox */
}

/* Style the artificial checkbox */
.check label span {
  height: 20px;
  width: 20px;
  border-radius: 4px;
  border: 1px solid #d2d7d7;
  display: inline-block;
  position: relative;
}

/* Style its checked state...with a ticked icon */
.check [type="checkbox"]:checked + span:before {
  content: "\f106";
  position: absolute;
  font-weight: 700;
  color: transparent;
  transition: all 0.4s;
  left: 7px;
  top: 2px;
  width: 5px;
  height: 11px;
  border: solid #299b9b;
  border-width: 0 1px 1px 0;
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}
.tara-content {
  overflow-y: scroll;
  cursor: pointer;
}
.tara-search {
  border-bottom: 1px solid #e1e4e4;
  border-top-left-radius: 8px;
}
.tara-content-item {
  border-right: 1px solid #e1e4e4;
}
.tara-child {
  border-bottom: 1px solid #e1e4e4;
}
</style>
