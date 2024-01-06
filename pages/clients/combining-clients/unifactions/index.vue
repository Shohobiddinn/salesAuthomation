<template>
  <div>
    <button
      @click="$router.push('/clients/combining-clients')"
      class="h-[44px] px-[46px] mt-4 bg-[#FFFFFF] text-black rounded-lg border"
    >
      <div class="flex">
        <IconArrowLeft class="mt-[5px] mr-[10px]"></IconArrowLeft>
        Назад
        <slot></slot>
      </div>
    </button>
    <div>
      <page-title class="mt-2" :title="'Объединение'" />
      <div class="text-[#8FA0A0] fs-16 fw-5 mt-2">
        Пожалуйста, выбрите клиента
      </div>
    </div>
    <div class="flex w-full gap-4 mt-4">
      <div class="w-[30%] bg-white rounded-lg p-3">
        <div class="fs-16 fw-6 text-[#000000]">Параметры клиента</div>
        <div class="px-2 py-4 fs-16 fw-4 text-[#000000]">Название</div>
        <div class="px-2 py-4 fs-16 fw-4 text-[#000000]">
          Юридическое название
        </div>
        <div class="px-2 py-4 fs-16 fw-4 text-[#000000]">
          Юридическое название
        </div>
        <div class="px-2 py-4 fs-16 fw-4 text-[#000000]">Инн</div>
        <div class="px-2 py-4 fs-16 fw-4 text-[#000000]">Пинфл</div>
        <div class="px-2 py-4 fs-16 fw-4 text-[#000000]">
          Дата пос. изменения
        </div>
        <div class="px-2 py-4 fs-16 fw-4 text-[#000000]">Категория клиента</div>
        <div class="px-2 py-4 fs-16 fw-4 text-[#000000]">Адрес</div>
        <div class="px-2 py-4 fs-16 fw-4 text-[#000000]">Территория</div>
        <div class="px-2 py-4 fs-16 fw-4 text-[#000000]">Ориентир</div>
        <div class="px-2 py-4 fs-16 fw-4 text-[#000000]">Контактное лицо</div>
        <div class="px-2 py-4 fs-16 fw-4 text-[#000000]">Кол. заказов</div>
        <div class="px-2 py-4 fs-16 fw-4 text-[#000000]">Кол. отказов</div>
        <div class="px-2 py-4 fs-16 fw-4 text-[#000000]">Аудит: facing</div>
        <div class="px-2 py-4 fs-16 fw-4 text-[#000000]">Бонусы</div>
        <div class="px-2 py-4 fs-16 fw-4 text-[#000000]">Оборудование</div>
        <div class="px-2 py-4 fs-16 fw-4 text-[#000000]">Оборудование</div>
        <div class="px-2 py-4 fs-16 fw-4 text-[#000000]">Баланс ( Безнал )</div>
        <div class="px-2 py-4 fs-16 fw-4 text-[#000000]">Баланс ( $ )</div>
      </div>
      <div class="w-[40%] bg-white rounded-lg p-3">
        <div class="flex">
          <div class="mt-1">
            <input @input="filterList(1)" type="radio" name="name" value="1" />
          </div>
          <div class="fs-16 fw-6 text-[#000000] ml-2" value="2">
            Жураева Гуландон
          </div>
        </div>
        <div class="py-2">
          <d-input
            placeholder="Жураева Гуландон"
            type="text"
            :disabled="amount === 2"
            class="w-full"
          />
        </div>
        <div class="py-2">
          <d-input
            placeholder="Жураева Гуландон"
            type="text"
            :disabled="amount === 2"
            class="w-full"
          />
        </div>
        <div class="py-2">
          <d-input
            placeholder="+998 97 628 28 82"
            type="text"
            :disabled="amount === 2"
            class="w-full"
          />
        </div>
        <div class="py-2">
          <d-input
            placeholder="Активный"
            type="text"
            :disabled="amount === 2"
            class="w-full"
          />
        </div>
        <div class="py-2">
          <d-input
            placeholder="100 0000 0000 0000 00"
            type="text"
            :disabled="amount === 2"
            class="w-full"
          />
        </div>
        <div class="py-2">
          <d-input
            placeholder="Пинфл"
            type="text"
            :disabled="amount === 2"
            class="w-full"
          />
        </div>
        <div class="py-2">
          <d-input
            placeholder="2021-11-16 17:17:51"
            type="text"
            :disabled="amount === 2"
            class="w-full"
          />
        </div>
        <div class="py-2">
          <d-input
            placeholder="Розница"
            type="text"
            :disabled="amount === 2"
            class="w-full"
          />
        </div>
        <div class="py-2">
          <d-input
            placeholder="Адрес"
            type="text"
            :disabled="amount === 2"
            class="w-full"
          />
        </div>
        <div class="py-2">
          <d-input
            placeholder="Адрес"
            type="text"
            :disabled="amount === 2"
            class="w-full"
          />
        </div>
        <div class="py-2">
          <d-input
            placeholder="64 avtobaza"
            type="text"
            :disabled="amount === 2"
            class="w-full"
          />
        </div>
        <div class="py-2">
          <d-input
            placeholder="Fakhriyor"
            type="text"
            :disabled="amount === 2"
            class="w-full"
          />
        </div>
        <div class="py-2">
          <d-input
            placeholder="4125"
            type="text"
            :disabled="amount === 2"
            class="w-full"
          />
        </div>
        <div class="py-2">
          <d-input
            placeholder="4125"
            type="text"
            :disabled="amount === 2"
            class="w-full"
          />
        </div>
        <div class="py-2">
          <d-input
            placeholder="16"
            type="text"
            :disabled="amount === 2"
            class="w-full"
          />
        </div>
        <div class="py-2">
          <d-input
            placeholder="16"
            type="text"
            :disabled="amount === 2"
            class="w-full"
          />
        </div>
        <div class="py-2">
          <d-input
            placeholder="16"
            type="text"
            :disabled="amount === 2"
            class="w-full"
          />
        </div>
        <div class="py-2">
          <d-input
            placeholder="-320000 (сум)"
            type="text"
            :disabled="amount === 2"
            class="w-full"
          />
        </div>
        <div class="py-2">
          <d-input
            placeholder="-1468450 (Безнал)"
            type="text"
            :disabled="amount === 2"
            class="w-full"
          />
        </div>
        <div class="py-2">
          <d-input
            placeholder="0 ($)"
            type="text"
            :disabled="amount === 2"
            class="w-full"
          />
        </div>
      </div>
      <div class="w-[40%] bg-white rounded-lg p-3">
        <div class="flex">
          <div class="mt-1">
            <input @input="filterList(2)" type="radio" name="name" />
          </div>
          <div class="fs-16 fw-6 text-[#000000] ml-2">Жураева Гуландон</div>
        </div>
        <div class="py-2">
          <d-input
            placeholder="Жураева Гуландон"
            type="text"
            :disabled="amount === 1"
            class="w-full"
          />
        </div>
        <div class="py-2">
          <d-input
            placeholder="Жураева Гуландон"
            type="text"
            :disabled="amount === 1"
            class="w-full"
          />
        </div>
        <div class="py-2">
          <d-input
            placeholder="+998 97 628 28 82"
            type="text"
            :disabled="amount === 1"
            class="w-full"
          />
        </div>
        <div class="py-2">
          <d-input
            placeholder="Активный"
            type="text"
            :disabled="amount === 1"
            class="w-full"
          />
        </div>
        <div class="py-2">
          <d-input
            placeholder="100 0000 0000 0000 00"
            type="text"
            :disabled="amount === 1"
            class="w-full"
          />
        </div>
        <div class="py-2">
          <d-input
            placeholder="Пинфл"
            type="text"
            :disabled="amount === 1"
            class="w-full"
          />
        </div>
        <div class="py-2">
          <d-input
            placeholder="2021-11-16 17:17:51"
            type="text"
            :disabled="amount === 1"
            class="w-full"
          />
        </div>
        <div class="py-2">
          <d-input
            placeholder="Розница"
            type="text"
            :disabled="amount === 1"
            class="w-full"
          />
        </div>
        <div class="py-2">
          <d-input
            placeholder="Адрес"
            type="text"
            :disabled="amount === 1"
            class="w-full"
          />
        </div>
        <div class="py-2">
          <d-input
            placeholder="Адрес"
            type="text"
            :disabled="amount === 1"
            class="w-full"
          />
        </div>
        <div class="py-2">
          <d-input
            placeholder="64 avtobaza"
            type="text"
            :disabled="amount === 1"
            class="w-full"
          />
        </div>
        <div class="py-2">
          <d-input
            placeholder="Fakhriyor"
            type="text"
            :disabled="amount === 1"
            class="w-full"
          />
        </div>
        <div class="py-2">
          <d-input
            placeholder="4125"
            type="text"
            :disabled="amount === 1"
            class="w-full"
          />
        </div>
        <div class="py-2">
          <d-input
            placeholder="4125"
            type="text"
            :disabled="amount === 1"
            class="w-full"
          />
        </div>
        <div class="py-2">
          <d-input
            placeholder="16"
            type="text"
            :disabled="amount === 1"
            class="w-full"
          />
        </div>
        <div class="py-2">
          <d-input
            placeholder="16"
            type="text"
            :disabled="amount === 1"
            class="w-full"
          />
        </div>
        <div class="py-2">
          <d-input
            placeholder="16"
            type="text"
            :disabled="amount === 1"
            class="w-full"
          />
        </div>
        <div class="py-2">
          <d-input
            placeholder="-320000 (сум)"
            type="text"
            :disabled="amount === 1"
            class="w-full"
          />
        </div>
        <div class="py-2">
          <d-input
            placeholder="-1468450 (Безнал)"
            type="text"
            :disabled="amount === 1"
            class="w-full"
          />
        </div>
        <div class="py-2">
          <d-input
            placeholder="0 ($)"
            type="text"
            :disabled="amount === 1"
            class="w-full"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const amount = ref(1);
function filterList(param) {
  amount.value = param;
  console.log("param", amount.value);
}
</script>

<style scoped>
input[type="radio"] {
  /* ...existing styles */
  display: grid;
  place-content: center;
}

input[type="radio"]::before {
  content: "";
  width: 1em;
  height: 1em;
  border-radius: 50%;
  background-color: #299b9b;
  border: 1px solid #cccccc;
  transform: scale(0);
  transition: 120ms transform ease-in-out;
  box-shadow: inset 1em 1em var(--form-control-color);
}
input[type="radio"]:checked::before {
  transform: scale(1);
}
</style>
