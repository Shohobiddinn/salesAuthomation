<template>
  <rounded-white-container>
    <div class="flex flex-col gap-4">
      <div class="flex flex-row">
        <span class="text-[18px] fw-6">
          Критерия
        </span>
      </div>
<!--      <div>-->
<!--        <i-title>-->
<!--          Даты-->
<!--        </i-title>-->
<!--        <div class="flex-row">-->
<!--          <select class="border w-full h-[42px] bg-[#FAFDFD] rounded-lg mt-[1px] mr-[18px] pl-[15px]">-->
<!--            <option value="">Выбрать</option>-->
<!--            <option value="">hello</option>-->
<!--            <option value="">hello</option>-->
<!--            <option value="">hello</option>-->
<!--          </select>-->
<!--        </div>-->
<!--      </div>-->
      <div>
        <i-title>
          Статус
        </i-title>
        <menu-btn class="w-full" @click="onOpenDropdown($event, 'statuses')">
          <template #btn>
            <m-btn-outlined
                class="border-grey flex items-center w-full gap-2">
              <fa-icon hash="&#xf078" />
              <span>Выбрать</span>
            </m-btn-outlined>
          </template>
          <template #content>
            <flex-col
                class="gap-2 max-h-88 overflow-auto pr-2"
            >
              <search-input @change="search($event, 'statuses')" />
              <FilterItemsStatus
                  v-if="statuses"
                  :data="statuses"
                  :selectedItems="data.order_statuses"
                  @onSelectItems="selectStatus"
                  @onLoadElse="onLoadElseStatus"
              />
            </flex-col>
          </template>
        </menu-btn>
      </div>
      <div>
        <i-title>
          Сегменты клиентов
        </i-title>
        <menu-btn class="w-full" @click="onOpenDropdown($event, 'segments')">
          <template #btn>
            <m-btn-outlined
                class="border-grey flex items-center w-full gap-2">
              <fa-icon hash="&#xf078" />
              <span>Выбрать</span>

            </m-btn-outlined>
          </template>
          <template #content>
            <flex-col
                class="gap-2 max-h-88 overflow-auto pr-2"
            >
              <search-input @change="search($event, 'segments')" />
              <FilterItems
                  v-if="segments"
                  :data="segments"
                  :selectedItems="data.segments"
                  @onSelectItems="selectSegments"
                  @onLoadElse="onLoadElseSegments"
              />
            </flex-col>
          </template>
        </menu-btn>
      </div>
      <div>
        <i-title>
          Территория
        </i-title>
        <menu-btn class="w-full" @click="onOpenDropdown($event, 'territory')">
          <template #btn>
            <m-btn-outlined
                class="border-grey flex items-center w-full gap-2">
              <fa-icon hash="&#xf078" />
              <!--              <span v-if="cols.key === 'warehouses'">-->
              <!--                <span v-if="warehousesName !== null">{{warehousesName?.slice(0,10)}} ещё {{warehousesNames?.length}}</span>-->
              <!--                <span v-else>Выбрать</span>-->
              <!--              </span>-->
              <!--              <span v-if="cols.key === 'priceType'">-->
              <!--                <span v-if="priceTypesN.name !== null">{{priceTypesN.name?.slice(0,10)}} ещё {{priceTypesN.names?.length}}</span>-->
              <!--                <span v-else>Выбрать</span>-->
              <!--              </span>-->
              <!--              <span v-if="cols.key === 'paymentType'">-->
              <!--                <span v-if="paymentTypesN.name !== null">{{paymentTypesN.name?.slice(0,10)}} ещё {{paymentTypesN.names?.length}}</span>-->
              <!--                <span v-else>Выбрать</span>-->
              <!--              </span>-->
              <!--              <span v-if="cols.key !== 'warehouses' && cols.key !== 'priceType' && cols.key !== 'paymentType'">Выбрать</span>-->
              <span>Выбрать</span>

            </m-btn-outlined>
          </template>
          <template #content>
            <flex-col
                class="gap-2 max-h-88 overflow-auto pr-2"
            >
              <search-input @change="search($event, 'territory')" />
              <FilterItems
                  v-if="territories"
                  :data="territories"
                  :selectedItems="data.territories"
                  @onSelectItems="selectTerritories"
                  @onLoadElse="onLoadElseTerritories"
              />
            </flex-col>
          </template>
        </menu-btn>
      </div>
      <div>
        <i-title>
          Тип цены
        </i-title>
        <menu-btn class="w-full" @click="onOpenDropdown($event, 'priceType')">
          <template #btn>
            <m-btn-outlined
                class="border-grey flex items-center w-full gap-2">
              <fa-icon hash="&#xf078" />
              <span>Выбрать</span>

            </m-btn-outlined>
          </template>
          <template #content>
            <flex-col
                class="gap-2 max-h-88 overflow-auto pr-2"
            >
              <search-input @change="search($event, 'priceType')" />
              <FilterItems
                  v-if="priceTypes"
                  :data="priceTypes"
                  :selectedItems="data.price_types"
                  @onSelectItems="selectPriceType"
                  @onLoadElse="onLoadElsePriceType"
              />
            </flex-col>
          </template>
        </menu-btn>
      </div>
      <div>
        <i-title>
          Тип оплаты
        </i-title>
        <menu-btn class="w-full" @click="onOpenDropdown($event, 'paymentType')">
          <template #btn>
            <m-btn-outlined
                class="border-grey flex items-center w-full gap-2">
              <fa-icon hash="&#xf078" />
              <span>Выбрать</span>

            </m-btn-outlined>
          </template>
          <template #content>
            <flex-col
                class="gap-2 max-h-88 overflow-auto pr-2"
            >
              <search-input @change="search($event, 'paymentType')" />
              <FilterItems
                  v-if="currency"
                  :data="currency"
                  :selectedItems="data.currencies"
                  @onSelectItems="selectCurrency"
                  @onLoadElse="onLoadElseCurrency"
              />
            </flex-col>
          </template>
        </menu-btn>
      </div>
    </div>
  </rounded-white-container>
</template>

<script setup>
// State
const props = defineProps({
  data:Object
})
import {useFilterListStore} from "~/stores/list-for-filter/list.store";

const men = ref({
  isSelectWarehouse: false,
  isSelectAgent: false,
  isSelectProduct: false,
  isSelectType: false,
})
const filterStore = useFilterListStore('')
const orderStore = useOrdersStore('')
const statuses =  ref(null)
const territories = ref(null)
const priceTypes = ref(null)
const currency = ref(null)
const segments = ref(null)
const usersParams = ref({
  page: 1,
  page_size: 10,
  search: null,
  order_by: {
    field: "id",
    is_asc: true,
  },
});
function selectStatus(param){
  props.data.order_statuses = param
}
function selectTerritories(param){
  props.data.territories = param
}
const onLoadElseStatus = async () => {
  usersParams.value.page_size += 10;
  await getStatus();
};
const onLoadElseTerritories = async () => {
  usersParams.value.page_size += 10;
  await getTerritories();
};
const onLoadElsePriceType = async () => {
  usersParams.value.page_size += 10;
  await getPriceTypes();
};
const onLoadElseCurrency = async () => {
  usersParams.value.page_size += 10;
  await getCurrency();
};
const onLoadElseSegments = async () => {
  usersParams.value.page_size += 10;
  await getSegments();
};
const getStatus = async () => {
  const data = await orderStore.getOrderStatus(usersParams.value);
  statuses.value = data
  statuses.value = JSON.parse(JSON.stringify(data))
};
const getTerritories = async () => {
  const data = await filterStore.getTerritories(usersParams.value);
  territories.value = data
  territories.value = JSON.parse(JSON.stringify(data))
};
const getPriceTypes = async () => {
  const data = await filterStore.getPriceType(usersParams.value);
  priceTypes.value = data
  priceTypes.value = JSON.parse(JSON.stringify(data))
};
const getCurrency = async () => {
  const data = await filterStore.getCurrency(usersParams.value);
  currency.value = data
  currency.value = JSON.parse(JSON.stringify(data))
  console.log('currency' , currency.value)
};
const getSegments = async () => {
  const data = await filterStore.getSegments(usersParams.value);
  segments.value = data
  segments.value = JSON.parse(JSON.stringify(data))
};
function selectPriceType(param, names){
  props.data.price_types = param
  // priceTypesN.value.names = names
  // priceTypesN.value.name = names[0]
}
function selectCurrency(param,names){
  console.log('param',param)
  console.log('props.data.currencies',props.data.currencies)
  props.data.currencies = param
  // paymentTypesN.value.names = names
  // paymentTypesN.value.name = names[0]
}
function selectSegments(param,names){
  props.data.segments = param
}
const onOpenDropdown = async (value, state) => {
  // if ((state === "agent") && !agents.value) {
  //   await getUsers();
  //   return;
  // }
  if (state === "territory" && !territories.value) {
    await getTerritories();
    return;
  }
  if (state === "segments" && !segments.value) {
    await getSegments();
    return;
  }

  if (state === "statuses" && !statuses.value) {
    await getStatus();
    return;
  }
  // if (state === "type" && !types.value) {
  //   await getTypes();
  //   return;
  // }
  if (state === "priceType" && !priceTypes.value) {
    await getPriceTypes();
    return;
  }
  if (state === "paymentType" && !currency.value) {
    await getCurrency();
    return;
  }
  // if (state === "productCategory" && !productCategory.value) {
  //   await getProductCategory();
  //   return;
  // }
  // if (state === "categoryClients" && !categoryClients.value) {
  //   await getClientCategory();
  //   return;
  // }
  // if (state === "warehouses" && !warehouses.value) {
  //   await getWarehouses();
  //   return;
  // }
  // if (state === "expeditor" && !expeditors.value) {
  //   await getExpeditors();
  //   return;
  // }
  return;
};
const search = async (value, state) => {
  // if (state === "agent") {
  //   usersParams.value.search = value;
  //   await getUsers();
  //   return;
  // }
  // if (state === "territory") {
  //   territoriesParams.value.search = value;
  //   await getTerritories();
  //   return;
  // }
  //
  // if (state === "priceType") {
  //   usersParams.value.search = value;
  //   await getPriceTypes();
  //   return;
  // }
  // if (state === "paymentType") {
  //   usersParams.value.search = value;
  //   await getCurrency();
  //   return;
  // }
  // if (state === "productCategory") {
  //   usersParams.value.search = value;
  //   await getProductCategory();
  //   return;
  // }
  // if (state === "categoryClients") {
  //   usersParams.value.search = value;
  //   await getClientCategory();
  //   return;
  // }
  // if (state === "warehouses") {
  //   usersParams.value.search = value;
  //   await getWarehouses();
  //   return;
  // }
  // if (state === "expeditor") {
  //   usersParams.value.search = value;
  //   await getExpeditors();
  //   return;
  // }
  // if (state === "statuses") {
  //   territoriesParams.value.search = value;
  //   await getTaras();
  //   return;
  // }
  return;
};
// Methods
const clickOutside = () => {
  men.value.isSelectWarehouse = false;
  men.value.isSelectAgent = false;
  men.value.isSelectProduct = false;
  men.value.isSelectType = false;
}
</script>

<style scoped>
.h-100vh{
  height: calc(100vh - 70px);
}
label input {
  display: none; /* Hide the default checkbox */
}

/* Style the artificial checkbox */
label span {
  height: 20px;
  width: 20px;
  border-radius: 4px;
  border: 1px solid #D2D7D7;
  display: inline-block;
  position: relative;
}

/* Style its checked state...with a ticked icon */
[type=checkbox]:checked + span:before {
  content: '\f106';
  position: absolute;
  font-weight: 700;
  color: transparent;
  transition: all .4s;
  left: 7px;
  top: 2px;
  width: 5px;
  height: 11px;
  border: solid #299B9B;
  border-width: 0 1px 1px 0;
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}
</style>
