<template>
  <div>
    <button @click="$router.go(-1)" class="h-[44px] px-[46px] mt-4 bg-[#FFFFFF] text-black rounded-lg border">
      <div class="flex">
        <IconArrowLeft class="mt-[5px] mr-[10px]"></IconArrowLeft>
        Назад
        <slot></slot>
      </div>
    </button>
    <InputFormsPayment/>
    <div class="flex justify-end">
      <m-btn>Добавить</m-btn>
    </div>
  </div>
</template>

<script setup>

import InputFormsPayment from "~/components/finans/InputFormsPayment.vue";
</script>

<style scoped>

</style>
