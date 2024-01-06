<template>
  <div v-click-outside="clickOutside" class="w-full">
    <div class="flex-row">
          <span class="text-gray-3 fs-14 fw-4">
           Клиент
          </span>
    </div>
    <div  class="flex-row relative">
      <div @click="filter.isSelectProduct = !filter.isSelectProduct" class="w-full relative flex pt-2 h-[42px] border rounded-lg bg-[#FAFDFD]">
        <div class="ml-4 mt-2">
          <IconArrowBottom/>
        </div>
        <div class="fs-14 text-gray ml-2">Выбрать</div>
      </div>
      <div v-if="filter.isSelectProduct" class="absolute w-full  pt-2 border top-[50px] z-50 rounded-lg bg-[#FAFDFD]">
        <div class="flex pl-3 border-b border-[#E1E4E4]">
          <div>
            <label>
              <input type='checkbox'>
              <span></span>
            </label>
          </div>
          <div class="fs-14 ml-2">Select all</div>
        </div>
        <div class="h-[200px] overflow-auto mr-3 ">
          <div style="border-bottom-right-radius: 8px; border-bottom-left-radius: 8px" class="absolute flex justify-center bottom-0 h-40px w-100 bg-white z-[9999]">
            <button class="w-[80%] bg-[#299B9B] fs-12 h-[30px] text-white rounded-lg mt-1">load </button>
          </div>
          <div v-for="i in 15" class="flex pl-3 pt-2">
            <div>
              <label>
                <input type='checkbox'>
                <span></span>
              </label>
            </div>
            <div class="fs-14 ml-2">Checkbox</div>
          </div>
        </div>
      </div>
    </div>
    <div class="border mt-8 ml-[-30px] w-[620px]"></div>
    <div class="grid grid-cols-3 gap-4 mt-3">
      <div class="mt-8 fs-14 font-[600]">Курс</div>
      <div>
        <div class="fs-14">Доллар сша</div>
        <div class="mt-3">
          <d-input placeholder="1" type="text" class="w-full"/>
        </div>
      </div>
      <div>
        <div class="fs-14">Наличный сум</div>
        <div class="mt-3">
          <d-input placeholder="10000" type="text" class="w-full"/>
        </div>
      </div>
    </div>
    <div class="grid grid-cols-3 gap-4 ">
      <div class="mt-8 fs-14 font-[600]">Сумма</div>
      <div class="mt-8 fs-14 font-[400]">10 000 000 Сум</div>
      <div class="mt-8 fs-14 font-[400]">10 000 000 Сум</div>
    </div>
    <div class="grid grid-cols-2 gap-4 mt-6">
      <button class="bg-gray-100 rounded-lg h-[44px]">Закрыть</button>
      <button class="bg-[#299B9B] text-white rounded-lg h-[44px]">Конвертация</button>
    </div>
  </div>
</template>

<script setup>
import {ref} from "vue";

const filter = ref({
  isSelectProduct: false,
})
const clickOutside = () => {
  filter.value.isSelectProduct = false;
}
</script>

<style scoped>

</style>
