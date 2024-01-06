<template>
  <div class="grid grid-cols-2 w-full gap-5">
    <div class="grid gap-2">
      <div class="flex-row pb-4">
        <span class="fs-14 fw-4 text-gray-3"> Название товара </span>
      </div>
      <div class="flex-row">
        <div class="w-full fs-18 fw-6">"Coca-cola" 0.5, пэт</div>
      </div>

      <div class="flex-row">
        <span class="fs-14 fw-4 text-gray-3"> Производитель </span>
      </div>
      <div class="flex-row">
        <select
          class="border w-full h-[42px] bg-[#FAFDFD] rounded-lg mt-[1px] mr-[18px] pl-[15px]"
        >
          <option value="">Выбрать</option>
          <option value="">hello</option>
          <option value="">hello</option>
          <option value="">hello</option>
        </select>
      </div>

      <div class="flex-row">
        <span class="fs-14 fw-4 text-gray-3"> Сегмент </span>
      </div>
      <div class="flex-row">
        <select
          class="border w-full h-[42px] bg-[#FAFDFD] rounded-lg mt-[1px] mr-[18px] pl-[15px]"
        >
          <option value="">Выбрать</option>
          <option value="">hello</option>
          <option value="">hello</option>
          <option value="">hello</option>
        </select>
      </div>

      <div class="flex-row">
        <span class="fs-14 fw-4 text-gray-3"> Дополнительная группировка </span>
      </div>
      <div class="flex-row">
        <select
          class="border w-full h-[42px] bg-[#FAFDFD] rounded-lg mt-[1px] mr-[18px] pl-[15px]"
        >
          <option value="">Выбрать</option>
          <option value="">hello</option>
          <option value="">hello</option>
          <option value="">hello</option>
        </select>
      </div>
    </div>

    <div class="grid gap-">
      <div class="flex-row">
        <span class="fs-14 fw-4 text-gray-3"> Бренд </span>
      </div>
      <div class="flex-row">
        <select
          class="border w-full h-[42px] bg-[#FAFDFD] rounded-lg mt-[1px] mr-[18px] pl-[15px]"
        >
          <option value="">Выбрать</option>
          <option value="">hello</option>
          <option value="">hello</option>
          <option value="">hello</option>
        </select>
      </div>
      <div class="flex-row">
        <span class="fs-14 fw-4 text-gray-3"> Тип упаковки </span>
      </div>
      <div class="flex-row">
        <select
          class="border w-full h-[42px] bg-[#FAFDFD] rounded-lg mt-[1px] mr-[18px] pl-[15px]"
        >
          <option value="">Выбрать</option>
          <option value="">hello</option>
          <option value="">hello</option>
          <option value="">hello</option>
        </select>
      </div>

      <div class="grid grid-cols-2 my-9">
        <div class="flex flex-row items-center gap-2 mt-1">
          <span class="text-gray-3 fs-14 fw-4"> Aктивный  </span>
          <label class="switch">
            <input type="checkbox" />
            <span class="slider round"></span>
          </label>
        </div>
        <div class="flex flex-row items-center gap-2 mt-1">
          <span class="text-gray-3 fs-14 fw-4"> Aктивный  </span>
          <label class="switch">
            <input  type="checkbox" />
            <span class="slider round"></span>
          </label>
        </div>
      </div>

      <div class="flex flex-row mt-2 items-center justify-between w-full gap-2">
        <m-btn class="grow" @click="save"> Сохранить </m-btn>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { notify } from "@kyvg/vue3-notification";

const save = async () => {
  notify({ title: "Пожалуйста подождите!" });

  notify({ title: "Сохранено!" });
};

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
</style>