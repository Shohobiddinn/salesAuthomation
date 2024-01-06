<template>
  <div class="flex flex-col gap-2 justiyfy-center items-center py-5 rounded-lg">
    <div class="text-3xl font-semibold text-black">{{ amount }}</div>
    <div class="text-black">{{ title }}</div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  amount: Number,
  title: String,
});
</script>

<style>
</style>