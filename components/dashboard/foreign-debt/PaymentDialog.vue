<template>
  <div class="grid grid-cols-1 w-full overflow-y-auto gap-2">
    <div class="flex-row">
      <span class="text-gray-3 fs-14 fw-4">
        Дата оплаты долга
      </span>
    </div>
    <div class="flex-row">
      <d-input-date-picker/>
    </div>
    <div class="flex-row">
      <span class="text-gray-3 fs-14 fw-4">
        Сумма
      </span>
    </div>
    <div class="flex-row">
      <d-input placeholder="Введите"
               type="text"
               class="w-full"/>
    </div>
    <div class="flex justify-between mt-2">
      <div class="fs-14">Общая сумма долга</div>
      <div class="fs-16 font-[500]">1 000 000</div>
    </div>
    <div class="flex flex-row z-50 mt-2 items-center justify-between w-full gap-2">
      <m-btn class="grow" @click="save">
        Добавить
      </m-btn>
    </div>
  </div>
</template>

<script setup lang="ts">


</script>

<style scoped>
.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #ffffff;
  z-index: 1;
}

.dropdown-content a {
  text-decoration: none;
  display: block;
}

.dropdown-content a:hover {
  background-color: #ddd;
}

.show {
  display: block;
}
</style>
