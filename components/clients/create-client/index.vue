<template>
  <div class="w-full">
    <div class="flex justify-center w-full">
      <div class="w-[175px] h-[175px] bg-[#D2D7D7] rounded-[50%]"></div>
    </div>
    <div class="flex justify-center w-full text-[24px] font-[600]">
      {{isSaved ? 'Сохранено' : 'Создано'}} успешно!
    </div>
    <div class="flex justify-center mt-4">
      <m-btn @click="$emit('closeDialog')">ОК</m-btn>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  isSaved: Boolean
})
</script>
