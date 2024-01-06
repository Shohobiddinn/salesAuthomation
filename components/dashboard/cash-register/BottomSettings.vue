<template>
  <div class="grid grid-cols-2 justify-between w-full gap-2">
    <div class="grid grid-cols-2 tab-btn">
      <button class="px-3 py-3 fs-14 fw-4 rounded-l-lg"
              @click="activeTab = (activeTab !== 1 ? 1 : 0)"
              :class="activeTab === 1 ?
                  'text-white button-bg hover:bg-teal-600 active:bg-teal-700':
                  'border-1 border border-color-primary'">
        Прикрепить екпедиторва
      </button>
      <button class="px-3 py-3 fs-14 fw-4 rounded-r-lg"
              @click="activeTab = (activeTab !== 2 ? 2 : 0)"
              :class="activeTab === 2 ?
                  'text-white button-bg hover:bg-teal-600 active:bg-teal-700':
                  'border-1 border border-color-primary border-l-0'">
        Объеденить заказы
      </button>
    </div>
  </div>
  <div class="border-1 bg-white rounded-large p-5 my-4 w-10/12 gap-4"
       v-if="activeTab === 1">
    <div class="flex flex-row my-2">
      <span class="text-gray-3 fs-12 fw-4">
        Ставка НДС
      </span>
      <span class="ml-2 -mt-1">
        №19658
      </span>
    </div>
    <div class="flex flex-row gap-4">
      <div class="mt-2">Выберите экспедитора:</div>
      <select class="border w-70 h-[42px] bg-[#FAFDFD] rounded-lg mt-[1px] mr-[18px] pl-[15px]">
        <option value="">Выбрать</option>
        <option value="">hello</option>
        <option value="">hello</option>
        <option value="">hello</option>
      </select>
      <m-btn class="w-50" @click="save">
        Сохранить
      </m-btn>
    </div>
  </div>

</template>

<script setup lang="ts">
// State

let activeTab = ref(0);


</script>

<style scoped>
.my-input:active {
  border-color: var(--primary-color);
}
.my-input:focus {
  outline: none !important;
  border: 1px solid var(--primary-color);
}
</style>
