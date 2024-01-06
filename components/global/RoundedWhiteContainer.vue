<template>
  <div class="rounded-large bg-white w-full" :class="{'p-4': !withoutPadding}">
    <slot></slot>
  </div>
</template>

<script setup>

// Props
const props = defineProps({
  withoutPadding: {
    default: false,
    type: Boolean
  }
})

</script>

<style scoped>

</style>
