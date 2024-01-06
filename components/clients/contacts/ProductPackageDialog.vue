<template>
  <div class="w-full">
    <div class="">
      <div class="fs-12">Имя</div>
      <div class="py-2">
        <d-input placeholder="Введите"
                 type="text"
                 class="w-full"/>
      </div>
    </div>
    <div class="">
      <div class="py-2">
        <multiply-selection :filter.sync="filter.isElement" @toggle="toggle => filter.isElement = toggle" :name="'Элементи'"/>
      </div>
    </div>
    <button class="rounded-lg bg-[#299B9B] text-white w-full mt-4 py-2">Добавить</button>
  </div>
</template>

<script setup>
const filter = ref({
  isElement: false
})
</script>

<style scoped>

</style>

