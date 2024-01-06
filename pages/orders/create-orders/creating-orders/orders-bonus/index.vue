<template>
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
      <button class="rounded-lg bg-blue-600 mt-4 text-white px-6 h-12">
        Скрыть старый бонус
      </button>
    </div>
    <div  class="grid grid-cols-2 gap-4">
      <div>
        <page-title :title="'Добавление бонуса'"/>
        <div v-for="(items, parentIndex) in orderStore.bonuses">
          <div class="flex w-full mt-3">
            <div>Название бонус:{{items.bonus_name}}</div>
          </div>
          <div class=" mt-2">
            <div class="h-[400px] rounded-lg bg-white overflow-auto relative">
              <data-table
                  :headers="templates"
                  @sort="incomeStore.sortData"
                  :sorted="incomeStore.params.order_by"
                  :withInformationAboveHeader="true"
              >
                <template #body>
                  <c-tr
                      v-for="(item, index) in items.products"
                      :trBg="false"
                      :key="index"
                  >
                    <c-td-no-edit>
                      <div class="py-2">
                        <div>
                          {{ item.product_name }}
                        </div>
                      </div>
                    </c-td-no-edit>
                    <c-td-no-edit>
                      <div class="py-2">
                        <div>
                          {{ item.amount_in_warehouse }}
                        </div>
                      </div>
                    </c-td-no-edit>
                    <c-td-no-edit>
                      <div class="py-2">
                        <div v-if="bonuses[parentIndex] && bonuses[parentIndex].products">
                          <input
                              :max="maxValue('count',parentIndex,index)"
                              min="0"

                              v-model="bonuses[parentIndex].products[index].count"
                              class="border rounded-lg h-8 w-20 p-2 focus:border-blue-10 active:border-blue-10"
                              type="number"
                          />
                        </div>
                      </div>
                    </c-td-no-edit>
                  </c-tr>
                  <c-tr>
                    <c-td-no-edit>
                      <div class="py-2">
                        <div>
                          <div>Общее количество</div>
                        </div>
                      </div>
                    </c-td-no-edit>
                    <c-td-no-edit>
                    </c-td-no-edit>
                    <c-td-no-edit>
                      <div class="py-2">
                        <div>
                          <div v-if="bonusCountAmount[parentIndex] && bonusCountAmount[parentIndex].amount">{{calValue}}</div>
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
      <div class="rounded-lg bg-white mt-22 p-3 h-80">
        <div v-for="item in orderStore.discounts" class="w-full flex justify-between py-2">
          <div>Название скидки:{{item.discount_name}}</div>
          <div>Скидка:{{item.rebate}}</div>
        </div>
        <div class="w-full flex justify-between py-2">
          <div>Сумма заказа</div>
          <div>{{allAmount}}</div>
        </div>
        <div class="w-full flex justify-between py-2">
          <div>Сумма скидки</div>
          <div>{{discountData.paymentAmount}}</div>
        </div>
        <div class="w-full flex justify-between py-2">
          <div>К оплате</div>
          <div>{{discountData.discountsAmount}}</div>
        </div>
        <div class="mt-5">
          <m-btn @click="save">Применить</m-btn>
        </div>
      </div>
    </div>
    <d-modal v-if="errorMessage"
             @closeDialog="closeDialog"
             name="Ошибка">
      <div class="w-full">
        <Internal500 :data="data1"></Internal500>
      </div>
    </d-modal>
    <d-modal v-if="errorMessage400"
             @closeDialog="closeDialog400"
             name="Ошибка">
      <div class="w-full">
        400 ERROR
      </div>
    </d-modal>
    <loading-modal v-if="loading"
                   name="Управление меню таблицы">
      <Loading/>
    </loading-modal>
  </div>

</template>

<script setup>
import {useOrdersStore} from "~/stores/orders/orders/create-orders.store";
import {ref} from "vue";
import {notify} from "@kyvg/vue3-notification";

const orderStore = useOrdersStore("true");
const incomeStore = useIncomesStore("true");
const router = useRouter()
const templates = ref([
  {
    name: "Name",
    checked:true,
    key: "product_name",
    type:"product_name",
    thWidth:'220px',
    bRadius:'8px'
  },
  {
    name: "Quantity",
    checked:true,
    key: "amount_in_warehouse",
    type:"amount_in_warehouse",
    thWidth:'120px',
    bRadius:'8px'
  },
  {
    name: "Amount",
    checked:true,
    key: "amount",
    type:"amount",
    thWidth:'100px'
  }
]);
const bonusCount = ref(null)
const bonusCountAmount = ref([
])
const max = ref(null)

let calValue = ref(null)
function maxValue(key,parentIndex,index){
  let amount = 0
    for(let j = 0; j < bonuses.value[parentIndex].products.length; j++){
      if (j !== index && +bonuses.value[parentIndex].products[j][key] > 0){
        amount += bonuses.value[parentIndex].products[j][key]
      }
  }
  calValue.value = bonusCountAmount.value[parentIndex].amount - bonuses.value[parentIndex].products[index].count
  return bonusCountAmount.value[parentIndex].amount - amount
}
const data1 = ref({name:'', messages:''})
let loading = ref(false)
let statusCode = ref(null)
let errorMessage = ref(false)
let errorMessage400 = ref(false)

function closeDialog(){
  errorMessage.value = false
}
function closeDialog400(){
  errorMessage400.value = false
}
const save = async (e) => {
  e.preventDefault()
  notify({ title: "Пожалуйста подождите!" });
  for(let i = 0; i < bonuses.value.length; i++){
    for(let j = 0; j < bonuses.value[i].products.length; j++){
      orderStore.orderData.bonus_products.push(bonuses.value[i].products[j])
    }
  }
    try {
      loading.value = true
      // data.value.products = data.value?.products?.filter((i) => !!i.product_id);
      orderStore.orderData.bonus_products = orderStore.orderData.bonus_products.filter(i => i.count > 0 && i.price > 0)
      await orderStore.add(orderStore.orderData);
    }catch (error){
      data1.value.messages = error.response.data.Messages
      data1.value.name = error.response.statusText
      statusCode.value = error.response.status
      console.log()
    }finally {
      if (statusCode.value === 500){
        errorMessage.value = true
      }else if (statusCode.value === 400){
        errorMessage400.value = true
      }else {
        await orderStore.refresh();
        notify({ title: "Сохранено!" });
        router.push("/orders/orders");
      }
      loading.value = false
    }
};
const bonuses = ref([

])
const allAmount = ref(null)
const discountData = ref({
  rebateCount:0,
  discountsAmount:0,
  paymentAmount:0
})
onMounted(()=>{
  for (let j = 0; j < orderStore.bonuses.length; j++){
    bonuses.value.push({products:[]})
    for(let i = 0; i < orderStore.bonuses[j].products.length; i++){
      bonusCount.value += orderStore.bonuses[j].products[i].amount
      bonuses.value[j].products.push(
          {
            count:orderStore.bonuses[j].products[i].amount,
            bonus_id:orderStore.bonuses[j].bonus_id,
            product_id:orderStore.bonuses[j].products[i].product_id,
            price:0
          })
    }
    bonusCountAmount.value.push({amount:bonusCount.value})
  }

  for(let i = 0; i < orderStore.orderData.products.length; i++){
    allAmount.value += orderStore.orderData.products[i].price
  }
  for (let i = 0; i < orderStore.discounts.length; i++){
    discountData.value.rebateCount += orderStore.discounts[i].rebate
  }
  discountData.value.paymentAmount = (discountData.value.rebateCount / 100) * allAmount.value
  discountData.value.discountsAmount = allAmount.value - discountData.value.paymentAmount
})

</script>

<style scoped>

</style>
