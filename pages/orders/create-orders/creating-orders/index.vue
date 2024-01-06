<template>
  <div>
    <div>
      <div class="flex justify-between">
        <button
          @click="$router.go(-1)"
          class="h-11 px-11 mt-4 bg-white text-black rounded-lg border"
        >
          <div class="flex">
            <IconArrowLeft class="mt-1 mr-2.1"></IconArrowLeft>
            Назад
            <slot></slot>
          </div>
        </button>
      </div>
      <form id="app" class="w-full" @submit="save">
        <div class="mt-4">
          <rounded-white-container>
            <div class="flex">
              <div class="mt-3 w-[40%]">
                <div class="flex justify-between">
                  <div class="text-[#424F4F] leading-[22px] mt-1">
                    Имя клиента
                  </div>
                </div>
                <div
                  v-if="clientsEmployees?.length"
                  class="text-[24px] text-black leading-[33px]"
                >
                  {{ clientsEmployees[0]?.client_name }}
                </div>
              </div>
              <div class="p-3 mx-3 w-[60%] flex flex-col gap-2">
                <div class="w-full flex flex-col gap-2">
                  <div class="w-full">
                    <div class="mb-2">
                      <span class="fs-14">Дата Создание</span>
                    </div>
                    <DInputDatePicker
                      :value="data.consignation_term"
                      withoutTime
                      @change="(newDate) => (data.consignation_term = newDate)"
                    />
                  </div>
                  <flex-col class="gap-2.5">
                    <div>Агент <span class="text-red-3 fs-14">*</span></div>
                    <menu-btn class="h-11 w-full">
                      <template #btn>
                        <m-btn-outlined
                          class="border-grey flex items-center w-full justify-between"
                        >
                          <div class="flex items-center gap-2">
                            <fa-icon hash="&#xf078" />
                            {{
                              data.agent_id
                                ? getSelectedName("agent", data.agent_id)
                                : "Выбрать"
                            }}
                          </div>
                        </m-btn-outlined>
                      </template>
                      <template #content>
                        <div class="overflow-auto">
                          <FilterItems
                            :data="getEmployedAgentsByClientId"
                            :singleSelect="true"
                            :selectedItems="data.agent_id"
                            @onSingleItemSelect="data.agent_id = $event"
                          />
                        </div>
                      </template>
                    </menu-btn>
                  </flex-col>
                  <flex-col class="gap-2 5">
                    <div>Тип цена <span class="text-red-3 fs-14">*</span></div>
                    <menu-btn class="h-11 w-full">
                      <template #btn>
                        <m-btn-outlined
                          @click="onOpenDropdown('priceTypes')"
                          class="border-grey flex items-center w-full gap-2"
                        >
                          <fa-icon hash="&#xf078" />
                          {{
                            data?.price_type_id
                              ? getSelectedName(
                                  "priceTypes",
                                  data.price_type_id
                                )
                              : "Выбрать"
                          }}
                        </m-btn-outlined>
                      </template>
                      <template #content>
                        <div class="overflow-auto">
                          <FilterItems
                            :data="priceTypes"
                            :singleSelect="true"
                            :selectedItems="data?.price_type_id"
                            @onSingleItemSelect="data.price_type_id = $event"
                            @onLoadElse="onLoadElsePriceTypes"
                          />
                        </div>
                      </template>
                    </menu-btn>
                  </flex-col>

                  <flex-col class="gap-2 5">
                    <div>
                      Направления торговли
                      <span class="text-red-3 fs-14">*</span>
                    </div>
                    <menu-btn class="h-11 w-full">
                      <template #btn>
                        <m-btn-outlined
                          @click="onOpenDropdown('tradeDirections')"
                          class="border-grey flex items-center w-full gap-2"
                        >
                          <fa-icon hash="&#xf078" />
                          {{
                            data?.trade_direction_id
                              ? getSelectedName(
                                  "tradeDirections",
                                  data.trade_direction_id
                                )
                              : "Выбрать"
                          }}
                        </m-btn-outlined>
                      </template>
                      <template #content>
                        <div class="overflow-auto">
                          <FilterItems
                            :data="tradeDirections"
                            :singleSelect="true"
                            :selectedItems="data?.trade_direction_id"
                            @onSingleItemSelect="
                              data.trade_direction_id = $event
                            "
                            @onLoadElse="onLoadElseTradeDirections"
                          />
                        </div>
                      </template>
                    </menu-btn>
                  </flex-col>

                  <flex-col class="gap-2 5">
                    <div>
                      Тип бонуса
                      <span class="text-red-3 fs-14">*</span>
                    </div>
                    <menu-btn class="h-11 w-full">
                      <template #btn>
                        <m-btn-outlined
                          @click="onOpenDropdown('bonusTypes')"
                          class="border-grey flex items-center w-full gap-2"
                        >
                          <fa-icon hash="&#xf078" />
                          {{
                            data?.bonus_type
                              ? getSelectedName("bonusTypes", data.bonus_type)
                              : "Выбрать"
                          }}
                        </m-btn-outlined>
                      </template>
                      <template #content>
                        <div class="overflow-auto">
                          <FilterItems
                            :data="bonusTypes"
                            :singleSelect="true"
                            :selectedItems="data?.bonus_type"
                            @onSingleItemSelect="data.bonus_type = $event"
                          />
                        </div>
                      </template>
                    </menu-btn>
                  </flex-col>
                  <flex-col class="gap-2 5">
                    <div>
                      Тип скидки
                      <span class="text-red-3 fs-14">*</span>
                    </div>
                    <menu-btn class="h-11 w-full">
                      <template #btn>
                        <m-btn-outlined
                          @click="onOpenDropdown('discountTypes')"
                          class="border-grey flex items-center w-full gap-2"
                        >
                          <fa-icon hash="&#xf078" />
                          {{
                            data?.discount_type
                              ? getSelectedName(
                                  "discountTypes",
                                  data.discount_type
                                )
                              : "Выбрать"
                          }}
                        </m-btn-outlined>
                      </template>
                      <template #content>
                        <div class="overflow-auto">
                          <FilterItems
                            :data="discountTypes"
                            :singleSelect="true"
                            :selectedItems="data?.discount_type"
                            @onSingleItemSelect="data.discount_type = $event"
                          />
                        </div>
                      </template>
                    </menu-btn>
                  </flex-col>
                  <flex-col class="gap-2 5">
                    <div>
                      Склад
                      <span class="text-red-3 fs-14">*</span>
                    </div>
                    <menu-btn class="h-11 w-full">
                      <template #btn>
                        <m-btn-outlined
                          @click="onOpenDropdown('warehouses')"
                          class="border-grey flex items-center w-full gap-2"
                        >
                          <fa-icon hash="&#xf078" />
                          {{
                            data?.warehouse_id
                              ? getSelectedName("warehouses", data.warehouse_id)
                              : "Выбрать"
                          }}
                        </m-btn-outlined>
                      </template>
                      <template #content>
                        <div class="overflow-auto">
                          <FilterItems
                            :data="warehouses"
                            :singleSelect="true"
                            :selectedItems="data?.warehouse_id"
                            @onSingleItemSelect="data.warehouse_id = $event"
                            @onLoadElse="onLoadElseWarehouses"
                          />
                        </div>
                      </template>
                    </menu-btn>
                  </flex-col>
                </div>
                <div
                  v-if="
                    data?.price_type_id && data?.agent_id && data?.warehouse_id
                  "
                  class="w-full flex flex-col gap-2"
                >
                  <div class="grid grid-cols-2 gap-4">
                    <d-select
                      :value="''"
                      @change="(value) => (data = value)"
                      id="Скидка"
                      title="Скидка"
                      :readonly="true"
                    ></d-select>
                    <d-select
                      :value="''"
                      @change="(value) => (data = value)"
                      id="Бонус"
                      title="Бонус"
                      :readonly="true"
                    ></d-select>
                  </div>
                  <div class="grid grid-cols-1 gap-4">
                    <d-select
                      :value="''"
                      @change="(value) => (data = value)"
                      id="Старые цены"
                      title="Старые цены"
                      :readonly="true"
                      class="w-full"
                    >
                    </d-select>
                  </div>
                  <div class="flex mt-4 items-center">
                    <div class="mt-3 w-[40%]">
                      <page-title20
                        :title="'Комментарии к заказу'"
                      ></page-title20>
                    </div>
                    <div class="p-3 mx-3 w-[60%]">
                      <DInput
                        placeholder="Комментарии"
                        :id="'Комментарии'"
                        type="text"
                        :value="data.comment"
                        title="Комментарии"
                        @change="(value) => (data.comment = value)"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </rounded-white-container>
        </div>
        <div>
          <OrdersCreateOrdersDataTableOrders
            :productCategory="productCategories"
            v-if="data?.price_type_id && data?.agent_id && data?.warehouse_id"
            :data="data"
          />
        </div>
        <div
          v-if="data?.price_type_id && data?.agent_id && data?.warehouse_id"
          class="flex justify-end mt-4"
        >
          <m-btn
            v-if="route.query?.id"
            type="submit"
            :loading="false"
            class="w-[200px]"
            >Создать</m-btn
          >
          <m-btn v-else type="submit" class="w-[200px]">Добавить</m-btn>
        </div>
      </form>
    </div>
    <d-modal v-if="errorDialog.isDialogOpen" @closeDialog="closeErrorDialog" name="Ошибка">
      <div class="w-full">
        <Internal500 :data="errorDialog"></Internal500>
      </div>
    </d-modal>
    <loading-modal v-if="loading" name="Управление меню таблицы">
      <Loading />
    </loading-modal>
    <d-modal
      v-if="isManual"
      @closeDialog="closeDialogManual"
      name="Manual bonus"
    >
      <div class="w-full">
        <OrdersCreateOrdersManualBonusDialog
          :form="orderStore.manualBonusData"
        />
      </div>
    </d-modal>
    <h-no-modal
      v-if="selectProduct"
      @closeDialog="closeDialogProduct"
      :dataContainerWidth="'370px'"
      name="Product"
    >
      <div class="w-full fw-6 text-[24px] text-center text-red-600 mt-6 mb-7">
        You should select product if you want to do order
      </div>
    </h-no-modal>
  </div>
</template>

<script setup>
import { notify } from "@kyvg/vue3-notification";
import moment from "moment";

// store
const orderStore = useOrdersStore("true");
const createOrdersStore = useCreateOrdersStore("main");

// states
const router = useRouter();
const route = useRoute();
let loading = ref(false);
let statusCode = ref(null);
let selectProduct = ref(false);
const isManual = ref(false);
const clientsEmployees = ref(null);
const agents = ref(null);
const priceTypes = ref(null);
const tradeDirections = ref(null);
const warehouses = ref(null);
const productCategories = ref(null);

const bonusTypes = ref({
  items: null,
});
const discountTypes = ref({
  items: null,
});
const data = ref({
  products: [],
  bonus_products: [],
  discount_type: null,
  bonus_type: null,
  consignation_term: moment().format("YYYY-MM-DD"),
  agent_id: "",
});
const errorDialog = ref({
  isDialogOpen: false,
  name: "",
  messages: "",
});
const bonusData = ref({
  warehouse_id: "",
  data: [],
});
const discountData = ref({
  data: [],
});

const params = ref({
  page: 1,
  page_size: 256,
  search: null,
  order_by: {
    field: "created_date",
    is_asc: true,
  }
});

const productCategoriesParams = ref({
  page: 1,
  page_size: 100,
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
      field: 'is_active',
      value: ['true']
    }
  ]
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
  filter: [
    {
      field: 'is_active',
      value: ['true']
    }
  ]
});

// methods
onMounted(async () => {
  if (!route.query?.request && !route.query?.exchange && !route.query?.refund && !route.query?.id) {
    router.go(-1);
    notify({ title: "Сначала выберите заявку или клиента!", type: "error" });
    return;
  }

  if (route.query?.request || route.query?.exchange || route.query?.refund) {
    data.value.client_id = route.query?.request || route.query?.exchange || route.query?.refund
    productCategories.value = await createOrdersStore.getProductcategories(
      productCategoriesParams.value
    );

    [agents.value, clientsEmployees.value] = await Promise.all([
      createOrdersStore.getAgents(params.value),
      createOrdersStore.getAgentByClientId(data.value.client_id),
    ]);
  }

  if (route.query?.id) {
    loading.value = true
    productCategories.value = await createOrdersStore.getProductcategories(
      productCategoriesParams.value
    );

    await orderStore.getWithId(route.query?.id);

    const {
      id,
      agent_id,
      agent_name,
      price_type_id,
      client_id,
      warehouse_id,
      territory_id,
      discount_type,
      bonus_type,
      trade_direction_id,
    } = orderStore.order;

    [agents.value, clientsEmployees.value] = await Promise.all([
      createOrdersStore.getAgents(params.value),
      createOrdersStore.getAgentByClientId(client_id),
    ]);

    await getPriceTypes();
    await getTradeDirections();
    await getBonusTypes();
    await getDiscountTypes();
    await getWarehouses();

    data.value.products = orderStore.order?.products?.map(
      ({ price, product_id, count }) => ({ price, product_id, count })
    );

    data.value.id = id;
    data.value.agent_id = agent_id;
    data.value.agent_name = agent_name;
    data.value.price_type_id = price_type_id;
    data.value.client_id = client_id;
    data.value.warehouse_id = warehouse_id;
    data.value.territory_id = territory_id;
    data.value.discount_type = discount_type;
    data.value.bonus_type = bonus_type;
    data.value.trade_direction_id = trade_direction_id;
    loading.value = false
  }
});

function closeErrorDialog() {
  errorDialog.value.isDialogOpen = false;
}

function closeDialogProduct() {
  selectProduct.value = false;
}

function closeDialogManual() {
  isManual.value = false;
}

const getEmployedAgentsByClientId = computed(() => {
  if (agents.value && clientsEmployees.value) {
    console.log(agents.value);
    return {
      items: clientsEmployees.value[0]?.employees.map((employee) =>
        agents.value.items?.find((agent) => agent.id === employee.employee_id)
      ),
    };
  }
  return {items: []};
});

const onOpenDropdown = async (state) => {
  if (state === "priceTypes" && !priceTypes.value) {
    await getPriceTypes();
    return;
  }
  if (state === "tradeDirections" && !tradeDirections.value) {
    await getTradeDirections();
    return;
  }
  if (state === "bonusTypes" && !bonusTypes.value.items) {
    await getBonusTypes();
    return;
  }
  if (state === "discountTypes" && !discountTypes.value.items) {
    await getDiscountTypes();
    return;
  }
  if (state === "warehouses" && !warehouses.value) {
    await getWarehouses();
    return;
  }
  return;
};

const getPriceTypes = async () => {
  priceTypes.value = await createOrdersStore.getPriceTypes(
    priceTypesParams.value
  );
};

const onLoadElsePriceTypes = async () => {
  priceTypesParams.value.page_size += 10;
  await getPriceTypes();
};

const getTradeDirections = async () => {
  tradeDirections.value = await createOrdersStore.getTradeDirections(
    tradeDirectionsParams.value
  );
};

const onLoadElseTradeDirections = async () => {
  tradeDirectionsParams.value.page_size += 10;
  await getTradeDirections();
};

const getBonusTypes = async () => {
  bonusTypes.value.items = await createOrdersStore.getBonusTypes();
};

const getDiscountTypes = async () => {
  discountTypes.value.items = await createOrdersStore.getDiscountTypes();
};

const getWarehouses = async () => {
  warehouses.value = await createOrdersStore.getWarehouses(
    warehousesParams.value
  );
};

const onLoadElseWarehouses = async () => {
  warehousesParams.value.page_size += 10;
  await getWarehouses();
};

const getSelectedName = (state, selectedId) => {
  if (state === "agent" && agents.value) {
    const selectedAgent = agents.value.items?.find(
      (agent) => agent.id === selectedId
    );
    return (
      selectedAgent?.first_name ||
      selectedAgent?.last_name ||
      selectedAgent?.middle_name
    );
  }
  if (state === "priceTypes" && priceTypes.value) {
    return priceTypes.value.items?.find(
      (priceType) => priceType.id === selectedId
    )?.name;
  }
  if (state === "tradeDirections" && tradeDirections.value) {
    return tradeDirections.value.items?.find(
      (tradeDirection) => tradeDirection.id === selectedId
    )?.name;
  }
  if (state === "bonusTypes" && bonusTypes.value.items) {
    return bonusTypes.value.items?.find(
      (bonusType) => bonusType.id === selectedId
    )?.name;
  }
  if (state === "discountTypes" && discountTypes.value.items) {
    return discountTypes.value.items?.find(
      (discountType) => discountType.id === selectedId
    )?.name;
  }
  if (state === "warehouses" && warehouses.value.items) {
    return warehouses.value.items?.find(
      (warehouse) => warehouse.id === selectedId
    )?.name;
  }
  return "";
};

const getManualBonus = async () => {
  data.value.products = data.value?.products?.filter((i) => !!i.product_id);
  orderStore.manualBonusData.data = [];
  for (let i = 0; i < data.value.products.length; i++) {
    orderStore.manualBonusData.data.push({
      product_id: data.value.products[i].product_id,
      amount: data.value.products[i].count,
      price: data.value.products[i].price,
    });
  }
  orderStore.bonuses = await orderStore.getManualBonus(
    orderStore.manualBonusData
  );
  for (let i = 0; i < orderStore.bonuses[0].products?.length; i++) {
    data.value?.bonus_products.push({
      bonus_id: orderStore.bonuses[0].bonus_id,
      product_id: orderStore.bonuses[0].products[i].product_id,
      count: 0,
      price: 0,
    });
  }
  orderStore.orderData = data.value;
};

const getBonus = async () => {
  data.value.products = data.value?.products?.filter((i) => !!i.product_id);
  bonusData.value.warehouse_id = data.value.warehouse_id;
  for (let i = 0; i < data.value.products.length; i++) {
    bonusData.value.data.push({
      product_id: data.value.products[i].product_id,
      amount: data.value.products[i].count,
      price: data.value.products[i].price,
    });
  }
  orderStore.bonuses = await orderStore.getOrderBonus(bonusData.value);
  if (orderStore.bonuses.length > 0) {
    for (let i = 0; i < orderStore.bonuses[0].products?.length; i++) {
      data.value.bonus_products.push({
        bonus_id: orderStore.bonuses[0].bonus_id,
        product_id: orderStore.bonuses[0].products[i].product_id,
        count: orderStore.bonuses[0].products[i].amount_in_warehouse,
        price: 0,
      });
    }
  }
  orderStore.orderData = data.value;
};

const getDiscounts = async () => {
  data.value.products = data.value?.products?.filter((i) => !!i.product_id);
  data.value.products = data.value?.products?.filter((i) => i.amount !== 0);
  data.value.products = data.value?.products?.filter((i) => i.price !== 0);
  for (let i = 0; i < data.value.products.length; i++) {
    discountData.value.data.push({
      product_id: data.value.products[i].product_id,
      amount: data.value.products[i].count,
      price: data.value.products[i].price,
    });
  }
  orderStore.discounts = await orderStore.getOrderDiscounts(discountData.value);
};

const saveData = async (e) => {
  await getDiscounts();
  if (orderStore.bonuses.length > 0) {
    router.push("/orders/create-orders/creating-orders/orders-bonus");
  } else {
    const queryKey = Object.keys(route.query)?.join("");
    try {
      loading.value = true;
      data.value.products = data.value?.products?.filter((i) => !!i.product_id);
      data.value.bonus_products = data.value?.bonus_products?.filter(
        (i) => i.price > 0
      );
      if(queryKey === 'request'){
        await orderStore.onAddRequest(data.value);
      }
      if(queryKey === 'exchange') {
        await orderStore.onAddExchange(data.value)
      }
      if(queryKey === 'refund') {
        await orderStore.onAddRefund(data.value)
      }
    } catch (error) {
      errorDialog.value.messages = error.response.data.Messages;
      errorDialog.value.name = error.response.statusText;
      statusCode.value = error.response.status;
    } finally {
      if (statusCode.value === 500) {
        errorDialog.value.isDialogOpen = true;
      } else {
        await orderStore.refresh();
        notify({ title: "Сохранено!" });
        router.push("/orders/orders");
      }
      loading.value = false;
    }
  }
};

const save = async (e) => {
  e.preventDefault();
  notify({ title: "Пожалуйста подождите!" });
  if (data.value.products.length > 0) {
    if (data.value.bonus_type == "3") {
      if (orderStore.manualBonusData?.warehouseId === "") {
        isManual.value = true;
        orderStore.manualBonusData.warehouseId = data.value.warehouse_id;
      } else {
        await getManualBonus();
        await saveData();
      }
    } else {
      await getBonus();
      await saveData();
    }
  } else {
    selectProduct.value = true;
  }
};
</script>
