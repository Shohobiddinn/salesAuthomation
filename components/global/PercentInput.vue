<template>
  <div class="flex flex-row">
    <span class="button-bg px-4 py-2 rounded-l-lg text-white">
      %
    </span>
    <d-input :value="value"
             class="rounded-l-0 max-w-[100px]"
             placeholder="%"
             type="number"
             @change="event => emit('change', event)"/>
  </div>
</template>

<script setup>
const props = defineProps({
  value: Number
})
const emit = defineEmits(["change"])


</script>

<style scoped>
.button-bg{
  background-color: #336666;
}
</style>
