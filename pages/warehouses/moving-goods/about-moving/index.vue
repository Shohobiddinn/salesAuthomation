<template>
  <div>
    <div class="flex justify-between">
      <button @click="$router.go(-1)" class="h-[44px] px-[46px] mt-4 bg-[#FFFFFF] text-black rounded-lg border">
        <div class="flex">
          <IconArrowLeft class="mt-[5px] mr-[10px]"></IconArrowLeft>
          Назад
          <slot></slot>
        </div>
      </button>
    </div>
    <div class="flex justify-between mt-4">
      <page-title :title="'О перемещение'"></page-title>
      <div class="flex gap-8">
        <div>
          <div class="fs-14 fw-4">Дата перемещение</div>
          <div class="fs-16 fw-6">27.10.2022 17:26</div>
        </div>
        <div>
          <div class="fs-14 fw-4">Дата создание</div>
          <div class="fs-16 fw-6">27.10.2022 17:26</div>
        </div>
        <div>
          <div class="fs-14 fw-4">Создал</div>
          <div class="fs-16 fw-6">27.10.2022 17:26</div>
        </div>
        <div>
          <div class="fs-14 fw-4">Создал</div>
          <div class="fs-16 fw-6">27.10.2022 17:26</div>
        </div>
      </div>
    </div>
    <div>
      <DoubleTab first-tab-name="Dena" second-tab-name="Lorem ipsum" third-tab-name="Lorem ipsum" fourth-tab-name="Lorem ipsum" class="mt-6">
        <template #first>
          <WarehousesMovingDataTable/>
        </template>
        <template #second>
          <WarehousesRemainingGoodsFinancialCondationTable/>
        </template>
        <template #third>
          <WarehousesRemainingGoodsAssesmentsWarehousesTable/>
        </template>
      </DoubleTab>
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

