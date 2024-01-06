<template>
  <input @keydown="defineOk" type="button" class="fixed z-[9999999] top-0 left-0 w-[100%] h-[100%] bg-[rgba(0,0,0,0.8)] flex items-center justify-center"/>
</template>

<script setup>
const emit = defineEmits(['defineOk'])
function defineOk(){
  emit('defineOk')
}
</script>

<style scoped>

</style>
