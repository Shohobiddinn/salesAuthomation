<template>
  <div class="w-full">
    <div class="flex justify-between w-full">
      <div class="mt-2 fs-14">Пожалуйста, выберите подходящие столбцы к параметрам транзакций из списка.</div>
    </div>
    <div v-click-outside="clickOutside" class="grid grid-cols-2 gap-4 mt-6">
      <div class="mt-2">ИД</div>
      <div class="w-full ml-4 mr-4">
        <multiply-selections :filter="filter.isId" @toggle="toggle => filter.isId = toggle"/>
      </div>
      <div class="mt-2">Сумма</div>
      <div class="w-full ml-4 mr-4">
        <multiply-selections :filter="filter.isSum" @toggle="toggle => filter.isSum = toggle"/>
      </div>
      <div class="mt-2">Дата</div>
      <div class="w-full ml-4 mr-4">
        <DInputDatePicker @change="(newDate) => date = newDate"/>
      </div>
      <div class="mt-2">Комментарий</div>
      <div class="w-full ml-4 mr-4">
        <multiply-selections :filter="filter.isComments" @toggle="toggle => filter.isComments = toggle"/>
      </div>
    </div>
    <div class="mt-6 flex justify-end"><m-btn>Сохранить</m-btn></div>
  </div>

</template>

<script setup>
import Imports from "~/components/icon/Imports.vue";

const filter = ref({
  isId: false,
  isSum: false,
  isDate: false,
  isComments: false
})
function clickOutside(){
  filter.value.isCash = false
}
</script>

<style scoped>

</style>

