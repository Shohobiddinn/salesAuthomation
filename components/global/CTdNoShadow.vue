<template>
  <td class="fs-14 td-styles">
    <div>
      <slot></slot>
    </div>
  </td>
</template>

<script setup>
const props = defineProps({
  keys: Object
})
</script>

<style scoped>
td {
  padding: 10px;
  color: var(--text-primary);
}
.td-styles:last-child{
  display: flex;
  justify-content: center;
  padding-right: 10px;
  position: sticky;
  right: 0px;
  top: auto;
  width: 50px;
  background: white;
  border-top: 1px solid #E1E4E4;
  margin-top: -1px;
}
</style>

