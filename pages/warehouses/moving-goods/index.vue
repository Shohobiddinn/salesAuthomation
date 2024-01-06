<template>
  <div>
    <page-title :title="'Перемещение товара'"/>
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
      <WarehousesMovingGoodsDataTable/>
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
