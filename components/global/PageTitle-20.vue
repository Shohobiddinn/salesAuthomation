<template>
  <div class="mt-2 text-[20px] font-[600] text-[#424F4F]">
    {{title}}
  </div>
</template>

<script setup>
const props = defineProps({
  title:{
    type:String,
    default:false
  }
})
</script>

<style scoped>

</style>

