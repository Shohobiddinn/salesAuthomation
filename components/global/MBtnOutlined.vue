<template>
  <div
    :class="[isSelect ? 'border-red' : '']"
    class="cursor-pointer border-1 border-blue-700 px-8 py-2 fs-14 fw-4 text-gray-3 rounded-lg hover:bg-gray-50 active:bg-gray-200"
  >
    <slot></slot>
  </div>
</template>

<script setup>
const props = defineProps({
  isSelect: Boolean,
});
</script>

<style scoped></style>
