<template>
  <div class="mt-2 text-2xl font-semibold text-gray-3">
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
