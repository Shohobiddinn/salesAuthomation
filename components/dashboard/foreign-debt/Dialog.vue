<template>
  <div class="grid grid-cols-1 h-100 w-full overflow-y-auto gap-2 pb-11">
    <div class="flex-row">
      <span class="fs-14 fw-4 text-gray-3">
        Имя и фамилия
      </span>
    </div>
    <div class="flex-row">
      <select class="border w-full h-[42px] bg-[#FAFDFD] rounded-lg mt-[1px] mr-[18px] pl-[15px]">
        <option value="">Выбрать</option>
        <option value="">hello</option>
        <option value="">hello</option>
        <option value="">hello</option>
      </select>
    </div>
    <div class="flex-row">
      <span class="text-gray-3 fs-14 fw-4">
        Дата получение долга
      </span>
    </div>
    <div class="flex-row">
      <d-input-date-picker/>
    </div>
    <div class="flex-row">
      <span class="text-gray-3 fs-14 fw-4">
        Оплачет до
      </span>
    </div>
    <div class="flex-row">
      <d-input-date-picker/>
    </div>
    <div class="flex-row">
      <span class="text-gray-3 fs-14 fw-4">
        Сумма долга
      </span>
    </div>
    <div class="flex-row">
      <d-input placeholder="Введите"
               type="text"
               class="w-full"/>
    </div>
    <div class="flex-row">
      <span class="text-gray-3 fs-14 fw-4">
        Комментарии
      </span>
    </div>
    <div class="flex-row">
      <d-input placeholder="Введите"
               type="text"
               class="w-full"/>
    </div>
    <div class="flex flex-row z-50 -bottom-4 bg-white absolute mt-2 items-center justify-between w-full gap-2">
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
