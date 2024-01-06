<script setup lang="ts">
const props = defineProps({
  boxTitle: String,
  mainPercentage: Number,
  planPercentage: Number,
  factPercentage: Number,
});
</script>

<template>
  <div class="daily-report-box rounded-lg grid p-4">
    <div class="grid grid-rows-2">
      <div class="font-normal fs-14 grid justify-center">
        {{ boxTitle }}
      </div>
      <div class="flex font-semibold text-2xl text-black justify-center">
        {{ mainPercentage }}%
      </div>
    </div>
    <div class="flex justify-center gap-40px">
      <div class="grid grid-rows-2">
        <div class="font-normal fs-14">План</div>
        <div class="flex justify-center font-semibold fs-16 text-black">
          {{ planPercentage }}%
        </div>
      </div>
      <div class="grid grid-rows-2">
        <div class="font-normal fs-14">Факт</div>
        <div class="flex justify-center font-semibold fs-16 text-black">
          {{ factPercentage }}%
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.daily-report-box {
  height: 147px;
}
</style>