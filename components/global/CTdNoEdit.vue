<template>
  <td class="fs-14" :class="!customPadding && !orderBy ? 'c-td-no-edit' : ''">
    <div>
      <slot></slot>
    </div>
  </td>
</template>

<script setup>
// Props
const props = defineProps({
  customPadding: {
    default: false,
    type: Boolean,
  },
  orderBy: Boolean,
})
</script>

<style scoped>
.c-td-no-edit {
  padding: 4px 14px;
  color: var(--text-primary);
}
</style>
