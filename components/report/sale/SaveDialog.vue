<template>
  <div class="grid grid-cols-1 w-full gap-2">
    <div class="flex-row">
      <span class="fs-14 fw-4 text-gray-3"> Название отчёта </span>
    </div>
    <div class="flex-row">
      <d-input
        placeholder="Введите"
        class="w-full"
        type="text"
        @change="(value) => (value = value)"
      />
    </div>

    <div class="flex flex-row mt-2 items-center justify-between w-full gap-2">
      <m-btn class="grow"> Добавить </m-btn>
    </div>
  </div>
</template>

<script setup></script>
