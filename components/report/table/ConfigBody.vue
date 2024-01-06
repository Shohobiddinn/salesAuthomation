<template>
  <flex-col class="gap-2 w-full">
    <div class="w-full">
      <i-title>
        Минимальный процент активности (%)
      </i-title>
      <d-input
        class="w-full"
        placeholder="Введите"/>
    </div>
    <i-title>
      Убрать и показать
    </i-title>
    <flex-row class="gap-2 items-center">
      <label class="switch">
        <input type="checkbox">
        <span class="slider round"></span>
      </label>
      <i-title>
        Фотоотчёт
      </i-title>
    </flex-row>
    <flex-row class="gap-2 items-center">
      <label class="switch">
        <input type="checkbox">
        <span class="slider round"></span>
      </label>
      <i-title>
        Заказ
      </i-title>
    </flex-row>
    <flex-row class="gap-2 items-center">
      <label class="switch">
        <input type="checkbox">
        <span class="slider round"></span>
      </label>
      <i-title>
        Факт по GPS
      </i-title>
    </flex-row>
    <m-btn>
      Сохранить
    </m-btn>
  </flex-col>
</template>

<script setup>
</script>

<style scoped>

</style>