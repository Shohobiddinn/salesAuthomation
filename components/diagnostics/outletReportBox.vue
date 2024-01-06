<template>
  <div class="rounded-lg flex justify-center items-center py-11">
    <div class="flex gap-5">
      <div
        class="h-[53px] w-[53px] rounded-[50%] flex justify-center items-center bg-[#E2EBE1]"
      >
        <IconCheck :color="'#23C00A'" :size="'32'" v-if="icon === 'check'" />
        <IconCalendar v-if="icon === 'calendar'" />
        <IconHourGlass v-if="icon === 'hourGlass'" />
        <IconReloadSVG v-if="icon === 'reload'" />
      </div>
      <div class="flex flex-col">
        <div class="font-seimbold text-black text-2xl">{{ amount }}</div>
        <div class="fs-12 text-[#89A385]">{{ text }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  amount: Number,
  icon: String,
  text: String,
});
</script>

<style>
</style>