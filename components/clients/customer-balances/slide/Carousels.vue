<template>
  <div class="carousel relative">
    <div @click="prevClick" class="absolute cursor-pointer left-[-14px] h-[28px] w-[28px] rounded-[50%] bg-[#299B9B] flex justify-center items-center top-12"><IconArrowLeftiw/></div>
    <div @click="nextClick" class="absolute cursor-pointer right-[-14px] h-[28px] w-[28px] rounded-[50%] bg-[#299B9B] flex justify-center items-center top-12"><IconArrowRightiw/></div>
    <slot></slot>
  </div>
</template>

<script setup>
const emit = defineEmits([
    'next','prev'
])
function nextClick(){
  emit('next')
}
function prevClick(){
  emit('prev')
}

</script>

<style scoped>

</style>
