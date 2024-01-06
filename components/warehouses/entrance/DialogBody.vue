<template>
  <div class="w-full">
    <div class="flex mt-[-50px] gap-4">
      <page-title20 :title="'Импортирвание продуктов из файла excel'"/>
      <div class="mt-2">
        <excel-btn :size="'340kb'"></excel-btn>
      </div>
    </div>
    <div class="grid grid-cols-3 gap-4 w-[100%] mt-6">
      <multiply-selection :name="'Склад'" :filter.sync="filter.isCash" @toggle="toggle => filter.isCash = toggle"/>
      <multiply-selection :name="'Дата прихода'" :filter.sync="filter.isCash" @toggle="toggle => filter.isCash = toggle"/>
      <multiply-selection :name="'Поставщик'" :filter.sync="filter.isCash" @toggle="toggle => filter.isCash = toggle"/>
    </div>
    <div class="grid grid-cols-2 gap-4 mt-4">
      <multiply-selection :name="'Тип цены'" :filter.sync="filter.isCash" @toggle="toggle => filter.isCash = toggle"/>
      <multiply-selection :name="'Тип цены'" :filter.sync="filter.isCash" @toggle="toggle => filter.isCash = toggle"/>
    </div>
    <div class="flex justify-between w-full mt-6">
      <div class="mt-2">Выберите файл для импорта с расширением excel</div>
      <div>
        <button class="flex rounded-lg border border-[#299B9B] p-2 px-4">
          <div class="mr-2"><imports/></div>
          <div class="fs-14 mt-[2px]">Выбрать и загрузить файл</div>
        </button>
      </div>
    </div>
    <div v-click-outside="clickOutside" class="flex justify-end mt-6">
      <div class="mt-2"><m-btn class="w-[200px]">Далее</m-btn></div>
    </div>
  </div>

</template>

<script setup>
import Imports from "~/components/icon/Imports.vue";

const filter = ref({
  isCash: false
})
function clickOutside(){
  filter.value.isCash = false
}
</script>

<style scoped>

</style>
