<template>
  <div class="grid grid-cols-1 w-full gap-2">
    <div class="flex-row">
      <span class="text-gray-3 fs-14 fw-4">
        Сумма
      </span>
    </div>
    <div class="flex-row">
      <d-input placeholder="Введите"
               type="text"
               class="w-full"
               :value="data.payment_amount"
               @change="(value) => data.payment_amount = value"/>
    </div>
    <div class="flex-row">
      <span class="text-gray-3 fs-14 fw-4">
        Дата
      </span>
    </div>
    <div class="flex-row">
      <d-input-date-picker :value="data.payment_received_date" @change="(v) => data.payment_received_date = v" placeholder="Введите" class="w-full" type="text"/>
    </div>
    <div class="flex-row">
      <span class="fs-14 fw-4 text-gray-3">
        Валюта
      </span>
    </div>
    <div class="flex-row">
      <select v-model="data.currency_id" class="border w-full h-[42px] bg-[#FAFDFD] rounded-lg mt-[1px] mr-[18px] pl-[15px]">
        <option v-for="item in currincyStore.data?.items" :value="item.id">{{item.name}}</option>
      </select>
    </div>
    <div class="flex-row">
      <span class="text-gray-3 fs-14 fw-4">
        Касса
      </span>
    </div>
    <div class="flex-row">
      <select v-model="data.cash_box_id" class="border w-full h-[42px] bg-[#FAFDFD] rounded-lg mt-[1px] mr-[18px] pl-[15px]">
        <option value="60b789b2-4f16-4b53-9e2b-89c60925b870">cash</option>
      </select>
    </div>
    <div class="flex-row">
      <span class="text-gray-3 fs-14 fw-4">
        Комментарии
      </span>
    </div>
    <div class="flex-row">
      <d-input placeholder="Введите"
               type="text"
               class="w-full"
               :value="data.description"
               @change="(value) => data.description = value"/>
    </div>
    <div class="flex flex-row z-50 -bottom-4 bg-white mt-2 items-center justify-between w-full gap-2">
      <m-btn class="grow" @click="save">
        Добавить
      </m-btn>
    </div>
  </div>
</template>

<script setup >
import {notify} from "@kyvg/vue3-notification";
import {useOtherIncome} from "~/stores/dashboard/other-income/other-income.store";
const otherIncomeStore = useOtherIncome('')

const dialogStore = useDialogStore('otherIncome')
const data = ref({
  payment_amount:0,
  payment_received_date:'',
  currency_id:'',
  currency_name:'',
  cash_box_id:'',
  cash_box_name:'',
  description:''
})
const save = async () => {
  notify({title: "Пожалуйста подождите!"});

  await otherIncomeStore.add(data.value);


  notify({title: "Сохранено!"})
  await otherIncomeStore.refresh()
  await dialogStore.closeDialog();
}


onBeforeMount(() => {
  if (dialogStore.singleData !== null) {
    data.value = dialogStore.singleData;
  }
});
const currincyStore = useCurrenciesStore('')
onMounted(()=>{
  currincyStore.getData(true)
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
</style>
