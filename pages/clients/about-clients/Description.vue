<template>
  <div>
    <div class="flex justify-between">
      <button @click="$router.go(-1)" class="h-[44px] px-[46px] mt-4 bg-[#FFFFFF] text-black rounded-lg border">
        <div class="d-flex">
          <IconArrowLeft class="mt-[5px] mr-[10px]"></IconArrowLeft>
          Назад
          <slot></slot>
        </div>
      </button>
      <div class="mt-4 flex">
        <button class="bg-white border border-[#299B9B] rounded-lg py-2 px-6 mr-3">
          <div class="flex">
            <div class="ml-2 ">История заказа</div>
          </div>
        </button>
        <button class="bg-[#057CD1] rounded-lg py-1 px-6 mr-3">
          <div class="flex">
            <div><IconEditb :color="true"/></div>
            <div class="ml-2 text-white">Быстрая правка</div>
          </div>
        </button>
        <m-btn>
          <div class="flex">
            <div><IconEditb :color="true"/></div>
            <div class="ml-2">Изменить</div>
          </div>
        </m-btn>
      </div>
    </div>
    <div class="mt-4">
      <rounded-white-container>
        <div class="grid grid-cols-2">
          <div class="mt-3">
            <div class="flex justify-between">
              <div class="text-[#424F4F] leading-[22px] mt-1">Имя клиента</div>
              <div class="text-[20px] font-[600] mr-6">О заказе</div>
            </div>
            <div class="text-[24px] text-[#299B9B] leading-[33px]">Мавлюда ва Абдуламинхон</div>
            <div class="text-[#424F4F] leading-[22px] mt-8">Агент</div>
            <div class="text-[24px] font-[400]">ТП Андрей</div>
            <div class="rounded-lg bg-white border-grey mt-3 px-[2px] relative w-full">
              <div class="absolute p-2 flex justify-between bg-[#FAFDFD] bb-r bottom-0 w-full ml-[-2px] z-20 h-40px border-t border-[#E1E4E4]">
                <div class="fs-14">Итого</div>
                <div class="fs-14">56 шт</div>
                <div class="fs-14 font-[600]">100 000 сум</div>
              </div>
              <div class=" table-containers h-[320px]">
                <data-table :headers="headers"
                            @sort="sortData"
                            :sorted="sortedData">
                  <template #body>
                    <c-tr v-for="(data, index) in loadedData" :key="data">
                      <c-td-no-edit v-for="key in headers" :key="key" >
                        <div class="py-2">
                          <div class="mt-[-10px] mb-[-10px]" v-if="key.key === 'active'">
                            <button class="h-[33px]  w-[80px] fs-12 bg-[#E3FCF0] rounded-[41px]">Активный</button>
                          </div>
                          <div v-if="key.checked === true">
                            {{ data[key.key] }}
                          </div>
                        </div>
                      </c-td-no-edit>
                    </c-tr>
                  </template>
                </data-table>
              </div>
            </div>
          </div>
          <div class="p-3 mx-3">
            <div class="flex justify-between border-b border-[#E1E4E4] pb-3">
              <div class="text-[#8FA0A0]">Дата заказа</div>
              <div>2022-10-14 13:25:10</div>
            </div>
            <div class="flex justify-between border-b border-[#E1E4E4] pb-3 pt-3">
              <div class="text-[#8FA0A0]">Создан</div>
              <div>2022-10-14 13:25:10</div>
            </div>
            <div class="flex justify-between border-b border-[#E1E4E4] pb-3 pt-3">
              <div class="text-[#8FA0A0]">Изменен</div>
              <div>2022-10-14 13:25:10</div>
            </div>
            <div class="flex justify-between border-b border-[#E1E4E4] pb-3 pt-3">
              <div class="text-[#8FA0A0]">Дата отгрузки:</div>
              <div>2022-10-14 13:25:10</div>
            </div>
            <div class="flex justify-between border-b border-[#E1E4E4] pb-3 pt-3">
              <div class="text-[#8FA0A0]">Статус</div>
              <div>
                <button class="text-[#057CD1] bg-blue-10 py-1 px-3 rounded-[30px]">Новый заказ</button>
              </div>
            </div>
            <div class="flex justify-between border-b border-[#E1E4E4] pb-3 pt-3">
              <div class="text-[#8FA0A0]">Склад</div>
              <div>Основной склад</div>
            </div>
            <div class="flex justify-between border-b border-[#E1E4E4] pb-3 pt-3">
              <div class="text-[#8FA0A0]">Тип оплаты</div>
              <div>Наличные</div>
            </div>
            <div class="flex justify-between border-b border-[#E1E4E4] pb-3 pt-3">
              <div class="text-[#8FA0A0]">Скидка</div>
              <div>Без скидки</div>
            </div>
            <div class="flex justify-between border-b border-[#E1E4E4] pb-3 pt-3">
              <div class="text-[#8FA0A0]">Бонус</div>
              <div>Без бонуса</div>
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
       <ClientsAboutClientsDescription/>
    </div>
    <div class="flex w-full mt-6">
      <div class="w-[30%] text-[20px] font-[600]">Комментарии к заказу</div>
      <div class="w-[70%]">
        <rounded-white-container>
           <div class="fs-16 leading-[22px]">
             Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. Lorem Ipsum is simply dummy text of the printing and
           </div>
        </rounded-white-container>
      </div>
    </div>

  </div>
</template>

<script setup>
import {ref} from "vue";

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
.bb-r{
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
}
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.5);
}
</style>
