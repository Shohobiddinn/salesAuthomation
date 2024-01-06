<template>
  <div class="rounded-lg border w-full">
    <div  class="grid grid-cols-7 border-b border-[#E1E4E4]"><div v-for="i in group" class="p-2">{{i.name}}</div></div>
    <div class="h-[200px] overflow-auto">
      <div v-for="(item, index) in data" class="grid grid-cols-7 border-b border-[#E1E4E4] relative">
        <div class="p-2 mt-2" :class="[statuses[index] && statuses[index] === 200 ? 'text-blue-10' : '', statuses[index] && statuses[index] === 400 ? 'text-red' : '']">Андрей ака</div>
        <div class="p-2 ">
          <div class="date-picker">
            <div class="flex-row mt-1">
              <d-input-date-picker :values="item.payment_received_date" @change="(v) => item.payment_received_date = v" placeholder="Введите" class="w-full" type="text"/>
            </div>
          </div>
        </div>
        <div class="p-2">
          <select v-model="item.agent_id" class="border w-full h-[42px] bg-[#FAFDFD] rounded-lg mt-[1px] mr-[18px] pl-[15px]">
            <option v-for="item in agentStore.data?.items" :value="item.id">{{item.first_name}}</option>
          </select>
        </div>
        <div class="p-2">
          <select  class="border w-full h-[42px] bg-[#FAFDFD] rounded-lg mt-[1px] mr-[18px] pl-[15px]">
            <option ></option>
          </select>
        </div>
        <div class="p-2">
          <d-input :value="item.payment_amount"
                   @change="(value) => item.payment_amount = value" placeholder="Введите сумму" type="text" class="w-full"/>
        </div>
        <div class="p-2">
          <select v-model="item.currency_id" class="border w-full h-[42px] bg-[#FAFDFD] rounded-lg mt-[1px] mr-[18px] pl-[15px]">
            <option v-for="item in currencyStore.data?.items" :value="item.id">{{ item.name }}</option>
          </select>
        </div>
        <div class="p-2">
          <d-input placeholder="Пишите"
                   type="text"
                   class="w-full"/>
        </div>

      </div>
    </div>
    <div class="flex justify-end">
      <div class="flex p-2">
        <div class="mt-2">Касса:</div>
        <div class="w-[287px] ml-4 mr-4"><multiply-selections :filter.sync="filter.isCash" @toggle="toggle => filter.isCash = toggle"/></div>
        <m-btn @click="save">Сохранить</m-btn>
      </div>
    </div>
  </div>
</template>

<script setup>
import {useAgentsStore} from "~/stores/command/agents/agents.store";
import {useClientsPaymentStore} from "~/stores/clients/clients/clients-payment.store";
import {notify} from "@kyvg/vue3-notification";
import {clientsPayment} from "~/stores/clients/clients/cleints-payment";

const agentStore = useAgentsStore('')
const currencyStore = useCurrenciesStore('')
const clientPaymentStore = useClientsPaymentStore('')
const group = ref([
  {
    name:"Клиент"
  },
  {
    name:"Дата оплаты"
  },
  {
    name:"Агент"
  },
  {
    name:"Экспедитор"
  },
  {
    name:"Сумма"
  },
  {
    name:"Валюта"
  },
  {
    name:"Комментарии"
  }
])
const {data, clientId} = clientsPayment
const filter = ref({
  isAgent: false,
  isExpeditor: false,
  isCurrency: false,
  isCash: false
})
const props = defineProps({
  groupProcessModal:Object
})
function clickOutside(){
  filter.value.isAgent = false
  filter.value.isExpeditor = false
  filter.value.isCurrency = false
}
const res = ref(false)
const status = ref(0)
const errStatus = ref(0)
const statuses = ref([])
const save = async () => {
  notify({title: "Пожалуйста подождите!"});

  for (let i = 0; i < data.value.length; i++){
    if (!statuses.value[i] || statuses.value[i] === 400){
      try {
        await clientPaymentStore.addGroup(data.value[i])
        if (!statuses.value[i]){
          statuses.value.push(200)
        }else {
          statuses.value[i] = 200
        }
      }catch (error){
        if (!statuses.value[i]){
          statuses.value.push(400)
        }else {
          statuses.value[i] = 400
        }
      }
    }
  }
  if (data.value.length === statuses.value.filter(i => i === 200).length){
    props.groupProcessModal.isActive = false
  }
  notify({title: "Сохранено!"})
}
onMounted(()=>{
  agentStore.getData('')
  currencyStore.getData(true)
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
::-webkit-scrollbar {
  width: 8px;
  -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
  border-radius: 10px;
}
::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.5);
}
</style>
