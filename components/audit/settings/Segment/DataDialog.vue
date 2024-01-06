<template>
  <div class="grid grid-cols-1 w-full gap-2">
    <div class="flex-row">
      <span class="fs-14 fw-4 text-gray-3"> Названия </span>
    </div>
    <div class="flex-row">
      <d-input
        placeholder="Введите"
        class="w-full"
        type="text"
        :value="formData.name"
        @change="(value) => changeField('name', value)"
      />
    </div>

    <div class="flex-row">
      <span class="text-gray-3 fs-14 fw-4"> Сортировка </span>
    </div>
    <div class="flex-row">
      <d-input
        placeholder="Введите"
        type="text"
        class="w-full"
        :value="formData.name"
        @change="(value) => changeField('name', value)"
      />
    </div>

    <div class="flex flex-row items-center gap-2 mt-1">
      <span class="text-gray-3 fs-14 fw-4"> Aктивный  </span>
      <label class="switch">
        <input type="checkbox" />
        <span class="slider round"></span>
      </label>
    </div>
    <div class="flex flex-row mt-2 items-center justify-between w-full gap-2">
      <m-btn class="grow"> Добавить </m-btn>
    </div>
  </div>
</template>


<script setup lang="ts">
//state
const formData = ref({
    name: "",
    sorting: "",
})
</script>
