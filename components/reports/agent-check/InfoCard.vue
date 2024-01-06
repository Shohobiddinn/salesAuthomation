<template>
  <rounded-white-container class="!p-0">
    <div class="grid grid-cols-5">
      <div
        class="border-r border-b p-4 pl-6"
        v-for="(item, key, i) in data"
        :key="i"
        :class="[i % 2 == 1 ? ' col-span-3' : ' col-span-2']"
      >
        <h1 class="text-lg font-semibold" v-if="key.length > 1">{{ key }}</h1>
        <div class="flex gap-6">
          <div v-for="(el, index) in item" :key="index">
            <p class="text-gray-400 font-thin text-sm mb-2">{{ el.name }}</p>
            <p class="mb-0" :class="[el.color && `text-[${el.color}]`]">
              {{ el.value }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </rounded-white-container>
</template>
<script setup>
const data = ref({
  1: [
    { name: "Дата", value: "07.12.2022" },
    { name: "Супервайзер", value: "Олимжон" },
    { name: "Агент", value: "Бобуршох" },
    { name: "Территория", value: "Алмазар" },
  ],
  2: [
    { name: "План визит", value: "35" },
    { name: "07.12.2022", value: "35" },
    { name: "Обший отказ", value: "35" },
    { name: "Общий заказ", value: "35" },
    { name: "Об. сумма заказа", value: "100 000 000 сум", color: "#299B9B" },
  ],
  "Прочая информация": [
    { name: "Время начало работы", value: "0:46" },
    { name: "Время работы", value: "8 часов", color: "#23C00A" },
    { name: "Без работы", value: "8 часов", color: "#D10505" },
  ],
  "Информация на голову": [
    { name: "Батарея", value: "89%", color: "#299B9B" },
    { name: "Время вкл GPS", value: "0:46" },
    { name: "Первый визит ", value: "1:02" },
  ],
})
</script>
