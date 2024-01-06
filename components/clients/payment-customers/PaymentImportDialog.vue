<template>
  <div class="w-full">
    <div class="flex justify-between w-full">
      <div class="mt-2">Выберите файл для импорта с расширением excel</div>
      <div>
        <button class="flex rounded-lg border border-[#299B9B] p-2 px-4">
          <div class="mr-2"><imports /></div>
          <div class="fs-14 mt-[2px]">Выбрать и загрузить файл</div>
        </button>
      </div>
    </div>
    <div v-click-outside="clickOutside" class="flex justify-between mt-6">
      <div class="flex p-2">
        <div class="mt-2">Касса:</div>
        <div class="w-[287px] ml-4 mr-4">
          <multiply-selections
            :name="'Выбрать'"
            :filter="filter.isCash"
            @toggle="(toggle) => (filter.isCash = toggle)"
          />
        </div>
      </div>
      <div class="mt-2"><m-btn>Далее</m-btn></div>
    </div>
  </div>
</template>

<script setup>
import Imports from "~/components/icon/Imports.vue";

const filter = ref({
  isCash: false,
});
function clickOutside() {
  filter.value.isCash = false;
}
</script>

<style scoped>
</style>
