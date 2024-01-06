<template>
  <div>
    <div class="flex gap-8">
      <button @click="$router.go(-1)" class="h-[44px] px-[46px] mt-4 bg-[#FFFFFF] text-black rounded-lg border">
        <div class="flex">
          <IconArrowLeft class="mt-[5px] mr-[10px]"></IconArrowLeft>
          Назад
          <slot></slot>
        </div>
      </button>
    </div>
    <div class="flex justify-between mt-5">
      <page-title20 :title="'Приход в кассу'"/>
      <div class="flex gap-5">
        <div class="flex-row">
          <select v-model="cashboxId" class="border w-full h-[42px] bg-[#FAFDFD] rounded-lg mt-[1px] mr-[18px] pl-[15px]">
            <option value="">Выбрать</option>
            <option v-for="item in cashboxStore.data" :value="item.id">{{ item.name }}</option>
          </select>
        </div>
        <m-btn @click="save">Оплатить</m-btn>
      </div>

    </div>
    <div>
      <div class=" mt-2">
        <div class="h-[200px] rounded-lg bg-white overflow-auto relative">
          <data-table
              :headers="orderPayment.templates"
              @sort="orderPayment.sortData"
              :sorted="orderBy"
              :withInformationAboveHeader="true"
          >
            <template #body>
              <c-tr
                  v-for="(datas, index) in orderPayment.data"
                  :trBg="false"
                  :key="index"
              >
                <c-td-no-edit v-for="key in orderPayment.templates">
                  <div >
                    <div>
                      {{datas[key.key]}}
                    </div>
                  </div>
                  <div v-if="key.key === 'naqt'">
                    <div>
                        <input
                            min="0"
                            :value="modalValue(index, key.id)"
                            @input="addAmount($event.target.value, index, key.id)"
                            class="border rounded-lg h-8 w-20 p-2 focus:border-blue-10 active:border-blue-10"
                            type="number"
                        />
                      </div>
                  </div>
                  <div v-if="key.key === 'transfer'">
                      <div>
                        <input
                            min="0"
                            :value="modalValue(index, key.id)"
                            @input="addAmount($event.target.value,index, key.id)"
                            class="border rounded-lg h-8 w-20 p-2 focus:border-blue-10 active:border-blue-10"
                            type="number"
                        />
                      </div>
                  </div>
                  <div v-if="key.key === 'dollar'">
                      <div>
                        <input
                            min="0"
                            :value="modalValue(index, key.id)"
                            @input="addAmount($event.target.value,index, key.id)"
                            class="border rounded-lg h-8 w-20 p-2 focus:border-blue-10 active:border-blue-10"
                            type="number"
                        />
                      </div>
                  </div>
                </c-td-no-edit>
              </c-tr>
            </template>
          </data-table>
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
    <loading-modal v-if="loading"
                   name="Управление меню таблицы">
      <Loading/>
    </loading-modal>
    <h-no-modal v-if="isPayed"
             @closeDialog="closePayed"
             :dataContainerWidth="'300px'"
             name="Payed">
      <div class="w-full text-[24px] flex justify-center">
        Нет долга
      </div>
    </h-no-modal>
  </div>
</template>

<script setup>
import {usePaymentOrdersStore} from "~/stores/orders/create-orders/payment-order";
import {ref} from "vue";
import {notify} from "@kyvg/vue3-notification";
import {useOrdersStore} from "~/stores/orders/orders/create-orders.store";
const orderBy = ref({
  field: '',
  is_asc: ''
})
const orderStore = useOrdersStore("true");
const currencyStore = useCurrenciesStore('')
const cashboxStore = useCashboxesStore('')
const route = useRoute()
const router = useRouter()
const data = ref([])

function addAmount(value, index, currency_id){
  if (data.value[index].income.find(i => i.currency_id === currency_id)){
    let chIndex = data.value[index].income.findIndex(i => i.currency_id === currency_id)
    data.value[index].income[chIndex].amount = value
  }else {
    data.value[index].income.push({
      currency_id:currency_id,
      amount:value
    })
  }
}
let cashboxId = ref('')
const data1 = ref({name:'', messages:''})
let loading = ref(false)
let statusCode = ref(null)
let errorMessage = ref(false)
function closeDialog(){
  errorMessage.value = false
}
function closePayed(){
  isPayed.value = false
  router.push("/orders/orders");
}
const isPayed = ref(false)
const save = async () =>{
  let amount = 0
  for (let i = 0; i < data.value.length; i++){
    for (let j = 0; j < data.value[i].income.length; j++){
      amount = data.value[i].income[j].amount
    }
  }
  if (amount > 0){
    try {
      loading.value = true
      for (let i = 0; i < data.value.length;i++){
        data.value[i].cashbox_id = cashboxId.value
      }
      await orderPayment.add(data.value)
    }catch (error){
      data1.value.messages = error.response.data.Messages
      data1.value.name = error.response.statusText
      statusCode.value = error.response.status
    }finally {
      if (statusCode.value === 500){
        errorMessage.value = true
      }else if(statusCode.value === 400) {
        // alert('you should select cashbox')
      } else
      {
        await orderStore.refresh();
        notify({ title: "Сохранено!" });
        router.push("/orders/orders");
      }
      loading.value = false
    }
  }else {
    isPayed.value = true
  }


}
function modalValue(index, currency_id){
  if (data.value[index] && data.value[index].income){
    return data.value[index].income.find(i => i.currency_id === currency_id).amount
  }else {
    return null
  }
}
const orderPayment = usePaymentOrdersStore('')
let param = ref('')
onMounted(async ()=>{
  await currencyStore.getData(true)
  await orderPayment.orderPayment(route.query.queryString)
  await cashboxStore.loadData()
  console.log('orderPayment.data',orderPayment.data)
  for(let i = 0; i < orderPayment.data?.length; i++){
    data.value.push({
      order_id:orderPayment.data[i].order_id,
      client_id:orderPayment.data[i].client_id,
      cashbox_id:'',
      agent_id:orderPayment.data[i].agent_id,
      expeditor_id:orderPayment.data[i].expeditor_id,
      income:[]
    })
    data.value[i].income.push({
      currency_id:orderPayment.data[i].currency_id,
      amount:orderPayment.data[i].debt,
    })
  }
})
</script>

<style scoped>

</style>
