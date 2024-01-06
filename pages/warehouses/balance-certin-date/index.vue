<template>
  <div>
    <page-title :title="'Остатки на определенную дату ( доступно с 21.10.2021)'"/>
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
    <div class="mt-6">
      <WarehousesBalanceCertinDateDataTable/>
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
