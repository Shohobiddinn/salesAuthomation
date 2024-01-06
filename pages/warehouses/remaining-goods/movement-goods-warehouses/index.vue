<template>
  <div>
    <button @click="$router.go(-1)" class="h-11 px-11 mt-4 bg-white text-black rounded-lg border">
        <span class="flex">
          <IconArrowLeft class="mt-[5px] mr-[10px]"></IconArrowLeft>
          Назад
          <slot></slot>
        </span>
    </button>
    <page-title :title="'Движения товаров на складе'"/>
    <rounded-white-container class="mt-6">
      <div class="flex gap-4 w-full">
        <multiply-selection :name="'Категории продукта'" :filter.sync="filter.isSelectProduct" @toggle="toggle => filter.isSelectProduct = toggle" class="w-[40%]"/>
        <multiply-selection :name="'Склад'" :filter.sync="filter.isSelectWarehouse" @toggle="toggle => filter.isSelectWarehouse = toggle" class="w-[40%]"/>
        <div class="flex justify-end w-[20%] h-40px mt-[34px]">
          <button class="w-[100%] py-2 rounded-lg bg-[#299B9B] text-white">Применить</button>
          <boutton class="mt-3 ml-3"><IconRe/></boutton>
        </div>
      </div>
    </rounded-white-container>
    <div class="mt-6">
      <WarehousesRemainingGoodsMovementGoodsTable/>
    </div>
    <div class="mt-4">
      <button class="p-2 fs-14 rounded-lg border border-blue-20 bg-white px-5">Корректировать склад</button>
    </div>
  </div>
</template>

<script setup>
import {ref} from "vue";
const filter = ref({
  isSelectWarehouse: false,
  isSelectProduct: false
})
const clickOutside = () => {
  filter.value.isSelectWarehouse = false;
  filter.value.isSelectProduct = false;
}
</script>

<style scoped>

</style>
