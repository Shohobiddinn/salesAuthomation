<template>
  <div class="grid grid-cols-1 w-full gap-2">
    <div class="flex-row">
      <span class="fs-14 fw-4 text-gray-3">
        Логин
      </span>
    </div>
    <div class="flex-row">
      <d-input placeholder="Введите e-mail"
               class="w-full"
               type="text"/>
    </div>
    <div class="flex-row">
      <span class="text-gray-3 fs-14 fw-4">
        Старый пароль
      </span>
    </div>
    <div class="flex-row">
      <d-input placeholder="**********"
               type="text"
               class="w-full"/>
    </div>
    <div class="flex-row">
      <span class="text-gray-3 fs-14 fw-4">
        Новый пароль
      </span>
    </div>
    <div class="flex-row">
      <d-input placeholder="**********"
               type="text"
               class="w-full"/>
    </div>
    <div class="flex-row">
      <span class="text-gray-3 fs-14 fw-4">
        Повторите новый пароль
      </span>
    </div>
    <div class="flex-row">
      <d-input placeholder="**********"
               type="text"
               class="w-full"/>
    </div>

    <div class="flex flex-row mt-2 items-center justify-between w-full gap-2">
      <m-btn @click="save" class="grow">
        Сохранять
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
