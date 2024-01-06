<template>
  <div>
    <div class="flex justify-between">
      <button @click="$router.go(-1)" class="h-11 px-11 mt-4 bg-white text-black rounded-lg border">
        <span class="flex">
          <IconArrowLeft class="mt-[5px] mr-[10px]"></IconArrowLeft>
          Назад
          <slot></slot>
        </span>
      </button>
    </div>
    <div>
      <page-title :title="'Создание возврата'"></page-title>
    </div>
    <div class="mt-4">
      <rounded-white-container class="px-8">
        <div class="border-b-1 pb-6">
          <page-title20 :title="'Выберите категорию'"></page-title20>
          <div class="flex gap-4 mt-4">
            <div v-for="i in 6" :key="i" class="bg-input rounded-lg pt-1 pr-2 flex check border">
              <div class="pt-[2px] px-2">
                <label>
                  <input type='checkbox'>
                  <span></span>
                </label>
              </div>
              <span class="ml-2">Coca cola</span>
            </div>
          </div>
        </div>
        <div class="flex">
          <div class="mt-3 w-[40%]">
            <div class="flex justify-between">
              <div class="text-[#424F4F] leading-[22px] mt-1">Имя клиента</div>
            </div>
            <div class="text-[24px] text-black leading-[33px]">Мавлюда ва Абдуламинхон</div>
          </div>
          <div v-click-outside="outside" class="p-3 mx-3 w-[60%]">
            <div class="mb-2">
              <span class="fs-12">Дата возврата</span>
            </div>
            <DInputDatePicker />
            <multiply-selection class="mt-2" :filter.sync="filters.isAgent" @toggle="toggle => filters.isAgent = toggle" :name="'Агент *'"/>
            <multiply-selection class="mt-2" :filter.sync="filters.isPaymentType" @toggle="toggle => filters.isPaymentType = toggle" :name="'Тип оплаты *'"/>
            <multiply-selection class="mt-2" :filter.sync="filters.isWarehouseReturn" @toggle="toggle => filters.isWarehouseReturn = toggle" :name="'Склад для возврата *'"/>
          </div>
        </div>
        <div class="flex mt-4">
          <div class="mt-3 w-[40%]">
            <page-title20 :title="'Комментарии к заказу'"></page-title20>
          </div>
          <div v-click-outside="outside" class="p-3 mx-3 w-[60%]">
            <div class="mb-2">
              <span class="fs-12">Комментарии *</span>
            </div>
            <div class="date-picker">
              <textarea class="my-input relative h-25 w-full bg-input focus:border-blue-10 active:border-blue-10 fa-solid mainLoginInput p-2 border-primary-gray border-1 rounded-lg"
                     type="text"/>
            </div>
          </div>
        </div>
      </rounded-white-container>
    </div>
    <div class="grid grid-cols-3 gap-4 mt-4">
      <div class="flex justify-center items-center h-[100px] rounded-lg bg-white">
        <div class="flex">
          <div><IconFRRBox/></div>
          <div class="ml-4">
            <div class="fs-14 font-[600] ml-6"><span class="text-[#299B9B]">15</span> ШТ</div>
            <div class="fs-14 text-[#8FA0A]">Общий объем</div>
          </div>
        </div>
      </div>
      <div class="flex justify-center items-center h-[100px] rounded-lg bg-white">
        <div class="flex">
          <div><IconFRRCheck/></div>
          <div class="ml-4">
            <div class="fs-14 font-[600] ml-6"><span class="text-[#199305]">15</span> ШТ</div>
            <div class="fs-14 text-[#8FA0A]">Количество заказов</div>
          </div>
        </div>
      </div>
      <div class="flex justify-center items-center h-[100px] rounded-lg bg-white">
        <div class="flex">
          <div><IconCash1/></div>
          <div class="ml-4">
            <div class="fs-14 font-[600]"><span class="text-[#3B0763]">40 400 000 </span> UZS</div>
            <div class="fs-14 text-[#8FA0A]">Общая сумма</div>
          </div>
        </div>
      </div>
    </div>
    <div>
      <OrdersCreateExchangeCreateExchangeProductDataTableOrders/>
    </div>
    <div class="flex justify-end mt-4 mb-4"><m-btn class="w-54">Сохранить</m-btn></div>
  </div>

</template>

<script setup>
import {ref} from "vue";
const filters = ref({
  isAgent:false,
  isPaymentType:false,
  isDiscount: false,
  isWarehouseReturn:false
})

// function outside(){
//   filters.value.isAgent = false
//   filters.value.isPaymentType = false
//   filters.value.isDiscount = false
//   filters.value.isWarehouseReturn = false
// }
let headers = ref([
  {
    name: "Товар",
    checked:true,
    key: "product",
    thWidth:'140px',
    bRadius:'8px'
  },
  {
    name: "Кол-во / объем",
    checked:true,
    key: "volume",
    thWidth:'160px'
  },
  {
    name: "Сумма",
    checked:true,
    key: "amount",
    thWidth:'80px'
  },
]);
const loadedData = ref([
  {
    product: "Coca cola",
    volume: "56 шт",
    amount:"330 000",
  },
  {
    product: "Coca cola",
    volume: "56 шт",
    amount:"330 000",
  },
  {
    product: "Coca cola",
    volume: "56 шт",
    amount:"330 000",
  },
  {
    product: "Coca cola",
    volume: "56 шт",
    amount:"330 000",
  },
  {
    product: "Coca cola",
    volume: "56 шт",
    amount:"330 000",
  },
  {
    product: "Coca cola",
    volume: "56 шт",
    amount:"330 000",
  },
  {
    product: "Coca cola",
    volume: "56 шт",
    amount:"330 000",
  },
])
let sortedData = ref({key: '', mode: ''});

function sortData(data) {
  sortedData.value = data
}
</script>

<style scoped>
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
.check label input {
  display: none; /* Hide the default checkbox */
}

/* Style the artificial checkbox */
.check label span {
  height: 20px;
  width: 20px;
  border-radius: 4px;
  border: 1px solid #D2D7D7;
  display: inline-block;
  position: relative;
}

/* Style its checked state...with a ticked icon */
.check [type=checkbox]:checked + span:before {
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


