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
    <page-title :title="'Возврат поставщика 2'"></page-title>
    <rounded-white-container class="mt-4">
      <div class="grid grid-cols-3 gap-4">
        <multiply-selection :name="'Склад'" :filter.sync="filter.isCash" @toggle="toggle => filter.isCash = toggle"/>
        <div>
          <div class="flex-row">
             <span class="text-gray-3 fs-12 fw-4">
                Действителен с
             </span>
          </div>
          <div class="flex-row mt-2">
            <d-input-date-picker placeholder="Введите" class="w-full" type="text"/>
          </div>
        </div>
        <multiply-selection :name="'Дата до'" :filter.sync="filter.isCash" @toggle="toggle => filter.isCash = toggle"/>
      </div>
      <div class="grid grid-cols-2 gap-4 mt-3">
        <multiply-selection :name="'Склад приёма *'" :filter.sync="filter.isCash" @toggle="toggle => filter.isCash = toggle"/>
        <multiply-selection :name="'Комментарий к заказу *'" :filter.sync="filter.isCash" @toggle="toggle => filter.isCash = toggle"/>
      </div>
    </rounded-white-container>
    <div>
      <WarehousesSuplierRefundRefunTable/>
    </div>
    <div class="flex justify-between mt-4">
      <div class="flex gap-4">
        <button class="w-54 bg-blue-600 text-white p-2 rounded-lg">Импорт из файла</button>
        <button class="w-54 border border-blue-600 bg-white p-2 rounded-lg">Скачать шаблон</button>
      </div>
      <m-btn class="w-54">Сохранить</m-btn>
    </div>
  </div>
</template>

<script setup>
import {ref} from "vue";

const filter = ref({
  isSelectWarehouse: false,
  isSelectAgent: false,
  isSelectProduct: false,
  isSelectType: false,
})
const clickOutside = () => {
  filter.value.isSelectWarehouse = false;
  filter.value.isSelectAgent = false;
  filter.value.isSelectProduct = false;
  filter.value.isSelectType = false;
  date.value = false
}
</script>

<style scoped>

</style>
