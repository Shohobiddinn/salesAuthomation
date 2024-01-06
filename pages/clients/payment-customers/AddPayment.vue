<template>
  <div class="payment">
    <button @click="$router.push('/clients/payment-customers')" class="h-[44px] px-[46px] mt-4 bg-[#FFFFFF] text-black rounded-lg border">
      <div class="flex">
        <IconArrowLeft class="mt-[5px] mr-[10px]"></IconArrowLeft>
          Назад
        <slot></slot>
      </div>
    </button>
    <div class="mt-4">
      <rounded-white-container>
         <div class="flex justify-between">
           <page-title :title="'Добавить оплату'"></page-title>
           <m-btn @click="save" class="mt-2">Добавить</m-btn>
         </div>
        <div  class="flex mt-4">
          <div class="w-[40%] text-[20px] fw-5">О клиенте</div>
          <div class="w-[60%]">
            <div>
              <div class="flex-row">
                <span class="text-gray-3 fs-14 fw-4">
                   Клиент *
                </span>
              </div>
              <div class="flex-row mt-1">
                <select v-model="clientId" class="border w-full h-[42px] bg-[#FAFDFD] rounded-lg mt-[1px] mr-[18px] pl-[15px]">
                  <option v-for="item in clientsStore.data?.items" :value="item.id">{{ item.name }}</option>
                </select>
              </div>
            </div>
            <div class="mt-4">
              <div class="flex-row">
                <span class="text-gray-3 fs-14 fw-4">
                   Агент *
                </span>
              </div>
              <div class="flex-row mt-1">
                <select v-model="agentId" class="border w-full h-[42px] bg-[#FAFDFD] rounded-lg mt-[1px] mr-[18px] pl-[15px]">
                  <option v-for="item in agentStore.data?.items" :value="item.id">{{item.first_name}}</option>
                </select>
              </div>
            </div>
            <div class="mt-4">
              <div class="flex-row">
                <span class="text-gray-3 fs-14 fw-4">
                   Экспедитор *
                </span>
              </div>
              <div class="flex-row mt-1">
                <select  class="border w-full h-[42px] bg-[#FAFDFD] rounded-lg mt-[1px] mr-[18px] pl-[15px]">
                  <option >sdsdsd</option>
                </select>
              </div>
            </div>

          </div>
        </div>
        <div v-for="(i,index) in arr" >
          <div class="border h-[1px] w-full mt-8"></div>
          <div class="flex mt-4">
            <div class="w-[40%] flex text-[20px] fw-5">
              <div>Оплата</div>
              <div @click="deleteF" v-if="i.name !== 'noDelete'" class="text-red leading-[18px] mt-2 ml-4">Удалить</div>
            </div>
            <div class="w-[60%]">
              <div>
                <div class="flex-row">
                <span class="text-gray-3 fs-14 fw-4">
                   Даты оплаты *
                </span>
                </div>
                <div class="flex-row mt-1">
                  <d-input-date-picker :values="i.payment_received_date" @change="(v) => i.payment_received_date = v" placeholder="Введите" class="w-full" type="text"/>
                </div>
              </div>
              <div class="mt-4">
                <div class="flex-row">
                <span class="text-gray-3 fs-14 fw-4">
                   Тип оплаты *
                </span>
                </div>
                <div class="flex-row mt-1">
                  <select v-model="i.currency_id" class="border w-full h-[42px] bg-[#FAFDFD] rounded-lg mt-[1px] mr-[18px] pl-[15px]">
                    <option v-for="item in currencyStore.data?.items" :value="item.id">{{ item.name }}</option>
                  </select>
                </div>
              </div>
              <div class="mt-4">
                <div class="flex-row">
                <span class="text-gray-3 fs-14 fw-4">
                   Касса
                </span>
                </div>
                <div class="flex-row mt-1">
                  <d-input placeholder="Выбрать" type="text" class="w-full"/>
                </div>
              </div>
              <div class="mt-4">
                <div class="flex-row">
                <span class="text-gray-3 fs-14 fw-4">
                   Сумма *
                </span>
                </div>
                <div class="flex-row mt-1">
                  <d-input :value="i.payment_amount"
                           @change="(value) => i.payment_amount = value" placeholder="Введите сумму" type="text" class="w-full"/>
                </div>
              </div>
              <div class="mt-4">
                <div class="flex-row">
                <span class="text-gray-3 fs-14 fw-4">
                   Комментарии
                </span>
                </div>
                <div class="flex-row mt-1">
                  <textarea v-model="i.description" class="border rounded-lg w-full h-[120px]"/>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="flex justify-end mt-2" >
          <button @click="addNew" class="text-[#013636] fw-5 border border-[#299B9B] rounded-lg py-1 px-4">+ Добавить еще</button>
        </div>
      </rounded-white-container>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useAgentsStore} from "~/stores/command/agents/agents.store";
import {Ref} from "vue";
import {ClientPaymentModel} from "~/interfaces/api/clients-model";
import {notify} from "@kyvg/vue3-notification";
import {useClientsPaymentStore} from "~/stores/clients/clients/clients-payment.store";

const router = useRouter()
const clientsStore = useClientsStore('')
const agentStore = useAgentsStore('')
const currencyStore = useCurrenciesStore('')
const clientPaymentStore = useClientsPaymentStore('')
const agentId = ref('')
const clientId = ref('')
const arr = ref<ClientPaymentModel[]>([
  {
    id: undefined,
    is_active:false,
    client_id:"",
    agent_id:"",
    payment_courier_id: "7dfe227b-5c0c-4fe6-8bef-218c752e8b08",
    payment_received_date:"",
    currency_id:"",
    cash_box_id:"60b789b2-4f16-4b53-9e2b-89c60925b870",
    payment_amount:0,
    description:""
  }
])
function addNew(){
  arr.value.push(
      {
        id: undefined,
        is_active:false,
        client_id:"",
        agent_id:"",
        payment_courier_id: "7dfe227b-5c0c-4fe6-8bef-218c752e8b08",
        payment_received_date:"",
        currency_id:"",
        cash_box_id:"60b789b2-4f16-4b53-9e2b-89c60925b870",
        payment_amount:0,
        description:""
      }
  )
}
function deleteF(){
  arr.value.splice(1, 1)
}

const save = async () => {
  notify({title: "Пожалуйста подождите!"});
  for (let i = 0; i < arr.value.length; i++){
    arr.value[i].agent_id = agentId.value
    arr.value[i].client_id = clientId.value
    console.log('arr.value',arr.value)
  }

  await clientPaymentStore.add(arr.value);

  router.push('/clients/payment-customers')
  notify({title: "Сохранено!"})
}
onMounted(()=>{
  clientsStore.getData('')
  agentStore.getData(true)
  currencyStore.getData(true)
})
</script>

<style scoped>

</style>
