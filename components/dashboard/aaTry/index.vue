<template>
  <div class="mt-5">
    {{data.name}}
    <input v-model="nam" type="text">
    <button @click="emit('changed',nam)">change</button>
  </div>
</template>

<script setup>
const props = defineProps({
  data:Object
})
const nam = ref('')
const emit = defineEmits(['changed'])
</script>

<style scoped>

</style>
