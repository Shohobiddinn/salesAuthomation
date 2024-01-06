<template>
  <div
    class="flex flex-col justify-center rounded-lg items-center bg-white gap-3 py-10.5"
  >
    <p class="text-xs text-[#778E92] mb-0">{{ title }}</p>
    <div class="text-black font-semibold text-2xl">{{ amount }}</div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  title: String,
  amount: Number,
});
</script>

<style>
</style>