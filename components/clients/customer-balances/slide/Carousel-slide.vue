<template>
  <div v-show="visibleSlide.includes(index)">
    <slot></slot>
  </div>
</template>

<script setup>
const props = defineProps({
  visibleSlide: Array,
  index:Number
})
</script>

<style scoped>

</style>
