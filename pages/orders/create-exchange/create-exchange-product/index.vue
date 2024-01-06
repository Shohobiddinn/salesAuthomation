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
        <div v-if="re.request">
          <div  class="mt-4">
            <rounded-white-container>
              <div class="flex">
                <div class="mt-3 w-[40%]">
                  <div class="flex justify-between">
                    <div class="text-[#424F4F] leading-[22px] mt-1">Имя клиента</div>
                  </div>
                  <div class="text-[24px] text-black leading-[33px]">
                    {{ getCompanyName }}
                  </div>
                </div>
                <div class="p-3 mx-3 w-[60%] flex flex-col gap-2">
                  <div class="w-full flex flex-col gap-2">
                    <div>
                      <div class="mb-2">
                        <span class="fs-14">Дата Создание</span>
                      </div>
                      <div class="date-picker">
                        <input @input="inputEvent($event.target.value)" v-model="data.order_date" class="my-input  fa-solid mainLoginInput p-2 border-primary-gray border-1 rounded-lg"
                               type="date"
                               placeholder="Выбрать">
                      </div>
<!--                      <d-input-date-picker-->
<!--                          :value="data.order_date"-->
<!--                          @change="(v) => (data.order_date = v)"-->
<!--                          placeholder="Введите"-->
<!--                          class="w-full"-->
<!--                          type="text"-->
<!--                      />-->
                    </div>
                    <d-select
                        :value="data.agent_id"
                        @change="(value) => (data.agent_id = value)"
                        id="Агент"
                        title="Агент"
                        :required="true"
                        @click="getAgents"
                    >
                      <option v-for="i in createOrdersStore.agents?.data" :value="i.id" :key="i.id">
                        {{ i.full_name }}
                      </option>
                    </d-select>
                    <d-select
                        :value="data.price_type_id"
                        @change="(value) => (data.price_type_id = value)"
                        id="Тип цена"
                        title="Тип цена"
                        :required="true"
                        @click="getPriceTypes"
                    >
                      <option
                          v-for="i in priceTypes?.items"
                          :value="i.id"
                          :key="i.id"
                      >
                        {{ i.name }}
                      </option>
                    </d-select>
                    <d-select
                        :value="data.trade_direction_id"
                        @change="(value) => (data.trade_direction_id = value)"
                        id="Тrade direction"
                        title="Торговое направление"
                        :required="true"
                    >
                      <option
                          v-for="i in tradeDirection.data?.items"
                          :value="i.id"
                          :key="i.id"
                      >
                        {{ i.name }}
                      </option>
                    </d-select>
                    <d-select
                        :value="data.bonus_type"
                        @change="(value) => (data.bonus_type = value)"
                        id="Bonus type"
                        title="Тип бонуса"
                        :required="true"
                    >
                      <option
                          v-for="i in exchangesStore.bonusType"
                          :value="i.id"
                          :key="i.id"
                      >
                        {{ i.name }}
                      </option>
                    </d-select>
                    <d-select
                        :value="data.discount_type"
                        @change="(value) => (data.discount_type = value)"
                        id="Discount type"
                        title="Тип скидки"
                        :required="true"
                    >
                      <option
                          v-for="i in exchangesStore.discountType"
                          :value="i.id"
                          :key="i.id"
                      >
                        {{ i.name }}
                      </option>
                    </d-select>
                    <d-select
                        :value="data.request_warehouse_id"
                        @change="(value) => (data.request_warehouse_id = value)"
                        id="warehouse"
                        :required="true"
                        title="Склад"
                        @click="getWarehouses"
                    >
                      <option v-for="i in warehouses?.items" :value="i.id" :key="i">
                        {{ i.name }}
                      </option>
                    </d-select>
                  </div>
                  <!--              <div-->
                  <!--                  v-if="data?.price_type_id && data?.agent_id && data?.request_warehouse_id"-->
                  <!--                  class="w-full flex flex-col gap-2"-->
                  <!--              >-->
                  <!--                <div class="grid grid-cols-2 gap-4">-->
                  <!--                  <d-select-->
                  <!--                      :value="''"-->
                  <!--                      @change="(value) => (data = value)"-->
                  <!--                      id="Скидка"-->
                  <!--                      title="Скидка"-->
                  <!--                      :readonly="true"-->
                  <!--                  ></d-select>-->
                  <!--                  <d-select-->
                  <!--                      :value="''"-->
                  <!--                      @change="(value) => (data = value)"-->
                  <!--                      id="Бонус"-->
                  <!--                      title="Бонус"-->
                  <!--                      :readonly="true"-->
                  <!--                  ></d-select>-->
                  <!--                </div>-->
                  <!--                <div class="grid grid-cols-1 gap-4">-->
                  <!--                  <d-select-->
                  <!--                      :value="''"-->
                  <!--                      @change="(value) => (data = value)"-->
                  <!--                      id="Старые цены"-->
                  <!--                      title="Старые цены"-->
                  <!--                      :readonly="true"-->
                  <!--                      class="w-full"-->
                  <!--                  >-->
                  <!--                    &lt;!&ndash; <option v-for="i in priceType.data?.items" :value="i.id">-->
                  <!--                    {{ i.name }}-->
                  <!--                  </option> &ndash;&gt;-->
                  <!--                  </d-select>-->
                  <!--                </div>-->
                  <!--                <div class="flex mt-4 items-center">-->
                  <!--                  <div class="mt-3 w-[40%]">-->
                  <!--                    <page-title20 :title="'Комментарии к заказу'"></page-title20>-->
                  <!--                  </div>-->
                  <!--                  <div class="p-3 mx-3 w-[60%]">-->
                  <!--                    <DInput-->
                  <!--                        placeholder="Комментарии"-->
                  <!--                        :id="'Комментарии'"-->
                  <!--                        type="text"-->
                  <!--                        :value="data.request_comment"-->
                  <!--                        title="Комментарии"-->
                  <!--                        @change="(value) => (data.request_comment = value)"-->
                  <!--                        :required="true"-->
                  <!--                    />-->
                  <!--                  </div>-->
                  <!--                </div>-->
                  <!--              </div>-->
                </div>
              </div>
            </rounded-white-container>
          </div>
          <div>
            <OrdersCreateExchangeCreateExchangeProductDataTableOrders
                v-if="data?.price_type_id && data?.agent_id && data?.request_warehouse_id"
                :data="data"
            />
          </div>
        </div>
        <div v-if="re.refund">
          <div  class="mt-4">
            <rounded-white-container>
              <div class="flex">
                <div class="mt-3 w-[40%]">
                  <div class="flex justify-between">
                    <div class="text-[#424F4F] leading-[22px] mt-1">Имя клиента</div>
                  </div>
                  <div class="text-[24px] text-black leading-[33px]">
                    {{ getCompanyName }}
                  </div>
                </div>
                <div class="p-3 mx-3 w-[60%] flex flex-col gap-2">
                  <div class="w-full flex flex-col gap-2">
                    <div>
                      <div class="mb-2">
                        <span class="fs-14">Дата Создание</span>
                      </div>
                      <div class="date-picker">
                        <input @input="inputEvent($event.target.value)" v-model="data.order_date" class="my-input  fa-solid mainLoginInput p-2 border-primary-gray border-1 rounded-lg"
                               type="date"
                               placeholder="Выбрать">
                      </div>
                    </div>
                    <d-select
                        :value="data.agent_id"
                        @change="(value) => (data.agent_id = value)"
                        id="Агент"
                        title="Агент"
                        :required="true"
                    >
                      <option v-for="i in createOrdersStore.agents?.data" :value="i.id" :key="i.id">
                        {{ i.full_name }}
                      </option>
                    </d-select>
                    <d-select
                        :value="data.price_type_id"
                        @change="(value) => (data.price_type_id = value)"
                        id="Тип цена"
                        title="Тип цена"
                        :required="true"
                    >
                      <option
                          v-for="i in priceTypes?.items"
                          :value="i.id"
                          :key="i.id"
                      >
                        {{ i.name }}
                      </option>
                    </d-select>
                    <d-select
                        :value="data.trade_direction_id"
                        @change="(value) => (data.trade_direction_id = value)"
                        id="Тrade direction"
                        title="Торговое направление"
                        :required="true"
                    >
                      <option
                          v-for="i in tradeDirection.data?.items"
                          :value="i.id"
                          :key="i.id"
                      >
                        {{ i.name }}
                      </option>
                    </d-select>
                    <d-select
                        :value="data.bonus_type"
                        @change="(value) => (data.bonus_type = value)"
                        id="Bonus type"
                        title="Тип бонуса"
                        :required="true"
                    >
                      <option
                          v-for="i in exchangesStore.bonusType"
                          :value="i.id"
                          :key="i.id"
                      >
                        {{ i.name }}
                      </option>
                    </d-select>
                    <d-select
                        :value="data.discount_type"
                        @change="(value) => (data.discount_type = value)"
                        id="Discount type"
                        title="Тип скидки"
                        :required="true"
                    >
                      <option
                          v-for="i in exchangesStore.discountType"
                          :value="i.id"
                          :key="i.id"
                      >
                        {{ i.name }}
                      </option>
                    </d-select>
                    <d-select
                        :value="data.refund_warehouse_id"
                        @change="(value) => (data.refund_warehouse_id = value)"
                        id="warehouse"
                        :required="true"
                        title="Склад"
                    >
                      <option v-for="i in warehouses?.items" :value="i.id" :key="i">
                        {{ i.name }}
                      </option>
                    </d-select>
                  </div>
                  <!--              <div-->
                  <!--                  v-if="data?.price_type_id && data?.agent_id && data?.refund_warehouse_id"-->
                  <!--                  class="w-full flex flex-col gap-2"-->
                  <!--              >-->
                  <!--                <div class="grid grid-cols-2 gap-4">-->

                  <!--                  <d-select-->
                  <!--                      :value="''"-->
                  <!--                      @change="(value) => (data = value)"-->
                  <!--                      id="Скидка"-->
                  <!--                      title="Скидка"-->
                  <!--                      :readonly="true"-->
                  <!--                  ></d-select>-->
                  <!--                  <d-select-->
                  <!--                      :value="''"-->
                  <!--                      @change="(value) => (data = value)"-->
                  <!--                      id="Бонус"-->
                  <!--                      title="Бонус"-->
                  <!--                      :readonly="true"-->
                  <!--                  ></d-select>-->
                  <!--                </div>-->
                  <!--                <div class="grid grid-cols-1 gap-4">-->
                  <!--                  <d-select-->
                  <!--                      :value="''"-->
                  <!--                      @change="(value) => (data = value)"-->
                  <!--                      id="Старые цены"-->
                  <!--                      title="Старые цены"-->
                  <!--                      :readonly="true"-->
                  <!--                      class="w-full"-->
                  <!--                  >-->
                  <!--                    &lt;!&ndash; <option v-for="i in priceType.data?.items" :value="i.id">-->
                  <!--                    {{ i.name }}-->
                  <!--                  </option> &ndash;&gt;-->
                  <!--                  </d-select>-->
                  <!--                </div>-->
                  <!--                <div class="flex mt-4 items-center">-->
                  <!--                  <div class="mt-3 w-[40%]">-->
                  <!--                    <page-title20 :title="'Комментарии к заказу'"></page-title20>-->
                  <!--                  </div>-->
                  <!--                  <div class="p-3 mx-3 w-[60%]">-->
                  <!--                    <DInput-->
                  <!--                        placeholder="Комментарии"-->
                  <!--                        :id="'Комментарии'"-->
                  <!--                        type="text"-->
                  <!--                        :value="data.request_comment"-->
                  <!--                        title="Комментарии"-->
                  <!--                        @change="(value) => (data.request_comment = value)"-->
                  <!--                        :required="true"-->
                  <!--                    />-->
                  <!--                  </div>-->
                  <!--                </div>-->
                  <!--              </div>-->
                </div>
              </div>
            </rounded-white-container>
          </div>
          <div>
            <OrdersCreateExchangeCreateExchangeProductRefundDataTable
                v-if="data?.price_type_id && data?.agent_id && data?.refund_warehouse_id"
                :data="data"
            />
          </div>
        </div>
        <div v-if="re.request" class="mt-3 flex justify-end">
          <input type="button" value="Запрос" @click="requ" :loading="false"
                 class="w-[200px] rounded-lg bg-blue-10 text-white py-2"></div>
        <div
            v-if="data?.price_type_id && data?.agent_id && data?.refund_warehouse_id && re.refund"
            class="flex justify-end mt-4"
        >
          <m-btn type="submit" :loading="false" class="w-[200px]">Создать</m-btn>
        </div>
      </form>
    </div>
    <d-modal v-if="errorMessage"
             @closeDialog="closeDialog"
             name="Ошибка">
      <div class="w-full">
        <Internal500 :data="data1"></Internal500>
      </div>
    </d-modal>
    <loading-modal v-if="loading"
                   name="Управление меню таблицы">
      <Loading/>
    </loading-modal>
  </div>

</template>

<script setup>
import { notify } from "@kyvg/vue3-notification";
import { useOrdersStore } from "~/stores/orders/orders/create-orders.store";
import moment from "moment";
import {useExchangeStore} from "~/stores/orders/exchanges/exchanges.store";
const tradeDirection = useTradeDirectionsStore('')
// state
const re = ref({
  request:true,
  refund:false
})
const exchangeStore = useExchangeStore('')

const router = useRouter();
const route = useRoute();
function requ(){
  re.value.refund = true
  re.value.request = false
}
async function inputEvent(value){
  data.value.order_date = value
}
const data = ref({
  client_id:'',
  agent_id:'',
  request_warehouse_id:'',
  refund_warehouse_id:'',
  price_type_id:'',
  trade_direction_id:null,
  order_date:moment().format("YYYY-MM-DD"),
  discount_type:'',
  bonus_type:'',
  reason:'',
  request_comment:'',
  refund_comment:'',
  requesting_products: [],
  refunding_products: []
});

const orderStore = useOrdersStore("true");
const exchangesStore = useExchangeStore('')
const bonusStore = useBonusesStore('')
const discountStore = useDiscountsStore('')

const data1 = ref({name:'', messages:''})
let loading = ref(false)
let statusCode = ref(null)
let errorMessage = ref(false)
let selectProduct  = ref(false)
function closeDialog(){
  errorMessage.value = false
}
const save = async (e) => {
  e.preventDefault()
  try {
    loading.value = true
    data.order_date = createdDate.value
    notify({ title: "Пожалуйста подождите!" });
    data.value.requesting_products = data.value?.requesting_products?.filter((i) => !!i.count > 0 && i.price > 0);
    data.value.refunding_products = data.value?.refunding_products?.filter((i) => !!i.count > 0 && i.price > 0);
    await exchangesStore.add(data.value)
  }catch(error){
    data1.value.messages = error.response.data.Messages
    data1.value.name = error.response.statusText
    statusCode.value = error.response.status
  }finally {
    if (statusCode.value === 500){
      errorMessage.value = true
    }else {
      await orderStore.refresh();
      notify({ title: "Сохранено!" });
      router.push("/orders/orders");
    }
    loading.value = false
  }
};

const getCompanyName = computed(() => {
  return createOrdersStore.data?.items.find(
      (client) => client.client_id === createOrdersStore.editClient
  )?.company_name;
});



const createOrdersStore = useCreateOrdersStore("main");
const createdDate = ref(moment().format("YYYY-MM-DD HH:mm"));
const agents = ref(null);
const priceTypes = ref(null);
const warehouses = ref(null);
const params = ref({
  page: 1,
  page_size: 10,
  search: null,
  order_by: {
    field: "created_date",
    is_asc: true,
  },
});


onMounted(async ()=>{
  data.value.client_id = route.query.id
  await tradeDirection.getData(true)
  await exchangesStore.getDiscountType()
  await exchangesStore.getBonusType()
  await bonusStore.getDataManual(true)
  await discountStore.getDataManual(true)
  if (!!route.query.id) {
    await exchangeStore.getExchange(route.query.id)
    data.value = exchangeStore.exchanges
    data.value.order_date = moment(exchangeStore.exchanges.order_date).format("YYYY-MM-DD")
  }
  if (route.query.status === 'refund'){
    re.value.refund = true
    re.value.request = false
  }else if(route.query.status === 'request'){
    re.value.refund = false
    re.value.request = true
  }
  if (!!route.query.clientId) {
    data.value.client_id = route.query.clientId
    await createOrdersStore.getAgentByClientId(route.query.clientId)
    data.value.agent_id = createOrdersStore.agents?.data[0].id
  }

  if (!agents.value) {
    agents.value = await createOrdersStore.getAgents(params.value);
  }
  if (!priceTypes.value) {
    priceTypes.value = await createOrdersStore.getPriceTypes(params.value);
  }
  if (!warehouses.value) {
    warehouses.value = await createOrdersStore.getWarehouses(params.value);
  }
  // data.value.agent_id = agents.value.items[0].id
  // data.value.price_type_id = priceTypes.value.items[0].id
  // data.value.
})
</script>

<style scoped>
.date-picker input{
  width: 100%;
  padding-left: 45px;
  position: relative;
}
.date-picker input[type="date"]::-webkit-calendar-picker-indicator {
  position: absolute;
  color: rgba(0, 0, 0, 0);
  opacity: 1;
  display: block;
  background: url(~/assets/svg/date-pickerscg.svg) no-repeat;
  width: 20px;
  height: 20px;
  left: 10px;
  border-width: thin;
  top: 12px;
}
</style>
