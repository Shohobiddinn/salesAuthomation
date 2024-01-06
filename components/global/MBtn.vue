<template>
  <button
    class="button-bg px-8 h-[42px] fs-14 fw-4 flex justify-center items-center gap-2 text-white rounded-lg hover:bg-teal-600 active:bg-teal-700"
    :class="isDisable && 'cursor-not-allowed opacity-30'"
    :disabled="isDisable"
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
