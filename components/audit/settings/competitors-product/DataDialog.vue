<template>
  <div class="grid grid-cols-1 w-full gap-5">
    <div class="w-367px">
      <div class="grid grid-cols-2 tab-btn">
        <button
          class="px-3 py-3 fs-14 fw-4 rounded-l-lg"
          @click="activeTab = activeTab !== 1 ? 1 : 0"
          :class="
            activeTab === 1
              ? 'text-white button-bg hover:bg-teal-600 active:bg-teal-700'
              : 'border-1 border border-color-primary'
          "
        >
          Основное
        </button>
        <button
          class="px-5 py-3 fs-14 fw-4 rounded-r-lg"
          @click="activeTab = activeTab !== 2 ? 2 : 0"
          :class="
            activeTab === 2
              ? 'text-white button-bg hover:bg-teal-600 active:bg-teal-700'
              : 'border-1 border border-color-primary border-l-0'
          "
        >
          Дополнительное
        </button>
      </div>
    </div>
    <div v-if="activeTab  === 1" class="grid grid-cols-2 w-full gap-5">
      <div class="grid gap-2">
        <div class="flex-row">
          <span class="fs-14 fw-4 text-gray-3"> Категория </span>
        </div>
        <div class="flex-row">
          <select
            class="border w-full h-[42px] bg-[#FAFDFD] rounded-lg mt-[1px] mr-[18px] pl-[15px]"
          >
            <option value="">Coca cola</option>
            <option value="">hello</option>
            <option value="">hello</option>
            <option value="">hello</option>
          </select>
        </div>

        <div class="flex-row">
          <span class="fs-14 fw-4 text-gray-3"> Единица измерения </span>
        </div>
        <div class="flex-row">
          <select
            class="border w-full h-[42px] bg-[#FAFDFD] rounded-lg mt-[1px] mr-[18px] pl-[15px]"
          >
            <option value="">Выберите единицу измерение</option>
            <option value="">hello</option>
            <option value="">hello</option>
            <option value="">hello</option>
          </select>
        </div>

        <div class="flex-row">
          <span class="fs-14 fw-4 text-gray-3"> Количество в упаковке </span>
        </div>
        <div class="flex-row">
          <d-input
            placeholder="Введите"
            class="w-full"
            type="text"
            @change="(value) => (value = value)"
          />
        </div>

        <div class="flex flex-row items-center gap-4 my-4">
          <span class="text-gray-3 fs-14 fw-4"> Aктивный  </span>
          <label class="switch">
            <input type="checkbox" />
            <span class="slider round"></span>
          </label>
        </div>
      </div>

      <div class="grid gap-2">
        <div class="flex-row">
          <span class="fs-14 fw-4 text-gray-3"> Названия </span>
        </div>
        <div class="flex-row">
          <d-input
            placeholder="Введите"
            class="w-full"
            type="text"
            @change="(value) => (value = value)"
          />
        </div>

        <div class="flex-row">
          <span class="fs-14 fw-4 text-gray-3"> Объем </span>
        </div>
        <div class="flex-row">
          <d-input
            placeholder="Введите"
            class="w-full"
            type="text"
            @change="(value) => (value = value)"
          />
        </div>

        <div class="flex-row">
          <span class="fs-14 fw-4 text-gray-3"> Вес </span>
        </div>
        <div class="flex-row">
          <d-input
            placeholder="Введите"
            class="w-full"
            type="text"
            @change="(value) => (value = value)"
          />
        </div>

        <div
          class="flex flex-row mt-2 items-center justify-between w-full gap-2"
        >
          <m-btn class="grow" @click="save"> Сохранить </m-btn>
        </div>
      </div>
    </div>  

    <div v-if="activeTab === 2" class="grid grid-cols-2 w-full gap-5">
      <div class="grid gap-2">
        <div class="flex-row">
          <span class="fs-14 fw-4 text-gray-3"> Сортировак </span>
        </div>
        <div class="flex-row">
          <select
            class="border w-full h-[42px] bg-[#FAFDFD] rounded-lg mt-[1px] mr-[18px] pl-[15px]"
          >
            <option value="">Coca cola</option>
            <option value="">hello</option>
            <option value="">hello</option>
            <option value="">hello</option>
          </select>
        </div>

        <div class="flex-row">
          <span class="fs-14 fw-4 text-gray-3"> Группа продуктов </span>
        </div>
        <div class="flex-row">
          <select
            class="border w-full h-[42px] bg-[#FAFDFD] rounded-lg mt-[1px] mr-[18px] pl-[15px]"
          >
            <option value="">Выберите единицу измерение</option>
            <option value="">hello</option>
            <option value="">hello</option>
            <option value="">hello</option>
          </select>
        </div>

        <div class="flex-row">
          <span class="fs-14 fw-4 text-gray-3"> Сап код </span>
        </div>
        <div class="flex-row">
          <d-input
            placeholder="Введите"
            class="w-full"
            type="text"
            @change="(value) => (value = value)"
          />
        </div>

        <div class="flex-row">
          <span class="fs-14 fw-4 text-gray-3"> ММЛ </span>
        </div>
        <div class="flex-row">
          <d-input
            placeholder="Введите"
            class="w-full"
            type="text"
            @change="(value) => (value = value)"
          />
        </div>

        <div class="flex-row">
          <span class="fs-14 fw-4 text-gray-3"> Бренд </span>
        </div>
        <div class="flex-row">
          <select
            class="border w-full h-[42px] bg-[#FAFDFD] rounded-lg mt-[1px] mr-[18px] pl-[15px]"
          >
            <option value="">Coca cola</option>
            <option value="">hello</option>
            <option value="">hello</option>
            <option value="">hello</option>
          </select>
        </div>

        <div class="flex-row">
          <span class="fs-14 fw-4 text-gray-3"> Тип упаковки </span>
        </div>
        <div class="flex-row">
          <d-input
            placeholder="Введите"
            class="w-full"
            type="text"
            @change="(value) => (value = value)"
          />
        </div>
      </div>

      <div class="grid gap-2">
        <div class="flex-row">
          <span class="fs-14 fw-4 text-gray-3"> Выберите тип коробки </span>
        </div>
        <div class="flex-row">
          <d-input
            placeholder="Введите"
            class="w-full"
            type="text"
            @change="(value) => (value = value)"
          />
        </div>

        <div class="flex-row">
          <span class="fs-14 fw-4 text-gray-3"> Код </span>
        </div>
        <div class="flex-row">
          <d-input
            placeholder="Введите"
            class="w-full"
            type="text"
            @change="(value) => (value = value)"
          />
        </div>

        <div class="flex-row">
          <span class="fs-14 fw-4 text-gray-3"> Штрих (Бар) код </span>
        </div>
        <div class="flex-row">
          <d-input
            placeholder="Введите"
            class="w-full"
            type="text"
            @change="(value) => (value = value)"
          />
        </div>

        <div class="flex-row">
          <span class="fs-14 fw-4 text-gray-3"> Фото </span>
        </div>
        <div class="flex-row">
          <d-input
            placeholder="Введите"
            class="w-full"
            type="text"
            @change="(value) => (value = value)"
          />
        </div>

        <div class="flex-row">
          <span class="fs-14 fw-4 text-gray-3"> Производитель </span>
        </div>
        <div class="flex-row">
          <d-input
            placeholder="Введите"
            class="w-full"
            type="text"
            @change="(value) => (value = value)"
          />
        </div>
        <div class="flex-row h-[74px]"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
//imports
import { notify } from "@kyvg/vue3-notification";

//state
let activeTab = ref(0);

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

.my-input:active {
  border-color: var(--primary-color);
}
.my-input:focus {
  outline: none !important;
  border: 1px solid var(--primary-color);
}
</style>
