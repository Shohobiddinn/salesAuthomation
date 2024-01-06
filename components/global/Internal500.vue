<template>
  <div class="w-full">
    <div class="flex justify-center">
      <h1 class="text-red font-bold text-[34px] mt-4">Ошибка</h1>
    </div>
    <div class="">
      <div class="text-[24px] flex justify-center">
        <span>
          {{ data?.name }}
        </span>
      </div>
      <div class="flex justify-center">
        <span v-if="data?.messages[0]" class="text-[18]">
          {{ data.messages[0] }}
        </span>
        <span v-if="message" class="text-[18]">
          {{ message }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  data: Object,
  message: String,
});
</script>

<style scoped></style>
