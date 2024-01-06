<template>
  <div
    class="flex flex-col justify-center rounded-lg items-center gap-3 py-10.5"
  >
    <p class="text-xs mb-0" :class="titleColor">{{ title }}</p>
    <div class="font-semibold flex gap-1 items-center">
      <div class="text-lg" :class="sumColor">{{ sum }}</div>
      <span class="text-black text-xs mt-1">UZS</span>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  title: String,
  titleColor: {
    type: String,
    default: "textblack",
  },
  sum: String,
  sumColor: {
    type: String,
    default: "textblack",
  },
});
</script>

<style>
</style>