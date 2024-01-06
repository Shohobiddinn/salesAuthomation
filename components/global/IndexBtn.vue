<template>
  <button
    class="px-2 py-1.5 md-btn fs-14 fw-4 rounded-lg"
    :class="
      isActive
        ? 'hover:bg-teal-600 active:bg-teal-700 text-white button-bg border-1'
        : 'border-1 border-primary-gray hover:bg-gray-50 active:bg-gray-100 text-black bg-white'
    "
  >
    <slot></slot>
  </button>
</template>

<script setup>
const props = defineProps({
  isActive: Boolean,
})
</script>

<style scoped>
.md-btn {
  min-width: 35px;
}
</style>
