<template>
  <div>
    <div>
      <div class="-mt-13">
        <page-title :title="'Закрытие заказа предоплатой'"></page-title>
      </div>
      <div class="flex">
        <div class="flex p-2">
          <div class="mt-2">Касса:</div>
          <div class="w-70 ml-4 mr-4">
            <select class="border w-full mt-1 h-10 bg-[#FAFDFD] rounded-lg mt-[1px] mr-[18px] pl-[15px]">
              <option value="">Выбрать</option>
              <option value="">hello</option>
              <option value="">hello</option>
              <option value="">hello</option>
            </select>
          </div>
        </div>
        <div class="flex p-2 w-[500px]">
          <div class="mt-2">Даты оплаты *</div>
          <div class="date-picker w-[300px] ml-3">
            <input class="my-input  fa-solid mainLoginInput p-2 border-primary-gray border-1 rounded-lg"
                   type="date"
                   placeholder="Выбрать">
          </div>        </div>
      </div>
    </div>
    <div class="rounded-lg border pr-2 relative">
      <div class="absolute bg-white h-70 w-4 border-l-1 right-4 z-50"></div>
      <div class="absolute bg-white h-3 w-312 border-t-1 bottom-16.5 z-50"></div>
      <div class="w-full w-318 overflow-y-auto h-70">
        <div class="w-350">
          <div  class="grid grid-cols-8 border-b border-[#E1E4E4] "><div v-for="i in group" class="p-2">{{i.name}}</div></div>
          <div class="">
            <div v-click-outside="clickOutside" v-for="i in 6" class="grid grid-cols-8 border-b border-[#E1E4E4] relative">
              <div class="p-2 mt-2">ID 13268</div>
              <div class="p-2 mt-2">Андрей ака</div>
              <div class="p-2 mt-2">Заказ ID 31268</div>
              <div class="p-2 mt-2">-153 000</div>
              <div class="p-2 mt-2">-153 000</div>
              <div class="p-2">
                <d-input placeholder="Введите сумма"
                         type="text"
                         class="w-full"/>
              </div>
              <select class="border w-full mt-2 h-[42px] bg-[#FAFDFD] rounded-lg mt-[1px] mr-[18px] pl-[15px]">
                <option value="">Без. нал Сум</option>
                <option value="">hello</option>
                <option value="">hello</option>
                <option value="">hello</option>
              </select>
              <div class="p-2">
                <d-input placeholder="Введите сумма"
                         type="text"
                         class="w-full"/>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="flex justify-between">
        <div></div>
        <div class="flex p-2">
          <m-btn>Сохранить</m-btn>
        </div>
      </div>
    </div>
  </div>

</template>

<script setup>
const group = ref([
  {
    name:"ID"
  },
  {
    name:"Клиент"
  },
  {
    name:"Тип"
  },
  {
    name:"Сумма"
  },
  {
    name:"Долг"
  },
  {
    name:"Оплата"
  },
  {
    name:"Способ Оплаты"
  },
  {
    name:"Комментарии"
  }
])
const filter = ref({
  isAgent: false,
  isExpeditor: false,
  isCurrency: false,
  isCash: false
})
const filter1 = ref({
  isAgent: false,
  isExpeditor: false,
  isCurrency: false
})
const filter2 = ref({
  isAgent: false,
  isExpeditor: false,
  isCurrency: false
})
const filter3 = ref({
  isAgent: false,
  isExpeditor: false,
  isCurrency: false
})
function clickOutside(){
  filter.value.isAgent = false
  filter.value.isExpeditor = false
  filter.value.isCurrency = false
}
function clickOutside1(){
  filter1.value.isAgent = false
  filter1.value.isExpeditor = false
  filter1.value.isCurrency = false
}
function clickOutside2(){
  filter2.value.isAgent = false
  filter2.value.isExpeditor = false
  filter2.value.isCurrency = false
}
function clickOutside3(){
  filter3.value.isAgent = false
  filter3.value.isExpeditor = false
  filter3.value.isCurrency = false
}
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

