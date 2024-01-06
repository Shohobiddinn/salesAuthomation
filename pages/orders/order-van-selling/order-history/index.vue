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
    </div>
    <div>
      <page-title :title="'История заказов'"/>
    </div>
    <div class="px-3 rounded-lg bg-white mt-3">
      <div v-for="item in history" class="border-b py-2 border-gray-40 grid grid-cols-6">
        <span class="fs-14 fw-6 text-gray-3">{{item.data}}</span>
        <span class="fs-14 fw-6 text-blue-10">{{item.one}}</span>
        <span class="fs-14 fw-6 text-blue-10">{{item.two}}</span>
        <span class="fs-14 fw-6 text-blue-10">{{item.three}}</span>
        <span class="fs-14 fw-6 text-blue-10">{{item.four}}</span>
        <span class="fs-14 fw-6 text-blue-10">{{item.fife}}</span>
      </div>
      <div v-for="item in historys" class="border-b py-2 border-gray-40 grid grid-cols-6">
        <span class="fs-14 fw-4 ">{{item.data}}</span>
        <span class="fs-14 fw-4 ">{{item.one}}</span>
        <span class="fs-14 fw-4 ">{{item.two}}</span>
        <span class="fs-14 fw-4 ">{{item.three}}</span>
        <span class="fs-14 fw-4 ">{{item.four}}</span>
        <span class="fs-14 fw-4 ">{{item.fife}}</span>
      </div>
      <div v-for="item in historyS" class="border-b py-2 border-gray-40 grid grid-cols-6">
        <div>
          <span>{{item.data}}</span>
        </div>
        <div>
          <span class="fs-14 fw-4 text-blue-700 bg-blue-100 rounded-large px-2 py-1">{{item.one}}</span>
        </div>
        <div>
          <span class="fs-14 fw-4 text-blue-700 bg-blue-100 rounded-large px-2 py-1">{{item.two}}</span>
        </div>
        <div>
          <span class="fs-14 fw-4 text-blue-700 bg-blue-100 rounded-large px-2 py-1">{{item.three}}</span>
        </div>
        <div>
          <span class="fs-14 fw-4 text-blue-700 bg-blue-100 rounded-large px-2 py-1">{{item.four}}</span>
        </div>
        <div>
          <span class="fs-14 fw-4 text-blue-700 bg-blue-100 rounded-large px-2 py-1">{{item.fife}}</span>
        </div>
      </div>
      <div v-for="item in historys" class="border-b py-2 border-gray-40 grid grid-cols-6">
        <span class="fs-14 fw-4 ">{{item.data}}</span>
        <span class="fs-14 fw-4 ">{{item.one}}</span>
        <span class="fs-14 fw-4 ">{{item.two}}</span>
        <span class="fs-14 fw-4 ">{{item.three}}</span>
        <span class="fs-14 fw-4 ">{{item.four}}</span>
        <span class="fs-14 fw-4 ">{{item.fife}}</span>
      </div>
      <div class="fw-6 mt-2">Состав</div>
      <div class="fw-4 mt-2">Тоффи кофейное 3кг</div>
      <div v-for="item in historys" class=" py-2 grid grid-cols-6">
        <span class="fs-14 fw-4 ">{{item.data}}</span>
        <span class="fs-14 fw-4 ">{{item.one}}</span>
        <span class="fs-14 fw-4 ">{{item.two}}</span>
        <span class="fs-14 fw-4 ">{{item.three}}</span>
        <span class="fs-14 fw-4 ">{{item.four}}</span>
        <span class="fs-14 fw-4 ">{{item.fife}}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
const history = ref([
  {
    data:"Дата",
    one:"2022-10-14 13:25:10",
    two:"2022-10-14 13:25:10",
    three:"2022-10-14 13:25:10",
    four:"2022-10-14 13:25:10",
    fife:"2022-10-14 13:25:10"
  },
])
const historyS = ref([
  {
    data:"Статус",
    one:"Новый заказ",
    two:"Новый заказ",
    three:"Новый заказ",
    four:"Новый заказ",
    fife:"Новый заказ"
  },
])
const historys = ref([
  {
    data:"Клиент",
    one:"Shaddodbek",
    two:"Shaddodbek",
    three:"Shaddodbek",
    four:"Shaddodbek",
    fife:"Shaddodbek"
  },
  {
    data:"Агент",
    one:"ТП Shaddodbek",
    two:"ТП Shaddodbek",
    three:"ТП Shaddodbek",
    four:"ТП Shaddodbek",
    fife:"ТП Shaddodbek"
  },
  {
    data:"Экспедитор",
    one:"Experditor",
    two:"Experditor",
    three:"Experditor",
    four:"Experditor",
    fife:"Experditor"
  },
  {
    data:"Дата отгрузки",
    one:"2022-10-14 13:25:10",
    two:"2022-10-14 13:25:10",
    three:"2022-10-14 13:25:10",
    four:"2022-10-14 13:25:10",
    fife:"2022-10-14 13:25:10"
  },
  {
    data:"Дата доставки",
    one:"2022-10-14 13:25:10",
    two:"2022-10-14 13:25:10",
    three:"2022-10-14 13:25:10",
    four:"2022-10-14 13:25:10",
    fife:"2022-10-14 13:25:10"
  },
  {
    data:"Консигнация (дата)",
    one:"2022-10-14 13:25:10",
    two:"2022-10-14 13:25:10",
    three:"2022-10-14 13:25:10",
    four:"2022-10-14 13:25:10",
    fife:"2022-10-14 13:25:10"
  }
])
</script>

<style scoped>

</style>
