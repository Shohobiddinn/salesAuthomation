<template>
  <button
    class="bg-[#EEF5F5] px-8 py-3 fs-14 fw-4 text-gray-3 rounded-lg hover:bg-gray-100 active:bg-gray-50"
    :class="isDisable && 'cursor-not-allowed opacity-30'"
  >
    <IconLoading :loading="loading" color="#fff" />
    <slot></slot>
  </button>
</template>

<script setup>
const props = defineProps({
  loading: Boolean,
  disabled: Boolean,
});
const isDisable = computed(() => {
  if (props.disabled || props.loading) return true;
  return false;
});
</script>

<style scoped></style>
