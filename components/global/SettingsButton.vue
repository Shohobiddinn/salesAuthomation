<template>
  <button class="flex border border-blue-10 rounded-lg h-[44px] py-2 px-4">
    <span class="border-r border-gray-40 pr-2"><IconSettingsAltC/></span>
    <span class="ml-2 pr-3 border-r border-gray_4">{{title}}</span>
    <span class="ml-3 mt-2"><IconBottomArrow/></span>
  </button>
</template>

<script setup>
const props = defineProps({
  title:''
})
</script>

<style scoped>

</style>
