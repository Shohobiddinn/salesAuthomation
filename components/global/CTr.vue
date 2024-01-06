<template>
  <tr class="w-full" :class="trBg ? 'bg' : ''">
    <slot></slot>
  </tr>
</template>

<script setup>
const props = defineProps({
  trBg: Boolean,
})
</script>

<style scoped>
tr {
  border-top-width: 1px;
  border-bottom-width: 1px;
  border-color: var(--primary-gray);
}
.bg:nth-child(1) {
  background: #f1fefe;
}
.bg:nth-child(2) {
  background: #f1fefe;
}
</style>
