<template>
  <div>
    <div class="flex justify-between mt-4">
      <page-title :title="'Остатки товаров'"></page-title>
      <div class="w-120 h-11 flex bg-white rounded-lg mt-4">
        <div v-for="(item) in tabs" class="form_radio_btn inline-block h-full w-[33.3%]">
          <input :id="item.tab" @input="inputValue(item.number)" type="radio" name="product" :value="amount" class="hidden">
          <label :class="[amount === 3 ? 'rounded-r-large' : '' || amount === 1 ? 'rounded-l-large' : '']" :for="item.tab" class="h-buttonHeight text-center inline-block cursor-pointer leading-[100%] hover:text-gray-500 w-full py-[14px] px-4 fs-14">{{item.name}}</label>
        </div>
      </div>
    </div>
    <div v-if="amount === 1">
      <rounded-white-container class="mt-6">
        <div class="grid grid-cols-4 gap-4">
          <multiply-selection :name="'Категории продукта'" :filter.sync="filter.isSelectProduct" @toggle="toggle => filter.isSelectProduct = toggle"/>
          <multiply-selection :name="'Склад'" :filter.sync="filter.isSelectWarehouse" @toggle="toggle => filter.isSelectWarehouse = toggle"/>
          <multiply-selection :name="'Группа продуктов'" :filter.sync="filter.isCash" @toggle="toggle => filter.isCash = toggle"/>
          <multiply-selection :name="'Все продукты'" :filter.sync="filter.isCash" @toggle="toggle => filter.isCash = toggle"/>
          <multiply-selection :name="'Кол-во'" :filter.sync="filter.isSelectQty" @toggle="toggle => filter.isSelectQty = toggle"/>
          <multiply-selection :name="'Сортировка'" :filter.sync="filter.isCash" @toggle="toggle => filter.isCash = toggle"/>
          <span></span>
          <div class="flex justify-end w-full h-40px mt-6">
            <button class="w-[100%] py-2 rounded-lg bg-[#299B9B] text-white">Применить</button>
            <boutton class="mt-3 ml-3"><IconRe/></boutton>
          </div>
        </div>
      </rounded-white-container>
      <DoubleTab first-tab-name="Общее состояние склада" second-tab-name="Финансовое состояние склада" third-tab-name="Оценка склада" class="mt-6">
        <template #first>
          <WarehousesRemainingGoodsGeneralWarehousesTable/>
        </template>
        <template #second>
          <WarehousesRemainingGoodsFinancialCondationTable/>
        </template>
        <template #third>
          <WarehousesRemainingGoodsAssesmentsWarehousesTable/>
        </template>
      </DoubleTab>
    </div>
    <div v-if="amount === 2">
      <rounded-white-container class="mt-6">
        <div class="grid grid-cols-4 gap-4">
          <multiply-selection :name="'Категории продукта'" :filter.sync="filter.isSelectProduct" @toggle="toggle => filter.isSelectProduct = toggle"/>
          <multiply-selection :name="'Склад'" :filter.sync="filter.isSelectWarehouse" @toggle="toggle => filter.isSelectWarehouse = toggle"/>
          <multiply-selection :name="'Статус'" :filter.sync="filter.isSelectStatus" @toggle="toggle => filter.isSelectStatus = toggle"/>
          <multiply-selection :name="'Кол-во'" :filter.sync="filter.isSelectQty" @toggle="toggle => filter.isSelectQty = toggle"/>
        </div>
        <div class="flex justify-end w-full h-40px mt-6">
          <button class="w-[22%] py-2 rounded-lg bg-[#299B9B] text-white">Применить</button>
          <boutton class="mt-3 ml-3"><IconRe/></boutton>
        </div>
      </rounded-white-container>
      <div class="flex gap-4 mt-4">
        <excel-btn :size="'340kb'"></excel-btn>
        <span class="fs-14 mt-2">Тип цены</span>
        <multiply-selections class="w-80 h-[44px]" :name="'Кол-во'" :h="true" :filter.sync="filter.isCash" @toggle="toggle => filter.isCash = toggle"/>
      </div>
      <div class="mt-4">
        <WarehousesRemainingGoodsReturnTable/>
      </div>
    </div>
    <div v-if="amount === 3">
      <rounded-white-container class="mt-6">
        <div class="grid grid-cols-4 gap-4">
          <multiply-selection :name="'Категории продукта'" :filter.sync="filter.isSelectProduct" @toggle="toggle => filter.isSelectProduct = toggle"/>
          <multiply-selection :name="'Склад'" :filter.sync="filter.isSelectWarehouse" @toggle="toggle => filter.isSelectWarehouse = toggle"/>
          <multiply-selection :name="'Статус'" :filter.sync="filter.isSelectStatus" @toggle="toggle => filter.isSelectStatus = toggle"/>
          <multiply-selection :name="'Кол-во'" :filter.sync="filter.isSelectQty" @toggle="toggle => filter.isSelectQty = toggle"/>
        </div>
        <div class="flex justify-end w-full h-40px mt-6">
          <button class="w-[22%] py-2 rounded-lg bg-[#299B9B] text-white">Применить</button>
          <boutton class="mt-3 ml-3"><IconRe/></boutton>
        </div>
      </rounded-white-container>
      <div class="flex gap-4 mt-4">
        <excel-btn :size="'340kb'"></excel-btn>
        <span class="fs-14 mt-2">Тип цены</span>
        <multiply-selections class="w-80 h-[44px]" :name="'Кол-во'" :h="true" :filter.sync="filter.isCash" @toggle="toggle => filter.isCash = toggle"/>
      </div>
      <div class="mt-4">
        <WarehousesRemainingGoodsReserveTable/>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref} from "vue";
const filter = ref({
  isSelectWarehouse: false,
  isSelectStatus: false,
  isSelectProduct: false,
  isSelectQty: false,
})
const clickOutside = () => {
  filter.value.isSelectWarehouse = false;
  filter.value.isSelectAgent = false;
  filter.value.isSelectProduct = false;
  filter.value.isSelectType = false;
  date.value = false
}
const tabs = ref([
  {
    name:"Склад реализации",
    number:1,
    tab:'tab1'
  },
  {
    name:"Склад возврата",
    number:2,
    tab:'tab2'
  },
  {
    name:"Склад резерва",
    number:3,
    tab:'tab3'
  }
])
const amount = ref(1)
function inputValue(param){
  amount.value = param
}
</script>

<style scoped>
.form_radio_btn input[type=radio]:checked + label {
  background: #299B9B;
  color: white;
  text-align: center;
  height: 44px;
}
</style>
