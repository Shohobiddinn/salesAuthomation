<template>
  <div>
    <div class="flex justify-between">
      <button @click="$router.go(-1)" class="h-[44px] px-[46px] mt-4 bg-white text-black rounded-lg border">
        <div class="flex">
          <IconArrowLeft class="mt-[5px] mr-[10px]"></IconArrowLeft>
          Назад
          <slot></slot>
        </div>
      </button>
    </div>
    <page-title :title="'Корректировка склада'"/>
    <div class="grid grid-cols-4 gap-4 mt-2">
      <div class="mt-2">
        <div class="fs-12 mb-2">Дата</div>
        <DInputDatePicker/>
      </div>
      <div class="mt-2 w-full">
        <div class="fs-12 mb-2">Комментарий</div>
        <d-input class="w-full"/>
      </div>
      <multiply-selection :name="'Склад'" :filter.sync="filter.isCash" @toggle="toggle => filter.isCash = toggle"/>
      <multiply-selection :name="'Тип цены'" :filter.sync="filter.isCash" @toggle="toggle => filter.isCash = toggle"/>
    </div>
    <div class="flex mt-6">
      <div class="" >
        <div class="w-[260px] mr-5 settings-content-item">
          <div class="flex justify-center w-full py-4">
            <search-input/>
          </div>
          <div class="settings-sidebar"
               :class="{activeColor: name.index === index}"
               v-for="(menu, index) in teamsMenu"
               :key="menu">
            <div @click="filterProduct(index)">
              {{ menu.name }}
            </div>
          </div>
        </div>
      </div>
      <div class="teams" >
         <WarehousesAdjustmentsTable/>
      </div>
    </div>
  </div>
</template>

<script setup>
const filter = ref({
  isCash:false
})
const teamsMenu = ref([
  {
    id: 1,
    name: "Dena",
    nameEng: "dena",
  },
  {
    id: 2,
    name: "Dena zavrik",
    nameEng: "zavrik",
  },
  {
    id: 3,
    name: "Pepsi",
    nameEng: "pepsi",
  },
  {
    id: 4,
    name: "Coca cola",
    nameEng: "coca cola",
  },
  {
    id: 5,
    name: "Напитки",
    nameEng: "Напитки",
  },
])
const router = useRouter()
const name = ref({
  index:0
})
function filterProduct(index){
  name.value.index = index
}
</script>

<style scoped>
.teams{
  width: calc(100% - 280px)
}
</style>
