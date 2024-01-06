<template>
  <div class="flex flex-col gap-6 py-11 px-5">
    <back-btn @click="$router.go(-1)" class="w-1/8"></back-btn>
    <FinansInputFormsPayment
      :pageTitle="'Добавить оплату'"
      :secondaryTitle="'О клиенте'"
    />
    <div class="flex justify-end">
      <m-btn>Добавить</m-btn>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style>
</style>