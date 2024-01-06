<template>
  <rounded-white-container class="gap-4">
    <flex-row class="items-center justify-between gap-4">
      <div>
        <span class="text-gray-3 text-[20px] fw-6">
          Фильтр
        </span>
      </div>
      <!--      <div class="flex gap-4">-->
      <!--        <div class="flex flex-row items-center gap-2">-->
      <!--              <span class="text-gray-3 fs-14 fw-4">-->
      <!--                Статус-->
      <!--              </span>-->
      <!--          <label class="switch">-->
      <!--            <input v-model="filters.is_active" type="checkbox">-->
      <!--            <span class="slider round"></span>-->
      <!--          </label>-->
      <!--        </div>-->
      <!--        <DatePicker/>-->
      <!--      </div>-->
    </flex-row>
    <flex-row class="gap-4"
              v-for="s in filterStates">
      <flex-col class="w-full"
                v-for="cols in s"
                :key="cols.key">
        <i-title v-if="cols.key !== 'btn' && cols.key !== 'status'">
          {{ cols.name }}
        </i-title>
        <div class="flex gap-5">

          <menu-btn v-if="cols.key !== 'periodPlace'" class="w-full" @click="onOpenDropdown($event, cols.key)">
            <template #btn>
              <m-btn-outlined
                  class="border-grey flex items-center w-full gap-2">
                <fa-icon hash="&#xf078" />
                Выбрать
              </m-btn-outlined>
            </template>
            <template #content>
              <flex-col
                  class="gap-2 max-h-88 overflow-auto pr-2"
                  v-if="cols.key === 'category'"
              >
                <search-input @change="search($event, cols.key)" />
                <FilterItems
                    :data="category"
                    :selectedItems="filters.category"
                    @onSelectItems="selectCategory"
                    @onLoadElse="onLoadElseCategory"
                />
              </flex-col>
              <flex-col
                  class="gap-2 max-h-88 overflow-auto pr-2"
                  v-if="cols.key === 'warehouse'"
              >
                <search-input @change="search($event, cols.key)" />
                <FilterItems
                    :data="warehouse"
                    :selectedItems="filters.warehouse"
                    @onSelectItems="selectWarehouse"
                    @onLoadElse="onLoadElseWarehouse"
                />
              </flex-col>
              <flex-col
                  class="gap-2 max-h-88 overflow-auto pr-2"
                  v-if="cols.key === 'product'"
              >
                <search-input @change="search($event, cols.key)" />
                <FilterItems
                    :data="products"
                    :selectedItems="filters.product"
                    @onSelectItems="selectProducts"
                    @onLoadElse="onLoadElseProduct"
                />
              </flex-col>
            </template>
          </menu-btn>
          <d-input v-if="cols.key === 'periodPlace'" placeholder="Введите"
                   class="w-full"
                   type="number"
                   :required="true"
                   :value="filters.periodPlace"
                   @change="(v) => filters.periodPlace = v"
          />
        </div>

      </flex-col>
    </flex-row>
    <flex-row class="h-full justify-end items-end gap-2">
      <m-btn @click="$emit('filterClicked')" class="w-[22%] mt-5">
        Применить
      </m-btn>
      <sm-btn class="px-4 py-3">
        <IconReloadSVG/>
      </sm-btn>
    </flex-row>
  </rounded-white-container>
</template>

<script setup>

const props = defineProps({
  filters:Object
})
const filterStore = useFilterListStore('')


const category = ref(null);
const warehouse = ref(null)
const products = ref(null)

function selectCategory(param){
  props.filters.category = param
}
function selectWarehouse(param){
  props.filters.warehouse = param
}
function selectProducts(param){
  props.filters.product = param
}
const onLoadElseCategory = async () => {
  usersParams.value.page_size += 10;
  await getCategory();
};
const onLoadElseWarehouse = async () => {
  territoriesParams.value.page_size += 10;
  await getWarehouse();
};
const onLoadElseProduct = async () => {
  territoriesParams.value.page_size += 10;
  await getProducts();
};
const usersParams = ref({
  page: 1,
  page_size: 10,
  search: null,
  order_by: {
    field: "id",
    is_asc: true,
  },
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
      value: ['true'],
    }
  ],
});
const getCategory = async () => {
  const data = await filterStore.getProductCategory(territoriesParams.value);
  category.value = data
  category.value = JSON.parse(JSON.stringify(data))
};
const getWarehouse = async () => {
  const data = await filterStore.getWarehouses(territoriesParams.value);
  warehouse.value = data
  warehouse.value = JSON.parse(JSON.stringify(data))
};
const getProducts = async () => {
  const data = await filterStore.getProducts(territoriesParams.value);
  products.value = data
  products.value = JSON.parse(JSON.stringify(data))
};
const onOpenDropdown = async (value, state) => {
  if ((state === "category") && !category.value) {
    await getCategory();
    return;
  }
  if (state === "warehouse" && !warehouse.value) {
    await getWarehouse();
    return;
  }
  if (state === "product" && !products.value) {
    await getProducts();
    return;
  }
  return;
};
const search = async (value, state) => {
  if (state === "category") {
    usersParams.value.search = value;
    await getCategory();
    return;
  }
  if (state === "warehouse") {
    territoriesParams.value.search = value;
    await getWarehouse();
    return;
  }
  if (state === "product") {
    territoriesParams.value.search = value;
    await getProducts();
    return;
  }
  return;
};
const filterStates = ref({
  firstRow: [
    {
      name: "Агент",
      key: "category"
    },
    {
      name: "Территория",
      key: "warehouse"
    },
    {
      name: "Тара",
      key: "product"
    },
    {
      name: "История продаж",
      key: "periodPlace"
    }
  ]
});
const filterData = ref({
  agent:[],
  clientsCategory:[],
  territory:[],
})

</script>

<style scoped>

</style>
